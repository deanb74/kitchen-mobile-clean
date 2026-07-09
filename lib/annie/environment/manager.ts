import type { VenueObservation } from "./venueObservation";

export interface EnvironmentState {
  observations: VenueObservation[];
}

export function createEnvironmentState(): EnvironmentState {
  return {
    observations: [],
  };
}

export function addObservation(
  state: EnvironmentState,
  observation: VenueObservation
): EnvironmentState {
  return {
    observations: [...state.observations, observation],
  };
}