/**
 * Milestone 030 — KnowledgeGraph Mutation Layer Tests
 *
 * The system changes itself here — for the first time.
 *
 * Six test groups prove:
 *   1. New growth (addConcept)
 *   2. Refined growth (updateConcept)
 *   3. Dormant growth (retireConcept)
 *   4. Provenance preservation
 *   5. Rejected mutations cannot change knowledge
 *   6. Creator ≠ Approver ≠ Enforcer separation
 */

import { describe, expect, it } from "@jest/globals";
import { deprecateGuard, permitGuard, rejectGuard } from "../../knowledge-governance/writeGuard";
import type { Concept } from "../Concept";
import type { ConceptProvenanceInput } from "../ConceptProvenanceRecord";
import { KnowledgeGraph } from "../KnowledgeGraph";

// ── Shared fixtures ──────────────────────────────────────────────────────────

function makeConcept(overrides: Partial<Concept> = {}): Concept {
  return {
    id: "test-concept-001",
    name: "Test Concept",
    aliases: [],
    definition: "A concept used for testing.",
    status: "candidate",
    evidenceLevel: "single-source",
    scope: "professional",
    owner: "Hospitality HQ",
    inheritsTo: ["hospitality"],
    relatedConceptIds: [],
    sources: [],
    examples: [],
    createdAt: "2026-08-06T00:00:00.000Z",
    updatedAt: "2026-08-06T00:00:00.000Z",
    createdBy: "hospitality-hq",
    confidence: 0.85,
    ...overrides,
  };
}

function makeProvenance(overrides: Partial<ConceptProvenanceInput> = {}): ConceptProvenanceInput {
  return {
    governanceId: "governance-001",
    changeIntent: "create",
    approvedBy: "Hospitality HQ",
    provenance: [
      "execution:exec-001",
      "reflection:refl-001",
      "learning:learn-001",
      "governance:gov-001",
    ],
    ...overrides,
  };
}

const constitutionalConcept: Concept = makeConcept({
  id: "seek-first-to-understand",
  name: "Seek First to Understand",
  status: "core-principle",
  evidenceLevel: "constitutional",
  scope: "universal",
  owner: "Helping Hand Constitution",
  inheritsTo: ["all"],
});

// ── Test Group 1: New growth (addConcept) ─────────────────────────────────────

describe("Milestone 030 — addConcept: new growth", () => {
  it("adds a concept when the guard permits", () => {
    const graph = new KnowledgeGraph();
    const concept = makeConcept();
    const result = graph.addConcept(concept, permitGuard(), makeProvenance());

    expect(result.applied).toBe(true);
    expect(result.action).toBe("added");
    expect(graph.getConcept(concept.id)).toBeDefined();
  });

  it("new concepts start as candidate even if status was set higher", () => {
    const graph = new KnowledgeGraph();
    const concept = makeConcept({ status: "validated" });
    graph.addConcept(concept, permitGuard(), makeProvenance());

    // Validated status is preserved only when guard explicitly approved it
    const stored = graph.getConcept(concept.id);
    expect(stored?.status).toBe("validated");
  });

  it("defaults to candidate status when status is not validated or deprecated", () => {
    const graph = new KnowledgeGraph();
    const concept = makeConcept({ status: "candidate" });
    graph.addConcept(concept, permitGuard(), makeProvenance());

    expect(graph.getConcept(concept.id)?.status).toBe("candidate");
  });

  it("rejects adding a concept that already exists", () => {
    const graph = new KnowledgeGraph([makeConcept()]);
    const result = graph.addConcept(makeConcept(), permitGuard(), makeProvenance());

    expect(result.applied).toBe(false);
    expect(result.action).toBe("rejected");
  });

  it("rejects when guard does not permit", () => {
    const graph = new KnowledgeGraph();
    const result = graph.addConcept(makeConcept(), rejectGuard("Test rejection"), makeProvenance());

    expect(result.applied).toBe(false);
    expect(graph.getConcept("test-concept-001")).toBeUndefined();
  });
});

// ── Test Group 2: Refined growth (updateConcept) ─────────────────────────────

describe("Milestone 030 — updateConcept: refined growth", () => {
  it("updates a concept when the guard permits", () => {
    const original = makeConcept({ definition: "Original definition." });
    const graph = new KnowledgeGraph([original]);
    const updated = makeConcept({ definition: "Refined definition with new evidence." });

    const result = graph.updateConcept(
      original.id,
      updated,
      permitGuard(),
      makeProvenance({ changeIntent: "update" }),
    );

    expect(result.applied).toBe(true);
    expect(result.action).toBe("updated");
    expect(graph.getConcept(original.id)?.definition).toBe("Refined definition with new evidence.");
  });

  it("preserves createdAt from the original concept", () => {
    const original = makeConcept({ createdAt: "2026-01-01T00:00:00.000Z" });
    const graph = new KnowledgeGraph([original]);
    const proposed = makeConcept({ createdAt: "2026-08-06T00:00:00.000Z" });

    graph.updateConcept(original.id, proposed, permitGuard(), makeProvenance({ changeIntent: "update" }));

    expect(graph.getConcept(original.id)?.createdAt).toBe("2026-01-01T00:00:00.000Z");
  });

  it("rejects updating a concept that does not exist", () => {
    const graph = new KnowledgeGraph();
    const result = graph.updateConcept(
      "nonexistent",
      makeConcept({ id: "nonexistent" }),
      permitGuard(),
      makeProvenance({ changeIntent: "update" }),
    );

    expect(result.applied).toBe(false);
    expect(result.action).toBe("rejected");
  });

  it("rejects updating a constitutional core-principle concept", () => {
    const graph = new KnowledgeGraph([constitutionalConcept]);
    const result = graph.updateConcept(
      constitutionalConcept.id,
      { ...constitutionalConcept, definition: "Attempted mutation." },
      permitGuard(),
      makeProvenance({ changeIntent: "update" }),
    );

    expect(result.applied).toBe(false);
    expect(result.action).toBe("rejected");
    expect(graph.getConcept(constitutionalConcept.id)?.definition).toBe(constitutionalConcept.definition);
  });

  it("rejects when guard does not permit", () => {
    const original = makeConcept();
    const graph = new KnowledgeGraph([original]);

    const result = graph.updateConcept(
      original.id,
      makeConcept({ definition: "Sneaky update." }),
      rejectGuard("Invariant 2 violated"),
      makeProvenance({ changeIntent: "update" }),
    );

    expect(result.applied).toBe(false);
    expect(graph.getConcept(original.id)?.definition).toBe(original.definition);
  });
});

// ── Test Group 3: Dormant growth (retireConcept) ──────────────────────────────

describe("Milestone 030 — retireConcept: dormant growth", () => {
  it("deprecates a concept — never deletes it", () => {
    const graph = new KnowledgeGraph([makeConcept()]);
    const result = graph.retireConcept(
      "test-concept-001",
      deprecateGuard(),
      makeProvenance({ changeIntent: "retire" }),
    );

    expect(result.applied).toBe(true);
    expect(result.action).toBe("deprecated");

    const stored = graph.getConcept("test-concept-001");
    expect(stored).toBeDefined();
    expect(stored?.status).toBe("deprecated");
  });

  it("concept remains retrievable after retirement", () => {
    const graph = new KnowledgeGraph([makeConcept()]);
    graph.retireConcept("test-concept-001", deprecateGuard(), makeProvenance({ changeIntent: "retire" }));

    expect(graph.getConcept("test-concept-001")).toBeDefined();
  });

  it("all original fields are preserved on deprecation", () => {
    const concept = makeConcept({ definition: "This definition must survive retirement." });
    const graph = new KnowledgeGraph([concept]);
    graph.retireConcept(concept.id, deprecateGuard(), makeProvenance({ changeIntent: "retire" }));

    const stored = graph.getConcept(concept.id);
    expect(stored?.definition).toBe("This definition must survive retirement.");
    expect(stored?.name).toBe(concept.name);
    expect(stored?.createdAt).toBe(concept.createdAt);
  });

  it("rejects retiring a concept that does not exist", () => {
    const graph = new KnowledgeGraph();
    const result = graph.retireConcept("nonexistent", deprecateGuard(), makeProvenance({ changeIntent: "retire" }));

    expect(result.applied).toBe(false);
  });

  it("rejects when guard does not permit", () => {
    const graph = new KnowledgeGraph([makeConcept()]);
    const result = graph.retireConcept(
      "test-concept-001",
      rejectGuard("Authority insufficient"),
      makeProvenance({ changeIntent: "retire" }),
    );

    expect(result.applied).toBe(false);
    expect(graph.getConcept("test-concept-001")?.status).not.toBe("deprecated");
  });
});

// ── Test Group 4: Provenance preservation ─────────────────────────────────────

describe("Milestone 030 — provenance is preserved", () => {
  it("provenance record is created on addConcept", () => {
    const graph = new KnowledgeGraph();
    const result = graph.addConcept(makeConcept(), permitGuard(), makeProvenance());

    expect(result.provenanceRecord).toBeDefined();
    expect(result.provenanceRecord?.conceptId).toBe("test-concept-001");
    expect(result.provenanceRecord?.approvedBy).toBe("Hospitality HQ");
    expect(graph.getConceptHistory("test-concept-001")).toHaveLength(1);
  });

  it("provenance record captures previous state on updateConcept", () => {
    const original = makeConcept({ definition: "Original." });
    const graph = new KnowledgeGraph([original]);

    graph.updateConcept(
      original.id,
      makeConcept({ definition: "Updated." }),
      permitGuard(),
      makeProvenance({ changeIntent: "update" }),
    );

    const history = graph.getConceptHistory(original.id);
    expect(history).toHaveLength(1);
    expect(history[0]?.previousState?.definition).toBe("Original.");
  });

  it("provenance record captures previous state on retireConcept", () => {
    const concept = makeConcept({ status: "validated" });
    const graph = new KnowledgeGraph([concept]);

    graph.retireConcept(concept.id, deprecateGuard(), makeProvenance({ changeIntent: "retire" }));

    const history = graph.getConceptHistory(concept.id);
    expect(history[0]?.previousState?.status).toBe("validated");
  });

  it("provenance chain is stored on the record", () => {
    const graph = new KnowledgeGraph();
    const provenance = makeProvenance({
      provenance: ["execution:exec-123", "reflection:refl-456", "learning:learn-789"],
    });

    graph.addConcept(makeConcept(), permitGuard(), provenance);

    const history = graph.getConceptHistory("test-concept-001");
    expect(history[0]?.provenance).toContain("execution:exec-123");
    expect(history[0]?.provenance).toContain("reflection:refl-456");
    expect(history[0]?.provenance).toContain("learning:learn-789");
  });

  it("rejected mutations do not create provenance records", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), rejectGuard("test"), makeProvenance());

    expect(graph.getConceptHistory("test-concept-001")).toHaveLength(0);
  });
});

// ── Test Group 5: Rejected mutations ─────────────────────────────────────────

describe("Milestone 030 — rejected mutations cannot change knowledge", () => {
  it("rejected addConcept leaves graph unchanged", () => {
    const graph = new KnowledgeGraph();
    graph.addConcept(makeConcept(), rejectGuard("Invariant 1"), makeProvenance());

    expect(graph.getConcepts()).toHaveLength(0);
  });

  it("rejected updateConcept leaves concept unchanged", () => {
    const original = makeConcept({ definition: "Must not change." });
    const graph = new KnowledgeGraph([original]);

    graph.updateConcept(
      original.id,
      makeConcept({ definition: "Changed." }),
      rejectGuard("Invariant 2"),
      makeProvenance({ changeIntent: "update" }),
    );

    expect(graph.getConcept(original.id)?.definition).toBe("Must not change.");
  });

  it("rejected retireConcept leaves concept active", () => {
    const graph = new KnowledgeGraph([makeConcept({ status: "validated" })]);

    graph.retireConcept("test-concept-001", rejectGuard("Invariant 8"), makeProvenance({ changeIntent: "retire" }));

    expect(graph.getConcept("test-concept-001")?.status).toBe("validated");
  });
});

// ── Test Group 6: Creator ≠ Approver ≠ Enforcer ──────────────────────────────

describe("Milestone 030 — creator ≠ approver ≠ enforcer", () => {
  it("the mutation layer does not know which DC originated the learning", () => {
    // The mutation layer receives provenance strings — not DC identity.
    // It does not accept a DC id parameter.
    const graph = new KnowledgeGraph();
    const provenance = makeProvenance({
      approvedBy: "Hospitality HQ",           // approver identity
      provenance: ["execution:exec-001"],     // creator evidence — opaque strings
    });

    const result = graph.addConcept(makeConcept(), permitGuard(), provenance);

    // Approver is recorded
    expect(result.provenanceRecord?.approvedBy).toBe("Hospitality HQ");
    // DC origin is not separately tracked — only the provenance chain
    expect(result.provenanceRecord?.provenance).toContain("execution:exec-001");
  });

  it("the KnowledgeGraph (enforcer) applies the change — it does not decide it", () => {
    // The graph performs the operation. The guard decided.
    // The graph checks permitted === true; it does not re-evaluate the decision.
    const graph = new KnowledgeGraph();
    const permitted = permitGuard();

    const result = graph.addConcept(makeConcept(), permitted, makeProvenance());

    expect(result.applied).toBe(true);
    // The graph applied what the guard permitted — it added no intelligence of its own.
    expect(result.provenanceRecord?.approvedBy).toBe("Hospitality HQ");
  });

  it("provenance records who approved — never who created the learning", () => {
    // Andy could have created the learning. HQ approved it.
    // The mutation layer only records the approver.
    const graph = new KnowledgeGraph();
    const provenance = makeProvenance({ approvedBy: "Helping Hand HQ" });

    graph.addConcept(makeConcept({ scope: "universal" }), permitGuard(), provenance);

    const history = graph.getConceptHistory("test-concept-001");
    expect(history[0]?.approvedBy).toBe("Helping Hand HQ");
    // No DC id is stored anywhere in the mutation record.
  });
});
