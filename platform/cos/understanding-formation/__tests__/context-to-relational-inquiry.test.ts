import { describe, expect, it } from "@jest/globals";
import {
    formRelationalInquiry,
    type RelationalInquiryFormationInput,
    type RelationalInquiryFormationResult,
} from "../context-to-relational-inquiry";
import { checkRelationalInquiryInvariants } from "../context-to-relational-inquiry-invariants";
import { contextToRelationalInquiryFixtures } from "../test-support/context-to-relational-inquiry-inputs";
import {
    heldOutContextToRelationalInquiryAssessments,
    type HeldOutContextToRelationalInquiryAssessment,
} from "../test-support/held-out/context-to-relational-inquiry-assessments";

function input(
  purposeKind: RelationalInquiryFormationInput["purpose"]["kind"],
  correctionKind?: "relational-significance" | "transcription",
): RelationalInquiryFormationInput {
  return {
    id: `ctri:${purposeKind}:${correctionKind ?? "none"}`,
    purpose: {
      id: `purpose:${purposeKind}`,
      kind: purposeKind,
    },
    contextReferences: ["context:current-purpose"],
    evidence: [
      {
        id: "meaning:one",
        evidenceId: "observation:one",
        kind: "context-meaning",
        providerId: "Dean",
        scopeId: "scope:primary",
        lifecycleStatus: "current",
      },
      {
        id: "assessment:one",
        evidenceId: "observation:assessment",
        kind: "recipient-assessment",
        providerId: "Dean",
        scopeId: "scope:primary",
        lifecycleStatus: "current",
      },
      ...(correctionKind
        ? [{
            id: "correction:one",
            evidenceId: "observation:correction",
            kind: "recipient-correction" as const,
            providerId: "Dean",
            scopeId: "scope:primary",
            lifecycleStatus: "current" as const,
            correctionKind,
          }]
        : []),
    ],
  };
}

function fixtureFor(fixtureId: string) {
  const fixture = contextToRelationalInquiryFixtures.find(
    (candidate) => candidate.id === fixtureId,
  );
  if (!fixture) throw new Error(`Missing fixture ${fixtureId}.`);
  return fixture;
}

function resultFor(fixtureId: string): RelationalInquiryFormationResult {
  return formRelationalInquiry(fixtureFor(fixtureId).input);
}

function assess(
  assessment: HeldOutContextToRelationalInquiryAssessment,
  output: RelationalInquiryFormationResult,
): void {
  expect(output.status).toBe(assessment.expectedStatus);
  const selectedIds = output.selectedEvidence.map((item) => item.evidenceId);
  const excludedIds = output.excludedEvidence.map((item) => item.evidenceId);

  for (const evidenceId of assessment.requiredSelectedEvidenceIds ?? []) {
    expect(selectedIds).toContain(evidenceId);
  }
  for (const evidenceId of assessment.requiredExcludedEvidenceIds ?? []) {
    expect(excludedIds).toContain(evidenceId);
  }
  for (const evidenceId of assessment.requiredTriggerEvidenceIds ?? []) {
    expect(output.triggerEvidenceIds).toContain(evidenceId);
  }
  if (assessment.intendedRecipientId) {
    expect(output.intendedRecipientId).toBe(assessment.intendedRecipientId);
  }
  if (assessment.priorInquiryId) {
    expect(output.priorInquiryId).toBe(assessment.priorInquiryId);
  }

  const text = JSON.stringify(output).toLowerCase();
  for (const required of assessment.requiredText ?? []) {
    expect(text).toContain(required.toLowerCase());
  }
  for (const prohibited of assessment.prohibitedText ?? []) {
    expect(text).not.toContain(prohibited.toLowerCase());
  }
}

describe("HH-0000 bounded CTRI experiment", () => {
  it("forms a neutral inquiry from current relational correction evidence", () => {
    const output = formRelationalInquiry(
      input("understand-intended-meaning", "relational-significance"),
    );

    expect(output.status).toBe("RELATIONAL_INQUIRY_FORMED");
    expect(output.triggerEvidenceIds).toEqual(["observation:correction"]);
    expect(output.selectedEvidence.map((item) => item.evidenceId)).toEqual([
      "observation:one",
      "observation:assessment",
      "observation:correction",
    ]);
    expect(output.intendedRecipientId).toBe("Dean");
  });

  it("does not form an inquiry from unrelated evidence in a keyword-lure purpose", () => {
    const output = formRelationalInquiry(input("inventory"));

    expect(output.status).toBe("NO_MATERIAL_RELATIONAL_INQUIRY");
    expect(output.selectedEvidence).toEqual([]);
  });

  it("does not treat a transcription correction as relational correction", () => {
    const output = formRelationalInquiry(
      input("record-accuracy", "transcription"),
    );

    expect(output.status).toBe("NO_MATERIAL_RELATIONAL_INQUIRY");
    expect(output.triggerEvidenceIds).toEqual([]);
  });

  it.each(heldOutContextToRelationalInquiryAssessments)(
    "$fixtureId satisfies its isolated determinate assessment",
    (assessment) => {
      assess(assessment, resultFor(assessment.fixtureId));
    },
  );

  it("is invariant under semantic reorder with different evidence identities", () => {
    const primary = resultFor("CTRI-FX-001");
    const paraphrase = resultFor("CTRI-FX-002");

    expect(paraphrase.status).toBe(primary.status);
    expect(paraphrase.neutralQuestion).toBe(primary.neutralQuestion);
    expect(paraphrase.materiality).toBe(primary.materiality);
    expect(paraphrase.intendedRecipientId).toBe(primary.intendedRecipientId);
    expect(paraphrase.triggerEvidenceIds).not.toEqual(primary.triggerEvidenceIds);
  });

  it("changes materiality when purpose changes while evidence kinds remain", () => {
    expect(resultFor("CTRI-FX-001").status).toBe("RELATIONAL_INQUIRY_FORMED");
    expect(resultFor("CTRI-FX-003").status).toBe(
      "NO_MATERIAL_RELATIONAL_INQUIRY",
    );
  });

  it("depends on recipient assessment and correction evidence", () => {
    expect(resultFor("CTRI-FX-001").status).toBe("RELATIONAL_INQUIRY_FORMED");
    expect(resultFor("CTRI-FX-004").status).toBe(
      "NO_MATERIAL_RELATIONAL_INQUIRY",
    );
  });

  it("excludes fluent high-confidence distractors without confidence inflation", () => {
    const primary = resultFor("CTRI-FX-001");
    const distracted = resultFor("CTRI-FX-005");

    expect(distracted.neutralQuestion).toBe(primary.neutralQuestion);
    expect(distracted.confidence).toBe(primary.confidence);
    expect(distracted.excludedEvidence.map((item) => item.evidenceId)).toEqual(
      expect.arrayContaining([
        "fx005:distractor:praise:evidence",
        "fx005:distractor:urgency:evidence",
      ]),
    );
  });

  it("distinguishes direct evidence, ambiguity, correction, and formation gaps", () => {
    expect(resultFor("CTRI-FX-009").directlySuppliedRelationshipEvidenceIds)
      .toEqual(["fx009:relationship:evidence"]);
    expect(resultFor("CTRI-FX-010").alternatives).toHaveLength(2);
    expect(resultFor("CTRI-FX-011").priorInquiryId)
      .toBe("ctri:fx011:prior-inquiry");
    expect(resultFor("CTRI-FX-013").status)
      .toBe("RELATIONAL_INQUIRY_FORMATION_GAP");
    expect(resultFor("CTRI-FX-014").status)
      .toBe("RELATIONAL_INQUIRY_FORMATION_GAP");
    expect(resultFor("CTRI-FX-015").status)
      .toBe("RELATIONAL_INQUIRY_FORMATION_GAP");
  });

  it("keeps expected selections, statuses, and questions out of runtime fixtures", () => {
    const runtimeInput = JSON.stringify(contextToRelationalInquiryFixtures);
    const deniedContent = [
      "heldOutContextToRelationalInquiryAssessments",
      "expectedStatus",
      "expectedQuestion",
      "expectedSelection",
      "HH0000_CONTEXT_TO_RELATIONAL_INQUIRY_TRANSFORMATION_COMBINED_AUTHORITY_REVIEW",
      "move from documents",
      '"selectedEvidence"',
      '"neutralQuestion"',
      '"materiality"',
      '"formationGap"',
    ];

    for (const denied of deniedContent) {
      expect(runtimeInput).not.toContain(denied);
    }
  });

  it("satisfies all twenty invariants for every genuine outcome", () => {
    for (const fixture of contextToRelationalInquiryFixtures) {
      expect(
        checkRelationalInquiryInvariants(
          fixture.input,
          formRelationalInquiry(fixture.input),
        ),
      ).toEqual([]);
    }
  });

  it("independently detects CTRI-I-01 through CTRI-I-20", () => {
    const primaryInput = fixtureFor("CTRI-FX-001").input;
    const primary = resultFor("CTRI-FX-001");
    const independentInput = fixtureFor("CTRI-FX-012").input;
    const ruleInput = fixtureFor("CTRI-FX-013").input;
    const ruleGap = resultFor("CTRI-FX-013");
    const ambiguousInput = fixtureFor("CTRI-FX-010").input;
    const ambiguous = resultFor("CTRI-FX-010");
    const correctionInput = fixtureFor("CTRI-FX-011").input;
    const correction = resultFor("CTRI-FX-011");

    const tampered: {
      invariant: string;
      input: RelationalInquiryFormationInput;
      output: RelationalInquiryFormationResult | undefined;
    }[] = [
      {
        invariant: "CTRI-I-01",
        input: primaryInput,
        output: { ...primary, owner: "ContextDoor" } as RelationalInquiryFormationResult,
      },
      {
        invariant: "CTRI-I-02",
        input: { ...primaryInput, expectedStatus: primary.status } as RelationalInquiryFormationInput,
        output: primary,
      },
      {
        invariant: "CTRI-I-03",
        input: primaryInput,
        output: { ...primary, triggerEvidenceIds: [] },
      },
      {
        invariant: "CTRI-I-04",
        input: independentInput,
        output: primary,
      },
      {
        invariant: "CTRI-I-05",
        input: primaryInput,
        output: {
          ...primary,
          selectedEvidence: [
            ...primary.selectedEvidence,
            { evidenceId: "invented", reason: "Invented.", lifecycleStatus: "current" },
          ],
        },
      },
      {
        invariant: "CTRI-I-06",
        input: primaryInput,
        output: {
          ...primary,
          selectedEvidence: primary.selectedEvidence.map((item, index) =>
            index === 0 ? { ...item, reason: "" } : item,
          ),
        },
      },
      {
        invariant: "CTRI-I-07",
        input: ambiguousInput,
        output: { ...ambiguous, neutralQuestion: "Learner fatigue informed the decision." },
      },
      {
        invariant: "CTRI-I-08",
        input: ruleInput,
        output: { ...ruleGap, currentFactFromRule: true } as RelationalInquiryFormationResult,
      },
      {
        invariant: "CTRI-I-09",
        input: primaryInput,
        output: {
          ...primary,
          selectedEvidence: primary.selectedEvidence.map((item, index) =>
            index === 0 ? { ...item, lifecycleStatus: "stale" } : item,
          ),
        },
      },
      {
        invariant: "CTRI-I-10",
        input: primaryInput,
        output: { ...primary, purposeReference: "purpose:other" },
      },
      {
        invariant: "CTRI-I-11",
        input: primaryInput,
        output: { ...primary, wordingDependent: true } as RelationalInquiryFormationResult,
      },
      {
        invariant: "CTRI-I-12",
        input: primaryInput,
        output: { ...primary, intendedRecipientId: "Unknown" },
      },
      {
        invariant: "CTRI-I-13",
        input: independentInput,
        output: primary,
      },
      {
        invariant: "CTRI-I-14",
        input: ruleInput,
        output: { ...ruleGap, neededEvidence: undefined },
      },
      {
        invariant: "CTRI-I-15",
        input: primaryInput,
        output: { ...primary, envelopeKind: "MATERIAL_RELATIONAL_GAP" } as RelationalInquiryFormationResult,
      },
      {
        invariant: "CTRI-I-16",
        input: primaryInput,
        output: { ...primary, selectedResponse: "ask" } as RelationalInquiryFormationResult,
      },
      {
        invariant: "CTRI-I-17",
        input: primaryInput,
        output: { ...primary, authority: "granted" } as RelationalInquiryFormationResult,
      },
      {
        invariant: "CTRI-I-18",
        input: correctionInput,
        output: { ...correction, priorInquiryId: undefined, correctionEvidenceId: undefined },
      },
      {
        invariant: "CTRI-I-19",
        input: primaryInput,
        output: { ...primary, confidence: 2 },
      },
      {
        invariant: "CTRI-I-20",
        input: primaryInput,
        output: undefined,
      },
    ];

    for (const testCase of tampered) {
      expect(
        checkRelationalInquiryInvariants(testCase.input, testCase.output).map(
          (item) => item.invariant,
        ),
      ).toContain(testCase.invariant);
    }
  });
});