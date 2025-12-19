
import { GoogleGenAI, Type } from "@google/genai";
import { ScamAnalysis, VerdictType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `
You are an advanced AI security analyst specialized in identifying scam messages, phishing attempts, and fraudulent offers across SMS, email, and social media.
Your goal is to protect users from financial loss and identity theft.

Your task:
1. Carefully analyze the provided message.
2. Determine the verdict: 'Likely Scam', 'Likely Genuine', or 'Suspicious'.
3. Calculate a scam score from 0 (completely safe) to 100 (guaranteed scam).
4. Identify specific red flags (urgent requests, fake rewards, suspicious links, poor grammar, unusual sender, etc.).
5. Provide a detailed but concise explanation.
6. Offer actionable advice on what the user should do next.
7. Identify specific snippets within the message that are highly suspicious and categorize them.

Maintain a professional, cautious, and helpful tone.
`;

export async function analyzeMessage(message: string): Promise<ScamAnalysis> {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Message to Analyze: "${message}"`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verdict: {
            type: Type.STRING,
            enum: Object.values(VerdictType),
            description: "The overall verdict of the analysis."
          },
          score: {
            type: Type.NUMBER,
            description: "A numerical score from 0-100 indicating scam probability."
          },
          redFlags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of specific warning signs detected."
          },
          explanation: {
            type: Type.STRING,
            description: "Detailed analysis of why this message is considered a scam or genuine."
          },
          advice: {
            type: Type.STRING,
            description: "Actionable steps the user should take."
          },
          highlightedParts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "The exact text from the original message." },
                reason: { type: Type.STRING, description: "Why this specific part is suspicious." },
                category: { 
                  type: Type.STRING, 
                  enum: ['Urgency', 'Financial', 'Technical', 'Social', 'Other'],
                  description: "Categorization of the suspicion."
                }
              },
              required: ["text", "reason", "category"]
            }
          }
        },
        required: ["verdict", "score", "redFlags", "explanation", "advice", "highlightedParts"],
      },
    },
  });

  try {
    const result = JSON.parse(response.text);
    return result as ScamAnalysis;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response format from AI.");
  }
}
