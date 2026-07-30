import assert from "node:assert/strict";
import { CorrectiveActionAdapter } from "../src/companion/adapters/CorrectiveActionAdapter";

const divider = "----------------------------------------";

async function run() {
  console.log("\nHELPING HAND CORRECTIVE ACTION ADAPTER HARNESS");
  console.log(divider);

  const adapter = new CorrectiveActionAdapter();
  const actorContext = {
    userId: "manager-42",
    role: "manager",
    siteId: "site-2",
    shiftId: "shift-11",
    networkAvailable: true,
  };

  const result = await adapter.submit({
    actorContext,
    actionType: "ComplianceCorrectiveAction",
    target: "task-urgent-12 user-8",
    details: "Transfer stock, isolate unit, call approved engineer.",
    priority: "urgent",
    executeExistingSave: async () => ({
      attempted: true,
      outcome: "succeeded",
      summary: "Corrective action save simulation completed.",
      sideEffects: [
        "manager-review-required",
        "follow-up-assignment-required",
      ],
    }),
  });

  assert.equal(
    result.csaConformant,
    true,
    "Expected corrective action adapter run to be CSA conformant.",
  );

  assert.equal(
    result.contractViolations.length,
    0,
    "Expected corrective action adapter run to have zero contract violations.",
  );

  assert.equal(
    result.decisionSnapshot.risk,
    "High",
    "Expected urgent corrective action to produce High risk.",
  );

  assert.equal(
    result.operationalEvent.type,
    "Corrective Action",
    "Expected corrective action operational event type.",
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

  console.log("Corrective action adapter harness passed.");
  console.log(
    `interactionId=${result.interactionId} csaConformant=${result.csaConformant} violations=${result.contractViolations.length}`,
  );
  console.log(divider);
}

run().catch((error: unknown) => {
  console.error("Corrective action adapter harness failed.");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);
});
