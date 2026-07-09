import { getCuriosityFromObservations, type ObservationQuestion } from "./curiosity";
import { observe, type Observation } from "./observe";

/**
 * Annie's Observation Pipeline
 *
 * Every visual observation begins here.
 *
 * Observe
 * ↓
 * Curiosity
 * ↓
 * Think
 * ↓
 * Understand
 * ↓
 * Remember
 * ↓
 * Offer Help
 */

export interface ObservationSession {
  observations: Observation[];
  questions: ObservationQuestion[];
}

export function beginObservation(): ObservationSession {
  const observations = observe();
  const questions = getCuriosityFromObservations(observations);

  return {
    observations,
    questions,
  };
}