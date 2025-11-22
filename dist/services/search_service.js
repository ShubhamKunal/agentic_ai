"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perform_web_search = perform_web_search;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
async function perform_web_search(query) {
    try {
        const response = await axios_1.default.get(config_1.WEB_SEARCH_API_URL + "?key=" + config_1.WEB_SEARCH_API_KEY + "&q=" + query + "&cx=" + config_1.WEB_SEARCH_CX);
        const items = response.data?.items || [];
        if (!Array.isArray(items) || items.length === 0) {
            return "No relevant search results.";
        }
        console.log("Items: ", items);
        const top_summaries = items.slice(0, 5).map((it, idx) => {
            const title = it.title || "Untitled";
            const snippet = it.snippet || "";
            const link = it.link || "";
            return `${idx + 1}. ${title}${snippet}${link}`;
        });
        const final_result = top_summaries.join("\n");
        console.log("Final web search result: ", final_result);
        return final_result;
    }
    catch (err) {
        return `Web search failed: ${err.message}`;
    }
}
