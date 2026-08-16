/**
 * Milestone 053 — Knowledge Trust Renewal
 *
 * Proves: Helping Hand can explain why knowledge deserves trust.
 * No trust score. Evidence only. The reviewer decides.
 *
 * Nine proof conditions:
 *   PC1 — "reinforce" changes lastReinforcedAt
 *   PC2 — "update" does not change lastReinforcedAt
 *   PC3 — "retire" does not change lastReinforcedAt
 *   PC4 — conflictsWithConceptId creates a challengedBy relationship
 *   PC5 — getTrustSummary() returns correct reinforcementCount from provenance
 *   PC6 — challenged concepts have requiresReview: true
 *   PC7 — "validated" with zero reinforcements has requiresReview: true
 *   PC8 — constitutional concepts remain immutable; getTrustSummary() reads them correctly
 *   PC9 — all existing tests pass (regression — confirmed by full suite run)
 */

import { describe, expect, it } from "@jest/globals";
import { evaluateGuard, permitGuard } from "../../knowledge-governance/writeGuard";
import type { Concept } from "../Concept";
import { KnowledgeGraph } from "../KnowledgeGraph";

const NOW = "2026-08-06T17:00:00.000Z";

function makeConcept(overrides: Partial<Concept> = {}): Concept {
  return {
    id: "test-concept",
    name: "Test Concept",
    aliases: [],
    definition: "A test concept definition.",
    status: "candidate",
    evidenceLevel: "single-source",
    scope: "professional",
    owner: "Hospitality HQ",
    inheritsTo: ["hospitality"],
    relatedConceptIds: [],
    sources: [],
    examples: [],
    createdAt: NOW,
    updatedAt: NOW,
    createdBy: "Hospitality HQ",
    ...overrides,
  };
}

function makeProvenance(
  intent: "create" | "update" | "reinforce" | "retire" | "supersede",
  overrides: Record<string, unknown> = {},
) {
  return {
    governanceId: `gov-${intent}-001`,
    changeIntent: intent,
    approvedBy: "Hospitality HQ",
    provenance: [`execution:001`, `learning:001`],
    ...overrides,
  };
}

// ── PC1: reinforce changes lastReinforcedAt ───────────────────────────────────

describe("Milestone 053 — PC1: reinforce changes lastReinforcedAt", () => {
  it("a 'reinforce' governance record updates lastReinforcedAt on the concept", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));

    graph.updateConcept(
      "test-concept",
      makeConcept(),
      permitGuard(),
      makeProvenance("reinforce"),
    );

    expect(graph.getConcept("test-concept")?.lastReinforcedAt).toBeDefined();
  });
});

// ── PC2: update does NOT change lastReinforcedAt ──────────────────────────────

describe("Milestone 053 — PC2: 'update' does not change lastReinforcedAt", () => {
  it("a normal 'update' leaves lastReinforcedAt unchanged", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));

    // First: reinforce to establish a value
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce"));
    const afterReinforce = graph.getConcept("test-concept")?.lastReinforcedAt;

    // Then: update — lastReinforcedAt must not change
    graph.updateConcept(
      "test-concept",
      makeConcept({ definition: "Edited definition." }),
      permitGuard(),
      makeProvenance("update"),
    );

    expect(graph.getConcept("test-concept")?.lastReinforcedAt).toBe(afterReinforce);
    expect(graph.getConcept("test-concept")?.definition).toBe("Edited definition.");
  });

  it("a 'supersede' does not change lastReinforcedAt", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce"));
    const afterReinforce = graph.getConcept("test-concept")?.lastReinforcedAt;

    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("supersede"));

    expect(graph.getConcept("test-concept")?.lastReinforcedAt).toBe(afterReinforce);
  });
});

// ── PC3: retire does NOT change lastReinforcedAt ──────────────────────────────

describe("Milestone 053 — PC3: 'retire' does not change lastReinforcedAt", () => {
  it("retirement preserves lastReinforcedAt from before the retirement", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce"));
    const afterReinforce = graph.getConcept("test-concept")?.lastReinforcedAt;

    graph.retireConcept(
      "test-concept",
      { permitted: true, action: "deprecate" },
      makeProvenance("retire"),
    );

    expect(graph.getConcept("test-concept")?.lastReinforcedAt).toBe(afterReinforce);
    expect(graph.getConcept("test-concept")?.status).toBe("deprecated");
  });
});

// ── PC4: conflictsWithConceptId creates challengedBy relationship ─────────────

describe("Milestone 053 — PC4: challenge relationship is recorded", () => {
  it("conflictsWithConceptId on a new concept adds its governanceId to the target's challengedBy", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept({ id: "existing-concept" }), permitGuard(), makeProvenance("create"));

    const challenger = makeConcept({ id: "challenging-concept" });
    graph.addConcept(
      challenger,
      permitGuard(),
      makeProvenance("create", {
        governanceId: "gov-challenge-001",
        conflictsWithConceptId: "existing-concept",
      }),
    );

    expect(graph.getConcept("existing-concept")?.challengedBy).toContain("gov-challenge-001");
  });

  it("duplicate challenge IDs are not added twice", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept({ id: "existing-concept" }), permitGuard(), makeProvenance("create"));

    const prov = makeProvenance("update", {
      governanceId: "gov-challenge-001",
      conflictsWithConceptId: "existing-concept",
    });
    graph.updateConcept("existing-concept", makeConcept({ id: "existing-concept" }), permitGuard(), prov);
    graph.updateConcept("existing-concept", makeConcept({ id: "existing-concept" }), permitGuard(), prov);

    const challenged = graph.getConcept("existing-concept")?.challengedBy ?? [];
    expect(challenged.filter((id) => id === "gov-challenge-001")).toHaveLength(1);
  });

  it("a challenge means 'this governance decision questioned this concept' — the concept remains active", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept({ id: "existing-concept", status: "validated" }), permitGuard(), makeProvenance("create"));
    graph.addConcept(
      makeConcept({ id: "challenging-concept" }),
      permitGuard(),
      makeProvenance("create", { conflictsWithConceptId: "existing-concept" }),
    );

    // The challenged concept is still active — it requires review, not deletion.
    expect(graph.getConcept("existing-concept")?.status).toBe("validated");
  });
});

// ── PC5: getTrustSummary() reads provenance correctly ─────────────────────────

describe("Milestone 053 — PC5: getTrustSummary() returns correct reinforcementCount", () => {
  it("reinforcementCount reflects the number of 'reinforce' provenance records", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce", { governanceId: "gov-r1" }));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce", { governanceId: "gov-r2" }));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("update", { governanceId: "gov-u1" }));

    const summary = graph.getTrustSummary("test-concept");

    expect(summary.reinforcementCount).toBe(2);
    expect(summary.challengedBy).toHaveLength(0);
  });

  it("getTrustSummary() carries lastReinforcedAt from the concept", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce"));

    const summary = graph.getTrustSummary("test-concept");

    expect(summary.lastReinforcedAt).toBeDefined();
  });
});

// ── PC6: challenged concepts have requiresReview: true ───────────────────────

describe("Milestone 053 — PC6: challenged concepts surface as requiresReview", () => {
  it("a challenged concept has requiresReview: true in its trust summary", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept({ id: "existing-concept" }), permitGuard(), makeProvenance("create"));
    graph.addConcept(
      makeConcept({ id: "challenging-concept" }),
      permitGuard(),
      makeProvenance("create", { conflictsWithConceptId: "existing-concept" }),
    );

    expect(graph.getTrustSummary("existing-concept").requiresReview).toBe(true);
  });

  it("an unchallenged, reinforced concept does not require review", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), permitGuard(), makeProvenance("create"));
    graph.updateConcept("test-concept", makeConcept(), permitGuard(), makeProvenance("reinforce"));

    expect(graph.getTrustSummary("test-concept").requiresReview).toBe(false);
  });
});

// ── PC7: validated without reinforcement is visible ──────────────────────────

describe("Milestone 053 — PC7: validated concepts without reinforcement are visible", () => {
  it("a 'validated' concept with zero reinforcements has requiresReview: true", () => {
    const graph = new KnowledgeGraph();
    // Caller sets status: "validated" directly — no reinforcement occurred.
    graph.addConcept(
      makeConcept({ status: "validated" }),
      permitGuard(),
      makeProvenance("create"),
    );

    const summary = graph.getTrustSummary("test-concept");

    expect(summary.status).toBe("validated");
    expect(summary.reinforcementCount).toBe(0);
    expect(summary.requiresReview).toBe(true);
  });
});

// ── PC8: constitutional concepts remain immutable ─────────────────────────────

describe("Milestone 053 — PC8: constitutional concepts remain immutable", () => {
  it("getTrustSummary() reads constitutional concepts correctly", () => {
    const constitutional = makeConcept({
      id: "seek-first-to-understand",
      status: "core-principle",
      evidenceLevel: "constitutional",
      scope: "universal",
    });

    const graph = new KnowledgeGraph([constitutional]);
    const summary = graph.getTrustSummary("seek-first-to-understand");

    expect(summary.status).toBe("core-principle");
    expect(summary.evidenceLevel).toBe("constitutional");
    expect(summary.requiresReview).toBe(false);
  });

  it("evaluateGuard() still rejects updates to constitutional concepts", () => {
    const input = {
      changeId: "gov-001",
      changeIntent: "update" as const,
      sourceLearningId: "l-001",
      sourceReflectionId: "r-001",
      sourceExecutionId: "e-001",
      reviewedBy: "Helping Hand HQ",
      reviewedAt: NOW,
      confidence: 0.99,
      targetConcept: {
        id: "seek-first-to-understand",
        status: "core-principle" as const,
        evidenceLevel: "constitutional" as const,
        scope: "universal" as const,
        owner: "Helping Hand HQ",
        inheritsTo: ["all"],
      },
      proposedConcept: {
        status: "core-principle" as const,
        evidenceLevel: "constitutional" as const,
        scope: "universal" as const,
        inheritsTo: ["all"],
      },
      originatesFromPollination: false,
    };

    expect(evaluateGuard(input).permitted).toBe(false);
  });
});
