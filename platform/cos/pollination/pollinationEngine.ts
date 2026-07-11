import { distributeKnowledge } from "./distribution";
import { evaluateCandidate } from "./evaluation";
import { evaluateGovernance } from "./governance";

import type { PollinationCandidate } from "./types";

/**
 * Pollination Engine
 *
 * Responsible for moving validated learning
 * into the Helping Hand Forest.
 */
export function pollinate(
  candidate: PollinationCandidate
) {
  const governance = evaluateGovernance(candidate);

  if (!governance.approved) {
    return {
      approved: false,
      governance,
      message: "Knowledge remains local.",
    };
  }

  if (governance.reviewRequired) {
    return {
      approved: false,
      governance,
      message:
        "Knowledge requires human review before wider distribution.",
    };
  }

  const decision = evaluateCandidate(candidate);

  return {
    approved: decision.accepted,
    governance,
    decision,
    distribution: distributeKnowledge(decision),
  };
}