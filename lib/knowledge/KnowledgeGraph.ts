import type { Concept } from "./Concept";
import {
    ConceptGraph,
    type ConceptConnection,
    type ConceptPath,
} from "./ConceptGraph";
import { ConceptIndex } from "./ConceptIndex";

export interface KnowledgeGraphNode {
  concept: Concept;
  relatedConcepts: Concept[];
  referencedBy: Concept[];
  neighbours: Concept[];
}

export class KnowledgeGraph {
  private readonly index: ConceptIndex;
  private readonly graph: ConceptGraph;

  constructor(concepts: Concept[] = []) {
    this.index = new ConceptIndex(concepts);
    this.graph = new ConceptGraph(this.index);
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