import { describe, expect, it } from "@jest/globals";
import type { RelationalEvidenceEnvelope } from "../../../../lib/understanding/Understanding";
import { form } from "../formation";
import { checkRelationalInvariants } from "../relational-invariants";
import {
    heldOutRelationalAssessments,
    type HeldOutRelationalAssessment,
} from "../test-support/held-out/relational-assessments";
import { relationalExperimentFixtures } from "../test-support/relational-inputs";

function resultFor(fixtureId: string): RelationalEvidenceEnvelope | undefined {
  return form(fixtureFor(fixtureId).input).relationalEvidence;
}

function fixtureFor(fixtureId: string) {
  const fixture = relationalExperimentFixtures.find(
    (candidate) => candidate.id === fixtureId,
  );
  if (!fixture) throw new Error(`Missing fixture ${fixtureId}.`);
  return fixture;
}

function resultText(result: RelationalEvidenceEnvelope): string {
  return JSON.stringify(result).toLowerCase();
}

function formedMeaningText(result: RelationalEvidenceEnvelope): string {
  if (result.kind === "RELATIONSHIP_PROPOSED") {
    return [
      result.claim,
      result.significance,
      result.inferenceBasis,
      ...result.alternatives,
    ].filter(Boolean).join(" ").toLowerCase();
  }

  return [
    result.gap,
    result.materiality,
    result.safeCurrentMeaning,
    result.neededContext,
    result.sourceRationale,
    result.discoveryNeed,
  ].join(" ").toLowerCase();
}

function assess(
  assessment: HeldOutRelationalAssessment,
  result: RelationalEvidenceEnvelope | undefined,
): void {
  if (assessment.expectedKind === "ABSENT") {
    expect(result).toBeUndefined();
    return;
  }

  expect(result?.kind).toBe(assessment.expectedKind);
  if (!result) return;

  const evidenceIds = result.evidence.map((item) => item.evidenceId);
  for (const evidenceId of assessment.requiredEvidenceIds ?? []) {
    expect(evidenceIds).toContain(evidenceId);
  }

  const text = resultText(result);
  for (const required of assessment.requiredText ?? []) {
    expect(text).toContain(required.toLowerCase());
  }
  const formedMeaning = formedMeaningText(result);
  for (const prohibited of assessment.prohibitedText ?? []) {
    expect(formedMeaning).not.toContain(prohibited.toLowerCase());
  }
  for (const required of assessment.requiredUncertainty ?? []) {
    expect(result.uncertainty.join(" ").toLowerCase()).toContain(
      required.toLowerCase(),
    );
  }

  if (assessment.priorResultId) {
    expect(result.priorResultId).toBe(assessment.priorResultId);
  }
}

describe("HH-0000 controlled relational Understanding experiment", () => {
  it.each(heldOutRelationalAssessments)(
    "$fixtureId satisfies its evaluator-only semantic assessment",
    (assessment) => {
      assess(assessment, resultFor(assessment.fixtureId));
    },
  );

  it("is semantically invariant under the meaning-preserving paraphrase", () => {
    const primary = resultFor("FX-001");
    const paraphrase = resultFor("FX-002");

    expect(primary?.kind).toBe("MATERIAL_RELATIONAL_GAP");
    expect(paraphrase?.kind).toBe(primary?.kind);
    if (primary?.kind !== "MATERIAL_RELATIONAL_GAP") return;
    if (paraphrase?.kind !== "MATERIAL_RELATIONAL_GAP") return;

    expect(paraphrase.gap).toBe(primary.gap);
    expect(paraphrase.materiality).toBe(primary.materiality);
    expect(paraphrase.neededContext).toBe(primary.neededContext);
    expect(paraphrase.discoveryNeed).toBe(primary.discoveryNeed);
    expect(paraphrase.evidence[0].evidenceId).not.toBe(
      primary.evidence[0].evidenceId,
    );
  });

  it("changes current meaning when the material temporal evidence changes", () => {
    const absent = resultFor("FX-003");
    const present = resultFor("FX-004");

    expect(absent?.kind).toBe("RELATIONSHIP_PROPOSED");
    expect(present?.kind).toBe("RELATIONSHIP_PROPOSED");
    if (absent?.kind !== "RELATIONSHIP_PROPOSED") return;
    if (present?.kind !== "RELATIONSHIP_PROPOSED") return;

    expect(absent.claim).not.toBe(present.claim);
    expect(absent.claim).toContain("blocks presentation");
    expect(present.claim).toContain("no longer remains");
  });

  it("weakens to a material gap when the governing rule is unavailable", () => {
    expect(resultFor("FX-003")?.kind).toBe("RELATIONSHIP_PROPOSED");
    expect(resultFor("FX-005")?.kind).toBe("MATERIAL_RELATIONAL_GAP");
  });

  it("ignores fluent distractors that do not satisfy the governed rule", () => {
    const plain = resultFor("FX-003");
    const distracted = resultFor("FX-006");

    expect(distracted?.kind).toBe("RELATIONSHIP_PROPOSED");
    if (plain?.kind !== "RELATIONSHIP_PROPOSED") return;
    if (distracted?.kind !== "RELATIONSHIP_PROPOSED") return;

    expect(distracted.claim).toBe(plain.claim);
    expect(distracted.significance).toBe(plain.significance);
    expect(distracted.confidence).toBe(plain.confidence);
  });

  it("preserves alternatives rather than forcing ambiguous synthesis", () => {
    const result = resultFor("FX-007");

    expect(result?.kind).toBe("MATERIAL_RELATIONAL_GAP");
    expect(result?.uncertainty).toHaveLength(2);
  });

  it("does not manufacture a relationship among independent facts", () => {
    expect(resultFor("FX-008")).toBeUndefined();
  });

  it("preserves correction and supersession links", () => {
    const result = resultFor("FX-009");

    expect(result?.kind).toBe("RELATIONSHIP_PROPOSED");
    expect(result?.priorResultId).toBe("relational-result:fx-009-prior");
    expect(result?.correctionId).toBe("fx009-correction");
  });

  it("selects the attributable intended-meaning source after role permutation", () => {
    const result = resultFor("FX-010");

    expect(result?.kind).toBe("MATERIAL_RELATIONAL_GAP");
    if (result?.kind !== "MATERIAL_RELATIONAL_GAP") return;

    expect(result.discoveryNeed).toContain("Ask Priya");
    expect(result.discoveryNeed).not.toContain("Morgan");
  });

  it("compares candidate and baseline using the same admissible fixture object", () => {
    for (const fixture of relationalExperimentFixtures) {
      const candidate = form(fixture.input);
      const baseline = form(fixture.input, { relationalEvidence: "disabled" });

      expect(baseline.relationalEvidence).toBeUndefined();
      expect(candidate.summary).toBe(baseline.summary);
      expect(candidate.evidenceChain).toEqual(baseline.evidenceChain);
    }
  });

  it("keeps denied assessment and source-record content out of runtime fixtures", () => {
    const runtimeInput = JSON.stringify(relationalExperimentFixtures);
    const deniedContent = [
      "HA-001",
      "held-out assessment",
      "HH0000_RELATIONAL_UNDERSTANDING_PRE_IMPLEMENTATION_EVIDENCE_PACKAGE",
      "HH0000_ANDY_FIRST_BOUNDED_LIVE_FORMATION_CONVERSATION_RECORD_001",
      "PASSED FOR BOUNDED IMPLEMENTATION",
      "move from learning about Understanding in documents to learning what it means to understand a real person",
      '"gap":',
      '"materiality":',
      '"safeCurrentMeaning":',
      '"neededContext":',
      '"sourceRationale":',
      '"discoveryNeed":',
    ];

    for (const denied of deniedContent) {
      expect(runtimeInput).not.toContain(denied);
    }
  });

  it("satisfies all ten relational invariants for every produced envelope", () => {
    for (const fixture of relationalExperimentFixtures) {
      const output = form(fixture.input).relationalEvidence;
      expect(checkRelationalInvariants(fixture.input, output)).toEqual([]);
    }
  });

  it("independently detects violations of RU-I-01 through RU-I-10", () => {
    const proposalInput = fixtureFor("FX-003").input;
    const proposal = resultFor("FX-003");
    const ambiguousInput = fixtureFor("FX-007").input;
    const gap = resultFor("FX-007");
    const correctionInput = fixtureFor("FX-009").input;
    const correction = resultFor("FX-009");

    if (proposal?.kind !== "RELATIONSHIP_PROPOSED") {
      throw new Error("Expected FX-003 to produce a relationship proposal.");
    }
    if (gap?.kind !== "MATERIAL_RELATIONAL_GAP") {
      throw new Error("Expected FX-007 to produce a material gap.");
    }
    if (correction?.kind !== "RELATIONSHIP_PROPOSED") {
      throw new Error("Expected FX-009 to produce a corrected relationship.");
    }

    const cases: {
      invariant: string;
      input: typeof proposalInput;
      output: RelationalEvidenceEnvelope;
    }[] = [
      {
        invariant: "RU-I-01",
        input: proposalInput,
        output: { ...proposal, evidence: [] },
      },
      {
        invariant: "RU-I-02",
        input: proposalInput,
        output: { ...proposal, contextReferences: [] },
      },
      {
        invariant: "RU-I-03",
        input: proposalInput,
        output: { ...proposal, inferenceBasis: undefined },
      },
      {
        invariant: "RU-I-04",
        input: ambiguousInput,
        output: proposal,
      },
      {
        invariant: "RU-I-05",
        input: ambiguousInput,
        output: { ...gap, gap: "risk", materiality: "" },
      },
      {
        invariant: "RU-I-06",
        input: ambiguousInput,
        output: { ...gap, discoveryNeed: "Ask for more context." },
      },
      {
        invariant: "RU-I-07",
        input: proposalInput,
        output: { ...proposal, authority: "granted" } as RelationalEvidenceEnvelope,
      },
      {
        invariant: "RU-I-08",
        input: proposalInput,
        output: { ...proposal, alignmentStatus: "aligned" } as RelationalEvidenceEnvelope,
      },
      {
        invariant: "RU-I-09",
        input: correctionInput,
        output: { ...correction, priorResultId: undefined, correctionId: undefined },
      },
      {
        invariant: "RU-I-10",
        input: proposalInput,
        output: { ...proposal, selectedResponse: "ask" } as RelationalEvidenceEnvelope,
      },
    ];

    for (const testCase of cases) {
      expect(
        checkRelationalInvariants(testCase.input, testCase.output).map(
          (violation) => violation.invariant,
        ),
      ).toContain(testCase.invariant);
    }
  });
});