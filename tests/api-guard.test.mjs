import test from "node:test";
import assert from "node:assert/strict";
import { consumeRateLimit, getClientKey, readJsonBody } from "../lib/api-guard.mjs";

test("rate limiter allows requests up to the configured limit", () => {
  const key = "test-limit-basic";
  assert.equal(consumeRateLimit(key, 2, 1000, 100).allowed, true);
  assert.equal(consumeRateLimit(key, 2, 1000, 200).allowed, true);
  const blocked = consumeRateLimit(key, 2, 1000, 300);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.remaining, 0);
  assert.equal(blocked.retryAfter, 1);
});

test("rate limiter resets after the window expires and isolates keys", () => {
  assert.equal(consumeRateLimit("test-isolated-a", 1, 1000, 100).allowed, true);
  assert.equal(consumeRateLimit("test-isolated-a", 1, 1000, 200).allowed, false);
  assert.equal(consumeRateLimit("test-isolated-b", 1, 1000, 200).allowed, true);
  assert.equal(consumeRateLimit("test-isolated-a", 1, 1000, 1200).allowed, true);
});

test("client key prefers the platform real IP and falls back to forwarded IP", () => {
  assert.equal(getClientKey(new Request("https://example.test", {
    headers: { "x-real-ip": "203.0.113.5", "x-forwarded-for": "198.51.100.2" },
  })), "203.0.113.5");
  assert.equal(getClientKey(new Request("https://example.test", {
    headers: { "x-forwarded-for": "198.51.100.2, 198.51.100.3" },
  })), "198.51.100.2");
});

test("JSON reader accepts valid JSON and rejects malformed JSON", async () => {
  const valid = await readJsonBody(new Request("https://example.test", {
    method: "POST", body: JSON.stringify({ prompt: "hello" }),
  }), 100);
  assert.deepEqual(valid, { ok: true, value: { prompt: "hello" } });

  const invalid = await readJsonBody(new Request("https://example.test", {
    method: "POST", body: "{bad json",
  }), 100);
  assert.deepEqual(invalid, { ok: false, reason: "invalid_json" });
});

test("JSON reader stops bodies that exceed the byte limit", async () => {
  const result = await readJsonBody(new Request("https://example.test", {
    method: "POST", body: JSON.stringify({ prompt: "x".repeat(200) }),
  }), 32);
  assert.deepEqual(result, { ok: false, reason: "too_large" });
});
