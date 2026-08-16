import type { FormationKnowledge } from "../../../platform/cos/understanding-formation";
import type { Concept, EvidenceLevel } from "../../knowledge/Concept";

/**
 * Governed Knowledge Adapter — Annie / DC Layer
 *
 * DC converts governed KnowledgeGraph concepts into FormationKnowledge.
 * KnowledgeGraph is the source. Formation receives the retrieved concepts.
 * COS defines the FormationKnowledge type contract.
 *
 * Evidence authority is preserved: Concept.evidenceLevel → FormationKnowledge.evidenceLevel.
 * Candidate concepts are excluded — they have not earned governance.
 * Concepts are filtered to the requesting profession before conversion.
 */

export function governedConceptsToFormation(
  concepts: Concept[],
  forProfession: string,
): FormationKnowledge[] {
  return concepts
    .filter((c) => isApplicable(c, forProfession))
    .flatMap((c) => {
      const evidenceLevel = evidenceLevelToFormation(c.evidenceLevel);
      if (!evidenceLevel) return [];
      return [{ principle: c.definition, evidenceLevel, sourceType: "knowledge-graph" as const }];
    });
}

// A concept applies when it targets this profession, all professions, or all DCs.
function isApplicable(concept: Concept, forProfession: string): boolean {
  return concept.inheritsTo.some(
    (target) => target === forProfession || target === "all" || target === "helping-hand",
  );
}

// Maps governed evidence level to formation evidence level.
// Returns undefined for "candidate" — candidate concepts do not enter formation.
function evidenceLevelToFormation(
  level: EvidenceLevel,
): FormationKnowledge["evidenceLevel"] | undefined {
  switch (level) {
    case "constitutional":  return "constitutional";
    case "multi-source":    return "professional";
    case "single-source":   return "local";
    case "candidate":       return undefined;
  }
}
