import 'dotenv/config';
import { startAgentTelegram, GoogleGenAILLM } from "@ssww.one/framework";
import { agent } from "./agent";

startAgentTelegram(agent, {
  llm: new GoogleGenAILLM(),
  token: process.env.TELEGRAM_BOT_TOKEN
});
