import { CompanionOrchestrator } from "@/src/companion/CompanionOrchestrator";
import type {
    CompanionActionExecutionResult,
    CompanionRuntimeResult,
    ContextEnvelope,
    InteractionRecord,
    OperationalEvent,
} from "@/src/companion/types";
import { buildInteractionRecord } from "./temperatureContracts";

const PEOPLE_OUTCOME =
  "Protect people and preserve safe operations by recording and escalating equipment faults quickly.";

type ActorContext = {
  userId: string;
  role: string;
  siteId: string;
  shiftId?: string;
  networkAvailable?: boolean;
};

export type EquipmentFaultAdapterInput = {
  actorContext: ActorContext;
  equipmentId: string;
  faultDescription: string;
  severity: "low" | "medium" | "high";
  executeExistingSave: () => Promise<CompanionActionExecutionResult>;
};

export type EquipmentFaultInteractionRecordPreview = {
  operationalEvent: OperationalEvent;
  runtimeResult: CompanionRuntimeResult;
  interactionId: string;
  assistedBy: string;
  submittedAt: string;
  contextEnvelope: ContextEnvelope;
  decisionSnapshot: {
    intent: "EquipmentFault";
    equipmentId: string;
    severity: "low" | "medium" | "high";
    risk: "High" | "Low";
    reason: string;
  };
  interactionRecord: InteractionRecord;
  csaConformant: boolean;
  contractViolations: string[];
};

function buildContextEnvelope(input: EquipmentFaultAdapterInput): ContextEnvelope {
  const now = new Date().toISOString();
  const interactionId = `fault-${Date.now()}`;

  return {
    interactionId,
    userId: input.actorContext.userId,
    role: input.actorContext.role,
    actorId: input.actorContext.userId,
    actorRole: input.actorContext.role,
    requestId: interactionId,
    siteId: input.actorContext.siteId,
    equipmentId: input.equipmentId,
    equipmentType: "equipment",
    currentShift: input.actorContext.shiftId,
    shiftId: input.actorContext.shiftId,
    mode: input.actorContext.networkAvailable === false ? "offline" : "online",
    timestamp: now,
    requestedAt: now,
    localTimeIso: now,
    networkAvailable: input.actorContext.networkAvailable !== false,
    capabilityId: "equipment.fault.report",
    peopleOutcome: PEOPLE_OUTCOME,
    currentOperationalState: "equipment-fault-reporting",
  };
}

function buildDecisionSnapshot(input: EquipmentFaultAdapterInput) {
  const risk: "High" | "Low" =
    input.severity === "high" ? "High" : "Low";

  return {
    intent: "EquipmentFault" as const,
    equipmentId: input.equipmentId,
    severity: input.severity,
    risk,
    reason:
      risk === "High"
        ? "Fault severity requires immediate escalation and governed follow-up."
        : "Fault severity is manageable with standard governed maintenance workflow.",
  };
}

export class EquipmentFaultAdapter {
  constructor(
    private readonly companionRuntime = new CompanionOrchestrator(),
    private readonly companionId = "HH-0001",
  ) {}

  async submit(
    input: EquipmentFaultAdapterInput,
  ): Promise<EquipmentFaultInteractionRecordPreview> {
    const contextEnvelope = buildContextEnvelope(input);
    const decisionSnapshot = buildDecisionSnapshot(input);

    const runtimeResult = await this.companionRuntime.runAroundAction(
      {
        requestId: contextEnvelope.requestId,
        actorId: contextEnvelope.userId,
        actorRole: contextEnvelope.role,
        siteId: contextEnvelope.siteId,
        shiftId: contextEnvelope.currentShift,
        capabilityId: "equipment.fault.report",
        prompt: `Record equipment fault for ${input.equipmentId}: ${input.faultDescription}`,
        peopleOutcome: PEOPLE_OUTCOME,
        networkAvailable: contextEnvelope.networkAvailable,
        confidenceHint: input.severity === "high" ? 0.9 : 0.78,
        uncertainty: [],
        contextEnvelope,
      },
      input.executeExistingSave,
    );

    return {
      operationalEvent: {
        type: "Equipment Fault Reported",
        actor: contextEnvelope.userId,
        venue: contextEnvelope.siteId,
        outcome: "Completed",
      },
      runtimeResult,
      interactionId: contextEnvelope.interactionId,
      assistedBy: this.companionId,
      submittedAt: contextEnvelope.timestamp,
      contextEnvelope,
      decisionSnapshot,
      interactionRecord: buildInteractionRecord(runtimeResult.trace),
      csaConformant: runtimeResult.csaConformant,
      contractViolations: runtimeResult.contractViolations,
    };
  }
}

export const equipmentFaultAdapter = new EquipmentFaultAdapter();
