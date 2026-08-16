import { describe, expect, it } from "@jest/globals";
import { JudgementEngine } from "../../../../lib/judgement/JudgementEngine";
import { form } from "../formation";
import type { FormationContext, FormationInput, FormationKnowledge, Translation } from "../types";

// Fridge safety scenario — previously hand-authored in scripts/test-companion-intelligence-cycle.ts.
// This test proves that formation can produce equivalent Understanding from structured inputs,
// and that JudgementEngine consumes it without modification.

const fridgeTranslations: Translation[] = [
  {
    observationId: "obs-fridge-temp-001",
    meaning:
      "Fridge temperature is reading 10.2°C, above the safe food storage upper limit of 5°C.",
    confidence: 0.95,
  },
  {
    observationId: "obs-fridge-stock-001",
    meaning:
      "Staff are unsure whether food stock remains safe given the elevated temperature.",
    confidence: 0.6,
  },
];

const fridgeContext: FormationContext = {
  situational: {
    urgency: "high",
    risk: "food safety",
    where: "walk-in fridge",
    what: "temperature breach above safe storage limit",
    who: "duty manager not yet informed",
  },
  institutional: [
    { category: "equipment", key: "walk-in-fridge", value: "primary food storage" },
  ],
};

const fridgeKnowledge: FormationKnowledge[] = [
  {
    principle: "Safe upper limit for food storage is 5°C.",
    evidenceLevel: "professional",
  },
  {
    principle: "Food safety incidents require qualified human authority before stock decisions.",
    evidenceLevel: "professional",
  },
];

const fridgeInput: FormationInput = {
  translations: fridgeTranslations,
  context: fridgeContext,
  knowledge: fridgeKnowledge,
};

describe("Understanding Formation — fridge safety scenario", () => {
  it("produces a non-empty summary from translated observations", () => {
    const understanding = form(fridgeInput);

    expect(understanding.summary.length).toBeGreaterThan(0);
    expect(understanding.summary).not.toBe(
      "No observations have been translated. Understanding cannot be formed.",
    );
  });

  it("produces confidence between 0 and 1 without accepting it as input", () => {
    const understanding = form(fridgeInput);

    expect(understanding.confidence).toBeGreaterThan(0);
    expect(understanding.confidence).toBeLessThanOrEqual(1);
  });

  it("produces uncertainty that reflects incomplete stock safety information", () => {
    const understanding = form(fridgeInput);

    expect(understanding.uncertainty.length).toBeGreaterThan(0);
  });

  it("populates the evidence chain with contributing observation IDs", () => {
    const understanding = form(fridgeInput);

    expect(understanding.evidenceChain).toContain("obs-fridge-temp-001");
    expect(understanding.evidenceChain).toContain("obs-fridge-stock-001");
  });

  it("assesses completeness from the inputs", () => {
    const understanding = form(fridgeInput);

    expect(understanding.completeness).toBeDefined();
    expect(["sufficient", "partial", "insufficient"]).toContain(
      understanding.completeness,
    );
  });

  it("can be consumed by JudgementEngine without modification", () => {
    const understanding = form(fridgeInput);
    const engine = new JudgementEngine();

    const judgement = engine.judge({ understanding });

    expect(judgement).toBeDefined();
    expect(judgement.disposition).toBeDefined();
    expect(judgement.selected).toBeDefined();
    expect(judgement.understanding.summary).toBe(understanding.summary);
  });

  it("produces a disposition of caution or human-required given food safety risk", () => {
    const understanding = form(fridgeInput);
    const engine = new JudgementEngine();

    const judgement = engine.judge({ understanding });

    expect(["caution", "human-required"]).toContain(judgement.disposition);
  });

  it("does not produce a proceed disposition for a food safety breach", () => {
    const understanding = form(fridgeInput);
    const engine = new JudgementEngine();

    const judgement = engine.judge({ understanding });

    expect(judgement.disposition).not.toBe("proceed");
  });

  it("carries timestamps", () => {
    const understanding = form(fridgeInput);

    expect(understanding.createdAt).toBeTruthy();
    expect(understanding.updatedAt).toBeTruthy();
  });
});

describe("Understanding Formation — empty inputs", () => {
  it("handles empty translations gracefully", () => {
    const emptyInput: FormationInput = {
      translations: [],
      context: {
        situational: { urgency: "low" },
        institutional: [],
      },
      knowledge: [],
    };

    const understanding = form(emptyInput);

    expect(understanding.confidence).toBe(0);
    expect(understanding.completeness).toBe("insufficient");
    expect(understanding.evidenceChain).toHaveLength(0);
    expect(understanding.uncertainty.length).toBeGreaterThan(0);
  });

  it("produces an insufficient Understanding that JudgementEngine routes to ask", () => {
    const emptyInput: FormationInput = {
      translations: [],
      context: { situational: {}, institutional: [] },
      knowledge: [],
    };

    const understanding = form(emptyInput);
    const engine = new JudgementEngine();
    const judgement = engine.judge({ understanding });

    expect(judgement.disposition).toBe("insufficient");
    expect(judgement.selected.kind).toBe("ask");
  });
});
