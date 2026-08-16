import { describe, expect, it } from "@jest/globals";
import type { Concept } from "../../../knowledge/Concept";
import { governedConceptsToFormation } from "../governedKnowledgeAdapter";

const NOW = "2026-08-06T10:00:00.000Z";

function makeConcept(overrides: Partial<Concept> = {}): Concept {
  return {
    id: "test-concept",
    name: "Test Concept",
    aliases: [],
    definition: "A test principle.",
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
    ...overrides,
  };
}

// ── Evidence level mapping ────────────────────────────────────────────────────

describe("governedConceptsToFormation — evidence level mapping", () => {
  it("maps constitutional concepts to constitutional formation knowledge", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ evidenceLevel: "constitutional", inheritsTo: ["all"] })],
      "hospitality",
    );
    expect(result[0]?.evidenceLevel).toBe("constitutional");
  });

  it("maps multi-source concepts to professional formation knowledge", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ evidenceLevel: "multi-source" })],
      "hospitality",
    );
    expect(result[0]?.evidenceLevel).toBe("professional");
  });

  it("maps single-source concepts to local formation knowledge", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ evidenceLevel: "single-source" })],
      "hospitality",
    );
    expect(result[0]?.evidenceLevel).toBe("local");
  });

  it("uses the concept definition as the formation principle", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ definition: "Shared context reduces repeated clarification." })],
      "hospitality",
    );
    expect(result[0]?.principle).toBe("Shared context reduces repeated clarification.");
  });
});

// ── Candidate exclusion ───────────────────────────────────────────────────────

describe("governedConceptsToFormation — candidate exclusion", () => {
  it("excludes candidate concepts from formation", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ evidenceLevel: "candidate" })],
      "hospitality",
    );
    expect(result).toHaveLength(0);
  });

  it("excludes only candidates — other evidence levels pass through", () => {
    const concepts = [
      makeConcept({ id: "a", evidenceLevel: "candidate" }),
      makeConcept({ id: "b", evidenceLevel: "multi-source" }),
    ];
    const result = governedConceptsToFormation(concepts, "hospitality");
    expect(result).toHaveLength(1);
    expect(result[0]?.evidenceLevel).toBe("professional");
  });
});

// ── Profession filtering ──────────────────────────────────────────────────────

describe("governedConceptsToFormation — profession filtering", () => {
  it("includes concepts targeting the requested profession", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ inheritsTo: ["hospitality"] })],
      "hospitality",
    );
    expect(result).toHaveLength(1);
  });

  it("excludes concepts that target a different profession", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ inheritsTo: ["healthcare"] })],
      "hospitality",
    );
    expect(result).toHaveLength(0);
  });

  it("includes concepts with inheritsTo: all", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ inheritsTo: ["all"] })],
      "hospitality",
    );
    expect(result).toHaveLength(1);
  });

  it("includes concepts with inheritsTo: helping-hand", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ inheritsTo: ["helping-hand"] })],
      "hospitality",
    );
    expect(result).toHaveLength(1);
  });

  it("includes a concept if any target matches — even if others do not", () => {
    const result = governedConceptsToFormation(
      [makeConcept({ inheritsTo: ["healthcare", "hospitality"] })],
      "hospitality",
    );
    expect(result).toHaveLength(1);
  });

  it("does not allow healthcare concepts to reach a hospitality DC", () => {
    const healthcareConcept = makeConcept({ inheritsTo: ["healthcare"] });
    const result = governedConceptsToFormation([healthcareConcept], "hospitality");
    expect(result).toHaveLength(0);
  });
});

// ── Edge cases ────────────────────────────────────────────────────────────────

describe("governedConceptsToFormation — edge cases", () => {
  it("returns empty array for empty concept list", () => {
    expect(governedConceptsToFormation([], "hospitality")).toHaveLength(0);
  });

  it("converts multiple applicable concepts to multiple formation entries", () => {
    const concepts = [
      makeConcept({ id: "a", definition: "First principle." }),
      makeConcept({ id: "b", definition: "Second principle." }),
    ];
    const result = governedConceptsToFormation(concepts, "hospitality");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.principle)).toContain("First principle.");
    expect(result.map((r) => r.principle)).toContain("Second principle.");
  });
});
