import type { FormationInput } from "./types";

/**
 * Structural readiness report produced by validateFormationInputs().
 *
 * COS-owned — describes what Formation type fields are absent or underpopulated.
 * Contains no professional knowledge. No domain terms. No DC-specific gaps.
 */
export interface StructuralReadinessReport {
  structurallyReady: boolean;
  structuralGaps: string[];
}

/**
 * validateFormationInputs — COS Pre-Formation Structural Check
 *
 * Takes a candidate FormationInput (possibly partial — DC may not have all inputs yet).
 * Returns whether the Formation type structure meets the minimum threshold for form() to
 * produce something meaningful rather than a structural placeholder.
 *
 * Does NOT know: professional domain terms, venue meaning, or domain-specific thresholds.
 * Knows ONLY: the FormationInput type contract.
 */
export function validateFormationInputs(
  input: Partial<FormationInput>,
): StructuralReadinessReport {
  const gaps: string[] = [];

  const translations = input.translations ?? [];
  const situational = input.context?.situational;
  const knowledge = input.knowledge ?? [];

  if (translations.length === 0) {
    gaps.push("No observations have been translated.");
  } else {
    const lowConfidenceCount = translations.filter((t) => t.confidence < 0.7).length;
    if (lowConfidenceCount === translations.length) {
      gaps.push(`All ${lowConfidenceCount} translation(s) have low confidence.`);
    }
  }

  const hasAnySituationalContext =
    !!situational?.urgency || !!situational?.risk || !!situational?.what;

  if (!hasAnySituationalContext) {
    gaps.push("Situational context is absent.");
  }

  if (knowledge.length === 0) {
    gaps.push("No applicable knowledge principles provided.");
  }

  return {
    structurallyReady: gaps.length === 0,
    structuralGaps: gaps,
  };
}
