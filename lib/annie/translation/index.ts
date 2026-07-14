import {
    translateObservations,
    type Observation,
    type Translation,
} from "../../../platform/cos/translation";

import { hospitalityTranslationRules } from "./hospitalityRules";

export type {
    Translation,
    TranslationRule
} from "../../../platform/cos/translation";

/**
 * Annie Translation
 *
 * Annie supplies hospitality knowledge.
 *
 * COS translates observations into
 * explainable meaning.
 */
export function translateHospitalityObservations(
  observations: Observation[]
): Translation[] {
  return translateObservations(
    observations,
    hospitalityTranslationRules
  );
}