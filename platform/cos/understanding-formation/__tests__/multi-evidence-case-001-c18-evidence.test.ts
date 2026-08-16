import { describe, expect, it } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";

import { resolveRepositoryRootFromDirectory } from "../../../../scripts/support/repositoryRoot";
import {
    C18_EVALUATOR_ID,
    C18_EVALUATOR_VERSION,
    finalizeC18ComparisonRecord,
    type C18ComparisonRecordInput,
    type C18ComparisonRecordOutcome,
    type FinalizedC18ComparisonRecord,
    type IncompleteC18ComparisonRecord,
    type LimitedC18ComparisonRecord,
} from "../multi-evidence-case-001/comparison-evidence";
import {
    assessContamination,
    deriveC18AggregateState,
} from "../multi-evidence-case-001/evaluation";
import * as experimentModule from "../multi-evidence-case-001/experiment";
import { createContemporaneousRecorder } from "../multi-evidence-case-001/integrity";

const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
const sourceRoot = path.join(
  repositoryRoot,
  "platform/cos/understanding-formation/multi-evidence-case-001",
);

function reference(pathValue: string) {
  return { path: pathValue, immutableValueIdentity: `digest:${pathValue}` };
}

function validInput(): C18ComparisonRecordInput {
  return {
    comparisonRecordId: "SYNTHETIC-CYCLE:C18:001",
    cycleId: "SYNTHETIC-CYCLE",
    candidateCaptureId: "SYNTHETIC-CYCLE:C12:candidate-digest",
    candidate: {
      primaryReference: reference("candidate.supportedFindings[0].statement"),
      evidenceReferencesRequired: false,
      evidenceReferences: [],
    },
    heldOutAssessment: {
      assessmentId: "SYNTHETIC-ASSESSMENT",
      version: "1.0.0",
      verifiedHash: "synthetic-held-out-hash",
    },
    heldOutRequirement: {
      primaryReference: reference("heldOut.requiredFindings[0]"),
      evidenceReferencesRequired: false,
      evidenceReferences: [],
    },
    evaluator: {
      evaluatorId: C18_EVALUATOR_ID,
      version: C18_EVALUATOR_VERSION,
    },
    comparisonRule: {
      ruleId: "SYNTHETIC-ASSESSMENT:semanticEvaluationRule",
      version: "1.0.0",
    },
    applicableMaterialDimensions: ["PROPOSITION_MEANING"],
    observation: { classification: "MATCH" },
    inference: { classification: "MATERIAL_EQUIVALENCE" },
    semanticDisposition: "MATERIAL_EQUIVALENCE",
    evaluatorConditionStatus: "SATISFIED",
    disagreement: { status: "NONE", alternativeReferences: [] },
    uncertainty: { status: "NONE", reasons: [], limitingReferences: [] },
    boundaryLinkage: {
      c12CaptureId: "SYNTHETIC-CYCLE:C12:candidate-digest",
      c16HeldOutHash: "synthetic-held-out-hash",
      c20RecordId: "SYNTHETIC-CYCLE:C20",
      c20InvocationEventId: "SYNTHETIC-CYCLE:C20:event:0021",
    },
  };
}

function finalized(input = validInput()): Readonly<FinalizedC18ComparisonRecord> {
  const outcome = finalizeC18ComparisonRecord(input);
  expect(outcome.finalizationState).toBe("FINALIZED");
  expect("comparisonRecordId" in outcome).toBe(true);
  return outcome as Readonly<FinalizedC18ComparisonRecord>;
}

function limited(
  outcome: C18ComparisonRecordOutcome,
  disposition: "NOT_EVALUATED" | "COMPARISON_INSUFFICIENT",
): Readonly<LimitedC18ComparisonRecord> {
  expect(outcome.finalizationState).toBe("FINALIZED");
  expect("reasons" in outcome).toBe(true);
  expect("semanticDisposition" in outcome && outcome.semanticDisposition)
    .toBe(disposition);
  return outcome as Readonly<LimitedC18ComparisonRecord>;
}

function incomplete(
  outcome: C18ComparisonRecordOutcome,
): Readonly<IncompleteC18ComparisonRecord> {
  expect(outcome.finalizationState).toBe("INCOMPLETE");
  return outcome as Readonly<IncompleteC18ComparisonRecord>;
}

describe("Case 001 C18 bounded correction evidence", () => {
  it("finalizes reference-only evidence with one primary value per side", () => {
    const input = validInput();
    input.candidate!.evidenceReferences = [reference("candidate.supportedFindings[0].findingId")];
    const record = finalized(input);

    expect(record.candidate.primaryReference).toEqual(
      reference("candidate.supportedFindings[0].statement"),
    );
    expect(record.candidate.evidenceReferences).toHaveLength(1);
    expect(record.heldOutRequirement.primaryReference).toEqual(
      reference("heldOut.requiredFindings[0]"),
    );
    expect(record).not.toHaveProperty("candidateProjectionAdmission");
    expect(record).not.toHaveProperty("heldOutProjectionAdmission");
    expect(JSON.stringify(record)).not.toContain("projection");
  });

  it("prohibits every caller projection path and retains no projected content", () => {
    const projectionInputs = [
      {
        projection: {
          scope: "candidate.supportedFindings[0].statement#material",
          materialDimensions: ["PROPOSITION_MEANING"],
          value: "Private diagnosis and personal-impact material.",
        },
      },
      {
        projectionAuthorization: {
          admission: {
            mode: "PROJECTION_REQUIRED",
            necessityReason: "GOVERNED_RULE_REQUIRES_PROJECTION",
          },
        },
      },
      {
        projection: { value: { copiedAccount: true } },
        projectionAuthorization: { side: "held-out" },
      },
    ];
    for (const projectionInput of projectionInputs) {
      const input = validInput();
      input.candidate = {
        ...input.candidate,
        ...projectionInput,
      } as unknown as C18ComparisonRecordInput["candidate"];
      const outcome = incomplete(finalizeC18ComparisonRecord(input));
      expect(outcome.reasons).toContain("FORBIDDEN_FIELD");
      expect(JSON.stringify(outcome)).not.toContain("Private diagnosis");
      expect(JSON.stringify(outcome)).not.toContain("copiedAccount");
      expect(JSON.stringify(outcome)).not.toContain("PROJECTION_REQUIRED");
    }

    const evidenceSource = fs.readFileSync(path.join(sourceRoot, "comparison-evidence.ts"), "utf8");
    expect(evidenceSource).not.toContain("ProjectionAdmission");
    expect(evidenceSource).not.toContain("candidateProjectionAdmission");
    expect(evidenceSource).not.toContain("heldOutProjectionAdmission");
    expect(evidenceSource).not.toContain("assessC18ProjectionNecessity");
    expect(evidenceSource).not.toContain("GOVERNED_RULE_REQUIRES_PROJECTION");
  });

  it("finalizes attributable reference-only comparison insufficiency", () => {
    const input = validInput();
    input.observation = { classification: "UNABLE_TO_OBSERVE" };
    input.inference = { classification: "INDETERMINATE" };
    input.semanticDisposition = "COMPARISON_INSUFFICIENT";
    input.evaluatorConditionStatus = "NOT_DETERMINABLE";
    input.uncertainty = {
      status: "PRESENT",
      reasons: ["MISSING_EVIDENCE_SUPPORT"],
      limitingReferences: [input.candidate!.primaryReference!],
    };
    const outcome = finalized(input);

    expect(outcome.semanticDisposition).toBe("COMPARISON_INSUFFICIENT");
    expect(outcome.evaluatorConditionStatus).toBe("NOT_DETERMINABLE");
  expect(JSON.stringify(outcome)).not.toContain("projection");
  });

  it("keeps NOT_EVALUATED, COMPARISON_INSUFFICIENT, and INCOMPLETE distinct", () => {
    const notEvaluated = validInput();
    notEvaluated.evaluator = undefined;
    limited(finalizeC18ComparisonRecord(notEvaluated), "NOT_EVALUATED");

    const insufficient = validInput();
    insufficient.candidate = { ...insufficient.candidate, primaryReference: undefined };
    limited(
      finalizeC18ComparisonRecord(insufficient),
      "COMPARISON_INSUFFICIENT",
    );

    const invalidInput = {
      ...validInput(),
      chainOfThought: "unrestricted hidden deliberation",
    } as unknown as C18ComparisonRecordInput;
    const incompleteOutcome = incomplete(
      finalizeC18ComparisonRecord(invalidInput),
    );
    expect(incompleteOutcome.reasons).toContain("FORBIDDEN_FIELD");
  });

  it("retains only allowlisted established facts in deeply immutable incomplete evidence", () => {
    const input = {
      ...validInput(),
      chainOfThought: "forbidden reasoning",
      metadata: { prompt: "forbidden prompt", score: 0.91 },
      finalizationState: "FINALIZED",
      sealed: true,
    } as unknown as C18ComparisonRecordInput;
    const outcome = incomplete(finalizeC18ComparisonRecord(input));
    expect(JSON.stringify(outcome)).not.toContain("forbidden");
    expect(JSON.stringify(outcome)).not.toContain("prompt");
    expect(outcome.established).not.toHaveProperty("metadata");
    expect(outcome.established).not.toHaveProperty("finalizationState");
    expect(outcome.established).not.toHaveProperty("boundaryLinkage");
    expect(Object.isFrozen(outcome)).toBe(true);
    expect(Object.isFrozen(outcome.established)).toBe(true);
  });

  it("does not establish convention-valid C20 linkage before package correspondence", () => {
    const input = {
      ...validInput(),
      boundaryLinkage: {
        ...validInput().boundaryLinkage,
        c20InvocationEventId: "SYNTHETIC-CYCLE:C20:event:9999",
      },
      chainOfThought: "forces an incomplete record without establishing provenance",
    } as unknown as C18ComparisonRecordInput;
    const outcome = incomplete(finalizeC18ComparisonRecord(input));

    expect(outcome.reasons).toContain("FORBIDDEN_FIELD");
    expect(outcome.established).not.toHaveProperty("boundaryLinkage");
    expect(JSON.stringify(outcome)).not.toContain("event:9999");
  });

  it("gives integrity defects precedence and recursively excludes rejected nested facts", () => {
    const input = {
      ...validInput(),
      candidateCaptureId: undefined,
      chainOfThought: "must not survive",
      candidate: {
        primaryReference: {
          ...reference("candidate.supportedFindings[0].statement"),
          payload: { privateNarrative: "must not survive" },
        },
        evidenceReferencesRequired: false,
        evidenceReferences: [{ path: "", immutableValueIdentity: "", payload: "must not survive" }],
      },
      heldOutAssessment: {
        ...validInput().heldOutAssessment,
        payload: { privateNarrative: "must not survive" },
      },
      evaluator: {
        ...validInput().evaluator,
        rationale: "must not survive",
      },
      comparisonRule: {
        ...validInput().comparisonRule,
        copiedCriterion: "must not survive",
      },
      boundaryLinkage: {
        ...validInput().boundaryLinkage,
        c12CaptureId: "MISMATCHED-C12",
      },
    } as unknown as C18ComparisonRecordInput;
    const outcome = incomplete(finalizeC18ComparisonRecord(input));

    expect(outcome.reasons).toEqual(expect.arrayContaining([
      "FORBIDDEN_FIELD",
      "MISSING_CANDIDATE_CAPTURE_ID",
      "MISSING_REQUIRED_EVIDENCE_REFERENCE",
      "MISSING_C12_LINKAGE",
    ]));
    expect(outcome.established).not.toHaveProperty("candidate");
    expect(outcome.established).not.toHaveProperty("boundaryLinkage");
    expect(JSON.stringify(outcome)).not.toContain("must not survive");
    expect(JSON.stringify(outcome)).not.toContain("MISMATCHED-C12");
  });

  it("returns attributable incomplete evidence for malformed nested runtime input", () => {
    const malformed = validInput() as unknown as Record<string, unknown>;
    malformed.uncertainty = { status: "PRESENT", reasons: null, limitingReferences: null };
    const outcome = incomplete(finalizeC18ComparisonRecord(malformed));
    expect(outcome.reasons).toEqual(expect.arrayContaining([
      "MISSING_UNCERTAINTY",
      "INCONSISTENT_SEMANTIC_LAYERS",
    ]));
    const nonArrayReasons = validInput() as unknown as Record<string, unknown>;
    nonArrayReasons.uncertainty = {
      status: "PRESENT",
      reasons: {},
      limitingReferences: [],
    };
    expect(() => finalizeC18ComparisonRecord(nonArrayReasons)).not.toThrow();
    expect(finalizeC18ComparisonRecord(nonArrayReasons).finalizationState)
      .toBe("INCOMPLETE");
    expect(() => finalizeC18ComparisonRecord(null)).not.toThrow();
    expect(finalizeC18ComparisonRecord(null).finalizationState).toBe("INCOMPLETE");
  });

  it("closes disagreement alternatives", () => {
    const unrestricted = validInput();
    unrestricted.disagreement = {
      status: "PRESENT",
      alternatives: ["free-form alternative rationale"],
    } as never;
    const unrestrictedOutcome = incomplete(
      finalizeC18ComparisonRecord(unrestricted),
    );
    expect(JSON.stringify(unrestrictedOutcome)).not.toContain("free-form");

  });

  it("refuses credible-alternative uncertainty without present disagreement", () => {
    const contradictory = validInput();
    contradictory.observation = { classification: "DIFFERENCE" };
    contradictory.inference = { classification: "MATERIAL_DIFFERENCE" };
    contradictory.semanticDisposition = "MATERIAL_DIFFERENCE";
    contradictory.evaluatorConditionStatus = "NOT_SATISFIED";
    contradictory.uncertainty = {
      status: "PRESENT",
      reasons: ["CREDIBLE_ALTERNATIVES_REMAIN"],
      limitingReferences: [],
    };
    const outcome = incomplete(finalizeC18ComparisonRecord(contradictory));
    expect(outcome.reasons).toContain("INCONSISTENT_SEMANTIC_LAYERS");

    const compatible = {
      ...contradictory,
      disagreement: {
        status: "PRESENT" as const,
        alternativeReferences: [reference("candidate.credibleAlternatives[0]")],
      },
    };
    expect(finalizeC18ComparisonRecord(compatible).finalizationState).toBe("FINALIZED");
  });

  it("enforces every combination in the existing semantic status model", () => {
    const observations = [
      "MATCH", "DIFFERENCE", "ABSENCE", "CONTRADICTION", "UNABLE_TO_OBSERVE",
    ] as const;
    const inferences = [
      "MATERIAL_EQUIVALENCE", "MATERIAL_DIFFERENCE", "UNSUPPORTED",
      "CONTRADICTORY", "INDETERMINATE",
    ] as const;
    const dispositions = [
      "MATERIAL_EQUIVALENCE", "MATERIAL_DIFFERENCE",
      "COMPARISON_INSUFFICIENT", "NOT_EVALUATED",
    ] as const;
    const conditions = [
      "SATISFIED", "NOT_SATISFIED", "NOT_DETERMINABLE", "NOT_EVALUATED",
    ] as const;
    for (const observation of observations) for (const inference of inferences) {
      for (const disposition of dispositions) for (const condition of conditions) {
        for (const uncertain of [false, true]) {
          const input = validInput();
          input.observation = { classification: observation };
          input.inference = { classification: inference };
          input.semanticDisposition = disposition;
          input.evaluatorConditionStatus = condition;
          input.uncertainty = uncertain
            ? { status: "PRESENT", reasons: ["CREDIBLE_ALTERNATIVES_REMAIN"], limitingReferences: [] }
            : { status: "NONE", reasons: [], limitingReferences: [] };
          input.disagreement = uncertain
            ? {
              status: "PRESENT",
              alternativeReferences: [reference("candidate.credibleAlternatives[0]")],
            }
            : { status: "NONE", alternativeReferences: [] };
          const accepted =
            (disposition === "MATERIAL_EQUIVALENCE" && observation === "MATCH" &&
              inference === "MATERIAL_EQUIVALENCE" && condition === "SATISFIED" && !uncertain) ||
            (disposition === "MATERIAL_DIFFERENCE" &&
              ["DIFFERENCE", "ABSENCE", "CONTRADICTION"].includes(observation) &&
              ["MATERIAL_DIFFERENCE", "UNSUPPORTED", "CONTRADICTORY"].includes(inference) &&
              condition === "NOT_SATISFIED") ||
            (disposition === "COMPARISON_INSUFFICIENT" &&
              observation === "UNABLE_TO_OBSERVE" && inference === "INDETERMINATE" &&
              condition === "NOT_DETERMINABLE" && uncertain) ||
            (disposition === "NOT_EVALUATED" && observation === "UNABLE_TO_OBSERVE" &&
              inference === "INDETERMINATE" && condition === "NOT_EVALUATED" && uncertain);
          const outcome = finalizeC18ComparisonRecord(input);
          expect(outcome.finalizationState).toBe(accepted ? "FINALIZED" : "INCOMPLETE");
          if (!accepted) expect((outcome as IncompleteC18ComparisonRecord).reasons)
            .toContain("INCONSISTENT_SEMANTIC_LAYERS");
        }
      }
    }
  });

  it("assigns exact C20 record/event and C21 finding identities without semantic transfer", () => {
    const recorder = createContemporaneousRecorder("SYNTHETIC-CYCLE:C20");
    const invocation = recorder.record("C18", "invocation", "evaluateHeldOut");
    const sealed = recorder.seal();
    const c21 = assessContamination(sealed);

    expect(sealed.recordId).toBe("SYNTHETIC-CYCLE:C20");
    expect(invocation.eventId).toBe("SYNTHETIC-CYCLE:C20:event:0001");
    expect(c21.findingId).toBe("SYNTHETIC-CYCLE:C20:C21:finding");
    expect(JSON.stringify(sealed)).not.toContain("semanticDisposition");
    expect(JSON.stringify(c21)).not.toContain("semanticDisposition");
  });

  it("keeps authoritative C18/C20/C21 association private and fail-closed", () => {
    const recorder = createContemporaneousRecorder("SYNTHETIC-CYCLE:C20");
    const invocation = recorder.record("C18", "invocation", "evaluateHeldOut");
    const accessRecord = recorder.seal();
    const contamination = assessContamination(accessRecord);
    const surrogateRecord = {
      recordId: accessRecord.recordId,
      sealed: true,
      events: accessRecord.events.map((event) => ({ ...event })),
    };
    const surrogateFinding = {
      ...contamination,
      findings: [...contamination.findings],
    };

    expect(surrogateRecord).toEqual(accessRecord);
    expect(surrogateRecord).not.toBe(accessRecord);
    expect(surrogateFinding).toEqual(contamination);
    expect(surrogateFinding).not.toBe(contamination);
    expect(invocation.eventId).toBe("SYNTHETIC-CYCLE:C20:event:0001");
    expect(experimentModule).not.toHaveProperty("associateEvaluatorEvidence");

    const experimentSource = fs.readFileSync(path.join(sourceRoot, "experiment.ts"), "utf8");
    expect(experimentSource).toContain("function associateEvaluatorEvidence(");
    expect(experimentSource).not.toContain("export function associateEvaluatorEvidence(");
    expect(experimentSource.match(/associateEvaluatorEvidence\(/g)).toHaveLength(3);
    expect(experimentSource).toContain("semanticEvaluation.comparisonRecords.length === 0");
    expect(experimentSource).toContain("recordIds.has(comparisonRecordId)");
    expect(experimentSource).toContain(
      "associations.length === semanticEvaluation.comparisonRecords.length",
    );
    expect(experimentSource).toContain("mechanical.status === \"COMPLETED\" &&");
    expect(experimentSource).toContain("!evaluatorEvidenceAssociations");
    expect(experimentSource).toContain("stoppedAt: \"associateEvaluatorEvidence\"");
    expect(experimentSource).toContain(
      "mechanical?.status !== \"COMPLETED\"",
    );
    expect(experimentSource).toContain("const mechanical = shallowRecord(");
    expect(experimentSource).toContain("hasTotalOwnerEstablishedAssociations(");
    expect(experimentSource).toContain("evidence.cycleId !== expectedCycleId");

    const malformedEvent = validInput();
    malformedEvent.boundaryLinkage = {
      ...malformedEvent.boundaryLinkage!,
      c20InvocationEventId: "SYNTHETIC-CYCLE:C20:event:not-real",
    };
    expect(incomplete(finalizeC18ComparisonRecord(malformedEvent)).reasons)
      .toContain("MISSING_C20_LINKAGE");
  });

  it("prevents aggregate pass over insufficient or incomplete C18 outcomes", () => {
    const insufficientInput = validInput();
    insufficientInput.candidate = { ...insufficientInput.candidate, primaryReference: undefined };
    const insufficientOutcome = limited(
      finalizeC18ComparisonRecord(insufficientInput),
      "COMPARISON_INSUFFICIENT",
    );
    const incompleteOutcome = incomplete(finalizeC18ComparisonRecord({
      ...validInput(),
      chainOfThought: "forbidden",
    }));
    expect(deriveC18AggregateState([insufficientOutcome], false)).toEqual({
      status: "failed",
      evaluatorConditionStatus: "NOT_DETERMINABLE",
    });
    expect(deriveC18AggregateState([finalized(), incompleteOutcome], false)).toEqual({
      status: "failed",
      evaluatorConditionStatus: "NOT_DETERMINABLE",
    });
    expect(deriveC18AggregateState([], false)).toEqual({
      status: "failed",
      evaluatorConditionStatus: "NOT_DETERMINABLE",
    });
  });

  it("produces attributable insufficiency for zero-value cardinality without support escape", () => {
    const zeroValue = validInput();
    zeroValue.candidate = {
      primaryReference: undefined,
      evidenceReferencesRequired: false,
      evidenceReferences: [],
    };
    expect(() => finalizeC18ComparisonRecord(zeroValue)).not.toThrow();
    limited(finalizeC18ComparisonRecord(zeroValue), "COMPARISON_INSUFFICIENT");

    const invalidSupport = validInput();
    invalidSupport.candidate!.evidenceReferences = [{ path: "", immutableValueIdentity: "" }];
    limited(finalizeC18ComparisonRecord(invalidSupport), "COMPARISON_INSUFFICIENT");

    const evaluationSource = fs.readFileSync(path.join(sourceRoot, "evaluation.ts"), "utf8");
    expect(evaluationSource).toContain("input.candidate.length === 1");
    expect(evaluationSource).not.toContain("input.candidate.slice(1).map(immutableReference)");
    expect(evaluationSource).not.toContain("input.heldOut.slice(1).map(immutableReference)");
  });

  it("keeps C18 outcomes immutable and separately attributable", () => {
    const first = finalized();
    const second = finalized({
      ...validInput(),
      comparisonRecordId: "SYNTHETIC-CYCLE:C18:002",
    });
    expect(first.comparisonRecordId).not.toBe(second.comparisonRecordId);
    expect(Object.isFrozen(first.candidate.primaryReference)).toBe(true);
    expect(Reflect.set(first, "cycleId", "changed")).toBe(false);
  });

  it("carries finalized and visibly incomplete outcomes without changing identity", () => {
    const complete = finalized();
    const incompleteOutcome = incomplete(finalizeC18ComparisonRecord({
      ...validInput(),
      chainOfThought: "must not survive package carriage",
    } as unknown as C18ComparisonRecordInput));
    const packageValue = Object.freeze({
      semanticEvaluation: Object.freeze({
        status: "failed" as const,
        mismatches: Object.freeze([]),
        evaluatorConditionStatus: "NOT_DETERMINABLE" as const,
        comparisonRecords: Object.freeze([complete, incompleteOutcome]),
      }),
    });

    expect(packageValue.semanticEvaluation.comparisonRecords[0]).toBe(complete);
    expect(packageValue.semanticEvaluation.comparisonRecords[1]).toBe(incompleteOutcome);
    expect(packageValue.semanticEvaluation.comparisonRecords[1].finalizationState)
      .toBe("INCOMPLETE");
    expect(JSON.stringify(packageValue)).not.toContain("must not survive");
  });

  it("has no denied C18 reuse path across the whole TypeScript repository", () => {
    const files = walk(repositoryRoot).filter((fileName) =>
      fileName.endsWith(".ts") && !fileName.includes("node_modules") &&
      !fileName.includes("/__tests__/"));
    const importers = files.filter((fileName) =>
      fs.readFileSync(fileName, "utf8").includes("comparison-evidence"));
    expect(importers.map((fileName) => path.relative(sourceRoot, fileName)))
      .toEqual(["evaluation.ts"]);

    const recordReaders = files.filter((fileName) =>
      fs.readFileSync(fileName, "utf8").includes(".comparisonRecords"));
    expect(recordReaders.map((fileName) => path.relative(sourceRoot, fileName)).sort())
      .toEqual(["experiment.ts"]);

    const evidenceSource = fs.readFileSync(path.join(sourceRoot, "comparison-evidence.ts"), "utf8");
    expect(evidenceSource.match(/^import .*$/gm) ?? []).toEqual([]);
    for (const denied of [
      "node:fs", "node:path", "process.env", "fetch(", "console.", "Memory",
      "Learning", "retrieval", "prompt", "configuration", "cache", "prior-state",
      "analytics", "indexing", "generalized logging", "future-execution",
    ]) expect(evidenceSource).not.toContain(denied);
  });

  it("keeps C22 opaque and C23/C24 semantically blind", () => {
    const experimentSource = fs.readFileSync(path.join(sourceRoot, "experiment.ts"), "utf8");
    const preservationSource = fs.readFileSync(path.join(sourceRoot, "preservation.ts"), "utf8");
    for (const source of [experimentSource, preservationSource]) {
      expect(source).not.toContain("candidateProjectionAdmission");
      expect(source).not.toContain("heldOutProjectionAdmission");
    }
    expect(preservationSource).not.toContain("semanticDisposition");
    expect(preservationSource).not.toContain("comparison-evidence");
  });
});

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}