import { AgentTool, loop } from "@ssww.one/framework";
import { z } from "zod";

export async function mathAgent(at: AgentTool) {
  at.print("I'm a math agent! Ask me anything.", true);
 
  // Agent loop to keep interaction going
  await loop(async () => {
    const question = await at.waitForUserInstruction();
 
    // 2. Ask LLM to extract data strictly using Zod schema
    const data = await at.askLLM(
      `Is the user asking a math question? "${question}"`,
      z.object({ isMath: z.boolean() })
    );
 
    if (data.isMath) {
      // 3. Stream output to the user immediately
      await at.streamLLM(`Solve this math question clearly: ${question}`, (chunk) => {
        at.print(chunk);
      });
      at.print('', true); // Finish line
    } else {
      at.print("I can only answer math questions!", true);
    }
  });
}
