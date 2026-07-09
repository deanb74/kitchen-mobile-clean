import type { WisdomDecision } from "../../lib/annie/wisdom";

/**
 * Knowledge Journey
 *
 * Annie does not need to know everything.
 *
 * She needs to know where to look next.
 */

export interface KnowledgeJourney {
  steps: string[];
  current: string;
  reason: string;
}

export function createKnowledgeJourney(
  wisdom: WisdomDecision
): KnowledgeJourney {
  const steps = [
    "memory",
    "observation",
    "conversation",
    "annie-hq",
    "industry-hq",
    "helping-hand-hq",
  ];

  return {
    steps,
    current: wisdom.source,
    reason: wisdom.reason,
  };
}