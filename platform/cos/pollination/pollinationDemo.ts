import { pollinate } from "./pollinationEngine";
import type { PollinationCandidate } from "./types";

const baseCandidate: PollinationCandidate = {
  source: "annie-hh-0001",
  title: "Clarifying questions reduce mistakes",
  description:
    "Asking one clarifying question before making a recommendation reduced avoidable errors.",
  category: "communication",

  confidence: 0.95,

  reusable: true,
  professionSpecific: false,
  safetyCritical: false,

  evidenceProvided: true,
  reflectionComplete: true,
  privacyChecked: true,
  safetyChecked: true,
  contextValidated: true,
  current: true,
};

const rejectedCandidate: PollinationCandidate = {
  ...baseCandidate,
  confidence: 0.62,
  evidenceProvided: false,
  reflectionComplete: false,
};

const professionCandidate: PollinationCandidate = {
  ...baseCandidate,
  title: "Allergen explanation improves understanding",
  description:
    "Explaining allergen information in plain language improved customer understanding.",
  category: "hospitality",
  professionSpecific: true,
};

const forestCandidate: PollinationCandidate = {
  ...baseCandidate,
  title: "Natural pauses reduce interruption",
  description:
    "Waiting for a natural pause before sharing non-urgent information reduced disruption.",
  category: "human-communication",
  professionSpecific: false,
};

const safetyCriticalCandidate: PollinationCandidate = {
  ...baseCandidate,
  title: "Revised emergency shutdown sequence",
  description:
    "A revised shutdown sequence reduced risk during an equipment failure.",
  category: "safety",
  professionSpecific: true,
  safetyCritical: true,
};

export const pollinationDemo = {
  rejected: pollinate(rejectedCandidate),
  profession: pollinate(professionCandidate),
  forest: pollinate(forestCandidate),
  safetyCritical: pollinate(safetyCriticalCandidate),
};