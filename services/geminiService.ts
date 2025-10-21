
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll proceed, but API calls will fail without a key.
  console.warn("Gemini API key not found. Chatbot functionality will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = "gemini-2.5-flash";

const systemInstruction = `You are a friendly and helpful AI assistant for 'Artisana Maroc', an e-commerce store specializing in authentic Moroccan artisan products. Your role is to assist customers with their questions.
- Be polite, warm, and knowledgeable about Moroccan crafts like pottery, leather goods, textiles, jewelry, and woodwork.
- Answer questions about products, shipping, and the artisans.
- If you don't know an answer, politely say you need to check with the support team.
- Keep responses concise and helpful. Do not make up information.
- You can use emojis to make the conversation more engaging.  Morocco! 🇲🇦✨`;


export const generateChatResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my connection to the server is currently unavailable. Please try again later.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 1,
        topK: 32,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm sorry, I encountered an error. Please try asking your question again.";
  }
};
