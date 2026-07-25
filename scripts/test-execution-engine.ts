import assert from "node:assert/strict";
import type {
    Action,
    ActionDisposition,
    ActionState,
} from "../lib/action/Action";
import type {
    AuthorityAssessment,
    AuthorityBoundary,
} from "../lib/authority/Authority";
import type { ExecutionEvidence } from "../lib/execution/Execution";
import { ExecutionEngine } from "../lib/execution/ExecutionEngine";
import type { Judgement, JudgementResponseKind } from "../lib/judgement/Judgement";

const divider = "----------------------------------------";

function buildJudgement(
  kind: JudgementResponseKind = "act",
): Judgement {
  const now = "2026-07-25T09:15:30.123Z";

  return {
    understanding: {
      summary: "Execution test understanding",
      confidence: 0.9,
      uncertainty: [],
      createdAt: now,
      updatedAt: now,
    },
    candidates: [
      {
        kind,
        description: `Candidate ${kind}`,
      },
    ],
    selected: {
      kind,
      description: `Selected ${kind}`,
    },
    disposition: "proceed",
    reason: "Execution test judgement",
    confidence: 0.9,
    uncertainty: [],
    governingPrinciples: [
      {
        id: "people-first",
        name: "People First",
        aliases: ["human-first"],
        definition: "People come first.",
        status: "core-principle",
        evidenceLevel: "constitutional",
        scope: "helping-hand",
        owner: "Helping Hand Constitution",
        inheritsTo: ["all"],
        relatedConceptIds: ["understanding"],
        sources: [
          {
            documentPath: "constitution/00-PREAMBLE.md",
          },
        ],
        examples: [
          {
            description: "Protect people before process.",
          },
        ],
        createdAt: now,
        updatedAt: now,
        createdBy: "test-suite",
      },
    ],
    requiresHuman: false,
    createdAt: now,
    updatedAt: now,
  };
}

function buildAuthority(
  boundaries: AuthorityBoundary[] = [
    {
      scope: "action-scope",
      description: "Remain in authorised scope.",
    },
  ],
): AuthorityAssessment {
  const now = "2026-07-25T09:15:30.123Z";

  return {
    context: {
      actorId: "actor-001",
      authorityProfile: "responsible",
      action: "approve-release",
      riskLevel: "medium",
    },
    decision: "allow",
    level: "standard",
    authorityScore: 0.7,
    reason: "Execution test authority",
    boundaries: boundaries.map((boundary) => ({
      ...boundary,
    })),
    requiresHuman: false,
    createdAt: now,
    updatedAt: now,
  };
}

function buildAction(
  options: {
    id?: string;
    kind?: JudgementResponseKind;
    disposition?: ActionDisposition;
    state?: ActionState;
    boundaries?: AuthorityBoundary[];
    requiresHuman?: boolean;
  } = {},
): Action {
  const now = "2026-07-25T09:15:30.123Z";
  const kind = options.kind ?? "act";
  const boundaries =
    options.boundaries ??
    [
      {
        scope: "action-scope",
        description: "Remain in authorised scope.",
      },
    ];

  return {
    id: options.id ?? "action-001",
    judgement: buildJudgement(kind),
    authority: {
      ...buildAuthority(boundaries),
      requiresHuman: options.requiresHuman ?? false,
    },
    kind,
    state: options.state ?? "ready",
    disposition: options.disposition ?? "execute",
    instruction: "Proceed with action.",
    reason: "Execution test action.",
    boundaries: boundaries.map((boundary) => ({
      ...boundary,
    })),
    requiresHuman: options.requiresHuman ?? false,
    uncertainty: [],
    confidence: 0.9,
    createdAt: now,
    updatedAt: now,
  };
}

function main(): void {
  const engine = new ExecutionEngine();

  console.log("\nHELPING HAND EXECUTION ENGINE TEST");
  console.log(divider);

  const case1Now = "2026-07-25T12:00:00.000Z";
  const case1Evidence: ExecutionEvidence[] = [
    {
      type: "event",
      detail: "Execution succeeded.",
      at: case1Now,
    },
  ];

  const readyExecuteAction = buildAction({
    id: "action-ready-execute",
    disposition: "execute",
    state: "ready",
    kind: "act",
  });

  const case1 = engine.build({
    action: readyExecuteAction,
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    evidence: case1Evidence,
    now: case1Now,
  });

  assert.equal(case1.permitted, true);
  assert.equal(case1.attempted, true);
  assert.equal(case1.outcome, "succeeded");
  assert.equal(case1.effect, "external");
  assert.ok(case1.attemptedAt);
  assert.ok(case1.completedAt);
  assert.equal(case1.createdAt, case1Now);
  assert.equal(case1.updatedAt, case1Now);

  const sourceBoundary: AuthorityBoundary = {
    scope: "caution",
    description: "Proceed with additional safeguards.",
  };

  const cautionAction = buildAction({
    id: "action-ready-caution",
    disposition: "execute-with-caution",
    state: "ready",
    kind: "advise",
    boundaries: [sourceBoundary],
  });

  const case2Now = "2026-07-25T12:01:00.000Z";
  const case2 = engine.build({
    action: cautionAction,
    attempted: true,
    outcome: "succeeded",
    effect: "internal",
    now: case2Now,
  });

  assert.equal(case2.permitted, true);
  assert.equal(case2.attempted, true);
  assert.equal(case2.outcome, "succeeded");
  assert.equal(case2.effect, "internal");
  assert.notEqual(case2.action.boundaries, cautionAction.boundaries);
  assert.notEqual(
    case2.action.boundaries[0],
    cautionAction.boundaries[0],
  );
  assert.equal(case2.action.boundaries[0].scope, "caution");

  sourceBoundary.scope = "mutated-source-boundary";
  assert.equal(
    case2.action.boundaries[0].scope,
    "caution",
    "Execution snapshot boundaries must not change after source mutation.",
  );

  const plannedAction = buildAction({
    id: "action-planned",
    disposition: "execute",
    state: "planned",
    kind: "wait",
  });

  const case3 = engine.build({
    action: plannedAction,
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    now: "2026-07-25T12:02:00.000Z",
  });

  assert.equal(case3.permitted, false);
  assert.equal(case3.attempted, false);
  assert.equal(case3.outcome, "not-attempted");
  assert.equal(case3.effect, "none");
  assert.equal(case3.attemptedAt, undefined);
  assert.equal(case3.completedAt, undefined);

  const blockedAwaitHumanAction = buildAction({
    id: "action-await-human",
    disposition: "await-human",
    state: "blocked",
    kind: "escalate",
    requiresHuman: true,
  });

  const case4 = engine.build({
    action: blockedAwaitHumanAction,
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    now: "2026-07-25T12:03:00.000Z",
  });

  assert.equal(case4.permitted, false);
  assert.equal(case4.attempted, false);
  assert.equal(case4.outcome, "not-attempted");

  const blockedDoNotExecuteAction = buildAction({
    id: "action-denied",
    disposition: "do-not-execute",
    state: "blocked",
    kind: "act",
    requiresHuman: true,
  });

  const case5 = engine.build({
    action: blockedDoNotExecuteAction,
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    now: "2026-07-25T12:04:00.000Z",
  });

  assert.equal(case5.permitted, false);
  assert.equal(case5.attempted, false);
  assert.equal(case5.outcome, "not-attempted");

  const case6Now = "2026-07-25T12:05:00.000Z";
  const case6 = engine.build({
    action: buildAction({
      id: "action-failed",
      disposition: "execute",
      state: "ready",
      kind: "act",
    }),
    attempted: true,
    outcome: "failed",
    effect: "internal",
    error: "Network timeout",
    now: case6Now,
  });

  assert.equal(case6.outcome, "failed");
  assert.equal(case6.attempted, true);
  assert.equal(case6.error, "Network timeout");
  assert.ok(case6.completedAt);
  assert.equal(case6.completedAt, case6Now);

  const case7Now = "2026-07-25T12:06:00.000Z";
  const case7 = engine.build({
    action: buildAction({
      id: "action-cancelled",
      disposition: "execute",
      state: "ready",
      kind: "act",
    }),
    attempted: true,
    outcome: "cancelled",
    effect: "none",
    cancellationReason: "Human cancelled before commit.",
    now: case7Now,
  });

  assert.equal(
    case7.outcome,
    "cancelled",
    "Cancelled execution must have a cancelled terminal outcome.",
  );
  assert.equal(case7.attempted, true);
  assert.equal(
    case7.cancellationReason,
    "Human cancelled before commit.",
  );
  assert.ok(case7.completedAt);
  assert.equal(case7.completedAt, case7Now);

  const deterministicAction = buildAction({
    id: "action-deterministic",
    disposition: "execute",
    state: "ready",
    kind: "advise",
  });
  const deterministicNow = "2026-07-25T12:07:08.901Z";

  const deterministicA = engine.build({
    action: deterministicAction,
    attempted: true,
    outcome: "succeeded",
    now: deterministicNow,
  });

  const deterministicB = engine.build({
    action: deterministicAction,
    attempted: false,
    now: deterministicNow,
  });

  assert.equal(deterministicA.id, deterministicB.id);
  assert.equal(deterministicA.createdAt, deterministicNow);
  assert.equal(deterministicA.updatedAt, deterministicNow);
  assert.equal(deterministicB.createdAt, deterministicNow);
  assert.equal(deterministicB.updatedAt, deterministicNow);

  const evidenceNow = "2026-07-25T12:08:00.000Z";
  const sourceEvidence: ExecutionEvidence[] = [
    {
      type: "log",
      detail: "Initial execution log.",
      at: evidenceNow,
    },
  ];

  const evidenceRecord = engine.build({
    action: buildAction({
      id: "action-evidence",
      disposition: "execute",
      state: "ready",
      kind: "act",
    }),
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    evidence: sourceEvidence,
    now: evidenceNow,
  });

  assert.deepEqual(evidenceRecord.evidence, sourceEvidence);
  assert.notEqual(evidenceRecord.evidence, sourceEvidence);

  sourceEvidence[0].detail = "Mutated source evidence.";
  assert.equal(
    evidenceRecord.evidence[0].detail,
    "Initial execution log.",
    "Execution evidence should not change when source evidence mutates.",
  );

  evidenceRecord.evidence[0].detail = "Mutated output evidence.";
  assert.equal(
    sourceEvidence[0].detail,
    "Mutated source evidence.",
    "Source evidence should not change when execution output is mutated.",
  );

  const mutableAction = buildAction({
    id: "action-immutable-copy",
    disposition: "execute",
    state: "ready",
    kind: "act",
    boundaries: [
      {
        scope: "action-scope",
        description: "Original boundary",
      },
    ],
  });

  const immutableRecord = engine.build({
    action: mutableAction,
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    now: "2026-07-25T12:09:00.000Z",
  });

  assert.notEqual(immutableRecord.action, mutableAction);
  assert.notEqual(
    immutableRecord.action.boundaries,
    mutableAction.boundaries,
  );
  assert.notEqual(
    immutableRecord.action.boundaries[0],
    mutableAction.boundaries[0],
  );

  mutableAction.state = "blocked";
  mutableAction.boundaries[0].scope = "mutated-original-scope";

  assert.equal(immutableRecord.action.state, "ready");
  assert.equal(
    immutableRecord.action.boundaries[0].scope,
    "action-scope",
  );

  immutableRecord.action.boundaries[0].scope = "mutated-record-scope";
  assert.equal(
    mutableAction.boundaries[0].scope,
    "mutated-original-scope",
    "Original action boundary should not change when execution snapshot mutates.",
  );

  const forcedAttemptOnBlocked = engine.build({
    action: buildAction({
      id: "action-forced-blocked",
      disposition: "do-not-execute",
      state: "blocked",
      kind: "act",
    }),
    attempted: true,
    outcome: "failed",
    effect: "external",
    now: "2026-07-25T12:10:00.000Z",
  });

  assert.equal(forcedAttemptOnBlocked.permitted, false);
  assert.equal(forcedAttemptOnBlocked.attempted, false);
  assert.equal(forcedAttemptOnBlocked.outcome, "not-attempted");
  assert.equal(forcedAttemptOnBlocked.effect, "none");

  console.log(`\n${divider}`);
  console.log("All execution engine checks passed.");
}

main();
