/**
 * Milestone 019 — Pre-Formation Readiness Gate
 *
 * Proves that a Digital Colleague can:
 *   1. Recognise when it is not ready to form Understanding
 *   2. Identify what is missing
 *   3. Choose the correct seeking path
 *   4. Return to Formation when inputs have been acquired
 *
 * No human-authored Understanding is required at any step.
 */

import { describe, expect, it } from "@jest/globals";
import type { Observation } from "../../../../platform/cos/observation";
import type { FormationInput } from "../../../../platform/cos/understanding-formation";
import { form } from "../../../../platform/cos/understanding-formation";
import { validateFormationInputs } from "../../../../platform/cos/understanding-formation/readiness";
import { ContextStore } from "../../../onboarding/contextStore";
import type { KnowledgeAnswer } from "../../../os/types";
import {
    assembleFormationContext,
    assessReadiness,
    knowledgeAnswersToFormation,
    translateForFormation,
} from "../../formation";
import type { AnnieThought } from "../../thinking";

// ── Shared fixtures ──────────────────────────────────────────────────────────

function makeThought(overrides: Partial<AnnieThought> = {}): AnnieThought {
  return {
    stimulus: "Temperature alert received",
    confidence: 0.3,
    needsClarification: true,
    suggestedNextStep: "Gather more context.",
    ...overrides,
  };
}

// ── Test 1 — No translation: routes to "observe" ─────────────────────────────

describe("Milestone 019 — Test 1: no translation", () => {
  it("routes to observe when translations are absent", () => {
    const thought = makeThought();
    const candidateInput: Partial<FormationInput> = {
      translations: [],
      context: { situational: {}, institutional: [] },
      knowledge: [],
    };

    const decision = assessReadiness(thought, candidateInput);

    expect(decision.ready).toBe(false);
    expect(decision.nextStep).toBe("observe");
    expect(decision.gaps.length).toBeGreaterThan(0);
    expect(decision.gaps.some((g) => g.includes("translated"))).toBe(true);
  });

  it("validateFormationInputs alone confirms translations are missing", () => {
    const report = validateFormationInputs({ translations: [] });

    expect(report.structurallyReady).toBe(false);
    expect(report.structuralGaps.some((g) => g.includes("translated"))).toBe(true);
  });

  it("COS structural report contains no professional domain terms", () => {
    const report = validateFormationInputs({ translations: [] });
    const gapText = report.structuralGaps.join(" ").toLowerCase();

    const professionalTerms = ["hospitality", "fridge", "food", "safety", "temperature"];
    for (const term of professionalTerms) {
      expect(gapText).not.toContain(term);
    }
  });
});

// ── Test 2 — Missing knowledge: routes to "research" ─────────────────────────

describe("Milestone 019 — Test 2: translation present, knowledge absent", () => {
  const translatedObservations: Observation[] = [
    {
      id: "fridge-temp",
      category: "equipment",
      description: "Walk-in fridge temperature reading 8°C.",
      confidence: 0.95,
      source: "sensor",
    },
  ];

  it("routes to research when knowledge is absent", () => {
    const thought = makeThought({ confidence: 0.5, needsClarification: false });
    const translations = translateForFormation(translatedObservations);
    const context = assembleFormationContext(
      makeThought({ stimulus: "fridge alert", what: "temperature breach", confidence: 0.5, needsClarification: false }),
      [],
    );

    const candidateInput: Partial<FormationInput> = {
      translations,
      context,
      knowledge: [],
    };

    const decision = assessReadiness(thought, candidateInput);

    expect(decision.ready).toBe(false);
    expect(decision.nextStep).toBe("research");
    expect(decision.gaps.some((g) => g.includes("knowledge"))).toBe(true);
  });

  it("structural gaps name the knowledge absence without domain context", () => {
    const translations = translateForFormation(translatedObservations);
    const report = validateFormationInputs({
      translations,
      context: { situational: { urgency: "high", risk: "food safety" }, institutional: [] },
      knowledge: [],
    });

    expect(report.structurallyReady).toBe(false);
    expect(report.structuralGaps.some((g) => g.includes("knowledge"))).toBe(true);
    expect(report.structuralGaps.some((g) => g.includes("hospitality"))).toBe(false);
  });
});

// ── Test 3 — Complete inputs: routes to "form" ────────────────────────────────

describe("Milestone 019 — Test 3: complete inputs", () => {
  const fridgeObservations: Observation[] = [
    {
      id: "fridge-temp-full",
      category: "equipment",
      description: "Walk-in fridge temperature is 8°C.",
      confidence: 0.97,
      source: "sensor",
    },
  ];

  const professionalKnowledge: KnowledgeAnswer[] = [
    {
      questionId: "food-temp",
      answer: "Safe cold storage upper limit is 5°C.",
      sourceLevel: "profession",
      confidence: 1,
    },
  ];

  it("routes to form when all inputs are present and DC is confident", () => {
    const confidentThought = makeThought({
      stimulus: "Fridge temperature alert",
      what: "temperature breach",
      where: "kitchen",
      why: "food safety risk",
      confidence: 0.75,
      needsClarification: false,
    });

    const store = new ContextStore();
    store.addEntry({ category: "systems", key: "walk-in-fridge", value: "cold storage", source: "conversation" });

    const translations = translateForFormation(fridgeObservations);
    const context = assembleFormationContext(confidentThought, store.getEntries());
    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);

    const candidateInput: Partial<FormationInput> = { translations, context, knowledge };
    const decision = assessReadiness(confidentThought, candidateInput);

    expect(decision.ready).toBe(true);
    expect(decision.nextStep).toBe("form");
    expect(decision.gaps).toHaveLength(0);
  });

  it("validateFormationInputs confirms structural readiness when all inputs present", () => {
    const translations = translateForFormation(fridgeObservations);
    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);

    const report = validateFormationInputs({
      translations,
      context: { situational: { urgency: "high", risk: "food safety" }, institutional: [] },
      knowledge,
    });

    expect(report.structurallyReady).toBe(true);
    expect(report.structuralGaps).toHaveLength(0);
  });
});

// ── Test 4 — Fridge lifecycle: seek → acquire → form ─────────────────────────

describe("Milestone 019 — Test 4: fridge lifecycle without human-authored Understanding", () => {
  const rawObservation: Observation = {
    id: "fridge-lifecycle-obs",
    category: "equipment",
    description: "Walk-in fridge temperature is reading 8°C.",
    confidence: 0.97,
    source: "sensor",
  };

  it("Step 1: observation arrives — not ready, routes to observe (no translations yet)", () => {
    const thought = makeThought({ stimulus: "Temperature alert" });
    const decision = assessReadiness(thought, { translations: [], context: { situational: {}, institutional: [] }, knowledge: [] });

    expect(decision.ready).toBe(false);
    expect(decision.nextStep).toBe("observe");
    expect(decision.gaps.some((g) => g.includes("translated"))).toBe(true);
  });

  it("Step 2: translations assembled — not ready, routes to research (no knowledge yet)", () => {
    const thought = makeThought({ stimulus: "Temperature alert", what: "fridge temperature", confidence: 0.5, needsClarification: false });
    const translations = translateForFormation([rawObservation]);
    const context = assembleFormationContext(thought, []);

    expect(translations.length).toBeGreaterThan(0);

    const decision = assessReadiness(thought, { translations, context, knowledge: [] });

    expect(decision.ready).toBe(false);
    expect(decision.nextStep).toBe("research");
    expect(decision.gaps.some((g) => g.includes("knowledge"))).toBe(true);
  });

  it("Step 3: knowledge acquired — ready to form", () => {
    const thought = makeThought({
      stimulus: "Temperature alert",
      what: "fridge temperature breach",
      why: "food safety risk",
      where: "kitchen",
      confidence: 0.75,
      needsClarification: false,
    });

    const store = new ContextStore();
    store.addEntry({ category: "knowledge", key: "food-safety", value: "SFBB", source: "document" });

    const translations = translateForFormation([rawObservation]);
    const context = assembleFormationContext(thought, store.getEntries());
    const knowledge = knowledgeAnswersToFormation([
      { questionId: "q1", answer: "Safe cold storage upper limit is 5°C.", sourceLevel: "profession", confidence: 1 },
      { questionId: "q2", answer: "Food safety breaches require human authority.", sourceLevel: "helping-hand", confidence: 1 },
    ]);

    const decision = assessReadiness(thought, { translations, context, knowledge });

    expect(decision.ready).toBe(true);
    expect(decision.nextStep).toBe("form");
  });

  it("Step 4: form() produces Understanding from DC-assembled inputs — no hand-authored Understanding", () => {
    const thought = makeThought({
      stimulus: "Temperature alert",
      what: "fridge temperature breach",
      why: "food safety risk",
      confidence: 0.75,
      needsClarification: false,
    });

    const store = new ContextStore();
    store.addEntry({ category: "systems", key: "fridge", value: "cold storage", source: "conversation" });

    const translations = translateForFormation([rawObservation]);
    const context = assembleFormationContext(thought, store.getEntries());
    const knowledge = knowledgeAnswersToFormation([
      { questionId: "q1", answer: "Safe cold storage upper limit is 5°C.", sourceLevel: "profession", confidence: 1 },
      { questionId: "q2", answer: "Food safety breaches require human authority.", sourceLevel: "helping-hand", confidence: 1 },
    ]);

    // Gate confirms readiness
    const decision = assessReadiness(thought, { translations, context, knowledge });
    expect(decision.ready).toBe(true);

    // DC calls form() — Understanding is produced without human authorship
    const understanding = form({ translations, context, knowledge });

    expect(understanding.summary.length).toBeGreaterThan(0);
    expect(understanding.evidenceChain).toContain("fridge-lifecycle-obs");
    expect(understanding.completeness).toBeDefined();
    expect(understanding.confidence).toBeGreaterThan(0);
  });
});
