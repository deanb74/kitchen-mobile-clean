import type { TranslationRule } from "../../../platform/cos/translation";

/**
 * Annie's Hospitality Food Safety Translation Rules
 *
 * COS owns the universal translation mechanism.
 * Annie supplies food safety meaning.
 *
 * Rules match on observation.category + description keywords
 * rather than hardcoded IDs, enabling situational selection.
 */
export const hospitalityFoodSafetyRules: TranslationRule[] = [
  {
    matches: (observation) =>
      observation.category === "equipment" &&
      /temperature|fridge|chiller|freezer|cold.?stor/i.test(
        observation.description,
      ),
    translate: (observation) => ({
      observationId: observation.id,
      meaning:
        "A cold storage temperature reading has been recorded. Food safety status requires professional assessment against the safe storage threshold of 5°C.",
      confidence: observation.confidence,
    }),
  },
  {
    matches: (observation) =>
      observation.category === "stock" ||
      (observation.category === "equipment" &&
        /stock|food|produce|perishable/i.test(observation.description)),
    translate: (observation) => ({
      observationId: observation.id,
      meaning:
        "Food stock condition in cold storage should be verified against food safety requirements before service.",
      confidence: observation.confidence * 0.9,
    }),
  },
  {
    matches: (observation) =>
      observation.category === "compliance" ||
      /safety|hygiene|allerg|haccp|sfbb/i.test(observation.description),
    translate: (observation) => ({
      observationId: observation.id,
      meaning:
        "A compliance-relevant observation has been noted. Professional food safety standards apply.",
      confidence: observation.confidence,
    }),
  },
];
