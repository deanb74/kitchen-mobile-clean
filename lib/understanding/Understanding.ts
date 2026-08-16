import type {
    Concept,
    ConceptPath,
} from "../knowledge";

/** Whether the inputs to formation were sufficient to support judgement. */
export type UnderstandingCompleteness =
  | "sufficient"
  | "partial"
  | "insufficient";

export type RelationalEvidenceStatus =
  | "directly-supported"
  | "inferred"
  | "disputed"
  | "unknown";

export interface RelationalEvidenceReference {
  evidenceId: string;
  status: RelationalEvidenceStatus;
}

interface RelationalEvidenceBase {
  id: string;
  purpose: string;
  participatingMeaningIds: string[];
  contextReferences: string[];
  evidence: RelationalEvidenceReference[];
  confidence: number;
  uncertainty: string[];
  priorResultId?: string;
  correctionId?: string;
}

export interface RelationshipProposedEvidence extends RelationalEvidenceBase {
  kind: "RELATIONSHIP_PROPOSED";
  claim: string;
  significance: string;
  inferenceBasis?: string;
  alternatives: string[];
  intendedRecipientId?: string;
}

export interface MaterialRelationalGapEvidence extends RelationalEvidenceBase {
  kind: "MATERIAL_RELATIONAL_GAP";
  gap: string;
  materiality: string;
  safeCurrentMeaning: string;
  neededContext: string;
  sourceRationale: string;
  discoveryNeed: string;
}

export type RelationalEvidenceEnvelope =
  | RelationshipProposedEvidence
  | MaterialRelationalGapEvidence;

/**
 * Base understanding produced by any Helping Hand engine.
 *
 * completeness and evidenceChain are populated by Understanding Formation.
 * Hand-authored Understanding objects may omit them.
 */
export interface Understanding {
  summary: string;
  confidence: number;
  uncertainty: string[];
  /** Populated by Understanding Formation; absent from hand-authored objects. */
  completeness?: UnderstandingCompleteness;
  /** Observation and translation IDs that contributed to this understanding. */
  evidenceChain?: string[];
  /** Deduplicated source labels from institutional context — carries origin forward. */
  contextSources?: string[];
  /** Optional inspectable relational result formed before Judgement. */
  relationalEvidence?: RelationalEvidenceEnvelope;
  createdAt: string;
  updatedAt: string;
}

/**
 * Understanding of a single governed concept.
 */
export interface ConceptUnderstanding
  extends Understanding {
  concept: Concept;
  relatedConcepts: Concept[];
  referencedBy: Concept[];
  evidenceSummary: string;
  sourceCount: number;
}

/**
 * Understanding of the relationship between concepts.
 */
export interface PathUnderstanding
  extends Understanding {
  path: ConceptPath;

  steps: {
    from: Concept;
    to: Concept;
    explanation: string;
  }[];
}