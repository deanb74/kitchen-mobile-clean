import type {
    Learning,
    LearningDisposition,
    LearningEvidence,
} from "../learning/Learning";

/**
 * Governance outcome for reviewing a Learning record.
 */
export type KnowledgeGovernanceDecision =
  | "approve"
  | "reject"
  | "defer"
  | "supersede";

/**
 * Intended knowledge change shape if governance approves.
 */
export type KnowledgeChangeIntent =
  | "create"
  | "update"
  | "reinforce"
  | "merge"
  | "supersede"
  | "retire"
  | "none";

/**
 * Copied context from Learning used for governance review.
 *
 * This is a snapshot for review and must not be a shared mutable reference.
 */
export interface KnowledgeGovernanceContext {
  learningId: string;
  learningDisposition: LearningDisposition;
  learningConfidence: number;
  learningRequiresHuman: boolean;

  reflectionId: string;
  actionId: string;
  executionId: string;

  /**
   * Optional for cases where the Learning proposal has no existing target.
   */
  knowledgeTargetId?: string;
}

/**
 * Immutable evidence carried into governance review.
 *
 * Evidence must be copied from Learning evidence and Learning proposal
 * supporting evidence with clear source attribution.
 */
export interface KnowledgeGovernanceEvidence {
  source:
    | "learning-evidence"
    | "learning-proposal-supporting-evidence";
  sourceLearningId: string;
  sourceEvidenceId?: string;
  sourceLearningEvidenceType?: LearningEvidence["sourceType"];
  detail: string;
  severity?: LearningEvidence["severity"];
  observedAt?: string;
}

interface KnowledgeGovernanceReviewBase {
  decision: KnowledgeGovernanceDecision;
  changeIntent: KnowledgeChangeIntent;
  rationale: string;
  conditions: ReadonlyArray<string>;
  /**
   * Confidence in the governance review from 0 to 1.
   */
  confidence: number;
}

/**
 * Human-reviewed governance decision metadata.
 */
interface HumanReviewedKnowledgeGovernanceReview
  extends KnowledgeGovernanceReviewBase {
  reviewedBy: string;
  reviewedAt: string;
}

/**
 * Governance record captured before named human review is complete.
 */
interface UnreviewedKnowledgeGovernanceReview
  extends KnowledgeGovernanceReviewBase {
  reviewedBy?: undefined;
  reviewedAt?: undefined;
}

/**
 * Governance review outcome and metadata.
 *
 * If a review is human-reviewed, reviewedBy and reviewedAt are required.
 */
export type KnowledgeGovernanceReview =
  | HumanReviewedKnowledgeGovernanceReview
  | UnreviewedKnowledgeGovernanceReview;

export type ApprovedKnowledgeChangeIntent = Exclude<
  KnowledgeChangeIntent,
  "none"
>;

interface ApprovedKnowledgeChangeBase {
  proposedContent: string;
  expectedBenefit: string;
  sourceLearningId: string;
  provenance: ReadonlyArray<string>;
  approvedBy: string;
  approvedAt: string;
  /**
   * Confidence in the approved change from 0 to 1.
   */
  confidence: number;
  status: "approved-not-applied";
}

interface ApprovedKnowledgeCreateChange
  extends ApprovedKnowledgeChangeBase {
  intent: "create";
  targetKnowledgeId?: string;
}

interface ApprovedKnowledgeMergeChange
  extends ApprovedKnowledgeChangeBase {
  intent: "merge";
  /**
   * Optional until merge targets are formally modeled.
   */
  targetKnowledgeId?: string;
}

interface ApprovedKnowledgeTargetedChange
  extends ApprovedKnowledgeChangeBase {
  intent:
    | "update"
    | "reinforce"
    | "supersede"
    | "retire";
  targetKnowledgeId: string;
}

/**
 * Approved change candidate that remains unapplied.
 *
 * Governance approves intent and content only. It does not apply changes.
 */
export type ApprovedKnowledgeChange =
  | ApprovedKnowledgeCreateChange
  | ApprovedKnowledgeMergeChange
  | ApprovedKnowledgeTargetedChange;

interface KnowledgeGovernanceRecordBase {
  id: string;
  context: KnowledgeGovernanceContext;
  review: KnowledgeGovernanceReview;
  evidence: ReadonlyArray<KnowledgeGovernanceEvidence>;
  requiresHuman: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ApprovedKnowledgeGovernanceRecord<
  TApproved extends ApprovedKnowledgeChange = ApprovedKnowledgeChange,
> = KnowledgeGovernanceRecordBase & {
  review: KnowledgeGovernanceReview & {
    decision: "approve";
    changeIntent: TApproved["intent"];
  };
  approvedChange: TApproved;
};

export type NonApprovedKnowledgeGovernanceRecord =
  KnowledgeGovernanceRecordBase & {
    review: KnowledgeGovernanceReview & {
      decision: "reject" | "defer" | "supersede";
    };
    approvedChange?: undefined;
  };

/**
 * Immutable governance record for Learning proposal review.
 *
 * Rules preserved by this contract model:
 * - Governance reviews Learning and must not mutate Learning.
 * - Governance must never mutate Knowledge.
 * - approve requires approvedChange.
 * - reject/defer/supersede must not include approvedChange.
 * - Learning validation state is not modified by these contracts.
 */
export type KnowledgeGovernance =
  | ApprovedKnowledgeGovernanceRecord
  | NonApprovedKnowledgeGovernanceRecord;

/**
 * Input helper for constructing governance context snapshots from Learning.
 *
 * This type exists for contract clarity only; no engine behavior is defined here.
 */
export type KnowledgeGovernanceLearningInput = Pick<
  Learning,
  | "id"
  | "disposition"
  | "confidence"
  | "requiresHuman"
  | "context"
  | "proposal"
  | "evidence"
  | "validation"
>;
