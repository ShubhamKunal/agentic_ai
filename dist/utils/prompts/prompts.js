"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_intent_prompt = get_intent_prompt;
exports.get_final_prompt = get_final_prompt;
function get_intent_prompt(user_query) {
    return `You are a short-thinking agent. The user asks: "${user_query}"
            Decide whether you NEED an external web search to answer accurately.
            Answer with exactly one token: NEED_SEARCH or NO_SEARCH.`;
}
function get_final_prompt(user_query, searchSummary) {
    return `You are an assistant with external context. The user's question:
            "${user_query}"

            Here are web search summaries:
            ${searchSummary}
            Using only the facts above (cite which lines came from the search), produce a concise answer to the user's question.`;
}
