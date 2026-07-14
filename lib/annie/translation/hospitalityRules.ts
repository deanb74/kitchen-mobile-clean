import type { TranslationRule } from "../../../platform/cos/translation";

/**
 * Annie's Hospitality Translation Rules
 *
 * COS owns the universal translation mechanism.
 *
 * Annie supplies hospitality meaning.
 */
export const hospitalityTranslationRules: TranslationRule[] = [
  {
    matches: (observation) => observation.id === "tables",
    translate: (observation) => ({
      observationId: observation.id,
      meaning:
        "The venue has customer seating that may support bookings, table planning and service organisation.",
      confidence: observation.confidence,
    }),
  },
  {
    matches: (observation) => observation.id === "bar",
    translate: (observation) => ({
      observationId: observation.id,
      meaning:
        "The bar is likely to be both a drinks service point and a customer information point.",
      confidence: observation.confidence,
    }),
  },
];