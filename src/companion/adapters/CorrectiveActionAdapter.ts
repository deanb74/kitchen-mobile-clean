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
  "Ensure corrective actions are completed safely and consistently to protect people and service quality.";

type ActorContext = {
  userId: string;
  role: string;
  siteId: string;
  shiftId?: string;
  networkAvailable?: boolean;
};

export type CorrectiveActionAdapterInput = {
  actorContext: ActorContext;
  actionType: string;
  target: string;
  details: string;
  priority: "standard" | "urgent";
  executeExistingSave: () => Promise<CompanionActionExecutionResult>;
};

export type CorrectiveActionInteractionRecordPreview = {
  operationalEvent: OperationalEvent;
  runtimeResult: CompanionRuntimeResult;
  interactionId: string;
  assistedBy: string;
  submittedAt: string;
  contextEnvelope: ContextEnvelope;
  decisionSnapshot: {
    intent: "CorrectiveAction";
    actionType: string;
    target: string;
    priority: "standard" | "urgent";
    risk: "High" | "Low";
    reason: string;
  };
  interactionRecord: InteractionRecord;
  csaConformant: boolean;
  contractViolations: string[];
};

function buildContextEnvelope(input: CorrectiveActionAdapterInput): ContextEnvelope {
  const now = new Date().toISOString();
  const interactionId = `corrective-${Date.now()}`;

  return {
    interactionId,
    userId: input.actorContext.userId,
    role: input.actorContext.role,
    actorId: input.actorContext.userId,
    actorRole: input.actorContext.role,
    requestId: interactionId,
    siteId: input.actorContext.siteId,
    equipmentId: input.target,
    equipmentType: "workflow",
    currentShift: input.actorContext.shiftId,
    shiftId: input.actorContext.shiftId,
    mode: input.actorContext.networkAvailable === false ? "offline" : "online",
    timestamp: now,
    requestedAt: now,
    localTimeIso: now,
    networkAvailable: input.actorContext.networkAvailable !== false,
    capabilityId: "corrective.action.complete",
    peopleOutcome: PEOPLE_OUTCOME,
    currentOperationalState: "corrective-action-active",
  };
}

function buildDecisionSnapshot(input: CorrectiveActionAdapterInput) {
  const risk: "High" | "Low" =
    input.priority === "urgent" ? "High" : "Low";

  return {
    intent: "CorrectiveAction" as const,
    actionType: input.actionType,
    target: input.target,
    priority: input.priority,
    risk,
    reason:
      risk === "High"
        ? "Urgent corrective action requires immediate governed completion."
        : "Standard corrective action should complete through normal governed workflow.",
  };
}

export class CorrectiveActionAdapter {
  constructor(
    private readonly companionRuntime = new CompanionOrchestrator(),
    private readonly companionId = "HH-0001",
  ) {}

  async submit(
    input: CorrectiveActionAdapterInput,
  ): Promise<CorrectiveActionInteractionRecordPreview> {
    const contextEnvelope = buildContextEnvelope(input);
    const decisionSnapshot = buildDecisionSnapshot(input);

    const runtimeResult = await this.companionRuntime.runAroundAction(
      {
        requestId: contextEnvelope.requestId,
        actorId: contextEnvelope.userId,
        actorRole: contextEnvelope.role,
        siteId: contextEnvelope.siteId,
        shiftId: contextEnvelope.currentShift,
        capabilityId: "corrective.action.complete",
        prompt: `Complete corrective action ${input.actionType} for ${input.target}: ${input.details}`,
        peopleOutcome: PEOPLE_OUTCOME,
        networkAvailable: contextEnvelope.networkAvailable,
        confidenceHint: input.priority === "urgent" ? 0.88 : 0.8,
        uncertainty: [],
        contextEnvelope,
      },
      input.executeExistingSave,
    );

    return {
      operationalEvent: {
        type: "Corrective Action",
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

export const correctiveActionAdapter = new CorrectiveActionAdapter();
