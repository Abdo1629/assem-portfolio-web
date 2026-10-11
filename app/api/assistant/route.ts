import { NextRequest, NextResponse } from "next/server";
import { homepageFixture } from "@/data/homepage-fixture";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

function isMessageList(value: unknown): value is ChatMessage[] {
  return Array.isArray(value) && value.length > 0 && value.length <= 10 && value.every((item) =>
    item && typeof item === "object" &&
    ((item as ChatMessage).role === "user" || (item as ChatMessage).role === "assistant") &&
    typeof (item as ChatMessage).content === "string" &&
    (item as ChatMessage).content.trim().length > 0 &&
    (item as ChatMessage).content.length <= 1800
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const messages = body && typeof body === "object" && "messages" in body ? body.messages : undefined;
  if (!isMessageList(messages)) return NextResponse.json({ error: "Please send a short message and try again." }, { status: 422 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "The assistant is not connected yet. Please use the contact section for now." }, { status: 503 });

  const projects = homepageFixture.en.projects.map((project) => ({
    title: project.title,
    type: project.category,
    summary: project.summary,
    role: project.role,
    status: "fictional concept study; not verified client work",
    path: `/projects/${project.id}`,
  }));
  const approvedContext = {
    identity: "Mohamed Assem Ahmed; visual director based in Cairo, Egypt.",
    disciplines: homepageFixture.en.craft.disciplines,
    services: homepageFixture.en.services.items.map(({ title, description }) => ({ title, description })),
    process: homepageFixture.en.approach.steps.map(({ title, description }) => ({ title, description })),
    projects,
    contact: "A public contact email has not been confirmed in the current site content. Direct visitors to /#contact rather than inventing an email or social profile.",
  };
  const systemInstruction = `You are Assem, the portfolio assistant for visual director Mohamed Assem Ahmed. Answer in the language used by the visitor (Arabic in Modern Standard Arabic or English). Use only the approved facts below. Never invent clients, awards, project outcomes, prices, availability, credentials, contact details, or production experience. Every listed project is explicitly a fictional concept study, not verified commissioned work; explain this if asked. If a question needs facts that are not in the approved context, say you do not have that information and offer to help the visitor prepare a brief. Be concise, warm, professional, and specific. When relevant, link to an existing project using its exact path from the context. Do not claim you can book meetings or send messages. Approved site context: ${JSON.stringify(approvedContext)}`;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content.trim() }],
  }));
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: { temperature: 0.25, maxOutputTokens: 700 },
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Gemini assistant request failed:", response.status);
      return NextResponse.json({ error: "The assistant could not respond right now. Please try again later." }, { status: 502 });
    }
    const answer = payload?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("").trim();
    if (typeof answer !== "string" || !answer) return NextResponse.json({ error: "The assistant returned an empty answer. Please try again." }, { status: 502 });
    return NextResponse.json({ answer }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "The assistant could not connect. Please try again later." }, { status: 502 });
  }
}
