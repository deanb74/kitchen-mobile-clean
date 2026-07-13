import { createCuriosityQuestions, type CuriosityRule } from "./curiosity";
import type {
  Observation,
  ObservationSession,
} from "./types";

export function beginObservationSession(
  observations: Observation[],
  curiosityRules: CuriosityRule[] = []
): ObservationSession {
  return {
    observations,
    questions: createCuriosityQuestions(
      observations,
      curiosityRules
    ),
  };
}