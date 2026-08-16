import type { Observation } from "../../../platform/cos/observation";

/**
 * Converts a human utterance into a governed Observation.
 * The caller supplies confidence — the DC does not claim certainty it has not earned.
 */
export function humanSpeechToObservation(
  utterance: string,
  id: string,
  confidence: number,
): Observation {
  return {
    id,
    category: "conversation",
    description: utterance,
    confidence,
    source: "human",
  };
}
