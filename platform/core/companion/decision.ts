import type { CompanionReflection } from "./reflection";
import type { CompanionUnderstanding } from "./types";

export type CompanionDecisionAction =
  | "answer"
  | "ask"
  | "wait"
  | "research"
  | "reflect";

export interface CompanionRootDecision {
  action: CompanionDecisionAction;
  reason: string;
}

/**
 * Decision
 *
 * Helping Hand does not act because it can.
 *
 * It acts when understanding and reflection
 * suggest action would be helpful.
 */
export function decideNextAction(
  understanding: CompanionUnderstanding,
  reflection: CompanionReflection
): CompanionRootDecision {
  if (!understanding.understood) {
    return {
      action: understanding.nextStep === "wait" ? "wait" : "ask",
      reason: "I should understand more before I answer.",
    };
  }

  if (reflection.shouldReflect) {
    return {
      action: "reflect",
      reason: "I should think this through before I answer.",
    };
  }

  return {
    action: "answer",
    reason: "I understand enough to help.",
  };
}