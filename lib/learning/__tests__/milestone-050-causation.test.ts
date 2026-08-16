/**
 * Milestone 050 — Reflection Learning Improvement Boundary
 *
 * Proves: The DC can distinguish between different reasons for poor outcomes
 * and produce governed causation hypotheses rather than generic proposals.
 *
 * Nine proof conditions:
 *   PC1 — priorJudgementDisposition survives BuildReflectionInput → ReflectionContext
 *   PC2 — priorUnderstandingConfidence survives
 *   PC3 — priorUnderstandingCompleteness survives
 *   PC4 — all three survive ReflectionContext → LearningContext
 *   PC5 — Case D: high-confidence + proceed + failed → LearningDisposition: "observe"
 *   PC6 — Case C: caution/partial + failed → causationCategory: "formation-gap"
 *   PC7 — Case B: proceed + sufficient + failed → causationCategory: "knowledge-gap"
 *   PC8 — Case A: proceed + succeeded → LearningDisposition: "reinforce" (unchanged)
 *   PC9 — All 254 existing tests pass (regression)
 */

import { describe, expect, it } from "@jest/globals";
import type { Execution } from "../../execution/Execution";
import { LearningEngine } from "../../learning/LearningEngine";
import { ReflectionEngine } from "../../reflection/ReflectionEngine";

const NOW = "2026-08-06T15:00:00.000Z";

// ── Base execution fixtures ───────────────────────────────────────────────────

function makeFailedExecution(id = "exec-fail"): Execution {
  return {
    id,
    action: {
      id: `action-${id}`,
      kind: "advise",
      disposition: "execute",
      state: "completed",
      instruction: "Advise on the situation.",
      boundaries: [],
    },
    permitted: true,
    attempted: true,
    outcome: "failed",
    summary: "Annie attempted to advise but the outcome was poor.",
    effect: "internal",
    evidence: [{ type: "note", detail: "Outcome did not match expectation.", at: NOW }],
    completedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

function makeSucceededExecution(id = "exec-succeed"): Execution {
  return {
    ...makeFailedExecution(id),
    outcome: "succeeded",
    summary: "Annie advised successfully.",
  };
}

// ── PC1–PC3: carrier fields survive into ReflectionContext ───────────────────

describe("Milestone 050 — PC1/PC2/PC3: prior context survives into ReflectionContext", () => {
  it("priorJudgementDisposition is carried through", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
    });
    expect(reflection.context.priorJudgementDisposition).toBe("proceed");
  });

  it("priorUnderstandingConfidence is carried through", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorUnderstandingConfidence: 0.82,
    });
    expect(reflection.context.priorUnderstandingConfidence).toBe(0.82);
  });

  it("priorUnderstandingCompleteness is carried through", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorUnderstandingCompleteness: "partial",
    });
    expect(reflection.context.priorUnderstandingCompleteness).toBe("partial");
  });
});

// ── PC4: all three survive ReflectionContext → LearningContext ────────────────

describe("Milestone 050 — PC4: prior context survives into LearningContext", () => {
  it("all three fields survive the full chain to LearningContext", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "caution",
      priorUnderstandingConfidence: 0.55,
      priorUnderstandingCompleteness: "partial",
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    expect(learning.context.priorJudgementDisposition).toBe("caution");
    expect(learning.context.priorUnderstandingConfidence).toBe(0.55);
    expect(learning.context.priorUnderstandingCompleteness).toBe("partial");
  });
});

// ── PC5: Case D — high-confidence failure → "observe" ────────────────────────

describe("Milestone 050 — PC5: Case D — high-confidence failure requires human review", () => {
  it("proceed + confidence ≥ 0.75 + failed → LearningDisposition: 'observe'", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.8,
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    // High-confidence failure should not auto-propose — require human review.
    expect(learning.disposition).toBe("observe");
    expect(learning.proposal).toBeUndefined();
  });

  it("proceed + confidence < 0.75 + failed → still eligible to propose (not Case D)", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.6,
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    // Not Case D — confidence below 0.75 — normal propose path
    expect(learning.disposition).toBe("propose");
  });
});

// ── PC6: Case C — formation gap ──────────────────────────────────────────────

describe("Milestone 050 — PC6: Case C — formation gap identified", () => {
  it("caution + failed → causationCategory: 'formation-gap'", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "caution",
      priorUnderstandingConfidence: 0.55,
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    expect(learning.proposal?.causationCategory).toBe("formation-gap");
  });

  it("partial completeness + failed → causationCategory: 'formation-gap'", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.6,
      priorUnderstandingCompleteness: "partial",
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    expect(learning.proposal?.causationCategory).toBe("formation-gap");
  });
});

// ── PC7: Case B — knowledge gap ──────────────────────────────────────────────

describe("Milestone 050 — PC7: Case B — knowledge gap identified", () => {
  it("proceed + sufficient + confidence < 0.75 + failed → causationCategory: 'knowledge-gap'", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.65,
      priorUnderstandingCompleteness: "sufficient",
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    expect(learning.proposal?.causationCategory).toBe("knowledge-gap");
  });
});

// ── PC8: Case A — affirm reinforces (unchanged) ───────────────────────────────

describe("Milestone 050 — PC8: Case A — affirm path is unchanged", () => {
  it("proceed + succeeded → LearningDisposition: 'reinforce' (existing behaviour)", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeSucceededExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.8,
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    expect(learning.disposition).toBe("reinforce");
  });
});

// ── Unknown causation when no prior context supplied ─────────────────────────

describe("Milestone 050 — causation is 'unknown' when no prior context supplied", () => {
  it("no prior context → causationCategory: 'unknown'", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      // No prior context supplied — caller did not pass judgement/understanding quality
    });

    const learning = new LearningEngine().build({ reflection, now: NOW });

    if (learning.proposal) {
      expect(learning.proposal.causationCategory).toBe("unknown");
    }
  });
});
