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
  "Maintain safe and hygienic environments by capturing governed cleaning completion evidence.";

type ActorContext = {
  userId: string;
  role: string;
  siteId: string;
  shiftId?: string;
  networkAvailable?: boolean;
};

export type CleaningAdapterInput = {
  actorContext: ActorContext;
  area: string;
  checklistId: string;
  completed: boolean;
  findings?: string[];
  executeExistingSave: () => Promise<CompanionActionExecutionResult>;
};

export type CleaningInteractionRecordPreview = {
  operationalEvent: OperationalEvent;
  runtimeResult: CompanionRuntimeResult;
  interactionId: string;
  assistedBy: string;
  submittedAt: string;
  contextEnvelope: ContextEnvelope;
  decisionSnapshot: {
    intent: "CleaningCompletion";
    area: string;
    checklistId: string;
    completed: boolean;
    risk: "High" | "Low";
    reason: string;
  };
  interactionRecord: InteractionRecord;
  csaConformant: boolean;
  contractViolations: string[];
};

function buildContextEnvelope(input: CleaningAdapterInput): ContextEnvelope {
  const now = new Date().toISOString();
  const interactionId = `cleaning-${Date.now()}`;

  return {
    interactionId,
    userId: input.actorContext.userId,
    role: input.actorContext.role,
    actorId: input.actorContext.userId,
    actorRole: input.actorContext.role,
    requestId: interactionId,
    siteId: input.actorContext.siteId,
    equipmentId: input.area,
    equipmentType: "cleaning-zone",
    currentShift: input.actorContext.shiftId,
    shiftId: input.actorContext.shiftId,
    mode: input.actorContext.networkAvailable === false ? "offline" : "online",
    timestamp: now,
    requestedAt: now,
    localTimeIso: now,
    networkAvailable: input.actorContext.networkAvailable !== false,
    capabilityId: "cleaning.complete",
    peopleOutcome: PEOPLE_OUTCOME,
    currentOperationalState: "cleaning-validation-active",
  };
}

function buildDecisionSnapshot(input: CleaningAdapterInput) {
  const hasFindings = (input.findings ?? []).length > 0;
  const risk: "High" | "Low" =
    input.completed && !hasFindings ? "Low" : "High";

  return {
    intent: "CleaningCompletion" as const,
    area: input.area,
    checklistId: input.checklistId,
    completed: input.completed,
    risk,
    reason:
      risk === "Low"
        ? "Cleaning completed with no findings requiring escalation."
        : "Cleaning requires follow-up due to incomplete status or findings.",
  };
}

export class CleaningAdapter {
  constructor(
    private readonly companionRuntime = new CompanionOrchestrator(),
    private readonly companionId = "HH-0001",
  ) {}

  async submit(input: CleaningAdapterInput): Promise<CleaningInteractionRecordPreview> {
    const contextEnvelope = buildContextEnvelope(input);
    const decisionSnapshot = buildDecisionSnapshot(input);

    const runtimeResult = await this.companionRuntime.runAroundAction(
      {
        requestId: contextEnvelope.requestId,
        actorId: contextEnvelope.userId,
        actorRole: contextEnvelope.role,
        siteId: contextEnvelope.siteId,
        shiftId: contextEnvelope.currentShift,
        capabilityId: "cleaning.complete",
        prompt: `Record cleaning completion for ${input.area} using checklist ${input.checklistId}`,
        peopleOutcome: PEOPLE_OUTCOME,
        networkAvailable: contextEnvelope.networkAvailable,
        confidenceHint: decisionSnapshot.risk === "Low" ? 0.84 : 0.72,
        uncertainty: [],
        contextEnvelope,
      },
      input.executeExistingSave,
    );

    return {
      operationalEvent: {
        type: "Cleaning Completed",
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

export const cleaningAdapter = new CleaningAdapter();
