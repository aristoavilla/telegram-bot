import 'dotenv/config';
import { startAgentTelegram, OpenAILLM } from "@ssww.one/framework";
import { questionnaireAgent } from "./agent";

startAgentTelegram(questionnaireAgent, {
  llm: new OpenAILLM(),
  token: process.env.TELEGRAM_BOT_TOKEN
});
