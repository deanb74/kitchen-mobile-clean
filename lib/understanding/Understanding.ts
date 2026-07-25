import type {
    Concept,
    ConceptPath,
} from "../knowledge";

/**
 * Base understanding produced by any Helping Hand engine.
 */
export interface Understanding {
  summary: string;
  confidence: number;
  uncertainty: string[];
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

  steps: Array<{
    from: Concept;
    to: Concept;
    explanation: string;
  }>;
}