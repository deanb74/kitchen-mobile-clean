import type {
    ActionRecord,
    AuthorityRecord,
    ContextEnvelope,
    DecisionRecord,
    EvidencePacket,
    ReflectionRecord,
    RuntimeTrace,
} from "./types";

function hasText(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateContextEnvelope(context: ContextEnvelope): string[] {
  const issues: string[] = [];

  if (!hasText(context.requestId)) issues.push("ContextEnvelope.requestId is required.");
  if (!hasText(context.userId)) issues.push("ContextEnvelope.userId is required.");
  if (!hasText(context.actorId)) issues.push("ContextEnvelope.actorId is required.");
  if (!hasText(context.role)) issues.push("ContextEnvelope.role is required.");
  if (!hasText(context.siteId)) issues.push("ContextEnvelope.siteId is required.");
  if (!hasText(context.equipmentId)) issues.push("ContextEnvelope.equipmentId is required.");
  if (!hasText(context.equipmentType)) issues.push("ContextEnvelope.equipmentType is required.");
  if (!hasText(context.currentOperationalState)) issues.push("ContextEnvelope.currentOperationalState is required.");
  if (!hasText(context.capabilityId)) issues.push("ContextEnvelope.capabilityId is required.");
  if (!hasText(context.peopleOutcome)) issues.push("ContextEnvelope.peopleOutcome is required by the First Law.");

  return issues;
}

export function validateDecisionRecord(decision: DecisionRecord): string[] {
  const issues: string[] = [];

  if (!hasText(decision.recommendedAction)) issues.push("DecisionRecord.recommendedAction is required.");
  if (!hasText(decision.rationale)) issues.push("DecisionRecord.rationale is required.");
  if (decision.confidence < 0 || decision.confidence > 1) {
    issues.push("DecisionRecord.confidence must be between 0 and 1.");
  }

  return issues;
}

export function validateAuthorityRecord(authority: AuthorityRecord): string[] {
  const issues: string[] = [];

  if (!hasText(authority.reason)) issues.push("AuthorityRecord.reason is required.");
  if (!Array.isArray(authority.boundaryConditions)) {
    issues.push("AuthorityRecord.boundaryConditions must be an array.");
  }

  return issues;
}

export function validateActionRecord(action: ActionRecord): string[] {
  const issues: string[] = [];

  if (!hasText(action.summary)) issues.push("ActionRecord.summary is required.");
  if (action.attempted && !action.completedAt) {
    issues.push("ActionRecord.completedAt is required when attempted is true.");
  }

  return issues;
}

export function validateEvidencePacket(evidence: EvidencePacket): string[] {
  const issues: string[] = [];

  if (!hasText(evidence.evidenceId)) issues.push("EvidencePacket.evidenceId is required.");
  if (!hasText(evidence.provenance.runtimeVersion)) {
    issues.push("EvidencePacket.provenance.runtimeVersion is required.");
  }
  if (
    evidence.provenance.schemaVersion !== undefined &&
    !hasText(evidence.provenance.schemaVersion)
  ) {
    issues.push("EvidencePacket.provenance.schemaVersion must be non-empty when provided.");
  }

  return issues;
}

export function validateReflectionRecord(reflection: ReflectionRecord): string[] {
  const issues: string[] = [];

  if (!Array.isArray(reflection.findings) || reflection.findings.length === 0) {
    issues.push("ReflectionRecord.findings must include at least one finding.");
  }

  if (!Array.isArray(reflection.recommendations)) {
    issues.push("ReflectionRecord.recommendations must be an array.");
  }

  return issues;
}

export function validateRuntimeContracts(trace: RuntimeTrace): string[] {
  return [
    ...validateContextEnvelope(trace.context),
    ...validateDecisionRecord(trace.decision),
    ...validateAuthorityRecord(trace.authority),
    ...validateActionRecord(trace.action),
    ...validateEvidencePacket(trace.evidence),
    ...validateReflectionRecord(trace.reflection),
  ];
}
