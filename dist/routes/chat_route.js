"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sse_1 = require("../utils/sse");
const generative_service_1 = require("../services/generative_service");
const search_service_1 = require("../services/search_service");
const prompts_1 = require("../utils/prompts/prompts");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const user_query = String(req.body?.query || "").trim();
    if (!user_query) {
        res.status(400).json({ error: "Missing 'query' in request body" });
        return;
    }
    (0, sse_1.set_sse_headers)(res);
    try {
        (0, sse_1.sse_write_json)(res, { type: "reasoning", content: "Received query; deciding if external facts are needed." });
        const intent_prompt = (0, prompts_1.get_intent_prompt)(user_query);
        (0, sse_1.sse_write_json)(res, { type: "reasoning", content: "Querying model for tool decision...." });
        const intent_raw = await (0, generative_service_1.generate_from_model)(intent_prompt);
        const intent = intent_raw.toUpperCase();
        (0, sse_1.sse_write_json)(res, { type: "reasoning", content: `Model Intent output: ${intent}` });
        let final_answer = "";
        if (intent.includes("NEED_SEARCH")) {
            (0, sse_1.sse_write_json)(res, { type: "tool_call", tool: "web_search", content: `Searching web for: ${user_query}` });
            const search_summary = await (0, search_service_1.perform_web_search)(user_query);
            (0, sse_1.sse_write_json)(res, { type: "tool_call", tool: "web_search", output: search_summary });
            (0, sse_1.sse_write_json)(res, { type: "reasoning", content: "Sending search results to model to craft final answer." });
            const final_prompt = (0, prompts_1.get_final_prompt)(user_query, search_summary);
            console.log("Final prompt:", final_prompt);
            final_answer = await (0, generative_service_1.generate_from_model)(final_prompt);
            (0, sse_1.sse_write_json)(res, { type: "response", content: final_answer });
        }
        else {
            (0, sse_1.sse_write_json)(res, { type: "reasoning", content: "Model indicated no external lookup is required; generating answer." });
            const direct_prompt = `Answer concisely: ${user_query}`;
            final_answer = await (0, generative_service_1.generate_from_model)(direct_prompt);
            (0, sse_1.sse_write_json)(res, { type: "response", content: final_answer });
        }
        (0, sse_1.sse_write_json)(res, { type: "reasoning", content: "Finished processing. Closing stream." });
        res.end();
    }
    catch (error) {
        (0, sse_1.sse_write_json)(res, { type: "response", content: `Error: ${error.message}` });
        res.end();
    }
});
exports.default = router;
