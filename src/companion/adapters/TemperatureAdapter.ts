import { appendCompanionRuntimeTrace } from "@/lib/companionRuntimeTraceStore";
import { addToOfflineQueue } from "@/lib/offlineQueue";
import { getStoredItem } from "@/lib/storage";
import {
  buildInteractionRecord,
  buildOfflineTemperatureMeta,
  buildTemperatureContextEnvelope,
  buildTemperatureDecisionSnapshot,
} from "@/src/companion/adapters/temperatureContracts";
import { CompanionOrchestrator } from "@/src/companion/CompanionOrchestrator";
import type {
  CompanionRuntimeResult,
  ContextEnvelope,
  InteractionRecord,
  OperationalEvent,
} from "@/src/companion/types";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

const API = "http://192.168.0.183:3001";
const PEOPLE_OUTCOME =
  "Prevent unsafe food handling and support timely, safe operational decisions.";

function normalizeStoredValue(value: string | null): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export type TemperatureInteractionRecordPreview = {
  operationalEvent: OperationalEvent;
  interactionId: string;
  assistedBy: string;
  submittedAt: string;
  saveStatus: string;
  contextEnvelope: ContextEnvelope;
  decisionSnapshot: {
    intent: "TemperatureRecording";
    equipment: string;
    observedTemperature: number;
    expectedRange: string;
    risk: "High" | "Low";
    confidence: number;
    reason: string;
  };
  interactionRecord: InteractionRecord;
  csaConformant: boolean;
  contractViolations: string[];
};

export type SubmitTemperatureWithCompanionInput = {
  fridge: string;
  value: string;
  type: string;
  getAuthHeaders: () => Promise<{ Authorization: string } | null>;
};

export type SubmitTemperatureWithCompanionResult =
  | {
      mode: "queued-offline";
    }
  | {
      mode: "submitted";
      interactionRecord: TemperatureInteractionRecordPreview;
    }
  | {
      mode: "auth-required";
    };

export type TemperatureAdapterDependencies = {
  getStoredItem: (key: string) => Promise<string | null>;
  fetchNetworkState: () => Promise<{ isConnected: boolean | null }>;
  enqueueOfflineTemperature: (action: {
    id: string;
    type: "logTemperature";
    payload: { fridge: string; value: string; type: string };
    runtimeMeta?: {
      interactionId: string;
      userId: string;
      role: string;
      requestId: string;
      siteId: string;
      equipmentId: string;
      equipmentType: string;
      currentShift?: string;
      peopleOutcome: string;
      originalActionIntent: string;
      originalAttemptedAt: string;
      idempotencyKey: string;
      currentOperationalState: string;
    };
    createdAt: string;
  }) => Promise<void>;
  appendRuntimeTrace: (trace: CompanionRuntimeResult) => Promise<void>;
  postTemperature: (
    url: string,
    payload: { fridge: string; value: string; type: string },
    headers: { Authorization: string },
  ) => Promise<{ data?: { status?: string } }>;
  now: () => Date;
  companionId: string;
};

const defaultDependencies: TemperatureAdapterDependencies = {
  getStoredItem,
  fetchNetworkState: async () => {
    const net = await NetInfo.fetch();
    return { isConnected: net.isConnected };
  },
  enqueueOfflineTemperature: addToOfflineQueue,
  appendRuntimeTrace: appendCompanionRuntimeTrace,
  postTemperature: async (url, payload, headers) =>
    axios.post(url, payload, { headers }),
  now: () => new Date(),
  companionId: "HH-0001",
};

export {
  buildTemperatureContextEnvelope,
  buildTemperatureDecisionSnapshot
} from "@/src/companion/adapters/temperatureContracts";

export class TemperatureAdapter {
  constructor(
    private readonly companionRuntime = new CompanionOrchestrator(),
    private readonly apiBase = API,
    private readonly dependencies: TemperatureAdapterDependencies =
      defaultDependencies,
  ) {}

  async submit(
    input: SubmitTemperatureWithCompanionInput,
  ): Promise<SubmitTemperatureWithCompanionResult> {
    const payload = {
      fridge: input.fridge,
      value: input.value,
      type: input.type,
    };

    const [userId, actorRole, siteId, shiftId, net] = await Promise.all([
      this.resolveActorId(),
      this.dependencies.getStoredItem("role"),
      this.dependencies.getStoredItem("siteId"),
      this.dependencies.getStoredItem("shiftId"),
      this.dependencies.fetchNetworkState(),
    ]);

    const envelopeTimestamp = this.dependencies.now().toISOString();
    const contextEnvelope = buildTemperatureContextEnvelope({
      interactionId: `temp-${Date.now()}`,
      userId: userId || "unknown-user",
      role: actorRole || "staff",
      siteId: siteId || "unknown-site",
      equipmentId: input.fridge,
      equipmentType: input.type,
      currentShift: shiftId || undefined,
      peopleOutcome: PEOPLE_OUTCOME,
      currentOperationalState: net.isConnected
        ? "temperature-entry-active"
        : "temperature-queued-offline",
      timestamp: envelopeTimestamp,
      networkAvailable: net.isConnected === true,
    });

    const decisionSnapshot = buildTemperatureDecisionSnapshot({
      equipment: input.fridge,
      equipmentType: input.type,
      observedTemperature: Number(input.value),
    });

    if (!net.isConnected) {
      const queuedAt = this.dependencies.now().toISOString();
      const idempotencyKey = `${this.dependencies.now().getTime()}-temp-${input.fridge}`;

      await this.dependencies.enqueueOfflineTemperature({
        id: idempotencyKey,
        type: "logTemperature",
        payload,
        runtimeMeta: buildOfflineTemperatureMeta({
          contextEnvelope,
          idempotencyKey,
          originalAttemptedAt: queuedAt,
          originalActionIntent: `Log ${input.type} temperature for ${input.fridge} at ${input.value}C`,
        }),
        createdAt: queuedAt,
      });

      return { mode: "queued-offline" };
    }

    const headers = await input.getAuthHeaders();

    if (!headers) {
      return { mode: "auth-required" };
    }

    let completionStatus = "unknown";

    const runtimeResult = await this.companionRuntime.runAroundAction(
      {
        requestId: contextEnvelope.interactionId,
        actorId: contextEnvelope.userId,
        actorRole: contextEnvelope.role,
        siteId: contextEnvelope.siteId,
        shiftId: contextEnvelope.currentShift,
        capabilityId: "temperature.log",
        prompt: `Log ${input.type} temperature for ${input.fridge} at ${input.value}C`,
        peopleOutcome: PEOPLE_OUTCOME,
        networkAvailable: true,
        confidenceHint: 0.85,
        uncertainty: [],
        contextEnvelope,
      },
      async () => {
        const res = await this.dependencies.postTemperature(
          `${this.apiBase}/temperatures`,
          payload,
          headers,
        );

        const responseStatus = String(res.data?.status || "unknown");
        completionStatus = responseStatus;

        return {
          attempted: true,
          outcome: "succeeded" as const,
          summary: `Temperature submission succeeded with status ${responseStatus}.`,
          sideEffects: ["temperature-record-created"],
        };
      },
    );

    await this.dependencies.appendRuntimeTrace(runtimeResult);

    return {
      mode: "submitted",
      interactionRecord: {
        operationalEvent: {
          type: "Temperature Recording",
          actor: contextEnvelope.userId,
          venue: contextEnvelope.siteId,
          outcome: "Completed",
        },
        interactionId: contextEnvelope.interactionId,
        assistedBy: this.dependencies.companionId,
        submittedAt: envelopeTimestamp,
        saveStatus: completionStatus,
        contextEnvelope,
        decisionSnapshot,
        interactionRecord: buildInteractionRecord(runtimeResult.trace),
        csaConformant: runtimeResult.csaConformant,
        contractViolations: runtimeResult.contractViolations,
      },
    };
  }

  private async resolveActorId(): Promise<string | null> {
    const [userId, actorId, id] = await Promise.all([
      this.dependencies.getStoredItem("userId"),
      this.dependencies.getStoredItem("actorId"),
      this.dependencies.getStoredItem("id"),
    ]);

    return (
      normalizeStoredValue(userId) ||
      normalizeStoredValue(actorId) ||
      normalizeStoredValue(id)
    );
  }
}

export const temperatureAdapter = new TemperatureAdapter();
