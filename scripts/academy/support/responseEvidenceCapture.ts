import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { resolveRepositoryRootFromDirectory } from "../../support/repositoryRoot";

export type ResponseCaptureDispositionRule =
  | "DELETE_WHEN_DUE"
  | "SEPARATE_AUTHORITY_REQUIRED_FOR_TRANSFER_OR_DELIVERY";

export interface CaptureResponseEvidenceOptions {
  response: string;
  attemptId: string;
  authorityDocumentId: string;
  externalCaptureRoot: string;
  accessOwner: string;
  reviewPurpose: string;
  retainUntil: string;
  dispositionRule: ResponseCaptureDispositionRule;
  now: () => Date;
}

export interface VerifiedResponseCaptureReference {
  readonly attemptId: string;
  readonly byteLength: number;
  readonly sha256: string;
  readBytes(): Uint8Array;
}

export type ResponseCaptureOutcome = Readonly<
  | {
      status: "PRESERVATION_VERIFIED";
      capture: Readonly<VerifiedResponseCaptureReference>;
    }
  | {
      status: "PRESERVATION_INCOMPLETE";
      attemptId: string;
    }
>;

interface FileStatus {
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
}

interface CaptureOperations {
  pathExists(filePath: string): boolean;
  realpath(filePath: string): string;
  lstat(filePath: string): FileStatus;
  mkdir(directory: string, mode: number): void;
  open(filePath: string, flags: string, mode?: number): number;
  write(
    descriptor: number,
    bytes: Uint8Array,
    offset: number,
    length: number,
  ): number;
  flush(descriptor: number): void;
  close(descriptor: number): void;
  rename(sourcePath: string, destinationPath: string): void;
  remove(filePath: string): void;
  read(filePath: string): Uint8Array;
  hash(bytes: Uint8Array): string;
  sealReceipt<T extends object>(receipt: T): Readonly<T>;
  serializeReceipt(receipt: object): Uint8Array;
  recordEvent?(event: string): void;
}

interface ResponseCaptureReceipt {
  receiptVersion: "BOUNDED-RESPONSE-CAPTURE-RECEIPT-1";
  attemptId: string;
  authorityDocumentId: string;
  storageContract: "EXTERNAL-ATOMIC-FILE-1";
  encoding: "UTF-8-NO-BOM-NO-NORMALISATION-NO-TERMINAL-NEWLINE-1";
  sourceByteLength: number;
  persistedByteLength: number;
  sourceSha256: string;
  persistedSha256: string;
  verification: "EXACT_BYTE_MATCH";
  captureStartedAt: string;
  responseWriteConfirmedAt: string;
  responseRereadAt: string;
  responseVerifiedAt: string;
  receiptCreatedAt: string;
  receiptSealedAt: string;
  accessOwner: string;
  reviewPurpose: string;
  retainUntil: string;
  dispositionRule: ResponseCaptureDispositionRule;
  dispositionState: "WITHHELD_PENDING_GOVERNANCE";
  delivered: false;
  semanticInspectionOrTransformation: false;
  repositoryPublished: false;
  memoryWritten: false;
  learningWritten: false;
  contributionAccepted: false;
}

interface ValidatedCaptureContext {
  captureStartedAt: string;
  attemptDirectory: string;
  responsePath: string;
  receiptPath: string;
}

const RESPONSE_FILE_NAME = "response.raw.utf8";
const RECEIPT_FILE_NAME = "response-capture-receipt.json";

export function preserveResponseEvidence(
  options: CaptureResponseEvidenceOptions,
): ResponseCaptureOutcome;
export function preserveResponseEvidence(
  options: CaptureResponseEvidenceOptions,
  operations: CaptureOperations = nodeCaptureOperations,
): ResponseCaptureOutcome {
  const attemptId = typeof options?.attemptId === "string"
    ? options.attemptId
    : "INVALID_ATTEMPT";

  try {
    const context = validateCaptureContext(options, operations);
    operations.recordEvent?.("validation-complete");

    const sourceBytes = Buffer.from(options.response, "utf8");
    operations.recordEvent?.("source-encoded");
    const sourceSha256 = requireSha256(operations.hash(sourceBytes));
    operations.recordEvent?.("source-hashed");

    const persistedBytes = publishAndRead(
      "response",
      context.responsePath,
      sourceBytes,
      operations,
    );
    const responseWriteConfirmedAt = utc(options.now());
    const responseRereadAt = utc(options.now());
    const persistedSha256 = requireSha256(operations.hash(persistedBytes));
    operations.recordEvent?.("response-hashed");
    requireExactBytes(sourceBytes, persistedBytes);
    if (persistedSha256 !== sourceSha256) {
      throw new Error("Persisted response hash mismatch.");
    }
    operations.recordEvent?.("response-verified");
    const responseVerifiedAt = utc(options.now());
    const receiptCreatedAt = utc(options.now());
    operations.recordEvent?.("receipt-created");
    const receiptSealedAt = utc(options.now());

    const receipt = operations.sealReceipt<ResponseCaptureReceipt>({
      receiptVersion: "BOUNDED-RESPONSE-CAPTURE-RECEIPT-1",
      attemptId: options.attemptId,
      authorityDocumentId: options.authorityDocumentId,
      storageContract: "EXTERNAL-ATOMIC-FILE-1",
      encoding: "UTF-8-NO-BOM-NO-NORMALISATION-NO-TERMINAL-NEWLINE-1",
      sourceByteLength: sourceBytes.byteLength,
      persistedByteLength: persistedBytes.byteLength,
      sourceSha256,
      persistedSha256,
      verification: "EXACT_BYTE_MATCH",
      captureStartedAt: context.captureStartedAt,
      responseWriteConfirmedAt,
      responseRereadAt,
      responseVerifiedAt,
      receiptCreatedAt,
      receiptSealedAt,
      accessOwner: options.accessOwner,
      reviewPurpose: options.reviewPurpose,
      retainUntil: options.retainUntil,
      dispositionRule: options.dispositionRule,
      dispositionState: "WITHHELD_PENDING_GOVERNANCE",
      delivered: false,
      semanticInspectionOrTransformation: false,
      repositoryPublished: false,
      memoryWritten: false,
      learningWritten: false,
      contributionAccepted: false,
    });
    operations.recordEvent?.("receipt-sealed");
    const receiptBytes = operations.serializeReceipt(receipt);
    operations.recordEvent?.("receipt-serialized");
    const receiptSha256 = requireSha256(operations.hash(receiptBytes));
    operations.recordEvent?.("receipt-hashed");
    const persistedReceiptBytes = publishAndRead(
      "receipt",
      context.receiptPath,
      receiptBytes,
      operations,
    );
    const persistedReceiptSha256 = requireSha256(
      operations.hash(persistedReceiptBytes),
    );
    operations.recordEvent?.("receipt-reread-hashed");
    requireExactBytes(receiptBytes, persistedReceiptBytes);
    if (persistedReceiptSha256 !== receiptSha256) {
      throw new Error("Persisted receipt hash mismatch.");
    }
    operations.recordEvent?.("receipt-verified");

    const capture = Object.freeze<VerifiedResponseCaptureReference>({
      attemptId: options.attemptId,
      byteLength: sourceBytes.byteLength,
      sha256: sourceSha256,
      readBytes() {
        const observed = operations.read(context.responsePath);
        requireExactBytes(sourceBytes, observed);
        if (requireSha256(operations.hash(observed)) !== sourceSha256) {
          throw new Error("Captured response identity changed.");
        }
        return Uint8Array.from(observed);
      },
    });
    const result = Object.freeze({
      status: "PRESERVATION_VERIFIED" as const,
      capture,
    });
    operations.recordEvent?.("preservation-verified");
    return result;
  } catch {
    return Object.freeze({
      status: "PRESERVATION_INCOMPLETE" as const,
      attemptId,
    });
  }
}

function validateCaptureContext(
  options: CaptureResponseEvidenceOptions,
  operations: CaptureOperations,
): ValidatedCaptureContext {
  if (!options || typeof options !== "object") {
    throw new Error("Capture options are required.");
  }
  if (typeof options.response !== "string") {
    throw new Error("Response must be a string.");
  }
  assertAttemptId(options.attemptId);
  assertNonEmpty("Authority identity", options.authorityDocumentId);
  assertNonEmpty("Access owner", options.accessOwner);
  assertNonEmpty("Review purpose", options.reviewPurpose);
  if (options.dispositionRule !== "DELETE_WHEN_DUE" &&
      options.dispositionRule !==
        "SEPARATE_AUTHORITY_REQUIRED_FOR_TRANSFER_OR_DELIVERY") {
    throw new Error("Unsupported disposition rule.");
  }
  if (typeof options.now !== "function") {
    throw new Error("Clock is required.");
  }
  const captureStartedAt = utc(options.now());
  const retainUntil = exactUtc(options.retainUntil);
  if (retainUntil.getTime() <= new Date(captureStartedAt).getTime()) {
    throw new Error("Retention deadline must be in the future.");
  }
  if (typeof options.externalCaptureRoot !== "string" ||
      !path.isAbsolute(options.externalCaptureRoot)) {
    throw new Error("External capture root must be an absolute path.");
  }

  const suppliedRoot = path.resolve(options.externalCaptureRoot);
  assertExistingDirectoryWithoutSymlinks(suppliedRoot, operations);
  const externalRoot = operations.realpath(suppliedRoot);
  assertExistingDirectoryWithoutSymlinks(externalRoot, operations);
  const repositoryRoot = operations.realpath(
    resolveRepositoryRootFromDirectory(__dirname),
  );
  if (isWithin(repositoryRoot, externalRoot)) {
    throw new Error("Capture root must remain outside the repository.");
  }

  const attemptDirectory = path.resolve(externalRoot, options.attemptId);
  if (!isWithin(externalRoot, attemptDirectory) ||
      attemptDirectory === externalRoot) {
    throw new Error("Attempt destination escaped the external root.");
  }
  operations.mkdir(attemptDirectory, 0o700);
  const attemptStatus = operations.lstat(attemptDirectory);
  if (!attemptStatus.isDirectory() || attemptStatus.isSymbolicLink()) {
    throw new Error("Attempt destination is not a private directory.");
  }
  const canonicalAttemptDirectory = operations.realpath(attemptDirectory);
  if (canonicalAttemptDirectory !== attemptDirectory ||
      !isWithin(externalRoot, canonicalAttemptDirectory)) {
    throw new Error("Attempt destination changed identity.");
  }

  return Object.freeze({
    captureStartedAt,
    attemptDirectory,
    responsePath: path.join(attemptDirectory, RESPONSE_FILE_NAME),
    receiptPath: path.join(attemptDirectory, RECEIPT_FILE_NAME),
  });
}

function publishAndRead(
  artifact: "response" | "receipt",
  finalPath: string,
  bytes: Uint8Array,
  operations: CaptureOperations,
): Uint8Array {
  const temporaryPath = `${finalPath}.tmp`;
  if (operations.pathExists(finalPath) || operations.pathExists(temporaryPath)) {
    throw new Error("Capture destination already exists.");
  }

  let descriptor: number | undefined;
  let temporaryCreated = false;
  try {
    descriptor = operations.open(temporaryPath, "wx", 0o600);
    temporaryCreated = true;
    operations.recordEvent?.(`${artifact}:temporary-open`);
    writeAll(descriptor, bytes, artifact, operations);
    operations.flush(descriptor);
    operations.recordEvent?.(`${artifact}:file-flush`);
    operations.close(descriptor);
    operations.recordEvent?.(`${artifact}:file-close`);
    descriptor = undefined;
    if (operations.pathExists(finalPath)) {
      throw new Error("Final capture destination already exists.");
    }
    operations.rename(temporaryPath, finalPath);
    operations.recordEvent?.(`${artifact}:rename`);
    temporaryCreated = false;

    const directory = path.dirname(finalPath);
    const directoryDescriptor = operations.open(directory, "r");
    operations.recordEvent?.(`${artifact}:directory-open`);
    try {
      operations.flush(directoryDescriptor);
      operations.recordEvent?.(`${artifact}:directory-flush`);
    } finally {
      operations.close(directoryDescriptor);
      operations.recordEvent?.(`${artifact}:directory-close`);
    }
  } catch (error) {
    if (descriptor !== undefined) {
      try {
        operations.close(descriptor);
      } catch {
        // Preserve the first publication failure.
      }
    }
    if (temporaryCreated) {
      try {
        operations.remove(temporaryPath);
      } catch {
        // Cleanup failure cannot convert publication failure to success.
      }
    }
    throw error;
  }

  const observed = operations.read(finalPath);
  operations.recordEvent?.(`${artifact}:reread`);
  return observed;
}

function writeAll(
  descriptor: number,
  bytes: Uint8Array,
  artifact: "response" | "receipt",
  operations: CaptureOperations,
): void {
  let offset = 0;
  while (offset < bytes.byteLength) {
    const written = operations.write(
      descriptor,
      bytes,
      offset,
      bytes.byteLength - offset,
    );
    operations.recordEvent?.(`${artifact}:write`);
    if (written <= 0) throw new Error("Capture write made no progress.");
    if (written > bytes.byteLength - offset) {
      throw new Error("Capture write exceeded its requested length.");
    }
    offset += written;
  }
  if (offset !== bytes.byteLength) {
    throw new Error("Capture write was incomplete.");
  }
}

function assertExistingDirectoryWithoutSymlinks(
  directory: string,
  operations: CaptureOperations,
): void {
  const root = path.parse(directory).root;
  const relative = path.relative(root, directory);
  let current = root;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    const status = operations.lstat(current);
    if (status.isSymbolicLink()) {
      throw new Error("Symlinked capture path is prohibited.");
    }
  }
  const status = operations.lstat(directory);
  if (!status.isDirectory() || status.isSymbolicLink()) {
    throw new Error("Capture root must be a real directory.");
  }
}

function assertAttemptId(attemptId: unknown): asserts attemptId is string {
  if (typeof attemptId !== "string" ||
      !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(attemptId) ||
      attemptId === "." || attemptId === "..") {
    throw new Error("Invalid attempt identity.");
  }
}

function assertNonEmpty(name: string, value: unknown): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }
}

function exactUtc(value: unknown): Date {
  if (typeof value !== "string") throw new Error("UTC timestamp is required.");
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || date.toISOString() !== value) {
    throw new Error("Timestamp must be exact UTC.");
  }
  return date;
}

function utc(value: Date): string {
  if (!(value instanceof Date) || !Number.isFinite(value.getTime())) {
    throw new Error("Clock returned an invalid date.");
  }
  return value.toISOString();
}

function isWithin(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === "" ||
    (!relative.startsWith(`..${path.sep}`) && relative !== ".." &&
      !path.isAbsolute(relative));
}

function requireSha256(value: string): string {
  if (!/^[a-f0-9]{64}$/.test(value)) {
    throw new Error("Invalid SHA-256 identity.");
  }
  return value;
}

function requireExactBytes(expected: Uint8Array, observed: Uint8Array): void {
  if (expected.byteLength !== observed.byteLength) {
    throw new Error("Captured byte length differs from source.");
  }
  for (let index = 0; index < expected.byteLength; index += 1) {
    if (expected[index] !== observed[index]) {
      throw new Error("Captured bytes differ from source.");
    }
  }
}

function deepFreeze<T extends object>(value: T): Readonly<T> {
  Object.freeze(value);
  for (const child of Object.values(value)) {
    if (child && typeof child === "object" && !Object.isFrozen(child)) {
      deepFreeze(child as object);
    }
  }
  return value;
}

const nodeCaptureOperations: CaptureOperations = Object.freeze({
  pathExists: fs.existsSync,
  realpath: fs.realpathSync,
  lstat: fs.lstatSync,
  mkdir(directory: string, mode: number) {
    fs.mkdirSync(directory, { mode });
  },
  open: fs.openSync,
  write: fs.writeSync,
  flush: fs.fsyncSync,
  close: fs.closeSync,
  rename: fs.renameSync,
  remove: fs.unlinkSync,
  read: fs.readFileSync,
  hash(bytes: Uint8Array) {
    return createHash("sha256").update(bytes).digest("hex");
  },
  sealReceipt: deepFreeze,
  serializeReceipt(receipt: object) {
    return Buffer.from(JSON.stringify(receipt), "utf8");
  },
});