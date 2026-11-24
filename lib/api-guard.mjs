/**
 * Lightweight per-instance API protection.
 *
 * NOTE: This limiter is intentionally dependency-free, but memory is not shared
 * between serverless instances. Use a distributed store (for example Redis)
 * when deploying at scale; this is a best-effort abuse guard, not a hard quota.
 */

const buckets = new Map();
const MAX_BUCKETS = 5000;

/**
 * @param {string} key
 * @param {number} [limit]
 * @param {number} [windowMs]
 * @param {number} [now]
 */
export function consumeRateLimit(key, limit = 8, windowMs = 60_000, now = Date.now()) {
  let timestamps = buckets.get(key) || [];
  timestamps = timestamps.filter((timestamp) => now - timestamp < windowMs);

  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((windowMs - (now - timestamps[0])) / 1000)),
    };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);

  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, values] of buckets) {
      if (!values.length || now - values[values.length - 1] >= windowMs) buckets.delete(bucketKey);
      if (buckets.size <= MAX_BUCKETS) break;
    }
    if (buckets.size > MAX_BUCKETS) buckets.delete(buckets.keys().next().value);
  }

  return { allowed: true, limit, remaining: Math.max(0, limit - timestamps.length), retryAfter: 0 };
}

/** @param {Request} request */
export function getClientKey(request) {
  // On Vercel, x-real-ip is set by the platform. x-forwarded-for is a fallback
  // for other reverse-proxy deployments and must only be trusted behind a proxy.
  return request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

/**
 * Read a JSON request body with a streaming byte limit.
 * @param {Request} request
 * @param {number} maxBytes
 * @returns {Promise<{ok: true, value: any} | {ok: false, reason: "too_large" | "invalid_json"}>}
 */
export async function readJsonBody(request, maxBytes) {
  if (!request.body) return { ok: false, reason: "invalid_json" };
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let raw = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return { ok: false, reason: "too_large" };
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    return { ok: true, value: JSON.parse(raw) };
  } catch {
    return { ok: false, reason: "invalid_json" };
  }
}
