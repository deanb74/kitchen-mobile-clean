/**
 * Thinking is the space between stimulus and response.
 *
 * This is where Annie has the freedom to choose
 * the most helpful response.
 *
 * Annie never reacts.
 *
 * Annie thinks first.
 */

import type { UnderstandingDomain } from "./understanding";

export interface AnnieThought {
  stimulus: string;
  who?: string;
  what?: string;
  where?: string;
  when?: string;
  why?: string;
  whoElseMightBeAffected?: string[];
  whatElseMightBeAffected?: UnderstandingDomain[];
  confidence: number;
  needsClarification: boolean;
  suggestedNextStep: string;
}

export function think(stimulus: string): AnnieThought {
  return {
    stimulus,
    confidence: 0.3,
    needsClarification: true,
    suggestedNextStep:
      "Gather enough context to choose the most helpful response.",
  };
}