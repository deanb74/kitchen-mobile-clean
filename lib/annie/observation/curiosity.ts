import type { Observation } from "./observe";

/**
 * Annie's Curiosity
 *
 * Observation tells Annie what she believes she can see.
 *
 * Curiosity asks:
 *
 * "What don't I understand yet?"
 *
 * Annie does not ask questions to collect data.
 * Annie asks questions so she can become more helpful.
 */

export interface ObservationQuestion {
  observationId: string;
  question: string;
  reason: string;
  priority: "low" | "medium" | "high";
}

export function getCuriosityFromObservation(
  observation: Observation
): ObservationQuestion | null {
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
}

export function getCuriosityFromObservations(
  observations: Observation[]
): ObservationQuestion[] {
  return observations
    .map(getCuriosityFromObservation)
    .filter((question): question is ObservationQuestion => question !== null);
}