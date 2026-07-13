import type {
  Observation,
  ObservationQuestion,
} from "./types";

export type CuriosityRule = (
  observation: Observation
) => ObservationQuestion | null;

export function createCuriosityQuestions(
  observations: Observation[],
  rules: CuriosityRule[]
): ObservationQuestion[] {
  return observations.flatMap((observation) =>
    rules
      .map((rule) => rule(observation))
      .filter(
        (question): question is ObservationQuestion =>
          question !== null
      )
  );
}