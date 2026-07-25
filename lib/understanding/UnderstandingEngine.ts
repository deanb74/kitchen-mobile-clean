import {
    KnowledgeGraph,
    type Concept,
    type ConceptPath,
} from "../knowledge";
import type {
    ConceptUnderstanding,
    PathUnderstanding,
} from "./Understanding";

export class UnderstandingEngine {
  constructor(
    private readonly knowledgeGraph: KnowledgeGraph,
  ) {}

  understandConcept(
    idOrName: string,
  ): ConceptUnderstanding {
    const node = this.knowledgeGraph.getNode(idOrName);
    const now = new Date().toISOString();

    return {
      summary:
        `${node.concept.name} is connected to ` +
        `${node.relatedConcepts.length} related concept(s) ` +
        `and referenced by ${node.referencedBy.length} concept(s).`,

      confidence: this.scoreConceptConfidence(node.concept),

      uncertainty: this.buildConceptUncertainty(
        node.concept,
        node.neighbours.length,
      ),

      createdAt: now,
      updatedAt: now,

      concept: node.concept,
      relatedConcepts: node.relatedConcepts,
      referencedBy: node.referencedBy,
      evidenceSummary: this.describeEvidence(node.concept),
      sourceCount: node.concept.sources.length,
    };
  }

  understandPath(
    fromIdOrName: string,
    toIdOrName: string,
  ): PathUnderstanding {
    const path = this.knowledgeGraph.findPath(
      fromIdOrName,
      toIdOrName,
    );

    if (!path) {
      throw new Error(
        `No concept path found from "${fromIdOrName}" to "${toIdOrName}".`,
      );
    }

    const now = new Date().toISOString();

    return {
      summary:
        `${path.concepts[0].name} reaches ` +
        `${path.concepts[path.concepts.length - 1].name} ` +
        `in ${Math.max(path.concepts.length - 1, 0)} step(s).`,

      confidence: this.scorePathConfidence(path),

      uncertainty: this.buildPathUncertainty(path),

      createdAt: now,
      updatedAt: now,

      path,
      steps: this.buildPathSteps(path),
    };
  }

  private describeEvidence(concept: Concept): string {
    const count = concept.sources.length;

    if (count === 0) {
      return "No documented sources yet.";
    }

    if (count === 1) {
      return "1 documented source.";
    }

    return `${count} documented sources.`;
  }

  private scoreConceptConfidence(concept: Concept): number {
    if (typeof concept.confidence === "number") {
      return concept.confidence;
    }

    switch (concept.evidenceLevel) {
      case "constitutional":
        return 0.95;
      case "multi-source":
        return 0.85;
      case "single-source":
        return 0.7;
      case "candidate":
      default:
        return 0.55;
    }
  }

  private scorePathConfidence(path: ConceptPath): number {
    const confidences = path.concepts.map((concept) =>
      this.scoreConceptConfidence(concept),
    );

    const sum = confidences.reduce(
      (total, value) => total + value,
      0,
    );

    return confidences.length > 0
      ? Number((sum / confidences.length).toFixed(2))
      : 0.5;
  }

  private buildConceptUncertainty(
    concept: Concept,
    neighbourCount: number,
  ): string[] {
    const uncertainty: string[] = [];

    if (concept.evidenceLevel === "candidate") {
      uncertainty.push(
        "Evidence is candidate-level and may change as validation progresses.",
      );
    }

    if (concept.sources.length === 0) {
      uncertainty.push(
        "No documentary sources are currently linked to this concept.",
      );
    }

    if (neighbourCount === 0) {
      uncertainty.push(
        "No relationships are currently recorded for this concept.",
      );
    }

    return uncertainty;
  }

  private buildPathUncertainty(path: ConceptPath): string[] {
    const uncertainty: string[] = [];

    if (path.concepts.length <= 1) {
      uncertainty.push(
        "Path contains a single concept and does not yet demonstrate a relationship chain.",
      );
    }

    const candidateLinks = path.concepts.filter(
      (concept) => concept.evidenceLevel === "candidate",
    );

    if (candidateLinks.length > 0) {
      uncertainty.push(
        `${candidateLinks.length} concept(s) in this path are candidate-level evidence.`,
      );
    }

    return uncertainty;
  }

  private buildPathSteps(
    path: ConceptPath,
  ): PathUnderstanding["steps"] {
    const steps: PathUnderstanding["steps"] = [];

    for (let index = 0; index < path.concepts.length - 1; index += 1) {
      const from = path.concepts[index];
      const to = path.concepts[index + 1];

      steps.push({
        from,
        to,
        explanation:
          `${from.name} is connected to ${to.name} ` +
          "through a recorded concept relationship.",
      });
    }

    return steps;
  }
}
