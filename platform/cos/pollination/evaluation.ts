import type {
  PollinationCandidate,
  PollinationDecision,
} from "./types";

/**
 * Evaluation
 *
 * Determines whether knowledge should
 * be considered for wider sharing.
 */
export function evaluateCandidate(
  candidate: PollinationCandidate
): PollinationDecision {

  if (candidate.confidence < 0.9) {
    return {
      accepted: false,
      destination: "local",
      reason: "Confidence too low.",
    };
  }

  if (!candidate.reusable) {
    return {
      accepted: false,
      destination: "local",
      reason: "Knowledge is too specific.",
    };
  }

  if (candidate.professionSpecific) {
    return {
      accepted: true,
      destination: "profession",
      reason: "Useful within one profession.",
    };
  }

  return {
    accepted: true,
    destination: "forest",
    reason: "Benefits every Digital Colleague.",
  };
}