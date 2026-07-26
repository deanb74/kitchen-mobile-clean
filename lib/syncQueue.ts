import { appendCompanionRuntimeTrace } from "@/lib/companionRuntimeTraceStore";
import { CompanionOrchestrator } from "@/src/companion/CompanionOrchestrator";
import axios from "axios";
import { getOfflineQueue, replaceOfflineQueue } from "./offlineQueue";
import { getStoredItem } from "./storage";
import { setSyncStatus } from "./syncStatus";

const API = "http://192.168.0.183:3001";
const companionRuntime = new CompanionOrchestrator();

export async function syncOfflineQueue() {
  const token = await getStoredItem("token");

  if (!token) {
    setSyncStatus("error");
    return { synced: 0, remaining: 0 };
  }

  const headers = { Authorization: `Bearer ${token}` };
  const queue = await getOfflineQueue();
  const [currentRole, currentSiteId, currentShiftId] = await Promise.all([
    getStoredItem("role"),
    getStoredItem("siteId"),
    getStoredItem("shiftId"),
  ]);

  if (queue.length === 0) {
    setSyncStatus("synced");
    return { synced: 0, remaining: 0 };
  }

  setSyncStatus("syncing");

  const remaining = [];
  let synced = 0;

  for (const action of queue) {
    try {
      if (action.type === "completeTask") {
        const res = await axios.post(
          `${API}/tasks/${action.payload.taskId}/complete`,
          {},
          { headers }
        );

        if (res.data?.success) {
          synced += 1;
          continue;
        }
      }

      if (action.type === "logTemperature") {
        const original = action.runtimeMeta;
        const replayOccurredAt = new Date().toISOString();
        const conditionsChanged: string[] = [];

        if (original?.role && currentRole && original.role !== currentRole) {
          conditionsChanged.push(`Role changed from ${original.role} to ${currentRole}.`);
        }

        if (original?.siteId && currentSiteId && original.siteId !== currentSiteId) {
          conditionsChanged.push(`Site changed from ${original.siteId} to ${currentSiteId}.`);
        }

        if ((original?.currentShift || "") !== (currentShiftId || "")) {
          conditionsChanged.push("Shift context changed since original offline request.");
        }

        const requestIdBase = original?.requestId || action.id;
        const runtimeResult = await companionRuntime.runAroundAction(
          {
            requestId: `${requestIdBase}-replay-${Date.now()}`,
            actorId: original?.userId || "kdc-mobile-user",
            actorRole: currentRole || original?.role || "staff",
            siteId: currentSiteId || original?.siteId || "unknown-site",
            shiftId: currentShiftId || original?.currentShift,
            capabilityId: "temperature.log",
            prompt: original?.originalActionIntent ||
              `Replay queued temperature for ${action.payload.fridge} at ${action.payload.value}C`,
            peopleOutcome: original?.peopleOutcome ||
              "Preserve food safety and reliable operational records during deferred sync.",
            networkAvailable: true,
            confidenceHint: conditionsChanged.length > 0 ? 0.55 : 0.82,
            uncertainty: conditionsChanged.map(
              (change) => `Operational risk requires replay reassessment: ${change}`,
            ),
            artifacts: [
              {
                kind: "note",
                detail:
                  `Offline replay lifecycle: first attempted ${original?.originalAttemptedAt || action.createdAt}, replayed ${replayOccurredAt}.`,
              },
              {
                kind: "system",
                detail:
                  `Idempotency identity: ${original?.idempotencyKey || action.id}.`,
              },
              {
                kind: "note",
                detail:
                  conditionsChanged.length > 0
                    ? `Conditions changed while offline: ${conditionsChanged.join(" ")}`
                    : "Conditions stable since original offline request.",
              },
            ],
          },
          async () => {
            try {
              const res = await axios.post(`${API}/temperatures`, action.payload, {
                headers,
              });

              const replayOutcome =
                res.data?.duplicate
                  ? "duplicate-accepted"
                  : "success";

              return {
                attempted: true,
                outcome: "succeeded" as const,
                summary: `Offline replay ${replayOutcome} for ${action.payload.fridge}.`,
                sideEffects: [
                  "offline-replay",
                  `conflict-outcome:${replayOutcome}`,
                  conditionsChanged.length > 0
                    ? "fresh-authority-required:true"
                    : "fresh-authority-required:false",
                ],
              };
            } catch (error: any) {
              const status = error?.response?.status;

              if (status === 400) {
                return {
                  attempted: true,
                  outcome: "failed" as const,
                  summary: "Offline replay conflict: backend rejected request.",
                  sideEffects: [
                    "offline-replay",
                    "conflict-outcome:validation-error",
                    conditionsChanged.length > 0
                      ? "fresh-authority-required:true"
                      : "fresh-authority-required:false",
                  ],
                };
              }

              return {
                attempted: true,
                outcome: "failed" as const,
                summary: `Offline replay failed: ${error?.message || "unknown error"}`,
                sideEffects: [
                  "offline-replay",
                  `conflict-outcome:http-${status || "unknown"}`,
                  conditionsChanged.length > 0
                    ? "fresh-authority-required:true"
                    : "fresh-authority-required:false",
                ],
              };
            }
          },
        );

        await appendCompanionRuntimeTrace(runtimeResult);

        if (!runtimeResult.accepted || !runtimeResult.csaConformant) {
          remaining.push(action);
          continue;
        }

        if (runtimeResult.trace.action.outcome === "succeeded") {
          synced += 1;
          continue;
        }

        remaining.push(action);
        continue;
      }

      remaining.push(action);
    } catch (error: any) {
      const status = error?.response?.status;

      // Safe conflict cases
      if (action.type === "completeTask" && status === 404) {
        // task missing/reassigned/deleted: keep it pending for review
        remaining.push(action);
        continue;
      }

      if (action.type === "logTemperature" && status === 400) {
        remaining.push(action);
        continue;
      }

      remaining.push(action);
    }
  }

  await replaceOfflineQueue(remaining);

  if (remaining.length === 0) {
    setSyncStatus("synced");
  } else {
    setSyncStatus("pending");
  }

  return { synced, remaining: remaining.length };
}