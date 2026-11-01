import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY belum diisi di file .env.local" },
      { status: 500 }
    );
  }

  let body: { prompt?: string; language?: string; length?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Request tidak valid" }, { status: 400 });
  }

  const prompt = (body.prompt ?? "").toString().trim();
  if (!prompt) return Response.json({ error: "Prompt kosong" }, { status: 400 });
  if (prompt.length > 2000) return Response.json({ error: "Prompt terlalu panjang (maks 2000 karakter)" }, { status: 400 });

  const language = body.language === "en" ? "English" : "Bahasa Indonesia";
  const length =
    body.length === "long"
      ? "Panjang dan detail (sekitar 600-900 kata)"
      : "Singkat dan padat (sekitar 150-300 kata)";

  const system = `Kamu adalah penulis dokumen profesional. Tulis dokumen dalam ${language}.
Panjang: ${length}.
Keluarkan HANYA isi dokumen dalam format Markdown (gunakan #, ##, ###, daftar "- ", daftar bernomor, dan **tebal**).
Jangan tambahkan kalimat pembuka/penutup seperti "Berikut dokumennya" dan jangan bungkus dengan code block.
Jangan mengarang data pribadi nyata; gunakan placeholder seperti [Nama], [Tanggal].`;

  try {
    const groq = createGroq({ apiKey });
       const modelId = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
   const { text } = await generateText({
     model: groq(modelId),
      system,
      prompt,
      temperature: 0.6,
    });
    return Response.json({ text });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Gagal memanggil AI";
    return Response.json({ error: msg }, { status: 502 });
  }
}
