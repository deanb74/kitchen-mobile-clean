import type {
    CompanionRuntimeRequest,
    ContextEnvelope,
    OperationalMode,
} from "./types";

function chooseMode(networkAvailable: boolean): OperationalMode {
  return networkAvailable ? "online" : "offline";
}

export class ContextEnvelopeBuilder {
  build(input: CompanionRuntimeRequest): ContextEnvelope {
    const now = new Date().toISOString();

    if (input.contextEnvelope) {
      return input.contextEnvelope;
    }

    return {
      interactionId: input.requestId,
      userId: input.actorId,
      role: input.actorRole,
      requestId: input.requestId,
      actorId: input.actorId,
      actorRole: input.actorRole,
      siteId: input.siteId,
      equipmentId: input.capabilityId,
      equipmentType: input.capabilityId,
      currentShift: input.shiftId,
      shiftId: input.shiftId,
      mode: chooseMode(input.networkAvailable),
      timestamp: now,
      requestedAt: now,
      localTimeIso: now,
      networkAvailable: input.networkAvailable,
      capabilityId: input.capabilityId,
      peopleOutcome: input.peopleOutcome,
      currentOperationalState: input.networkAvailable
        ? "recording-temperature"
        : "temperature-queued",
    };
  }
}
