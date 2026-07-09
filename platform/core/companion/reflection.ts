import type { CompanionUnderstanding } from "./types";

export interface CompanionReflection {
  shouldReflect: boolean;
  reason: string;
}

/**
 * Reflection
 *
 * Understanding is not the same as readiness.
 *
 * Helping Hand pauses before action
 * when reflection would improve trust.
 */
export function reflectBeforeAction(
  understanding: CompanionUnderstanding
): CompanionReflection {
  if (!understanding.understood) {
    return {
      shouldReflect: false,
      reason: "I should seek understanding before I reflect.",
    };
  }

  return {
    shouldReflect: true,
    reason: "I understand enough to pause and think before acting.",
  };
}