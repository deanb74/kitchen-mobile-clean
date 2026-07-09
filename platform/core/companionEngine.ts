import type { CompanionContext } from "./companionContext";
import type { CompanionDecision } from "./companionDecision";

/**
 * Companion Engine
 *
 * Between stimulus and response,
 * the Digital Colleague has the freedom to choose.
 */

export function processStimulus(
  context: CompanionContext
): CompanionDecision {
  if (context.stimulus.trim().length === 0) {
    return {
      action: "wait",
      reason: "There is nothing to respond to yet.",
    };
  }

  return {
    action: "reflect",
    reason:
      "I should make sure I understand before deciding how to help.",
  };
}