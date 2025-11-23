import { set_sse_headers, sse_write_json } from "../utils/sse";
import { generate_from_model } from "../services/generative_service";
import { perform_web_search } from "../services/search_service";
import {get_intent_prompt, get_final_prompt} from "../utils/prompts/prompts"
import { Request, Response } from "express";
export const chat_controller = async (req: Request, res: Response) =>  {
    const user_query = String(req.body?.query || "").trim();
    if (!user_query) {
        res.status(400).json({ error: "Missing 'query' in request body" });
        return;
    }
    set_sse_headers(res);
    try {
        sse_write_json(res, { type: "reasoning", content: "Received query; deciding if external facts are needed." });
        const intent_prompt = get_intent_prompt(user_query);
        sse_write_json(res, { type: "reasoning", content: "Querying model for tool decision...." });
        const intent_raw = await generate_from_model(intent_prompt);
        const intent = intent_raw.toUpperCase();
        sse_write_json(res, { type: "reasoning", content: `Model Intent output: ${intent}` });
        let final_answer = "";
        if (intent.includes("NEED_SEARCH")) {
            sse_write_json(res, { type: "tool_call", tool: "web_search", content: `Searching web for: ${user_query}` });
            const search_summary = await perform_web_search(user_query);
            sse_write_json(res, { type: "tool_call", tool: "web_search", output: search_summary });
            sse_write_json(res, { type: "reasoning", content: "Sending search results to model to craft final answer." });
            const final_prompt = get_final_prompt(user_query, search_summary);
            console.log("Final prompt:", final_prompt);
            final_answer = await generate_from_model(final_prompt);
            sse_write_json(res, { type: "response", content: final_answer });
            
        } else {
            sse_write_json(res, { type: "reasoning", content: "Model indicated no external lookup is required; generating answer." });
            const direct_prompt = `Answer concisely: ${user_query}`;
            final_answer = await generate_from_model(direct_prompt);
            sse_write_json(res, { type: "response", content: final_answer });
        }
        sse_write_json(res, { type: "reasoning", content: "Finished processing. Closing stream." });
        res.end();
    } catch (error: any) {
        sse_write_json(res, { type: "response", content: `Error: ${error.message}` });
        res.end();
    }
};