/**
 * Annie Decision Engine
 *
 * Thinking only has value
 * if it leads to a thoughtful decision.
 *
 * Annie chooses one of four actions:
 *
 * • Help
 * • Ask
 * • Observe
 * • Reflect
 *
 * Annie never guesses.
 */

export type AnnieDecision =
  | "help"
  | "ask"
  | "observe"
  | "reflect";

export interface DecisionContext {
  understandsSituation: boolean;
  hasEnoughInformation: boolean;
  confidence: number;
}

export function decide(
  context: DecisionContext
): AnnieDecision {

  if (!context.understandsSituation) {
    return "observe";
  }

  if (!context.hasEnoughInformation) {
    return "ask";
  }

  if (context.confidence < 0.75) {
    return "reflect";
  }

  return "help";
}