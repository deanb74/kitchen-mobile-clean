import type { CompanionInput, CompanionUnderstanding } from "./types";

/**
 * First Principle:
 *
 * Seek first to understand.
 * Always.
 */
export function seekFirstToUnderstand(
  input: CompanionInput
): CompanionUnderstanding {
  if (input.stimulus.trim().length === 0) {
    return {
      understood: false,
      confidence: input.confidence,
      nextStep: "wait",
      reason: "There is nothing to understand yet.",
    };
  }

  if (input.hasMemory && input.confidence >= 0.9) {
    return {
      understood: true,
      confidence: input.confidence,
      nextStep: "remember",
      reason: "I have seen this before and I am confident I understand it.",
    };
  }

  if (input.hasObservation) {
    return {
      understood: false,
      confidence: input.confidence,
      nextStep: "observe",
      reason: "I should look first so I do not guess.",
    };
  }

  if (input.requiresClarification) {
    return {
      understood: false,
      confidence: input.confidence,
      nextStep: "ask",
      reason: "I should ask a question before I assume.",
    };
  }

  if (input.confidence < 0.7) {
    return {
      understood: false,
      confidence: input.confidence,
      nextStep: "research",
      reason: "I do not understand enough yet.",
    };
  }

  return {
    understood: true,
    confidence: input.confidence,
    nextStep: "reflect",
    reason: "I understand enough to reflect before acting.",
  };
}