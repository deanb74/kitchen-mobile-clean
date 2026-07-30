import assert from "node:assert/strict";
import { CleaningAdapter } from "../src/companion/adapters/CleaningAdapter";
import { ClosingChecksAdapter } from "../src/companion/adapters/ClosingChecksAdapter";
import { CorrectiveActionAdapter } from "../src/companion/adapters/CorrectiveActionAdapter";
import { EquipmentFaultAdapter } from "../src/companion/adapters/EquipmentFaultAdapter";
import { OpeningChecksAdapter } from "../src/companion/adapters/OpeningChecksAdapter";

const divider = "----------------------------------------";

async function run() {
  console.log("\nHELPING HAND RUNTIME EXPANSION HARNESS");
  console.log(divider);

  const actorContext = {
    userId: "manager-42",
    role: "manager",
    siteId: "site-2",
    shiftId: "shift-11",
    networkAvailable: true,
  };

  const executeExistingSave = async () => ({
    attempted: true,
    outcome: "succeeded" as const,
    summary: "Existing save action completed successfully.",
    sideEffects: ["existing-save"],
  });

  const equipmentFault = await new EquipmentFaultAdapter().submit({
    actorContext,
    equipmentId: "Fridge 3",
    faultDescription: "Compressor noise and unstable temperature.",
    severity: "high",
    executeExistingSave,
  });

  const correctiveAction = await new CorrectiveActionAdapter().submit({
    actorContext,
    actionType: "TemperatureEscalation",
    target: "Fridge 3",
    details: "Transfer stock and call maintenance.",
    priority: "urgent",
    executeExistingSave,
  });

  const cleaning = await new CleaningAdapter().submit({
    actorContext,
    area: "Prep Station A",
    checklistId: "CLEAN-OPEN-01",
    completed: true,
    findings: [],
    executeExistingSave,
  });

  const openingChecks = await new OpeningChecksAdapter().submit({
    actorContext,
    checklistId: "OPEN-DAILY-01",
    completed: true,
    startedAt: "2026-07-27T08:00:00.000Z",
    completedAt: "2026-07-27T08:12:00.000Z",
    executeExistingSave,
  });

  const closingChecks = await new ClosingChecksAdapter().submit({
    actorContext,
    checklistId: "CLOSE-DAILY-01",
    completed: true,
    unresolvedItems: [],
    executeExistingSave,
  });

  const results = [
    ["EquipmentFaultAdapter", equipmentFault],
    ["CorrectiveActionAdapter", correctiveAction],
    ["CleaningAdapter", cleaning],
    ["OpeningChecksAdapter", openingChecks],
    ["ClosingChecksAdapter", closingChecks],
  ] as const;

  for (const [name, result] of results) {
    assert.equal(
      result.csaConformant,
      true,
      `${name} expected csaConformant=true`,
    );

    assert.equal(
      result.contractViolations.length,
      0,
      `${name} expected contractViolations=[]`,
    );

    const ir = result.interactionRecord;

    assert.equal(Boolean(ir.context), true, `${name} missing Context section`);
    assert.equal(Boolean(ir.decision), true, `${name} missing Decision section`);
    assert.equal(Boolean(ir.authority), true, `${name} missing Authority section`);
    assert.equal(Boolean(ir.action), true, `${name} missing Action section`);
    assert.equal(Boolean(ir.evidence), true, `${name} missing Evidence section`);
    assert.equal(Boolean(ir.reflection), true, `${name} missing Reflection section`);
    assert.equal(
      ir.reviewOutcome,
      "Unreviewed",
      `${name} expected Review Outcome to default to Unreviewed`,
    );
  }

  console.log("Runtime expansion harness passed.");
  console.log(`Adapters validated: ${results.length}`);
  console.log(divider);
}

run().catch((error: unknown) => {
  console.error("Runtime expansion harness failed.");
  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }
  process.exit(1);
});
