import { readFile } from "node:fs/promises";
import path from "node:path";
import {
    buildTemperatureContextEnvelope,
    buildTemperatureDecisionSnapshot,
} from "../temperatureContracts";

describe("TemperatureAdapter contract regression", () => {
  it("builds context with required actor identity", () => {
    const context = buildTemperatureContextEnvelope({
      interactionId: "temp-test-001",
      userId: "chef-001",
      role: "chef",
      siteId: "anne-arms",
      equipmentId: "Walk-in Fridge",
      equipmentType: "fridge",
      currentShift: "shift-001",
      peopleOutcome:
        "Prevent unsafe food handling and support timely, safe operational decisions.",
      currentOperationalState: "temperature-entry-active",
      timestamp: "2026-07-27T12:00:00.000Z",
      networkAvailable: true,
    });

    expect(context.actorId).toBe("chef-001");
    expect(context.actorRole).toBe("chef");
    expect(context.requestId).toBe("temp-test-001");
  });

  it("classifies valid chilled reading as low risk", () => {
    const decision = buildTemperatureDecisionSnapshot({
      equipment: "Walk-in Fridge",
      equipmentType: "fridge",
      observedTemperature: 3,
    });

    expect(decision.expectedRange).toBe("0 to 5°C");
    expect(decision.risk).toBe("Low");
    expect(decision.reason).toContain("within the configured chilled operating range");
  });

  it("classifies out-of-range chilled reading as high risk", () => {
    const decision = buildTemperatureDecisionSnapshot({
      equipment: "Walk-in Fridge",
      equipmentType: "fridge",
      observedTemperature: 7,
    });

    expect(decision.expectedRange).toBe("0 to 5°C");
    expect(decision.risk).toBe("High");
    expect(decision.reason).toContain("outside the configured chilled operating range");
  });

  it("classifies valid freezer reading as low risk", () => {
    const decision = buildTemperatureDecisionSnapshot({
      equipment: "Walk-in Freezer",
      equipmentType: "freezer",
      observedTemperature: -17,
    });

    expect(decision.expectedRange).toBe("-18 to -15°C");
    expect(decision.risk).toBe("Low");
    expect(decision.reason).toContain("within the configured freezer operating range");
  });

  it("throws on invalid numeric input", () => {
    expect(() =>
      buildTemperatureDecisionSnapshot({
        equipment: "Walk-in Fridge",
        equipmentType: "fridge",
        observedTemperature: Number.NaN,
      }),
    ).toThrow("A valid numeric temperature is required.");
  });

  it("keeps missing-auth and offline-queue branches in adapter", async () => {
    const source = await readFile(
      path.join(process.cwd(), "src/companion/adapters/TemperatureAdapter.ts"),
      "utf8",
    );

    expect(source).toContain("return { mode: \"auth-required\" };");
    expect(source).toContain("return { mode: \"queued-offline\" };");
    expect(source).toContain("buildOfflineTemperatureMeta");
    expect(source).toContain("idempotencyKey");
    expect(source).toContain("originalAttemptedAt");
  });

  it("keeps offline replay governed by runtime and trace append", async () => {
    const replaySource = await readFile(
      path.join(process.cwd(), "lib/syncQueue.ts"),
      "utf8",
    );

    expect(replaySource).toContain("companionRuntime.runAroundAction");
    expect(replaySource).toContain("appendCompanionRuntimeTrace(runtimeResult)");
  });
});
