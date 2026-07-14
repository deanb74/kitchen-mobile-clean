import type { Observation } from "../observation";

export type { Observation } from "../observation";

export interface Translation {
  observationId: string;
  meaning: string;
  confidence: number;
}

export interface TranslationRule {
  matches: (observation: Observation) => boolean;
  translate: (observation: Observation) => Translation;
}