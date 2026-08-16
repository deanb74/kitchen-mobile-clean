import type { Observation } from "../../../platform/cos/observation";
import type { Translation, TranslationRule } from "../../../platform/cos/translation";
import { translateObservations } from "../../../platform/cos/translation";
import type { RepositoryDocument } from "../repositoryKnowledgeService";

/**
 * Andy's Institutional Translation Rules — DC layer.
 *
 * COS owns the translation mechanism.
 * Andy supplies institutional meaning.
 *
 * Rules interpret document category, not document content.
 * No hospitality, venue, or professional domain terms enter COS.
 */
export const institutionalTranslationRules: TranslationRule[] = [
  {
    matches: (obs) => obs.category === "principle" || obs.category === "constitution",
    translate: (obs) => ({
      observationId: obs.id,
      meaning:
        "This is a governing principle with highest authority. It shapes how every Digital Colleague understands and acts.",
      confidence: obs.confidence,
    }),
  },
  {
    matches: (obs) => obs.category === "theory",
    translate: (obs) => ({
      observationId: obs.id,
      meaning:
        "This is a theoretical foundation that governs all architecture and implementation decisions.",
      confidence: obs.confidence,
    }),
  },
  {
    matches: (obs) => obs.category === "architecture",
    translate: (obs) => ({
      observationId: obs.id,
      meaning:
        "This is a design decision that expresses governing principles in implementation terms.",
      confidence: obs.confidence,
    }),
  },
  {
    matches: (obs) => obs.category === "milestone" || obs.category === "governance",
    translate: (obs) => ({
      observationId: obs.id,
      meaning:
        "This is evidence of a governed decision or an achieved organisational capability.",
      confidence: obs.confidence,
    }),
  },
  {
    matches: (obs) => obs.category === "identity",
    translate: (obs) => ({
      observationId: obs.id,
      meaning:
        "This defines what Helping Hand is, what it does, or why it exists.",
      confidence: obs.confidence,
    }),
  },
];

/** Converts a RepositoryDocument to an Observation for the COS translation pipeline. */
export function repositoryDocumentToObservation(doc: RepositoryDocument): Observation {
  return {
    id: doc.id,
    category: classifyCategoryFromPath(doc.sourcePath),
    description: doc.section || doc.fragment.substring(0, 200),
    confidence: Math.min(Math.max(doc.score / 10, 0.1), 1.0),
    source: "document",
  };
}

/** Translates repository documents through Andy's institutional rules. */
export function translateDocumentsForFormation(documents: RepositoryDocument[]): Translation[] {
  const observations = documents.map(repositoryDocumentToObservation);
  return translateObservations(observations, institutionalTranslationRules);
}

// Maps sourcePath to an observation category for rule matching.
function classifyCategoryFromPath(sourcePath: string): string {
  const p = sourcePath.toLowerCase();

  if (p.startsWith("constitution/") || p.startsWith("docs/philosophy/")) return "principle";
  if (p.startsWith("docs/theory/")) return "theory";
  if (p.startsWith("docs/architecture/") || p.startsWith("docs/engineering/")) return "architecture";
  if (p.startsWith("docs/milestones/") || p.startsWith("docs/governance/")) return "milestone";
  if (p.startsWith("docs/organisation/") || p.startsWith("docs/institution/")) return "governance";
  if (p.includes("founding") || p.includes("manifesto") || p.includes("knowledge_architecture")) {
    return "identity";
  }

  return "document";
}
