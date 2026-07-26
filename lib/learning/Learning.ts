import type {
    Reflection,
    ReflectionDisposition,
    ReflectionFinding,
} from "../reflection/Reflection";

/**
 * Decision about how reflection should influence future learning.
 *
 * Disposition meanings:
 * - reject: evidence does not justify learning.
 * - observe: retain the signal and wait for more evidence.
 * - propose: suggest a new or adjusted knowledge item.
 * - reinforce: strengthen support for existing governed knowledge.
 *
 * Reinforce does not mean writing the same knowledge again.
 * It means existing governed knowledge appears supported by new evidence
 * and may have its confidence, provenance, or supporting evidence
 * strengthened after validation.
 */
export type LearningDisposition =
  | "reject"
  | "observe"
  | "propose"
  | "reinforce";

/**
 * Validation lifecycle for a learning proposal.
 */
export type LearningValidationState =
  | "pending"
  | "validated"
  | "rejected"
  | "superseded";

/**
 * Minimal context copied from Reflection.
 */
export interface LearningContext {
  reflectionId: string;
  reflectionDisposition: ReflectionDisposition;
  reflectionConfidence: number;
  reflectionRequiresHuman: boolean;

  actionId: string;
  executionId: string;
  executionCreatedAt: string;
  executionCompletedAt?: string;
  executionOutcome: Reflection["context"]["executionOutcome"];
  executionEffect: Reflection["context"]["executionEffect"];
}

/**
 * Structured evidence copied from Reflection.
 */
export interface LearningEvidence {
  sourceType:
    | "reflection-summary"
    | "reflection-finding"
    | "reflection-evidence"
    | "reflection-uncertainty";
  sourceId?: string;
  detail: string;
  severity?: ReflectionFinding["severity"];
  observedAt?: string;
}

/**
 * Proposal for future knowledge improvement.
 *
 * This proposal does not modify knowledge directly.
 */
export interface LearningProposal {
  /**
   * Optional identifier of existing governed knowledge this proposal
   * targets for update or reinforcement.
   */
  knowledgeTargetId?: string;

  whatShouldChange: string;
  why: string;
  expectedBenefit: string;

  /**
   * Confidence in this proposal from 0 to 1.
   */
  confidence: number;

  /**
   * Evidence supporting the proposal.
   * Must be copied from Reflection, not shared by reference.
   */
  supportingEvidence: ReadonlyArray<LearningEvidence>;
}

/**
 * Human-governed validation metadata for a proposal.
 *
 * Lifecycle invariants:
 * - pending: reviewedAt and reviewedBy are absent.
 * - validated: reviewedAt and reviewedBy are required.
 * - rejected: reason, reviewedAt and reviewedBy are required.
 * - superseded: supersededByLearningId is required.
 */
export interface LearningValidation {
  state: LearningValidationState;
  reason?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  supersededByLearningId?: string;
}

/**
 * Governed learning proposal record.
 *
 * Learning must never modify Knowledge.
 * Learning must never rewrite Reflection.
 * Learning must only create proposals.
 */
export interface Learning {
  id: string;
  context: LearningContext;

  /**
   * Decision about how this reflection should influence future learning.
   */
  disposition: LearningDisposition;

  proposal?: LearningProposal;
  validation: LearningValidation;

  /**
   * Reflection-derived evidence retained for auditability.
   * Must be copied as immutable records.
   */
  evidence: ReadonlyArray<LearningEvidence>;

  /**
   * Rationale for the selected learning disposition.
   */
  rationale: string;

  /**
   * Confidence in this learning record from 0 to 1.
   */
  confidence: number;

  /**
   * Whether human governance review is required.
   */
  requiresHuman: boolean;

  createdAt: string;
  updatedAt: string;
}
