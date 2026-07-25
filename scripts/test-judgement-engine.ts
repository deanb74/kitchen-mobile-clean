import assert from "node:assert/strict";
import { JudgementEngine } from "../lib/judgement";
import type { Understanding } from "../lib/understanding";

const divider = "────────────────────────────────────────";

function buildUnderstanding(
  overrides: Partial<Understanding> = {},
): Understanding {
  const now = new Date().toISOString();

  return {
    summary: "Test understanding",
    confidence: 0.9,
    uncertainty: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function main(): void {
  const engine = new JudgementEngine();

  console.log("\nHELPING HAND JUDGEMENT ENGINE TEST");
  console.log(divider);

  const proceed = engine.judge({
    understanding: buildUnderstanding({
      confidence: 0.92,
      uncertainty: [],
    }),
  });

  console.log("\nProceed case");
  console.log(`Disposition: ${proceed.disposition}`);
  console.log(`Selected: ${proceed.selected.kind}`);

  assert.equal(proceed.disposition, "proceed");
  assert.equal(proceed.selected.kind, "advise");
  assert.equal(proceed.requiresHuman, false);

  const caution = engine.judge({
    understanding: buildUnderstanding({
      confidence: 0.5,
      uncertainty: [],
    }),
  });

  console.log("\nCaution case");
  console.log(`Disposition: ${caution.disposition}`);
  console.log(`Selected: ${caution.selected.kind}`);

  assert.equal(caution.disposition, "caution");
  assert.equal(caution.selected.kind, "ask");
  assert.equal(caution.requiresHuman, false);

  const humanRequired = engine.judge({
    understanding: buildUnderstanding({
      confidence: 0.9,
      uncertainty: ["Possible safety risk requires intervention."],
    }),
  });

  console.log("\nHuman-required case");
  console.log(`Disposition: ${humanRequired.disposition}`);
  console.log(`Selected: ${humanRequired.selected.kind}`);

  assert.equal(humanRequired.disposition, "human-required");
  assert.equal(humanRequired.selected.kind, "escalate");
  assert.equal(humanRequired.requiresHuman, true);

  const insufficient = engine.judge({
    understanding: buildUnderstanding({
      confidence: 0.2,
      uncertainty: [],
    }),
  });

  console.log("\nInsufficient case");
  console.log(`Disposition: ${insufficient.disposition}`);
  console.log(`Selected: ${insufficient.selected.kind}`);

  assert.equal(insufficient.disposition, "insufficient");
  assert.equal(insufficient.selected.kind, "ask");
  assert.equal(insufficient.requiresHuman, true);

  const mutableUncertainty = [
    "Context is still incomplete.",
  ];

  const customCandidates = [
    {
      kind: "wait" as const,
      description: "Wait for more context.",
    },
    {
      kind: "ask" as const,
      description: "Ask one clarifying question.",
    },
  ];

  const copied = engine.judge({
    understanding: buildUnderstanding({
      confidence: 0.55,
      uncertainty: mutableUncertainty,
    }),
    candidates: customCandidates,
  });

  copied.uncertainty.push("New uncertainty item");
  copied.candidates.push({
    kind: "advise",
    description: "Added after judgement output",
  });

  assert.equal(
    mutableUncertainty.length,
    1,
    "Returned uncertainty should be a copy, not a shared array.",
  );

  assert.equal(
    customCandidates.length,
    2,
    "Returned candidates should be a copy, not a shared array.",
  );

  console.log(`\n${divider}`);
  console.log("All judgement engine checks passed.");
}

main();
