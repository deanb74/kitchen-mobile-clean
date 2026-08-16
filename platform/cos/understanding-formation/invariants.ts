import type { Understanding } from "../../../lib/understanding/Understanding";
import type { FormationInput } from "./types";

/**
 * Understanding Formation Invariants
 *
 * These are structural guarantees — not guidelines.
 * Each invariant is checkable against any Understanding produced by form().
 *
 * Invariant 1: No meaning without evidence
 * Invariant 2: Incomplete inputs always produce uncertainty
 * Invariant 3: Evidence chain is present when translations exist
 * Invariant 4: Confidence is computed, never supplied
 * Invariant 5: Completeness is computed, never supplied
 */

export interface InvariantViolation {
  invariant: number;
  description: string;
}

/**
 * Invariant 1: No meaning without evidence.
 *
 * If no translations were provided, the summary must not assert domain meaning.
 * Formation may only produce meaning that originates from its inputs.
 */
export function checkNoMeaningWithoutEvidence(
  input: FormationInput,
  output: Understanding,
): InvariantViolation | null {
  if (input.translations.length > 0) return null;

  const domainTerms = input.knowledge.map((k) =>
    k.principle.toLowerCase().split(" "),
  ).flat();

  const summaryLower = output.summary.toLowerCase();
  const inventedMeaning = domainTerms.some(
    (term) => term.length > 4 && summaryLower.includes(term),
  );

  if (inventedMeaning) {
    return {
      invariant: 1,
      description:
        "Summary contains domain meaning despite no translations being provided.",
    };
  }

  return null;
}

/**
 * Invariant 2: Incomplete inputs always produce uncertainty.
 *
 * When translations have low confidence or context is missing,
 * the uncertainty array must be non-empty.
 */
export function checkUncertaintyNotHidden(
  input: FormationInput,
  output: Understanding,
): InvariantViolation | null {
  const hasLowConfidenceTranslation = input.translations.some(
    (t) => t.confidence < 0.7,
  );
  const missingContext =
    !input.context.situational.urgency || !input.context.situational.risk;

  const inputsAreIncomplete = hasLowConfidenceTranslation || missingContext;

  if (inputsAreIncomplete && output.uncertainty.length === 0) {
    return {
      invariant: 2,
      description:
        "Inputs are incomplete but uncertainty array is empty. Uncertainty must not be hidden.",
    };
  }

  return null;
}

/**
 * Invariant 3: Evidence chain cannot be empty when translations exist.
 *
 * Every translation that contributed to the Understanding must be traceable.
 */
export function checkEvidenceChainPresent(
  input: FormationInput,
  output: Understanding,
): InvariantViolation | null {
  if (input.translations.length === 0) return null;

  if (!output.evidenceChain || output.evidenceChain.length === 0) {
    return {
      invariant: 3,
      description:
        "Translations were provided but evidence chain is empty. Traceability is broken.",
    };
  }

  for (const translation of input.translations) {
    if (!output.evidenceChain.includes(translation.observationId)) {
      return {
        invariant: 3,
        description: `Observation "${translation.observationId}" is absent from the evidence chain.`,
      };
    }
  }

  return null;
}

/**
 * Invariant 4: Confidence is computed, not supplied.
 *
 * The form() function signature does not accept a confidence parameter.
 * This invariant verifies the type contract holds structurally.
 *
 * Checked at the type level — confidence cannot be passed as a FormationInput field.
 * This function exists as a runtime assertion for the integration test record.
 */
export function checkConfidenceNotSupplied(
  input: FormationInput,
): InvariantViolation | null {
  if ("confidence" in input) {
    return {
      invariant: 4,
      description:
        "Confidence was found in the formation input. It must be computed, not supplied.",
    };
  }
  return null;
}

/**
 * Invariant 5: Completeness is computed, not supplied.
 *
 * The form() function signature does not accept a completeness parameter.
 * This invariant verifies the type contract holds structurally.
 */
export function checkCompletenessNotSupplied(
  input: FormationInput,
): InvariantViolation | null {
  if ("completeness" in input) {
    return {
      invariant: 5,
      description:
        "Completeness was found in the formation input. It must be computed, not supplied.",
    };
  }
  return null;
}

/**
 * Run all five invariants against a formation result.
 * Returns an empty array if all invariants pass.
 */
export function checkAllInvariants(
  input: FormationInput,
  output: Understanding,
): InvariantViolation[] {
  const checks = [
    checkNoMeaningWithoutEvidence(input, output),
    checkUncertaintyNotHidden(input, output),
    checkEvidenceChainPresent(input, output),
    checkConfidenceNotSupplied(input),
    checkCompletenessNotSupplied(input),
  ];

  return checks.filter((v): v is InvariantViolation => v !== null);
}
