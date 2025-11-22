"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_from_model = generate_from_model;
const config_1 = require("../config");
const genai_1 = require("@google/genai");
async function generate_from_model(prompt) {
    const ai = new genai_1.GoogleGenAI({ apiKey: config_1.GEMINI_API_KEY });
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
    catch (err) {
        return `Web search failed: ${err.message}`;
    }
}
