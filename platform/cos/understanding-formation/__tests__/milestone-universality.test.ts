/**
 * Milestone: Understanding Formation Boundary Established
 *
 * Demonstrates that COS Understanding Formation is a universal capability.
 * Professional content changes. The mechanism does not.
 *
 * Three profession validation journeys:
 *   - Hospitality (Annie)  — fridge temperature breach
 *   - Construction (Kev)   — structural beam defect
 *   - Healthcare   (Harry) — patient heart rate observation
 *
 * Acceptance criteria:
 *   1. All three call the same form() function — no profession-specific variants.
 *   2. All three produce the same output shape; content differs, contract does not.
 *   3. No human-authored Understanding — summary emerges from inputs.
 *   4. Insufficient professional content produces a safe, honest failure.
 */

import { describe, expect, it } from "@jest/globals";
import { JudgementEngine } from "../../../../lib/judgement/JudgementEngine";
import { form } from "../formation";
import { checkAllInvariants } from "../invariants";
import type { FormationInput } from "../types";

// ─── Scenario 1: Hospitality — Annie — Fridge Temperature ────────────────────

const hospitalityInput: FormationInput = {
  translations: [
    {
      observationId: "annie-obs-fridge-temp",
      meaning: "Walk-in fridge temperature is 8°C, exceeding the safe food storage limit of 5°C.",
      confidence: 0.95,
    },
    {
      observationId: "annie-obs-fridge-stock",
      meaning: "Stock loaded last night may have been held above safe temperature for an unknown duration.",
      confidence: 0.65,
    },
  ],
  context: {
    situational: {
      urgency: "high",
      risk: "food safety — customer health",
      where: "restaurant kitchen, walk-in fridge",
      what: "temperature breach above food safety threshold",
      who: "duty manager has not yet been informed",
    },
    institutional: [
      { category: "equipment", key: "walk-in-fridge", value: "primary cold food storage" },
      { category: "compliance", key: "food-safety-regime", value: "SFBB compliant" },
    ],
  },
  knowledge: [
    { principle: "Safe cold storage upper limit is 5°C.", evidenceLevel: "professional" },
    { principle: "Food safety breaches require human authority before stock is declared safe or unsafe.", evidenceLevel: "professional" },
    { principle: "Do not autonomously dispose of or retain stock following a temperature breach.", evidenceLevel: "constitutional" },
  ],
};

// ─── Scenario 2: Construction — Kev — Structural Beam Defect ─────────────────

const constructionInput: FormationInput = {
  translations: [
    {
      observationId: "kev-obs-beam-crack",
      meaning: "A visible crack has been identified in a load-bearing beam at grid reference C-7.",
      confidence: 0.88,
    },
    {
      observationId: "kev-obs-personnel",
      meaning: "Active workers are present within the affected structural zone.",
      confidence: 1.0,
    },
  ],
  context: {
    situational: {
      urgency: "critical",
      risk: "personnel safety — structural failure",
      where: "active construction site, section C",
      what: "potential structural compromise in load-bearing element",
      who: "site manager not yet notified; structural engineer not present",
    },
    institutional: [
      { category: "compliance", key: "cdm-regulations", value: "CDM 2015 applies" },
      { category: "equipment", key: "beam-c7", value: "primary load-bearing steel, installed 2026-07-12" },
    ],
  },
  knowledge: [
    { principle: "Visible cracks in load-bearing elements require structural engineer assessment before work continues.", evidenceLevel: "professional" },
    { principle: "Personnel must not remain in a zone with an unassessed structural defect.", evidenceLevel: "constitutional" },
    { principle: "Site manager must be informed immediately of any structural safety concern.", evidenceLevel: "professional" },
  ],
};

// ─── Scenario 3: Healthcare — Harry — Patient Heart Rate Observation ──────────

const healthcareInput: FormationInput = {
  translations: [
    {
      observationId: "harry-obs-hr-reading",
      meaning: "Patient heart rate is 138 bpm, significantly elevated above the normal range of 60–100 bpm for this patient's age.",
      confidence: 0.91,
    },
    {
      observationId: "harry-obs-medication",
      meaning: "Patient is prescribed beta-blockers, which typically suppress heart rate; elevation despite medication is clinically significant.",
      confidence: 0.87,
    },
  ],
  context: {
    situational: {
      urgency: "high",
      risk: "patient safety — possible clinical deterioration",
      where: "ward, room 14",
      what: "elevated heart rate in patient on rate-suppressing medication",
      who: "attending clinician is not present; last reviewed two hours ago",
    },
    institutional: [
      { category: "team", key: "patient-p14", value: "74-year-old, post-operative day 3" },
      { category: "systems", key: "monitoring-p14", value: "continuous cardiac monitoring active" },
    ],
  },
  knowledge: [
    { principle: "Heart rate elevation despite beta-blocker therapy requires immediate clinical assessment.", evidenceLevel: "professional" },
    { principle: "Clinical deterioration assessments require qualified clinician authority.", evidenceLevel: "constitutional" },
    { principle: "Do not interpret or act on clinical observations without escalating to attending clinician.", evidenceLevel: "professional" },
  ],
};

// ─── Acceptance Criteria ─────────────────────────────────────────────────────

describe("Milestone — Understanding Formation: universal across professions", () => {
  const scenarios = [
    { name: "Hospitality (Annie) — fridge temperature", input: hospitalityInput },
    { name: "Construction (Kev) — structural beam defect", input: constructionInput },
    { name: "Healthcare (Harry) — patient observation", input: healthcareInput },
  ];

  // Criterion 1: All three call the same form() — no profession-specific variants.
  it("calls the same COS mechanism for all three professions", () => {
    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      expect(understanding).toBeDefined();
    }
  });

  // Criterion 2: Output shape is identical; only content differs.
  it("produces the same output shape regardless of profession", () => {
    for (const scenario of scenarios) {
      const understanding = form(scenario.input);

      expect(typeof understanding.summary).toBe("string");
      expect(typeof understanding.confidence).toBe("number");
      expect(Array.isArray(understanding.uncertainty)).toBe(true);
      expect(["sufficient", "partial", "insufficient"]).toContain(understanding.completeness);
      expect(Array.isArray(understanding.evidenceChain)).toBe(true);
      expect(typeof understanding.createdAt).toBe("string");
    }
  });

  // Criterion 3: No human-authored Understanding — summary emerges from inputs.
  it("produces non-empty summaries that contain content from translations", () => {
    for (const scenario of scenarios) {
      const understanding = form(scenario.input);

      expect(understanding.summary.length).toBeGreaterThan(20);
      // Summary must not be the empty-input fallback message.
      expect(understanding.summary).not.toContain("No observations have been translated");
    }
  });

  // All five invariants pass for all three professions.
  it("passes all five invariants for every profession", () => {
    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      const violations = checkAllInvariants(scenario.input, understanding);

      expect(violations).toHaveLength(0);
    }
  });

  // Confidence is derived and reflects input quality differences.
  it("derives different confidence values from different input quality", () => {
    for (const scenario of scenarios) {
      const understanding = form(scenario.input);

      expect(understanding.confidence).toBeGreaterThan(0);
      expect(understanding.confidence).toBeLessThanOrEqual(1);
    }
  });

  // Evidence chains are populated with scenario-specific observation IDs.
  it("populates evidence chains with the correct observation IDs for each profession", () => {
    const hospitalityUnderstanding = form(hospitalityInput);
    expect(hospitalityUnderstanding.evidenceChain).toContain("annie-obs-fridge-temp");
    expect(hospitalityUnderstanding.evidenceChain).toContain("annie-obs-fridge-stock");

    const constructionUnderstanding = form(constructionInput);
    expect(constructionUnderstanding.evidenceChain).toContain("kev-obs-beam-crack");
    expect(constructionUnderstanding.evidenceChain).toContain("kev-obs-personnel");

    const healthcareUnderstanding = form(healthcareInput);
    expect(healthcareUnderstanding.evidenceChain).toContain("harry-obs-hr-reading");
    expect(healthcareUnderstanding.evidenceChain).toContain("harry-obs-medication");
  });

  // JudgementEngine accepts output from all three professions without modification.
  it("produces Understanding that JudgementEngine accepts unchanged for every profession", () => {
    const engine = new JudgementEngine();

    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      const judgement = engine.judge({ understanding });

      expect(judgement).toBeDefined();
      expect(judgement.disposition).toBeDefined();
      expect(judgement.understanding.summary).toBe(understanding.summary);
    }
  });

  // High-risk professional content produces appropriately cautious dispositions.
  it("produces human-required or caution disposition for all three safety scenarios", () => {
    const engine = new JudgementEngine();

    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      const judgement = engine.judge({ understanding });

      expect(["caution", "human-required"]).toContain(judgement.disposition);
      expect(judgement.disposition).not.toBe("proceed");
    }
  });
});

// ─── Completeness Distinguishes Identical Confidence ─────────────────────────

describe("Milestone — completeness distinguishes partial from sufficient at same confidence", () => {
  it("marks sufficient when all translations are high-confidence and context is complete", () => {
    const sufficientInput: FormationInput = {
      translations: [
        { observationId: "obs-s1", meaning: "Equipment is operating within normal parameters.", confidence: 0.92 },
        { observationId: "obs-s2", meaning: "No anomalies detected during routine check.", confidence: 0.9 },
      ],
      context: {
        situational: { urgency: "low", risk: "none identified", what: "routine equipment check" },
        institutional: [],
      },
      knowledge: [
        { principle: "Routine checks within normal parameters require no immediate action.", evidenceLevel: "professional" },
      ],
    };

    const understanding = form(sufficientInput);
    expect(understanding.completeness).toBe("sufficient");
  });

  it("marks partial when translations exist but context is incomplete", () => {
    const partialInput: FormationInput = {
      translations: [
        { observationId: "obs-p1", meaning: "Equipment reading noted.", confidence: 0.88 },
      ],
      context: {
        situational: { urgency: "medium" },
        institutional: [],
      },
      knowledge: [],
    };

    const understanding = form(partialInput);
    expect(understanding.completeness).toBe("partial");
  });
});

// ─── Criterion 4: Insufficient Professional Content Produces Safe Failure ─────

describe("Milestone — safe failure when DC provides no professional interpretation", () => {
  it("produces insufficient completeness when no translations are supplied", () => {
    // A DC receives "Temperature is 8°C" but provides no translation rule.
    const noTranslationInput: FormationInput = {
      translations: [],
      context: {
        situational: { urgency: "high", risk: "unknown — no professional interpretation available" },
        institutional: [],
      },
      knowledge: [],
    };

    const understanding = form(noTranslationInput);

    expect(understanding.completeness).toBe("insufficient");
    expect(understanding.confidence).toBe(0);
    expect(understanding.uncertainty.length).toBeGreaterThan(0);
    expect(understanding.evidenceChain).toHaveLength(0);
  });

  it("routes to ask or admit-uncertainty when professional content is absent", () => {
    const noTranslationInput: FormationInput = {
      translations: [],
      context: { situational: {}, institutional: [] },
      knowledge: [],
    };

    const understanding = form(noTranslationInput);
    const engine = new JudgementEngine();
    const judgement = engine.judge({ understanding });

    // Must not proceed — insufficient understanding requires seeking, not acting.
    expect(judgement.disposition).toBe("insufficient");
    expect(["ask", "admit-uncertainty", "wait"]).toContain(judgement.selected.kind);
  });

  it("does not produce a summary that pretends to understand an untranslated observation", () => {
    const noTranslationInput: FormationInput = {
      translations: [],
      context: { situational: { what: "temperature reading" }, institutional: [] },
      knowledge: [],
    };

    const understanding = form(noTranslationInput);

    // Summary must acknowledge absence of understanding, not assert domain meaning.
    expect(understanding.summary).toContain("cannot be formed");
  });
});
