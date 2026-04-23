import { AgentTool, loop } from "@ssww.one/framework";
import { z } from "zod";

export async function questionnaireAgent(at: AgentTool) {
  // 1. Knowledge Preparation
  await at.prepareKnowledge('You are a helpful assistant collecting user data.');
  await at.prepareKnowledge(
    `Questionnaire Format (all required data): name, email, phone number
Your task is to collect data from the user based on the questionnaire format above
in the correct order (order matters). The user may provide data in any order.`
  );

  // 2. Greetings
  at.print('> Hi please provide your name, email, and phone number please, thank you', true);

  // 3. Main loop — gather all data and exit
  await loop(async () => {
    const has_complete_data: boolean = await at.askLLM(
      `Has the user provided all required data for the questionnaire?`,
      z.boolean()
    );

    if (has_complete_data) {
      const data: string[] = await at.askLLM(
        `Extract the latest data provided by the user in the correct order
based on the required format. Return the result as an array of strings.
For optional fields, return an empty string.`,
        z.array(z.string())
      );
      console.log({ data });
      
      at.exit('Thank you');
      return;
    } else {
      const instruction = await at.waitForUserInstruction();
      const res = await at.askLLM(
        `User response: "${instruction}", now respond the user`
      );
      at.print(`> ${res}`, true);
    }
  });
}
