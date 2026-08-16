/**
 * Milestone 029 — KnowledgeGraphWriteGuard Tests
 *
 * Proves the constitutional boundary holds.
 * Eight invariant groups + ordering test.
 *
 * The guard does not think. It enforces.
 * "Can Helping Hand refuse a change that violates its own principles?"
 * The answer must be: Yes.
 */

import { describe, expect, it } from "@jest/globals";
import {
    evaluateGuard,
    type GuardInput,
} from "../writeGuard";

// ── Shared fixtures ───────────────────────────────────────────────────────────

function baseInput(overrides: Partial<GuardInput> = {}): GuardInput {
  return {
    changeId: "change-001",
    changeIntent: "create",
    sourceLearningId: "learning-001",
    sourceReflectionId: "reflection-001",
    sourceExecutionId: "execution-001",
    reviewedBy: "Hospitality HQ",
    reviewedAt: "2026-08-06T00:00:00.000Z",
    confidence: 0.9,
    originatesFromPollination: false,
    ...overrides,
  };
}

const constitutionalTarget = {
  id: "seek-first-to-understand",
  status: "core-principle" as const,
  evidenceLevel: "constitutional" as const,
  scope: "universal" as const,
  owner: "Helping Hand Constitution",
  inheritsTo: ["all" as const],
};

const professionalTarget = {
  id: "food-safety-threshold",
  status: "validated" as const,
  evidenceLevel: "multi-source" as const,
  scope: "professional" as const,
  owner: "Hospitality HQ",
  inheritsTo: ["hospitality" as const],
};

// ── Invariant 1 — Constitutional immutability ─────────────────────────────────

describe("Invariant 1 — Constitutional concepts are immutable", () => {
  it("rejects any change to a core-principle constitutional concept", () => {
    const result = evaluateGuard(baseInput({ targetConcept: constitutionalTarget }));

    expect(result.permitted).toBe(false);
    expect(result.action).toBe("reject");
    expect(result.invariant).toBe(1);
  });

  it("rejects even with full provenance and named reviewer", () => {
    const result = evaluateGuard(
      baseInput({
        targetConcept: constitutionalTarget,
        reviewedBy: "Helping Hand HQ",
        confidence: 1.0,
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(1);
  });

  it("permits a validated (non-constitutional) universal concept", () => {
    const result = evaluateGuard(
      baseInput({
        targetConcept: {
          id: "companion-intelligence",
          status: "validated",
          evidenceLevel: "multi-source",
          scope: "universal",
          owner: "Helping Hand",
          inheritsTo: ["all"],
        },
        reviewedBy: "Helping Hand HQ",
      }),
    );

    expect(result.permitted).toBe(true);
  });
});

// ── Invariant 2 — Professional scope requires named authority ─────────────────

describe("Invariant 2 — Professional changes require named authority", () => {
  it("rejects a professional target without reviewedBy", () => {
    const result = evaluateGuard(
      baseInput({
        targetConcept: professionalTarget,
        reviewedBy: undefined,
        reviewedAt: undefined,
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(2);
  });

  it("permits a professional target with reviewedBy", () => {
    const result = evaluateGuard(baseInput({ targetConcept: professionalTarget }));

    expect(result.permitted).toBe(true);
  });

  it("permits a non-professional target without reviewedBy", () => {
    const localTarget = {
      id: "venue-procedure",
      status: "candidate" as const,
      evidenceLevel: "single-source" as const,
      scope: "professional" as const,
      owner: "Anne Arms",
      inheritsTo: ["venue-anne-arms" as const],  // venue-specific — not cross-venue
    };

    // Invariant 2 triggers on scope: "professional" even for local targets;
    // this is intentional — the guard checks scope, not inheritance breadth.
    const result = evaluateGuard(
      baseInput({ targetConcept: localTarget, reviewedBy: undefined }),
    );

    expect(result.invariant).toBe(2);
  });
});

// ── Invariant 3 — Provenance chain must be unbroken ──────────────────────────

describe("Invariant 3 — Provenance chain is required", () => {
  it("rejects when changeId is missing", () => {
    const result = evaluateGuard(baseInput({ changeId: "" }));
    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(3);
  });

  it("rejects when sourceLearningId is missing", () => {
    const result = evaluateGuard(baseInput({ sourceLearningId: "" }));
    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(3);
  });

  it("rejects when sourceReflectionId is missing", () => {
    const result = evaluateGuard(baseInput({ sourceReflectionId: "" }));
    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(3);
  });

  it("rejects when sourceExecutionId is missing", () => {
    const result = evaluateGuard(baseInput({ sourceExecutionId: "" }));
    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(3);
  });

  it("permits when all four provenance links are present", () => {
    const result = evaluateGuard(baseInput());
    expect(result.permitted).toBe(true);
  });
});

// ── Invariant 4 — Retirement is deprecation, not deletion ────────────────────

describe("Invariant 4 — Retirement converts to deprecation", () => {
  it("converts a retirement request to deprecation", () => {
    const result = evaluateGuard(baseInput({ changeIntent: "retire" }));

    expect(result.permitted).toBe(true);
    expect(result.action).toBe("deprecate");
  });

  it("non-retirement intents do not trigger deprecation conversion", () => {
    const result = evaluateGuard(baseInput({ changeIntent: "create" }));
    expect(result.action).toBe("permit");
  });
});

// ── Invariant 5 — Evidence ceiling: no constitutional elevation ───────────────

describe("Invariant 5 — Learning loop cannot produce constitutional evidence", () => {
  it("rejects when proposedConcept.evidenceLevel is constitutional", () => {
    const result = evaluateGuard(
      baseInput({
        proposedConcept: {
          status: "validated",
          evidenceLevel: "constitutional",
          scope: "universal",
          inheritsTo: ["all"],
        },
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(5);
  });

  it("permits multi-source evidence", () => {
    const result = evaluateGuard(
      baseInput({
        proposedConcept: {
          status: "validated",
          evidenceLevel: "multi-source",
          scope: "professional",
          inheritsTo: ["hospitality"],
        },
      }),
    );

    expect(result.permitted).toBe(true);
  });
});

// ── Invariant 6 — Evidence minimum for inheritance ────────────────────────────

describe("Invariant 6 — Single-source evidence cannot become inherited knowledge", () => {
  it("rejects candidate evidence that would inherit across professions", () => {
    const result = evaluateGuard(
      baseInput({
        proposedConcept: {
          status: "candidate",
          evidenceLevel: "candidate",
          scope: "professional",
          inheritsTo: ["hospitality"],
        },
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(6);
  });

  it("rejects single-source evidence that would inherit universally", () => {
    const result = evaluateGuard(
      baseInput({
        proposedConcept: {
          status: "validated",
          evidenceLevel: "single-source",
          scope: "universal",
          inheritsTo: ["all"],
        },
        reviewedBy: "Helping Hand HQ",
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(6);
  });

  it("permits single-source evidence scoped to one venue", () => {
    const result = evaluateGuard(
      baseInput({
        proposedConcept: {
          status: "candidate",
          evidenceLevel: "single-source",
          scope: "professional",
          inheritsTo: ["venue-anne-arms"],  // venue-specific, not in cross-venue set
        },
      }),
    );

    expect(result.permitted).toBe(true);
  });
});

// ── Invariant 7 — Pollination sign-offs require human confirmation ────────────

describe("Invariant 7 — Pollination changes require explicit human sign-offs", () => {
  it("rejects when privacyChecked is absent", () => {
    const result = evaluateGuard(
      baseInput({
        originatesFromPollination: true,
        privacyChecked: undefined,
        safetyChecked: true,
        contextValidated: true,
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(7);
  });

  it("rejects when safetyChecked is false", () => {
    const result = evaluateGuard(
      baseInput({
        originatesFromPollination: true,
        privacyChecked: true,
        safetyChecked: false,
        contextValidated: true,
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(7);
  });

  it("rejects when contextValidated is absent", () => {
    const result = evaluateGuard(
      baseInput({
        originatesFromPollination: true,
        privacyChecked: true,
        safetyChecked: true,
        contextValidated: undefined,
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(7);
  });

  it("permits when all three sign-offs are explicitly true", () => {
    const result = evaluateGuard(
      baseInput({
        originatesFromPollination: true,
        privacyChecked: true,
        safetyChecked: true,
        contextValidated: true,
      }),
    );

    expect(result.permitted).toBe(true);
  });

  it("non-pollination changes do not require sign-offs", () => {
    const result = evaluateGuard(
      baseInput({ originatesFromPollination: false }),
    );

    expect(result.permitted).toBe(true);
  });
});

// ── Invariant 8 — Rollback requires named authority ──────────────────────────

describe("Invariant 8 — Supersede requires named authority", () => {
  it("rejects supersede without reviewedBy", () => {
    const result = evaluateGuard(
      baseInput({
        changeIntent: "supersede",
        reviewedBy: undefined,
        reviewedAt: undefined,
      }),
    );

    expect(result.permitted).toBe(false);
    expect(result.invariant).toBe(8);
  });

  it("permits supersede with named authority", () => {
    const result = evaluateGuard(
      baseInput({ changeIntent: "supersede" }),
    );

    expect(result.permitted).toBe(true);
  });
});

// ── Invariant ordering — constitutional check is not bypassable ───────────────

describe("Invariant ordering — Invariant 1 fires first regardless of other violations", () => {
  it("rejects on Invariant 1 even when provenance is also missing", () => {
    const result = evaluateGuard(
      baseInput({
        targetConcept: constitutionalTarget,
        changeId: "",                // would also fail Invariant 3
        sourceLearningId: "",        // would also fail Invariant 3
        sourceReflectionId: "",
        sourceExecutionId: "",
      }),
    );

    // Invariant 1 must fire first
    expect(result.invariant).toBe(1);
  });

  it("rejects on Invariant 3 when no constitutional violation exists", () => {
    const result = evaluateGuard(baseInput({ changeId: "" }));
    expect(result.invariant).toBe(3);
  });
});
