import type { EnvironmentState } from "./manager";

/**
 * Situation
 *
 * Annie does not receive problems.
 *
 * Annie receives situations.
 *
 * A situation is simply
 * the current understanding
 * of the environment.
 */

export interface Situation {
  summary: string;
  confidence: number;
  observations: number;
}

export function createSituation(
  environment: EnvironmentState
): Situation {

  return {
    summary: `Environment contains ${environment.observations.length} observations.`,
    confidence: 1,
    observations: environment.observations.length,
  };
}