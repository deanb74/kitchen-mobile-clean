import fs from "node:fs";
import path from "node:path";

import { resolveRepositoryRootFromImportMeta } from "./support/repositoryRoot";

type JsonObject = { [key: string]: JsonValue };
type JsonValue = boolean | null | number | string | JsonObject | JsonValue[];
type Selector = Readonly<{ mode: "ANY" } | { mode: "ONE_OF"; values: readonly JsonValue[] }>;

const OUTPUT_RELATIVE_PATH = "tmp/check-5-terminal-policy.generated.json";
const SCHEMA = "HH-CHECK-5-D3-PREDICATE-2";
const D4_COUNT = 95;
const D6_COUNT = 22;
const TOTAL_COUNT = 117;

const any = (): JsonObject => ({ mode: "ANY" });
const oneOf = (...values: JsonValue[]): JsonObject => ({
  mode: "ONE_OF",
  values: [...values].sort(compareJsonScalars),
});
const range = (minimum: number, maximum: number | null): JsonObject => ({
  mode: "RANGE",
  minimum,
  maximum,
});
const equals = (...values: JsonValue[]): JsonObject => ({
  mode: "EQUALS",
  values: [...values].sort(compareJsonScalars),
});
const keyEqual = (records: JsonObject[], keyFields: readonly string[]): JsonObject => ({
  mode: "KEY_EQUAL",
  records: [...records].sort((left, right) =>
    asciiCompare(stableRecordKey(left, keyFields), stableRecordKey(right, keyFields)),
  ),
});

function stableRecordKey(record: JsonObject, keyFields: readonly string[]): string {
  return JSON.stringify(keyFields.map((field) => record[field]));
}

interface D4Row {
  roles: "both" | "test";
  roots: readonly string[];
  arguments: Readonly<Record<number, readonly string[]>>;
  destinations: readonly string[];
  flow: string;
  universalArguments?: readonly string[];
}

const row = (
  roles: D4Row["roles"],
  roots: readonly string[],
  argumentsByIndex: Readonly<Record<number, readonly string[]>>,
  destinations: readonly string[],
  flow: string,
  universalArguments?: readonly string[],
): D4Row => Object.freeze({
  roles,
  roots: Object.freeze([...roots]),
  arguments: Object.freeze(argumentsByIndex),
  destinations: Object.freeze([...destinations]),
  flow,
  universalArguments: universalArguments && Object.freeze([...universalArguments]),
});

const PATH_LABELS = Object.freeze([
  "ATTEMPT_PATH",
  "EXTERNAL_ROOT_PATH",
  "PATH_SEGMENT",
  "REPOSITORY_PRECONDITION_PATH",
  "SUITE_ROOT_PATH",
]);
const BYTE_LABELS = Object.freeze([
  "CORRUPTED_FICTIONAL_BYTES",
  "FICTIONAL_BYTES",
  "INSTRUMENT_BYTES",
  "PERSISTED_RESPONSE_BYTES",
  "POLICY_BYTES",
  "RECEIPT_BYTES",
  "SOURCE_BYTES",
]);
const ASSERTABLE_PROVENANCE = Object.freeze([
  "LITERAL",
  "LOCAL_DECLARATION",
  "PARAMETER",
  "PUBLIC_VALUE",
  "SYNTHETIC_FIXTURE",
]);
const ASSERTABLE_LABELS = Object.freeze([
  "BOOLEAN",
  "BYTE_LENGTH",
  "CORRUPTED_FICTIONAL_BYTES",
  "DENIED_MEMBER_LITERAL",
  "ERROR_CONTENT_FREE",
  "FICTIONAL_BYTES",
  "FICTIONAL_RESPONSE",
  "GOVERNANCE_FIELD",
  "HASH_HEX",
  "JSON_LOCAL",
  "LOCAL_COLLECTION",
  "NUMBER",
  "PUBLIC_OUTCOME",
  "PUBLIC_REFERENCE",
  "TIMESTAMP",
]);

// Source: canonical policy completion review, CPD-D4 Section 5.1.
const D4_BASE_ROWS: Readonly<Record<string, D4Row>> = Object.freeze({
  CRYPTO_CREATE_HASH_SHA256: row("both", ["node:crypto/createHash"], { 0: ["GOVERNANCE_FIELD"] }, ["HASH_STATE"], "ARGUMENT_TO_CALL"),
  HASH_UPDATE: row("both", ["LOCAL_PRIVATE"], { 0: ["FICTIONAL_BYTES", "INSTRUMENT_BYTES", "PERSISTED_RESPONSE_BYTES", "POLICY_BYTES", "RECEIPT_BYTES", "SOURCE_BYTES"] }, ["HASH_STATE"], "HASH_INPUT"),
  HASH_DIGEST_HEX: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "HASH_OUTPUT"),
  FS_REALPATH: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "EXTERNAL_ROOT_PATH", "REPOSITORY_PRECONDITION_PATH", "SUITE_ROOT_PATH"] }, ["LOCAL_ONLY"], "FILESYSTEM_PATH"),
  FS_LSTAT: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "EXTERNAL_ROOT_PATH", "REPOSITORY_PRECONDITION_PATH", "SUITE_ROOT_PATH"] }, ["LOCAL_ONLY"], "FILESYSTEM_PATH"),
  FS_STAT: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "EXTERNAL_ROOT_PATH", "REPOSITORY_PRECONDITION_PATH", "SUITE_ROOT_PATH"] }, ["LOCAL_ONLY"], "FILESYSTEM_PATH"),
  FS_EXISTS: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "EXTERNAL_ROOT_PATH", "REPOSITORY_PRECONDITION_PATH", "SUITE_ROOT_PATH"] }, ["LOCAL_ONLY"], "FILESYSTEM_PATH"),
  FS_MKDIR: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "SUITE_ROOT_PATH"], 1: ["NUMBER"] }, ["ATTEMPT_TEMP_RECEIPT", "ATTEMPT_TEMP_RESPONSE", "SUITE_OWNED_TEST_ROOT"], "FILESYSTEM_PATH"),
  FS_OPEN_EXCLUSIVE: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH"], 1: ["GOVERNANCE_FIELD"], 2: ["NUMBER"] }, ["ATTEMPT_TEMP_RECEIPT", "ATTEMPT_TEMP_RESPONSE"], "FILESYSTEM_PATH"),
  FS_WRITE: row("both", ["node:fs"], { 0: ["FILE_DESCRIPTOR"], 1: ["FICTIONAL_BYTES", "RECEIPT_BYTES", "SOURCE_BYTES"], 2: ["NUMBER"], 3: ["NUMBER"], 4: ["NUMBER"] }, ["ATTEMPT_TEMP_RECEIPT", "ATTEMPT_TEMP_RESPONSE"], "FILESYSTEM_CONTENT"),
  FS_FSYNC: row("both", ["node:fs"], { 0: ["FILE_DESCRIPTOR"] }, ["ATTEMPT_TEMP_RECEIPT", "ATTEMPT_TEMP_RESPONSE"], "ARGUMENT_TO_CALL"),
  FS_CLOSE: row("both", ["node:fs"], { 0: ["FILE_DESCRIPTOR"] }, ["ATTEMPT_TEMP_RECEIPT", "ATTEMPT_TEMP_RESPONSE"], "ARGUMENT_TO_CALL"),
  FS_RENAME: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH"], 1: ["ATTEMPT_PATH"] }, ["ATTEMPT_FINAL_RECEIPT", "ATTEMPT_FINAL_RESPONSE"], "FILESYSTEM_PATH"),
  FS_READ_FILE: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "SUITE_ROOT_PATH"] }, ["LOCAL_ONLY"], "FILESYSTEM_CONTENT"),
  FS_REMOVE_BOUNDED: row("both", ["node:fs"], { 0: ["ATTEMPT_PATH", "SUITE_ROOT_PATH"], 1: ["BOOLEAN"] }, ["ATTEMPT_TEMP_RECEIPT", "ATTEMPT_TEMP_RESPONSE", "SUITE_OWNED_TEST_ROOT"], "FILESYSTEM_PATH"),
  PATH_RESOLVE: row("both", ["node:path"], {}, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL", PATH_LABELS),
  PATH_JOIN: row("both", ["node:path"], {}, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL", PATH_LABELS),
  PATH_RELATIVE: row("both", ["node:path"], { 0: PATH_LABELS, 1: PATH_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  PATH_DIRNAME: row("both", ["node:path"], { 0: PATH_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  PATH_BASENAME: row("both", ["node:path"], { 0: PATH_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  PATH_IS_ABSOLUTE: row("both", ["node:path"], { 0: PATH_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  PATH_SEP_READ: row("both", ["node:path"], {}, ["LOCAL_ONLY"], "PROPERTY_READ_RESULT"),
  REPOSITORY_ROOT_RESOLVE: row("both", ["../../support/repositoryRoot", "../../../support/repositoryRoot"], { 0: ["REPOSITORY_PRECONDITION_PATH"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  BUFFER_FROM_UTF8: row("both", ["Buffer"], { 0: ["FICTIONAL_RESPONSE", "SOURCE_STRING"], 1: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  BUFFER_COMPARE: row("both", ["Buffer"], { 0: BYTE_LABELS, 1: BYTE_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  BUFFER_IS_BUFFER: row("both", ["Buffer"], { 0: BYTE_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  UINT8ARRAY_FROM: row("both", ["Uint8Array"], { 0: BYTE_LABELS }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  BYTE_SLICE: row("both", ["LOCAL_PRIVATE"], { 0: ["NUMBER"], 1: ["NUMBER"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  BYTE_LENGTH_READ: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "PROPERTY_READ_RESULT"),
  JSON_STRINGIFY: row("both", ["JSON"], { 0: ["JSON_LOCAL"] }, ["LOCAL_ONLY"], "JSON_CONTENT"),
  JSON_PARSE: row("both", ["JSON"], { 0: ["JSON_LOCAL"] }, ["LOCAL_ONLY"], "JSON_CONTENT"),
  OBJECT_FREEZE: row("both", ["Object"], { 0: ["JSON_LOCAL", "PUBLIC_OUTCOME", "PUBLIC_REFERENCE"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  OBJECT_KEYS: row("both", ["Object"], { 0: ["JSON_LOCAL", "PUBLIC_OUTCOME", "PUBLIC_REFERENCE"] }, ["EXPECT_ASSERTION", "LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  OBJECT_VALUES: row("both", ["Object"], { 0: ["JSON_LOCAL"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  OBJECT_ENTRIES: row("both", ["Object"], { 0: ["JSON_LOCAL"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  ARRAY_IS_ARRAY: row("both", ["Array"], { 0: ["JSON_LOCAL", "LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  ARRAY_MAP: row("both", ["LOCAL_PRIVATE"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  ARRAY_EVERY: row("both", ["LOCAL_PRIVATE"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  ARRAY_SOME: row("both", ["LOCAL_PRIVATE"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  ARRAY_INCLUDES: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  ARRAY_JOIN: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  ARRAY_SLICE: row("both", ["LOCAL_PRIVATE"], { 0: ["NUMBER"], 1: ["NUMBER"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  ARRAY_PUSH: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "COLLECTION_STORE", ["GOVERNANCE_FIELD", "JSON_LOCAL"]),
  ARRAY_SORT: row("both", ["LOCAL_PRIVATE"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  SET_ADD: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT"] }, ["LOCAL_ONLY"], "COLLECTION_STORE"),
  SET_HAS: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  MAP_GET: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  MAP_SET: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD"], 1: ["GOVERNANCE_FIELD", "JSON_LOCAL"] }, ["LOCAL_ONLY"], "COLLECTION_STORE"),
  MAP_HAS: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  REGEXP_TEST: row("both", ["RegExp"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT", "TIMESTAMP"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  NUMBER_IS_FINITE: row("both", ["Number"], { 0: ["NUMBER"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  NUMBER_IS_INTEGER: row("both", ["Number"], { 0: ["NUMBER"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  DATE_PARSE: row("both", ["Date"], { 0: ["GOVERNANCE_FIELD", "TIMESTAMP"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  DATE_TO_ISO_STRING: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_STARTS_WITH: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_ENDS_WITH: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_INCLUDES: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD", "PATH_SEGMENT"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_SPLIT: row("both", ["LOCAL_PRIVATE"], { 0: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_TRIM: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_TO_LOWER: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  STRING_TO_UPPER: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "RECEIVER_OF_CALL"),
  NEW_DATE: row("both", ["Date"], { 0: ["GOVERNANCE_FIELD", "TIMESTAMP"] }, ["LOCAL_ONLY"], "CONSTRUCTOR_INPUT"),
  NEW_ERROR_CONTENT_FREE: row("both", ["Error"], { 0: ["ERROR_CONTENT_FREE"] }, ["LOCAL_ONLY"], "CONSTRUCTOR_INPUT"),
  NEW_SET: row("both", ["Set"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "CONSTRUCTOR_INPUT"),
  NEW_MAP: row("both", ["Map"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "CONSTRUCTOR_INPUT"),
  NEW_UINT8ARRAY: row("both", ["Uint8Array"], { 0: ["FICTIONAL_BYTES", "NUMBER"] }, ["LOCAL_ONLY"], "CONSTRUCTOR_INPUT"),
  LOCAL_PRIVATE_CALL: row("both", ["LOCAL_PRIVATE"], {}, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  JEST_DESCRIBE: row("test", ["@jest/globals"], { 0: ["GOVERNANCE_FIELD"], 1: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  JEST_IT: row("test", ["@jest/globals"], { 0: ["GOVERNANCE_FIELD"], 1: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  JEST_EXPECT: row("test", ["@jest/globals"], { 0: ASSERTABLE_LABELS }, ["EXPECT_ASSERTION"], "ASSERTION_INPUT"),
  JEST_FN: row("test", ["@jest/globals"], { 0: ["LOCAL_COLLECTION"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  JEST_SPY_ON: row("test", ["@jest/globals"], { 0: ["JSON_LOCAL"], 1: ["GOVERNANCE_FIELD"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
  EXPECT_MATCHER: row("test", ["EXPECT_CHAIN"], { 0: ASSERTABLE_LABELS }, ["EXPECT_ASSERTION"], "ASSERTION_INPUT"),
  OS_TMPDIR: row("test", ["node:os"], {}, ["SUITE_OWNED_TEST_ROOT"], "ARGUMENT_TO_CALL"),
  PRESERVE_RESPONSE_EVIDENCE_TEST_CALL: row("test", ["../responseEvidenceCapture"], { 0: ["FICTIONAL_RESPONSE"] }, ["LOCAL_ONLY"], "ARGUMENT_TO_CALL"),
});

const D4_BRANCH_OPERATIONS = Object.freeze(new Set([
  "ARRAY_SORT",
  "EXPECT_MATCHER",
  "JEST_FN",
  "NEW_DATE",
  "NEW_MAP",
  "NEW_SET",
]));

// Source: exact values review T3-D4-01 and fourth-attempt Section 4.
const PRIVATE_SEAM_BASES: Readonly<Record<string, string>> = Object.freeze({
  PRIVATE_SEAM_SHA256: "CRYPTO_CREATE_HASH_SHA256",
  PRIVATE_SEAM_REPOSITORY_ROOT: "REPOSITORY_ROOT_RESOLVE",
  PRIVATE_SEAM_REALPATH: "FS_REALPATH",
  PRIVATE_SEAM_LSTAT: "FS_LSTAT",
  PRIVATE_SEAM_STAT: "FS_STAT",
  PRIVATE_SEAM_EXISTS: "FS_EXISTS",
  PRIVATE_SEAM_MKDIR: "FS_MKDIR",
  PRIVATE_SEAM_OPEN: "FS_OPEN_EXCLUSIVE",
  PRIVATE_SEAM_WRITE: "FS_WRITE",
  PRIVATE_SEAM_FSYNC: "FS_FSYNC",
  PRIVATE_SEAM_CLOSE: "FS_CLOSE",
  PRIVATE_SEAM_RENAME: "FS_RENAME",
  PRIVATE_SEAM_READ_FILE: "FS_READ_FILE",
  PRIVATE_SEAM_REMOVE: "FS_REMOVE_BOUNDED",
});

const EXACT_LITERALS: Readonly<Record<string, Readonly<Record<number, string>>>> = Object.freeze({
  CRYPTO_CREATE_HASH_SHA256: Object.freeze({ 0: "HASH_ALGORITHM_SHA256" }),
  HASH_DIGEST_HEX: Object.freeze({ 0: "HASH_DIGEST_HEX" }),
  FS_MKDIR: Object.freeze({ 1: "FILE_MODE_OWNER_ONLY_384" }),
  FS_OPEN_EXCLUSIVE: Object.freeze({ 1: "FILE_OPEN_EXCLUSIVE_WX", 2: "FILE_MODE_OWNER_ONLY_384" }),
  BUFFER_FROM_UTF8: Object.freeze({ 1: "TEXT_ENCODING_UTF8" }),
});

const RECEIVER_CLASSES: Readonly<Record<string, string>> = Object.freeze({
  BYTE_SLICE: "BYTE_SEQUENCE",
  BYTE_LENGTH_READ: "BYTE_SEQUENCE",
  ARRAY_MAP: "ARRAY",
  ARRAY_EVERY: "ARRAY",
  ARRAY_SOME: "ARRAY",
  ARRAY_INCLUDES: "ARRAY",
  ARRAY_JOIN: "ARRAY",
  ARRAY_SLICE: "ARRAY",
  ARRAY_PUSH: "ARRAY",
  ARRAY_SORT: "ARRAY",
  SET_ADD: "SET",
  SET_HAS: "SET",
  MAP_GET: "MAP",
  MAP_SET: "MAP",
  MAP_HAS: "MAP",
  REGEXP_TEST: "REGEXP",
  DATE_TO_ISO_STRING: "DATE",
  STRING_STARTS_WITH: "STRING",
  STRING_ENDS_WITH: "STRING",
  STRING_INCLUDES: "STRING",
  STRING_SPLIT: "STRING",
  STRING_TRIM: "STRING",
  STRING_TO_LOWER: "STRING",
  STRING_TO_UPPER: "STRING",
});

const OPERATION_RELATIONS: Readonly<Record<string, readonly string[]>> = Object.freeze({
  FS_RENAME: Object.freeze(["RENAME_RECEIPT_TEMP_FINAL_SAME_DIRECTORY", "RENAME_RESPONSE_TEMP_FINAL_SAME_DIRECTORY"]),
  FS_READ_FILE: Object.freeze(["READ_FINAL_RECEIPT", "READ_FINAL_RESPONSE", "READ_SUITE_FIXTURE"]),
  FS_REMOVE_BOUNDED: Object.freeze(["REMOVE_ATTEMPT_TEMP_RECEIPT", "REMOVE_ATTEMPT_TEMP_RESPONSE", "REMOVE_SUITE_FIXTURE"]),
  REPOSITORY_ROOT_RESOLVE: Object.freeze(["ROLE_ROOT_PRODUCTION_IMPORT", "ROLE_ROOT_TEST_IMPORT"]),
  JEST_SPY_ON: Object.freeze(["SYNTHETIC_FIXTURE_MEMBER_TARGET"]),
  PRESERVE_RESPONSE_EVIDENCE_TEST_CALL: Object.freeze(["OPTIONS_OBJECT_CONTAINS_FICTIONAL_RESPONSE"]),
});

function callableConstraint(position: string, resolution: string, scopes: string[]): JsonObject {
  return {
    position,
    resolutions: oneOf(resolution),
    scopes: oneOf(...scopes),
    cycles: oneOf("ACYCLIC"),
    capabilityReturns: oneOf("NO_CAPABILITY_RETURN"),
    terminalStatuses: oneOf("EVERY_EXECUTABLE_EXACTLY_ONE_TERMINAL"),
    escapes: oneOf("NO_SURVIVING_CAPTURE"),
  };
}

function baseCallableConstraints(operation: string, branch: string): JsonObject[] {
  if (["ARRAY_MAP", "ARRAY_EVERY", "ARRAY_SOME"].includes(operation)) {
    return [callableConstraint("ARGUMENT_0", "UNIQUE_LOCAL_DECLARATION", ["NESTED_TEST_CALLBACK", "SAME_FILE_PRIVATE"])];
  }
  if (operation === "ARRAY_SORT" && branch === "COUNT_1") {
    return [callableConstraint("ARGUMENT_0", "UNIQUE_LOCAL_DECLARATION", ["NESTED_TEST_CALLBACK", "SAME_FILE_PRIVATE"])];
  }
  if (["JEST_DESCRIBE", "JEST_IT"].includes(operation)) {
    return [callableConstraint("ARGUMENT_1", "UNIQUE_LOCAL_DECLARATION", ["SAME_FILE_PRIVATE"])];
  }
  if (operation === "JEST_FN" && branch === "COUNT_1") {
    return [callableConstraint("ARGUMENT_0", "UNIQUE_LOCAL_DECLARATION", ["NESTED_TEST_CALLBACK", "SAME_FILE_PRIVATE"])];
  }
  if (operation === "LOCAL_PRIVATE_CALL") {
    return [callableConstraint("CALLEE", "UNIQUE_LOCAL_DECLARATION", ["SAME_FILE_PRIVATE"])];
  }
  return [];
}

function nonProbeStructure(): JsonObject {
  return {
    scope: oneOf("NOT_PROBE"),
    deniedMemberIds: oneOf("NONE"),
    corruptionTransformIds: oneOf("NONE"),
    failureOperations: oneOf("NOT_PROBE"),
    operations: keyEqual([], ["role"]),
    assertions: keyEqual([], ["matcher", "expected", "subjectRole", "operationRole"]),
    relations: keyEqual([], ["kind", "leftRole", "rightRole", "operationRole"]),
    counters: keyEqual([], ["counter"]),
    escapes: keyEqual([], ["valueRole"]),
    roleProvenance: keyEqual([], ["valueRole"]),
  };
}

function argumentConstraints(operation: string, rowValue: D4Row, branch: string): JsonObject[] {
  if (branch === "COUNT_0") return [];
  return Object.entries(rowValue.arguments).map(([indexText, labels]) => {
    const index = Number(indexText);
    const exactLiteralId = EXACT_LITERALS[operation]?.[index];
    const callableArgument =
      (["ARRAY_MAP", "ARRAY_EVERY", "ARRAY_SOME", "ARRAY_SORT", "JEST_FN"].includes(operation) && index === 0) ||
      (["JEST_DESCRIBE", "JEST_IT"].includes(operation) && index === 1);
    const spyArgument = operation === "JEST_SPY_ON";
    const provenanceKinds = exactLiteralId
      ? oneOf("LITERAL")
      : ["JEST_EXPECT", "EXPECT_MATCHER"].includes(operation)
        ? oneOf(...ASSERTABLE_PROVENANCE)
        : spyArgument
          ? oneOf(index === 0 ? "SYNTHETIC_FIXTURE" : "LITERAL")
          : any();
    return {
      index,
      provenanceKinds,
      dataLabels: callableArgument || spyArgument ? any() : oneOf(...labels),
      governedLiteralIds: oneOf(exactLiteralId ?? "NONE"),
    };
  });
}

function argumentCount(operation: string, rowValue: D4Row, branch: string): JsonObject {
  if (branch === "COUNT_0") return range(0, 0);
  if (branch === "COUNT_1") return range(1, 1);
  if (rowValue.universalArguments) {
    return range(operation === "EXPECT_MATCHER" ? 0 : 1, null);
  }
  if (["PATH_SEP_READ", "BYTE_LENGTH_READ", "LOCAL_PRIVATE_CALL"].includes(operation)) return any();
  const indexes = Object.keys(rowValue.arguments).map(Number);
  return range(indexes.length === 0 ? 0 : Math.max(...indexes) + 1, indexes.length === 0 ? 0 : Math.max(...indexes) + 1);
}

function buildD4Predicate(operation: string, rowValue: D4Row, branch: string): JsonObject {
  const isFilesystemBase = operation.startsWith("FS_");
  const provenanceKinds = isFilesystemBase
    ? oneOf("IMPORT_BINDING")
    : operation === "LOCAL_PRIVATE_CALL"
      ? oneOf("LOCAL_DECLARATION")
      : oneOf("BUILTIN_GLOBAL", "IMPORT_BINDING");
  const everyArgument = rowValue.universalArguments && branch !== "COUNT_0"
    ? {
        provenanceKinds: operation === "EXPECT_MATCHER" ? oneOf(...ASSERTABLE_PROVENANCE) : any(),
        dataLabels: oneOf(...rowValue.universalArguments),
        governedLiteralIds: oneOf("NONE"),
      }
    : { provenanceKinds: any(), dataLabels: any(), governedLiteralIds: any() };
  return {
    schema: SCHEMA,
    id: `D4:${operation}:${branch}`,
    phase: "TERMINAL",
    sourceRoles: rowValue.roles === "test" ? oneOf("FOCUSED_TEST") : oneOf("FOCUSED_TEST", "PRODUCTION"),
    nodeKinds: oneOf(operation.endsWith("_READ") ? "PROPERTY_READ" : operation.startsWith("NEW_") ? "NEW" : "CALL"),
    provenanceKinds,
    roots: oneOf(...rowValue.roots),
    operations: oneOf(operation),
    provenanceFamilies: any(),
    importForms: any(),
    importAllowlistStatuses: any(),
    importBindingStatuses: any(),
    publicNameCapabilities: any(),
    publicTypeCapabilities: any(),
    subjectDataLabels: any(),
    argumentCount: argumentCount(operation, rowValue, branch),
    argumentConstraints: argumentConstraints(operation, rowValue, branch),
    everyArgument,
    receiverClasses: RECEIVER_CLASSES[operation] ? oneOf(RECEIVER_CLASSES[operation]) : oneOf("NONE"),
    receiverProvenanceKinds: any(),
    receiverDataLabels: any(),
    callableConstraints: baseCallableConstraints(operation, branch),
    operationRelations: oneOf(...(OPERATION_RELATIONS[operation] ?? ["NONE"])),
    destinationLabels: oneOf(...rowValue.destinations),
    dataFlows: oneOf(rowValue.flow),
    ancestryAll: any(),
    ancestryNone: oneOf("IN_ASYNC_SCHEDULE", "IN_LOOP_OR_RETRY"),
    controlFacts: any(),
    responseFlowRelations: any(),
    filesystemMutationRelations: any(),
    probeFamilies: any(),
    probeValidities: any(),
    terminalCandidateStatuses: any(),
    probeStructure: nonProbeStructure(),
    classification: "PERMITTED_MECHANICAL_EDGE",
  };
}

function buildPrivateSeamPredicate(operation: string, baseOperation: string): JsonObject {
  const baseRow = D4_BASE_ROWS[baseOperation];
  const predicate = buildD4Predicate(baseOperation, baseRow, "ONLY");
  return {
    ...predicate,
    id: `D4:${operation}:ONLY`,
    sourceRoles: oneOf("FOCUSED_TEST"),
    provenanceKinds: oneOf("PARAMETER"),
    roots: oneOf("PRIVATE_SEAM"),
    operations: oneOf(operation),
    callableConstraints: [callableConstraint("CALLEE", "UNIQUE_PARAMETER", ["NONE"])],
  };
}

interface ProbeSpec {
  family: string;
  deniedMemberIds: Selector;
  corruptionTransformIds: Selector;
  failureOperation: string;
  operations: readonly (readonly [string, string, number, number, readonly string[], readonly string[], readonly string[]])[];
  assertions: readonly (readonly [string, string, string, string])[];
  relations: readonly (readonly [string, string, string, string])[];
  counters: readonly (readonly [string, number])[];
  escapes: readonly string[];
  provenance: readonly (readonly [string, readonly string[], string, string])[];
}

const DENIED_MEMBER_SET = Object.freeze([
  "accepted", "append", "approved", "chmod", "cleanup", "close", "compliant", "contribution",
  "delete", "deliver", "deliverable", "delivery", "descriptor", "directory", "display", "dispose",
  "fd", "feedback", "filename", "handle", "move", "path", "permission", "preview", "print", "remove",
  "rename", "retry", "retryable", "root", "transfer", "truncate", "unlink", "url", "write",
]);
const TRANSFORM_SET = Object.freeze([
  "ALTER_ONE_MIDDLE_BYTE", "APPEND_NEWLINE_0A", "NORMALIZE_FICTIONAL_UTF8_TO_NFC", "PREFIX_ONE_BYTE",
  "PREFIX_UTF8_BOM_EFBBBF", "SUBSTITUTE_FIXED_FICTIONAL_BYTES", "SUFFIX_ONE_BYTE", "TRUNCATE_ONE_BYTE",
]);
const NOT_APPLICABLE = "NOT_APPLICABLE";
const FICTIONAL = "EXCLUSIVELY_FICTIONAL";
const SUITE_OWNED = "EXCLUSIVELY_CURRENT_SUITE_OWNED";

const assertionsFailure = Object.freeze([
  ["TO_BE_FIRST_FAILURE", "FIRST_FAILURE_OPERATION", "FIRST_FAILURE_IDENTITY", "INJECTED_FAILURE"],
  ["TO_BE_PRESERVATION_INCOMPLETE", "PRESERVATION_INCOMPLETE", "OUTCOME_STATUS", "INJECTED_FAILURE"],
] as const);
const relationsFailure = Object.freeze([
  ["FAILURE_IS_FIRST_FAILURE", "FIRST_FAILURE_IDENTITY", "OUTCOME_STATUS", "INJECTED_FAILURE"],
  ["ASSERTION_SUBJECT", "FIRST_FAILURE_IDENTITY", "FIRST_FAILURE_IDENTITY", "INJECTED_FAILURE"],
  ["ASSERTION_SUBJECT", "OUTCOME_STATUS", "OUTCOME_STATUS", "INJECTED_FAILURE"],
  ["ASSERTION_POSTDOMINATES_OPERATION", "FIRST_FAILURE_IDENTITY", "FIRST_FAILURE_IDENTITY", "INJECTED_FAILURE"],
  ["ASSERTION_POSTDOMINATES_OPERATION", "OUTCOME_STATUS", "OUTCOME_STATUS", "INJECTED_FAILURE"],
] as const);
const countersFailure = Object.freeze([
  ["CHECKER_INVOCATION", 0], ["INJECTED_FAILURE", 1], ["RETRY", 0], ["SEMANTIC_CONSEQUENCE", 0],
] as const);
const provenanceFailure = Object.freeze([
  ["FICTIONAL_BASELINE", ["INJECTED_FAILURE"], FICTIONAL, SUITE_OWNED],
  ["FIRST_FAILURE_IDENTITY", ["INJECTED_FAILURE"], NOT_APPLICABLE, NOT_APPLICABLE],
  ["OUTCOME_STATUS", ["INJECTED_FAILURE"], NOT_APPLICABLE, NOT_APPLICABLE],
] as const);

// Sources: exact machine value review Section 5 and D6 provenance review Section 5.
const D6_PROBES: Readonly<Record<string, ProbeSpec>> = Object.freeze({
  DENIED_PUBLIC_MEMBER_REFLECT_GET: {
    family: "DENIED_PUBLIC_MEMBER_LOOKUP", deniedMemberIds: { mode: "ONE_OF", values: DENIED_MEMBER_SET }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "NOT_PROBE",
    operations: [["DENIED_LOOKUP", "DENIED_PUBLIC_MEMBER_REFLECT_GET", 2, 1, ["DENIED_MEMBER", "PUBLIC_SUBJECT"], ["LOOKUP_RESULT"], ["NONE"]]],
    assertions: [["TO_BE_UNDEFINED", "UNDEFINED_VALUE", "LOOKUP_RESULT", "DENIED_LOOKUP"]],
    relations: [["ASSERTION_SUBJECT", "LOOKUP_RESULT", "LOOKUP_RESULT", "DENIED_LOOKUP"], ["ASSERTION_POSTDOMINATES_OPERATION", "LOOKUP_RESULT", "LOOKUP_RESULT", "DENIED_LOOKUP"]],
    counters: [["LOOKUP_INVOCATION", 1]], escapes: ["DENIED_MEMBER", "LOOKUP_RESULT", "PUBLIC_SUBJECT"],
    provenance: [["DENIED_MEMBER", ["DENIED_LOOKUP"], NOT_APPLICABLE, NOT_APPLICABLE], ["LOOKUP_RESULT", ["DENIED_LOOKUP"], NOT_APPLICABLE, NOT_APPLICABLE], ["PUBLIC_SUBJECT", ["DENIED_LOOKUP"], FICTIONAL, SUITE_OWNED]],
  },
  DENIED_PUBLIC_MEMBER_IN: {
    family: "DENIED_PUBLIC_MEMBER_LOOKUP", deniedMemberIds: { mode: "ONE_OF", values: DENIED_MEMBER_SET }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "NOT_PROBE",
    operations: [["DENIED_LOOKUP", "DENIED_PUBLIC_MEMBER_IN", 2, 1, ["DENIED_MEMBER", "PUBLIC_SUBJECT"], ["LOOKUP_RESULT"], ["NONE"]]],
    assertions: [["TO_BE_FALSE", "FALSE_VALUE", "LOOKUP_RESULT", "DENIED_LOOKUP"]],
    relations: [["ASSERTION_SUBJECT", "LOOKUP_RESULT", "LOOKUP_RESULT", "DENIED_LOOKUP"], ["ASSERTION_POSTDOMINATES_OPERATION", "LOOKUP_RESULT", "LOOKUP_RESULT", "DENIED_LOOKUP"]],
    counters: [["LOOKUP_INVOCATION", 1]], escapes: ["DENIED_MEMBER", "LOOKUP_RESULT", "PUBLIC_SUBJECT"],
    provenance: [["DENIED_MEMBER", ["DENIED_LOOKUP"], NOT_APPLICABLE, NOT_APPLICABLE], ["LOOKUP_RESULT", ["DENIED_LOOKUP"], NOT_APPLICABLE, NOT_APPLICABLE], ["PUBLIC_SUBJECT", ["DENIED_LOOKUP"], FICTIONAL, SUITE_OWNED]],
  },
  DENIED_PUBLIC_MEMBER_KEYS: {
    family: "DENIED_PUBLIC_MEMBER_LOOKUP", deniedMemberIds: { mode: "ONE_OF", values: DENIED_MEMBER_SET }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "NOT_PROBE",
    operations: [["DENIED_KEYS_ENUMERATION", "OBJECT_KEYS", 1, 1, ["PUBLIC_SUBJECT"], ["LOOKUP_RESULT"], ["NONE"]]],
    assertions: [["NOT_TO_CONTAIN", "DENIED_MEMBER_VALUE", "LOOKUP_RESULT", "DENIED_KEYS_ENUMERATION"]],
    relations: [["ASSERTION_SUBJECT", "LOOKUP_RESULT", "LOOKUP_RESULT", "DENIED_KEYS_ENUMERATION"], ["ASSERTION_POSTDOMINATES_OPERATION", "LOOKUP_RESULT", "LOOKUP_RESULT", "DENIED_KEYS_ENUMERATION"]],
    counters: [["KEYS_INVOCATION", 1]], escapes: ["DENIED_MEMBER", "LOOKUP_RESULT", "PUBLIC_SUBJECT"],
    provenance: [["DENIED_MEMBER", ["DENIED_KEYS_ENUMERATION"], NOT_APPLICABLE, NOT_APPLICABLE], ["LOOKUP_RESULT", ["DENIED_KEYS_ENUMERATION"], NOT_APPLICABLE, NOT_APPLICABLE], ["PUBLIC_SUBJECT", ["DENIED_KEYS_ENUMERATION"], FICTIONAL, SUITE_OWNED]],
  },
  FRESH_COPY_MUTATION: {
    family: "FRESH_COPY_MUTATION", deniedMemberIds: { mode: "ONE_OF", values: ["NONE"] }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "NOT_PROBE",
    operations: [["READ_BYTES", "FRESH_COPY_MUTATION", 0, 2, ["PUBLIC_SUBJECT"], ["FIRST_COPY", "SECOND_COPY"], ["NONE"]], ["FIRST_COPY_MUTATION", "FRESH_COPY_MUTATION", 0, 1, ["FIRST_COPY"], ["FIRST_COPY"], ["NONE"]]],
    assertions: [["TO_EQUAL_CONTENT", "ORIGINAL_FICTIONAL_CONTENT", "SECOND_COPY", "READ_BYTES"], ["TO_EQUAL_BYTE_LENGTH", "ORIGINAL_BYTE_LENGTH", "SECOND_COPY", "READ_BYTES"], ["TO_EQUAL_HASH", "ORIGINAL_SHA256", "SECOND_COPY", "READ_BYTES"]],
    relations: [["MUTATES_ONLY", "FIRST_COPY", "NONE", "FIRST_COPY_MUTATION"], ["VALUE_CONTENT_EQUAL", "SECOND_COPY", "FICTIONAL_BASELINE", "READ_BYTES"], ["VALUE_BYTE_LENGTH_EQUAL", "SECOND_COPY", "FICTIONAL_BASELINE", "READ_BYTES"], ["VALUE_SHA256_EQUAL", "SECOND_COPY", "FICTIONAL_BASELINE", "READ_BYTES"], ["ASSERTION_SUBJECT", "SECOND_COPY", "SECOND_COPY", "READ_BYTES"], ["ASSERTION_POSTDOMINATES_OPERATION", "SECOND_COPY", "SECOND_COPY", "READ_BYTES"]],
    counters: [["MUTATION", 1], ["READ_BYTES_INVOCATION", 2]], escapes: ["FICTIONAL_BASELINE", "FIRST_COPY", "PUBLIC_SUBJECT", "SECOND_COPY"],
    provenance: [["FICTIONAL_BASELINE", ["READ_BYTES"], FICTIONAL, SUITE_OWNED], ["FIRST_COPY", ["FIRST_COPY_MUTATION", "READ_BYTES"], FICTIONAL, SUITE_OWNED], ["PUBLIC_SUBJECT", ["READ_BYTES"], FICTIONAL, SUITE_OWNED], ["SECOND_COPY", ["READ_BYTES"], FICTIONAL, SUITE_OWNED]],
  },
  FROZEN_OBJECT_MUTATION: {
    family: "FROZEN_OBJECT_MUTATION", deniedMemberIds: { mode: "ONE_OF", values: ["NONE"] }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "NOT_PROBE",
    operations: [["FROZEN_CHECK", "FROZEN_OBJECT_MUTATION", 1, 1, ["FROZEN_TARGET"], ["OUTCOME_STATUS"], ["NONE"]], ["FROZEN_MUTATION", "FROZEN_OBJECT_MUTATION", 0, 1, ["FROZEN_TARGET"], [], ["NONE"]]],
    assertions: [["TO_BE_TRUE", "TRUE_VALUE", "OUTCOME_STATUS", "FROZEN_CHECK"], ["TO_THROW", "NONE", "FROZEN_TARGET", "FROZEN_MUTATION"]],
    relations: [["VALUE_IDENTITY_EQUAL", "FROZEN_TARGET", "FROZEN_TARGET", "FROZEN_MUTATION"], ["ASSERTION_SUBJECT", "OUTCOME_STATUS", "OUTCOME_STATUS", "FROZEN_CHECK"], ["ASSERTION_SUBJECT", "FROZEN_TARGET", "FROZEN_TARGET", "FROZEN_MUTATION"], ["ASSERTION_POSTDOMINATES_OPERATION", "OUTCOME_STATUS", "OUTCOME_STATUS", "FROZEN_CHECK"], ["ASSERTION_POSTDOMINATES_OPERATION", "FROZEN_TARGET", "FROZEN_TARGET", "FROZEN_MUTATION"]],
    counters: [["MUTATION", 1]], escapes: ["FROZEN_TARGET", "OUTCOME_STATUS"],
    provenance: [["FROZEN_TARGET", ["FROZEN_CHECK", "FROZEN_MUTATION"], FICTIONAL, SUITE_OWNED], ["OUTCOME_STATUS", ["FROZEN_CHECK"], NOT_APPLICABLE, NOT_APPLICABLE]],
  },
  SYNTHETIC_CORRUPTION: {
    family: "SYNTHETIC_CORRUPTION", deniedMemberIds: { mode: "ONE_OF", values: ["NONE"] }, corruptionTransformIds: { mode: "ONE_OF", values: TRANSFORM_SET }, failureOperation: "NOT_PROBE",
    operations: [["CORRUPTION_TRANSFORM", "SYNTHETIC_CORRUPTION", 1, 1, ["FICTIONAL_BASELINE"], ["TRANSFORMED_BYTES"], ["NONE"]], ["INJECTED_READ", "PRIVATE_SEAM_READ_FILE", 1, 1, ["TRANSFORMED_BYTES"], ["INJECTED_READ_RESULT", "OUTCOME_STATUS"], ["NONE"]]],
    assertions: [["TO_BE_PRESERVATION_INCOMPLETE", "PRESERVATION_INCOMPLETE", "OUTCOME_STATUS", "INJECTED_READ"]],
    relations: [["VALUE_FLOWS_ONLY_TO", "TRANSFORMED_BYTES", "INJECTED_READ_RESULT", "CORRUPTION_TRANSFORM"], ["ASSERTION_SUBJECT", "OUTCOME_STATUS", "OUTCOME_STATUS", "INJECTED_READ"], ["ASSERTION_POSTDOMINATES_OPERATION", "OUTCOME_STATUS", "OUTCOME_STATUS", "INJECTED_READ"]],
    counters: [["CHECKER_INVOCATION", 0], ["RETRY", 0], ["TRANSFORM", 1]], escapes: ["FICTIONAL_BASELINE", "INJECTED_READ_RESULT", "OUTCOME_STATUS", "TRANSFORMED_BYTES"],
    provenance: [["FICTIONAL_BASELINE", ["CORRUPTION_TRANSFORM"], FICTIONAL, SUITE_OWNED], ["INJECTED_READ_RESULT", ["INJECTED_READ"], FICTIONAL, SUITE_OWNED], ["OUTCOME_STATUS", ["INJECTED_READ"], NOT_APPLICABLE, NOT_APPLICABLE], ["TRANSFORMED_BYTES", ["CORRUPTION_TRANSFORM", "INJECTED_READ"], FICTIONAL, SUITE_OWNED]],
  },
  INJECTED_MECHANICAL_FAILURE_PROGRESS: {
    family: "INJECTED_MECHANICAL_FAILURE", deniedMemberIds: { mode: "ONE_OF", values: ["NONE"] }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "PRIVATE_SEAM_WRITE",
    operations: [["INJECTED_FAILURE", "PRIVATE_SEAM_WRITE", 5, 1, ["EXPECTED_BYTE_LENGTH"], ["FIRST_FAILURE_IDENTITY", "OUTCOME_STATUS", "RETURNED_PROGRESS"], ["RETURNS_SHORT_PROGRESS", "RETURNS_ZERO_PROGRESS"]]],
    assertions: assertionsFailure, relations: [...relationsFailure, ["PROGRESS_LESS_THAN_EXPECTED_LENGTH", "RETURNED_PROGRESS", "EXPECTED_BYTE_LENGTH", "INJECTED_FAILURE"]], counters: countersFailure,
    escapes: ["EXPECTED_BYTE_LENGTH", "FIRST_FAILURE_IDENTITY", "OUTCOME_STATUS", "RETURNED_PROGRESS"],
    provenance: [["EXPECTED_BYTE_LENGTH", ["INJECTED_FAILURE"], FICTIONAL, SUITE_OWNED], ["FICTIONAL_BASELINE", ["INJECTED_FAILURE"], FICTIONAL, SUITE_OWNED], ["FIRST_FAILURE_IDENTITY", ["INJECTED_FAILURE"], NOT_APPLICABLE, NOT_APPLICABLE], ["OUTCOME_STATUS", ["INJECTED_FAILURE"], NOT_APPLICABLE, NOT_APPLICABLE], ["RETURNED_PROGRESS", ["INJECTED_FAILURE"], NOT_APPLICABLE, NOT_APPLICABLE]],
  },
  CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE: {
    family: "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE", deniedMemberIds: { mode: "ONE_OF", values: ["NONE"] }, corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] }, failureOperation: "NOT_PROBE",
    operations: [["CHECKER", "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE", 1, 1, ["CHECKER_INPUT"], ["FIRST_FAILURE_IDENTITY"], ["THROWS_CONTENT_FREE_ERROR"]], ["RECEIPT_REREAD", "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE", 0, 1, ["VERIFIED_REFERENCE"], ["RECEIPT_REREAD_VALUE"], ["NONE"]], ["RESPONSE_REREAD", "CHECKER_EXCEPTION_AFTER_VERIFIED_CAPTURE", 0, 1, ["VERIFIED_REFERENCE"], ["RESPONSE_REREAD_VALUE"], ["NONE"]]],
    assertions: [["TO_BE_IDENTITY_UNCHANGED", "PRIOR_REREAD_IDENTITY", "RECEIPT_REREAD_VALUE", "RECEIPT_REREAD"], ["TO_BE_IDENTITY_UNCHANGED", "PRIOR_REREAD_IDENTITY", "RESPONSE_REREAD_VALUE", "RESPONSE_REREAD"]],
    relations: [["OPERATION_PRECEDES_OPERATION", "VERIFIED_REFERENCE", "CHECKER_INPUT", "CHECKER"], ["CHECKER_INPUT_ONLY_VERIFIED_REFERENCE", "VERIFIED_REFERENCE", "CHECKER_INPUT", "CHECKER"], ["VALUE_IDENTITY_EQUAL", "RECEIPT_REREAD_VALUE", "VERIFIED_REFERENCE", "RECEIPT_REREAD"], ["VALUE_IDENTITY_EQUAL", "RESPONSE_REREAD_VALUE", "VERIFIED_REFERENCE", "RESPONSE_REREAD"], ["ASSERTION_SUBJECT", "RECEIPT_REREAD_VALUE", "RECEIPT_REREAD_VALUE", "RECEIPT_REREAD"], ["ASSERTION_SUBJECT", "RESPONSE_REREAD_VALUE", "RESPONSE_REREAD_VALUE", "RESPONSE_REREAD"], ["ASSERTION_POSTDOMINATES_OPERATION", "RECEIPT_REREAD_VALUE", "RECEIPT_REREAD_VALUE", "RECEIPT_REREAD"], ["ASSERTION_POSTDOMINATES_OPERATION", "RESPONSE_REREAD_VALUE", "RESPONSE_REREAD_VALUE", "RESPONSE_REREAD"]],
    counters: [["CHECKER_INVOCATION", 1], ["DELIVERY", 0], ["RETRY", 0]], escapes: ["CHECKER_INPUT", "FIRST_FAILURE_IDENTITY", "RECEIPT_REREAD_VALUE", "RESPONSE_REREAD_VALUE", "VERIFIED_REFERENCE"],
    provenance: [["CHECKER_INPUT", ["CHECKER"], FICTIONAL, SUITE_OWNED], ["FIRST_FAILURE_IDENTITY", ["CHECKER"], NOT_APPLICABLE, NOT_APPLICABLE], ["RECEIPT_REREAD_VALUE", ["RECEIPT_REREAD"], FICTIONAL, SUITE_OWNED], ["RESPONSE_REREAD_VALUE", ["RESPONSE_REREAD"], FICTIONAL, SUITE_OWNED], ["VERIFIED_REFERENCE", ["CHECKER", "RECEIPT_REREAD", "RESPONSE_REREAD"], FICTIONAL, SUITE_OWNED]],
  },
});

// Source: exact machine value review Section 5.7.
const THROW_VARIANTS: Readonly<Record<string, readonly [string, number]>> = Object.freeze({
  THROW_SHA256: ["PRIVATE_SEAM_SHA256", 1],
  THROW_REPOSITORY_ROOT: ["PRIVATE_SEAM_REPOSITORY_ROOT", 1],
  THROW_REALPATH: ["PRIVATE_SEAM_REALPATH", 1],
  THROW_LSTAT: ["PRIVATE_SEAM_LSTAT", 1],
  THROW_STAT: ["PRIVATE_SEAM_STAT", 1],
  THROW_EXISTS: ["PRIVATE_SEAM_EXISTS", 1],
  THROW_MKDIR: ["PRIVATE_SEAM_MKDIR", 2],
  THROW_OPEN: ["PRIVATE_SEAM_OPEN", 3],
  THROW_WRITE: ["PRIVATE_SEAM_WRITE", 5],
  THROW_FSYNC: ["PRIVATE_SEAM_FSYNC", 1],
  THROW_CLOSE: ["PRIVATE_SEAM_CLOSE", 1],
  THROW_RENAME: ["PRIVATE_SEAM_RENAME", 2],
  THROW_READ_FILE: ["PRIVATE_SEAM_READ_FILE", 1],
  THROW_REMOVE: ["PRIVATE_SEAM_REMOVE", 2],
});

function probeStructure(spec: ProbeSpec): JsonObject {
  return {
    scope: oneOf("ONE_TEST_CALLBACK"),
    deniedMemberIds: spec.deniedMemberIds as JsonObject,
    corruptionTransformIds: spec.corruptionTransformIds as JsonObject,
    failureOperations: oneOf(spec.failureOperation),
    operations: keyEqual(spec.operations.map(([role, operation, arity, count, inputs, outputs, effects]) => ({
      role,
      operations: oneOf(operation),
      argumentCount: range(arity, arity),
      countWithinScope: range(count, count),
      inputRoles: equals(...inputs),
      outputRoles: equals(...outputs),
      failureEffects: oneOf(...effects),
    })), ["role"]),
    assertions: keyEqual(spec.assertions.map(([matcher, expected, subjectRole, operationRole]) => ({
      matcher,
      expected,
      subjectRole,
      operationRole,
      sameTestCallback: oneOf(true),
      postDominates: oneOf(true),
    })), ["matcher", "expected", "subjectRole", "operationRole"]),
    relations: keyEqual(spec.relations.map(([kind, leftRole, rightRole, operationRole]) => ({ kind, leftRole, rightRole, operationRole })), ["kind", "leftRole", "rightRole", "operationRole"]),
    counters: keyEqual(spec.counters.map(([counter, count]) => ({ counter, count: range(count, count) })), ["counter"]),
    escapes: keyEqual(spec.escapes.map((valueRole) => ({ valueRole, channels: equals() })), ["valueRole"]),
    roleProvenance: keyEqual(spec.provenance.map(([valueRole, operationRoles, fictionalLineage, suiteFixtureOwnership]) => ({
      valueRole,
      operationRoles: equals(...operationRoles),
      fictionalLineages: oneOf(fictionalLineage),
      suiteFixtureOwnerships: oneOf(suiteFixtureOwnership),
    })), ["valueRole"]),
  };
}

function buildD6Predicate(id: string, spec: ProbeSpec): JsonObject {
  return {
    schema: SCHEMA,
    id,
    phase: "TERMINAL",
    sourceRoles: oneOf("FOCUSED_TEST"),
    nodeKinds: any(),
    provenanceKinds: any(),
    roots: any(),
    operations: any(),
    provenanceFamilies: any(),
    importForms: any(),
    importAllowlistStatuses: any(),
    importBindingStatuses: any(),
    publicNameCapabilities: any(),
    publicTypeCapabilities: any(),
    subjectDataLabels: any(),
    argumentCount: any(),
    argumentConstraints: [],
    everyArgument: { provenanceKinds: any(), dataLabels: any(), governedLiteralIds: any() },
    receiverClasses: any(),
    receiverProvenanceKinds: any(),
    receiverDataLabels: any(),
    callableConstraints: [],
    operationRelations: any(),
    destinationLabels: any(),
    dataFlows: any(),
    ancestryAll: oneOf("IN_IMPORTED_JEST_IT_CALLBACK", "IN_IMPORTED_JEST_IT_EACH_CALLBACK"),
    ancestryNone: oneOf("ESCAPES_TEST_CALLBACK", "IN_ASYNC_SCHEDULE", "IN_LOOP_OR_RETRY", "IN_MODULE_SCOPE", "IN_RETURN_EXPRESSION"),
    controlFacts: any(),
    responseFlowRelations: any(),
    filesystemMutationRelations: any(),
    probeFamilies: oneOf(spec.family),
    probeValidities: any(),
    terminalCandidateStatuses: any(),
    probeStructure: probeStructure(spec),
    classification: "AUTHORISED_TEST_PROBE",
  };
}

function throwSpec(operation: string, arity: number): ProbeSpec {
  return {
    family: "INJECTED_MECHANICAL_FAILURE",
    deniedMemberIds: { mode: "ONE_OF", values: ["NONE"] },
    corruptionTransformIds: { mode: "ONE_OF", values: ["NONE"] },
    failureOperation: operation,
    operations: [["INJECTED_FAILURE", operation, arity, 1, [], ["FIRST_FAILURE_IDENTITY", "OUTCOME_STATUS"], ["THROWS_CONTENT_FREE_ERROR"]]],
    assertions: assertionsFailure,
    relations: relationsFailure,
    counters: countersFailure,
    escapes: ["FIRST_FAILURE_IDENTITY", "OUTCOME_STATUS"],
    provenance: provenanceFailure,
  };
}

function generatePredicates(): JsonObject[] {
  const predicates: JsonObject[] = [];
  for (const [operation, rowValue] of Object.entries(D4_BASE_ROWS)) {
    if (D4_BRANCH_OPERATIONS.has(operation)) {
      predicates.push(buildD4Predicate(operation, rowValue, "COUNT_0"));
      predicates.push(buildD4Predicate(operation, rowValue, "COUNT_1"));
    } else {
      predicates.push(buildD4Predicate(operation, rowValue, "ONLY"));
    }
  }
  for (const [operation, baseOperation] of Object.entries(PRIVATE_SEAM_BASES)) {
    predicates.push(buildPrivateSeamPredicate(operation, baseOperation));
  }
  for (const [probeId, spec] of Object.entries(D6_PROBES)) {
    predicates.push(buildD6Predicate(`D6:${probeId}:ONLY`, spec));
  }
  for (const [variant, [operation, arity]] of Object.entries(THROW_VARIANTS)) {
    predicates.push(buildD6Predicate(`D6:INJECTED_MECHANICAL_FAILURE_THROW:${variant}`, throwSpec(operation, arity)));
  }
  return predicates.sort(comparePredicates);
}

const REQUIRED_FIELDS = Object.freeze([
  "schema", "id", "phase", "sourceRoles", "nodeKinds", "provenanceKinds", "roots", "operations",
  "provenanceFamilies", "importForms", "importAllowlistStatuses", "importBindingStatuses", "publicNameCapabilities",
  "publicTypeCapabilities", "subjectDataLabels", "argumentCount", "argumentConstraints", "everyArgument",
  "receiverClasses", "receiverProvenanceKinds", "receiverDataLabels", "callableConstraints", "operationRelations",
  "destinationLabels", "dataFlows", "ancestryAll", "ancestryNone", "controlFacts", "responseFlowRelations",
  "filesystemMutationRelations", "probeFamilies", "probeValidities", "terminalCandidateStatuses", "probeStructure",
  "classification",
].sort());

function validatePredicates(predicates: JsonObject[]): void {
  const ids = predicates.map((predicate) => String(predicate.id));
  const d4Ids = expectedD4Ids();
  const d6Ids = expectedD6Ids();
  assertEqual(ids.filter((id) => id.startsWith("D4:")).length, D4_COUNT, "D4_COUNT");
  assertEqual(ids.filter((id) => id.startsWith("D6:")).length, D6_COUNT, "D6_COUNT");
  assertEqual(ids.length, TOTAL_COUNT, "TOTAL_COUNT");
  assertEqual(new Set(ids).size, TOTAL_COUNT, "UNIQUE_IDS");
  assertJsonEqual(ids, [...d4Ids, ...d6Ids].sort(comparePredicateIds), "EXPECTED_ID_SET_AND_ORDER");
  for (const predicate of predicates) {
    const id = String(predicate.id);
    assertJsonEqual(Object.keys(predicate).sort(), REQUIRED_FIELDS, `${id}:ROOT_FIELDS`);
    assertEqual(predicate.schema, SCHEMA, `${id}:SCHEMA`);
    assertEqual(predicate.phase, "TERMINAL", `${id}:PHASE`);
    validateValue(predicate, id);
    if (id.startsWith("D4:")) validateD4Wrapper(predicate, id);
    else validateD6Wrapper(predicate, id);
  }
  assertJsonEqual(predicates, [...predicates].sort(comparePredicates), "DETERMINISTIC_ORDER");
  const firstSerialization = JSON.stringify(predicates, null, 2) + "\n";
  const secondSerialization = JSON.stringify(generatePredicates(), null, 2) + "\n";
  assertEqual(firstSerialization, secondSerialization, "DETERMINISTIC_SERIALIZATION");
}

function validateValue(value: JsonValue, location: string): void {
  if (typeof value === "string") {
    if (/\b(TODO|TBD|PLACEHOLDER|DRAFT|UNRESOLVED)\b/i.test(value)) fail(location, "drafting string present");
    return;
  }
  if (value === null || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((child, index) => validateValue(child, `${location}[${index}]`));
    return;
  }
  if ("mode" in value) validateSelector(value, location);
  for (const [key, child] of Object.entries(value)) validateValue(child, `${location}.${key}`);
}

function validateSelector(selector: JsonObject, location: string): void {
  const modes = new Set(["ANY", "ONE_OF", "RANGE", "KEY_EQUAL", "EQUALS", "CONTAINS", "DISJOINT"]);
  if (!modes.has(String(selector.mode))) fail(location, `unknown selector mode ${String(selector.mode)}`);
  if (selector.mode === "ANY" && Object.keys(selector).length !== 1) fail(location, "ANY has extra fields");
  if (["ONE_OF", "EQUALS", "CONTAINS", "DISJOINT"].includes(String(selector.mode))) {
    if (!Array.isArray(selector.values)) fail(location, "selector values missing");
    const serialized = (selector.values as JsonValue[]).map(stableScalar);
    if (new Set(serialized).size !== serialized.length) fail(location, "duplicate selector values");
    if (JSON.stringify(serialized) !== JSON.stringify([...serialized].sort())) fail(location, "selector values not sorted");
    if (selector.mode !== "EQUALS" && serialized.length === 0) fail(location, "empty favourable selector");
    if (serialized.includes("UNKNOWN")) fail(location, "favourable UNKNOWN is forbidden");
  }
  if (selector.mode === "KEY_EQUAL" && !Array.isArray(selector.records)) fail(location, "KEY_EQUAL records missing");
  if (selector.mode === "RANGE") {
    if (!Number.isInteger(selector.minimum) || (selector.minimum as number) < 0) fail(location, "invalid range minimum");
    if (selector.maximum !== null && (!Number.isInteger(selector.maximum) || (selector.maximum as number) < (selector.minimum as number))) fail(location, "invalid range maximum");
  }
}

function validateD4Wrapper(predicate: JsonObject, id: string): void {
  assertEqual(predicate.classification, "PERMITTED_MECHANICAL_EDGE", `${id}:CLASSIFICATION`);
  assertJsonEqual(predicate.probeFamilies, any(), `${id}:PROBE_FAMILIES`);
  assertJsonEqual(predicate.probeValidities, any(), `${id}:PROBE_VALIDITIES`);
  assertJsonEqual(predicate.terminalCandidateStatuses, any(), `${id}:TERMINAL_STATUS`);
  assertJsonEqual(predicate.receiverProvenanceKinds, any(), `${id}:RECEIVER_PROVENANCE`);
  assertJsonEqual(predicate.receiverDataLabels, any(), `${id}:RECEIVER_LABELS`);
  assertJsonEqual(predicate.probeStructure, nonProbeStructure(), `${id}:NON_PROBE_STRUCTURE`);
}

function validateD6Wrapper(predicate: JsonObject, id: string): void {
  assertEqual(predicate.classification, "AUTHORISED_TEST_PROBE", `${id}:CLASSIFICATION`);
  for (const field of ["nodeKinds", "provenanceKinds", "roots", "operations", "provenanceFamilies", "importForms", "importAllowlistStatuses", "importBindingStatuses", "publicNameCapabilities", "publicTypeCapabilities", "subjectDataLabels", "argumentCount", "receiverClasses", "receiverProvenanceKinds", "receiverDataLabels", "operationRelations", "destinationLabels", "dataFlows", "controlFacts", "responseFlowRelations", "filesystemMutationRelations", "probeValidities", "terminalCandidateStatuses"]) {
    assertJsonEqual(predicate[field], any(), `${id}:${field}`);
  }
  assertJsonEqual(predicate.sourceRoles, oneOf("FOCUSED_TEST"), `${id}:SOURCE_ROLES`);
  assertJsonEqual(predicate.argumentConstraints, [], `${id}:ARGUMENT_CONSTRAINTS`);
  assertJsonEqual(predicate.callableConstraints, [], `${id}:CALLABLE_CONSTRAINTS`);
  const structure = predicate.probeStructure as JsonObject;
  for (const collection of ["operations", "assertions", "relations", "counters", "escapes", "roleProvenance"]) {
    assertEqual((structure[collection] as JsonObject).mode, "KEY_EQUAL", `${id}:PROBE_STRUCTURE.${collection}`);
  }
}

function expectedD4Ids(): string[] {
  const ids: string[] = [];
  for (const operation of Object.keys(D4_BASE_ROWS)) {
    if (D4_BRANCH_OPERATIONS.has(operation)) ids.push(`D4:${operation}:COUNT_0`, `D4:${operation}:COUNT_1`);
    else ids.push(`D4:${operation}:ONLY`);
  }
  ids.push(...Object.keys(PRIVATE_SEAM_BASES).map((operation) => `D4:${operation}:ONLY`));
  return ids.sort(comparePredicateIds);
}

function expectedD6Ids(): string[] {
  return [
    ...Object.keys(D6_PROBES).map((probeId) => `D6:${probeId}:ONLY`),
    ...Object.keys(THROW_VARIANTS).map((variant) => `D6:INJECTED_MECHANICAL_FAILURE_THROW:${variant}`),
  ].sort(comparePredicateIds);
}

function comparePredicates(left: JsonObject, right: JsonObject): number {
  return comparePredicateIds(String(left.id), String(right.id));
}

function comparePredicateIds(left: string, right: string): number {
  const leftParts = left.split(":");
  const rightParts = right.split(":");
  const rankDifference = (leftParts[0] === "D4" ? 0 : 1) - (rightParts[0] === "D4" ? 0 : 1);
  return rankDifference || asciiCompare(leftParts[1], rightParts[1]) || asciiCompare(leftParts[2], rightParts[2]);
}

function compareJsonScalars(left: JsonValue, right: JsonValue): number {
  return asciiCompare(stableScalar(left), stableScalar(right));
}

function stableScalar(value: JsonValue): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function asciiCompare(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function assertEqual(actual: unknown, expected: unknown, label: string): void {
  if (actual !== expected) fail(label, `expected ${String(expected)}, received ${String(actual)}`);
}

function assertJsonEqual(actual: unknown, expected: unknown, label: string): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(label, "exact JSON mismatch");
}

function fail(location: string, reason: string): never {
  throw new Error(`GENERATOR_BLOCKED\nOBJECT=${location.split(":").slice(0, 3).join(":")}\nFIELD=${location}\nREASON=${reason}`);
}

function main(): void {
  const predicates = generatePredicates();
  validatePredicates(predicates);
  const repositoryRoot = resolveRepositoryRootFromImportMeta(import.meta.url);
  const outputPath = path.join(repositoryRoot, OUTPUT_RELATIVE_PATH);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(predicates, null, 2) + "\n", "utf8");
  process.stdout.write([
    `D4_COUNT=${D4_COUNT}`,
    `D6_COUNT=${D6_COUNT}`,
    `TOTAL_COUNT=${TOTAL_COUNT}`,
    `UNIQUE_IDS=${new Set(predicates.map((predicate) => predicate.id)).size}`,
    `OUTPUT=${OUTPUT_RELATIVE_PATH}`,
  ].join("\n") + "\n");
}

main();