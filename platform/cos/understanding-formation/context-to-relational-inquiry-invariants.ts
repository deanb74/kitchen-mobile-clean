import type {
    RelationalInquiryFormationInput,
    RelationalInquiryFormationResult,
} from "./context-to-relational-inquiry";

export type RelationalInquiryInvariantId =
  | "CTRI-I-01" | "CTRI-I-02" | "CTRI-I-03" | "CTRI-I-04" | "CTRI-I-05"
  | "CTRI-I-06" | "CTRI-I-07" | "CTRI-I-08" | "CTRI-I-09" | "CTRI-I-10"
  | "CTRI-I-11" | "CTRI-I-12" | "CTRI-I-13" | "CTRI-I-14" | "CTRI-I-15"
  | "CTRI-I-16" | "CTRI-I-17" | "CTRI-I-18" | "CTRI-I-19" | "CTRI-I-20";

export interface RelationalInquiryInvariantViolation {
  invariant: RelationalInquiryInvariantId;
  description: string;
}

export function checkRelationalInquiryInvariants(
  input: RelationalInquiryFormationInput,
  output: RelationalInquiryFormationResult | undefined,
): RelationalInquiryInvariantViolation[] {
  if (!output) {
    return [violation("CTRI-I-20", "Inquiry formation produced no assessed status.")];
  }

  const violations: RelationalInquiryInvariantViolation[] = [];
  const availableIds = new Set(input.evidence.map((item) => item.evidenceId));
  const selectedIds = output.selectedEvidence.map((item) => item.evidenceId);
  const excludedIds = output.excludedEvidence.map((item) => item.evidenceId);
  const currentIds = new Set(
    input.evidence
      .filter((item) => item.lifecycleStatus === "current")
      .map((item) => item.evidenceId),
  );

  if ((output as unknown as { owner?: string }).owner &&
      (output as unknown as { owner?: string }).owner !== "Understanding") {
    violations.push(violation("CTRI-I-01", "Inquiry formation has moved outside Understanding."));
  }
  if (["expectedStatus", "expectedQuestion", "expectedSelection"].some(
    (key) => key in (input as unknown as Record<string, unknown>),
  )) {
    violations.push(violation("CTRI-I-02", "Runtime input contains an expected inquiry result."));
  }
  if (output.status === "RELATIONAL_INQUIRY_FORMED" && output.triggerEvidenceIds.length === 0) {
    violations.push(violation("CTRI-I-03", "A formed inquiry lacks material trigger evidence."));
  }
  if (output.status === "RELATIONAL_INQUIRY_FORMED" &&
      !input.evidence.some((item) => materialTrigger(item.kind))) {
    violations.push(violation("CTRI-I-04", "A formed inquiry depends on no semantic trigger beyond surface tokens."));
  }
  if (selectedIds.some((id) => !availableIds.has(id))) {
    violations.push(violation("CTRI-I-05", "Selected evidence lacks attributable input lineage."));
  }
  if ([...output.selectedEvidence, ...output.excludedEvidence].some(
    (item) => item.reason.trim().length === 0,
  ) || new Set([...selectedIds, ...excludedIds]).size !== availableIds.size) {
    violations.push(violation("CTRI-I-06", "Selection or exclusion rationale is incomplete."));
  }
  const hiddenClaims = input.evidence
    .filter((item) => item.claim && item.kind !== "direct-relationship")
    .map((item) => normalise(item.claim as string));
  if (output.neutralQuestion && hiddenClaims.some(
    (claim) => claim.length > 0 && normalise(output.neutralQuestion as string).includes(claim),
  )) {
    violations.push(violation("CTRI-I-07", "The neutral question contains an unsupported candidate relationship."));
  }
  if ((output as unknown as { currentFactFromRule?: unknown }).currentFactFromRule) {
    violations.push(violation("CTRI-I-08", "A governed rule was collapsed into a current fact."));
  }
  if (output.selectedEvidence.some((item) => item.lifecycleStatus !== "current")) {
    violations.push(violation("CTRI-I-09", "Stale or superseded evidence is presented as current support."));
  }
  if (output.purposeReference !== input.purpose.id || output.contextReferences.length === 0) {
    violations.push(violation("CTRI-I-10", "Inquiry evidence is not anchored to current purpose and Context."));
  }
  if ((output as unknown as { wordingDependent?: unknown }).wordingDependent) {
    violations.push(violation("CTRI-I-11", "Inquiry evidence declares dependence on surface wording."));
  }
  if (output.intendedRecipientId && !input.evidence.some(
    (item) => item.providerId === output.intendedRecipientId,
  )) {
    violations.push(violation("CTRI-I-12", "Intended-recipient scope lacks provider provenance."));
  }
  if (output.status === "RELATIONAL_INQUIRY_FORMED" &&
      input.evidence.every((item) => item.kind === "independent-fact")) {
    violations.push(violation("CTRI-I-13", "Independent facts were forced into a relational inquiry."));
  }
  if (output.status === "RELATIONAL_INQUIRY_FORMATION_GAP" &&
      (!output.formationGap || !output.neededEvidence || !output.safeCurrentMeaning)) {
    violations.push(violation("CTRI-I-14", "Formation gap evidence is incomplete."));
  }
  if ((output as unknown as { envelopeKind?: unknown }).envelopeKind) {
    violations.push(violation("CTRI-I-15", "Inquiry formation selected a downstream envelope answer."));
  }
  if ("selectedResponse" in output || "action" in output) {
    violations.push(violation("CTRI-I-16", "Inquiry formation selected a response or Action."));
  }
  if ("authority" in output || "alignmentStatus" in output) {
    violations.push(violation("CTRI-I-17", "Inquiry formation declared Authority or alignment."));
  }
  const correction = input.evidence.find((item) => item.correctsInquiryId);
  if (correction &&
      (output.priorInquiryId !== correction.correctsInquiryId ||
       output.correctionEvidenceId !== correction.evidenceId)) {
    violations.push(violation("CTRI-I-18", "Correction does not preserve prior inquiry lineage."));
  }
  if (!Number.isFinite(output.confidence) || output.confidence < 0 || output.confidence > 1 ||
      selectedIds.some((id) => !currentIds.has(id))) {
    violations.push(violation("CTRI-I-19", "Confidence is not tied to current selected evidence."));
  }

  return violations;
}

function materialTrigger(kind: string): boolean {
  return [
    "recipient-correction",
    "direct-relationship",
    "unexplained-concern",
    "decision",
    "rule-applicability",
  ].includes(kind);
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function violation(
  invariant: RelationalInquiryInvariantId,
  description: string,
): RelationalInquiryInvariantViolation {
  return { invariant, description };
}