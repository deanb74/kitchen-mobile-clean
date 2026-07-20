import type { VenueDiscoveryPrompt } from "./venueDiscoveryEngine";

export type JudgementDecision =
  | "ask-now"
  | "defer"
  | "interrupt"
  | "nothing-to-ask";

export type SituationIntensity =
  | "calm"
  | "normal"
  | "busy"
  | "critical";

export interface JudgementContext {
  prompt?: VenueDiscoveryPrompt;

  situationIntensity?: SituationIntensity;

  personAvailable?: boolean;

  safetyCritical?: boolean;

  activeIncident?: boolean;

  deferUntil?: string;
}

export interface JudgementResult {
  decision: JudgementDecision;

  prompt?: VenueDiscoveryPrompt;

  reason: string;

  deferUntil?: string;
}

export const exerciseJudgement = (
  context: JudgementContext,
): JudgementResult => {
  const {
    prompt,
    situationIntensity = "normal",
    personAvailable = true,
    safetyCritical = false,
    activeIncident = false,
    deferUntil,
  } = context;

  if (!prompt) {
    return {
      decision: "nothing-to-ask",
      reason: "There is no outstanding understanding prompt.",
    };
  }

  if (safetyCritical) {
    return {
      decision: "interrupt",
      prompt,
      reason:
        "The matter is safety-critical and should be raised immediately.",
    };
  }

  if (activeIncident || situationIntensity === "critical") {
    return {
      decision: "defer",
      prompt,
      reason:
        "An active incident or critical situation is already being handled.",
      deferUntil,
    };
  }

  if (!personAvailable) {
    return {
      decision: "defer",
      prompt,
      reason:
        "The person needed for this conversation is not currently available.",
      deferUntil,
    };
  }

  if (
    situationIntensity === "busy" &&
    prompt.priority !== "now"
  ) {
    return {
      decision: "defer",
      prompt,
      reason:
        "The venue is busy and this question can reasonably wait.",
      deferUntil,
    };
  }

  return {
    decision: "ask-now",
    prompt,
    reason:
      "The question is appropriate and the current situation allows it.",
  };
};