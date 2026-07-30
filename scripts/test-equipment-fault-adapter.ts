import assert from "node:assert/strict";
import { EquipmentFaultAdapter } from "../src/companion/adapters/EquipmentFaultAdapter";

const divider = "----------------------------------------";

async function run() {
  console.log("\nHELPING HAND EQUIPMENT FAULT ADAPTER HARNESS");
  console.log(divider);

  const adapter = new EquipmentFaultAdapter();
  const actorContext = {
    userId: "manager-42",
    role: "manager",
    siteId: "site-2",
    shiftId: "shift-11",
    networkAvailable: true,
  };

  const result = await adapter.submit({
    actorContext,
    equipmentId: "Fridge 3",
    faultDescription: "Compressor noise and unstable temperature.",
    severity: "high",
    executeExistingSave: async () => ({
      attempted: true,
      outcome: "succeeded",
      summary: "Equipment fault save simulation completed.",
      sideEffects: [
        "equipment-marked-out-of-service",
        "manager-notification-required",
        "follow-up-assignment-required",
      ],
    }),
  });

  assert.equal(
    result.csaConformant,
    true,
    "Expected equipment fault adapter run to be CSA conformant.",
  );

  assert.equal(
    result.contractViolations.length,
    0,
    "Expected equipment fault adapter run to have zero contract violations.",
  );

  assert.equal(
    result.decisionSnapshot.risk,
    "High",
    "Expected high severity fault to produce High risk.",
  );

  assert.equal(
    result.operationalEvent.type,
    "Equipment Fault Reported",
    "Expected equipment fault operational event type.",
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

  console.log("Equipment fault adapter harness passed.");
  console.log(
    `interactionId=${result.interactionId} csaConformant=${result.csaConformant} violations=${result.contractViolations.length}`,
  );
  console.log(divider);
}

run().catch((error: unknown) => {
  console.error("Equipment fault adapter harness failed.");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);
});
