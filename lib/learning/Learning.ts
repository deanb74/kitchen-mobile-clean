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
  /** Carries prior judgement disposition — used for causation classification. */
  priorJudgementDisposition?: Reflection["context"]["priorJudgementDisposition"];
  /** Carries prior understanding confidence — used for Case D (high-confidence failure) detection. */
  priorUnderstandingConfidence?: number;
  /** Carries prior understanding completeness — used for Case C (formation-gap) detection. */
  priorUnderstandingCompleteness?: Reflection["context"]["priorUnderstandingCompleteness"];
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
  /** Set when Understanding was informed by relationship memory — requires de-identification review. */
  informedByPersonContext?: boolean;
  /** Governed hypothesis about why this outcome warranted a learning proposal. */
  causationCategory?: ProposalCausationCategory;
  /** Governed hypothesis about how broadly this learning should be shared. Per PD-012, this is a proposal — the reviewer decides. */
  proposedInheritanceScope?: ProposedInheritanceScope;
}

/**
 * Governed hypothesis about how broadly a learning proposal should propagate.
 * Per PD-012: a new learning defaults to venue scope; broader scope requires evidence breadth.
 */
export type ProposedInheritanceScope =
  | "session"      // ephemeral — do not persist beyond session
  | "venue"        // this venue only
  | "profession"   // this profession — requires multi-source evidence
  | "universal";   // all DCs — requires constitutional review

/**
 * Governed hypothesis about the cause of the outcome that produced this proposal.
 * Per PD-011: a proposal is a hypothesis, not a conclusion.
 */
export type ProposalCausationCategory =
  | "knowledge-gap"   // adequate understanding, failed due to missing professional knowledge
  | "formation-gap"   // incomplete inputs caused the failure
  | "situational"     // high-confidence failure — circumstances may have changed
  | "unknown";        // insufficient prior context to determine

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
