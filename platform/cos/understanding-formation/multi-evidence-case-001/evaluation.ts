import {
    C18_EVALUATOR_ID,
    C18_EVALUATOR_VERSION,
    finalizeC18ComparisonRecord,
    type C18ComparisonRecordOutcome,
    type C18MaterialDimension,
} from "./comparison-evidence";
import type {
    AccumulationBaselineRecord,
    EvidenceInventory,
    HeldOutAssessment,
    MultiEvidenceRuntimeFixture,
    MultiEvidenceUnderstandingAccount,
} from "./contracts";
import { structuralDigest, type SealedAccessRecord } from "./integrity";

export type ApplicableInvariantId =
  | "MEU-I-01" | "MEU-I-02" | "MEU-I-03" | "MEU-I-04" | "MEU-I-05"
  | "MEU-I-06" | "MEU-I-07" | "MEU-I-08" | "MEU-I-09" | "MEU-I-10"
  | "MEU-I-11" | "MEU-I-12" | "MEU-I-14" | "MEU-I-15" | "MEU-I-17"
  | "MEU-I-19" | "MEU-I-21" | "MEU-I-22" | "MEU-I-23" | "MEU-I-24";

export const APPLICABLE_INVARIANTS: readonly ApplicableInvariantId[] = [
  "MEU-I-01", "MEU-I-02", "MEU-I-03", "MEU-I-04", "MEU-I-05",
  "MEU-I-06", "MEU-I-07", "MEU-I-08", "MEU-I-09", "MEU-I-10",
  "MEU-I-11", "MEU-I-12", "MEU-I-14", "MEU-I-15", "MEU-I-17",
  "MEU-I-19", "MEU-I-21", "MEU-I-22", "MEU-I-23", "MEU-I-24",
];

export const CYCLE_LOCAL_INVARIANTS: readonly ApplicableInvariantId[] =
  Object.freeze(APPLICABLE_INVARIANTS.filter(
    (invariant) => invariant !== "MEU-I-14" && invariant !== "MEU-I-15",
  ));

export const CROSS_CYCLE_INVARIANTS = Object.freeze([
  "MEU-I-14",
  "MEU-I-15",
] as const);

export interface InvariantResult {
  invariant: ApplicableInvariantId;
  status: "passed" | "failed" | "not-exercised";
  reason: string;
}

export interface InvariantControls {
  semanticReorder?: MultiEvidenceUnderstandingAccount;
  decisiveEvidenceRemoval?: MultiEvidenceUnderstandingAccount;
}

export interface TamperedOutput {
  invariant: ApplicableInvariantId;
  changedFields: string[];
  output: MultiEvidenceUnderstandingAccount;
}

export interface SemanticEvaluationResult {
  status: "passed" | "failed";
  mismatches: string[];
  evaluatorConditionStatus:
    | "SATISFIED" | "NOT_SATISFIED" | "NOT_DETERMINABLE" | "NOT_EVALUATED";
  comparisonRecords: readonly C18ComparisonRecordOutcome[];
}

export interface C18EvaluationContext {
  cycleId: string;
  candidateCaptureId: string;
  heldOutHash: string;
  c20RecordId: string;
  c20InvocationEventId: string;
}

export interface BaselineComparisonResult {
  candidateHasInspectableAccount: boolean;
  baselinePreservesCompleteInventory: boolean;
  baselineContainsUnderstandingFields: boolean;
}

export const FIXED_CONTAMINATION_RULES = Object.freeze({
  deniedSubjects: Object.freeze([
    "filesystem",
    "environment",
    "network",
    "retrieval",
    "prompt",
    "generated-context",
    "cache",
    "log",
    "memory",
    "prior-state",
    "held-out-before-output-capture",
  ]),
  requiredBeforeHeldOut: "immutable-output-capture",
});

export interface ContaminationAssessment {
  findingId: string;
  status: "clear" | "contaminated";
  findings: string[];
  sealedRecordSequenceLength: number;
}

export function checkApplicableInvariants(
  fixture: MultiEvidenceRuntimeFixture,
  output: MultiEvidenceUnderstandingAccount,
  controls: InvariantControls = {},
): InvariantResult[] {
  const inventory = inventoryOf(fixture);
  const outputRecord = output as unknown as Record<string, unknown>;
  const forbiddenText = JSON.stringify(output).toLowerCase();
  const directClaimTranslations = fixture.translations
    .filter((translation) => {
      const observation = fixture.observations.find(
        (item) => item.observationId === translation.observationId,
      );
      return /\bdirectly (reported|stated|said)\b/i.test(translation.meaning) ||
        /['"][^'"]+['"]/.test(observation?.content ?? "");
    })
    .map((item) => item.translationId);

  return [
    result("MEU-I-01", output.formationOwner === "Understanding",
      "The account owner must remain Understanding."),
    result("MEU-I-02", equalInventory(output.availableEvidenceInventory, inventory),
      "The complete candidate inventory must be preserved."),
    result("MEU-I-03",
      output.sourceClaims.length === fixture.observations.length &&
      output.translationInterpretations.length === fixture.translations.length &&
      output.translationInterpretations.every((item) =>
        fixture.translations.some((translation) =>
          translation.translationId === item.translationId &&
          translation.observationId === item.observationId)),
      "Observation claims and Translation interpretations must remain distinct."),
    result("MEU-I-04", !("callerAuthoredRelevance" in outputRecord),
      "Caller-authored relevance is prohibited."),
    result("MEU-I-05", !("callerAuthoredRelationship" in outputRecord),
      "Caller-authored relationships are prohibited."),
    result("MEU-I-06",
      output.contextReferences.length > 0 && output.purposeReference.length > 0,
      "Synthesis must remain anchored to current Context and purpose."),
    result("MEU-I-07",
      output.supportedFindings.every((finding) =>
        !finding.evidenceIds.every((id) => inventory.knowledgeCandidateIds.includes(id))),
      "Governed Knowledge alone must not become a current fact."),
    result("MEU-I-08",
      output.evidenceRelationships.every((relationship) =>
        relationship.relationshipType !== "corroboration" ||
        new Set(relationship.sourceIds).size === relationship.sourceIds.length),
      "Repeated shared-source evidence must not gain authority by volume."),
    result("MEU-I-09", !/volume|fluency/i.test(output.confidence.basis),
      "Confidence must not be derived from volume or fluency."),
    result("MEU-I-10",
      output.evidenceRelationships.every((relationship) =>
        relationship.relationshipType !== "corroboration" ||
        new Set(relationship.sourceIds).size > 1),
      "Corroboration requires attributable source independence."),
    result("MEU-I-11", output.contradictions.length > 0,
      "Contradiction treatment must remain explicit, including Not Applicable."),
    result("MEU-I-12",
      output.knowledgeApplicability.every((item) =>
        item.sourceStatus.length > 0 && item.scope.length > 0),
      "Source status and scope must remain explicit."),
    outputRecord.wordingDependent
      ? result("MEU-I-14", false, "Output declares surface-wording dependence.")
      : controlResult("MEU-I-14", controls.semanticReorder,
          controls.semanticReorder
            ? materialSignature(controls.semanticReorder) === materialSignature(output)
            : false,
          "A separately frozen semantic reorder control is required."),
    outputRecord.evidenceInsensitive
      ? result("MEU-I-15", false, "Output declares decisive-evidence insensitivity.")
      : controlResult("MEU-I-15", controls.decisiveEvidenceRemoval,
          controls.decisiveEvidenceRemoval
            ? materialSignature(controls.decisiveEvidenceRemoval) !== materialSignature(output)
            : false,
          "A separately frozen decisive-evidence removal control is required."),
    result("MEU-I-17",
      output.unknownsAndEvidenceNeeds.length === 0 ||
      output.status !== "MULTI_EVIDENCE_UNDERSTANDING_FORMED",
      "Material unknowns require honest partiality or insufficiency."),
    result("MEU-I-19",
      !hasForbiddenKeys(outputRecord) && !containsJudgementLanguage(forbiddenText),
      "Understanding must not select Judgement, Authority, response, or Action."),
    result("MEU-I-21",
      output.contextReferences.length > 0 && !containsPrivateInference(forbiddenText),
      "Privacy and bounded purpose scope must remain intact."),
    result("MEU-I-22",
      output.synthesis.statement.trim().length > 0 &&
      (output.supportedFindings.length > 0 ||
       output.status === "MULTI_EVIDENCE_UNDERSTANDING_INSUFFICIENT"),
      "The account must not be vacuous."),
    result("MEU-I-23",
      directClaimTranslations.every((translationId) =>
        output.evidenceRelationships.some((relationship) =>
          relationship.relationshipType === "attributed-direct-claim" &&
          relationship.participatingEvidenceIds.includes(translationId))),
      "Direct claims must remain attributed rather than become verified state."),
    result("MEU-I-24",
      output.synthesis.findingIds.every((id) =>
        output.supportedFindings.some((finding) => finding.findingId === id)),
      "Concise synthesis must remain linked to structured findings."),
  ];
}

export function checkCycleLocalInvariants(
  fixture: MultiEvidenceRuntimeFixture,
  output: MultiEvidenceUnderstandingAccount,
): InvariantResult[] {
  return checkApplicableInvariants(fixture, output)
    .filter((result) => CYCLE_LOCAL_INVARIANTS.includes(result.invariant));
}

export function checkCrossCycleInvariants(
  source: MultiEvidenceUnderstandingAccount,
  semanticReorder: MultiEvidenceUnderstandingAccount,
  decisiveEvidenceRemoval: MultiEvidenceUnderstandingAccount,
): readonly Readonly<InvariantResult>[] {
  const sourceRecord = source as unknown as Record<string, unknown>;
  return Object.freeze([
    Object.freeze(sourceRecord.wordingDependent
      ? result("MEU-I-14", false, "Output declares surface-wording dependence.")
      : result(
          "MEU-I-14",
          materialSignature(semanticReorder) === materialSignature(source),
          "The semantic reorder must retain materially equivalent Understanding.",
        )),
    Object.freeze(sourceRecord.evidenceInsensitive
      ? result("MEU-I-15", false, "Output declares decisive-evidence insensitivity.")
      : result(
          "MEU-I-15",
          materialSignature(decisiveEvidenceRemoval) !== materialSignature(source),
          "Decisive evidence removal must materially change Understanding.",
        )),
  ]);
}

export function constructTargetedTamper(
  output: MultiEvidenceUnderstandingAccount,
  invariant: ApplicableInvariantId,
): TamperedOutput {
  const tampered = clone(output) as MultiEvidenceUnderstandingAccount &
    Record<string, unknown>;
  const changedFields: string[] = [];
  const change = (field: string, apply: () => void) => {
    apply();
    changedFields.push(field);
  };

  switch (invariant) {
    case "MEU-I-01": change("formationOwner", () => {
      tampered.formationOwner = "ContextDoor" as "Understanding";
    }); break;
    case "MEU-I-02": change("availableEvidenceInventory.observationIds", () => {
      tampered.availableEvidenceInventory.observationIds = [];
    }); break;
    case "MEU-I-03": change("translationInterpretations", () => {
      tampered.translationInterpretations = [];
    }); break;
    case "MEU-I-04": change("callerAuthoredRelevance", () => {
      tampered.callerAuthoredRelevance = true;
    }); break;
    case "MEU-I-05": change("callerAuthoredRelationship", () => {
      tampered.callerAuthoredRelationship = true;
    }); break;
    case "MEU-I-06": change("contextReferences", () => {
      tampered.contextReferences = [];
    }); break;
    case "MEU-I-07": change("supportedFindings[0].evidenceIds", () => {
      if (tampered.supportedFindings[0]) {
        tampered.supportedFindings[0].evidenceIds = [
          output.availableEvidenceInventory.knowledgeCandidateIds[0] ?? "knowledge-only",
        ];
      }
    }); break;
    case "MEU-I-08":
    case "MEU-I-10": change("evidenceRelationships", () => {
      tampered.evidenceRelationships.push({
        relationshipId: "tamper:corroboration",
        relationshipType: "corroboration",
        participatingEvidenceIds: ["tamper:a", "tamper:b"],
        support: "Repeated evidence.",
        inferenceBasis: "Volume.",
        sourceIds: ["same-source", "same-source"],
      });
    }); break;
    case "MEU-I-09": change("confidence.basis", () => {
      tampered.confidence.basis = "High confidence by evidence volume and fluency.";
    }); break;
    case "MEU-I-11": change("contradictions", () => {
      tampered.contradictions = [];
    }); break;
    case "MEU-I-12": change("knowledgeApplicability[0].scope", () => {
      if (tampered.knowledgeApplicability[0]) {
        tampered.knowledgeApplicability[0].scope = "";
      }
    }); break;
    case "MEU-I-14": change("wordingDependent", () => {
      tampered.wordingDependent = true;
    }); break;
    case "MEU-I-15": change("evidenceInsensitive", () => {
      tampered.evidenceInsensitive = true;
    }); break;
    case "MEU-I-17": change("status", () => {
      tampered.status = "MULTI_EVIDENCE_UNDERSTANDING_FORMED";
    }); break;
    case "MEU-I-19": change("action", () => {
      tampered.action = "intervene";
    }); break;
    case "MEU-I-21": change("synthesis.statement", () => {
      tampered.synthesis.statement = "Unavailable private health information explains the evidence.";
    }); break;
    case "MEU-I-22": change("synthesis.statement", () => {
      tampered.synthesis.statement = "";
    }); break;
    case "MEU-I-23": change("evidenceRelationships", () => {
      tampered.evidenceRelationships = tampered.evidenceRelationships.filter(
        (item) => item.relationshipType !== "attributed-direct-claim",
      );
    }); break;
    case "MEU-I-24": change("synthesis.findingIds", () => {
      tampered.synthesis.findingIds = ["missing-finding"];
    }); break;
  }

  return { invariant, changedFields, output: tampered };
}

export function evaluateHeldOutAssessment(
  output: MultiEvidenceUnderstandingAccount,
  assessment: HeldOutAssessment,
  context: C18EvaluationContext,
): SemanticEvaluationResult {
  const mismatches: string[] = [];
  const comparisonRecords: C18ComparisonRecordOutcome[] = [];
  let comparisonSequence = 0;
  const compare = (input: Readonly<{
    mismatch: string;
    matched: boolean;
    candidate: readonly Readonly<{ path: string; value: unknown }>[];
    heldOut: readonly Readonly<{ path: string; value: unknown }>[];
    dimensions: readonly C18MaterialDimension[];
    absent?: boolean;
  }>): void => {
    comparisonSequence += 1;
    const oneValuePerSide = input.candidate.length === 1 && input.heldOut.length === 1;
    const candidatePrimary = oneValuePerSide ? input.candidate[0] : undefined;
    const heldOutPrimary = oneValuePerSide ? input.heldOut[0] : undefined;
    const outcome = finalizeC18ComparisonRecord({
      comparisonRecordId:
        `${context.cycleId}:C18:${String(comparisonSequence).padStart(3, "0")}`,
      cycleId: context.cycleId,
      candidateCaptureId: context.candidateCaptureId,
      candidate: {
        primaryReference: candidatePrimary
          ? immutableReference(candidatePrimary)
          : undefined,
        evidenceReferencesRequired: false,
        evidenceReferences: [],
      },
      heldOutAssessment: {
        assessmentId: assessment.assessmentId,
        version: assessment.assessmentVersion,
        verifiedHash: context.heldOutHash,
      },
      heldOutRequirement: {
        primaryReference: heldOutPrimary
          ? immutableReference(heldOutPrimary)
          : undefined,
        evidenceReferencesRequired: false,
        evidenceReferences: [],
      },
      evaluator: {
        evaluatorId: C18_EVALUATOR_ID,
        version: C18_EVALUATOR_VERSION,
      },
      comparisonRule: {
        ruleId: `${assessment.assessmentId}:semanticEvaluationRule`,
        version: assessment.assessmentVersion,
      },
      applicableMaterialDimensions: input.dimensions,
      observation: {
        classification: !oneValuePerSide
          ? "UNABLE_TO_OBSERVE"
          : input.matched
          ? "MATCH"
          : input.absent ? "ABSENCE" : "DIFFERENCE",
      },
      inference: {
        classification: !oneValuePerSide
          ? "INDETERMINATE"
          : input.matched
          ? "MATERIAL_EQUIVALENCE"
          : "MATERIAL_DIFFERENCE",
      },
      semanticDisposition: !oneValuePerSide
        ? "COMPARISON_INSUFFICIENT"
        : input.matched
        ? "MATERIAL_EQUIVALENCE"
        : "MATERIAL_DIFFERENCE",
      evaluatorConditionStatus: !oneValuePerSide
        ? "NOT_DETERMINABLE"
        : input.matched ? "SATISFIED" : "NOT_SATISFIED",
      disagreement: { status: "NONE", alternativeReferences: [] },
      uncertainty: oneValuePerSide
        ? { status: "NONE", reasons: [], limitingReferences: [] }
        : { status: "PRESENT", reasons: ["MISSING_REFERENCE"], limitingReferences: [] },
      boundaryLinkage: {
        c12CaptureId: context.candidateCaptureId,
        c16HeldOutHash: context.heldOutHash,
        c20RecordId: context.c20RecordId,
        c20InvocationEventId: context.c20InvocationEventId,
      },
    });
    comparisonRecords.push(outcome);
    if (!input.matched || !isCompleteC18Record(outcome)) mismatches.push(input.mismatch);
  };

  compare({
    mismatch: "formation-status",
    matched: output.status === assessment.expectedFormationStatus,
    candidate: [{ path: "candidate.status", value: output.status }],
    heldOut: [{
      path: "heldOut.expectedFormationStatus",
      value: assessment.expectedFormationStatus,
    }],
    dimensions: ["PROPOSITION_MEANING"],
  });
  compare({
    mismatch: "available-evidence-inventory",
    matched: equalInventory(
    output.availableEvidenceInventory,
    assessment.expectedAvailableEvidenceInventory,
    ),
    candidate: [{
      path: "candidate.availableEvidenceInventory",
      value: output.availableEvidenceInventory,
    }],
    heldOut: [{
      path: "heldOut.expectedAvailableEvidenceInventory",
      value: assessment.expectedAvailableEvidenceInventory,
    }],
    dimensions: ["EVIDENCE_PROVENANCE", "IDENTIFIER_IDENTITY"],
  });

  for (const [index, expected] of (assessment.expectedEvidenceTreatment as Array<{
    evidenceIds?: string[];
  }>).entries()) {
    const treatments = [
      ...output.acceptedEvidence.map((value, treatmentIndex) => ({
        path: `candidate.acceptedEvidence[${treatmentIndex}]`, value,
      })),
      ...output.excludedOrRejectedEvidence.map((value, treatmentIndex) => ({
        path: `candidate.excludedOrRejectedEvidence[${treatmentIndex}]`, value,
      })),
    ];
    const treatment = treatments.find((item) => (expected.evidenceIds ?? [])
      .every((evidenceId) => item.value.evidenceIds.includes(evidenceId)));
    const matched = Boolean(treatment);
    compare({
      mismatch: `evidence-treatment:${(expected.evidenceIds ?? []).join(",")}`,
      matched,
      candidate: treatment ? [treatment] : [{
        path: "candidate.acceptedEvidence",
        value: output.acceptedEvidence,
      }],
      heldOut: [{
        path: `heldOut.expectedEvidenceTreatment[${index}]`,
        value: expected,
      }],
      dimensions: ["EVIDENCE_PROVENANCE", "GROUPING"],
      absent: !matched,
    });
  }
  for (const [index, expected] of (assessment.expectedEvidenceRelationships as Array<{
    participatingEvidenceIds?: string[];
    requiredMeaning?: string;
    supportBasis?: string;
    requiredQualification?: string;
  }>).entries()) {
    const relationshipIndex = output.evidenceRelationships.findIndex((candidate) =>
      (expected.participatingEvidenceIds ?? []).every((evidenceId) =>
        candidate.participatingEvidenceIds.includes(evidenceId)));
    const relationship = output.evidenceRelationships[relationshipIndex];
    if (!relationship) {
      compare({
        mismatch:
          `evidence-relationship:${(expected.participatingEvidenceIds ?? []).join(",")}`,
        matched: false,
        candidate: [{
          path: "candidate.evidenceRelationships",
          value: output.evidenceRelationships,
        }],
        heldOut: [{
          path: `heldOut.expectedEvidenceRelationships[${index}]`,
          value: expected,
        }],
        dimensions: ["RELATIONSHIP_STRUCTURE", "EVIDENCE_PROVENANCE"],
        absent: true,
      });
      continue;
    }
    compare({
      mismatch:
        `evidence-relationship:${(expected.participatingEvidenceIds ?? []).join(",")}`,
      matched: true,
      candidate: [{
        path: `candidate.evidenceRelationships[${relationshipIndex}]`,
        value: relationship,
      }],
      heldOut: [{
        path: `heldOut.expectedEvidenceRelationships[${index}]`,
        value: expected,
      }],
      dimensions: ["RELATIONSHIP_STRUCTURE", "EVIDENCE_PROVENANCE"],
    });
    const relationshipText = [
      relationship.support,
      relationship.inferenceBasis,
    ].join(" ");
    for (const [field, required] of Object.entries({
      requiredMeaning: expected.requiredMeaning,
      supportBasis: expected.supportBasis,
      requiredQualification: expected.requiredQualification,
    }).filter((item): item is [string, string] => Boolean(item[1]))) {
      compare({
        mismatch: `relationship-meaning:${relationship.relationshipId}`,
        matched: semanticMatch(relationshipText, required),
        candidate: [{
          path: `candidate.evidenceRelationships[${relationshipIndex}]`,
          value: relationship,
        }],
        heldOut: [{
          path: `heldOut.expectedEvidenceRelationships[${index}].${field}`,
          value: required,
        }],
        dimensions: ["PROPOSITION_MEANING", "RELATIONSHIP_STRUCTURE"],
      });
    }
  }
  for (const [index, expected] of (assessment.expectedKnowledgeApplicability as Array<{
    knowledgeId?: string;
    expectedApplicability?: string;
    reason?: string;
  }>).entries()) {
    const actualIndex = output.knowledgeApplicability.findIndex(
      (item) => item.knowledgeId === expected.knowledgeId,
    );
    const actual = output.knowledgeApplicability[actualIndex];
    const matched = Boolean(actual) &&
      actual.applicability === expected.expectedApplicability &&
      (!expected.reason || semanticMatch(actual.reason, expected.reason));
    compare({
      mismatch: `knowledge-applicability:${expected.knowledgeId ?? "unknown"}`,
      matched,
      candidate: actual ? [{
        path: `candidate.knowledgeApplicability[${actualIndex}]`,
        value: actual,
      }] : [{
        path: "candidate.knowledgeApplicability",
        value: output.knowledgeApplicability,
      }],
      heldOut: [{
        path: `heldOut.expectedKnowledgeApplicability[${index}]`,
        value: expected,
      }],
      dimensions: ["KNOWLEDGE_APPLICABILITY", "PROPOSITION_MEANING"],
      absent: !actual,
    });
  }

  compareRequiredStatementsWithEvidence(
    "finding",
    output.supportedFindings.map((item) => item.statement),
    assessment.requiredFindings,
    "candidate.supportedFindings",
    "heldOut.requiredFindings",
    ["PROPOSITION_MEANING", "EVIDENCE_PROVENANCE"],
    compare,
  );
  compare({
    mismatch: "context-specific-significance",
    matched: semanticMatch(
      output.contextSpecificSignificance.statement,
      assessment.requiredContextSpecificSignificance,
    ),
    candidate: [{
      path: "candidate.contextSpecificSignificance.statement",
      value: output.contextSpecificSignificance.statement,
    }],
    heldOut: [{
      path: "heldOut.requiredContextSpecificSignificance",
      value: assessment.requiredContextSpecificSignificance,
    }],
    dimensions: ["CONTEXTUAL_SIGNIFICANCE", "PROPOSITION_MEANING"],
  });
  compareRequiredStatementsWithEvidence(
    "contradiction",
    output.contradictions,
    assessment.expectedContradictions,
    "candidate.contradictions",
    "heldOut.expectedContradictions",
    ["PROPOSITION_MEANING", "NEGATION"],
    compare,
  );
  compareRequiredStatementsWithEvidence(
    "alternative",
    output.credibleAlternatives,
    assessment.credibleAlternatives,
    "candidate.credibleAlternatives",
    "heldOut.credibleAlternatives",
    ["PROPOSITION_MEANING", "UNCERTAINTY"],
    compare,
  );
  compareRequiredStatementsWithEvidence(
    "assumption",
    output.assumptionsAndInferenceBases,
    assessment.requiredAssumptionsAndInferenceBases,
    "candidate.assumptionsAndInferenceBases",
    "heldOut.requiredAssumptionsAndInferenceBases",
    ["PROPOSITION_MEANING", "ATTRIBUTION"],
    compare,
  );
  compareRequiredStatementsWithEvidence(
    "unknown",
    output.unknownsAndEvidenceNeeds,
    assessment.requiredUnknownsAndEvidenceNeeds,
    "candidate.unknownsAndEvidenceNeeds",
    "heldOut.requiredUnknownsAndEvidenceNeeds",
    ["PROPOSITION_MEANING", "UNCERTAINTY"],
    compare,
  );
  if (assessment.priorAccountAndCorrectionRequirements.startsWith("Not Applicable")) {
    compare({
      mismatch: "prior-account-and-correction-links",
      matched: output.priorAccountAndCorrectionLinks === "Not Applicable",
      candidate: [{
        path: "candidate.priorAccountAndCorrectionLinks",
        value: output.priorAccountAndCorrectionLinks,
      }],
      heldOut: [{
        path: "heldOut.priorAccountAndCorrectionRequirements",
        value: assessment.priorAccountAndCorrectionRequirements,
      }],
      dimensions: ["PROPOSITION_MEANING"],
    });
  }

  const accountText = JSON.stringify(output);
  const prohibitedRequirements = [
    ...assessment.prohibitedConclusions.map((value, index) => ({
      path: `heldOut.prohibitedConclusions[${index}]`, value,
    })),
    ...assessment.prohibitedJudgementAuthorityOrActionContent.map((value, index) => ({
      path: `heldOut.prohibitedJudgementAuthorityOrActionContent[${index}]`, value,
    })),
  ];
  for (const prohibited of prohibitedRequirements) {
    const present = semanticMatch(accountText, prohibited.value);
    compare({
      mismatch: `prohibited:${prohibited.value}`,
      matched: !present,
      candidate: [{ path: "candidate", value: output }],
      heldOut: [prohibited],
      dimensions: ["PROHIBITED_CONCLUSION", "PROPOSITION_MEANING"],
    });
  }
  const aggregate = deriveC18AggregateState(
    comparisonRecords,
    mismatches.length > 0,
  );
  return {
    status: aggregate.status,
    mismatches,
    evaluatorConditionStatus: aggregate.evaluatorConditionStatus,
    comparisonRecords: Object.freeze(comparisonRecords),
  };
}

function isCompleteC18Record(outcome: C18ComparisonRecordOutcome): boolean {
  return outcome.finalizationState === "FINALIZED" && "comparisonRecordId" in outcome;
}

export function deriveC18AggregateState(
  outcomes: readonly C18ComparisonRecordOutcome[],
  hasMismatch: boolean,
): Readonly<Pick<SemanticEvaluationResult, "status" | "evaluatorConditionStatus">> {
  if (outcomes.length === 0 ||
      outcomes.some((outcome) => outcome.finalizationState === "INCOMPLETE" ||
      ("semanticDisposition" in outcome &&
       outcome.semanticDisposition === "COMPARISON_INSUFFICIENT"))) {
    return { status: "failed", evaluatorConditionStatus: "NOT_DETERMINABLE" };
  }
  if (outcomes.some((outcome) => "semanticDisposition" in outcome &&
      outcome.semanticDisposition === "NOT_EVALUATED")) {
    return { status: "failed", evaluatorConditionStatus: "NOT_EVALUATED" };
  }
  return hasMismatch
    ? { status: "failed", evaluatorConditionStatus: "NOT_SATISFIED" }
    : { status: "passed", evaluatorConditionStatus: "SATISFIED" };
}

function immutableReference(item: Readonly<{ path: string; value: unknown }>) {
  return {
    path: item.path,
    immutableValueIdentity: structuralDigest(item.value),
  };
}

export function compareCandidateAndBaseline(
  candidate: MultiEvidenceUnderstandingAccount,
  baseline: AccumulationBaselineRecord,
): BaselineComparisonResult {
  const baselineRecord = baseline as unknown as Record<string, unknown>;
  return {
    candidateHasInspectableAccount:
      candidate.supportedFindings.length > 0 &&
      candidate.evidenceRelationships.length > 0,
    baselinePreservesCompleteInventory: equalInventory(
      candidate.availableEvidenceInventory,
      baseline.inventory,
    ),
    baselineContainsUnderstandingFields: [
      "status", "acceptedEvidence", "evidenceRelationships", "supportedFindings",
      "confidence", "completeness", "synthesis",
    ].some((key) => key in baselineRecord),
  };
}

export function assessContamination(
  record: SealedAccessRecord,
): ContaminationAssessment {
  const findings: string[] = [];
  let expectedSequence = 1;
  for (const event of record.events) {
    if (event.sequence !== expectedSequence) findings.push("non-contiguous-sequence");
    expectedSequence += 1;
    if (event.kind === "denied-access") {
      findings.push(`denied-access:${event.subject}`);
    }
    if (FIXED_CONTAMINATION_RULES.deniedSubjects.includes(
      event.subject.toLowerCase() as never,
    )) {
      findings.push(`denied-subject:${event.subject}`);
    }
  }
  const heldOutIndex = record.events.findIndex(
    (event) => event.component === "C15" && event.kind === "access",
  );
  const captureIndex = record.events.findIndex(
    (event) => event.kind === "capture" &&
      event.subject === FIXED_CONTAMINATION_RULES.requiredBeforeHeldOut,
  );
  if (heldOutIndex >= 0 && (captureIndex < 0 || captureIndex > heldOutIndex)) {
    findings.push("held-out-access-before-output-capture");
  }
  return {
    findingId: `${record.recordId}:C21:finding`,
    status: findings.length === 0 ? "clear" : "contaminated",
    findings,
    sealedRecordSequenceLength: record.events.length,
  };
}

function result(
  invariant: ApplicableInvariantId,
  passed: boolean,
  reason: string,
): InvariantResult {
  return { invariant, status: passed ? "passed" : "failed", reason };
}

function controlResult(
  invariant: "MEU-I-14" | "MEU-I-15",
  control: MultiEvidenceUnderstandingAccount | undefined,
  passed: boolean,
  reason: string,
): InvariantResult {
  if (!control) return { invariant, status: "not-exercised", reason };
  return result(invariant, passed, reason);
}

function inventoryOf(fixture: MultiEvidenceRuntimeFixture): EvidenceInventory {
  return {
    entityIds: fixture.entities.map((item) => item.entityId),
    sourceIds: fixture.sources.map((item) => item.sourceId),
    observationIds: fixture.observations.map((item) => item.observationId),
    translationIds: fixture.translations.map((item) => item.translationId),
    contextIds: fixture.context.map((item) => item.contextId),
    knowledgeCandidateIds: fixture.knowledgeCandidates.map((item) => item.knowledgeId),
  };
}

function equalInventory(left: EvidenceInventory, right: EvidenceInventory): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function materialSignature(output: MultiEvidenceUnderstandingAccount): string {
  const record = output as unknown as Record<string, unknown>;
  if (record.wordingDependent || record.evidenceInsensitive) return "tampered-control";
  return JSON.stringify({
    status: output.status,
    relationships: output.evidenceRelationships.map((item) => ({
      type: item.relationshipType,
      support: item.support,
      inferenceBasis: item.inferenceBasis,
    })).sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right))),
    findings: output.supportedFindings.map((item) => item.statement).sort(),
    unknowns: [...output.unknownsAndEvidenceNeeds].sort(),
    completeness: output.completeness,
  });
}

function hasForbiddenKeys(record: Record<string, unknown>): boolean {
  return ["judgement", "authority", "action", "selectedResponse", "permission"]
    .some((key) => key in record);
}

function containsJudgementLanguage(value: string): boolean {
  return /\b(ask|approach|monitor|intervene|escalate|authorised|assign priority)\b/i
    .test(value);
}

function containsPrivateInference(value: string): boolean {
  return /\b(private health|family information|private communication).*(explains|caused|proves)\b/i
    .test(value);
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function semanticMatch(actual: string, expected: string): boolean {
  const ignored = new Set([
    "a", "an", "and", "as", "at", "be", "by", "for", "from", "in", "is",
    "it", "of", "on", "or", "that", "the", "to", "was", "with",
  ]);
  const expectedTokens = normalise(expected).split(" ")
    .filter((token) => token.length > 2 && !ignored.has(token));
  if (expectedTokens.length === 0) return true;
  const actualTokens = new Set(normalise(actual).split(" "));
  const matched = expectedTokens.filter((token) => actualTokens.has(token)).length;
  return matched / expectedTokens.length >= 0.6;
}

function compareRequiredStatementsWithEvidence(
  label: string,
  actual: string[],
  expected: string[],
  candidateBasePath: string,
  heldOutBasePath: string,
  dimensions: readonly C18MaterialDimension[],
  compare: (input: Readonly<{
    mismatch: string;
    matched: boolean;
    candidate: readonly Readonly<{ path: string; value: unknown }>[];
    heldOut: readonly Readonly<{ path: string; value: unknown }>[];
    dimensions: readonly C18MaterialDimension[];
    absent?: boolean;
  }>) => void,
): void {
  for (const [expectedIndex, required] of expected.entries()) {
    const actualIndex = actual.findIndex((candidate) => semanticMatch(candidate, required));
    compare({
      mismatch: `${label}:${required}`,
      matched: actualIndex >= 0,
      candidate: actualIndex >= 0 ? [{
        path: `${candidateBasePath}[${actualIndex}]`,
        value: actual[actualIndex],
      }] : [{ path: candidateBasePath, value: actual }],
      heldOut: [{
        path: `${heldOutBasePath}[${expectedIndex}]`,
        value: required,
      }],
      dimensions,
      absent: actualIndex < 0,
    });
  }
}