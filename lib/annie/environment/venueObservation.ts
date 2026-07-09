import type { EnvironmentSource } from "./source";

export interface VenueObservation {
  id: string;
  source: EnvironmentSource;
  area: string;
  whatAnnieNoticed: string;
  confidence: number;
  needsConfirmation: boolean;
}

export function createVenueObservation(
  observation: VenueObservation
): VenueObservation {
  return observation;
}