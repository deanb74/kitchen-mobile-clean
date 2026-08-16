export type MultiEvidenceUnderstandingStatus =
  | "MULTI_EVIDENCE_UNDERSTANDING_FORMED"
  | "MULTI_EVIDENCE_UNDERSTANDING_PARTIAL"
  | "MULTI_EVIDENCE_UNDERSTANDING_INSUFFICIENT";

export interface MultiEvidenceRuntimeFixture {
  fixtureId: string;
  fixtureVersion: string;
  entities: Array<{
    entityId: string;
    entityType: string;
  }>;
  sources: Array<{
    sourceId: string;
    sourceType: string;
    providerEntityId?: string;
  }>;
  observations: Array<{
    observationId: string;
    sourceId: string;
    sourceChannel: string;
    eventTimes: string[];
    content: string;
  }>;
  translations: Array<{
    translationId: string;
    observationId: string;
    meaning: string;
    translationConfidence: string;
    alternativeTranslations: string[];
  }>;
  context: Array<{
    contextId: string;
    sourceId: string;
    effectiveTime: string;
    purpose: string;
    people: string[];
    place: string;
    timeScope: string;
    permittedUse: string;
    unavailableDataScope: string[];
    reviewTrigger: string;
  }>;
  knowledgeCandidates: Array<{
    knowledgeId: string;
    sourcePath: string;
    sourceSection: string;
    sourceStatus: string;
    claim: string;
    scope: string;
    applicabilityConditions: string[];
  }>;
}

export interface EvidenceInventory {
  entityIds: string[];
  sourceIds: string[];
  observationIds: string[];
  translationIds: string[];
  contextIds: string[];
  knowledgeCandidateIds: string[];
}

export interface EvidenceTreatment {
  evidenceIds: string[];
  treatment: "accepted" | "excluded" | "rejected" | "unresolved";
  reason: string;
}

export interface EvidenceRelationship {
  relationshipId: string;
  relationshipType:
    | "qualified-contrast"
    | "corroboration"
    | "contradiction"
    | "unresolved-independence"
    | "attributed-direct-claim";
  participatingEvidenceIds: string[];
  support: string;
  inferenceBasis: string;
  sourceIds: string[];
}

export interface MultiEvidenceUnderstandingAccount {
  accountId: string;
  lifecycleStatus: "current";
  formationOwner: "Understanding";
  status: MultiEvidenceUnderstandingStatus;
  purposeReference: string;
  contextReferences: string[];
  availableEvidenceInventory: EvidenceInventory;
  acceptedEvidence: EvidenceTreatment[];
  excludedOrRejectedEvidence: EvidenceTreatment[];
  sourceClaims: Array<{
    observationId: string;
    sourceId: string;
  }>;
  translationInterpretations: Array<{
    translationId: string;
    observationId: string;
  }>;
  evidenceRelationships: EvidenceRelationship[];
  knowledgeApplicability: Array<{
    knowledgeId: string;
    applicability: "applicable" | "not-applicable" | "unresolved";
    reason: string;
    sourceStatus: string;
    scope: string;
  }>;
  supportedFindings: Array<{
    findingId: string;
    evidenceIds: string[];
    statement: string;
  }>;
  contextSpecificSignificance: {
    evidenceIds: string[];
    statement: string;
  };
  contradictions: string[];
  credibleAlternatives: string[];
  assumptionsAndInferenceBases: string[];
  unknownsAndEvidenceNeeds: string[];
  confidence: {
    level: "low" | "moderate" | "high";
    basis: string;
  };
  completeness: {
    level: "insufficient" | "partial" | "complete";
    basis: string;
  };
  priorAccountAndCorrectionLinks: string[] | "Not Applicable";
  synthesis: {
    statement: string;
    findingIds: string[];
  };
}

export interface AccumulationBaselineRecord {
  recordId: string;
  fixtureId: string;
  inventory: EvidenceInventory;
  stableOrder: string[];
  preservedContent: Array<{
    evidenceId: string;
    content: string;
  }>;
}

export interface HeldOutAssessment {
  assessmentId: string;
  assessmentVersion: string;
  assessmentStatus: string;
  fixtureId: string;
  fixtureVersion: string;
  runtimeAccess: "DENIED";
  expectedFormationStatus: MultiEvidenceUnderstandingStatus;
  expectedAvailableEvidenceInventory: EvidenceInventory;
  expectedEvidenceTreatment: unknown[];
  expectedSourceAndTranslationDistinctions: string[];
  expectedEvidenceRelationships: unknown[];
  expectedKnowledgeApplicability: unknown[];
  expectedNonApplicableKnowledge: unknown[];
  requiredFindings: string[];
  requiredContextSpecificSignificance: string;
  expectedContradictions: string[];
  credibleAlternatives: string[];
  requiredAssumptionsAndInferenceBases: string[];
  requiredUnknownsAndEvidenceNeeds: string[];
  expectedConfidenceAndCompletenessDirection: Record<string, string>;
  priorAccountAndCorrectionRequirements: string;
  prohibitedConclusions: string[];
  prohibitedJudgementAuthorityOrActionContent: string[];
  semanticEvaluationRule: string;
}

export interface ImmutableOutputCapture {
  candidate: MultiEvidenceUnderstandingAccount;
  baseline: AccumulationBaselineRecord;
}

export function validateRuntimeFixture(
  value: unknown,
): asserts value is MultiEvidenceRuntimeFixture {
  const fixture = object(value, "runtime fixture");
  stringField(fixture, "fixtureId");
  stringField(fixture, "fixtureVersion");
  const entities = objectArray(fixture, "entities");
  const sources = objectArray(fixture, "sources");
  const observations = objectArray(fixture, "observations");
  const translations = objectArray(fixture, "translations");
  const context = objectArray(fixture, "context");
  const knowledge = objectArray(fixture, "knowledgeCandidates");

  unique(entities.map((item) => stringField(item, "entityId")), "entityId");
  const entityIds = new Set(entities.map((item) => stringField(item, "entityId")));
  entities.forEach((item) => stringField(item, "entityType"));

  unique(sources.map((item) => stringField(item, "sourceId")), "sourceId");
  const sourceIds = new Set(sources.map((item) => stringField(item, "sourceId")));
  sources.forEach((item) => {
    stringField(item, "sourceType");
    optionalReference(item, "providerEntityId", entityIds);
  });

  unique(
    observations.map((item) => stringField(item, "observationId")),
    "observationId",
  );
  const observationIds = new Set(
    observations.map((item) => stringField(item, "observationId")),
  );
  observations.forEach((item) => {
    reference(item, "sourceId", sourceIds);
    stringField(item, "sourceChannel");
    stringArray(item, "eventTimes");
    stringField(item, "content");
  });

  unique(
    translations.map((item) => stringField(item, "translationId")),
    "translationId",
  );
  translations.forEach((item) => {
    reference(item, "observationId", observationIds);
    stringField(item, "meaning");
    stringField(item, "translationConfidence");
    stringArray(item, "alternativeTranslations");
  });

  unique(context.map((item) => stringField(item, "contextId")), "contextId");
  context.forEach((item) => {
    reference(item, "sourceId", sourceIds);
    stringField(item, "effectiveTime");
    stringField(item, "purpose");
    const people = stringArray(item, "people");
    people.forEach((person) => requireReference(person, entityIds, "people"));
    stringField(item, "place");
    stringField(item, "timeScope");
    stringField(item, "permittedUse");
    stringArray(item, "unavailableDataScope");
    stringField(item, "reviewTrigger");
  });

  unique(
    knowledge.map((item) => stringField(item, "knowledgeId")),
    "knowledgeId",
  );
  knowledge.forEach((item) => {
    stringField(item, "sourcePath");
    stringField(item, "sourceSection");
    stringField(item, "sourceStatus");
    stringField(item, "claim");
    stringField(item, "scope");
    stringArray(item, "applicabilityConditions");
  });
}

export function validateCandidateOutput(
  value: unknown,
): asserts value is MultiEvidenceUnderstandingAccount {
  const output = object(value, "candidate output");
  stringField(output, "accountId");
  exact(output, "lifecycleStatus", "current");
  exact(output, "formationOwner", "Understanding");
  oneOf(output, "status", [
    "MULTI_EVIDENCE_UNDERSTANDING_FORMED",
    "MULTI_EVIDENCE_UNDERSTANDING_PARTIAL",
    "MULTI_EVIDENCE_UNDERSTANDING_INSUFFICIENT",
  ]);
  stringField(output, "purposeReference");
  stringArray(output, "contextReferences");
  object(output.availableEvidenceInventory, "availableEvidenceInventory");
  objectArray(output, "acceptedEvidence");
  objectArray(output, "excludedOrRejectedEvidence");
  objectArray(output, "sourceClaims");
  objectArray(output, "translationInterpretations");
  objectArray(output, "evidenceRelationships");
  objectArray(output, "knowledgeApplicability");
  objectArray(output, "supportedFindings");
  object(output.contextSpecificSignificance, "contextSpecificSignificance");
  stringArray(output, "contradictions");
  stringArray(output, "credibleAlternatives");
  stringArray(output, "assumptionsAndInferenceBases");
  stringArray(output, "unknownsAndEvidenceNeeds");
  object(output.confidence, "confidence");
  object(output.completeness, "completeness");
  if (output.priorAccountAndCorrectionLinks !== "Not Applicable") {
    stringArray(output, "priorAccountAndCorrectionLinks");
  }
  object(output.synthesis, "synthesis");
}

export function validateBaselineOutput(
  value: unknown,
): asserts value is AccumulationBaselineRecord {
  const output = object(value, "baseline output");
  stringField(output, "recordId");
  stringField(output, "fixtureId");
  object(output.inventory, "inventory");
  stringArray(output, "stableOrder");
  objectArray(output, "preservedContent");
  const forbidden = [
    "status",
    "acceptedEvidence",
    "evidenceRelationships",
    "knowledgeApplicability",
    "supportedFindings",
    "contextSpecificSignificance",
    "confidence",
    "completeness",
    "synthesis",
  ];
  if (forbidden.some((key) => key in output)) {
    throw new Error("Baseline output contains an Understanding account field.");
  }
}

export function validateHeldOutAssessment(
  value: unknown,
): asserts value is HeldOutAssessment {
  const assessment = object(value, "held-out assessment");
  stringField(assessment, "assessmentId");
  stringField(assessment, "assessmentVersion");
  stringField(assessment, "assessmentStatus");
  stringField(assessment, "fixtureId");
  stringField(assessment, "fixtureVersion");
  exact(assessment, "runtimeAccess", "DENIED");
  oneOf(assessment, "expectedFormationStatus", [
    "MULTI_EVIDENCE_UNDERSTANDING_FORMED",
    "MULTI_EVIDENCE_UNDERSTANDING_PARTIAL",
    "MULTI_EVIDENCE_UNDERSTANDING_INSUFFICIENT",
  ]);
  object(assessment.expectedAvailableEvidenceInventory, "expectedAvailableEvidenceInventory");
  arrayField(assessment, "expectedEvidenceTreatment");
  stringArray(assessment, "expectedSourceAndTranslationDistinctions");
  arrayField(assessment, "expectedEvidenceRelationships");
  arrayField(assessment, "expectedKnowledgeApplicability");
  arrayField(assessment, "expectedNonApplicableKnowledge");
  stringArray(assessment, "requiredFindings");
  stringField(assessment, "requiredContextSpecificSignificance");
  stringArray(assessment, "expectedContradictions");
  stringArray(assessment, "credibleAlternatives");
  stringArray(assessment, "requiredAssumptionsAndInferenceBases");
  stringArray(assessment, "requiredUnknownsAndEvidenceNeeds");
  object(assessment.expectedConfidenceAndCompletenessDirection, "expectedConfidenceAndCompletenessDirection");
  stringField(assessment, "priorAccountAndCorrectionRequirements");
  stringArray(assessment, "prohibitedConclusions");
  stringArray(assessment, "prohibitedJudgementAuthorityOrActionContent");
  stringField(assessment, "semanticEvaluationRule");
}

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function arrayField(value: Record<string, unknown>, key: string): unknown[] {
  if (!Array.isArray(value[key])) throw new Error(`${key} must be an array.`);
  return value[key];
}

function objectArray(
  value: Record<string, unknown>,
  key: string,
): Record<string, unknown>[] {
  return arrayField(value, key).map((item) => object(item, key));
}

function stringField(value: Record<string, unknown>, key: string): string {
  if (typeof value[key] !== "string" || value[key].length === 0) {
    throw new Error(`${key} must be a non-empty string.`);
  }
  return value[key];
}

function stringArray(value: Record<string, unknown>, key: string): string[] {
  const items = arrayField(value, key);
  if (items.some((item) => typeof item !== "string")) {
    throw new Error(`${key} must contain only strings.`);
  }
  return items as string[];
}

function exact(
  value: Record<string, unknown>,
  key: string,
  expected: string,
): void {
  if (value[key] !== expected) throw new Error(`${key} must equal ${expected}.`);
}

function oneOf(
  value: Record<string, unknown>,
  key: string,
  permitted: string[],
): void {
  if (!permitted.includes(String(value[key]))) {
    throw new Error(`${key} has an unsupported value.`);
  }
}

function reference(
  value: Record<string, unknown>,
  key: string,
  permitted: Set<string>,
): void {
  requireReference(stringField(value, key), permitted, key);
}

function optionalReference(
  value: Record<string, unknown>,
  key: string,
  permitted: Set<string>,
): void {
  if (value[key] === undefined) return;
  reference(value, key, permitted);
}

function requireReference(
  referenceValue: string,
  permitted: Set<string>,
  key: string,
): void {
  if (!permitted.has(referenceValue)) {
    throw new Error(`${key} references missing id ${referenceValue}.`);
  }
}

function unique(values: string[], key: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error(`${key} values must be unique.`);
  }
}