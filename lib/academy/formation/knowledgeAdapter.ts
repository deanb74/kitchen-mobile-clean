import type { FormationKnowledge } from "../../../platform/cos/understanding-formation";
import { knowledgeAnswerToFormation, knowledgeAnswersToFormation } from "../../annie/formation/knowledgeAdapter";
import type { KnowledgeAnswer, KnowledgeLevel } from "../../os/types";
import type { RepositoryDocument } from "../repositoryKnowledgeService";

export { knowledgeAnswerToFormation, knowledgeAnswersToFormation };

/**
 * Converts a repository document into a KnowledgeAnswer.
 * Authority is determined by document path — not by how it was retrieved.
 * Does not interpret meaning — that is the translation layer's responsibility.
 */
export function repositoryDocumentToKnowledgeAnswer(doc: RepositoryDocument): KnowledgeAnswer {
  return {
    questionId: doc.id,
    answer: doc.fragment || doc.text,
    sourceLevel: classifySourcePath(doc.sourcePath),
    confidence: Math.min(doc.score / 10, 1.0),
  };
}

/** Convenience: convert a batch of repository documents to FormationKnowledge[]. */
export function repositoryDocumentsToFormation(docs: RepositoryDocument[]): FormationKnowledge[] {
  return docs.map(repositoryDocumentToKnowledgeAnswer).map(knowledgeAnswerToFormation);
}

// Classifies sourcePath to KnowledgeLevel based on document authority, not storage location.
function classifySourcePath(sourcePath: string): KnowledgeLevel {
  const p = sourcePath.toLowerCase();

  if (
    p.startsWith("constitution/") ||
    p.startsWith("docs/theory/") ||
    p.startsWith("docs/philosophy/") ||
    p.includes("founding_principles") ||
    p.includes("knowledge_architecture") ||
    p.includes("manifesto")
  ) {
    return "helping-hand";
  }

  if (p.startsWith("docs/architecture/") || p.startsWith("docs/engineering/")) {
    return "profession";
  }

  if (
    p.startsWith("docs/milestones/") ||
    p.startsWith("docs/governance/") ||
    p.startsWith("docs/organisation/") ||
    p.startsWith("docs/institution/")
  ) {
    return "organisation";
  }

  return "venue";
}
