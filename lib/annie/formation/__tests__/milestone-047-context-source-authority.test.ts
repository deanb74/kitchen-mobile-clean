/**
 * Milestone 047 — Context Source Authority
 *
 * Proves: Helping Hand can carry the origin and authority of understanding
 * from source to governance without losing context.
 *
 * Seven proof conditions:
 *   PC1 — source: "venue-context" survives contextEntriesToInstitutional()
 *   PC2 — source: "venue-profile" survives venueProfileToInstitutional()
 *   PC3 — Understanding.contextSources is populated by form()
 *   PC4 — Understanding.contextSources contains "relationship" when present
 *   PC5 — LearningProposal.informedByPersonContext is true when contextSources has "relationship"
 *   PC6 — KnowledgeGovernanceEngine requires reviewer when informedByPersonContext is true
 *   PC7 — A proposal from relationship context cannot be approved without reviewedBy
 */

import { describe, expect, it } from "@jest/globals";
import { form } from "../../../../platform/cos/understanding-formation";
import type { FormationInstitutionalContext } from "../../../../platform/cos/understanding-formation/types";
import type { Execution } from "../../../execution/Execution";
import { KnowledgeGovernanceEngine } from "../../../knowledge-governance/KnowledgeGovernanceEngine";
import type { Concept } from "../../../knowledge/Concept";
import { LearningEngine } from "../../../learning/LearningEngine";
import type { ContextEntry } from "../../../onboarding/contextStore";
import type { VenueKnowledgeProfile } from "../../../os/knowledge/applicability";
import type { KnowledgeAnswer } from "../../../os/types";
import { ReflectionEngine } from "../../../reflection/ReflectionEngine";
import type { AnnieThought } from "../../thinking";
import {
    assembleFormationContext,
    contextEntriesToInstitutional,
    venueProfileToInstitutional,
} from "../contextAdapter";
import { governedConceptsToFormation } from "../governedKnowledgeAdapter";
import { knowledgeAnswerToFormation } from "../knowledgeAdapter";

const NOW = "2026-08-06T13:00:00.000Z";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const contextEntry: ContextEntry = {
  id: "ctx-001",
  category: "venue",
  key: "venue-type",
  value: "pub",
  source: "conversation",
  createdAt: NOW,
  updatedAt: NOW,
};

const venueProfile: VenueKnowledgeProfile = {
  venueId: "anne-arms",
  professions: ["hospitality"],
  region: "UK-Yorkshire",
  venueTypes: ["pub"],
  departments: ["bar"],
  equipment: ["dishwasher"],
  capabilities: [],
  facts: [],
  createdAt: NOW,
  updatedAt: NOW,
};

const thought: AnnieThought = {
  stimulus: "shift handover",
  who: "incoming staff",
  what: "shift transition",
  where: "The Anne Arms",
  why: "operational continuity",
  confidence: 0.75,
  needsClarification: false,
  suggestedNextStep: "Capture venue and relationship context before governance review.",
};

const relationshipEntry: FormationInstitutionalContext = {
  category: "communication",
  key: "preference",
  value: "Sarah prefers written instructions.",
  source: "relationship",
};

const minimalTranslation = {
  observationId: "obs-001",
  meaning: "Shift context was unclear at handover.",
  confidence: 0.8,
};

const minimalExecution: Execution = {
  id: "exec-047",
  action: {
    id: "action-047",
    kind: "advise",
    disposition: "execute",
    state: "completed",
    instruction: "Advise on shift handover.",
    boundaries: [],
  },
  permitted: true,
  attempted: true,
  outcome: "failed",
  summary: "Annie attempted to advise on shift handover but context was insufficient.",
  effect: "internal",
  evidence: [{ type: "note", detail: "Shift context gap reported.", at: NOW }],
  completedAt: NOW,
  createdAt: NOW,
  updatedAt: NOW,
};

// ── PC1 — source: "venue-context" survives contextEntriesToInstitutional() ────

describe("Milestone 047 — PC1: venue-context source survives adapter", () => {
  it("contextEntriesToInstitutional() sets source: 'venue-context'", () => {
    const result = contextEntriesToInstitutional([contextEntry]);
    expect(result[0]?.source).toBe("venue-context");
  });

  it("all entries from contextEntriesToInstitutional() carry source: 'venue-context'", () => {
    const entries: ContextEntry[] = [
      { ...contextEntry, id: "a", key: "a" },
      { ...contextEntry, id: "b", key: "b" },
    ];
    const result = contextEntriesToInstitutional(entries);
    expect(result.every((e) => e.source === "venue-context")).toBe(true);
  });
});

// ── PC2 — source: "venue-profile" survives venueProfileToInstitutional() ─────

describe("Milestone 047 — PC2: venue-profile source survives adapter", () => {
  it("venueProfileToInstitutional() sets source: 'venue-profile' on all entries", () => {
    const result = venueProfileToInstitutional(venueProfile);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((e) => e.source === "venue-profile")).toBe(true);
  });
});

// ── PC3 — Understanding.contextSources populated by form() ───────────────────

describe("Milestone 047 — PC3: Understanding.contextSources is populated", () => {
  it("form() populates contextSources from institutional entries that carry source", () => {
    const context = assembleFormationContext(thought, [contextEntry], venueProfile);
    const understanding = form({
      translations: [minimalTranslation],
      context,
      knowledge: [],
    });

    expect(understanding.contextSources).toBeDefined();
    expect(understanding.contextSources).toContain("venue-context");
    expect(understanding.contextSources).toContain("venue-profile");
  });

  it("contextSources is deduplicated when sources repeat", () => {
    const context = assembleFormationContext(thought, [contextEntry, { ...contextEntry, id: "ctx-002", key: "b" }]);
    const understanding = form({ translations: [minimalTranslation], context, knowledge: [] });

    const venueContextCount = understanding.contextSources?.filter((s) => s === "venue-context").length ?? 0;
    expect(venueContextCount).toBe(1);
  });

  it("contextSources is empty when no institutional entries carry source", () => {
    const context = { situational: { urgency: "low" as const }, institutional: [] };
    const understanding = form({ translations: [minimalTranslation], context, knowledge: [] });

    expect(understanding.contextSources).toEqual([]);
  });
});

// ── PC4 — contextSources contains "relationship" when relationship context used

describe("Milestone 047 — PC4: relationship source is recorded in Understanding", () => {
  it("Understanding.contextSources contains 'relationship' when a relationship entry is present", () => {
    const context = {
      situational: thought,
      institutional: [relationshipEntry],
    };
    const understanding = form({ translations: [minimalTranslation], context, knowledge: [] });

    expect(understanding.contextSources).toContain("relationship");
  });

  it("Understanding.contextSources does NOT contain 'relationship' for venue-only context", () => {
    const context = assembleFormationContext(thought, [contextEntry]);
    const understanding = form({ translations: [minimalTranslation], context, knowledge: [] });

    expect(understanding.contextSources).not.toContain("relationship");
  });
});

// ── PC5 — LearningProposal.informedByPersonContext is set ────────────────────

describe("Milestone 047 — PC5: LearningProposal.informedByPersonContext set from contextSources", () => {
  it("informedByPersonContext is true when reflection carried relationship contextSources", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: minimalExecution,
      reflectionId: "reflection-047",
      now: NOW,
      understandingContextSources: ["relationship"],
    });

    const learning = new LearningEngine().build({
      reflection,
      learningId: "learning-047",
      now: NOW,
    });

    expect(learning.proposal?.informedByPersonContext).toBe(true);
  });

  it("informedByPersonContext is undefined when contextSources contains only venue-context", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: minimalExecution,
      reflectionId: "reflection-047b",
      now: NOW,
      understandingContextSources: ["venue-context"],
    });

    const learning = new LearningEngine().build({
      reflection,
      learningId: "learning-047b",
      now: NOW,
    });

    expect(learning.proposal?.informedByPersonContext).toBeUndefined();
  });
});

// ── PC6 + PC7 — Governance requires reviewer when informedByPersonContext ─────

describe("Milestone 047 — PC6/PC7: governance gate on person-context proposals", () => {
  it("KnowledgeGovernanceEngine.build() with informedByPersonContext:true requires reviewedBy", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: minimalExecution,
      reflectionId: "reflection-047c",
      now: NOW,
      understandingContextSources: ["relationship"],
    });

    const learning = new LearningEngine().build({
      reflection,
      learningId: "learning-047c",
      now: NOW,
    });

    expect(learning.proposal?.informedByPersonContext).toBe(true);
    expect(learning.requiresHuman).toBe(true);

    // Attempting to approve without reviewedBy/reviewedAt must throw.
    expect(() =>
      new KnowledgeGovernanceEngine().build({
        learning,
        decision: "approve",
        changeIntent: "create",
        rationale: "De-identification not confirmed.",
        // reviewedBy deliberately absent
        now: NOW,
      }),
    ).toThrow();
  });

  it("provides a path to approval when de-identification is explicitly confirmed by a named reviewer", () => {
    const reflection = new ReflectionEngine().reflect({
      execution: minimalExecution,
      reflectionId: "reflection-047d",
      now: NOW,
      understandingContextSources: ["relationship"],
    });

    const learning = new LearningEngine().build({
      reflection,
      learningId: "learning-047d",
      now: NOW,
    });

    // With named reviewer — governance approves the de-identified proposal.
    expect(() =>
      new KnowledgeGovernanceEngine().build({
        learning,
        decision: "approve",
        changeIntent: "create",
        rationale: "Personal preference de-identified to professional pattern. Reviewed.",
        reviewedBy: "Hospitality HQ",
        reviewedAt: NOW,
        now: NOW,
      }),
    ).not.toThrow();
  });
});

// ── Knowledge source type ─────────────────────────────────────────────────────

describe("Milestone 047 — sourceType preserved on FormationKnowledge", () => {
  it("governedConceptsToFormation() sets sourceType: 'knowledge-graph'", () => {
    const concept: Concept = {
      id: "test-c",
      name: "Test",
      aliases: [],
      definition: "A test concept.",
      status: "validated",
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
    };
    const result = governedConceptsToFormation([concept], "hospitality");
    expect(result[0]?.sourceType).toBe("knowledge-graph");
  });

  it("knowledgeAnswerToFormation() sets sourceType: 'os-routing'", () => {
    const answer: KnowledgeAnswer = {
      questionId: "q-001",
      answer: "Food should be stored at 5°C.",
      sourceLevel: "profession",
    };
    const result = knowledgeAnswerToFormation(answer);
    expect(result.sourceType).toBe("os-routing");
  });
});
