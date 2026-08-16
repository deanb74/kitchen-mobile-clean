import type { RelationalEvidenceEnvelope } from "../../../lib/understanding/Understanding";
import type { FormationInput, RelationalCorrection } from "./types";

export type RelationalInvariantId =
  | "RU-I-01"
  | "RU-I-02"
  | "RU-I-03"
  | "RU-I-04"
  | "RU-I-05"
  | "RU-I-06"
  | "RU-I-07"
  | "RU-I-08"
  | "RU-I-09"
  | "RU-I-10";

export interface RelationalInvariantViolation {
  invariant: RelationalInvariantId;
  description: string;
}

export function checkRelationalInvariants(
  input: FormationInput,
  output: RelationalEvidenceEnvelope | undefined,
): RelationalInvariantViolation[] {
  if (!input.relationalInquiry || !output) return [];

  const violations: RelationalInvariantViolation[] = [];
  const inquiry = input.relationalInquiry;
  const allowedEvidence = new Set(
    inquiry.propositions.map((proposition) => proposition.evidenceId),
  );

  if (
    output.evidence.length === 0 ||
    output.evidence.some((reference) => !allowedEvidence.has(reference.evidenceId))
  ) {
    violations.push(violation(
      "RU-I-01",
      "A material relational result lacks admissible supporting evidence.",
    ));
  }

  if (
    output.purpose !== inquiry.purpose ||
    output.contextReferences.length === 0 ||
    (output.kind === "RELATIONSHIP_PROPOSED" && output.significance.trim().length === 0)
  ) {
    violations.push(violation(
      "RU-I-02",
      "Relational significance is not anchored to the current purpose and Context.",
    ));
  }

  const hasMatchedRule = inquiry.propositions.some(
    (proposition) =>
      proposition.kind === "rule" &&
      proposition.conditions.every((condition) =>
        inquiry.propositions.some(
          (candidate) =>
            candidate.kind === "fact" &&
            candidate.attribute === condition.attribute &&
            candidate.value === condition.equals,
        ),
      ),
  );
  const hasCorrection = inquiry.propositions.some(
    (proposition) => proposition.kind === "correction",
  );
  if (
    output.kind === "RELATIONSHIP_PROPOSED" &&
    hasMatchedRule &&
    !hasCorrection &&
    !output.inferenceBasis
  ) {
    violations.push(violation(
      "RU-I-03",
      "An inferred relationship does not expose its inference basis.",
    ));
  }

  const plausibleAlternatives = inquiry.propositions.filter(
    (proposition) => proposition.kind === "alternative",
  );
  if (
    output.kind === "RELATIONSHIP_PROPOSED" &&
    plausibleAlternatives.length > 1 &&
    !hasCorrection
  ) {
    violations.push(violation(
      "RU-I-04",
      "A relationship was forced despite multiple unresolved alternatives.",
    ));
  }

  if (
    output.kind === "MATERIAL_RELATIONAL_GAP" &&
    (output.gap.trim().length < 12 || output.materiality.trim().length === 0)
  ) {
    violations.push(violation(
      "RU-I-05",
      "The material relational gap is generic or its materiality is absent.",
    ));
  }

  if (
    output.kind === "MATERIAL_RELATIONAL_GAP" &&
    !normalise(output.discoveryNeed).includes(normalise(output.gap))
  ) {
    violations.push(violation(
      "RU-I-06",
      "The discovery need does not directly address the recorded gap.",
    ));
  }

  if ("authority" in output || "permission" in output) {
    violations.push(violation(
      "RU-I-07",
      "Source relevance has leaked into Authority or permission.",
    ));
  }

  if ("alignment" in output || "alignmentStatus" in output) {
    violations.push(violation(
      "RU-I-08",
      "Understanding has attempted to declare its own alignment.",
    ));
  }

  const correction = inquiry.propositions.find(
    (proposition): proposition is RelationalCorrection =>
      proposition.kind === "correction",
  );
  if (
    correction &&
    (output.priorResultId !== correction.correctsResultId ||
      output.correctionId !== correction.id)
  ) {
    violations.push(violation(
      "RU-I-09",
      "Correction does not preserve prior-result and correction links.",
    ));
  }

  if ("selectedResponse" in output || "action" in output) {
    violations.push(violation(
      "RU-I-10",
      "Understanding has selected a response or Action.",
    ));
  }

  return violations;
}

function violation(
  invariant: RelationalInvariantId,
  description: string,
): RelationalInvariantViolation {
  return { invariant, description };
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}