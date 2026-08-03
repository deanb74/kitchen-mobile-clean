import type {
    CompanionContext,
    CompanionRouteDecision,
} from "./types";

/**
 * Companion Intelligence Navigator
 *
 * CI chooses the next most helpful route.
 *
 * It does not perform the capability.
 *
 * COS performs the capability.
 */
export function chooseNextRoute(
  context: CompanionContext
): CompanionRouteDecision {

  if (!context.hasObservations) {
    return {
      next: "observe",
      reason: "Understanding begins with observation.",
    };
  }

  if (!context.hasTranslations) {
    return {
      next: "translate",
      reason: "Observations should become understanding.",
    };
  }

  if (context.requiresImmediateInstruction || context.requiresComplianceInstruction) {
    return {
      next: "instruct",
      reason: "Safety, urgency, or compliance duty may require instruction before demonstration.",
    };
  }

  if (context.requiresDemonstration) {
    return {
      next: "demonstrate",
      reason: "Professional behaviour should be demonstrated first in normal practice, with instruction only if needed later.",
    };
  }

  if (context.needsClarification) {
    return {
      next: "conversation",
      reason: "A short conversation will improve understanding.",
    };
  }

  if (context.needsReflection) {
    return {
      next: "reflect",
      reason: "Reflection may improve future outcomes.",
    };
  }

  return {
    next: "complete",
    reason: "No further capability is currently required.",
  };
}