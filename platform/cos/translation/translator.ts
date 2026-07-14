import type {
  Observation,
  Translation,
  TranslationRule,
} from "./types";

export function translateObservations(
  observations: Observation[],
  rules: TranslationRule[]
): Translation[] {
  return observations.flatMap((observation) =>
    rules
      .filter((rule) => rule.matches(observation))
      .map((rule) => rule.translate(observation))
  );
}