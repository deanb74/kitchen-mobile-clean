/**
 * Milestone 044 — Digital Colleague Learning Loop
 *
 * Proves: Memory → Better Future Understanding
 *
 * The leaf learns from sunlight.
 *
 * Two encounters. One pattern. One governed principle.
 *
 * Encounter 1: Annie experiences shift transition confusion.
 *   Formation has no prior governed knowledge.
 *   Experience travels through governance into KnowledgeGraph.
 *
 * Encounter 2: A similar situation arises.
 *   KnowledgeGraph contains the governed principle.
 *   Formation receives it. Summary is enriched.
 *   Annie does not retrieve an answer.
 *   She retrieves context that improves understanding synthesis.
 *
 * What this test proves:
 *   - Governed memory reaches formation
 *   - Formation summary improves with prior governed understanding
 *   - Provenance traces back through the full chain
 *
 * What this test does not prove:
 *   - Answers are retrieved (they are not)
 *   - Decisions are automated (they are not)
 *   - Governance is bypassed (it is not — human approval is required)
 */

import { describe, expect, it } from "@jest/globals";
import { form } from "../../../../platform/cos/understanding-formation";
import type {
    FormationContext,
    FormationSituationalContext,
} from "../../../../platform/cos/understanding-formation/types";
import type { Execution } from "../../../execution/Execution";
import type {
    ApprovedKnowledgeGovernanceRecord,
    KnowledgeGovernance,
} from "../../../knowledge-governance/KnowledgeGovernance";
import { KnowledgeGovernanceEngine } from "../../../knowledge-governance/KnowledgeGovernanceEngine";
import { applyApprovedChange } from "../../../knowledge-governance/applyApprovedChange";
import type { Concept } from "../../../knowledge/Concept";
import { KnowledgeGraph } from "../../../knowledge/KnowledgeGraph";
import { LearningEngine } from "../../../learning/LearningEngine";
import { ReflectionEngine } from "../../../reflection/ReflectionEngine";
import { governedConceptsToFormation } from "../governedKnowledgeAdapter";

// ── Fixed timestamps ──────────────────────────────────────────────────────────

const NOW = "2026-08-06T10:00:00.000Z";

function requireApprovedRecord(
  record: KnowledgeGovernance,
): ApprovedKnowledgeGovernanceRecord {
  if (!isApprovedRecord(record)) {
    throw new Error("Expected approved governance record before applying change.");
  }

  return record;
}

function isApprovedRecord(
  record: KnowledgeGovernance,
): record is ApprovedKnowledgeGovernanceRecord {
  return record.review.decision === "approve" && "approvedChange" in record;
}

// ── Shared translation fixtures ───────────────────────────────────────────────

const shiftTranslation = {
  observationId: "obs-shift-001",
  meaning: "Incoming staff are receiving insufficient handover context at shift transitions.",
  confidence: 0.75,
};

const shiftSituational: FormationSituationalContext = {
  urgency: "medium",
  risk: "operational confusion during service",
  what: "shift transition handover",
};

const shiftContext: FormationContext = {
  situational: shiftSituational,
  institutional: [],
};

// ── The governing concept (proposed by Annie after Encounter 1) ───────────────

const conceptId = "shared-context-reduces-shift-clarification";

const proposedConcept: Concept = {
  id: conceptId,
  name: "Shared Context Reduces Shift Clarification",
  aliases: [],
  definition:
    "Providing shared situational context before shift transitions reduces repeated clarification needs and operational confusion.",
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
  confidence: 0.75,
};

// ── Encounter 1 execution fixture ─────────────────────────────────────────────
//
// Annie attempted to advise on shift transition context.
// The outcome was "failed" — information was insufficient.
// This produces: reflection.disposition "adjust" → learning.disposition "propose".
// No critical/high terms in summary — governance proceeds to approval.

const enc1Execution: Execution = {
  id: "execution-shift-001",
  action: {
    id: "action-shift-001",
    kind: "advise",
    disposition: "execute",
    state: "completed",
    instruction: "Provide guidance on shift handover context.",
    boundaries: [],
  },
  permitted: true,
  attempted: true,
  outcome: "failed",
  summary:
    "Annie attempted to advise on shift handover but the context available was insufficient to reduce confusion.",
  effect: "internal",
  evidence: [
    {
      type: "note",
      detail: "Incoming staff reported repeated gaps in shift context at handover.",
      at: NOW,
    },
  ],
  completedAt: NOW,
  createdAt: NOW,
  updatedAt: NOW,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function runEncounter1Governance(graph: KnowledgeGraph) {
  const reflectionEngine = new ReflectionEngine();
  const learningEngine = new LearningEngine();
  const governanceEngine = new KnowledgeGovernanceEngine();

  const reflection = reflectionEngine.reflect({
    execution: enc1Execution,
    reflectionId: "reflection-shift-001",
    now: NOW,
  });

  const learning = learningEngine.build({
    reflection,
    learningId: "learning-shift-001",
    now: NOW,
  });

  const record = governanceEngine.build({
    learning,
    decision: "approve",
    changeIntent: "create",
    rationale:
      "Repeated shift transition confusion pattern observed across multiple executions. Governing principle establishes shared context approach.",
    reviewedBy: "Hospitality HQ",
    reviewedAt: NOW,
    governanceId: "governance-shift-001",
    now: NOW,
  });

  const approvedRecord = requireApprovedRecord(record);

  return {
    reflection,
    learning,
    record: approvedRecord,
    ...applyApprovedChange(approvedRecord, proposedConcept, graph),
  };
}

// ── Test 1: Encounter 1 formation has no governed knowledge ──────────────────

describe("Milestone 044 — Test 1: Encounter 1 formation has no prior governed knowledge", () => {
  it("formation knowledge is empty before any governance has run", () => {
    const graph = new KnowledgeGraph();
    const concepts = graph.search("clarification");
    const knowledge = governedConceptsToFormation(concepts, "hospitality");

    expect(knowledge).toHaveLength(0);
  });

  it("Encounter 1 understanding is formed from translations alone", () => {
    const enc1 = form({
      translations: [shiftTranslation],
      context: shiftContext,
      knowledge: [],
    });

    expect(enc1.summary).not.toContain("Providing shared situational context");
    expect(enc1.confidence).toBeGreaterThan(0);
  });
});

// ── Test 2: Governance produces a concept in KnowledgeGraph ──────────────────

describe("Milestone 044 — Test 2: governance produces governed memory", () => {
  it("the learning loop produces a concept in KnowledgeGraph", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    expect(graph.getConcept(conceptId)).toBeDefined();
  });

  it("the concept carries the professional principle", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const stored = graph.getConcept(conceptId);
    expect(stored?.definition).toBe(proposedConcept.definition);
    expect(stored?.evidenceLevel).toBe("multi-source");
    expect(stored?.inheritsTo).toContain("hospitality");
  });

  it("the concept is traceable back through the full governance chain", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const history = graph.getConceptHistory(conceptId);
    expect(history.length).toBeGreaterThan(0);

    const provenance = history[0]?.provenance ?? [];
    expect(provenance.some((p) => p.startsWith("execution:"))).toBe(true);
    expect(provenance.some((p) => p.startsWith("reflection:"))).toBe(true);
    expect(provenance.some((p) => p.startsWith("learning:"))).toBe(true);
    expect(history[0]?.governanceId).toBe("governance-shift-001");
  });
});

// ── Test 3: Governed concept reaches formation on Encounter 2 ────────────────

describe("Milestone 044 — Test 3: governed memory reaches formation", () => {
  it("KnowledgeGraph.search() retrieves the governed concept on Encounter 2", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const concepts = graph.search("clarification");
    expect(concepts.some((c) => c.id === conceptId)).toBe(true);
  });

  it("governedConceptsToFormation() converts it to professional FormationKnowledge", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const concepts = graph.search("clarification");
    const knowledge = governedConceptsToFormation(concepts, "hospitality");

    expect(knowledge.length).toBeGreaterThan(0);
    expect(knowledge[0]?.evidenceLevel).toBe("professional");
  });

  it("healthcare DC does not receive the hospitality concept", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const concepts = graph.search("clarification");
    const healthcareKnowledge = governedConceptsToFormation(concepts, "healthcare");

    expect(healthcareKnowledge).toHaveLength(0);
  });
});

// ── Test 4: Formation summary is enriched on Encounter 2 ─────────────────────

describe("Milestone 044 — Test 4: memory improves understanding synthesis", () => {
  it("Encounter 2 summary includes the governed principle", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const concepts = graph.search("clarification");
    const governedKnowledge = governedConceptsToFormation(concepts, "hospitality");

    const enc2 = form({
      translations: [
        {
          observationId: "obs-shift-002",
          meaning:
            "Incoming staff at The Anne Arms are again reporting context gaps at shift handover.",
          confidence: 0.8,
        },
      ],
      context: shiftContext,
      knowledge: governedKnowledge,
    });

    // The governed principle from Encounter 1 now informs Encounter 2 synthesis.
    expect(enc2.summary).toContain("Providing shared situational context");
  });

  it("Encounter 1 summary does not include the governed principle", () => {
    const enc1 = form({
      translations: [shiftTranslation],
      context: shiftContext,
      knowledge: [],
    });

    // Before governance, the principle is not available to formation.
    expect(enc1.summary).not.toContain("Providing shared situational context");
  });

  it("Encounter 2 understanding is not an answer — it is richer context for judgement", () => {
    const graph = new KnowledgeGraph();
    runEncounter1Governance(graph);

    const concepts = graph.search("clarification");
    const governedKnowledge = governedConceptsToFormation(concepts, "hospitality");

    const enc2 = form({
      translations: [
        {
          observationId: "obs-shift-002",
          meaning:
            "Incoming staff at The Anne Arms are again reporting context gaps at shift handover.",
          confidence: 0.8,
        },
      ],
      context: shiftContext,
      knowledge: governedKnowledge,
    });

    // Understanding is richer — but it is still Understanding, not an answer.
    // The DC must still form judgement. The DC does not retrieve a predetermined response.
    expect(enc2.summary.length).toBeGreaterThan(0);
    expect(typeof enc2.confidence).toBe("number");
    expect(enc2.uncertainty).toBeDefined();
  });
});

// ── Test 5: Scope boundary — candidate concepts do not enter formation ────────

describe("Milestone 044 — Test 5: governance boundary is enforced at formation", () => {
  it("a concept still at candidate evidenceLevel is excluded from formation", () => {
    const graph = new KnowledgeGraph();

    // Directly inject a candidate concept — bypassing governance (intentional test setup).
    const candidateConcept: Concept = {
      ...proposedConcept,
      id: "candidate-concept-unearned",
      evidenceLevel: "candidate",
    };

    graph.addConcept(
      candidateConcept,
      // Construct a permitting guard result to allow the add — the test is about
      // what happens AFTER it enters the graph, not about the guard.
      {
        permitted: true,
        action: "permit",
      },
      {
        governanceId: "test-governance-bypass",
        changeIntent: "create",
        approvedBy: "Test",
        provenance: [],
      },
    );

    const concepts = graph.search("candidate");
    const knowledge = governedConceptsToFormation(concepts, "hospitality");

    // Candidate evidence level is excluded — it has not earned governance.
    expect(knowledge).toHaveLength(0);
  });
});
