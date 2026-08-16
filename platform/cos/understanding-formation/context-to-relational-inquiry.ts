export type RelationalInquiryFormationStatus =
  | "RELATIONAL_INQUIRY_FORMED"
  | "NO_MATERIAL_RELATIONAL_INQUIRY"
  | "RELATIONAL_INQUIRY_FORMATION_GAP";

export type RelationalInquiryPurposeKind =
  | "understand-intended-meaning"
  | "understand-request"
  | "understand-decision"
  | "apply-governed-rule"
  | "record-accuracy"
  | "inventory"
  | "archive-completeness";

export type RelationalInquiryEvidenceKind =
  | "context-meaning"
  | "recipient-assessment"
  | "recipient-correction"
  | "request"
  | "unexplained-concern"
  | "decision"
  | "alternative-context"
  | "direct-relationship"
  | "governed-rule"
  | "rule-applicability"
  | "independent-fact";

export interface RelationalInquiryFormationEvidence {
  id: string;
  evidenceId: string;
  kind: RelationalInquiryEvidenceKind;
  providerId?: string;
  scopeId: string;
  lifecycleStatus: "current" | "stale" | "superseded";
  confidence?: number;
  correctionKind?: "relational-significance" | "transcription" | "purpose";
  claim?: string;
  relatedEvidenceIds?: string[];
  applicability?: "confirmed" | "uncertain";
  correctsInquiryId?: string;
}

export interface RelationalInquiryFormationInput {
  id: string;
  purpose: {
    id: string;
    kind: RelationalInquiryPurposeKind;
  };
  contextReferences: string[];
  evidence: RelationalInquiryFormationEvidence[];
}

export interface RelationalInquirySelection {
  evidenceId: string;
  reason: string;
  lifecycleStatus: RelationalInquiryFormationEvidence["lifecycleStatus"];
}

export interface RelationalInquiryFormationResult {
  id: string;
  status: RelationalInquiryFormationStatus;
  purposeReference: string;
  contextReferences: string[];
  availableEvidenceIds: string[];
  selectedEvidence: RelationalInquirySelection[];
  excludedEvidence: RelationalInquirySelection[];
  triggerEvidenceIds: string[];
  intendedRecipientId?: string;
  neutralQuestion?: string;
  materiality?: string;
  confidence: number;
  uncertainty: string[];
  alternatives: { evidenceId: string; claim: string }[];
  directlySuppliedRelationshipEvidenceIds: string[];
  distinguishingEvidenceNeed?: string;
  noInquiryReason?: string;
  reconsiderationTrigger?: string;
  formationGap?: string;
  neededEvidence?: string;
  safeCurrentMeaning?: string;
  priorInquiryId?: string;
  correctionEvidenceId?: string;
}

export function formRelationalInquiry(
  input: RelationalInquiryFormationInput,
): RelationalInquiryFormationResult {
  const currentEvidence = input.evidence.filter(
    (item) => item.lifecycleStatus === "current",
  );
  const relationalCorrection = currentEvidence.find(
    (item) =>
      item.kind === "recipient-correction" &&
      item.correctionKind === "relational-significance" &&
      item.providerId,
  );
  const supportsIntendedMeaning =
    input.purpose.kind === "understand-intended-meaning";

  if (relationalCorrection && supportsIntendedMeaning) {
    const selectedIds = new Set(
      currentEvidence
        .filter(
          (item) =>
            item.scopeId === relationalCorrection.scopeId &&
            (item.kind === "context-meaning" ||
              item.kind === "recipient-assessment" ||
              item.id === relationalCorrection.id),
        )
        .map((item) => item.evidenceId),
    );
    const recipientId = relationalCorrection.providerId;

    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMED",
      selectedIds,
      triggerEvidenceIds: [relationalCorrection.evidenceId],
      intendedRecipientId: recipientId,
      neutralQuestion:
        `Why did ${recipientId} supply the selected meanings together, ` +
        "and what relationship makes them significant?",
      materiality:
        "The intended recipient has reported that accurate preservation does not yet demonstrate relational meaning.",
      alternatives: [],
      directlySuppliedRelationshipEvidenceIds: [],
      uncertainty: [
        `The relationship intended by ${recipientId} remains unknown.`,
      ],
      priorInquiryId: relationalCorrection.correctsInquiryId,
      correctionEvidenceId: relationalCorrection.evidenceId,
    });
  }

  const directRelationship = currentEvidence.find(
    (item) => item.kind === "direct-relationship",
  );
  if (directRelationship?.providerId) {
    const selectedIds = new Set([
      directRelationship.evidenceId,
      ...(directRelationship.relatedEvidenceIds ?? []),
    ]);
    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMED",
      selectedIds,
      triggerEvidenceIds: [directRelationship.evidenceId],
      intendedRecipientId: directRelationship.providerId,
      neutralQuestion:
        `What relationship did ${directRelationship.providerId} directly supply ` +
        "among the referenced meanings, and why is it material here?",
      materiality:
        "The attributable relationship can be examined without presenting it as independently discovered.",
      alternatives: [],
      directlySuppliedRelationshipEvidenceIds: [directRelationship.evidenceId],
      uncertainty: [],
    });
  }

  const request = currentEvidence.find((item) => item.kind === "request");
  const concern = currentEvidence.find(
    (item) =>
      item.kind === "unexplained-concern" &&
      item.providerId &&
      item.providerId === request?.providerId,
  );
  if (
    input.purpose.kind === "understand-request" &&
    request?.providerId &&
    concern
  ) {
    const alternatives = currentEvidence.filter(
      (item) => item.kind === "alternative-context" && item.claim,
    );
    const purposeCorrection = currentEvidence.find(
      (item) =>
        item.kind === "recipient-correction" && item.correctionKind === "purpose",
    );
    const selectedIds = new Set([
      request.evidenceId,
      concern.evidenceId,
      ...alternatives.map((item) => item.evidenceId),
      ...(purposeCorrection ? [purposeCorrection.evidenceId] : []),
    ]);
    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMED",
      selectedIds,
      triggerEvidenceIds: [concern.evidenceId],
      intendedRecipientId: request.providerId,
      neutralQuestion:
        `Why does ${request.providerId}'s unexplained concern relate to the current request?`,
      materiality:
        "The request cannot be understood from surrounding Context alone.",
      alternatives: alternatives.map((item) => ({
        evidenceId: item.evidenceId,
        claim: item.claim as string,
      })),
      directlySuppliedRelationshipEvidenceIds: [],
      uncertainty: alternatives.map(
        (item) => `Plausible but unconfirmed: ${item.claim}`,
      ),
      distinguishingEvidenceNeed:
        `${request.providerId}'s attributable explanation of the concern.`,
      priorInquiryId: purposeCorrection?.correctsInquiryId,
      correctionEvidenceId: purposeCorrection?.evidenceId,
    });
  }

  const decision = currentEvidence.find((item) => item.kind === "decision");
  const alternatives = currentEvidence.filter(
    (item) => item.kind === "alternative-context" && item.claim,
  );
  if (
    input.purpose.kind === "understand-decision" &&
    decision &&
    alternatives.length > 1
  ) {
    const selectedIds = new Set([
      decision.evidenceId,
      ...alternatives.map((item) => item.evidenceId),
    ]);
    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMED",
      selectedIds,
      triggerEvidenceIds: [decision.evidenceId],
      intendedRecipientId: decision.providerId,
      neutralQuestion:
        "Which attributable consideration, if either, informed the current decision?",
      materiality:
        "Multiple evidence-linked frames remain credible and cannot be responsibly collapsed.",
      alternatives: alternatives.map((item) => ({
        evidenceId: item.evidenceId,
        claim: item.claim as string,
      })),
      directlySuppliedRelationshipEvidenceIds: [],
      uncertainty: alternatives.map(
        (item) => `Plausible but unconfirmed: ${item.claim}`,
      ),
      distinguishingEvidenceNeed:
        "Attributable context from the decision provider that distinguishes the alternatives.",
    });
  }

  const rule = currentEvidence.find((item) => item.kind === "governed-rule");
  const uncertainApplicability = currentEvidence.find(
    (item) =>
      item.kind === "rule-applicability" && item.applicability === "uncertain",
  );
  if (
    input.purpose.kind === "apply-governed-rule" &&
    rule &&
    uncertainApplicability
  ) {
    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMATION_GAP",
      selectedIds: new Set([rule.evidenceId, uncertainApplicability.evidenceId]),
      triggerEvidenceIds: [uncertainApplicability.evidenceId],
      alternatives: [],
      directlySuppliedRelationshipEvidenceIds: [],
      uncertainty: ["The governed rule's current applicability is unknown."],
      formationGap:
        "Current Context does not establish whether the governed rule applies.",
      neededEvidence:
        "Current attributable Context that establishes the rule's applicability.",
      safeCurrentMeaning:
        "The rule remains governed Knowledge and is not a current fact.",
    });
  }

  const assessmentWithoutProvider = currentEvidence.find(
    (item) => item.kind === "recipient-assessment" && !item.providerId,
  );
  if (supportsIntendedMeaning && assessmentWithoutProvider) {
    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMATION_GAP",
      selectedIds: new Set([assessmentWithoutProvider.evidenceId]),
      triggerEvidenceIds: [assessmentWithoutProvider.evidenceId],
      alternatives: [],
      directlySuppliedRelationshipEvidenceIds: [],
      uncertainty: ["The intended-meaning source is not attributable."],
      formationGap:
        "Source provenance is insufficient to establish intended-recipient scope.",
      neededEvidence:
        "Attributable provider provenance for the recipient assessment.",
      safeCurrentMeaning:
        "The assessment is preserved but cannot establish who owns alignment.",
    });
  }

  const unavailableRelationalEvidence = input.evidence.find(
    (item) =>
      item.lifecycleStatus !== "current" &&
      (item.kind === "recipient-correction" ||
        item.kind === "direct-relationship"),
  );
  if (supportsIntendedMeaning && unavailableRelationalEvidence) {
    return result(input, {
      status: "RELATIONAL_INQUIRY_FORMATION_GAP",
      selectedIds: new Set(),
      triggerEvidenceIds: [unavailableRelationalEvidence.evidenceId],
      alternatives: [],
      directlySuppliedRelationshipEvidenceIds: [],
      uncertainty: [
        `The only relational support is ${unavailableRelationalEvidence.lifecycleStatus}.`,
      ],
      formationGap:
        "No current admissible evidence supports relational inquiry formation.",
      neededEvidence:
        "Current attributable evidence that independently makes the relationship material.",
      safeCurrentMeaning:
        "Historical relational evidence remains inspectable but is not current support.",
    });
  }

  return result(input, {
    status: "NO_MATERIAL_RELATIONAL_INQUIRY",
    selectedIds: new Set(),
    triggerEvidenceIds: [],
    alternatives: [],
    directlySuppliedRelationshipEvidenceIds: [],
    uncertainty: [],
    noInquiryReason:
      "No current attributable evidence makes relational examination material to the present purpose.",
    reconsiderationTrigger:
      "Reconsider if current attributable evidence or the governed purpose changes.",
  });
}

function result(
  input: RelationalInquiryFormationInput,
  fields: {
    status: RelationalInquiryFormationStatus;
    selectedIds: Set<string>;
    triggerEvidenceIds: string[];
    intendedRecipientId?: string;
    neutralQuestion?: string;
    materiality?: string;
    alternatives: { evidenceId: string; claim: string }[];
    directlySuppliedRelationshipEvidenceIds: string[];
    uncertainty: string[];
    distinguishingEvidenceNeed?: string;
    noInquiryReason?: string;
    reconsiderationTrigger?: string;
    formationGap?: string;
    neededEvidence?: string;
    safeCurrentMeaning?: string;
    priorInquiryId?: string;
    correctionEvidenceId?: string;
  },
): RelationalInquiryFormationResult {
  return {
    id: `${input.id}:relational-inquiry`,
    status: fields.status,
    purposeReference: input.purpose.id,
    contextReferences: [...input.contextReferences],
    availableEvidenceIds: input.evidence.map((item) => item.evidenceId),
    selectedEvidence: input.evidence
      .filter((item) => fields.selectedIds.has(item.evidenceId))
      .map((item) => ({
        evidenceId: item.evidenceId,
        reason: selectionReason(item),
        lifecycleStatus: item.lifecycleStatus,
      })),
    excludedEvidence: input.evidence
      .filter((item) => !fields.selectedIds.has(item.evidenceId))
      .map((item) => ({
        evidenceId: item.evidenceId,
        reason:
          item.lifecycleStatus === "current"
            ? "Not material to the formed inquiry for the current purpose."
            : `Excluded because the evidence is ${item.lifecycleStatus}.`,
          lifecycleStatus: item.lifecycleStatus,
      })),
    triggerEvidenceIds: fields.triggerEvidenceIds,
    intendedRecipientId: fields.intendedRecipientId,
    neutralQuestion: fields.neutralQuestion,
    materiality: fields.materiality,
    confidence: confidenceFor(input, fields.selectedIds),
    uncertainty: fields.uncertainty,
    alternatives: fields.alternatives,
    directlySuppliedRelationshipEvidenceIds:
      fields.directlySuppliedRelationshipEvidenceIds,
    distinguishingEvidenceNeed: fields.distinguishingEvidenceNeed,
    noInquiryReason: fields.noInquiryReason,
    reconsiderationTrigger: fields.reconsiderationTrigger,
    formationGap: fields.formationGap,
    neededEvidence: fields.neededEvidence,
    safeCurrentMeaning: fields.safeCurrentMeaning,
    priorInquiryId: fields.priorInquiryId,
    correctionEvidenceId: fields.correctionEvidenceId,
  };
}

function selectionReason(item: RelationalInquiryFormationEvidence): string {
  if (item.kind === "context-meaning") {
    return "Current attributable meaning within the correction scope.";
  }
  if (item.kind === "recipient-assessment") {
    return "Current recipient assessment makes relational examination material.";
  }
  return "Current attributable relational correction triggers examination.";
}

function confidenceFor(
  input: RelationalInquiryFormationInput,
  selectedIds: Set<string>,
): number {
  const selected = input.evidence.filter((item) => selectedIds.has(item.evidenceId));
  if (selected.length === 0) return 0;
  const average = selected.reduce(
    (total, item) => total + (item.confidence ?? 1),
    0,
  ) / selected.length;
  return Number(average.toFixed(2));
}