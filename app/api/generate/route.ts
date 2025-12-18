import { NextResponse } from "next/server";
import OpenAI from "openai";

// ⚠️ TEMP MVP LIMIT (resets on server restart)
let requestCount = 0;
const MAX_FREE_REQUESTS = 3;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    requestCount++;

    if (requestCount > MAX_FREE_REQUESTS) {
      return NextResponse.json(
        { error: "You’ve reached the free preview limit. Join the early access waitlist to unlock unlimited task generation." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { topic, yearGroup } = body;

    if (!topic) {
      return NextResponse.json(
        { error: "Missing lesson topic" },
        { status: 400 }
      );
    }

    const prompt = `
You are an experienced UK secondary English teacher.

Create differentiated GCSE English tasks for:
Lesson topic: "${topic}"
Year group: ${yearGroup}

Produce:
1. SUPPORT task (simplified, scaffolded)
2. CORE task (standard GCSE expectation)
3. CHALLENGE task (stretch, evaluation, judgement)

Rules:
- Use clear bullet points
- Student-friendly language
- GCSE-style wording
- No mark schemes
- No exam board references

Return clearly as:
SUPPORT:
CORE:
CHALLENGE:
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    return NextResponse.json({
      tasks: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate tasks" },
      { status: 500 }
    );
  }
}
