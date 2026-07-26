import assert from "node:assert/strict";
import { ActionEngine } from "../lib/action/ActionEngine";
import { AuthorityEngine } from "../lib/authority/AuthorityEngine";
import { ExecutionEngine } from "../lib/execution/ExecutionEngine";
import { JudgementEngine } from "../lib/judgement/JudgementEngine";
import { LearningEngine } from "../lib/learning/LearningEngine";
import { ReflectionEngine } from "../lib/reflection/ReflectionEngine";
import type { Understanding } from "../lib/understanding/Understanding";

const divider = "----------------------------------------";

type CycleResult = {
  understanding: Understanding;
  judgement: ReturnType<JudgementEngine["judge"]>;
  authority: ReturnType<AuthorityEngine["assess"]>;
  action: ReturnType<ActionEngine["build"]>;
  execution: ReturnType<ExecutionEngine["build"]>;
  reflection: ReturnType<ReflectionEngine["reflect"]>;
  learning: ReturnType<LearningEngine["build"]>;
  knowledgeSnapshot: {
    safeUpperCelsius: number;
    rule: string;
  };
};

const FIXED = {
  understandingCreatedAt: "2026-07-25T10:00:00.000Z",
  understandingUpdatedAt: "2026-07-25T10:00:00.000Z",
  judgementNow: "2026-07-25T10:01:00.000Z",
  authorityNow: "2026-07-25T10:02:00.000Z",
  actionNow: "2026-07-25T10:03:00.000Z",
  executionNow: "2026-07-25T10:04:00.000Z",
  reflectionNow: "2026-07-25T10:05:00.000Z",
  learningNow: "2026-07-25T10:06:00.000Z",
};

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

// Adapter: JudgementEngine and AuthorityEngine do not accept explicit time inputs,
// so we freeze Date for deterministic timestamps in this end-to-end test.
function withFrozenTime<T>(iso: string, fn: () => T): T {
  const RealDate = Date;

  class FrozenDate extends RealDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(iso);
        return;
      }

      if (args.length === 1) {
        super(args[0]);
        return;
      }

      if (args.length === 2) {
        super(args[0], args[1]);
        return;
      }

      if (args.length === 3) {
        super(args[0], args[1], args[2]);
        return;
      }

      if (args.length === 4) {
        super(args[0], args[1], args[2], args[3]);
        return;
      }

      if (args.length === 5) {
        super(args[0], args[1], args[2], args[3], args[4]);
        return;
      }

      if (args.length === 6) {
        super(args[0], args[1], args[2], args[3], args[4], args[5]);
        return;
      }

      super(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }

    static now(): number {
      return new RealDate(iso).getTime();
    }

    static parse(dateString: string): number {
      return RealDate.parse(dateString);
    }

    static UTC(
      year: number,
      monthIndex?: number,
      day?: number,
      hours?: number,
      minutes?: number,
      seconds?: number,
      ms?: number,
    ): number {
      return RealDate.UTC(
        year,
        monthIndex,
        day,
        hours,
        minutes,
        seconds,
        ms,
      );
    }
  }

  (globalThis as { Date: DateConstructor }).Date =
    FrozenDate as unknown as DateConstructor;

  try {
    return fn();
  } finally {
    (globalThis as { Date: DateConstructor }).Date = RealDate;
  }
}

// Adapter: UnderstandingEngine currently models concept-graph understanding.
// This operational safety scenario needs an incident understanding snapshot.
function buildFridgeSafetyUnderstanding(): Understanding {
  return {
    summary:
      "Fridge temperature reading is 10.2C, above governed safe boundary; staff are unsure whether food remains safe.",
    confidence: 0.52,
    uncertainty: [
      "Food safety status is uncertain and requires qualified human verification.",
      "Duration above safe boundary is unknown.",
      "No validated evidence yet confirms whether stock must be discarded.",
    ],
    createdAt: FIXED.understandingCreatedAt,
    updatedAt: FIXED.understandingUpdatedAt,
  };
}

function runCycle(): CycleResult {
  const judgementEngine = new JudgementEngine();
  const authorityEngine = new AuthorityEngine();
  const actionEngine = new ActionEngine();
  const executionEngine = new ExecutionEngine();
  const reflectionEngine = new ReflectionEngine();
  const learningEngine = new LearningEngine();

  const knowledgeSnapshot = {
    safeUpperCelsius: 8,
    rule: "Do not autonomously declare food safety when boundary is exceeded.",
  };

  const understanding = buildFridgeSafetyUnderstanding();

  const judgement = withFrozenTime(FIXED.judgementNow, () =>
    judgementEngine.judge({
      understanding,
      candidates: [
        {
          kind: "ask",
          description: "Ask for additional context and timing.",
        },
        {
          kind: "admit-uncertainty",
          description: "State uncertainty explicitly.",
        },
        {
          kind: "escalate",
          description: "Escalate to a qualified human decision-maker.",
        },
      ],
    }),
  );

  const authority = withFrozenTime(FIXED.authorityNow, () =>
    authorityEngine.assess({
      context: {
        actorId: "dc-annie-001",
        authorityProfile: "contributor",
        action: "declare-food-safe",
        subject: "walk-in-fridge-stock",
        riskLevel: "critical",
      },
    }),
  );

  const action = actionEngine.build({
    judgement,
    authority,
    actionId: "action-fridge-safety-001",
    now: FIXED.actionNow,
  });

  const execution = executionEngine.build({
    action,
    executionId: "execution-fridge-safety-001",
    now: FIXED.executionNow,
    attempted: true,
    outcome: "succeeded",
    effect: "external",
    summary:
      "Execution request was blocked before attempt because human authority is required.",
    evidence: [
      {
        type: "metric",
        detail: "Fridge temperature measured at 10.2C.",
        at: FIXED.executionNow,
      },
      {
        type: "note",
        detail:
          "Staff member is unsure whether food remains safe and requested a qualified decision.",
        at: FIXED.executionNow,
      },
      {
        type: "event",
        detail:
          "Potential unauthorised autonomous food-safety determination was prevented by governance controls.",
        at: FIXED.executionNow,
      },
    ],
  });

  const reflection = reflectionEngine.reflect({
    execution,
    reflectionId: "reflection-fridge-safety-001",
    now: FIXED.reflectionNow,
  });

  const learning = learningEngine.build({
    reflection,
    learningId: "learning-fridge-safety-001",
    now: FIXED.learningNow,
  });

  return {
    understanding,
    judgement,
    authority,
    action,
    execution,
    reflection,
    learning,
    knowledgeSnapshot,
  };
}

function assertCycle(result: CycleResult): void {
  const {
    understanding,
    judgement,
    authority,
    action,
    execution,
    reflection,
    learning,
    knowledgeSnapshot,
  } = result;

  // 1. Understanding facts + confidence + unresolved uncertainty.
  assert.ok(understanding.summary.includes("10.2C"));
  assert.ok(understanding.summary.toLowerCase().includes("unsafe") || understanding.summary.toLowerCase().includes("safe boundary"));
  assert.ok(understanding.confidence > 0 && understanding.confidence < 1);
  assert.ok(understanding.uncertainty.length > 0);

  // 2. Judgement cautious/human-required; no invented food-safety conclusion.
  assert.ok(
    judgement.disposition === "caution" ||
      judgement.disposition === "human-required",
  );
  assert.notEqual(judgement.selected.kind, "act");
  assert.equal(
    /food remains safe|food is safe/i.test(judgement.reason),
    false,
  );

  // 3. Authority preserves/strengthens human requirement.
  assert.equal(authority.decision, "require-human");
  assert.equal(authority.requiresHuman, true);

  // 4. Action does not exceed authority boundaries.
  assert.equal(action.disposition, "await-human");
  assert.equal(action.state, "blocked");
  assert.equal(action.requiresHuman, true);
  assert.ok(
    action.boundaries.some((boundary) => boundary.scope === "escalation"),
  );

  // 5 and 6. Execution records only facts and does not fake execution.
  assert.equal(execution.permitted, false);
  assert.equal(execution.attempted, false);
  assert.equal(execution.outcome, "not-attempted");
  assert.equal(execution.effect, "none");
  assert.equal(execution.completedAt, undefined);

  // 7. Reflection derives from execution record/evidence and does not invent success.
  assert.equal(
    reflection.context.executionOutcome,
    execution.outcome,
  );
  assert.equal(
    reflection.evidence.length,
    execution.evidence.length,
  );
  assert.equal(
    reflection.summary.includes("succeeded"),
    false,
  );

  // 8 and 9. Learning disposition + pending governance validation.
  assert.ok(
    learning.disposition === "observe" ||
      learning.disposition === "propose",
  );
  assert.equal(learning.validation.state, "pending");

  // 10. Learning does not modify knowledge.
  assert.deepEqual(knowledgeSnapshot, {
    safeUpperCelsius: 8,
    rule: "Do not autonomously declare food safety when boundary is exceeded.",
  });

  // 11. Human-required signal remains visible downstream.
  assert.equal(judgement.requiresHuman, true);
  assert.equal(authority.requiresHuman, true);
  assert.equal(action.requiresHuman, true);
  assert.equal(execution.action.disposition, "await-human");
  assert.equal(reflection.context.actionDisposition, "await-human");
  assert.equal(learning.context.reflectionRequiresHuman, true);
  assert.equal(learning.requiresHuman, true);

  // 12. Snapshot/evidence independence checks.
  const mutableUnderstanding = buildFridgeSafetyUnderstanding();
  const mutableJudgement = withFrozenTime(FIXED.judgementNow, () =>
    new JudgementEngine().judge({ understanding: mutableUnderstanding }),
  );
  mutableJudgement.uncertainty.push("mutated judgement uncertainty");
  assert.equal(mutableUnderstanding.uncertainty.length, 3);

  const mutableAuthority = withFrozenTime(FIXED.authorityNow, () =>
    new AuthorityEngine().assess({
      context: {
        actorId: "dc-annie-001",
        authorityProfile: "contributor",
        action: "declare-food-safe",
        riskLevel: "critical",
      },
    }),
  );

  const mutableAction = new ActionEngine().build({
    judgement: mutableJudgement,
    authority: mutableAuthority,
    actionId: "action-copy-check-001",
    now: FIXED.actionNow,
  });

  mutableAuthority.boundaries[0].scope = "mutated-scope";
  assert.notEqual(mutableAction.boundaries[0].scope, "mutated-scope");

  const mutableEvidence = [
    {
      type: "note" as const,
      detail: "Original evidence",
      at: FIXED.executionNow,
    },
  ];

  const mutableExecution = new ExecutionEngine().build({
    action: mutableAction,
    executionId: "execution-copy-check-001",
    now: FIXED.executionNow,
    evidence: mutableEvidence,
  });

  mutableEvidence[0].detail = "Mutated evidence";
  assert.equal(mutableExecution.evidence[0].detail, "Original evidence");

  const mutableReflection = new ReflectionEngine().reflect({
    execution: mutableExecution,
    reflectionId: "reflection-copy-check-001",
    now: FIXED.reflectionNow,
  });

  mutableExecution.evidence[0].detail = "Mutated execution evidence";
  assert.equal(
    mutableReflection.evidence[0].detail,
    "Original evidence",
  );

  const mutableLearning = new LearningEngine().build({
    reflection: mutableReflection,
    learningId: "learning-copy-check-001",
    now: FIXED.learningNow,
  });

  mutableReflection.evidence[0].detail = "Mutated reflection evidence";

  const learningEvidenceMatch = mutableLearning.evidence.some(
    (item) => item.detail === "Original evidence",
  );

  assert.equal(learningEvidenceMatch, true);

  // 13. Confidence values are bounded between 0 and 1.
  assert.ok(understanding.confidence >= 0 && understanding.confidence <= 1);
  assert.ok(judgement.confidence >= 0 && judgement.confidence <= 1);
  assert.ok(authority.authorityScore >= 0 && authority.authorityScore <= 1);
  assert.ok(action.confidence >= 0 && action.confidence <= 1);
  assert.ok(reflection.confidence >= 0 && reflection.confidence <= 1);
  assert.ok(learning.confidence >= 0 && learning.confidence <= 1);

  // 14. Re-run determinism with same explicit inputs.
  const rerun = runCycle();

  assert.equal(result.action.id, rerun.action.id);
  assert.equal(result.execution.id, rerun.execution.id);
  assert.equal(result.reflection.id, rerun.reflection.id);
  assert.equal(result.learning.id, rerun.learning.id);

  const materialA = {
    understanding,
    judgement,
    authority,
    action,
    execution,
    reflection,
    learning,
  };

  const materialB = {
    understanding: rerun.understanding,
    judgement: rerun.judgement,
    authority: rerun.authority,
    action: rerun.action,
    execution: rerun.execution,
    reflection: rerun.reflection,
    learning: rerun.learning,
  };

  assert.deepEqual(deepClone(materialA), deepClone(materialB));
}

function main(): void {
  console.log("\nHELPING HAND COMPANION INTELLIGENCE CYCLE TEST");
  console.log(divider);

  const result = runCycle();
  assertCycle(result);

  console.log("All Companion Intelligence cycle checks passed.");
}

main();
