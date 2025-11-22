import axios from "axios";
import { WEB_SEARCH_API_KEY, WEB_SEARCH_API_URL, WEB_SEARCH_CX } from "../config";


export async function perform_web_search(query: string): Promise<string> {
    try {
        const response = await axios.get(WEB_SEARCH_API_URL+"?key="+WEB_SEARCH_API_KEY+"&q="+query+"&cx="+WEB_SEARCH_CX);
        const items = response.data?.items || [];
        if (!Array.isArray(items) || items.length === 0) {
            return "No relevant search results.";
        }
        console.log("Items: ",items)
        const top_summaries = items.slice(0, 5).map((it: any, idx: number) => {
            const title = it.title || "Untitled";
            const snippet = it.snippet || "";
            const link = it.link || "";
            return `${idx + 1}. ${title}${snippet}${link}`;
        });
        const final_result = top_summaries.join("\n");
        console.log("Final web search result: ",final_result)
        return final_result;
    } 
    catch (err: any) {
        return `Web search failed: ${err.message}`;
    }
}
