import { describe, expect, it } from "@jest/globals";
import { form } from "../formation";
import {
    checkAllInvariants,
    checkCompletenessNotSupplied,
    checkConfidenceNotSupplied,
    checkEvidenceChainPresent,
    checkNoMeaningWithoutEvidence,
    checkUncertaintyNotHidden,
} from "../invariants";
import type { FormationInput } from "../types";

const baseInput: FormationInput = {
  translations: [
    {
      observationId: "obs-001",
      meaning: "The fridge temperature exceeds the safe storage limit.",
      confidence: 0.9,
    },
  ],
  context: {
    situational: { urgency: "high", risk: "food safety" },
    institutional: [],
  },
  knowledge: [
    { principle: "Safe upper limit is 5°C.", evidenceLevel: "professional" },
  ],
};

// ── Invariant 1: No meaning without evidence ──────────────────────────────────

describe("Invariant 1 — no meaning without evidence", () => {
  it("passes when translations are present and summary is derived from them", () => {
    const output = form(baseInput);
    const violation = checkNoMeaningWithoutEvidence(baseInput, output);

    expect(violation).toBeNull();
  });

  it("passes when translations are empty and summary acknowledges that", () => {
    const emptyInput: FormationInput = {
      translations: [],
      context: { situational: {}, institutional: [] },
      knowledge: [
        { principle: "Safe upper limit is 5°C.", evidenceLevel: "professional" },
      ],
    };
    const output = form(emptyInput);
    const violation = checkNoMeaningWithoutEvidence(emptyInput, output);

    expect(violation).toBeNull();
  });
});

// ── Invariant 2: Uncertainty is never hidden ──────────────────────────────────

describe("Invariant 2 — uncertainty is not hidden", () => {
  it("passes when inputs are complete and some uncertainty may still exist", () => {
    const output = form(baseInput);
    const violation = checkUncertaintyNotHidden(baseInput, output);

    expect(violation).toBeNull();
  });

  it("passes when a low-confidence translation forces non-empty uncertainty", () => {
    const lowConfidenceInput: FormationInput = {
      ...baseInput,
      translations: [
        {
          observationId: "obs-001",
          meaning: "Temperature may be above the safe limit.",
          confidence: 0.5,
        },
      ],
    };
    const output = form(lowConfidenceInput);

    expect(output.uncertainty.length).toBeGreaterThan(0);

    const violation = checkUncertaintyNotHidden(lowConfidenceInput, output);
    expect(violation).toBeNull();
  });

  it("passes when context is missing urgency or risk and uncertainty reflects that", () => {
    const noContextInput: FormationInput = {
      ...baseInput,
      context: { situational: {}, institutional: [] },
    };
    const output = form(noContextInput);

    expect(output.uncertainty.length).toBeGreaterThan(0);

    const violation = checkUncertaintyNotHidden(noContextInput, output);
    expect(violation).toBeNull();
  });
});

// ── Invariant 3: Evidence chain is present ────────────────────────────────────

describe("Invariant 3 — evidence chain is present when translations exist", () => {
  it("passes when all translation observation IDs appear in the evidence chain", () => {
    const output = form(baseInput);
    const violation = checkEvidenceChainPresent(baseInput, output);

    expect(violation).toBeNull();
    expect(output.evidenceChain).toContain("obs-001");
  });

  it("passes vacuously when no translations are provided", () => {
    const emptyInput: FormationInput = {
      translations: [],
      context: { situational: {}, institutional: [] },
      knowledge: [],
    };
    const output = form(emptyInput);
    const violation = checkEvidenceChainPresent(emptyInput, output);

    expect(violation).toBeNull();
  });

  it("tracks multiple observation IDs", () => {
    const multiInput: FormationInput = {
      ...baseInput,
      translations: [
        { observationId: "obs-A", meaning: "First observation.", confidence: 0.9 },
        { observationId: "obs-B", meaning: "Second observation.", confidence: 0.85 },
        { observationId: "obs-C", meaning: "Third observation.", confidence: 0.8 },
      ],
    };
    const output = form(multiInput);

    expect(output.evidenceChain).toContain("obs-A");
    expect(output.evidenceChain).toContain("obs-B");
    expect(output.evidenceChain).toContain("obs-C");

    const violation = checkEvidenceChainPresent(multiInput, output);
    expect(violation).toBeNull();
  });
});

// ── Invariant 4: Confidence is computed, not supplied ─────────────────────────

describe("Invariant 4 — confidence is computed, not supplied", () => {
  it("passes because FormationInput has no confidence field", () => {
    const violation = checkConfidenceNotSupplied(baseInput);
    expect(violation).toBeNull();
  });

  it("would fail if confidence were injected into the input (type safety test)", () => {
    // Simulate a caller attempting to pass confidence in the input.
    const tamperedInput = { ...baseInput, confidence: 0.99 };
    const violation = checkConfidenceNotSupplied(tamperedInput);

    expect(violation).not.toBeNull();
    expect(violation?.invariant).toBe(4);
  });

  it("produces different confidence values from inputs of different quality", () => {
    const highQualityInput: FormationInput = {
      translations: [{ observationId: "obs-hq", meaning: "Clear observation.", confidence: 0.97 }],
      context: { situational: { urgency: "low", risk: "none", what: "routine check" }, institutional: [] },
      knowledge: [{ principle: "All checks passed.", evidenceLevel: "professional" }],
    };

    const lowQualityInput: FormationInput = {
      translations: [{ observationId: "obs-lq", meaning: "Uncertain observation.", confidence: 0.4 }],
      context: { situational: {}, institutional: [] },
      knowledge: [],
    };

    const highUnderstanding = form(highQualityInput);
    const lowUnderstanding = form(lowQualityInput);

    expect(highUnderstanding.confidence).toBeGreaterThan(lowUnderstanding.confidence);
  });
});

// ── Invariant 5: Completeness is computed, not supplied ───────────────────────

describe("Invariant 5 — completeness is computed, not supplied", () => {
  it("passes because FormationInput has no completeness field", () => {
    const violation = checkCompletenessNotSupplied(baseInput);
    expect(violation).toBeNull();
  });

  it("would fail if completeness were injected into the input (type safety test)", () => {
    const tamperedInput = { ...baseInput, completeness: "sufficient" };
    const violation = checkCompletenessNotSupplied(tamperedInput);

    expect(violation).not.toBeNull();
    expect(violation?.invariant).toBe(5);
  });

  it("produces sufficient when all translations are high-confidence and context is complete", () => {
    const output = form(baseInput);
    expect(output.completeness).toBe("sufficient");
  });

  it("produces partial when translations exist but context is incomplete", () => {
    const partialInput: FormationInput = {
      ...baseInput,
      context: { situational: { urgency: "medium" }, institutional: [] },
    };
    const output = form(partialInput);
    expect(output.completeness).toBe("partial");
  });

  it("produces insufficient when no translations are provided", () => {
    const emptyInput: FormationInput = {
      translations: [],
      context: { situational: {}, institutional: [] },
      knowledge: [],
    };
    const output = form(emptyInput);
    expect(output.completeness).toBe("insufficient");
  });
});

// ── All invariants together ───────────────────────────────────────────────────

describe("checkAllInvariants — full validation pass", () => {
  it("returns no violations for a well-formed fridge input", () => {
    const output = form(baseInput);
    const violations = checkAllInvariants(baseInput, output);

    expect(violations).toHaveLength(0);
  });
});
