export type AuthorityLevel =
  | "none"
  | "limited"
  | "standard"
  | "elevated";

export type AuthorityDecision =
  | "allow"
  | "allow-with-caution"
  | "require-human"
  | "deny";

export type AuthorityProfile =
  | "observer"
  | "contributor"
  | "responsible"
  | "accountable";

export interface AuthorityBoundary {
  scope: string;
  description: string;
}

export interface AuthorityContext {
  actorId: string;
  authorityProfile: AuthorityProfile;
  action: string;
  subject?: string;
  riskLevel?: "low" | "medium" | "high" | "critical";
}

export interface AuthorityAssessment {
  context: AuthorityContext;
  decision: AuthorityDecision;
  level: AuthorityLevel;
  /**
   * The degree of autonomous authority available for this action
   * after applying authority level, risk and decision constraints.
   *
   * This is not confidence in the correctness of the assessment.
   */
  authorityScore: number;
  reason: string;
  boundaries: AuthorityBoundary[];
  requiresHuman: boolean;
  createdAt: string;
  updatedAt: string;
}
