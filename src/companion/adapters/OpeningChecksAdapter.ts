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
  "Ensure opening checks are completed reliably before service begins.";

type ActorContext = {
  userId: string;
  role: string;
  siteId: string;
  shiftId?: string;
  networkAvailable?: boolean;
};

export type OpeningChecksAdapterInput = {
  actorContext: ActorContext;
  checklistId: string;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
  executeExistingSave: () => Promise<CompanionActionExecutionResult>;
};

export type OpeningChecksInteractionRecordPreview = {
  operationalEvent: OperationalEvent;
  runtimeResult: CompanionRuntimeResult;
  interactionId: string;
  assistedBy: string;
  submittedAt: string;
  contextEnvelope: ContextEnvelope;
  decisionSnapshot: {
    intent: "OpeningChecks";
    checklistId: string;
    completed: boolean;
    elapsedMinutes?: number;
    risk: "High" | "Low";
    reason: string;
  };
  interactionRecord: InteractionRecord;
  csaConformant: boolean;
  contractViolations: string[];
};

function toMinutes(start: string, end?: string): number | undefined {
  if (!end) return undefined;
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return undefined;
  return Math.max(0, Math.round((endMs - startMs) / 60000));
}

function buildContextEnvelope(input: OpeningChecksAdapterInput): ContextEnvelope {
  const now = new Date().toISOString();
  const interactionId = `opening-${Date.now()}`;

  return {
    interactionId,
    userId: input.actorContext.userId,
    role: input.actorContext.role,
    actorId: input.actorContext.userId,
    actorRole: input.actorContext.role,
    requestId: interactionId,
    siteId: input.actorContext.siteId,
    equipmentId: input.checklistId,
    equipmentType: "opening-checklist",
    currentShift: input.actorContext.shiftId,
    shiftId: input.actorContext.shiftId,
    mode: input.actorContext.networkAvailable === false ? "offline" : "online",
    timestamp: now,
    requestedAt: now,
    localTimeIso: now,
    networkAvailable: input.actorContext.networkAvailable !== false,
    capabilityId: "opening.checks.complete",
    peopleOutcome: PEOPLE_OUTCOME,
    currentOperationalState: "opening-checks-active",
  };
}

function buildDecisionSnapshot(input: OpeningChecksAdapterInput) {
  const elapsedMinutes = toMinutes(input.startedAt, input.completedAt);
  const risk: "High" | "Low" = input.completed ? "Low" : "High";

  return {
    intent: "OpeningChecks" as const,
    checklistId: input.checklistId,
    completed: input.completed,
    elapsedMinutes,
    risk,
    reason:
      risk === "Low"
        ? "Opening checks completed and ready for governed service start."
        : "Opening checks incomplete and require governed follow-up.",
  };
}

export class OpeningChecksAdapter {
  constructor(
    private readonly companionRuntime = new CompanionOrchestrator(),
    private readonly companionId = "HH-0001",
  ) {}

  async submit(
    input: OpeningChecksAdapterInput,
  ): Promise<OpeningChecksInteractionRecordPreview> {
    const contextEnvelope = buildContextEnvelope(input);
    const decisionSnapshot = buildDecisionSnapshot(input);

    const runtimeResult = await this.companionRuntime.runAroundAction(
      {
        requestId: contextEnvelope.requestId,
        actorId: contextEnvelope.userId,
        actorRole: contextEnvelope.role,
        siteId: contextEnvelope.siteId,
        shiftId: contextEnvelope.currentShift,
        capabilityId: "opening.checks.complete",
        prompt: `Record opening checks ${input.checklistId} completion=${input.completed}`,
        peopleOutcome: PEOPLE_OUTCOME,
        networkAvailable: contextEnvelope.networkAvailable,
        confidenceHint: decisionSnapshot.risk === "Low" ? 0.85 : 0.7,
        uncertainty: [],
        contextEnvelope,
      },
      input.executeExistingSave,
    );

    return {
      operationalEvent: {
        type: "Opening Checks",
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

export const openingChecksAdapter = new OpeningChecksAdapter();
