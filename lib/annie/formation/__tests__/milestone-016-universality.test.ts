/**
 * Milestone 016 — Universality and Boundary Tests
 *
 * 1. Universality: Annie, Kev and Harry all supply inputs to the same form().
 *    No AnnieFormation(), KevFormation(), HarryFormation() exists.
 *
 * 2. Boundary tests:
 *    - COS source files contain no professional domain terms.
 *    - Venue knowledge (sourceLevel "venue") becomes evidenceLevel "local" only.
 *    - Professional knowledge does not become "constitutional".
 *    - Helping Hand HQ knowledge becomes "constitutional" only.
 */

import { describe, expect, it } from "@jest/globals";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { JudgementEngine } from "../../../../lib/judgement/JudgementEngine";
import type { FormationInput } from "../../../../platform/cos/understanding-formation";
import { form } from "../../../../platform/cos/understanding-formation";
import type { KnowledgeAnswer } from "../../../os/types";
import { knowledgeAnswerToFormation, knowledgeAnswersToFormation } from "../../formation";

// ── Universality: three professions, one mechanism ───────────────────────────

const hospitalityInput: FormationInput = {
  translations: [
    { observationId: "h-obs-1", meaning: "Walk-in fridge temperature exceeds safe food storage limit of 5°C.", confidence: 0.95 },
    { observationId: "h-obs-2", meaning: "Food stock may have been held at elevated temperature overnight.", confidence: 0.65 },
  ],
  context: {
    situational: { urgency: "high", risk: "food safety", where: "kitchen", what: "temperature breach" },
    institutional: [{ category: "compliance", key: "food-safety", value: "SFBB" }],
  },
  knowledge: [
    { principle: "Safe cold storage upper limit is 5°C.", evidenceLevel: "professional" },
    { principle: "Food safety breaches require human authority.", evidenceLevel: "constitutional" },
  ],
};

const constructionInput: FormationInput = {
  translations: [
    { observationId: "k-obs-1", meaning: "A visible crack in a load-bearing beam requires structural engineer assessment.", confidence: 0.88 },
    { observationId: "k-obs-2", meaning: "Workers are in the immediate zone of the unassessed structural element.", confidence: 1.0 },
  ],
  context: {
    situational: { urgency: "critical", risk: "personnel safety", where: "section C", what: "structural defect" },
    institutional: [{ category: "compliance", key: "cdm", value: "CDM 2015" }],
  },
  knowledge: [
    { principle: "Cracks in load-bearing elements require structural engineer assessment before work continues.", evidenceLevel: "professional" },
    { principle: "Personnel must not remain in a zone with an unassessed structural defect.", evidenceLevel: "constitutional" },
  ],
};

const healthcareInput: FormationInput = {
  translations: [
    { observationId: "harry-obs-1", meaning: "Heart rate is 138 bpm, significantly above the age-adjusted normal range.", confidence: 0.91 },
    { observationId: "harry-obs-2", meaning: "Beta-blocker medication makes this elevation clinically significant.", confidence: 0.87 },
  ],
  context: {
    situational: { urgency: "high", risk: "patient safety", where: "ward room 14", what: "elevated heart rate" },
    institutional: [{ category: "systems", key: "monitoring", value: "continuous cardiac monitoring active" }],
  },
  knowledge: [
    { principle: "Heart rate elevation despite beta-blocker therapy requires immediate clinical assessment.", evidenceLevel: "professional" },
    { principle: "Clinical deterioration requires qualified clinician authority.", evidenceLevel: "constitutional" },
  ],
};

describe("Milestone 016 — universality: three professions, one form()", () => {
  const scenarios = [
    { name: "Hospitality (Annie)", input: hospitalityInput },
    { name: "Construction (Kev)", input: constructionInput },
    { name: "Healthcare (Harry)", input: healthcareInput },
  ];

  it("all three professions call the same form() — no profession-specific formation variant", () => {
    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      expect(understanding).toBeDefined();
      expect(understanding.summary.length).toBeGreaterThan(0);
    }
  });

  it("all three produce an Understanding that JudgementEngine accepts", () => {
    const engine = new JudgementEngine();

    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      const judgement = engine.judge({ understanding });

      expect(judgement.disposition).toBeDefined();
      expect(judgement.understanding.summary).toBe(understanding.summary);
    }
  });

  it("all three safety scenarios produce caution or human-required — not proceed", () => {
    const engine = new JudgementEngine();

    for (const scenario of scenarios) {
      const understanding = form(scenario.input);
      const judgement = engine.judge({ understanding });

      expect(["caution", "human-required"]).toContain(judgement.disposition);
    }
  });
});

// ── Boundary: knowledge provenance stays at the correct level ────────────────

describe("Milestone 016 — boundary: knowledge provenance preserved through adapters", () => {
  it("venue knowledge stays local — never becomes professional or constitutional", () => {
    const venueAnswer: KnowledgeAnswer = {
      questionId: "q1",
      answer: "The Anne Arms closes at 11pm on weekdays.",
      sourceLevel: "venue",
      confidence: 1,
    };

    const knowledge = knowledgeAnswerToFormation(venueAnswer);

    expect(knowledge.evidenceLevel).toBe("local");
    expect(knowledge.evidenceLevel).not.toBe("professional");
    expect(knowledge.evidenceLevel).not.toBe("constitutional");
  });

  it("professional knowledge stays professional — never becomes constitutional", () => {
    const professionalAnswer: KnowledgeAnswer = {
      questionId: "q2",
      answer: "Food must be stored at 5°C or below.",
      sourceLevel: "profession",
      confidence: 1,
    };

    const knowledge = knowledgeAnswerToFormation(professionalAnswer);

    expect(knowledge.evidenceLevel).toBe("professional");
    expect(knowledge.evidenceLevel).not.toBe("constitutional");
    expect(knowledge.evidenceLevel).not.toBe("local");
  });

  it("organisation knowledge stays professional — never becomes constitutional or local", () => {
    const orgAnswer: KnowledgeAnswer = {
      questionId: "q3",
      answer: "All sites use the company allergen management procedure.",
      sourceLevel: "organisation",
      confidence: 1,
    };

    const knowledge = knowledgeAnswerToFormation(orgAnswer);

    expect(knowledge.evidenceLevel).toBe("professional");
    expect(knowledge.evidenceLevel).not.toBe("constitutional");
    expect(knowledge.evidenceLevel).not.toBe("local");
  });

  it("Helping Hand HQ knowledge becomes constitutional — only HH HQ earns this", () => {
    const hhAnswer: KnowledgeAnswer = {
      questionId: "q4",
      answer: "Do not autonomously declare food safety status without qualified human authority.",
      sourceLevel: "helping-hand",
      confidence: 1,
    };

    const knowledge = knowledgeAnswerToFormation(hhAnswer);

    expect(knowledge.evidenceLevel).toBe("constitutional");
  });

  it("a mixed batch preserves each provenance independently", () => {
    const answers: KnowledgeAnswer[] = [
      { questionId: "a", answer: "Venue closes at 11pm.", sourceLevel: "venue", confidence: 1 },
      { questionId: "b", answer: "Store food at 5°C.", sourceLevel: "profession", confidence: 1 },
      { questionId: "c", answer: "Company procedure applies.", sourceLevel: "organisation", confidence: 1 },
      { questionId: "d", answer: "Human authority required.", sourceLevel: "helping-hand", confidence: 1 },
    ];

    const knowledge = knowledgeAnswersToFormation(answers);

    expect(knowledge[0]?.evidenceLevel).toBe("local");
    expect(knowledge[1]?.evidenceLevel).toBe("professional");
    expect(knowledge[2]?.evidenceLevel).toBe("professional");
    expect(knowledge[3]?.evidenceLevel).toBe("constitutional");
  });
});

// ── Boundary: COS formation files contain no professional domain terms ────────

describe("Milestone 016 — boundary: COS formation module contains no professional content", () => {
  const cosFormationDir = join(
    process.cwd(),
    "platform/cos/understanding-formation",
  );

  const sourceFiles = readdirSync(cosFormationDir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && f !== "index.ts")
    .map((f) => join(cosFormationDir, f));

  const professionalTerms = [
    "hospitality",
    "fridge",
    "celsius",
    "food.safety",
    "load-bearing",
    "beer",
    "cellar",
    "patient",
    "clinical",
    "haccp",
    "sfbb",
  ];

  for (const file of sourceFiles) {
    const fileName = file.split("/").pop() ?? file;

    it(`${fileName} contains no hospitality, construction, or healthcare terms`, () => {
      const content = readFileSync(file, "utf-8").toLowerCase();

      for (const term of professionalTerms) {
        const regex = new RegExp(term, "i");
        const found = regex.test(content);
        if (found) {
          throw new Error(
            `COS file "${fileName}" contains professional term "${term}" — this violates the boundary`,
          );
        }
      }
    });
  }
});
