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