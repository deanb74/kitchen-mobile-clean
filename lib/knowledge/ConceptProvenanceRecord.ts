import type { ApprovedKnowledgeChangeIntent } from "../knowledge-governance/KnowledgeGovernance";
import type { Concept } from "./Concept";

/**
 * A single entry in the provenance history for a governed concept.
 * Records what changed, who authorised it, and what the previous state was.
 */
export interface ConceptProvenanceRecord {
  conceptId: string;
  governanceId: string;
  changeIntent: ApprovedKnowledgeChangeIntent;
  changedAt: string;
  approvedBy: string;
  provenance: ReadonlyArray<string>;
  previousState?: Concept;
}

/**
 * Input required to create a provenance record.
 * Derived from ApprovedKnowledgeChange — the mutation layer does not produce these values.
 */
export interface ConceptProvenanceInput {
  governanceId: string;
  changeIntent: ApprovedKnowledgeChangeIntent;
  approvedBy: string;
  provenance: ReadonlyArray<string>;
  /** Optional: set by reviewer when this proposal questions an existing concept. Creates a challenge relationship. */
  conflictsWithConceptId?: string;
}

/**
 * In-memory store of provenance history keyed by conceptId.
 * Each entry is a chronological list — oldest first.
 */
export class ConceptProvenanceStore {
  private readonly history = new Map<string, ConceptProvenanceRecord[]>();

  record(
    conceptId: string,
    input: ConceptProvenanceInput,
    previousState?: Concept,
  ): ConceptProvenanceRecord {
    const entry: ConceptProvenanceRecord = {
      conceptId,
      governanceId: input.governanceId,
      changeIntent: input.changeIntent,
      changedAt: new Date().toISOString(),
      approvedBy: input.approvedBy,
      provenance: input.provenance,
      previousState,
    };

    const existing = this.history.get(conceptId) ?? [];
    this.history.set(conceptId, [...existing, entry]);

    return entry;
  }

  getHistory(conceptId: string): ConceptProvenanceRecord[] {
    return this.history.get(conceptId) ?? [];
  }

  hasHistory(conceptId: string): boolean {
    return (this.history.get(conceptId)?.length ?? 0) > 0;
  }
}
