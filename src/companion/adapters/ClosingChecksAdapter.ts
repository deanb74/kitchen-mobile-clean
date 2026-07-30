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
  "Ensure closing checks are completed safely so the venue can transition cleanly between services.";

type ActorContext = {
  userId: string;
  role: string;
  siteId: string;
  shiftId?: string;
  networkAvailable?: boolean;
};

export type ClosingChecksAdapterInput = {
  actorContext: ActorContext;
  checklistId: string;
  completed: boolean;
  unresolvedItems: string[];
  executeExistingSave: () => Promise<CompanionActionExecutionResult>;
};

export type ClosingChecksInteractionRecordPreview = {
  operationalEvent: OperationalEvent;
  runtimeResult: CompanionRuntimeResult;
  interactionId: string;
  assistedBy: string;
  submittedAt: string;
  contextEnvelope: ContextEnvelope;
  decisionSnapshot: {
    intent: "ClosingChecks";
    checklistId: string;
    completed: boolean;
    unresolvedCount: number;
    risk: "High" | "Low";
    reason: string;
  };
  interactionRecord: InteractionRecord;
  csaConformant: boolean;
  contractViolations: string[];
};

function buildContextEnvelope(input: ClosingChecksAdapterInput): ContextEnvelope {
  const now = new Date().toISOString();
  const interactionId = `closing-${Date.now()}`;

  return {
    interactionId,
    userId: input.actorContext.userId,
    role: input.actorContext.role,
    actorId: input.actorContext.userId,
    actorRole: input.actorContext.role,
    requestId: interactionId,
    siteId: input.actorContext.siteId,
    equipmentId: input.checklistId,
    equipmentType: "closing-checklist",
    currentShift: input.actorContext.shiftId,
    shiftId: input.actorContext.shiftId,
    mode: input.actorContext.networkAvailable === false ? "offline" : "online",
    timestamp: now,
    requestedAt: now,
    localTimeIso: now,
    networkAvailable: input.actorContext.networkAvailable !== false,
    capabilityId: "closing.checks.complete",
    peopleOutcome: PEOPLE_OUTCOME,
    currentOperationalState: "closing-checks-active",
  };
}

function buildDecisionSnapshot(input: ClosingChecksAdapterInput) {
  const unresolvedCount = input.unresolvedItems.length;
  const risk: "High" | "Low" =
    input.completed && unresolvedCount === 0 ? "Low" : "High";

  return {
    intent: "ClosingChecks" as const,
    checklistId: input.checklistId,
    completed: input.completed,
    unresolvedCount,
    risk,
    reason:
      risk === "Low"
        ? "Closing checks completed with no unresolved items."
        : "Closing checks incomplete or unresolved items require follow-up.",
  };
}

export class ClosingChecksAdapter {
  constructor(
    private readonly companionRuntime = new CompanionOrchestrator(),
    private readonly companionId = "HH-0001",
  ) {}

  async submit(
    input: ClosingChecksAdapterInput,
  ): Promise<ClosingChecksInteractionRecordPreview> {
    const contextEnvelope = buildContextEnvelope(input);
    const decisionSnapshot = buildDecisionSnapshot(input);

    const runtimeResult = await this.companionRuntime.runAroundAction(
      {
        requestId: contextEnvelope.requestId,
        actorId: contextEnvelope.userId,
        actorRole: contextEnvelope.role,
        siteId: contextEnvelope.siteId,
        shiftId: contextEnvelope.currentShift,
        capabilityId: "closing.checks.complete",
        prompt: `Record closing checks ${input.checklistId} completion=${input.completed}`,
        peopleOutcome: PEOPLE_OUTCOME,
        networkAvailable: contextEnvelope.networkAvailable,
        confidenceHint: decisionSnapshot.risk === "Low" ? 0.85 : 0.68,
        uncertainty: [],
        contextEnvelope,
      },
      input.executeExistingSave,
    );

    return {
      operationalEvent: {
        type: "Closing Checks",
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

export const closingChecksAdapter = new ClosingChecksAdapter();
