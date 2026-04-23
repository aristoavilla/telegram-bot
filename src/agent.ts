import { AgentTool, loop } from "@ssww.one/framework";

export async function agent(at: AgentTool) {
  at.termination_keywords = ['/quit', '/exit'];
  at.print('Hello! I am your AI assistant. How can I help you?', true);

  await loop(async () => {
    const instruction = await at.waitForUserInstruction();
    await at.streamLLM(`Reply to: ${instruction}`, s => at.print(s));
    at.print('', true);
  });

  at.print('Goodbye! Have a great day!', true);
}
