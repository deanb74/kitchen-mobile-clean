import type { EnvironmentState } from "../environment";
import { createSituation } from "../environment";

export interface AnnieExperience {
  greeting: string;
  understanding: string;
  nextStep: string;
}

export function createExperience(
  environment: EnvironmentState
): AnnieExperience {

  const situation = createSituation(environment);

  return {
    greeting: "Good morning.",
    understanding: `I've started building an understanding of your environment. ${situation.summary}`,
    nextStep: "Would you like me to continue learning so I can become more useful?",
  };
}