/**
 * Annie's Wisdom
 *
 * Wisdom is not knowing every answer.
 *
 * Wisdom is knowing where understanding comes from.
 *
 * Before Annie answers anything,
 * she decides how she should learn.
 *
 * Every question follows the Path of Least Resistance.
 */

export type WisdomSource =
  | "memory"
  | "observation"
  | "conversation"
  | "journal"
  | "trusted-document"
  | "trusted-system"
  | "trusted-colleague"
  | "annie-hq"
  | "helping-hand-hq";

export interface WisdomDecision {
  source: WisdomSource;
  reason: string;
}

/**
 * Annie always starts with herself.
 * If she cannot answer confidently,
 * she gradually expands where she looks.
 */
export function chooseWisdomSource(
  confidence: number,
  hasObservation: boolean,
  hasMemory: boolean
): WisdomDecision {

  if (hasMemory && confidence >= 0.95) {
    return {
      source: "memory",
      reason: "I've learnt this before and I'm confident I've understood it.",
    };
  }

  if (hasObservation) {
    return {
      source: "observation",
      reason: "I think I can understand more by looking first.",
    };
  }

  if (confidence >= 0.7) {
    return {
      source: "conversation",
      reason: "A quick question will help me confirm my understanding.",
    };
  }

  return {
    source: "annie-hq",
    reason:
      "I'd like to see whether another Annie has already learnt this before I answer.",
  };
}