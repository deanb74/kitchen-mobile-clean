import type { GuardResult } from "../knowledge-governance/writeGuard";
import type { Concept } from "./Concept";
import type { ConceptProvenanceInput, ConceptProvenanceRecord } from "./ConceptProvenanceRecord";
import { ConceptProvenanceStore } from "./ConceptProvenanceRecord";

/**
 * The result of a mutation attempt.
 */
export interface MutationResult {
  applied: boolean;
  action: "added" | "updated" | "deprecated" | "rejected";
  conceptId: string;
  governanceId: string;
  provenanceRecord?: ConceptProvenanceRecord;
  reason?: string;
}

/**
 * KnowledgeGraph Mutation Layer
 *
 * The system changes itself here — for the first time.
 *
 * Three operations. One rule:
 *   guardResult.permitted === true OR the mutation does not happen.
 *
 * The mutation layer does not:
 *   - judge whether the change is good
 *   - decide whether authority was sufficient
 *   - know which DC originated the learning
 *   - call the guard internally
 *
 * The caller sequences: Guard → Mutation.
 * The mutation layer trusts the GuardResult it receives.
 */
export class KnowledgeGraphMutation {
  readonly provenanceStore = new ConceptProvenanceStore();

  constructor(
    private readonly addToIndex: (concept: Concept) => void,
    private readonly upsertToIndex: (concept: Concept) => void,
    private readonly getFromIndex: (id: string) => Concept | undefined,
  ) {}

  /**
   * New growth — introduce knowledge that has earned permission to exist.
   * Concepts added here begin as "candidate" unless explicitly set otherwise.
   */
  addConcept(
    concept: Concept,
    guardResult: GuardResult,
    provenance: ConceptProvenanceInput,
  ): MutationResult {
    if (!guardResult.permitted) {
      return this.rejected(concept.id, provenance.governanceId, guardResult.reason);
    }

    const existing = this.getFromIndex(concept.id);
    if (existing) {
      return this.rejected(
        concept.id,
        provenance.governanceId,
        `Concept "${concept.id}" already exists. Use updateConcept to modify it.`,
      );
    }

    // New concepts start as "candidate" unless the approved change explicitly set validated.
    const toAdd: Concept =
      concept.status === "validated" || concept.status === "deprecated"
        ? concept
        : { ...concept, status: "candidate" };

    this.addToIndex(toAdd);
    this.recordChallenge(provenance);

    const record = this.provenanceStore.record(concept.id, provenance);

    return {
      applied: true,
      action: "added",
      conceptId: concept.id,
      governanceId: provenance.governanceId,
      provenanceRecord: record,
    };
  }

  /**
   * Refined growth — improve or adjust existing knowledge.
   * Previous state is preserved in provenance — it was not wrong,
   * it was the best understanding at the time.
   */
  updateConcept(
    id: string,
    proposed: Concept,
    guardResult: GuardResult,
    provenance: ConceptProvenanceInput,
  ): MutationResult {
    if (!guardResult.permitted) {
      return this.rejected(id, provenance.governanceId, guardResult.reason);
    }

    const previous = this.getFromIndex(id);
    if (!previous) {
      return this.rejected(
        id,
        provenance.governanceId,
        `Concept "${id}" not found. Cannot update a concept that does not exist.`,
      );
    }

    if (previous.status === "core-principle" && previous.evidenceLevel === "constitutional") {
      return this.rejected(
        id,
        provenance.governanceId,
        "Constitutional core-principle concepts are immutable through the learning loop.",
      );
    }

    const updated: Concept = {
      ...proposed,
      id,
      createdAt: previous.createdAt,
      createdBy: previous.createdBy,
      updatedAt: new Date().toISOString(),
      // Only reinforce operations count as independent confirmation — not edits or supersessions.
      lastReinforcedAt:
        provenance.changeIntent === "reinforce"
          ? new Date().toISOString()
          : previous.lastReinforcedAt,
    };

    this.upsertToIndex(updated);
    this.recordChallenge(provenance);

    const record = this.provenanceStore.record(id, provenance, previous);

    return {
      applied: true,
      action: "updated",
      conceptId: id,
      governanceId: provenance.governanceId,
      provenanceRecord: record,
    };
  }

  /**
   * Dormant growth — remove a concept from active inheritance without destroying memory.
   * Status becomes "deprecated". The concept is never deleted.
   * History remains fully queryable.
   */
  retireConcept(
    id: string,
    guardResult: GuardResult,
    provenance: ConceptProvenanceInput,
  ): MutationResult {
    if (!guardResult.permitted && guardResult.action !== "deprecate") {
      return this.rejected(id, provenance.governanceId, guardResult.reason);
    }

    const previous = this.getFromIndex(id);
    if (!previous) {
      return this.rejected(
        id,
        provenance.governanceId,
        `Concept "${id}" not found. Cannot retire a concept that does not exist.`,
      );
    }

    if (previous.status === "deprecated") {
      return this.rejected(
        id,
        provenance.governanceId,
        `Concept "${id}" is already deprecated.`,
      );
    }

    // Invariant 4: retirement is deprecation, never deletion.
    const deprecated: Concept = {
      ...previous,
      status: "deprecated",
      updatedAt: new Date().toISOString(),
    };

    this.upsertToIndex(deprecated);

    const record = this.provenanceStore.record(id, provenance, previous);

    return {
      applied: true,
      action: "deprecated",
      conceptId: id,
      governanceId: provenance.governanceId,
      provenanceRecord: record,
    };
  }

  // Wires a challenge relationship when the reviewer flags a conflict with an existing concept.
  // A challenge means "this governance decision questioned this concept" — not "this concept is wrong".
  private recordChallenge(provenance: ConceptProvenanceInput): void {
    if (!provenance.conflictsWithConceptId) return;
    const challenged = this.getFromIndex(provenance.conflictsWithConceptId);
    if (!challenged) return;
    const existing = challenged.challengedBy ?? [];
    if (existing.includes(provenance.governanceId)) return;
    this.upsertToIndex({
      ...challenged,
      challengedBy: [...existing, provenance.governanceId],
    });
  }

  private rejected(conceptId: string, governanceId: string, reason?: string): MutationResult {
    return {
      applied: false,
      action: "rejected",
      conceptId,
      governanceId,
      reason: reason ?? "Guard did not permit this change.",
    };
  }
}
