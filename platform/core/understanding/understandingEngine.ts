import {
  UnderstandingContext,
  UnderstandingResult,
} from "./types";

/**
 * First Law of Helping Hand
 *
 * Seek first to understand.
 * Always.
 */
export function seekUnderstanding(
  context: UnderstandingContext
): UnderstandingResult {

  if (context.requiresClarification) {
    return {
      understood: false,
      confidence: context.confidence,
      nextStep: "ask",
    };
  }

  if (context.confidence < 0.7) {
    return {
      understood: false,
      confidence: context.confidence,
      nextStep: "research",
    };
  }

  return {
    understood: true,
    confidence: context.confidence,
    nextStep: "reflect",
  };
}