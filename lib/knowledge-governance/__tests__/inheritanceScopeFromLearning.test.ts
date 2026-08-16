/**
 * Milestone 051 — Knowledge Inheritance Boundary
 *
 * Proves: deriveProposedInheritanceScope() produces governed inheritance
 * hypotheses proportional to evidence breadth.
 *
 * Nine proof conditions (from MILESTONE_051_CANDIDATE):
 *   PC1 — situational → "session"
 *   PC2 — unknown → "session"
 *   PC3 — formation-gap → "venue"
 *   PC4 — knowledge-gap + single-source → "venue"
 *   PC5 — knowledge-gap + multi-source → "profession"
 *   PC6 — high-confidence failure → "session" regardless of causation
 *   PC7 — LearningProposal.proposedInheritanceScope populated by LearningEngine
 *   PC8 — evaluateGuard() Invariant 6 still blocks single-source + profession (regression)
 *   PC9 — All 265 existing tests pass (regression — verified by full suite run)
 */

import { describe, expect, it } from "@jest/globals";
import type { Execution } from "../../execution/Execution";
import { deriveProposedInheritanceScope } from "../../knowledge-governance/inheritanceScopeFromLearning";
import type { GuardInput } from "../../knowledge-governance/writeGuard";
import { evaluateGuard } from "../../knowledge-governance/writeGuard";
import { LearningEngine } from "../../learning/LearningEngine";
import { ReflectionEngine } from "../../reflection/ReflectionEngine";

const NOW = "2026-08-06T16:00:00.000Z";

function makeFailedExecution(id = "exec-fail"): Execution {
  return {
    id,
    action: {
      id: `action-${id}`,
      kind: "advise",
      disposition: "execute",
      state: "completed",
      instruction: "Advise.",
      boundaries: [],
    },
    permitted: true,
    attempted: true,
    outcome: "failed",
    summary: "Outcome was poor.",
    effect: "internal",
    evidence: [{ type: "note", detail: "Gap observed.", at: NOW }],
    completedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

// ── PC1–PC6: deriveProposedInheritanceScope() pure function ──────────────────

describe("Milestone 051 — PC1: situational → session", () => {
  it("situational causation never inherits beyond the session", () => {
    expect(deriveProposedInheritanceScope("situational", "multi-source", false)).toBe("session");
  });
});

describe("Milestone 051 — PC2: unknown → session", () => {
  it("unknown causation defaults to session scope", () => {
    expect(deriveProposedInheritanceScope("unknown", "single-source", false)).toBe("session");
  });

  it("absent causation also defaults to session", () => {
    expect(deriveProposedInheritanceScope(undefined, "single-source", false)).toBe("session");
  });
});

describe("Milestone 051 — PC3: formation-gap → venue", () => {
  it("formation gaps stay venue-scoped regardless of evidence level", () => {
    expect(deriveProposedInheritanceScope("formation-gap", "single-source", false)).toBe("venue");
    expect(deriveProposedInheritanceScope("formation-gap", "multi-source", false)).toBe("venue");
  });
});

describe("Milestone 051 — PC4: knowledge-gap + single-source → venue", () => {
  it("knowledge gap with single-source evidence stays venue-scoped", () => {
    expect(deriveProposedInheritanceScope("knowledge-gap", "single-source", false)).toBe("venue");
  });

  it("knowledge gap with candidate evidence stays venue-scoped", () => {
    expect(deriveProposedInheritanceScope("knowledge-gap", "candidate", false)).toBe("venue");
  });
});

describe("Milestone 051 — PC5: knowledge-gap + multi-source → profession", () => {
  it("knowledge gap with multi-source evidence earns profession scope", () => {
    expect(deriveProposedInheritanceScope("knowledge-gap", "multi-source", false)).toBe("profession");
  });

  it("knowledge gap with constitutional evidence earns universal scope", () => {
    expect(deriveProposedInheritanceScope("knowledge-gap", "constitutional", false)).toBe("universal");
  });
});

describe("Milestone 051 — PC6: high-confidence failure → session", () => {
  it("high-confidence failure is always session-scoped regardless of causation or evidence", () => {
    expect(deriveProposedInheritanceScope("knowledge-gap", "multi-source", true)).toBe("session");
    expect(deriveProposedInheritanceScope("formation-gap", "multi-source", true)).toBe("session");
  });
});

// ── PC7: LearningProposal carries proposedInheritanceScope ───────────────────

describe("Milestone 051 — PC7: LearningProposal.proposedInheritanceScope is populated", () => {
  it("a failed execution with caution prior produces formation-gap → venue scope", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "caution",
      priorUnderstandingConfidence: 0.55,
    });
    const learning = new LearningEngine().build({ reflection, now: NOW });
    expect(learning.proposal?.proposedInheritanceScope).toBe("venue");
  });

  it("a failed execution with proceed + moderate confidence → knowledge-gap → venue scope", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.65,
    });
    const learning = new LearningEngine().build({ reflection, now: NOW });
    expect(learning.proposal?.proposedInheritanceScope).toBe("venue");
  });

  it("a high-confidence failure → observe (no proposal); scope is not proposed", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: makeFailedExecution(),
      now: NOW,
      priorJudgementDisposition: "proceed",
      priorUnderstandingConfidence: 0.8,
    });
    const learning = new LearningEngine().build({ reflection, now: NOW });
    expect(learning.disposition).toBe("observe");
    expect(learning.proposal).toBeUndefined();
  });
});

// ── PC8: evaluateGuard() Invariant 6 regression ──────────────────────────────

describe("Milestone 051 — PC8: evaluateGuard() Invariant 6 still blocks single-source + profession", () => {
  it("single-source evidence + inheritsTo hospitality → rejected by guard", () => {
    const input: GuardInput = {
      changeId: "gov-test",
      changeIntent: "create",
      sourceLearningId: "learning-test",
      sourceReflectionId: "reflection-test",
      sourceExecutionId: "execution-test",
      reviewedBy: "Hospitality HQ",
      reviewedAt: NOW,
      confidence: 0.8,
      proposedConcept: {
        status: "candidate",
        evidenceLevel: "single-source",
        scope: "professional",
        inheritsTo: ["hospitality"],
      },
      originatesFromPollination: false,
    };

    const result = evaluateGuard(input);
    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(6);
  });

  it("multi-source evidence + inheritsTo hospitality → permitted by guard", () => {
    const input: GuardInput = {
      changeId: "gov-test-2",
      changeIntent: "create",
      sourceLearningId: "learning-test",
      sourceReflectionId: "reflection-test",
      sourceExecutionId: "execution-test",
      reviewedBy: "Hospitality HQ",
      reviewedAt: NOW,
      confidence: 0.8,
      proposedConcept: {
        status: "candidate",
        evidenceLevel: "multi-source",
        scope: "professional",
        inheritsTo: ["hospitality"],
      },
      originatesFromPollination: false,
    };

    const result = evaluateGuard(input);
    expect(result.permitted).toBe(true);
  });
});
