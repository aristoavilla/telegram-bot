import 'dotenv/config';
import { startAgentTelegram, OpenAILLM } from "@ssww.one/framework";
import {mathAgent} from "./agent";

startAgentTelegram(mathAgent, {
  llm: new OpenAILLM(),
  token: process.env.TELEGRAM_BOT_TOKEN
});
