import { Response } from "express";

export type SSE_event = {
    type: "reasoning" | "tool_call" | "response";
    content?: string;
    tool?: string;
    output?: string;
};

export function set_sse_headers(res: Response) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();
}


export function sse_write_json(res: Response, event: SSE_event) {
    console.log(`Writing SSE event: ${JSON.stringify(event)}`);
    const json = JSON.stringify(event);
    res.write(json+"\n\n");
}
