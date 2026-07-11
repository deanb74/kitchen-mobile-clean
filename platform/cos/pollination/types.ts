export interface PollinationCandidate {
  source: string;
  title: string;
  description: string;
  category: string;

  confidence: number;

  reusable: boolean;
  professionSpecific: boolean;
  safetyCritical: boolean;

  evidenceProvided: boolean;
  reflectionComplete: boolean;
  privacyChecked: boolean;
  safetyChecked: boolean;
  contextValidated: boolean;
  current: boolean;
}

export type PollinationDestination =
  | "forest"
  | "profession"
  | "local";

export interface PollinationDecision {
  accepted: boolean;
  reason: string;
  destination: PollinationDestination;
}

export interface GovernanceDecision {
  approved: boolean;
  reasons: string[];
  warnings: string[];
  reviewRequired: boolean;
}