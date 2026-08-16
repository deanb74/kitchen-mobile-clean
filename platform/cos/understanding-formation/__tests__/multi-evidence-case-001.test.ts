import { describe, expect, it } from "@jest/globals";
import fs from "node:fs";
import path from "node:path";

import { resolveRepositoryRootFromDirectory } from "../../../../scripts/support/repositoryRoot";
import {
    CASE_001_CONTROL_ARTIFACTS,
    CASE_001_HELD_OUT_RELATIVE_PATH,
    CASE_001_HELD_OUT_SHA256,
    CASE_001_RUNTIME_RELATIVE_PATH,
    CASE_001_RUNTIME_SHA256,
    literalJsonParse,
    readControlHeldOutArtifactBytes,
    readControlRuntimeArtifactBytes,
    readHeldOutArtifactBytes,
    readRuntimeArtifactBytes,
    verifyControlHeldOutArtifactHash,
    verifyControlRuntimeArtifactHash,
    verifyHeldOutArtifactHash,
    verifyRuntimeArtifactHash,
    type Case001ControlId,
    type Case001EvidenceCycleId,
} from "../multi-evidence-case-001/artifacts";
import { accumulateWithoutUnderstanding } from "../multi-evidence-case-001/baseline";
import { formMultiEvidenceUnderstanding } from "../multi-evidence-case-001/candidate";
import {
    validateBaselineOutput,
    validateCandidateOutput,
    validateHeldOutAssessment,
    validateRuntimeFixture,
    type HeldOutAssessment,
    type MultiEvidenceRuntimeFixture,
} from "../multi-evidence-case-001/contracts";
import {
    APPLICABLE_INVARIANTS,
    CROSS_CYCLE_INVARIANTS,
    CYCLE_LOCAL_INVARIANTS,
    assessContamination,
    checkApplicableInvariants,
    checkCrossCycleInvariants,
    checkCycleLocalInvariants,
    compareCandidateAndBaseline,
    constructTargetedTamper,
    evaluateHeldOutAssessment,
} from "../multi-evidence-case-001/evaluation";
import {
    CASE_001_CAMPAIGN_CYCLE_ORDER,
    coordinateCase001CampaignMechanically,
    coordinateCase001Mechanically,
    mechanicalFail,
    mechanicalPass,
    runCase001Campaign,
    type CampaignCycleOutcome,
    type Case001MechanicalSteps,
    type CrossCycleEvaluationOutcome,
} from "../multi-evidence-case-001/experiment";
import {
    captureImmutableOutputs,
    createContemporaneousRecorder,
    createImmutableInputs,
    structuralDigest,
} from "../multi-evidence-case-001/integrity";

const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);

function syntheticFixture(): MultiEvidenceRuntimeFixture {
  return {
    fixtureId: "MEU-SYNTHETIC-ISOLATION-TEST",
    fixtureVersion: "1.0.0",
    entities: [{ entityId: "synthetic-person", entityType: "person" }],
    sources: [
      {
        sourceId: "synthetic-source",
        sourceType: "person",
        providerEntityId: "synthetic-person",
      },
    ],
    observations: [
      {
        observationId: "synthetic-observation-prior",
        sourceId: "synthetic-source",
        sourceChannel: "synthetic",
        eventTimes: ["SYNTHETIC-PRIOR"],
        content: "The source reports conversation present during a prior period.",
      },
      {
        observationId: "synthetic-observation-current",
        sourceId: "synthetic-source",
        sourceChannel: "synthetic",
        eventTimes: ["SYNTHETIC-CURRENT"],
        content: "The source reports no conversation during a current period.",
      },
      {
        observationId: "synthetic-observation-direct",
        sourceId: "synthetic-source",
        sourceChannel: "synthetic",
        eventTimes: ["SYNTHETIC-CURRENT"],
        content: "Synthetic-person said, 'No change is requested.'",
      },
    ],
    translations: [
      {
        translationId: "synthetic-translation-prior",
        observationId: "synthetic-observation-prior",
        meaning: "Synthetic-person reports conversation present during the prior period.",
        translationConfidence: "high",
        alternativeTranslations: [],
      },
      {
        translationId: "synthetic-translation-current",
        observationId: "synthetic-observation-current",
        meaning: "Synthetic-person reports no conversation during the current period.",
        translationConfidence: "high",
        alternativeTranslations: [],
      },
      {
        translationId: "synthetic-translation-direct",
        observationId: "synthetic-observation-direct",
        meaning: "Synthetic-person directly stated that no change is requested.",
        translationConfidence: "high",
        alternativeTranslations: [],
      },
    ],
    context: [
      {
        contextId: "synthetic-context",
        sourceId: "synthetic-source",
        effectiveTime: "SYNTHETIC-CURRENT",
        purpose: "Form a bounded synthetic account.",
        people: ["synthetic-person"],
        place: "synthetic-place",
        timeScope: "synthetic-current",
        permittedUse: "Synthetic component and isolation testing only.",
        unavailableDataScope: ["private-health-information"],
        reviewTrigger: "Material synthetic evidence changes.",
      },
    ],
    knowledgeCandidates: [
      {
        knowledgeId: "synthetic-knowledge",
        sourcePath: "synthetic/canonical.md",
        sourceSection: "Synthetic",
        sourceStatus: "synthetic-authority",
        claim: "Incomplete evidence requires explicit uncertainty.",
        scope: "Synthetic formation",
        applicabilityConditions: ["Current knowledge is incomplete."],
      },
    ],
  };
}

function syntheticAssessment(
  fixture: MultiEvidenceRuntimeFixture,
  expectedStatus: HeldOutAssessment["expectedFormationStatus"],
): HeldOutAssessment {
  return {
    assessmentId: "SYNTHETIC-ASSESSMENT",
    assessmentVersion: "1.0.0",
    assessmentStatus: "SYNTHETIC",
    fixtureId: fixture.fixtureId,
    fixtureVersion: fixture.fixtureVersion,
    runtimeAccess: "DENIED",
    expectedFormationStatus: expectedStatus,
    expectedAvailableEvidenceInventory: {
      entityIds: fixture.entities.map((item) => item.entityId),
      sourceIds: fixture.sources.map((item) => item.sourceId),
      observationIds: fixture.observations.map((item) => item.observationId),
      translationIds: fixture.translations.map((item) => item.translationId),
      contextIds: fixture.context.map((item) => item.contextId),
      knowledgeCandidateIds: fixture.knowledgeCandidates.map(
        (item) => item.knowledgeId,
      ),
    },
    expectedEvidenceTreatment: [],
    expectedSourceAndTranslationDistinctions: [],
    expectedEvidenceRelationships: [],
    expectedKnowledgeApplicability: [],
    expectedNonApplicableKnowledge: [],
    requiredFindings: [],
    requiredContextSpecificSignificance:
      "The supported relationships affect the bounded current account while unresolved meaning remains outside what the evidence establishes.",
    expectedContradictions: [],
    credibleAlternatives: [],
    requiredAssumptionsAndInferenceBases: [],
    requiredUnknownsAndEvidenceNeeds: [],
    expectedConfidenceAndCompletenessDirection: {},
    priorAccountAndCorrectionRequirements: "Not Applicable",
    prohibitedConclusions: ["synthetic prohibited conclusion"],
    prohibitedJudgementAuthorityOrActionContent: ["synthetic prohibited action"],
    semanticEvaluationRule: "Synthetic structured evaluation only.",
  };
}

function allPassingSteps(
  onSeal: () => void,
  onAssessment: () => void,
): Case001MechanicalSteps {
  return {
    activateRecorder: mechanicalPass,
    readRuntime: mechanicalPass,
    verifyRuntime: mechanicalPass,
    parseRuntime: mechanicalPass,
    validateRuntime: mechanicalPass,
    createInputs: mechanicalPass,
    verifyInputEquality: mechanicalPass,
    invokeCandidateBoundary: mechanicalPass,
    invokeCandidateFormation: mechanicalPass,
    invokeBaseline: mechanicalPass,
    validateCandidateOutput: mechanicalPass,
    validateBaselineOutput: mechanicalPass,
    captureOutputs: mechanicalPass,
    evaluateInvariants: mechanicalPass,
    constructAndEvaluateTampers: mechanicalPass,
    compareCandidateAndBaseline: mechanicalPass,
    readHeldOut: mechanicalPass,
    verifyHeldOut: mechanicalPass,
    parseHeldOut: mechanicalPass,
    validateHeldOut: mechanicalPass,
    evaluateHeldOut: mechanicalPass,
    sealRecorder: () => {
      onSeal();
      return mechanicalPass();
    },
    assessContamination: () => {
      onAssessment();
      return mechanicalPass();
    },
  };
}

function syntheticCampaignOutcome(
  cycleId: Case001EvidenceCycleId,
  fixture: MultiEvidenceRuntimeFixture = syntheticFixture(),
): CampaignCycleOutcome {
  const candidate = formMultiEvidenceUnderstanding(fixture);
  const capture = captureImmutableOutputs(
    candidate,
    accumulateWithoutUnderstanding(fixture),
  );
  const recorder = createContemporaneousRecorder(`${cycleId}:C20`);
  recorder.record("C12", "capture", "immutable-output-capture");
  const invocation = recorder.record("C18", "invocation", "evaluateHeldOut");
  const semanticEvaluation = evaluateHeldOutAssessment(
    candidate,
    syntheticAssessment(fixture, candidate.status),
    {
      cycleId,
      candidateCaptureId: `${cycleId}:C12:${structuralDigest(capture.candidate)}`,
      heldOutHash: "synthetic-held-out-hash",
      c20RecordId: recorder.recordId,
      c20InvocationEventId: invocation.eventId,
    },
  );
  recorder.record("C20", "assessment-handoff", "C21");
  const accessRecord = recorder.seal();
  const contaminationAssessment = assessContamination(accessRecord);
  const evaluatorEvidenceAssociations = semanticEvaluation.comparisonRecords.map(
    (record) => {
      if (!("comparisonRecordId" in record)) {
        throw new Error("Synthetic C18 comparison did not finalize.");
      }
      return Object.freeze({
        c18ComparisonRecordId: record.comparisonRecordId,
        c20RecordId: accessRecord.recordId,
        c20InvocationEventId: invocation.eventId,
        c21FindingId: contaminationAssessment.findingId,
      });
    },
  );
  return {
    status: mechanicalPass(),
    evidence: {
      cycleId,
      mechanical: { status: "COMPLETED", completedSteps: ["synthetic"] },
      capture,
      semanticEvaluation,
      accessRecord,
      contaminationAssessment,
      evaluatorEvidenceAssociations: Object.freeze(evaluatorEvidenceAssociations),
    },
  };
}

describe("HH-0000 MEU Case 001 bounded implementation evidence", () => {
  it("verifies exact frozen bytes and refuses changed bytes without candidate execution", () => {
    const runtimeBytes = readRuntimeArtifactBytes();
    expect(verifyRuntimeArtifactHash(runtimeBytes)).toBe(CASE_001_RUNTIME_SHA256);
    expect(() => verifyRuntimeArtifactHash(
      Buffer.concat([Buffer.from(runtimeBytes), Buffer.from("changed")]),
    )).toThrow("C02 artifact hash mismatch");

    const heldOutBytes = readHeldOutArtifactBytes(true);
    expect(verifyHeldOutArtifactHash(heldOutBytes)).toBe(CASE_001_HELD_OUT_SHA256);
    expect(() => verifyHeldOutArtifactHash(
      Buffer.concat([Buffer.from(heldOutBytes), Buffer.from("changed")]),
    )).toThrow("C16 artifact hash mismatch");
  });

  it("parses and structurally validates frozen artifacts without candidate execution", () => {
    const runtime = literalJsonParse(readRuntimeArtifactBytes());
    validateRuntimeFixture(runtime);
    expect(runtime.fixtureId).toBe("MEU-CASE-001");

    const heldOut = literalJsonParse(readHeldOutArtifactBytes(true));
    validateHeldOutAssessment(heldOut);
    expect(heldOut.runtimeAccess).toBe("DENIED");
  });

  it("incorporates frozen controls through artifact boundaries without execution", () => {
    const expectedFixtureIds: Record<Case001ControlId, string> = {
      "MEU-I-14": "MEU-CASE-001-V01",
      "MEU-I-15": "MEU-CASE-001-V02",
    };

    for (const controlId of Object.keys(
      CASE_001_CONTROL_ARTIFACTS,
    ) as Case001ControlId[]) {
      const identity = CASE_001_CONTROL_ARTIFACTS[controlId];
      const runtimeBytes = readControlRuntimeArtifactBytes(controlId);
      expect(verifyControlRuntimeArtifactHash(controlId, runtimeBytes))
        .toBe(identity.runtimeSha256);
      expect(() => verifyControlRuntimeArtifactHash(
        controlId,
        Buffer.concat([Buffer.from(runtimeBytes), Buffer.from("changed")]),
      )).toThrow("C02 artifact hash mismatch");
      const runtime = literalJsonParse(runtimeBytes);
      validateRuntimeFixture(runtime);
      expect(runtime.fixtureId).toBe(expectedFixtureIds[controlId]);

      const recorder = createContemporaneousRecorder();
      expect(() => readControlHeldOutArtifactBytes(
        controlId,
        false,
        recorder,
      )).toThrow("Held-out access denied before immutable output capture");
      expect(recorder.seal().events).toEqual([
        expect.objectContaining({
          component: "C15",
          kind: "denied-access",
          subject: "held-out-before-output-capture",
        }),
      ]);

      const heldOutBytes = readControlHeldOutArtifactBytes(controlId, true);
      expect(verifyControlHeldOutArtifactHash(controlId, heldOutBytes))
        .toBe(identity.heldOutSha256);
      expect(() => verifyControlHeldOutArtifactHash(
        controlId,
        Buffer.concat([Buffer.from(heldOutBytes), Buffer.from("changed")]),
      )).toThrow("C16 artifact hash mismatch");
      const heldOut = literalJsonParse(heldOutBytes);
      validateHeldOutAssessment(heldOut);
      expect(heldOut.fixtureId).toBe(expectedFixtureIds[controlId]);
      expect(heldOut.runtimeAccess).toBe("DENIED");
    }
  });

  it("refuses held-out access before immutable output capture", () => {
    const recorder = createContemporaneousRecorder();
    expect(() => readHeldOutArtifactBytes(false, recorder)).toThrow(
      "Held-out access denied before immutable output capture",
    );
    expect(recorder.seal().events).toEqual([
      expect.objectContaining({
        component: "C15",
        kind: "denied-access",
        subject: "held-out-before-output-capture",
      }),
    ]);
  });

  it("creates equal, separate, deeply immutable candidate and baseline inputs", () => {
    const fixture = syntheticFixture();
    const { candidateInput, baselineInput } = createImmutableInputs(fixture);

    expect(candidateInput).not.toBe(baselineInput);
    expect(structuralDigest(candidateInput)).toBe(structuralDigest(baselineInput));
    expect(structuralDigest(candidateInput)).toBe(structuralDigest(fixture));
    expect(Object.isFrozen(candidateInput.observations)).toBe(true);
    expect(() => {
      (candidateInput.observations as MultiEvidenceRuntimeFixture["observations"])
        .push(fixture.observations[0]);
    }).toThrow();
    expect(baselineInput.observations).toHaveLength(3);
  });

  it("keeps all semantic formation inside the candidate on synthetic input", () => {
    const output = formMultiEvidenceUnderstanding(syntheticFixture());
    validateCandidateOutput(output);

    expect(output.formationOwner).toBe("Understanding");
    expect(output.status).toBe("MULTI_EVIDENCE_UNDERSTANDING_PARTIAL");
    expect(output.evidenceRelationships).toEqual(expect.arrayContaining([
      expect.objectContaining({ relationshipType: "qualified-contrast" }),
      expect.objectContaining({ relationshipType: "attributed-direct-claim" }),
    ]));
    expect(Object.keys(output)).toEqual(expect.arrayContaining([
      "accountId",
      "status",
      "purposeReference",
      "availableEvidenceInventory",
      "acceptedEvidence",
      "excludedOrRejectedEvidence",
      "sourceClaims",
      "translationInterpretations",
      "evidenceRelationships",
      "knowledgeApplicability",
      "supportedFindings",
      "contextSpecificSignificance",
      "contradictions",
      "credibleAlternatives",
      "assumptionsAndInferenceBases",
      "unknownsAndEvidenceNeeds",
      "confidence",
      "completeness",
      "priorAccountAndCorrectionLinks",
      "synthesis",
    ]));
  });

  it("keeps the baseline accumulation-only and captures outputs immutably", () => {
    const fixture = syntheticFixture();
    const candidate = formMultiEvidenceUnderstanding(fixture);
    const baseline = accumulateWithoutUnderstanding(fixture);
    validateBaselineOutput(baseline);

    expect(baseline.preservedContent).toHaveLength(8);
    expect("status" in baseline).toBe(false);
    expect("evidenceRelationships" in baseline).toBe(false);
    const capture = captureImmutableOutputs(candidate, baseline);
    expect(Object.isFrozen(capture)).toBe(true);
    expect(Object.isFrozen(capture.candidate.supportedFindings)).toBe(true);
  });

  it("passes genuine synthetic invariants and exposes missing real controls", () => {
    const fixture = syntheticFixture();
    const output = formMultiEvidenceUnderstanding(fixture);
    const withoutControls = checkApplicableInvariants(fixture, output);
    expect(withoutControls.filter((item) => item.status === "not-exercised")
      .map((item) => item.invariant)).toEqual(["MEU-I-14", "MEU-I-15"]);

    const reordered = {
      ...fixture,
      observations: [...fixture.observations].reverse(),
      translations: [...fixture.translations].reverse(),
    };
    const decisiveRemoval = {
      ...fixture,
      observations: fixture.observations.slice(1),
      translations: fixture.translations.slice(1),
    };
    const withSyntheticControls = checkApplicableInvariants(fixture, output, {
      semanticReorder: formMultiEvidenceUnderstanding(reordered),
      decisiveEvidenceRemoval: formMultiEvidenceUnderstanding(decisiveRemoval),
    });
    expect(withSyntheticControls.every((item) => item.status === "passed")).toBe(true);
  });

  it("partitions all applicable invariants into disjoint local and cross-cycle sets", () => {
    expect(CYCLE_LOCAL_INVARIANTS).toHaveLength(18);
    expect(CROSS_CYCLE_INVARIANTS).toEqual(["MEU-I-14", "MEU-I-15"]);
    expect(new Set([
      ...CYCLE_LOCAL_INVARIANTS,
      ...CROSS_CYCLE_INVARIANTS,
    ])).toEqual(new Set(APPLICABLE_INVARIANTS));
    expect(CYCLE_LOCAL_INVARIANTS).not.toContain("MEU-I-14");
    expect(CYCLE_LOCAL_INVARIANTS).not.toContain("MEU-I-15");

    const fixture = syntheticFixture();
    expect(checkCycleLocalInvariants(
      fixture,
      formMultiEvidenceUnderstanding(fixture),
    )).toHaveLength(18);
  });

  it("coordinates synthetic cycles once in fixed order before cross-cycle evaluation", () => {
    const invocations: string[] = [];
    let capturesObserved = 0;
    const result = coordinateCase001CampaignMechanically(
      true,
      {
        runCycle(cycleId) {
          invocations.push(cycleId);
          return syntheticCampaignOutcome(cycleId);
        },
        evaluateCrossCycle(captures): CrossCycleEvaluationOutcome {
          invocations.push("cross-cycle-evaluation");
          capturesObserved = Object.keys(captures).length;
          expect(Object.isFrozen(captures)).toBe(true);
          expect(Object.values(captures).every(Object.isFrozen)).toBe(true);
          return {
            status: mechanicalPass(),
            invariantResults: checkCrossCycleInvariants(
              captures["MEU-CASE-001"].candidate,
              captures["MEU-I-14"].candidate,
              formMultiEvidenceUnderstanding({
                ...syntheticFixture(),
                observations: syntheticFixture().observations.slice(1),
                translations: syntheticFixture().translations.slice(1),
              }),
            ),
            tamperedOutputs: [],
          };
        },
      },
      createContemporaneousRecorder(),
    );

    expect(invocations).toEqual([
      ...CASE_001_CAMPAIGN_CYCLE_ORDER,
      "cross-cycle-evaluation",
    ]);
    expect(new Set(invocations.slice(0, 3)).size).toBe(3);
    expect(capturesObserved).toBe(3);
    expect(result.mechanical).toEqual({
      status: "COMPLETED",
      completedCycles: CASE_001_CAMPAIGN_CYCLE_ORDER,
    });
    const cycleEvidence = Object.values(result.cycles);
    expect(cycleEvidence.map((evidence) => evidence.accessRecord))
      .not.toContain(result.campaignAccessRecord);
    expect(cycleEvidence.map((evidence) => evidence.contaminationAssessment))
      .not.toContain(result.campaignContaminationAssessment);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.campaignAccessRecord?.events)).toBe(true);
    expect(result.campaignContaminationAssessment?.status).toBe("clear");
  });

  it("returns attributable STOPPED evidence for shallowly unusable cycle outcomes", () => {
    const affected = syntheticCampaignOutcome("MEU-I-15");
    const cases: readonly Readonly<{
      name: string;
      value: unknown;
      retainedEvidence?: CampaignCycleOutcome["evidence"];
    }>[] = [
      { name: "absent outcome", value: undefined },
      { name: "null outcome", value: null },
      { name: "non-record outcome", value: "not-an-outcome" },
      {
        name: "absent status",
        value: { evidence: affected.evidence },
        retainedEvidence: affected.evidence,
      },
      {
        name: "null status",
        value: { status: null, evidence: affected.evidence },
        retainedEvidence: affected.evidence,
      },
      {
        name: "non-record status",
        value: { status: "PASS", evidence: affected.evidence },
        retainedEvidence: affected.evidence,
      },
      { name: "absent evidence", value: { status: mechanicalPass() } },
      { name: "null evidence", value: { status: mechanicalPass(), evidence: null } },
      {
        name: "non-record evidence",
        value: { status: mechanicalPass(), evidence: "not-evidence" },
      },
      {
        name: "absent mechanics",
        value: {
          status: mechanicalPass(),
          evidence: { ...affected.evidence, mechanical: undefined },
        },
      },
      {
        name: "null mechanics",
        value: {
          status: mechanicalPass(),
          evidence: { ...affected.evidence, mechanical: null },
        },
      },
      {
        name: "non-record mechanics",
        value: {
          status: mechanicalPass(),
          evidence: { ...affected.evidence, mechanical: "not-mechanics" },
        },
      },
    ];

    for (const challenged of cases) {
      const prior = syntheticCampaignOutcome("MEU-I-14");
      const invocations: Case001EvidenceCycleId[] = [];
      let crossCycleInvoked = false;
      const result = coordinateCase001CampaignMechanically(
        true,
        {
          runCycle(cycleId) {
            invocations.push(cycleId);
            return (cycleId === "MEU-I-14"
              ? prior
              : challenged.value) as CampaignCycleOutcome;
          },
          evaluateCrossCycle() {
            crossCycleInvoked = true;
            return {
              status: mechanicalPass(),
              invariantResults: [],
              tamperedOutputs: [],
            };
          },
        },
        createContemporaneousRecorder(),
      );

      expect(invocations).toEqual(["MEU-I-14", "MEU-I-15"]);
      expect(crossCycleInvoked).toBe(false);
      expect(result.mechanical).toEqual({
        status: "STOPPED",
        completedCycles: ["MEU-I-14"],
        stoppedAt: "MEU-I-15",
      });
      expect(result.cycles["MEU-I-14"]).toBe(prior.evidence);
      expect(result.cycles["MEU-I-15"]).toBe(challenged.retainedEvidence);
      expect(result.crossCycleInvariantResults).toEqual([
        expect.objectContaining({ invariant: "MEU-I-14", status: "not-exercised" }),
        expect.objectContaining({ invariant: "MEU-I-15", status: "not-exercised" }),
      ]);
      expect(result.crossCycleTamperedOutputs).toEqual([]);
      expect(result.campaignAccessRecord?.sealed).toBe(true);
      expect(result.campaignContaminationAssessment?.status).toBe("clear");
      expect(Object.isFrozen(result)).toBe(true);
      expect(Object.isFrozen(result.mechanical)).toBe(true);
      expect(Object.isFrozen(result.cycles)).toBe(true);
      expect(challenged.name).not.toBe("");
    }
  });

  it("does not convert a thrown cycle dependency exception into STOPPED", () => {
    expect(() => coordinateCase001CampaignMechanically(
      true,
      {
        runCycle() {
          throw new Error("synthetic dependency failure");
        },
        evaluateCrossCycle() {
          throw new Error("Cross-cycle evaluation must remain unreachable.");
        },
      },
      createContemporaneousRecorder(),
    )).toThrow("synthetic dependency failure");
  });

  it("fails closed on every invalid campaign-cycle association package", () => {
    const valid = syntheticCampaignOutcome("MEU-I-14");
    const associations = valid.evidence.evaluatorEvidenceAssociations!;
    const accessRecord = valid.evidence.accessRecord!;
    const invocationEventId = associations[0].c20InvocationEventId;
    const withEvidence = (
      changes: Partial<CampaignCycleOutcome["evidence"]>,
    ): CampaignCycleOutcome => ({
      ...valid,
      evidence: { ...valid.evidence, ...changes },
    });
    const withChangedInvocation = (
      changes: Partial<(typeof accessRecord.events)[number]>,
    ): CampaignCycleOutcome => withEvidence({
      accessRecord: {
        ...accessRecord,
        events: accessRecord.events.map((event) =>
          event.eventId === invocationEventId ? { ...event, ...changes } : event),
      },
    });
    const replaceFirstAssociation = (
      changes: Partial<(typeof associations)[number]>,
    ): CampaignCycleOutcome => withEvidence({
      evaluatorEvidenceAssociations: [
        { ...associations[0], ...changes },
        ...associations.slice(1),
      ],
    });
    const challenges: readonly [string, CampaignCycleOutcome][] = [
      ["no association", withEvidence({ evaluatorEvidenceAssociations: undefined })],
      ["mechanically stopped", withEvidence({
        mechanical: {
          status: "STOPPED",
          completedSteps: valid.evidence.mechanical.completedSteps,
          stoppedAt: "associateEvaluatorEvidence",
        },
      })],
      ["fabricated association", withEvidence({
        evaluatorEvidenceAssociations: associations.map((association) => ({
          ...association,
          c20RecordId: "FORGED:C20",
          c20InvocationEventId: "FORGED:C20:event:9999",
          c21FindingId: "FORGED:C20:C21:finding",
        })),
      })],
      ["wrong C20 record", replaceFirstAssociation({ c20RecordId: "WRONG:C20" })],
      ["nonexistent C20 event", replaceFirstAssociation({
        c20InvocationEventId: `${accessRecord.recordId}:event:9999`,
      })],
      ["wrong event component", withChangedInvocation({ component: "C19" })],
      ["wrong event kind", withChangedInvocation({ kind: "dependency" })],
      ["wrong event subject", withChangedInvocation({ subject: "not-evaluateHeldOut" })],
      ["wrong C21 finding", replaceFirstAssociation({ c21FindingId: "WRONG:C21" })],
      ["duplicate association", withEvidence({
        evaluatorEvidenceAssociations: [associations[0], ...associations],
      })],
      ["partial association", withEvidence({
        evaluatorEvidenceAssociations: associations.slice(0, -1),
      })],
      ["surplus association", withEvidence({
        evaluatorEvidenceAssociations: [
          ...associations,
          {
            ...associations[0],
            c18ComparisonRecordId: "SURPLUS:C18",
          },
        ],
      })],
      ["cross-cycle substitution", syntheticCampaignOutcome("MEU-I-15")],
      ["association count mismatch", withEvidence({
        evaluatorEvidenceAssociations: associations.slice(1),
      })],
    ];

    expect(associations.length).toBeGreaterThan(1);
    for (const [name, challenged] of challenges) {
      let crossCycleInvoked = false;
      const result = coordinateCase001CampaignMechanically(
        true,
        {
          runCycle() {
            return challenged;
          },
          evaluateCrossCycle() {
            crossCycleInvoked = true;
            return {
              status: mechanicalPass(),
              invariantResults: [],
              tamperedOutputs: [],
            };
          },
        },
        createContemporaneousRecorder(),
      );

      expect(crossCycleInvoked).toBe(false);
      expect(result.mechanical).toEqual({
        status: "STOPPED",
        completedCycles: [],
        stoppedAt: "MEU-I-14",
      });
      expect(result.cycles["MEU-I-14"]).toBe(challenged.evidence);
      expect(Object.isFrozen(result)).toBe(true);
      expect(name).not.toBe("");
    }
  });

  it("refuses both reproduced three-cycle campaign-boundary counterexamples", () => {
    const mapCycles = (
      transform: (outcome: CampaignCycleOutcome) => CampaignCycleOutcome,
    ): Record<Case001EvidenceCycleId, CampaignCycleOutcome> => ({
      "MEU-I-14": transform(syntheticCampaignOutcome("MEU-I-14")),
      "MEU-I-15": transform(syntheticCampaignOutcome("MEU-I-15")),
      "MEU-CASE-001": transform(syntheticCampaignOutcome("MEU-CASE-001")),
    });
    const noAssociationCycles = mapCycles((outcome) => ({
      ...outcome,
      evidence: {
        ...outcome.evidence,
        evaluatorEvidenceAssociations: undefined,
      },
    }));
    const stoppedForgedCycles = mapCycles((outcome) => ({
      ...outcome,
      evidence: {
        ...outcome.evidence,
        mechanical: {
          status: "STOPPED",
          completedSteps: outcome.evidence.mechanical.completedSteps,
          stoppedAt: "associateEvaluatorEvidence",
        },
        evaluatorEvidenceAssociations:
          outcome.evidence.evaluatorEvidenceAssociations!.map((association) => ({
            ...association,
            c20RecordId: "FORGED:C20",
            c20InvocationEventId: "FORGED:C20:event:9999",
            c21FindingId: "FORGED:C20:C21:finding",
          })),
      },
    }));

    for (const cycles of [noAssociationCycles, stoppedForgedCycles]) {
      let crossCycleInvoked = false;
      const result = coordinateCase001CampaignMechanically(
        true,
        {
          runCycle(cycleId) {
            return cycles[cycleId];
          },
          evaluateCrossCycle() {
            crossCycleInvoked = true;
            return {
              status: mechanicalPass(),
              invariantResults: [],
              tamperedOutputs: [],
            };
          },
        },
        createContemporaneousRecorder(),
      );

      expect(crossCycleInvoked).toBe(false);
      expect(result.mechanical).toEqual({
        status: "STOPPED",
        completedCycles: [],
        stoppedAt: "MEU-I-14",
      });
      expect(result.cycles["MEU-I-14"]).toBe(cycles["MEU-I-14"].evidence);
    }
  });

  it("stops the synthetic campaign without duplicate or later cycle execution", () => {
    const invocations: Case001EvidenceCycleId[] = [];
    let crossCycleInvoked = false;
    const result = coordinateCase001CampaignMechanically(
      true,
      {
        runCycle(cycleId) {
          invocations.push(cycleId);
          const outcome = syntheticCampaignOutcome(cycleId);
          return cycleId === "MEU-I-15"
            ? { ...outcome, status: mechanicalFail() }
            : outcome;
        },
        evaluateCrossCycle() {
          crossCycleInvoked = true;
          return {
            status: mechanicalPass(),
            invariantResults: [],
            tamperedOutputs: [],
          };
        },
      },
      createContemporaneousRecorder(),
    );

    expect(invocations).toEqual(["MEU-I-14", "MEU-I-15"]);
    expect(new Set(invocations).size).toBe(invocations.length);
    expect(crossCycleInvoked).toBe(false);
    expect(result.mechanical).toEqual({
      status: "STOPPED",
      completedCycles: ["MEU-I-14"],
      stoppedAt: "MEU-I-15",
    });
    expect(result.crossCycleInvariantResults).toEqual([
      expect.objectContaining({ invariant: "MEU-I-14", status: "not-exercised" }),
      expect.objectContaining({ invariant: "MEU-I-15", status: "not-exercised" }),
    ]);
  });

  it("preserves existing campaign STOPPED behavior for cross-cycle failure", () => {
    const result = coordinateCase001CampaignMechanically(
      true,
      {
        runCycle: syntheticCampaignOutcome,
        evaluateCrossCycle() {
          return {
            status: mechanicalFail(),
            invariantResults: [],
            tamperedOutputs: [],
          };
        },
      },
      createContemporaneousRecorder(),
    );

    expect(result.mechanical).toEqual({
      status: "STOPPED",
      completedCycles: CASE_001_CAMPAIGN_CYCLE_ORDER,
      stoppedAt: "cross-cycle-evaluation",
    });
  });

  it("keeps synthetic cycle captures and C20/C21 evidence independently immutable", () => {
    const outcomes = CASE_001_CAMPAIGN_CYCLE_ORDER.map((cycleId) =>
      syntheticCampaignOutcome(cycleId));
    const captures = outcomes.map((outcome) => outcome.evidence.capture);
    const records = outcomes.map((outcome) => outcome.evidence.accessRecord);
    const assessments = outcomes.map(
      (outcome) => outcome.evidence.contaminationAssessment,
    );

    expect(new Set(captures).size).toBe(3);
    expect(new Set(records).size).toBe(3);
    expect(new Set(assessments).size).toBe(3);
    expect(captures.every((capture) => Object.isFrozen(capture))).toBe(true);
    expect(records.every((record) => Object.isFrozen(record?.events))).toBe(true);
    expect(assessments.every((assessment) => assessment?.status === "clear")).toBe(true);
  });

  it("keeps the cross-cycle evaluator outside candidate formation paths", () => {
    const sourceRoot = path.join(
      repositoryRoot,
      "platform/cos/understanding-formation/multi-evidence-case-001",
    );
    const evaluationSource = fs.readFileSync(
      path.join(sourceRoot, "evaluation.ts"),
      "utf8",
    );
    const imports = [...evaluationSource.matchAll(/from\s+["']([^"']+)["']/g)]
      .map((match) => match[1]);

    expect(imports.sort()).toEqual([
      "./contracts", "./comparison-evidence", "./integrity",
    ].sort());
    expect(evaluationSource).not.toContain("./candidate");
    expect(evaluationSource).not.toContain("formMultiEvidenceUnderstanding");
    expect(evaluationSource).not.toContain("node:fs");
    expect(evaluationSource).not.toContain("process.env");
  });

  it("keeps real semantic controls not-exercised while Gate 4 refuses execution", () => {
    let cycleInvoked = false;
    const refused = coordinateCase001CampaignMechanically(
      false,
      {
        runCycle() {
          cycleInvoked = true;
          return syntheticCampaignOutcome("MEU-I-14");
        },
        evaluateCrossCycle() {
          throw new Error("Cross-cycle evaluation must remain unreachable.");
        },
      },
      createContemporaneousRecorder(),
    );
    const productionRefusal = runCase001Campaign({
      decision: "CORRECTION REQUIRED BEFORE EXECUTION DECISION",
    });

    expect(cycleInvoked).toBe(false);
    expect(refused.mechanical).toEqual({
      status: "STOPPED",
      completedCycles: [],
      stoppedAt: "Gate4",
    });
    expect(productionRefusal.mechanical).toEqual(refused.mechanical);
    expect(productionRefusal.cycles).toEqual({});
    expect(productionRefusal.crossCycleInvariantResults).toEqual([
      expect.objectContaining({ invariant: "MEU-I-14", status: "not-exercised" }),
      expect.objectContaining({ invariant: "MEU-I-15", status: "not-exercised" }),
    ]);
  });

  it("independently detects every applicable targeted tamper", () => {
    const fixture = syntheticFixture();
    const output = formMultiEvidenceUnderstanding(fixture);
    const controls = {
      semanticReorder: output,
      decisiveEvidenceRemoval: formMultiEvidenceUnderstanding({
        ...fixture,
        observations: fixture.observations.slice(1),
        translations: fixture.translations.slice(1),
      }),
    };

    for (const invariant of APPLICABLE_INVARIANTS) {
      const tamper = constructTargetedTamper(output, invariant);
      expect(tamper.changedFields).toHaveLength(1);
      expect(checkApplicableInvariants(fixture, tamper.output, controls)
        .find((item) => item.invariant === invariant)?.status).toBe("failed");
    }
  });

  it("keeps held-out evaluation and candidate/baseline comparison post-output", () => {
    const fixture = syntheticFixture();
    const candidate = formMultiEvidenceUnderstanding(fixture);
    const baseline = accumulateWithoutUnderstanding(fixture);
    const assessment = syntheticAssessment(fixture, candidate.status);

    const evaluation = evaluateHeldOutAssessment(candidate, assessment, {
      cycleId: "SYNTHETIC-CYCLE",
      candidateCaptureId: "SYNTHETIC-CYCLE:C12:candidate-capture",
      heldOutHash: "synthetic-held-out-hash",
      c20RecordId: "SYNTHETIC-CYCLE:C20",
      c20InvocationEventId: "SYNTHETIC-CYCLE:C20:event:0021",
    });
    expect(evaluation.status).toBe("passed");
    expect(evaluation.mismatches).toEqual([]);
    expect(evaluation.evaluatorConditionStatus).toBe("SATISFIED");
    expect(evaluation.comparisonRecords.length).toBeGreaterThan(0);
    expect(evaluation.comparisonRecords.every(
      (record) => record.finalizationState === "FINALIZED" &&
        "candidate" in record &&
        !("candidateProjectionAdmission" in record) &&
        !("heldOutProjectionAdmission" in record),
    )).toBe(true);
    expect(compareCandidateAndBaseline(candidate, baseline)).toEqual({
      candidateHasInspectableAccount: true,
      baselinePreservesCompleteInventory: true,
      baselineContainsUnderstandingFields: false,
    });
  });

  it("records contemporaneously, seals before C21, and assesses only sealed facts", () => {
    const recorder = createContemporaneousRecorder();
    recorder.record("C20", "input", "synthetic-input");
    recorder.record("C12", "capture", "immutable-output-capture");
    recorder.record("C15", "access", CASE_001_HELD_OUT_RELATIVE_PATH);
    recorder.record("C20", "assessment-handoff", "C21");
    const sealed = recorder.seal();

    expect(Object.isFrozen(sealed.events)).toBe(true);
    expect(() => recorder.record("C21", "invocation", "late-write")).toThrow(
      "C20 record is sealed",
    );
    expect(assessContamination(sealed)).toEqual({
      findingId: "C20:access-record:C21:finding",
      status: "clear",
      findings: [],
      sealedRecordSequenceLength: 4,
    });
  });

  it("gives C22 only opaque statuses and fails closed in exact order", () => {
    const stoppedRecorder = createContemporaneousRecorder();
    let stoppedSealed = false;
    const stoppedSteps = allPassingSteps(
      () => { stoppedRecorder.seal(); stoppedSealed = true; },
      () => undefined,
    );
    stoppedSteps.validateRuntime = mechanicalFail;
    const stopped = coordinateCase001Mechanically(
      true,
      stoppedSteps,
      stoppedRecorder,
    );
    expect(stopped).toEqual({
      status: "STOPPED",
      completedSteps: [
        "activateRecorder", "readRuntime", "verifyRuntime", "parseRuntime",
      ],
      stoppedAt: "validateRuntime",
    });
    expect(stoppedSealed).toBe(true);

    const recorder = createContemporaneousRecorder();
    let sealedRecord: ReturnType<typeof recorder.seal> | undefined;
    let assessedAfterSeal = false;
    const completed = coordinateCase001Mechanically(
      true,
      allPassingSteps(
        () => { sealedRecord = recorder.seal(); },
        () => { assessedAfterSeal = recorder.isSealed(); },
      ),
      recorder,
    );
    expect(completed.status).toBe("COMPLETED");
    expect(assessedAfterSeal).toBe(true);
    expect(sealedRecord?.events
      .filter((event) => event.kind === "invocation")
      .map((event) => event.component)).toEqual([
      "C20", "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08",
      "C09", "C10", "C11", "C12", "C13", "C14", "C19", "C15", "C16",
      "C03", "C17", "C18", "C20",
    ]);
    expect(sealedRecord?.events
      .filter((event) => event.kind === "dependency")
      .map((event) => event.subject)).toEqual([
      "C20:activateRecorder", "C01:readRuntime", "C02:verifyRuntime",
      "C03:parseRuntime", "C04:validateRuntime", "C05:createInputs",
      "C06:verifyInputEquality", "C07:invokeCandidateBoundary",
      "C08:invokeCandidateFormation", "C09:invokeBaseline",
      "C10:validateCandidateOutput", "C11:validateBaselineOutput",
      "C12:captureOutputs", "C13:evaluateInvariants",
      "C14:constructAndEvaluateTampers", "C19:compareCandidateAndBaseline",
      "C15:readHeldOut", "C16:verifyHeldOut", "C03:parseHeldOut",
      "C17:validateHeldOut", "C18:evaluateHeldOut", "C20:sealRecorder",
    ]);
    expect(sealedRecord?.events).toEqual(expect.arrayContaining([
      expect.objectContaining({
        component: "C20",
        kind: "assessment-handoff",
        subject: "C21",
      }),
    ]));
    expect(coordinateCase001Mechanically(
      false,
      allPassingSteps(() => undefined, () => undefined),
      createContemporaneousRecorder(),
    )).toEqual({ status: "STOPPED", completedSteps: [], stoppedAt: "Gate1" });
  });

  it("keeps denied capabilities and evaluator content outside candidate closure", () => {
    const candidatePath = path.join(
      repositoryRoot,
      "platform/cos/understanding-formation/multi-evidence-case-001/candidate.ts",
    );
    const candidateSource = fs.readFileSync(candidatePath, "utf8");
    const imports = candidateSource.match(/^import .*$/gm) ?? [];
    expect(imports).toEqual([
      expect.stringContaining("import type"),
    ]);
    for (const denied of [
      "node:fs", "node:path", "node:crypto", "process.env", "fetch(",
      "held_out", "held-out", "expectedFormationStatus", "prompt", "Memory",
    ]) {
      expect(candidateSource).not.toContain(denied);
    }
  });

  it("keeps each non-artifact source closure within its accepted dependencies", () => {
    const sourceRoot = path.join(
      repositoryRoot,
      "platform/cos/understanding-formation/multi-evidence-case-001",
    );
    const permittedImports: Record<string, string[]> = {
      "candidate.ts": ["./contracts"],
      "baseline.ts": ["./contracts"],
      "comparison-evidence.ts": [],
      "contracts.ts": [],
      "evaluation.ts": ["./contracts", "./comparison-evidence", "./integrity"],
      "experiment.ts": [
        "./artifacts", "./baseline", "./candidate", "./contracts",
        "./evaluation", "./integrity", "./preservation",
      ],
      "integrity.ts": ["node:crypto", "./contracts"],
    };

    for (const [fileName, permitted] of Object.entries(permittedImports)) {
      const source = fs.readFileSync(path.join(sourceRoot, fileName), "utf8");
      const imports = [...source.matchAll(/from\s+["']([^"']+)["']/g)]
        .map((match) => match[1]);
      expect(imports.sort()).toEqual([...permitted].sort());
      for (const denied of [
        "node:fs", "node:path", "process.env", "fetch(", "axios", "AsyncStorage",
        "localStorage", "console.",
        "HELD_OUT_ASSESSMENT.json",
      ]) {
        expect(source).not.toContain(denied);
      }
    }
  });

  it("finds no evaluator answer or control rationale in runtime inputs", () => {
    const runtimePaths = [
      CASE_001_RUNTIME_RELATIVE_PATH,
      ...Object.values(CASE_001_CONTROL_ARTIFACTS)
        .map((identity) => identity.runtimeRelativePath),
    ];
    const denied = [
      CASE_001_HELD_OUT_SHA256,
      ...Object.values(CASE_001_CONTROL_ARTIFACTS)
        .map((identity) => identity.heldOutSha256),
      "expectedFormationStatus",
      "expectedEvidenceRelationships",
      "requiredFindings",
      "prohibitedConclusions",
      "semantic invariance",
      "evidence sensitivity",
      "decisive evidence",
      "IMPLEMENTATION_EVIDENCE_DESIGN_COMBINED_AUTHORITY_REVIEW",
    ];

    for (const runtimePath of runtimePaths) {
      const runtimeText = fs.readFileSync(
        path.join(repositoryRoot, runtimePath),
        "utf8",
      );
      for (const deniedValue of denied) {
        expect(runtimeText.toLowerCase()).not.toContain(deniedValue.toLowerCase());
      }
    }
  });

  it("uses exactly the six governed artifact paths in artifact source", () => {
    const expectedPaths = [
      CASE_001_RUNTIME_RELATIVE_PATH,
      CASE_001_HELD_OUT_RELATIVE_PATH,
      ...Object.values(CASE_001_CONTROL_ARTIFACTS).flatMap((identity) => [
        identity.runtimeRelativePath,
        identity.heldOutRelativePath,
      ]),
    ].sort();
    const artifactSource = fs.readFileSync(path.join(
      repositoryRoot,
      "platform/cos/understanding-formation/multi-evidence-case-001/artifacts.ts",
    ), "utf8");
    const observedPaths = [...artifactSource.matchAll(
      /"(docs\/formation\/[^"\n]+\.json)"/g,
    )].map((match) => match[1]).sort();

    expect(observedPaths).toEqual(expectedPaths);
    for (const governedPath of expectedPaths) {
      expect(fs.existsSync(path.join(repositoryRoot, governedPath))).toBe(true);
    }
  });
});