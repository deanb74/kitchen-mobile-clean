import assert from "node:assert/strict";
import type { Execution, ExecutionEvidence, ExecutionOutcome } from "../lib/execution/Execution";
import { ReflectionEngine } from "../lib/reflection/ReflectionEngine";

const divider = "----------------------------------------";

function buildExecution(
  overrides: Partial<Execution> = {},
): Execution {
  const now = "2026-07-25T09:15:30.123Z";

  return {
    id: "execution-001",
    action: {
      id: "action-001",
      kind: "act",
      disposition: "execute",
      state: "ready",
      instruction: "Proceed with action.",
      boundaries: [
        {
          scope: "action-scope",
          description: "Remain within authorised scope.",
        },
      ],
    },
    permitted: true,
    attempted: true,
    outcome: "succeeded",
    summary: "Execution completed successfully.",
    effect: "external",
    evidence: [
      {
        type: "event",
        detail: "Execution completed successfully.",
        at: now,
      },
    ],
    attemptedAt: now,
    completedAt: now,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function hasFinding(
  execution: ReturnType<ReflectionEngine["reflect"]>,
  category: string,
  severity?: string,
): boolean {
  return execution.findings.some((finding) => {
    if (finding.category !== category) {
      return false;
    }

    return severity ? finding.severity === severity : true;
  });
}

function isTerminalOutcome(outcome: ExecutionOutcome): boolean {
  return (
    outcome === "succeeded" ||
    outcome === "failed" ||
    outcome === "cancelled"
  );
}

function main(): void {
  const engine = new ReflectionEngine();

  console.log("\nHELPING HAND REFLECTION ENGINE TEST");
  console.log(divider);

  const case1Now = "2026-07-25T12:00:00.000Z";
  const case1 = engine.reflect({
    execution: buildExecution({
      id: "execution-success",
      summary: "Execution completed successfully with validated evidence.",
      evidence: [
        {
          type: "event",
          detail: "Validated completion event.",
          at: case1Now,
        },
      ],
      effect: "external",
      outcome: "succeeded",
    }),
    now: case1Now,
  });

  assert.equal(case1.disposition, "affirm");
  assert.equal(case1.requiresHuman, false);
  assert.ok(case1.confidence >= 0.65);
  assert.equal(hasFinding(case1, "quality"), false);
  assert.equal(hasFinding(case1, "governance"), false);
  assert.equal(case1.createdAt, case1Now);
  assert.equal(case1.updatedAt, case1Now);

  const case2Now = "2026-07-25T12:01:00.000Z";
  const case2Completed = "2026-07-25T12:01:05.000Z";
  const case2 = engine.reflect({
    execution: buildExecution({
      id: "execution-failed",
      outcome: "failed",
      summary: "Execution failed during commit.",
      error: "Network timeout during commit",
      completedAt: case2Completed,
      evidence: [
        {
          type: "log",
          detail: "Execution failed after retry exhaustion.",
          at: case2Now,
        },
      ],
      effect: "internal",
    }),
    now: case2Now,
  });

  assert.equal(case2.disposition, "adjust");
  assert.equal(hasFinding(case2, "quality"), true);
  assert.ok(
    case2.findings.some((finding) =>
      finding.detail.includes("Network timeout during commit"),
    ),
  );
  assert.equal(case2.context.executionCompletedAt, case2Completed);

  const case3Now = "2026-07-25T12:02:00.000Z";
  const case3 = engine.reflect({
    execution: buildExecution({
      id: "execution-cancelled-with-evidence",
      outcome: "cancelled",
      summary: "Execution cancelled by authorised human decision.",
      cancellationReason: "Human cancelled after context shift.",
      evidence: [
        {
          type: "note",
          detail: "Cancellation confirmed by manager.",
          at: case3Now,
        },
      ],
      effect: "none",
    }),
    now: case3Now,
  });

  assert.equal(case3.disposition, "adjust");
  assert.equal(hasFinding(case3, "communication"), true);
  assert.ok(
    case3.findings.some((finding) =>
      finding.detail.includes("Human cancelled after context shift."),
    ),
  );

  const case4Now = "2026-07-25T12:03:00.000Z";
  const case4 = engine.reflect({
    execution: buildExecution({
      id: "execution-cancelled-without-evidence",
      outcome: "cancelled",
      summary: "Execution cancelled.",
      cancellationReason: undefined,
      evidence: [],
      effect: "none",
    }),
    now: case4Now,
  });

  assert.equal(case4.disposition, "defer");
  assert.ok(
    case4.uncertainty.some((item) =>
      item.includes("Cancellation reason is missing"),
    ),
  );
  assert.ok(case4.confidence < case3.confidence);

  const case5Now = "2026-07-25T12:04:00.000Z";
  const case5 = engine.reflect({
    execution: buildExecution({
      id: "execution-governance-blocked",
      permitted: false,
      attempted: false,
      outcome: "not-attempted",
      summary: "Action was blocked by governance before attempt.",
      effect: "none",
      evidence: [
        {
          type: "event",
          detail: "Governance denied execution path.",
          at: case5Now,
        },
      ],
      attemptedAt: undefined,
      completedAt: undefined,
      action: {
        id: "action-governance-blocked",
        kind: "act",
        disposition: "do-not-execute",
        state: "blocked",
        instruction: "Do not execute.",
        boundaries: [
          {
            scope: "denial",
            description: "Execution is prohibited.",
          },
        ],
      },
    }),
    now: case5Now,
  });

  assert.equal(case5.disposition, "defer");
  assert.equal(hasFinding(case5, "governance", "low"), true);
  assert.equal(hasFinding(case5, "quality"), false);
  assert.equal(case5.summary.includes("failed"), false);

  const case6Now = "2026-07-25T12:05:00.000Z";
  const case6 = engine.reflect({
    execution: buildExecution({
      id: "execution-permitted-not-attempted",
      permitted: true,
      attempted: false,
      outcome: "not-attempted",
      summary: "Permitted action was not attempted in this cycle.",
      effect: "none",
      evidence: [
        {
          type: "note",
          detail: "Waiting for explicit trigger.",
          at: case6Now,
        },
      ],
      attemptedAt: undefined,
      completedAt: undefined,
    }),
    now: case6Now,
  });

  assert.ok(
    case6.uncertainty.some((item) =>
      item.includes("Permitted action was not attempted"),
    ),
  );
  assert.equal(case6.disposition, "defer");

  const case7Now = "2026-07-25T12:06:00.000Z";
  const case7 = engine.reflect({
    execution: buildExecution({
      id: "execution-critical-safety",
      outcome: "succeeded",
      summary: "Safety-critical condition detected during execution.",
      evidence: [
        {
          type: "event",
          detail: "Emergency mitigation prevented harm.",
          at: case7Now,
        },
      ],
      effect: "external",
    }),
    now: case7Now,
  });

  assert.equal(case7.disposition, "escalate");
  assert.equal(case7.requiresHuman, true);
  assert.equal(hasFinding(case7, "safety", "critical"), true);

  const case8Now = "2026-07-25T12:07:00.000Z";
  const case8 = engine.reflect({
    execution: buildExecution({
      id: "execution-governance-high",
      outcome: "succeeded",
      summary: "Potential policy breach detected during run.",
      evidence: [
        {
          type: "event",
          detail: "Possible governance breach with compliance breach risk.",
          at: case8Now,
        },
      ],
      effect: "internal",
    }),
    now: case8Now,
  });

  assert.equal(case8.disposition, "escalate");
  assert.equal(case8.requiresHuman, true);
  assert.equal(hasFinding(case8, "governance", "high"), true);

  const case9Now = "2026-07-25T12:08:00.000Z";
  const case9 = engine.reflect({
    execution: buildExecution({
      id: "execution-missing-completed",
      attempted: true,
      outcome: "failed",
      error: "Write rejected",
      completedAt: undefined,
      evidence: [
        {
          type: "log",
          detail: "Attempt failed with recorded error.",
          at: case9Now,
        },
      ],
    }),
    now: case9Now,
  });

  assert.equal(hasFinding(case9, "timing", "high"), true);
  assert.ok(
    case9.uncertainty.some((item) =>
      item.includes("Timing evidence is incomplete"),
    ),
  );

  const deterministicExecution = buildExecution({
    id: "execution-deterministic",
    summary: "Deterministic reflection id check.",
  });
  const deterministicNow = "2026-07-25T12:09:10.111Z";

  const deterministicA = engine.reflect({
    execution: deterministicExecution,
    now: deterministicNow,
  });
  const deterministicB = engine.reflect({
    execution: deterministicExecution,
    now: deterministicNow,
  });

  assert.equal(deterministicA.id, deterministicB.id);
  assert.equal(deterministicA.createdAt, deterministicNow);
  assert.equal(deterministicA.updatedAt, deterministicNow);
  assert.equal(deterministicB.createdAt, deterministicNow);
  assert.equal(deterministicB.updatedAt, deterministicNow);

  const mutableEvidence: ExecutionEvidence[] = [
    {
      type: "note",
      detail: "Original evidence detail.",
      at: "2026-07-25T12:10:00.000Z",
    },
  ];

  const mutableExecution = buildExecution({
    id: "execution-mutable-source",
    evidence: mutableEvidence,
    action: {
      id: "action-mutable-source",
      kind: "act",
      disposition: "execute",
      state: "ready",
      instruction: "Proceed.",
      boundaries: [
        {
          scope: "action-scope",
          description: "Mutable source boundary.",
        },
      ],
    },
  });

  const mutableReflection = engine.reflect({
    execution: mutableExecution,
    now: "2026-07-25T12:10:00.000Z",
  });

  assert.notEqual(mutableReflection.context, mutableExecution);
  assert.notEqual(
    mutableReflection.evidence,
    mutableExecution.evidence,
  );

  mutableExecution.action.state = "blocked";
  mutableExecution.action.boundaries[0].scope = "mutated-source-boundary";
  mutableExecution.evidence[0].detail = "Mutated source evidence.";
  mutableExecution.createdAt = "2027-01-01T00:00:00.000Z";

  assert.equal(mutableReflection.context.actionState, "ready");
  assert.equal(
    mutableReflection.evidence[0].detail,
    "Original evidence detail.",
  );
  assert.equal(
    mutableReflection.context.executionCreatedAt,
    "2026-07-25T09:15:30.123Z",
  );

  mutableReflection.evidence[0].detail = "Mutated reflection evidence.";
  assert.equal(
    mutableExecution.evidence[0].detail,
    "Mutated source evidence.",
  );

  const pharmacyCase = engine.reflect({
    execution: buildExecution({
      id: "execution-pharmacy",
      summary: "Medication prepared in the pharmacy.",
      evidence: [
        {
          type: "note",
          detail: "Pharmacy stock was reconciled.",
          at: "2026-07-25T12:11:00.000Z",
        },
      ],
      outcome: "succeeded",
      effect: "internal",
    }),
    now: "2026-07-25T12:11:00.000Z",
  });

  assert.equal(hasFinding(pharmacyCase, "safety", "critical"), false);

  const allReflections = [
    case1,
    case2,
    case3,
    case4,
    case5,
    case6,
    case7,
    case8,
    case9,
    deterministicA,
    deterministicB,
    mutableReflection,
    pharmacyCase,
  ];

  for (const reflection of allReflections) {
    assert.ok(reflection.confidence >= 0);
    assert.ok(reflection.confidence <= 1);
    assert.ok(
      reflection.recommendations.some((recommendation) =>
        recommendation.includes(
          "must not directly create or alter knowledge",
        ),
      ),
    );

    if (reflection.disposition === "escalate") {
      assert.equal(reflection.requiresHuman, true);
    }
  }

  assert.equal(
    case1.disposition,
    "affirm",
  );
  assert.equal(
    case1.requiresHuman,
    false,
    "Evidence-rich affirm case should not require human review.",
  );

  assert.equal(isTerminalOutcome(case2.context.executionOutcome), true);
  assert.equal(isTerminalOutcome(case3.context.executionOutcome), true);

  console.log(`\n${divider}`);
  console.log("All reflection engine checks passed.");
}

main();
