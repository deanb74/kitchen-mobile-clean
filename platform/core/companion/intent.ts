import type { CompanionRootDecision } from "./decision";

export type CompanionIntent =
  | "help"
  | "clarify"
  | "reassure"
  | "research"
  | "wait"
  | "reflect";

export interface CompanionIntentResult {
  intent: CompanionIntent;
  reason: string;
}

/**
 * Intent
 *
 * Before Helping Hand communicates,
 * it decides what the communication is for.
 */
export function decideIntent(
  decision: CompanionRootDecision
): CompanionIntentResult {
  switch (decision.action) {
    case "wait":
      return {
        intent: "wait",
        reason: "The right thing to do is wait until needed.",
      };

    case "ask":
      return {
        intent: "clarify",
        reason: "The right thing to do is understand more.",
      };

    case "research":
      return {
        intent: "research",
        reason: "The right thing to do is find out before answering.",
      };

    case "reflect":
      return {
        intent: "reflect",
        reason: "The right thing to do is think before answering.",
      };

    case "answer":
      return {
        intent: "help",
        reason: "The right thing to do is help.",
      };
  }
}