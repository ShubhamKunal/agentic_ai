import { GEMINI_API_KEY } from "../config";
import {GoogleGenAI} from "@google/genai";

export async function generate_from_model(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
    const payload = {
        model: 'gemini-2.5-flash',
        contents: prompt,
    };
    try {
        const response = await ai.models.generateContent(payload);
        const text_data = response.text;
        console.log("Generated decision:", text_data);
        return text_data || '';
    } 
    catch (err: any) {
        return `Web search failed: ${err.message}`;
    }
}
