"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_sse_headers = set_sse_headers;
exports.sse_write_json = sse_write_json;
function set_sse_headers(res) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();
}
function sse_write_json(res, event) {
    console.log(`Writing SSE event: ${JSON.stringify(event)}`);
    const json = JSON.stringify(event);
    res.write(json + "\n\n");
}
