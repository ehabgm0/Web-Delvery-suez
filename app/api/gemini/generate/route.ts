import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${context || ""} \n\n User Prompt: ${prompt}`,
      config: {
        systemInstruction: "You are a helpful assistant for 'Delivery Suez Online', an Egyptian delivery service based in Suez. Use Egyptian Arabic or formal Arabic as appropriate. Keep responses helpful, polite, and brand-aligned.",
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
