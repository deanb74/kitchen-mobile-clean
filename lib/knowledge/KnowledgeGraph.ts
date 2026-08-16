import type { GuardResult } from "../knowledge-governance/writeGuard";
import type { Concept, ConceptStatus, EvidenceLevel } from "./Concept";
import {
    ConceptGraph,
    type ConceptConnection,
    type ConceptPath,
} from "./ConceptGraph";
import { ConceptIndex } from "./ConceptIndex";
import type { ConceptProvenanceInput, ConceptProvenanceRecord } from "./ConceptProvenanceRecord";
import { KnowledgeGraphMutation, type MutationResult } from "./KnowledgeGraphMutation";

export interface KnowledgeGraphNode {
  concept: Concept;
  relatedConcepts: Concept[];
  referencedBy: Concept[];
  neighbours: Concept[];
}

/** Read-only evidence view for a concept. No trust score — evidence only. */
export interface ConceptTrustSummary {
  conceptId: string;
  status: ConceptStatus;
  evidenceLevel: EvidenceLevel;
  reinforcementCount: number;
  lastReinforcedAt?: string;
  daysSinceLastReinforcement?: number;
  challengedBy: string[];
  requiresReview: boolean;
}

export class KnowledgeGraph {
  private readonly index: ConceptIndex;
  private readonly graph: ConceptGraph;
  private readonly mutation: KnowledgeGraphMutation;

  constructor(concepts: Concept[] = []) {
    this.index = new ConceptIndex(concepts);
    this.graph = new ConceptGraph(this.index);
    this.mutation = new KnowledgeGraphMutation(
      (c) => this.index.add(c),
      (c) => this.index.upsert(c),
      (id) => this.index.getById(id),
    );
  }

  getConcept(idOrName: string): Concept | undefined {
    return this.index.getByIdOrName(idOrName);
  }

  requireConcept(idOrName: string): Concept {
    return this.index.requireByIdOrName(idOrName);
  }

  getConcepts(): Concept[] {
    return this.index.getAll();
  }

  search(query: string): Concept[] {
    return this.index.search(query);
  }

  getConnections(): ConceptConnection[] {
    return this.graph.getConnections();
  }

  getRelatedConcepts(conceptId: string): Concept[] {
    return this.index.findRelated(conceptId);
  }

  getReferencedBy(conceptId: string): Concept[] {
    return this.graph.getReferencedBy(conceptId);
  }

  getNeighbours(conceptId: string): Concept[] {
    return this.graph.getNeighbours(conceptId);
  }

  getNode(idOrName: string): KnowledgeGraphNode {
    const concept = this.requireConcept(idOrName);

    return {
      concept,
      relatedConcepts:
        this.getRelatedConcepts(concept.id),
      referencedBy:
        this.getReferencedBy(concept.id),
      neighbours:
        this.getNeighbours(concept.id),
    };
  }

  getMissingReferences(): ConceptConnection[] {
    return this.graph.getMissingReferences();
  }

  // ── Governed mutation methods ────────────────────────────────────────────────
  // All three require guardResult.permitted === true.
  // The Write Guard (Milestone 029) produces GuardResult; the caller sequences.

  /** New growth — introduce knowledge that has earned permission to exist. */
  addConcept(
    concept: Concept,
    guardResult: GuardResult,
    provenance: ConceptProvenanceInput,
  ): MutationResult {
    return this.mutation.addConcept(concept, guardResult, provenance);
  }

  /** Refined growth — improve existing knowledge; previous state is preserved. */
  updateConcept(
    id: string,
    proposed: Concept,
    guardResult: GuardResult,
    provenance: ConceptProvenanceInput,
  ): MutationResult {
    return this.mutation.updateConcept(id, proposed, guardResult, provenance);
  }

  /** Dormant growth — deprecate a concept without deleting it. History remains. */
  retireConcept(
    id: string,
    guardResult: GuardResult,
    provenance: ConceptProvenanceInput,
  ): MutationResult {
    return this.mutation.retireConcept(id, guardResult, provenance);
  }

  /** Returns the full provenance history for a concept. */
  getConceptHistory(conceptId: string): ConceptProvenanceRecord[] {
    return this.mutation.provenanceStore.getHistory(conceptId);
  }

  /** Read-only evidence view — surfaces why a concept deserves trust. No trust score. */
  getTrustSummary(conceptId: string): ConceptTrustSummary {
    const concept = this.requireConcept(conceptId);
    const history = this.getConceptHistory(conceptId);

    const reinforcementCount = history.filter(
      (r) => r.changeIntent === "reinforce",
    ).length;

    const daysSinceLastReinforcement = concept.lastReinforcedAt
      ? Math.floor(
          (Date.now() - new Date(concept.lastReinforcedAt).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : undefined;

    const challenged = concept.challengedBy ?? [];

    // requiresReview is a signal for the reviewer — not an instruction to the system.
    const requiresReview =
      challenged.length > 0 ||
      (concept.status === "validated" && reinforcementCount === 0);

    return {
      conceptId,
      status: concept.status,
      evidenceLevel: concept.evidenceLevel,
      reinforcementCount,
      lastReinforcedAt: concept.lastReinforcedAt,
      daysSinceLastReinforcement,
      challengedBy: challenged,
      requiresReview,
    };
  }

  findPath(
    fromIdOrName: string,
    toIdOrName: string,
  ): ConceptPath | undefined {
    return this.graph.findPath(
      fromIdOrName,
      toIdOrName,
    );
  }
}