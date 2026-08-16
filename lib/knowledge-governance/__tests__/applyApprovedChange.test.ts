/**
 * Milestone 043 — First Governed Capability Integration Tests
 *
 * Proves the sap can flow through the trunk.
 *
 * Three proven chains connect:
 *   ApprovedKnowledgeGovernanceRecord → GuardInput → evaluateGuard()
 *   → KnowledgeGraph mutation → ConceptProvenanceRecord
 *
 * The purpose is not to prove intelligence.
 * The purpose is to prove the architecture connects without weakening any boundary.
 */

import { describe, expect, it } from "@jest/globals";
import type { Concept } from "../../knowledge/Concept";
import { KnowledgeGraph } from "../../knowledge/KnowledgeGraph";
import type {
    ApprovedKnowledgeGovernanceRecord,
    KnowledgeGovernanceContext,
} from "../KnowledgeGovernance";
import { applyApprovedChange } from "../applyApprovedChange";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const NOW = "2026-08-06T10:00:00.000Z";

const governanceContext: KnowledgeGovernanceContext = {
  learningId: "learning-001",
  learningDisposition: "propose",
  learningConfidence: 0.91,
  learningRequiresHuman: false,
  reflectionId: "reflection-001",
  actionId: "action-001",
  executionId: "execution-001",
};

function makeApprovedRecord(
  overrides: Partial<ApprovedKnowledgeGovernanceRecord> = {},
): ApprovedKnowledgeGovernanceRecord {
  return {
    id: "governance-001",
    context: governanceContext,
    review: {
      decision: "approve" as const,
      changeIntent: "create",
      rationale: "Pattern is multi-source and generalisable.",
      conditions: [],
      confidence: 0.91,
      reviewedBy: "Hospitality HQ",
      reviewedAt: NOW,
    },
    approvedChange: {
      intent: "create",
      proposedContent:
        "Shared situational context reduces repeated clarification during operations.",
      expectedBenefit: "Reduces avoidable friction during shift transitions.",
      sourceLearningId: "learning-001",
      provenance: [
        "execution:execution-001",
        "reflection:reflection-001",
        "learning:learning-001",
        "governance:governance-001",
      ],
      approvedBy: "Hospitality HQ",
      approvedAt: NOW,
      confidence: 0.91,
      status: "approved-not-applied",
    },
    evidence: [],
    requiresHuman: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  } as ApprovedKnowledgeGovernanceRecord;
}

function makeProposedConcept(overrides: Partial<Concept> = {}): Concept {
  return {
    id: "shared-situational-context-reduces-clarification",
    name: "Shared Situational Context Reduces Clarification",
    aliases: [],
    definition:
      "Shared situational context reduces repeated clarification during operations.",
    status: "candidate",
    evidenceLevel: "multi-source",
    scope: "professional",
    owner: "Hospitality HQ",
    inheritsTo: ["hospitality"],
    relatedConceptIds: [],
    sources: [],
    examples: [],
    createdAt: NOW,
    updatedAt: NOW,
    createdBy: "Hospitality HQ",
    confidence: 0.91,
    ...overrides,
  };
}

// ── Test 1: Valid learning enters graph ───────────────────────────────────────

describe("Milestone 043 — Test 1: valid learning enters graph", () => {
  it("adds the concept to the graph after approved governance record", () => {
    const graph = new KnowledgeGraph();
    const record = makeApprovedRecord();
    const concept = makeProposedConcept();

    const result = applyApprovedChange(record, concept, graph);

    expect(result.applied).toBe(true);
    expect(result.action).toBe("added");
    expect(graph.getConcept(concept.id)).toBeDefined();
  });

  it("starts as candidate status — existence does not equal validation", () => {
    const graph = new KnowledgeGraph();
    applyApprovedChange(makeApprovedRecord(), makeProposedConcept(), graph);

    expect(graph.getConcept("shared-situational-context-reduces-clarification")?.status).toBe(
      "candidate",
    );
  });
});

// ── Test 2: Missing provenance rejected ───────────────────────────────────────

describe("Milestone 043 — Test 2: missing provenance rejected", () => {
  it("rejects when governance record id is empty", () => {
    const graph = new KnowledgeGraph();
    const record = makeApprovedRecord({ id: "" });

    const result = applyApprovedChange(record, makeProposedConcept(), graph);

    expect(result.applied).toBe(false);
    expect(graph.getConcept("shared-situational-context-reduces-clarification")).toBeUndefined();
  });

  it("rejects when reflectionId is missing from context", () => {
    const graph = new KnowledgeGraph();
    const record = makeApprovedRecord({
      context: { ...governanceContext, reflectionId: "" },
    });

    const result = applyApprovedChange(record, makeProposedConcept(), graph);

    expect(result.applied).toBe(false);
  });

  it("rejects when executionId is missing from context", () => {
    const graph = new KnowledgeGraph();
    const record = makeApprovedRecord({
      context: { ...governanceContext, executionId: "" },
    });

    const result = applyApprovedChange(record, makeProposedConcept(), graph);

    expect(result.applied).toBe(false);
  });
});

// ── Test 3: Self-approval rejected ────────────────────────────────────────────

describe("Milestone 043 — Test 3: creator ≠ approver boundary", () => {
  it("rejects when a professional-scope concept has no reviewer named", () => {
    const graph = new KnowledgeGraph();
    const record: ApprovedKnowledgeGovernanceRecord = {
      ...makeApprovedRecord(),
      review: {
        decision: "approve" as const,
        changeIntent: "create",
        rationale: "approved",
        conditions: [],
        confidence: 0.9,
        // reviewedBy deliberately absent — simulates unapproved submission
        reviewedBy: undefined as unknown as string,
        reviewedAt: undefined as unknown as string,
      },
    } as ApprovedKnowledgeGovernanceRecord;

    const result = applyApprovedChange(record, makeProposedConcept(), graph);

    // Guard Invariant 2: professional scope requires named reviewer
    expect(result.applied).toBe(false);
  });
});

// ── Test 4: Constitutional modification rejected ──────────────────────────────

describe("Milestone 043 — Test 4: constitutional concepts are immutable", () => {
  it("rejects modification of a constitutional core-principle concept", () => {
    const constitutionalConcept: Concept = {
      id: "seek-first-to-understand",
      name: "Seek First to Understand",
      aliases: [],
      definition: "Seek first to understand. Always.",
      status: "core-principle",
      evidenceLevel: "constitutional",
      scope: "universal",
      owner: "Helping Hand Constitution",
      inheritsTo: ["all"],
      relatedConceptIds: [],
      sources: [],
      examples: [],
      createdAt: NOW,
      updatedAt: NOW,
      createdBy: "Helping Hand Constitution",
    };

    const graph = new KnowledgeGraph([constitutionalConcept]);

    const updateRecord: ApprovedKnowledgeGovernanceRecord = {
      ...makeApprovedRecord(),
      review: {
        decision: "approve" as const,
        changeIntent: "update",
        rationale: "attempting to update",
        conditions: [],
        confidence: 0.99,
        reviewedBy: "Helping Hand HQ",
        reviewedAt: NOW,
      },
      approvedChange: {
        intent: "update",
        targetKnowledgeId: "seek-first-to-understand",
        proposedContent: "Attempted modification.",
        expectedBenefit: "none",
        sourceLearningId: "learning-001",
        provenance: ["execution:001", "reflection:001", "learning:001", "governance:001"],
        approvedBy: "Helping Hand HQ",
        approvedAt: NOW,
        confidence: 0.99,
        status: "approved-not-applied",
      },
    } as ApprovedKnowledgeGovernanceRecord;

    const result = applyApprovedChange(
      updateRecord,
      { ...constitutionalConcept, definition: "Modified." },
      graph,
    );

    expect(result.applied).toBe(false);
    // Original definition must be preserved
    expect(graph.getConcept("seek-first-to-understand")?.definition).toBe(
      "Seek first to understand. Always.",
    );
  });
});

// ── Test 5: Human review preserved in provenance ─────────────────────────────

describe("Milestone 043 — Test 5: human review is preserved in provenance", () => {
  it("provenance record carries the named approving authority", () => {
    const graph = new KnowledgeGraph();
    applyApprovedChange(makeApprovedRecord(), makeProposedConcept(), graph);

    const history = graph.getConceptHistory("shared-situational-context-reduces-clarification");

    expect(history.length).toBeGreaterThan(0);
    expect(history[0]?.approvedBy).toBe("Hospitality HQ");
  });

  it("provenance record carries the governance record ID", () => {
    const graph = new KnowledgeGraph();
    applyApprovedChange(makeApprovedRecord(), makeProposedConcept(), graph);

    const history = graph.getConceptHistory("shared-situational-context-reduces-clarification");

    expect(history[0]?.governanceId).toBe("governance-001");
  });
});

// ── Test 6: Previous understanding preserved on update ───────────────────────

describe("Milestone 043 — Test 6: previous understanding preserved on update", () => {
  it("previous concept state is recorded in provenance when concept is updated", () => {
    const original = makeProposedConcept({ definition: "Original definition." });
    const graph = new KnowledgeGraph([original]);

    const updateRecord: ApprovedKnowledgeGovernanceRecord = {
      ...makeApprovedRecord(),
      review: {
        decision: "approve" as const,
        changeIntent: "update",
        rationale: "Refinement based on additional evidence.",
        conditions: [],
        confidence: 0.93,
        reviewedBy: "Hospitality HQ",
        reviewedAt: NOW,
      },
      approvedChange: {
        intent: "update",
        targetKnowledgeId: original.id,
        proposedContent: "Refined definition.",
        expectedBenefit: "More precise.",
        sourceLearningId: "learning-002",
        provenance: ["execution:002", "reflection:002", "learning:002", "governance:002"],
        approvedBy: "Hospitality HQ",
        approvedAt: NOW,
        confidence: 0.93,
        status: "approved-not-applied",
      },
    } as ApprovedKnowledgeGovernanceRecord;

    const updated = makeProposedConcept({ definition: "Refined definition." });
    applyApprovedChange(updateRecord, updated, graph);

    const history = graph.getConceptHistory(original.id);
    expect(history[0]?.previousState?.definition).toBe("Original definition.");
    expect(graph.getConcept(original.id)?.definition).toBe("Refined definition.");
  });
});

// ── Test 7: New understanding available to Digital Colleague ──────────────────

describe("Milestone 043 — Test 7: new understanding is retrievable", () => {
  it("a future DC can retrieve the concept after it is governed into the graph", () => {
    const graph = new KnowledgeGraph();
    applyApprovedChange(makeApprovedRecord(), makeProposedConcept(), graph);

    // Future Digital Colleague retrieves concept for Understanding formation
    const concept = graph.getConcept("shared-situational-context-reduces-clarification");

    expect(concept).toBeDefined();
    expect(concept?.definition).toBe(
      "Shared situational context reduces repeated clarification during operations.",
    );
    expect(concept?.evidenceLevel).toBe("multi-source");
    expect(concept?.scope).toBe("professional");
  });
});

// ── Test 8: Provenance chain is traceable from concept to experience ──────────

describe("Milestone 043 — Test 8: reflection trace is recoverable", () => {
  it("full provenance chain links concept back through governance to execution", () => {
    const graph = new KnowledgeGraph();
    applyApprovedChange(makeApprovedRecord(), makeProposedConcept(), graph);

    const history = graph.getConceptHistory("shared-situational-context-reduces-clarification");
    const record = history[0];

    expect(record).toBeDefined();
    expect(record?.provenance).toContain("execution:execution-001");
    expect(record?.provenance).toContain("reflection:reflection-001");
    expect(record?.provenance).toContain("learning:learning-001");
    expect(record?.provenance).toContain("governance:governance-001");
    // Governance ID links to the full governance record
    expect(record?.governanceId).toBe("governance-001");
  });
});
