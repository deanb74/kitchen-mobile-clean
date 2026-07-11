import type { PollinationDecision } from "./types";

/**
 * Distribution
 *
 * Determines where accepted knowledge
 * should be shared.
 */
export function distributeKnowledge(
  decision: PollinationDecision
): string {

  switch (decision.destination) {

    case "forest":
      return "Share with the entire Helping Hand Forest.";

    case "profession":
      return "Share within the profession.";

    case "local":
      return "Keep as local experience.";
  }
}