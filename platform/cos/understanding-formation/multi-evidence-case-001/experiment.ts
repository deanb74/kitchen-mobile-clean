import {
    literalJsonParse,
    readEvidenceCycleHeldOutArtifactBytes,
    readEvidenceCycleRuntimeArtifactBytes,
    verifyEvidenceCycleHeldOutArtifactHash,
    verifyEvidenceCycleRuntimeArtifactHash,
    type Case001EvidenceCycleId,
} from "./artifacts";
import { accumulateWithoutUnderstanding } from "./baseline";
import { formMultiEvidenceUnderstanding } from "./candidate";
import {
    validateBaselineOutput,
    validateCandidateOutput,
    validateHeldOutAssessment,
    validateRuntimeFixture,
    type AccumulationBaselineRecord,
    type HeldOutAssessment,
    type ImmutableOutputCapture,
    type MultiEvidenceRuntimeFixture,
    type MultiEvidenceUnderstandingAccount,
} from "./contracts";
import {
    CROSS_CYCLE_INVARIANTS,
    CYCLE_LOCAL_INVARIANTS,
    assessContamination,
    checkCrossCycleInvariants,
    checkCycleLocalInvariants,
    compareCandidateAndBaseline,
    constructTargetedTamper,
    evaluateHeldOutAssessment,
    type BaselineComparisonResult,
    type ContaminationAssessment,
    type InvariantResult,
    type SemanticEvaluationResult,
    type TamperedOutput,
} from "./evaluation";
import {
    captureImmutableOutputs,
    createContemporaneousRecorder,
    createImmutableInputs,
    immutableHeldOutAssessment,
    structuralDigest,
    type ComponentId,
    type ContemporaneousRecorder,
    type SealedAccessRecord,
} from "./integrity";
import {
    preserveCase001Evidence,
    type EvidencePreservationTransport,
    type PreservationStatus,
} from "./preservation";

export type MechanicalStatus = Readonly<{
  code: "PASS" | "FAIL";
}>;

type MechanicalStep = () => MechanicalStatus;

export interface Case001MechanicalSteps {
  activateRecorder: MechanicalStep;
  readRuntime: MechanicalStep;
  verifyRuntime: MechanicalStep;
  parseRuntime: MechanicalStep;
  validateRuntime: MechanicalStep;
  createInputs: MechanicalStep;
  verifyInputEquality: MechanicalStep;
  invokeCandidateBoundary: MechanicalStep;
  invokeCandidateFormation: MechanicalStep;
  invokeBaseline: MechanicalStep;
  validateCandidateOutput: MechanicalStep;
  validateBaselineOutput: MechanicalStep;
  captureOutputs: MechanicalStep;
  evaluateInvariants: MechanicalStep;
  constructAndEvaluateTampers: MechanicalStep;
  compareCandidateAndBaseline: MechanicalStep;
  readHeldOut: MechanicalStep;
  verifyHeldOut: MechanicalStep;
  parseHeldOut: MechanicalStep;
  validateHeldOut: MechanicalStep;
  evaluateHeldOut: MechanicalStep;
  sealRecorder: MechanicalStep;
  assessContamination: MechanicalStep;
}

export interface MechanicalExecutionRecord {
  status: "COMPLETED" | "STOPPED";
  completedSteps: string[];
  stoppedAt?: string;
}

export interface ControlledExecutionGate {
  decision:
    | "EXECUTION BLOCKED - OWNERSHIP OR ISOLATION FAILURE"
    | "CORRECTION REQUIRED BEFORE EXECUTION DECISION"
    | "PASSED FOR CONTROLLED CASE 001 EXECUTION";
}

export interface Case001ExperimentEvidence {
  cycleId: Case001EvidenceCycleId;
  mechanical: MechanicalExecutionRecord;
  runtimeHash?: string;
  candidateInputDigest?: string;
  baselineInputDigest?: string;
  capture?: ImmutableOutputCapture;
  invariantResults?: InvariantResult[];
  tamperedOutputs?: TamperedOutput[];
  baselineComparison?: BaselineComparisonResult;
  heldOutHash?: string;
  semanticEvaluation?: SemanticEvaluationResult;
  accessRecord?: SealedAccessRecord;
  contaminationAssessment?: ContaminationAssessment;
  evaluatorEvidenceAssociations?: readonly Readonly<{
    c18ComparisonRecordId: string;
    c20RecordId: string;
    c20InvocationEventId: string;
    c21FindingId: string;
  }>[];
}

export const CASE_001_CAMPAIGN_CYCLE_ORDER = Object.freeze([
  "MEU-I-14",
  "MEU-I-15",
  "MEU-CASE-001",
] as const satisfies readonly Case001EvidenceCycleId[]);

export type Case001CampaignCaptures = Readonly<Record<
  Case001EvidenceCycleId,
  ImmutableOutputCapture
>>;

export interface CampaignCycleOutcome {
  status: MechanicalStatus;
  evidence: Case001ExperimentEvidence;
}

export interface CrossCycleEvaluationOutcome {
  status: MechanicalStatus;
  invariantResults: readonly Readonly<InvariantResult>[];
  tamperedOutputs: readonly Readonly<TamperedOutput>[];
}

export interface Case001CampaignDependencies {
  runCycle(cycleId: Case001EvidenceCycleId): CampaignCycleOutcome;
  evaluateCrossCycle(captures: Case001CampaignCaptures): CrossCycleEvaluationOutcome;
}

export interface Case001CampaignEvidence {
  mechanical: Readonly<{
    status: "COMPLETED" | "STOPPED";
    completedCycles: readonly Case001EvidenceCycleId[];
    stoppedAt?: "Gate4" | Case001EvidenceCycleId | "cross-cycle-evaluation";
  }>;
  cycles: Readonly<Partial<Record<
    Case001EvidenceCycleId,
    Case001ExperimentEvidence
  >>>;
  crossCycleInvariantResults: readonly Readonly<InvariantResult>[];
  crossCycleTamperedOutputs: readonly Readonly<TamperedOutput>[];
  campaignAccessRecord?: SealedAccessRecord;
  campaignContaminationAssessment?: ContaminationAssessment;
}

export interface Case001PostPackagePreservation {
  attemptId: string;
  authorityRelativePath: string;
  immutablePackage: Case001CampaignEvidence;
  transport: EvidencePreservationTransport;
  now?: () => Date;
}

export function preserveCase001CampaignPackage(
  postPackage: Case001PostPackagePreservation,
): PreservationStatus {
  return preserveCase001Evidence(postPackage);
}

const SEQUENCE: ReadonlyArray<{
  name: keyof Case001MechanicalSteps;
  component: ComponentId;
}> = Object.freeze([
  { name: "activateRecorder", component: "C20" },
  { name: "readRuntime", component: "C01" },
  { name: "verifyRuntime", component: "C02" },
  { name: "parseRuntime", component: "C03" },
  { name: "validateRuntime", component: "C04" },
  { name: "createInputs", component: "C05" },
  { name: "verifyInputEquality", component: "C06" },
  { name: "invokeCandidateBoundary", component: "C07" },
  { name: "invokeCandidateFormation", component: "C08" },
  { name: "invokeBaseline", component: "C09" },
  { name: "validateCandidateOutput", component: "C10" },
  { name: "validateBaselineOutput", component: "C11" },
  { name: "captureOutputs", component: "C12" },
  { name: "evaluateInvariants", component: "C13" },
  { name: "constructAndEvaluateTampers", component: "C14" },
  { name: "compareCandidateAndBaseline", component: "C19" },
  { name: "readHeldOut", component: "C15" },
  { name: "verifyHeldOut", component: "C16" },
  { name: "parseHeldOut", component: "C03" },
  { name: "validateHeldOut", component: "C17" },
  { name: "evaluateHeldOut", component: "C18" },
  { name: "sealRecorder", component: "C20" },
  { name: "assessContamination", component: "C21" },
]);

export function coordinateCase001Mechanically(
  gateAccepted: boolean,
  steps: Case001MechanicalSteps,
  recorder: ContemporaneousRecorder,
): MechanicalExecutionRecord {
  if (!gateAccepted) {
    return { status: "STOPPED", completedSteps: [], stoppedAt: "Gate1" };
  }

  recorder.record("C22", "input", "accepted-gate-record");
  const completedSteps: string[] = [];
  for (const step of SEQUENCE) {
    if (!recorder.isSealed()) {
      recorder.record("C22", "control-transition", String(step.name));
      recorder.record("C22", "dependency", `${step.component}:${String(step.name)}`);
      if (step.name === "sealRecorder") {
        recorder.record("C20", "assessment-handoff", "C21");
      }
      recorder.record(step.component, "invocation", String(step.name));
    }
    const status = steps[step.name]();
    if (status.code !== "PASS") {
      if (step.name !== "sealRecorder" && step.name !== "assessContamination") {
        finalizeStoppedCycle(steps, recorder);
      }
      return {
        status: "STOPPED",
        completedSteps,
        stoppedAt: String(step.name),
      };
    }
    completedSteps.push(String(step.name));
  }

  return { status: "COMPLETED", completedSteps };
}

export function mechanicalPass(): MechanicalStatus {
  return Object.freeze({ code: "PASS" });
}

export function mechanicalFail(): MechanicalStatus {
  return Object.freeze({ code: "FAIL" });
}

function runCase001Experiment(
  gate: ControlledExecutionGate,
  cycleId: Case001EvidenceCycleId = "MEU-CASE-001",
): Case001ExperimentEvidence {
  const recorder = createContemporaneousRecorder(`${cycleId}:C20`);
  const state: {
    runtimeBytes?: Uint8Array;
    runtimeHash?: string;
    parsedRuntime?: unknown;
    fixture?: MultiEvidenceRuntimeFixture;
    candidateInput?: MultiEvidenceRuntimeFixture;
    baselineInput?: MultiEvidenceRuntimeFixture;
    candidateInputDigest?: string;
    baselineInputDigest?: string;
    candidate?: MultiEvidenceUnderstandingAccount;
    baseline?: AccumulationBaselineRecord;
    capture?: ImmutableOutputCapture;
    invariantResults?: InvariantResult[];
    tamperedOutputs?: TamperedOutput[];
    baselineComparison?: BaselineComparisonResult;
    heldOutBytes?: Uint8Array;
    heldOutHash?: string;
    parsedHeldOut?: unknown;
    heldOut?: HeldOutAssessment;
    semanticEvaluation?: SemanticEvaluationResult;
    accessRecord?: SealedAccessRecord;
    contaminationAssessment?: ContaminationAssessment;
  } = {};

  const steps: Case001MechanicalSteps = {
    activateRecorder: mechanicalPass,
    readRuntime: guarded(() => {
      state.runtimeBytes = readEvidenceCycleRuntimeArtifactBytes(cycleId, recorder);
    }),
    verifyRuntime: guarded(() => {
      state.runtimeHash = verifyEvidenceCycleRuntimeArtifactHash(
        cycleId,
        required(state.runtimeBytes, "runtime bytes"),
      );
    }),
    parseRuntime: guarded(() => {
      state.parsedRuntime = literalJsonParse(
        required(state.runtimeBytes, "runtime bytes"),
      );
    }),
    validateRuntime: guarded(() => {
      validateRuntimeFixture(state.parsedRuntime);
      state.fixture = state.parsedRuntime;
    }),
    createInputs: guarded(() => {
      const inputs = createImmutableInputs(required(state.fixture, "runtime fixture"));
      state.candidateInput = inputs.candidateInput;
      state.baselineInput = inputs.baselineInput;
    }),
    verifyInputEquality: guarded(() => {
      state.candidateInputDigest = structuralDigest(
        required(state.candidateInput, "candidate input"),
      );
      state.baselineInputDigest = structuralDigest(
        required(state.baselineInput, "baseline input"),
      );
      if (state.candidateInputDigest !== state.baselineInputDigest) {
        throw new Error("Candidate and baseline input digests differ.");
      }
    }),
    invokeCandidateBoundary: guarded(() => {
      if (!Object.isFrozen(required(state.candidateInput, "candidate input"))) {
        throw new Error("Candidate input is not immutable.");
      }
    }),
    invokeCandidateFormation: guarded(() => {
      state.candidate = formMultiEvidenceUnderstanding(
        required(state.candidateInput, "candidate input"),
      );
    }),
    invokeBaseline: guarded(() => {
      state.baseline = accumulateWithoutUnderstanding(
        required(state.baselineInput, "baseline input"),
      );
    }),
    validateCandidateOutput: guarded(() => {
      validateCandidateOutput(state.candidate);
    }),
    validateBaselineOutput: guarded(() => {
      validateBaselineOutput(state.baseline);
    }),
    captureOutputs: guarded(() => {
      state.capture = captureImmutableOutputs(
        required(state.candidate, "candidate output"),
        required(state.baseline, "baseline output"),
      );
      recorder.record("C12", "capture", "immutable-output-capture");
    }),
    evaluateInvariants: guarded(() => {
      state.invariantResults = checkCycleLocalInvariants(
        required(state.fixture, "runtime fixture"),
        required(state.capture, "output capture").candidate,
      );
      if (state.invariantResults.some((item) => item.status !== "passed")) {
        throw new Error("Applicable invariant evidence is incomplete or failed.");
      }
    }),
    constructAndEvaluateTampers: guarded(() => {
      const fixture = required(state.fixture, "runtime fixture");
      const candidate = required(state.capture, "output capture").candidate;
      state.tamperedOutputs = CYCLE_LOCAL_INVARIANTS.map((invariant) =>
        constructTargetedTamper(candidate, invariant));
      for (const tamper of state.tamperedOutputs) {
        const detected = checkCycleLocalInvariants(fixture, tamper.output)
          .find((item) => item.invariant === tamper.invariant);
        if (detected?.status !== "failed") {
          throw new Error(`Targeted tamper ${tamper.invariant} was not detected.`);
        }
      }
    }),
    compareCandidateAndBaseline: guarded(() => {
      const capture = required(state.capture, "output capture");
      state.baselineComparison = compareCandidateAndBaseline(
        capture.candidate,
        capture.baseline,
      );
    }),
    readHeldOut: guarded(() => {
      state.heldOutBytes = readEvidenceCycleHeldOutArtifactBytes(
        cycleId,
        Boolean(state.capture),
        recorder,
      );
    }),
    verifyHeldOut: guarded(() => {
      state.heldOutHash = verifyEvidenceCycleHeldOutArtifactHash(
        cycleId,
        required(state.heldOutBytes, "held-out bytes"),
      );
    }),
    parseHeldOut: guarded(() => {
      state.parsedHeldOut = literalJsonParse(
        required(state.heldOutBytes, "held-out bytes"),
      );
    }),
    validateHeldOut: guarded(() => {
      validateHeldOutAssessment(state.parsedHeldOut);
      state.heldOut = immutableHeldOutAssessment(state.parsedHeldOut);
    }),
    evaluateHeldOut: guarded(() => {
      const capture = required(state.capture, "output capture");
      const invocation = required(recorder.latestEvent(), "C18 invocation event");
      if (invocation.component !== "C18" || invocation.kind !== "invocation" ||
          invocation.subject !== "evaluateHeldOut") {
        throw new Error("Latest C20 event is not the C18 invocation.");
      }
      state.semanticEvaluation = evaluateHeldOutAssessment(
        capture.candidate,
        required(state.heldOut, "held-out assessment"),
        {
          cycleId,
          candidateCaptureId:
            `${cycleId}:C12:${structuralDigest(capture.candidate)}`,
          heldOutHash: required(state.heldOutHash, "held-out hash"),
          c20RecordId: recorder.recordId,
          c20InvocationEventId: invocation.eventId,
        },
      );
      if (state.semanticEvaluation.status !== "passed") {
        throw new Error("Held-out semantic evaluation failed.");
      }
    }),
    sealRecorder: guarded(() => {
      state.accessRecord = recorder.seal();
    }),
    assessContamination: guarded(() => {
      state.contaminationAssessment = assessContamination(
        required(state.accessRecord, "sealed access record"),
      );
      if (state.contaminationAssessment.status !== "clear") {
        throw new Error("Contamination assessment failed.");
      }
    }),
  };

  const mechanical = coordinateCase001Mechanically(
    gate.decision === "PASSED FOR CONTROLLED CASE 001 EXECUTION",
    steps,
    recorder,
  );
  const evaluatorEvidenceAssociations =
    state.semanticEvaluation && state.accessRecord && state.contaminationAssessment
      ? associateEvaluatorEvidence(
        state.semanticEvaluation,
        state.accessRecord,
        state.contaminationAssessment,
      )
      : undefined;
  const packageMechanical = mechanical.status === "COMPLETED" &&
      !evaluatorEvidenceAssociations
    ? Object.freeze({
      status: "STOPPED" as const,
      completedSteps: mechanical.completedSteps,
      stoppedAt: "associateEvaluatorEvidence",
    })
    : mechanical;

  return {
    cycleId,
    mechanical: packageMechanical,
    runtimeHash: state.runtimeHash,
    candidateInputDigest: state.candidateInputDigest,
    baselineInputDigest: state.baselineInputDigest,
    capture: state.capture,
    invariantResults: state.invariantResults,
    tamperedOutputs: state.tamperedOutputs,
    baselineComparison: state.baselineComparison,
    heldOutHash: state.heldOutHash,
    semanticEvaluation: state.semanticEvaluation,
    accessRecord: state.accessRecord,
    contaminationAssessment: state.contaminationAssessment,
    evaluatorEvidenceAssociations,
  };
}

type EvaluatorEvidenceAssociation = Readonly<{
  c18ComparisonRecordId: string;
  c20RecordId: string;
  c20InvocationEventId: string;
  c21FindingId: string;
}>;

function associateEvaluatorEvidence(
  semanticEvaluation: SemanticEvaluationResult,
  accessRecord: SealedAccessRecord,
  contaminationAssessment: ContaminationAssessment,
): readonly EvaluatorEvidenceAssociation[] | undefined {
  if (accessRecord.sealed !== true ||
      contaminationAssessment.findingId !== `${accessRecord.recordId}:C21:finding` ||
      !Array.isArray(accessRecord.events) ||
      !Array.isArray(semanticEvaluation.comparisonRecords) ||
      semanticEvaluation.comparisonRecords.length === 0 ||
      contaminationAssessment.sealedRecordSequenceLength !== accessRecord.events.length) {
    return undefined;
  }
  const recordIds = new Set<string>();
  const associations: EvaluatorEvidenceAssociation[] = [];
  for (const record of semanticEvaluation.comparisonRecords) {
    const comparisonRecordId = "comparisonRecordId" in record
      ? record.comparisonRecordId
      : record.established.comparisonRecordId;
    const linkage = "boundaryLinkage" in record
      ? record.boundaryLinkage
      : undefined;
    if (!comparisonRecordId || !linkage || recordIds.has(comparisonRecordId) ||
        linkage.c20RecordId !== accessRecord.recordId) {
      return undefined;
    }
    const event = accessRecord.events.find(
      (candidate) => candidate.eventId === linkage.c20InvocationEventId,
    );
    if (!event || event.component !== "C18" || event.kind !== "invocation" ||
        event.subject !== "evaluateHeldOut") {
      return undefined;
    }
    recordIds.add(comparisonRecordId);
    associations.push(Object.freeze({
      c18ComparisonRecordId: comparisonRecordId,
      c20RecordId: accessRecord.recordId,
      c20InvocationEventId: event.eventId,
      c21FindingId: contaminationAssessment.findingId,
    }));
  }
  return associations.length === semanticEvaluation.comparisonRecords.length
    ? Object.freeze(associations)
    : undefined;
}

export function coordinateCase001CampaignMechanically(
  gateAccepted: boolean,
  dependencies: Case001CampaignDependencies,
  recorder: ContemporaneousRecorder,
): Case001CampaignEvidence {
  const cycles: Partial<Record<Case001EvidenceCycleId, Case001ExperimentEvidence>> = {};
  const completedCycles: Case001EvidenceCycleId[] = [];
  const notExercised = crossCycleNotExercised();

  if (!gateAccepted) {
    return freezeCampaignEvidence({
      mechanical: { status: "STOPPED", completedCycles, stoppedAt: "Gate4" },
      cycles,
      crossCycleInvariantResults: notExercised,
      crossCycleTamperedOutputs: [],
    });
  }

  recorder.record("C22", "input", "accepted-gate-record");
  for (const cycleId of CASE_001_CAMPAIGN_CYCLE_ORDER) {
    recorder.record("C22", "control-transition", cycleId);
    recorder.record("C22", "dependency", `cycle:${cycleId}`);
    const outcome: unknown = dependencies.runCycle(cycleId);
    const outcomeRecord = shallowRecord(outcome);
    const status = shallowRecord(outcomeRecord?.status);
    const evidenceRecord = shallowRecord(outcomeRecord?.evidence);
    const mechanical = shallowRecord(evidenceRecord?.mechanical);
    const evidence = evidenceRecord && mechanical
      ? evidenceRecord as unknown as Case001ExperimentEvidence
      : undefined;
    if (evidence) cycles[cycleId] = evidence;
    if (!outcomeRecord || !status || !evidence ||
        status.code !== "PASS" ||
        mechanical?.status !== "COMPLETED" ||
        !evidence.capture ||
      !hasTotalOwnerEstablishedAssociations(cycleId, evidence)) {
      const campaign = finalizeCampaignRecorder(recorder);
      return freezeCampaignEvidence({
        mechanical: { status: "STOPPED", completedCycles, stoppedAt: cycleId },
        cycles,
        crossCycleInvariantResults: notExercised,
        crossCycleTamperedOutputs: [],
        ...campaign,
      });
    }
    completedCycles.push(cycleId);
  }

  const captures = Object.freeze({
    "MEU-I-14": required(cycles["MEU-I-14"]?.capture, "MEU-I-14 capture"),
    "MEU-I-15": required(cycles["MEU-I-15"]?.capture, "MEU-I-15 capture"),
    "MEU-CASE-001": required(cycles["MEU-CASE-001"]?.capture, "source capture"),
  });
  recorder.record("C22", "control-transition", "cross-cycle-evaluation");
  recorder.record("C22", "dependency", "C13/C14:cross-cycle-evaluation");
  const crossCycle = dependencies.evaluateCrossCycle(captures);
  const campaign = finalizeCampaignRecorder(recorder);

  return freezeCampaignEvidence({
    mechanical: crossCycle.status.code === "PASS"
      ? { status: "COMPLETED", completedCycles }
      : { status: "STOPPED", completedCycles, stoppedAt: "cross-cycle-evaluation" },
    cycles,
    crossCycleInvariantResults: crossCycle.invariantResults,
    crossCycleTamperedOutputs: crossCycle.tamperedOutputs,
    ...campaign,
  });
}

function hasTotalOwnerEstablishedAssociations(
  expectedCycleId: Case001EvidenceCycleId,
  evidence: Case001ExperimentEvidence,
): boolean {
  const semanticEvaluation = evidence.semanticEvaluation;
  const accessRecord = evidence.accessRecord;
  const contaminationAssessment = evidence.contaminationAssessment;
  const suppliedAssociations = evidence.evaluatorEvidenceAssociations;
  if (evidence.cycleId !== expectedCycleId ||
      !semanticEvaluation || !accessRecord || !contaminationAssessment ||
      !suppliedAssociations || semanticEvaluation.comparisonRecords.some(
        (record) => ("cycleId" in record
          ? record.cycleId
          : record.established.cycleId) !== evidence.cycleId,
      )) {
    return false;
  }
  const establishedAssociations = associateEvaluatorEvidence(
    semanticEvaluation,
    accessRecord,
    contaminationAssessment,
  );
  return establishedAssociations !== undefined &&
    establishedAssociations.length === suppliedAssociations.length &&
    establishedAssociations.every((established, index) => {
      const supplied = suppliedAssociations[index];
      return supplied !== undefined &&
        supplied.c18ComparisonRecordId === established.c18ComparisonRecordId &&
        supplied.c20RecordId === established.c20RecordId &&
        supplied.c20InvocationEventId === established.c20InvocationEventId &&
        supplied.c21FindingId === established.c21FindingId;
    });
}

export function runCase001Campaign(
  gate: ControlledExecutionGate,
): Case001CampaignEvidence {
  const gateAccepted = gate.decision === "PASSED FOR CONTROLLED CASE 001 EXECUTION";
  return coordinateCase001CampaignMechanically(
    gateAccepted,
    {
      runCycle(cycleId) {
        const evidence = runCase001Experiment(gate, cycleId);
        return {
          status: evidence.mechanical.status === "COMPLETED"
            ? mechanicalPass()
            : mechanicalFail(),
          evidence,
        };
      },
      evaluateCrossCycle: evaluateCapturedCycleControls,
    },
    createContemporaneousRecorder("MEU-CASE-001-CAMPAIGN:C20"),
  );
}

function evaluateCapturedCycleControls(
  captures: Case001CampaignCaptures,
): CrossCycleEvaluationOutcome {
  const source = captures["MEU-CASE-001"].candidate;
  const semanticReorder = captures["MEU-I-14"].candidate;
  const decisiveEvidenceRemoval = captures["MEU-I-15"].candidate;
  const invariantResults = checkCrossCycleInvariants(
    source,
    semanticReorder,
    decisiveEvidenceRemoval,
  );
  const tamperedOutputs = CROSS_CYCLE_INVARIANTS.map((invariant) =>
    constructTargetedTamper(source, invariant));
  const tampersDetected = tamperedOutputs.every((tamper) =>
    checkCrossCycleInvariants(
      tamper.output,
      semanticReorder,
      decisiveEvidenceRemoval,
    ).find((result) => result.invariant === tamper.invariant)?.status === "failed");

  return {
    status: invariantResults.every((result) => result.status === "passed") &&
      tampersDetected
      ? mechanicalPass()
      : mechanicalFail(),
    invariantResults,
    tamperedOutputs,
  };
}

function finalizeStoppedCycle(
  steps: Case001MechanicalSteps,
  recorder: ContemporaneousRecorder,
): void {
  if (recorder.isSealed()) return;
  recorder.record("C22", "control-transition", "sealRecorder");
  recorder.record("C22", "dependency", "C20:sealRecorder");
  recorder.record("C20", "assessment-handoff", "C21");
  recorder.record("C20", "invocation", "sealRecorder");
  if (steps.sealRecorder().code === "PASS") {
    steps.assessContamination();
  }
}

function finalizeCampaignRecorder(
  recorder: ContemporaneousRecorder,
): Pick<
  Case001CampaignEvidence,
  "campaignAccessRecord" | "campaignContaminationAssessment"
> {
  recorder.record("C20", "assessment-handoff", "C21");
  const campaignAccessRecord = recorder.seal();
  const campaignContaminationAssessment = assessContamination(campaignAccessRecord);
  return { campaignAccessRecord, campaignContaminationAssessment };
}

function crossCycleNotExercised(): readonly Readonly<InvariantResult>[] {
  return Object.freeze(CROSS_CYCLE_INVARIANTS.map((invariant) => Object.freeze({
    invariant,
    status: "not-exercised" as const,
    reason: "All three governed cycle captures are required.",
  })));
}

function shallowRecord(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function freezeCampaignEvidence(
  evidence: Case001CampaignEvidence,
): Case001CampaignEvidence {
  return deepFreeze(evidence);
}

function guarded(operation: () => void): MechanicalStep {
  return () => {
    try {
      operation();
      return mechanicalPass();
    } catch {
      return mechanicalFail();
    }
  };
}

function required<T>(value: T | undefined, label: string): T {
  if (value === undefined) throw new Error(`Missing ${label}.`);
  return value;
}

function deepFreeze<T>(value: T): T {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value as Record<string, unknown>)) {
    deepFreeze(child);
  }
  return value;
}