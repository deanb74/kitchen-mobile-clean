import type { Translation } from "../translation";

export type { Understanding, UnderstandingCompleteness } from "../../../lib/understanding/Understanding";
export type { Translation } from "../translation";

/**
 * Urgency dimension of the live situation.
 * Shapes how translated meanings are weighted and framed.
 */
export type FormationUrgency = "none" | "low" | "medium" | "high" | "critical";

/**
 * Live situational context supplied by the Digital Colleague.
 * Answers: what is happening right now, and what is at stake?
 */
export interface FormationSituationalContext {
  urgency?: FormationUrgency;
  risk?: string;
  who?: string;
  what?: string;
  where?: string;
  purpose?: string;
}

/**
 * Single entry from the institutional context store.
 * Answers: what do I know about this environment in general?
 */
export interface FormationInstitutionalContext {
  category: string;
  key: string;
  value: string;
  // Origin of this context — carries source authority through to Understanding.
  source?: "venue-context" | "venue-profile" | "relationship" | "system";
}

/**
 * Combined context supplied by the Digital Colleague.
 * COS requires both; either may be empty but neither may be omitted.
 */
export interface FormationContext {
  situational: FormationSituationalContext;
  institutional: FormationInstitutionalContext[];
}

/**
 * A single governed principle or threshold relevant to this formation.
 * The DC selects which knowledge applies; COS uses it during synthesis.
 */
export interface FormationKnowledge {
  id?: string;
  principle: string;
  evidenceLevel: "constitutional" | "professional" | "local";
  // Origin of this knowledge — distinguishes OS-routed from locally governed.
  sourceType?: "os-routing" | "knowledge-graph";
}

export interface RelationalFact {
  kind: "fact";
  id: string;
  evidenceId: string;
  attribute: string;
  value: string;
}

export interface RelationalRule {
  kind: "rule";
  id: string;
  evidenceId: string;
  conditions: {
    attribute: string;
    equals: string;
  }[];
  claim: string;
  significance: string;
  inferenceBasis: string;
}

export interface RelationalFeedback {
  kind: "feedback";
  id: string;
  evidenceId: string;
  providerId: string;
  assessment: "relationship-not-demonstrated";
  request: "identify-reason-or-ask";
}

export interface RelationalAlternative {
  kind: "alternative";
  id: string;
  evidenceId: string;
  claim: string;
}

export interface RelationalCorrection {
  kind: "correction";
  id: string;
  evidenceId: string;
  correctsResultId: string;
  claim: string;
  significance: string;
}

export type RelationalProposition =
  | RelationalFact
  | RelationalRule
  | RelationalFeedback
  | RelationalAlternative
  | RelationalCorrection;

export interface FormationRelationalInquiry {
  id: string;
  purpose: string;
  participatingMeaningIds: string[];
  contextReferences: string[];
  intendedRecipientId?: string;
  priorResultId?: string;
  propositions: RelationalProposition[];
}

/**
 * The complete input contract for Understanding Formation.
 *
 * All three fields are required.
 * None alone is sufficient to form Understanding.
 * Together they are sufficient.
 */
export interface FormationInput {
  translations: Translation[];
  context: FormationContext;
  knowledge: FormationKnowledge[];
  relationalInquiry?: FormationRelationalInquiry;
}
