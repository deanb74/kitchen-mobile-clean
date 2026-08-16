/**
 * Milestone 016 — Fridge End-to-End Scenario
 *
 * Proves the complete Formation input path:
 *
 *   Observation
 *       ↓  DC: translateForFormation()
 *   Translation[]
 *       ↓  DC: assembleFormationContext()
 *   FormationContext
 *       ↓  DC: knowledgeAnswersToFormation()
 *   FormationKnowledge[]
 *       ↓  COS: form()
 *   Understanding
 *       ↓  JudgementEngine
 *   Judgement
 *
 * No input is hand-authored. Every Formation input comes from a DC adapter.
 */

import { describe, expect, it } from "@jest/globals";
import { JudgementEngine } from "../../../../lib/judgement/JudgementEngine";
import type { Observation } from "../../../../platform/cos/observation";
import { form } from "../../../../platform/cos/understanding-formation";
import { ContextStore } from "../../../onboarding/contextStore";
import type { KnowledgeAnswer } from "../../../os/types";
import {
    assembleFormationContext,
    knowledgeAnswersToFormation,
    translateForFormation,
} from "../../formation";
import type { AnnieThought } from "../../thinking";

// ── Scenario: Walk-in fridge at 8°C ─────────────────────────────────────────

const fridgeObservations: Observation[] = [
  {
    id: "fridge-temp-reading",
    category: "equipment",
    description: "Walk-in fridge temperature is reading 8°C.",
    confidence: 0.97,
    source: "sensor",
  },
  {
    id: "fridge-stock-condition",
    category: "equipment",
    description: "Stock loaded last night may have been held at elevated temperature.",
    confidence: 0.65,
    source: "human",
  },
];

const annieSituation: AnnieThought = {
  stimulus: "Fridge temperature alert",
  who: "duty manager",
  what: "walk-in fridge above safe temperature",
  where: "kitchen — cold storage area",
  why: "food safety risk",
  confidence: 0.55,
  needsClarification: true,
  suggestedNextStep: "Assess food safety status and inform duty manager.",
};

const venueContextStore = (() => {
  const store = new ContextStore();
  store.addEntry({ category: "systems", key: "walk-in-fridge", value: "primary cold food storage", source: "conversation" });
  store.addEntry({ category: "knowledge", key: "food-safety-regime", value: "SFBB compliant", source: "document" });
  return store;
})();

const professionalKnowledge: KnowledgeAnswer[] = [
  {
    questionId: "food-storage-temperature",
    answer: "Safe cold storage upper limit is 5°C. Readings above 5°C require immediate food safety assessment.",
    sourceLevel: "profession",
    confidence: 1,
    approvedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    questionId: "food-safety-authority",
    answer: "Food safety breaches require human authority before stock is declared safe or unsafe.",
    sourceLevel: "helping-hand",
    confidence: 1,
    approvedAt: "2026-07-01T00:00:00.000Z",
  },
];

describe("Milestone 016 — fridge scenario end-to-end", () => {
  it("Step 1: DC adapter produces Translation[] from observations without hand-authoring", () => {
    const translations = translateForFormation(fridgeObservations);

    expect(translations.length).toBeGreaterThan(0);

    const ids = translations.map((t) => t.observationId);
    expect(ids).toContain("fridge-temp-reading");
  });

  it("Step 2: DC adapter assembles FormationContext from AnnieThought + ContextStore", () => {
    const context = assembleFormationContext(
      annieSituation,
      venueContextStore.getEntries(),
    );

    expect(context.situational.what).toBe("walk-in fridge above safe temperature");
    expect(context.situational.urgency).toBeDefined();
    expect(context.institutional.length).toBeGreaterThan(0);
    expect(context.institutional.some((e) => e.category === "systems")).toBe(true);
  });

  it("Step 3: DC adapter converts KnowledgeAnswer[] to FormationKnowledge[] preserving provenance", () => {
    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);

    expect(knowledge).toHaveLength(2);

    const profEntry = knowledge.find((k) => k.principle.includes("5°C"));
    expect(profEntry?.evidenceLevel).toBe("professional");

    const constEntry = knowledge.find((k) => k.principle.includes("human authority"));
    expect(constEntry?.evidenceLevel).toBe("constitutional");
  });

  it("Step 4: COS form() accepts DC-assembled inputs and produces Understanding", () => {
    const translations = translateForFormation(fridgeObservations);
    const context = assembleFormationContext(annieSituation, venueContextStore.getEntries());
    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);

    const understanding = form({ translations, context, knowledge });

    expect(understanding.summary.length).toBeGreaterThan(0);
    expect(understanding.confidence).toBeGreaterThan(0);
    expect(understanding.evidenceChain).toContain("fridge-temp-reading");
    expect(understanding.completeness).toBeDefined();
  });

  it("Step 5: JudgementEngine accepts Understanding without modification", () => {
    const translations = translateForFormation(fridgeObservations);
    const context = assembleFormationContext(annieSituation, venueContextStore.getEntries());
    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);

    const understanding = form({ translations, context, knowledge });
    const engine = new JudgementEngine();
    const judgement = engine.judge({ understanding });

    expect(judgement.disposition).toBeDefined();
    expect(judgement.understanding.summary).toBe(understanding.summary);
  });

  it("Step 6: Food safety risk produces caution or human-required disposition", () => {
    const translations = translateForFormation(fridgeObservations);
    const context = assembleFormationContext(annieSituation, venueContextStore.getEntries());
    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);

    const understanding = form({ translations, context, knowledge });
    const engine = new JudgementEngine();
    const judgement = engine.judge({ understanding });

    expect(["caution", "human-required"]).toContain(judgement.disposition);
    expect(judgement.disposition).not.toBe("proceed");
  });

  it("No human-authored Understanding anywhere in the chain", () => {
    // Every input comes from a DC adapter. This test verifies the full chain
    // does not use any manually constructed Understanding object.
    const translations = translateForFormation(fridgeObservations);
    expect(translations).toBeDefined();

    const context = assembleFormationContext(annieSituation, venueContextStore.getEntries());
    expect(context.situational).toBeDefined();

    const knowledge = knowledgeAnswersToFormation(professionalKnowledge);
    expect(knowledge).toBeDefined();

    const understanding = form({ translations, context, knowledge });
    // If we reach here without hand-writing Understanding, the chain is proven.
    expect(understanding.createdAt).toBeTruthy();
  });
});
