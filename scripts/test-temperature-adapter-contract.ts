import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
    buildTemperatureContextEnvelope,
    buildTemperatureDecisionSnapshot,
} from "../src/companion/adapters/temperatureContracts";
import { CompanionOrchestrator } from "../src/companion/CompanionOrchestrator";
import { resolveRepositoryRootFromImportMeta } from "./support/repositoryRoot";

const divider = "----------------------------------------";
const repositoryRoot = resolveRepositoryRootFromImportMeta(import.meta.url);

async function main() {
  console.log("\nHELPING HAND TEMPERATURE ADAPTER CONTRACT HARNESS");
  console.log(divider);

  const timestamp = "2026-07-27T12:00:00.000Z";
  const contextEnvelope = buildTemperatureContextEnvelope({
    interactionId: "temp-contract-001",
    userId: "chef-001",
    role: "chef",
    siteId: "anne-arms",
    equipmentId: "Walk-in Fridge",
    equipmentType: "fridge",
    currentShift: "shift-001",
    peopleOutcome:
      "Prevent unsafe food handling and support timely, safe operational decisions.",
    currentOperationalState: "temperature-entry-active",
    timestamp,
    networkAvailable: true,
  });

  assert.equal(
    contextEnvelope.actorId,
    "chef-001",
    "Expected adapter context envelope to include actorId.",
  );

  const decisionSnapshot = buildTemperatureDecisionSnapshot({
    equipment: "Walk-in Fridge",
    equipmentType: "fridge",
    observedTemperature: 3,
  });

  assert.equal(
    decisionSnapshot.risk,
    "Low",
    "Expected in-range temperature to produce Low risk.",
  );

  assert.equal(
    decisionSnapshot.reason.includes("within the configured chilled operating range."),
    true,
    "Expected in-range chilled reason wording.",
  );

  const outOfRangeChilled = buildTemperatureDecisionSnapshot({
    equipment: "Walk-in Fridge",
    equipmentType: "fridge",
    observedTemperature: 7,
  });

  assert.equal(
    outOfRangeChilled.risk,
    "High",
    "Expected out-of-range chilled temperature to produce High risk.",
  );

  const validFreezer = buildTemperatureDecisionSnapshot({
    equipment: "Walk-in Freezer",
    equipmentType: "freezer",
    observedTemperature: -17,
  });

  assert.equal(
    validFreezer.risk,
    "Low",
    "Expected in-range freezer temperature to produce Low risk.",
  );

  assert.throws(
    () =>
      buildTemperatureDecisionSnapshot({
        equipment: "Walk-in Fridge",
        equipmentType: "fridge",
        observedTemperature: Number.NaN,
      }),
    /valid numeric temperature/i,
    "Expected invalid numeric temperature to throw.",
  );

  const orchestrator = new CompanionOrchestrator();
  const runtimeResult = await orchestrator.runAroundAction(
    {
      requestId: contextEnvelope.requestId,
      actorId: contextEnvelope.actorId || "",
      actorRole: contextEnvelope.role,
      siteId: contextEnvelope.siteId,
      shiftId: contextEnvelope.currentShift,
      capabilityId: "temperature.log",
      prompt: "Log temperature for governed test run.",
      peopleOutcome: contextEnvelope.peopleOutcome,
      networkAvailable: contextEnvelope.networkAvailable,
      confidenceHint: 0.85,
      uncertainty: [],
      contextEnvelope,
    },
    async () => ({
      attempted: true,
      outcome: "succeeded",
      summary: "Deterministic adapter contract simulation save succeeded.",
      sideEffects: ["temperature-record-created"],
    }),
  );

  const result = {
    interactionRecord: {
      csaConformant: runtimeResult.csaConformant,
      contractViolations: runtimeResult.contractViolations,
    },
  };

  assert.equal(
    result.interactionRecord.csaConformant,
    true,
    "Expected adapter deterministic run to be CSA conformant.",
  );

  assert.equal(
    result.interactionRecord.contractViolations.length,
    0,
    "Expected adapter deterministic run to have zero contract violations.",
  );

  const adapterSource = await readFile(
    path.join(repositoryRoot, "src/companion/adapters/TemperatureAdapter.ts"),
    "utf8",
  );

  assert.equal(
    adapterSource.includes("if (!headers) {") &&
      adapterSource.includes("return { mode: \"auth-required\" };"),
    true,
    "Expected explicit missing-auth branch in temperature adapter.",
  );

  assert.equal(
    adapterSource.includes("if (!net.isConnected)") &&
      adapterSource.includes("enqueueOfflineTemperature") &&
      adapterSource.includes("return { mode: \"queued-offline\" };"),
    true,
    "Expected offline queue branch with queued-offline return.",
  );

  assert.equal(
    adapterSource.includes("buildOfflineTemperatureMeta") &&
      adapterSource.includes("idempotencyKey") &&
      adapterSource.includes("originalAttemptedAt"),
    true,
    "Expected offline queue metadata for governed replay reconstruction.",
  );

  const syncQueueSource = await readFile(
    path.join(repositoryRoot, "lib/syncQueue.ts"),
    "utf8",
  );

  assert.equal(
    syncQueueSource.includes("companionRuntime.runAroundAction"),
    true,
    "Expected sync replay path to be governed by Companion Runtime.",
  );

  assert.equal(
    syncQueueSource.includes("appendCompanionRuntimeTrace(runtimeResult)"),
    true,
    "Expected sync replay path to append Interaction Record evidence.",
  );

  console.log("Adapter contract harness passed.");
  console.log(
    `csaConformant=${result.interactionRecord.csaConformant} violations=${result.interactionRecord.contractViolations.length}`,
  );
  console.log(divider);
}

main().catch((error: unknown) => {
  console.error("Temperature adapter contract harness failed.");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);
});
