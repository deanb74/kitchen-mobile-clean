import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { resolveRepositoryRootFromDirectory } from "../../../../scripts/support/repositoryRoot";
import type { ContemporaneousRecorder } from "./integrity";

export const CASE_001_RUNTIME_RELATIVE_PATH =
  "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_RUNTIME_FIXTURE.json";
export const CASE_001_RUNTIME_SHA256 =
  "c80d564c88844ad0d99a3622a1cc2d173b306e2e10a504c61d7ef07c53ac7840";
export const CASE_001_HELD_OUT_RELATIVE_PATH =
  "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_EVALUATOR_ONLY_HELD_OUT_ASSESSMENT.json";
export const CASE_001_HELD_OUT_SHA256 =
  "e3fee9672fe05df8c614081672d5b2ca1fd8dbd586512f4ce91b1d6c7f1e305b";

export type Case001ControlId = "MEU-I-14" | "MEU-I-15";
export type Case001EvidenceCycleId = "MEU-CASE-001" | Case001ControlId;

export const CASE_001_CONTROL_ARTIFACTS = Object.freeze({
  "MEU-I-14": Object.freeze({
    runtimeRelativePath:
      "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_MEU_I_14_SEMANTIC_INVARIANCE_CONTROL_FIXTURE.json",
    runtimeSha256:
      "6b9997dd4f3b8eceb5c211d288aba0ee5fe7356265086230859779a4f65217a6",
    heldOutRelativePath:
      "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_MEU_I_14_SEMANTIC_INVARIANCE_CONTROL_HELD_OUT_ASSESSMENT.json",
    heldOutSha256:
      "125fdfdbe3b42e09a406c20ab951f7938fa28863f1f3b7ea4a5eddae0c077a86",
  }),
  "MEU-I-15": Object.freeze({
    runtimeRelativePath:
      "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_MEU_I_15_EVIDENCE_SENSITIVITY_CONTROL_FIXTURE.json",
    runtimeSha256:
      "7b35f46c134d219cc513f441acd3738937e2b476b416e96e86af385ddd0bf30f",
    heldOutRelativePath:
      "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_MEU_I_15_EVIDENCE_SENSITIVITY_CONTROL_HELD_OUT_ASSESSMENT.json",
    heldOutSha256:
      "e15a95f1f20e6cb00a9357e510238b606688923af421fa14c51e4cf6ce102b58",
  }),
});

export function readRuntimeArtifactBytes(
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  return readGovernedBytes("C01", CASE_001_RUNTIME_RELATIVE_PATH, recorder);
}

export function verifyRuntimeArtifactHash(bytes: Uint8Array): string {
  return verifyHash("C02", bytes, CASE_001_RUNTIME_SHA256);
}

export function literalJsonParse(bytes: Uint8Array): unknown {
  return JSON.parse(Buffer.from(bytes).toString("utf8"));
}

export function readHeldOutArtifactBytes(
  outputCaptured: boolean,
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  if (!outputCaptured) {
    recorder?.record("C15", "denied-access", "held-out-before-output-capture");
    throw new Error("Held-out access denied before immutable output capture.");
  }
  return readGovernedBytes("C15", CASE_001_HELD_OUT_RELATIVE_PATH, recorder);
}

export function verifyHeldOutArtifactHash(bytes: Uint8Array): string {
  return verifyHash("C16", bytes, CASE_001_HELD_OUT_SHA256);
}

export function readControlRuntimeArtifactBytes(
  controlId: Case001ControlId,
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  return readGovernedBytes(
    "C01",
    CASE_001_CONTROL_ARTIFACTS[controlId].runtimeRelativePath,
    recorder,
  );
}

export function verifyControlRuntimeArtifactHash(
  controlId: Case001ControlId,
  bytes: Uint8Array,
): string {
  return verifyHash(
    "C02",
    bytes,
    CASE_001_CONTROL_ARTIFACTS[controlId].runtimeSha256,
  );
}

export function readControlHeldOutArtifactBytes(
  controlId: Case001ControlId,
  outputCaptured: boolean,
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  if (!outputCaptured) {
    recorder?.record("C15", "denied-access", "held-out-before-output-capture");
    throw new Error("Held-out access denied before immutable output capture.");
  }
  return readGovernedBytes(
    "C15",
    CASE_001_CONTROL_ARTIFACTS[controlId].heldOutRelativePath,
    recorder,
  );
}

export function verifyControlHeldOutArtifactHash(
  controlId: Case001ControlId,
  bytes: Uint8Array,
): string {
  return verifyHash(
    "C16",
    bytes,
    CASE_001_CONTROL_ARTIFACTS[controlId].heldOutSha256,
  );
}

export function readEvidenceCycleRuntimeArtifactBytes(
  cycleId: Case001EvidenceCycleId,
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  return cycleId === "MEU-CASE-001"
    ? readRuntimeArtifactBytes(recorder)
    : readControlRuntimeArtifactBytes(cycleId, recorder);
}

export function verifyEvidenceCycleRuntimeArtifactHash(
  cycleId: Case001EvidenceCycleId,
  bytes: Uint8Array,
): string {
  return cycleId === "MEU-CASE-001"
    ? verifyRuntimeArtifactHash(bytes)
    : verifyControlRuntimeArtifactHash(cycleId, bytes);
}

export function readEvidenceCycleHeldOutArtifactBytes(
  cycleId: Case001EvidenceCycleId,
  outputCaptured: boolean,
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  return cycleId === "MEU-CASE-001"
    ? readHeldOutArtifactBytes(outputCaptured, recorder)
    : readControlHeldOutArtifactBytes(cycleId, outputCaptured, recorder);
}

export function verifyEvidenceCycleHeldOutArtifactHash(
  cycleId: Case001EvidenceCycleId,
  bytes: Uint8Array,
): string {
  return cycleId === "MEU-CASE-001"
    ? verifyHeldOutArtifactHash(bytes)
    : verifyControlHeldOutArtifactHash(cycleId, bytes);
}

function readGovernedBytes(
  component: "C01" | "C15",
  relativePath: string,
  recorder?: ContemporaneousRecorder,
): Uint8Array {
  const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
  const absolutePath = path.resolve(repositoryRoot, relativePath);
  if (!absolutePath.startsWith(`${repositoryRoot}${path.sep}`)) {
    recorder?.record(component, "denied-access", relativePath);
    throw new Error("Governed artifact path escaped the repository root.");
  }
  recorder?.record(component, "access", relativePath);
  return fs.readFileSync(absolutePath);
}

function verifyHash(
  component: "C02" | "C16",
  bytes: Uint8Array,
  expected: string,
): string {
  const observed = createHash("sha256").update(bytes).digest("hex");
  if (observed !== expected) {
    throw new Error(`${component} artifact hash mismatch.`);
  }
  return observed;
}