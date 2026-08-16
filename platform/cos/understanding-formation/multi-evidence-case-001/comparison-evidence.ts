export const C18_EVALUATOR_ID = "MEU-CASE-001-C18";
export const C18_EVALUATOR_VERSION = "1.0.0";

export type C18MaterialDimension =
  | "PROPOSITION_MEANING" | "NEGATION" | "ATTRIBUTION"
  | "EVIDENCE_PROVENANCE" | "UNCERTAINTY" | "RELATIONSHIP_STRUCTURE"
  | "IDENTIFIER_IDENTITY" | "GROUPING" | "GRANULARITY" | "ORDERING"
  | "WORDING_REPRESENTATION" | "PROHIBITED_CONCLUSION"
  | "KNOWLEDGE_APPLICABILITY" | "CONTEXTUAL_SIGNIFICANCE";

export type C18ObservationClass =
  | "MATCH" | "DIFFERENCE" | "ABSENCE" | "CONTRADICTION"
  | "UNABLE_TO_OBSERVE";
export type C18InferenceClass =
  | "MATERIAL_EQUIVALENCE" | "MATERIAL_DIFFERENCE" | "UNSUPPORTED"
  | "CONTRADICTORY" | "INDETERMINATE";
export type C18SemanticDisposition =
  | "MATERIAL_EQUIVALENCE" | "MATERIAL_DIFFERENCE"
  | "COMPARISON_INSUFFICIENT" | "NOT_EVALUATED";
export type C18EvaluatorConditionStatus =
  | "SATISFIED" | "NOT_SATISFIED" | "NOT_DETERMINABLE" | "NOT_EVALUATED";
export type C18UncertaintyReason =
  | "MISSING_IDENTITY" | "MISSING_REFERENCE" | "MISSING_CRITERION"
  | "MISSING_RULE" | "MISSING_MATERIAL_DIMENSION" | "MISSING_OBSERVATION"
  | "MISSING_INFERENCE" | "MISSING_EVIDENCE_SUPPORT"
  | "MISSING_BOUNDARY_LINKAGE" | "CREDIBLE_ALTERNATIVES_REMAIN";
export type C18IncompleteReason =
  | "MISSING_COMPARISON_RECORD_ID" | "MISSING_CYCLE_ID"
  | "MISSING_CANDIDATE_CAPTURE_ID" | "MISSING_CANDIDATE_REFERENCE"
  | "MISSING_HELD_OUT_ASSESSMENT_IDENTITY"
  | "MISSING_HELD_OUT_REQUIREMENT_REFERENCE" | "MISSING_EVALUATOR_IDENTITY"
  | "MISSING_COMPARISON_RULE" | "MISSING_MATERIAL_DIMENSION"
  | "MISSING_OBSERVATION" | "MISSING_INFERENCE" | "MISSING_DISPOSITION"
  | "MISSING_EVALUATOR_CONDITION_STATUS" | "MISSING_DISAGREEMENT"
  | "MISSING_UNCERTAINTY" | "MISSING_REQUIRED_EVIDENCE_REFERENCE"
  | "MISSING_C12_LINKAGE" | "MISSING_C16_LINKAGE" | "MISSING_C20_LINKAGE"
  | "INCONSISTENT_SEMANTIC_LAYERS" | "FORBIDDEN_FIELD";

export interface C18ImmutableReference {
  path: string;
  immutableValueIdentity: string;
}

export interface C18ComparisonSideInput {
  primaryReference?: C18ImmutableReference;
  evidenceReferences?: readonly C18ImmutableReference[];
  evidenceReferencesRequired?: boolean;
}

export interface C18ComparisonRecordInput {
  comparisonRecordId?: string;
  cycleId?: string;
  candidateCaptureId?: string;
  candidate?: C18ComparisonSideInput;
  heldOutAssessment?: Readonly<{
    assessmentId: string; version: string; verifiedHash: string;
  }>;
  heldOutRequirement?: C18ComparisonSideInput;
  evaluator?: Readonly<{ evaluatorId: string; version: string }>;
  comparisonRule?: Readonly<{ ruleId: string; version: string }>;
  applicableMaterialDimensions?: readonly C18MaterialDimension[];
  observation?: Readonly<{ classification: C18ObservationClass }>;
  inference?: Readonly<{ classification: C18InferenceClass }>;
  semanticDisposition?: C18SemanticDisposition;
  evaluatorConditionStatus?: C18EvaluatorConditionStatus;
  disagreement?: Readonly<{
    status: "NONE" | "PRESENT";
    alternativeReferences: readonly C18ImmutableReference[];
  }>;
  uncertainty?: Readonly<{
    status: "NONE" | "PRESENT";
    reasons: readonly C18UncertaintyReason[];
    limitingReferences: readonly C18ImmutableReference[];
  }>;
  boundaryLinkage?: Readonly<{
    c12CaptureId: string;
    c16HeldOutHash: string;
    c20RecordId: string;
    c20InvocationEventId: string;
  }>;
}

export interface FinalizedC18ComparisonRecord extends C18ComparisonRecordInput {
  comparisonRecordId: string;
  cycleId: string;
  candidateCaptureId: string;
  candidate: C18ComparisonSideInput & Readonly<{
    primaryReference: C18ImmutableReference;
  }>;
  heldOutAssessment: Readonly<{
    assessmentId: string; version: string; verifiedHash: string;
  }>;
  heldOutRequirement: C18ComparisonSideInput & Readonly<{
    primaryReference: C18ImmutableReference;
  }>;
  evaluator: Readonly<{ evaluatorId: string; version: string }>;
  comparisonRule: Readonly<{ ruleId: string; version: string }>;
  applicableMaterialDimensions: readonly C18MaterialDimension[];
  observation: Readonly<{ classification: C18ObservationClass }>;
  inference: Readonly<{ classification: C18InferenceClass }>;
  semanticDisposition: C18SemanticDisposition;
  evaluatorConditionStatus: C18EvaluatorConditionStatus;
  disagreement: Readonly<{
    status: "NONE" | "PRESENT";
    alternativeReferences: readonly C18ImmutableReference[];
  }>;
  uncertainty: Readonly<{
    status: "NONE" | "PRESENT";
    reasons: readonly C18UncertaintyReason[];
    limitingReferences: readonly C18ImmutableReference[];
  }>;
  boundaryLinkage: Readonly<{
    c12CaptureId: string; c16HeldOutHash: string;
    c20RecordId: string; c20InvocationEventId: string;
  }>;
  finalizationState: "FINALIZED";
  sealed: true;
}

export interface LimitedC18ComparisonRecord {
  finalizationState: "FINALIZED";
  sealed: true;
  semanticDisposition: "NOT_EVALUATED" | "COMPARISON_INSUFFICIENT";
  evaluatorConditionStatus: "NOT_EVALUATED" | "NOT_DETERMINABLE";
  reasons: readonly C18IncompleteReason[];
  established: Readonly<Partial<C18ComparisonRecordInput>>;
}

export interface IncompleteC18ComparisonRecord {
  finalizationState: "INCOMPLETE";
  reasons: readonly C18IncompleteReason[];
  established: Readonly<Partial<C18ComparisonRecordInput>>;
}

export type C18ComparisonRecordOutcome =
  | Readonly<FinalizedC18ComparisonRecord>
  | Readonly<LimitedC18ComparisonRecord>
  | Readonly<IncompleteC18ComparisonRecord>;

const MATERIAL_DIMENSIONS = new Set<C18MaterialDimension>([
  "PROPOSITION_MEANING", "NEGATION", "ATTRIBUTION", "EVIDENCE_PROVENANCE",
  "UNCERTAINTY", "RELATIONSHIP_STRUCTURE", "IDENTIFIER_IDENTITY", "GROUPING",
  "GRANULARITY", "ORDERING", "WORDING_REPRESENTATION", "PROHIBITED_CONCLUSION",
  "KNOWLEDGE_APPLICABILITY", "CONTEXTUAL_SIGNIFICANCE",
]);
const OBSERVATION_CLASSES = new Set<C18ObservationClass>([
  "MATCH", "DIFFERENCE", "ABSENCE", "CONTRADICTION", "UNABLE_TO_OBSERVE",
]);
const INFERENCE_CLASSES = new Set<C18InferenceClass>([
  "MATERIAL_EQUIVALENCE", "MATERIAL_DIFFERENCE", "UNSUPPORTED",
  "CONTRADICTORY", "INDETERMINATE",
]);
const SEMANTIC_DISPOSITIONS = new Set<C18SemanticDisposition>([
  "MATERIAL_EQUIVALENCE", "MATERIAL_DIFFERENCE", "COMPARISON_INSUFFICIENT",
  "NOT_EVALUATED",
]);
const CONDITION_STATUSES = new Set<C18EvaluatorConditionStatus>([
  "SATISFIED", "NOT_SATISFIED", "NOT_DETERMINABLE", "NOT_EVALUATED",
]);
const UNCERTAINTY_REASONS = new Set<C18UncertaintyReason>([
  "MISSING_IDENTITY", "MISSING_REFERENCE", "MISSING_CRITERION", "MISSING_RULE",
  "MISSING_MATERIAL_DIMENSION", "MISSING_OBSERVATION", "MISSING_INFERENCE",
  "MISSING_EVIDENCE_SUPPORT", "MISSING_BOUNDARY_LINKAGE",
  "CREDIBLE_ALTERNATIVES_REMAIN",
]);

export function finalizeC18ComparisonRecord(
  value: C18ComparisonRecordInput | unknown,
): C18ComparisonRecordOutcome {
  const reasons: C18IncompleteReason[] = [];
  const input = isRecord(value)
    ? value as unknown as C18ComparisonRecordInput
    : {};
  if (!isRecord(value)) reasons.push("FORBIDDEN_FIELD");
  validateClosedShape(input, reasons);
  requireText(input.comparisonRecordId, "MISSING_COMPARISON_RECORD_ID", reasons);
  requireText(input.cycleId, "MISSING_CYCLE_ID", reasons);
  requireText(input.candidateCaptureId, "MISSING_CANDIDATE_CAPTURE_ID", reasons);
  validateSide(input.candidate, "candidate", input, reasons);
  validateHeldOutAssessment(input.heldOutAssessment, reasons);
  validateSide(input.heldOutRequirement, "held-out", input, reasons);
  if (!input.evaluator || !nonEmpty(input.evaluator.evaluatorId) ||
      !nonEmpty(input.evaluator.version)) reasons.push("MISSING_EVALUATOR_IDENTITY");
  if (!input.comparisonRule || !nonEmpty(input.comparisonRule.ruleId) ||
      !nonEmpty(input.comparisonRule.version)) reasons.push("MISSING_COMPARISON_RULE");
    if (!Array.isArray(input.applicableMaterialDimensions) ||
      !input.applicableMaterialDimensions.length ||
      input.applicableMaterialDimensions.some((item) => !MATERIAL_DIMENSIONS.has(item))) {
    reasons.push("MISSING_MATERIAL_DIMENSION");
  }
  if (!input.observation || !OBSERVATION_CLASSES.has(input.observation.classification)) {
    reasons.push("MISSING_OBSERVATION");
  }
  if (!input.inference || !INFERENCE_CLASSES.has(input.inference.classification)) {
    reasons.push("MISSING_INFERENCE");
  }
  if (!input.semanticDisposition || !SEMANTIC_DISPOSITIONS.has(input.semanticDisposition)) {
    reasons.push("MISSING_DISPOSITION");
  }
  if (!input.evaluatorConditionStatus ||
      !CONDITION_STATUSES.has(input.evaluatorConditionStatus)) {
    reasons.push("MISSING_EVALUATOR_CONDITION_STATUS");
  }
  validateDisagreement(input.disagreement, reasons);
  validateUncertainty(input.uncertainty, reasons);
  validateBoundary(input, reasons);
  validateSemanticConsistency(input, reasons);

  const uniqueReasons = unique(reasons);
  if (uniqueReasons.length) {
    const established = establishedFacts(input);
    const semanticLimit = classifySemanticLimit(uniqueReasons);
    if (semanticLimit) {
      return deepFreeze({
        finalizationState: "FINALIZED" as const,
        sealed: true as const,
        semanticDisposition: semanticLimit,
        evaluatorConditionStatus: semanticLimit === "NOT_EVALUATED"
          ? "NOT_EVALUATED" as const : "NOT_DETERMINABLE" as const,
        reasons: uniqueReasons,
        established,
      });
    }
    return deepFreeze({
      finalizationState: "INCOMPLETE" as const,
      reasons: uniqueReasons,
      established,
    });
  }

  return deepFreeze({
    ...safeCompleteInput(input),
    finalizationState: "FINALIZED" as const,
    sealed: true as const,
  }) as Readonly<FinalizedC18ComparisonRecord>;
}

function validateClosedShape(
  input: C18ComparisonRecordInput,
  reasons: C18IncompleteReason[],
): void {
  const valid = hasOnlyKeys(input, [
    "comparisonRecordId", "cycleId", "candidateCaptureId", "candidate",
    "heldOutAssessment", "heldOutRequirement", "evaluator", "comparisonRule",
    "applicableMaterialDimensions", "observation", "inference",
    "semanticDisposition", "evaluatorConditionStatus", "disagreement",
    "uncertainty", "boundaryLinkage",
  ]) && validSideShape(input.candidate) && validSideShape(input.heldOutRequirement) &&
    hasOnlyKeys(input.heldOutAssessment, ["assessmentId", "version", "verifiedHash"]) &&
    hasOnlyKeys(input.evaluator, ["evaluatorId", "version"]) &&
    hasOnlyKeys(input.comparisonRule, ["ruleId", "version"]) &&
    hasOnlyKeys(input.observation, ["classification"]) &&
    hasOnlyKeys(input.inference, ["classification"]) &&
    hasOnlyKeys(input.disagreement, ["status", "alternativeReferences"]) &&
    hasOnlyKeys(input.uncertainty, ["status", "reasons", "limitingReferences"]) &&
    hasOnlyKeys(input.boundaryLinkage, [
      "c12CaptureId", "c16HeldOutHash", "c20RecordId", "c20InvocationEventId",
    ]);
  if (!valid) reasons.push("FORBIDDEN_FIELD");
}

function validSideShape(side: C18ComparisonSideInput | undefined): boolean {
  return (!side || isRecord(side)) && hasOnlyKeys(side, [
    "primaryReference", "evidenceReferences", "evidenceReferencesRequired",
  ]) && (!side?.primaryReference || isRecord(side.primaryReference)) &&
    hasOnlyKeys(side?.primaryReference, ["path", "immutableValueIdentity"]) &&
    (side?.evidenceReferences === undefined ||
      (Array.isArray(side.evidenceReferences) && side.evidenceReferences.every((item) =>
        isRecord(item) && hasOnlyKeys(item, ["path", "immutableValueIdentity"]))));
}

function validateSide(
  side: C18ComparisonSideInput | undefined,
  kind: "candidate" | "held-out",
  input: C18ComparisonRecordInput,
  reasons: C18IncompleteReason[],
): void {
  const missing = kind === "candidate"
    ? "MISSING_CANDIDATE_REFERENCE" : "MISSING_HELD_OUT_REQUIREMENT_REFERENCE";
  if (!isRecord(side) || !validReference(side.primaryReference)) reasons.push(missing);
  if (side?.evidenceReferences !== undefined &&
      (!Array.isArray(side.evidenceReferences) ||
       side.evidenceReferences.some((item) => !validReference(item)))) {
    reasons.push("MISSING_REQUIRED_EVIDENCE_REFERENCE");
  } else if (side?.evidenceReferencesRequired === true &&
      !side.evidenceReferences?.length) {
    reasons.push("MISSING_REQUIRED_EVIDENCE_REFERENCE");
  }
}

function validateHeldOutAssessment(
  assessment: C18ComparisonRecordInput["heldOutAssessment"],
  reasons: C18IncompleteReason[],
): void {
  if (!assessment || !nonEmpty(assessment.assessmentId) ||
      !nonEmpty(assessment.version) || !nonEmpty(assessment.verifiedHash)) {
    reasons.push("MISSING_HELD_OUT_ASSESSMENT_IDENTITY");
  }
}

function validateDisagreement(
  disagreement: C18ComparisonRecordInput["disagreement"],
  reasons: C18IncompleteReason[],
): void {
  if (!isRecord(disagreement) || !["NONE", "PRESENT"].includes(disagreement.status as string) ||
      !Array.isArray(disagreement.alternativeReferences) ||
      disagreement.alternativeReferences.some((item) => !validReference(item)) ||
      (disagreement.status === "NONE" && disagreement.alternativeReferences.length > 0) ||
      (disagreement.status === "PRESENT" && !disagreement.alternativeReferences.length)) {
    reasons.push("MISSING_DISAGREEMENT");
  }
}

function validateUncertainty(
  uncertainty: C18ComparisonRecordInput["uncertainty"],
  reasons: C18IncompleteReason[],
): void {
    if (!isRecord(uncertainty) || !["NONE", "PRESENT"].includes(uncertainty.status as string) ||
      !Array.isArray(uncertainty.reasons) ||
      !Array.isArray(uncertainty.limitingReferences) ||
      uncertainty.reasons.some((item) => !UNCERTAINTY_REASONS.has(item)) ||
      uncertainty.limitingReferences.some((item) => !validReference(item)) ||
      (uncertainty.status === "NONE" &&
       (uncertainty.reasons.length > 0 || uncertainty.limitingReferences.length > 0)) ||
      (uncertainty.status === "PRESENT" && !uncertainty.reasons.length)) {
    reasons.push("MISSING_UNCERTAINTY");
  }
}

function validateBoundary(
  input: C18ComparisonRecordInput,
  reasons: C18IncompleteReason[],
): void {
  const linkage = input.boundaryLinkage;
  if (!linkage || !nonEmpty(linkage.c12CaptureId) ||
      linkage.c12CaptureId !== input.candidateCaptureId) reasons.push("MISSING_C12_LINKAGE");
  if (!linkage || !nonEmpty(linkage.c16HeldOutHash) ||
      linkage.c16HeldOutHash !== input.heldOutAssessment?.verifiedHash) {
    reasons.push("MISSING_C16_LINKAGE");
  }
  if (!linkage || !nonEmpty(linkage.c20RecordId) ||
      !nonEmpty(linkage.c20InvocationEventId) ||
    !new RegExp(`^${escapeRegExp(linkage.c20RecordId)}:event:[0-9]{4}$`)
      .test(linkage.c20InvocationEventId)) {
    reasons.push("MISSING_C20_LINKAGE");
  }
}

function validateSemanticConsistency(
  input: C18ComparisonRecordInput,
  reasons: C18IncompleteReason[],
): void {
  const observed = input.observation?.classification;
  const inferred = input.inference?.classification;
  const disposition = input.semanticDisposition;
  const condition = input.evaluatorConditionStatus;
  const credibleAlternativesRemain =
    Array.isArray(input.uncertainty?.reasons) &&
    input.uncertainty.reasons.includes("CREDIBLE_ALTERNATIVES_REMAIN");
  const disagreementConsistent = !credibleAlternativesRemain ||
    input.disagreement?.status === "PRESENT";
  const consistent =
    (disposition === "MATERIAL_EQUIVALENCE" && observed === "MATCH" &&
      inferred === "MATERIAL_EQUIVALENCE" && condition === "SATISFIED" &&
      input.uncertainty?.status === "NONE") ||
    (disposition === "MATERIAL_DIFFERENCE" &&
      ["DIFFERENCE", "ABSENCE", "CONTRADICTION"].includes(observed ?? "") &&
      ["MATERIAL_DIFFERENCE", "UNSUPPORTED", "CONTRADICTORY"].includes(inferred ?? "") &&
      condition === "NOT_SATISFIED") ||
    (disposition === "COMPARISON_INSUFFICIENT" && observed === "UNABLE_TO_OBSERVE" &&
      inferred === "INDETERMINATE" && condition === "NOT_DETERMINABLE" &&
      input.uncertainty?.status === "PRESENT") ||
    (disposition === "NOT_EVALUATED" && observed === "UNABLE_TO_OBSERVE" &&
      inferred === "INDETERMINATE" && condition === "NOT_EVALUATED" &&
      input.uncertainty?.status === "PRESENT");
  if (disposition && condition && (!consistent || !disagreementConsistent)) {
    reasons.push("INCONSISTENT_SEMANTIC_LAYERS");
  }
}

function classifySemanticLimit(
  reasons: readonly C18IncompleteReason[],
): "NOT_EVALUATED" | "COMPARISON_INSUFFICIENT" | undefined {
  const notEvaluatedReasons: readonly C18IncompleteReason[] = [
    "MISSING_CANDIDATE_CAPTURE_ID", "MISSING_HELD_OUT_ASSESSMENT_IDENTITY",
    "MISSING_COMPARISON_RULE", "MISSING_EVALUATOR_IDENTITY",
  ];
  const insufficientReasons: readonly C18IncompleteReason[] = [
    "MISSING_CANDIDATE_REFERENCE", "MISSING_HELD_OUT_REQUIREMENT_REFERENCE",
    "MISSING_MATERIAL_DIMENSION", "MISSING_OBSERVATION", "MISSING_INFERENCE",
    "MISSING_REQUIRED_EVIDENCE_REFERENCE",
  ];
  const semanticReasons = [...notEvaluatedReasons, ...insufficientReasons];
  if (reasons.some((reason) => !semanticReasons.includes(reason))) return undefined;
  if (reasons.some((reason) => notEvaluatedReasons.includes(reason))) {
    return "NOT_EVALUATED";
  }
  if (reasons.some((reason) => insufficientReasons.includes(reason))) {
    return "COMPARISON_INSUFFICIENT";
  }
  return undefined;
}

function establishedFacts(
  input: C18ComparisonRecordInput,
): Readonly<Partial<C18ComparisonRecordInput>> {
  const established: Partial<C18ComparisonRecordInput> = {};
  if (nonEmpty(input.comparisonRecordId)) established.comparisonRecordId = input.comparisonRecordId;
  if (nonEmpty(input.cycleId)) established.cycleId = input.cycleId;
  if (nonEmpty(input.candidateCaptureId)) established.candidateCaptureId = input.candidateCaptureId;
  const candidate = establishedSide(input.candidate);
  if (candidate) {
    established.candidate = candidate;
  }
  if (input.heldOutAssessment && nonEmpty(input.heldOutAssessment.assessmentId) &&
      nonEmpty(input.heldOutAssessment.version) &&
      nonEmpty(input.heldOutAssessment.verifiedHash)) {
    established.heldOutAssessment = {
      assessmentId: input.heldOutAssessment.assessmentId,
      version: input.heldOutAssessment.version,
      verifiedHash: input.heldOutAssessment.verifiedHash,
    };
  }
  const heldOutRequirement = establishedSide(input.heldOutRequirement);
  if (heldOutRequirement) {
    established.heldOutRequirement = heldOutRequirement;
  }
  if (input.evaluator && nonEmpty(input.evaluator.evaluatorId) &&
      nonEmpty(input.evaluator.version)) {
    established.evaluator = {
      evaluatorId: input.evaluator.evaluatorId,
      version: input.evaluator.version,
    };
  }
  if (input.comparisonRule && nonEmpty(input.comparisonRule.ruleId) &&
      nonEmpty(input.comparisonRule.version)) {
    established.comparisonRule = {
      ruleId: input.comparisonRule.ruleId,
      version: input.comparisonRule.version,
    };
  }
  return deepFreeze(established);
}

function safeCompleteInput(input: C18ComparisonRecordInput): C18ComparisonRecordInput {
  return {
    comparisonRecordId: input.comparisonRecordId,
    cycleId: input.cycleId,
    candidateCaptureId: input.candidateCaptureId,
    candidate: safeSide(input.candidate!),
    heldOutAssessment: clone(input.heldOutAssessment!),
    heldOutRequirement: safeSide(input.heldOutRequirement!),
    evaluator: clone(input.evaluator!),
    comparisonRule: clone(input.comparisonRule!),
    applicableMaterialDimensions: clone(input.applicableMaterialDimensions!),
    observation: clone(input.observation!), inference: clone(input.inference!),
    semanticDisposition: input.semanticDisposition,
    evaluatorConditionStatus: input.evaluatorConditionStatus,
    disagreement: clone(input.disagreement!), uncertainty: clone(input.uncertainty!),
    boundaryLinkage: clone(input.boundaryLinkage!),
  };
}

function safeSide(side: C18ComparisonSideInput): C18ComparisonSideInput {
  return {
    primaryReference: clone(side.primaryReference!),
    evidenceReferencesRequired: Boolean(side.evidenceReferencesRequired),
    evidenceReferences: clone(side.evidenceReferences ?? []),
  };
}

function establishedSide(
  side: C18ComparisonSideInput | undefined,
): C18ComparisonSideInput | undefined {
  if (!isRecord(side) || !validReference(side.primaryReference)) return undefined;
  const evidenceReferences = Array.isArray(side.evidenceReferences)
    ? side.evidenceReferences.filter(validReference).map(safeReference)
    : [];
  return {
    primaryReference: safeReference(side.primaryReference),
    evidenceReferencesRequired: side.evidenceReferencesRequired === true,
    evidenceReferences,
  };
}

function validReference(reference: unknown): reference is C18ImmutableReference {
  return isRecord(reference) &&
    hasOnlyKeys(reference, ["path", "immutableValueIdentity"]) &&
    nonEmpty(reference.path as string | undefined) &&
    nonEmpty(reference.immutableValueIdentity as string | undefined);
}
function requireText(
  value: string | undefined,
  reason: C18IncompleteReason,
  reasons: C18IncompleteReason[],
): void {
  if (!nonEmpty(value)) reasons.push(reason);
}
function hasOnlyKeys(value: unknown, allowed: readonly string[]): boolean {
  return value === undefined || (isRecord(value) &&
    Object.keys(value).every((key) => allowed.includes(key)));
}
function nonEmpty(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
function unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function safeReference(reference: C18ImmutableReference): C18ImmutableReference {
  return {
    path: reference.path,
    immutableValueIdentity: reference.immutableValueIdentity,
  };
}
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
function deepFreeze<T>(value: T): T {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  return value;
}