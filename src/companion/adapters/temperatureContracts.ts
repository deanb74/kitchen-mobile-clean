import type {
    ActionRecord,
    AuthorityRecord,
    ContextEnvelope,
    DecisionRecord,
    EvidencePacket,
    InteractionRecord,
    ReflectionRecord,
} from "@/src/companion/types";

export function buildTemperatureContextEnvelope(params: {
  interactionId: string;
  userId: string;
  role: string;
  siteId: string;
  equipmentId: string;
  equipmentType: string;
  currentShift?: string;
  peopleOutcome: string;
  currentOperationalState: string;
  timestamp: string;
  networkAvailable: boolean;
}): ContextEnvelope {
  return {
    interactionId: params.interactionId,
    actorId: params.userId,
    actorRole: params.role,
    userId: params.userId,
    role: params.role,
    requestId: params.interactionId,
    siteId: params.siteId,
    equipmentId: params.equipmentId,
    equipmentType: params.equipmentType,
    currentShift: params.currentShift,
    mode: params.networkAvailable ? "online" : "offline",
    timestamp: params.timestamp,
    localTimeIso: params.timestamp,
    networkAvailable: params.networkAvailable,
    capabilityId: "temperature.log",
    peopleOutcome: params.peopleOutcome,
    currentOperationalState: params.currentOperationalState,
  };
}

export function buildOfflineTemperatureMeta(params: {
  contextEnvelope: ContextEnvelope;
  idempotencyKey: string;
  originalAttemptedAt: string;
  originalActionIntent: string;
}) {
  return {
    interactionId: params.contextEnvelope.interactionId,
    userId: params.contextEnvelope.userId,
    role: params.contextEnvelope.role,
    requestId: params.contextEnvelope.requestId,
    siteId: params.contextEnvelope.siteId,
    equipmentId: params.contextEnvelope.equipmentId,
    equipmentType: params.contextEnvelope.equipmentType,
    currentShift: params.contextEnvelope.currentShift,
    peopleOutcome: params.contextEnvelope.peopleOutcome,
    originalActionIntent: params.originalActionIntent,
    originalAttemptedAt: params.originalAttemptedAt,
    idempotencyKey: params.idempotencyKey,
    currentOperationalState: params.contextEnvelope.currentOperationalState,
  };
}

export function buildTemperatureDecisionSnapshot(params: {
  equipment: string;
  equipmentType: string;
  observedTemperature: number;
}) {
  if (!Number.isFinite(params.observedTemperature)) {
    throw new Error("A valid numeric temperature is required.");
  }

  const isFreezer = params.equipmentType === "freezer";
  const outsideRange = isFreezer
    ? params.observedTemperature < -18 || params.observedTemperature > -15
    : params.observedTemperature < 0 || params.observedTemperature > 5;

  return {
    intent: "TemperatureRecording" as const,
    equipment: params.equipment,
    observedTemperature: params.observedTemperature,
    expectedRange: isFreezer ? "-18 to -15°C" : "0 to 5°C",
    risk: outsideRange ? ("High" as const) : ("Low" as const),
    confidence: 0.99,
    reason: outsideRange
      ? `Recorded temperature is outside the configured ${isFreezer ? "freezer" : "chilled"} operating range.`
      : `Recorded temperature is within the configured ${isFreezer ? "freezer" : "chilled"} operating range.`,
  };
}

export function buildInteractionRecord(params: {
  context: ContextEnvelope;
  decision: DecisionRecord;
  authority: AuthorityRecord;
  action: ActionRecord;
  evidence: EvidencePacket;
  reflection: ReflectionRecord;
}): InteractionRecord {
  return {
    context: params.context,
    decision: params.decision,
    authority: params.authority,
    action: params.action,
    evidence: params.evidence,
    reflection: params.reflection,
    reviewOutcome: "Unreviewed",
  };
}
