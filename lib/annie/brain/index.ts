/**
 * Annie Brain
 *
 * Annie's Brain coordinates everything she knows.
 *
 * It does not replace Observation,
 * Memory or Reasoning.
 *
 * It simply decides the order in which
 * Annie uses them.
 *
 * Observe.
 * Remember.
 * Think.
 * Decide.
 * Help.
 * Learn.
 */

import { chooseNextRoute } from "../../../platform/ci";
import { CompanionReasoningFlow } from "../companion-intelligence/reasoning";
import { decide } from "../decision/decisionEngine";
import { createLivingMemory } from "../memory/livingMemory";
import { beginObservation } from "../observation";
import { discoverOpportunities } from "../opportunity";
import { reflect } from "../reflection";
import { translateHospitalityObservations } from "../translation";

export interface AnnieBrainResult {
  observations: ReturnType<typeof beginObservation>;
  translations: ReturnType<typeof translateHospitalityObservations>;
  navigation: ReturnType<typeof chooseNextRoute>;
  memory: ReturnType<typeof createLivingMemory>;
  reasoning: typeof CompanionReasoningFlow;
  opportunities: ReturnType<typeof discoverOpportunities>;
  decision: ReturnType<typeof decide>;
  reflection: ReturnType<typeof reflect>;
}

export function think(): AnnieBrainResult {
  const observations = beginObservation();
  const translations = translateHospitalityObservations(
    observations.observations
  );

  const navigation = chooseNextRoute({
    hasObservations: observations.observations.length > 0,
    hasTranslations: translations.length > 0,
    needsReflection: false,
    needsClarification:
      observations.questions.length > 0 && translations.length === 0,
  });

  const memory = createLivingMemory({
    id: "first-venue-observation",
    fact: "Annie has started learning this venue.",
    source: "observation",
    learntOn: new Date(),
    reason: "Annie began her first working day by observing the venue.",
    reviewTriggers: ["venue-layout-changed", "new-manager", "refurbishment"],
  });

  const opportunities = discoverOpportunities();

  const decision = decide({
    understandsSituation: translations.length > 0,
    hasEnoughInformation: opportunities.length > 0,
    confidence: 0.9,
  });

  const reflection = reflect(
    "First venue observation",
    "Every observation improves my understanding.",
    "Continue learning about this venue and its people."
  );

  return {
    observations,
    translations,
    navigation,
    memory,
    reasoning: CompanionReasoningFlow,
    opportunities,
    decision,
    reflection,
  };
}