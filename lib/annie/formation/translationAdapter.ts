import type { Observation } from "../../../platform/cos/observation";
import type { Translation } from "../../../platform/cos/translation";
import { translateObservations } from "../../../platform/cos/translation";
import { hospitalityFoodSafetyRules } from "../translation/hospitalityFoodSafetyRules";
import { hospitalityTranslationRules } from "../translation/hospitalityRules";

// All Annie hospitality rules available for selection.
const allHospitalityRules = [
  ...hospitalityTranslationRules,
  ...hospitalityFoodSafetyRules,
];

/**
 * Translation Adapter — Annie / Hospitality
 *
 * DC owns professional rule selection.
 * COS owns application of the selected rules.
 *
 * Applies all hospitality rules; COS filter (matches()) excludes irrelevant ones.
 * Only observations whose category matches a rule predicate produce translations.
 */
export function translateForFormation(observations: Observation[]): Translation[] {
  return translateObservations(observations, allHospitalityRules);
}
