import type {
  CuriosityRule,
  Observation,
  ObservationQuestion,
} from "../../../platform/cos/observation";

export type { ObservationQuestion } from "../../../platform/cos/observation";

/**
 * Annie's Hospitality Curiosity
 *
 * COS provides the universal curiosity mechanism.
 * Annie supplies the questions that require hospitality understanding.
 */
export const hospitalityCuriosityRule: CuriosityRule = (
  observation: Observation
): ObservationQuestion | null => {
  if (observation.id === "tables") {
    return {
      observationId: observation.id,
      question: "How many people can comfortably sit at these tables?",
      reason:
        "Understanding seating capacity helps Annie support bookings, table plans and service planning.",
      priority: "high",
    };
  }

  if (observation.id === "bar") {
    return {
      observationId: observation.id,
      question: "Would you like to show me what drinks you serve from the bar?",
      reason:
        "Understanding the bar helps Annie support stock, menus, service and ordering.",
      priority: "medium",
    };
  }

  return null;
};

export const hospitalityCuriosityRules: CuriosityRule[] = [
  hospitalityCuriosityRule,
];