import assert from "node:assert/strict";
import { CleaningAdapter } from "../src/companion/adapters/CleaningAdapter";

const divider = "----------------------------------------";

async function run() {
  console.log("\nHELPING HAND CLEANING ADAPTER HARNESS");
  console.log(divider);

  const adapter = new CleaningAdapter();
  const actorContext = {
    userId: "staff-7",
    role: "staff",
    siteId: "site-2",
    shiftId: "shift-11",
    networkAvailable: true,
  };

  const result = await adapter.submit({
    actorContext,
    area: "Front Bar",
    checklistId: "TASK-204",
    completed: true,
    findings: [],
    executeExistingSave: async () => ({
      attempted: true,
      outcome: "succeeded",
      summary: "Cleaning completion save simulation completed.",
      sideEffects: ["cleaning-completion-recorded"],
    }),
  });

  const highRiskResult = await adapter.submit({
    actorContext,
    area: "Front Bar",
    checklistId: "TASK-205",
    completed: true,
    findings: ["Grease residue found on prep surface."],
    executeExistingSave: async () => ({
      attempted: true,
      outcome: "succeeded",
      summary: "Cleaning completion save simulation completed with finding.",
      sideEffects: ["follow-up-review-required"],
    }),
  });

  assert.equal(
    result.csaConformant,
    true,
    "Expected cleaning adapter run to be CSA conformant.",
  );

  assert.equal(
    result.contractViolations.length,
    0,
    "Expected cleaning adapter run to have zero contract violations.",
  );

  assert.equal(
    result.decisionSnapshot.risk,
    "Low",
    "Expected complete cleaning without findings to produce Low risk.",
  );

  assert.equal(
    highRiskResult.decisionSnapshot.risk,
    "High",
    "Expected cleaning with findings to produce High risk.",
  );

  assert.equal(
    highRiskResult.interactionRecord.action.sideEffects.includes("follow-up-review-required"),
    true,
    "Expected high-risk cleaning path to record follow-up-review-required side effect.",
  );

  assert.equal(
    result.operationalEvent.type,
    "Cleaning Completed",
    "Expected cleaning completion operational event type.",
  );

  assert.equal(
    result.interactionRecord.reviewOutcome,
    "Unreviewed",
    "Expected review outcome to default to Unreviewed.",
  );

  assert.equal(Boolean(result.interactionRecord.context), true, "Missing Context section");
  assert.equal(Boolean(result.interactionRecord.decision), true, "Missing Decision section");
  assert.equal(Boolean(result.interactionRecord.authority), true, "Missing Authority section");
  assert.equal(Boolean(result.interactionRecord.action), true, "Missing Action section");
  assert.equal(Boolean(result.interactionRecord.evidence), true, "Missing Evidence section");
  assert.equal(Boolean(result.interactionRecord.reflection), true, "Missing Reflection section");

  assert.equal(
    highRiskResult.csaConformant,
    true,
    "Expected high-risk cleaning adapter run to remain CSA conformant.",
  );

  assert.equal(
    highRiskResult.contractViolations.length,
    0,
    "Expected high-risk cleaning adapter run to have zero contract violations.",
  );

  console.log("Cleaning adapter harness passed.");
  console.log(
    `interactionIdLow=${result.interactionId} interactionIdHigh=${highRiskResult.interactionId} csaConformant=${result.csaConformant} violations=${result.contractViolations.length}`,
  );
  console.log(divider);
}

run().catch((error: unknown) => {
  console.error("Cleaning adapter harness failed.");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);
});
