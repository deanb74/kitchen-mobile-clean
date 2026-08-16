/**
 * @deprecated
 *
 * CandidateLearning and ValidationQueue are deprecated as an active learning pathway.
 * They are retained as historical architecture (Invariant 4: history is immutable).
 *
 * The governed replacement is:
 *   LearningEngine → KnowledgeGovernanceEngine → ApprovedKnowledgeChange
 *     → KnowledgeGraphWriteGuard → KnowledgeGraph mutation methods
 *
 * The one valuable capability from this pathway — proposing a concept by name and
 * definition — will migrate to LearningProposal in a future milestone.
 *
 * See: Milestone 031 — Learning Path Consolidation Boundary
 */
export type CandidateLearningStatus =
  | "pending"
  | "validated"
  | "rejected";

export interface CandidateEvidence {
  sourceType:
    | "conversation"
    | "journey"
    | "reflection"
    | "document"
    | "observation";

  sourceId?: string;
  description: string;
}

export interface CandidateLearning {
  id: string;

  observation: string;
  proposedConceptName: string;
  proposedDefinition: string;

  evidence: CandidateEvidence[];

  confidence: number;
  status: CandidateLearningStatus;

  proposedRelatedConceptIds: string[];

  createdAt: string;
  createdBy: string;

  reviewedAt?: string;
  reviewedBy?: string;
  reviewReason?: string;
}