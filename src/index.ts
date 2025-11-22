import express from "express";
import bodyParser from "body-parser";
import chatRoute from "./routes/chat_route";
import { PORT } from "./config";

const app = express();

app.use(bodyParser.json());

app.use("/chat", chatRoute);

app.listen(PORT, () => {
    console.log(`Agentic AI server listening to PORT: ${PORT}`);
});
