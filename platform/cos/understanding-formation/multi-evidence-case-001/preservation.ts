import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { resolveRepositoryRootFromDirectory } from "../../../../scripts/support/repositoryRoot";

export const CASE_001_CANONICAL_JSON_VERSION =
  "MEU-CASE-001-CANONICAL-JSON-1";
export const CASE_001_PRESERVATION_RECEIPT_VERSION =
  "MEU-CASE-001-PRESERVATION-RECEIPT-1";
export const CASE_001_PACKAGE_CONTRACT_VERSION =
  "Case001CampaignEvidence-1";
export const CASE_001_PRESERVATION_ROOT =
  "docs/formation/execution-evidence/MEU-CASE-001";

export type PreservationStatus =
  | "PRESERVATION_VERIFIED"
  | "PRESERVATION_INCOMPLETE";

export interface EvidencePreservationTransport {
  publish(relativePath: string, bytes: Uint8Array): void;
  read(relativePath: string): Uint8Array;
}

export interface PreservationReceipt {
  receiptId: string;
  receiptVersion: typeof CASE_001_PRESERVATION_RECEIPT_VERSION;
  attemptId: string;
  campaignId: "MEU-CASE-001";
  authorityRelativePath: string;
  packageRelativePath: string;
  receiptRelativePath: string;
  serializerVersion: typeof CASE_001_CANONICAL_JSON_VERSION;
  packageContractVersion: typeof CASE_001_PACKAGE_CONTRACT_VERSION;
  storageContract: "REPOSITORY-ATOMIC-FILE-1";
  sourceByteLength: number;
  persistedByteLength: number;
  sourceSha256: string;
  persistedSha256: string;
  verification: "EXACT_BYTE_MATCH";
  writeStartedAt: string;
  writeConfirmedAt: string;
  rereadAt: string;
  verifiedAt: string;
  receiptSealedAt: string;
  stdoutAuthoritative: false;
  semanticInspectionOrTransformation: false;
}

export interface PreservationEvent {
  sequence: number;
  kind:
    | "preservation-started"
    | "source-identity-established"
    | "package-write-confirmed"
    | "package-reread"
    | "package-verified"
    | "receipt-created"
    | "receipt-write-confirmed"
    | "receipt-reread"
    | "receipt-verified"
    | "preservation-sealed";
}

export interface SealedPreservationRecord {
  sealed: true;
  events: readonly Readonly<PreservationEvent>[];
}

type PreservationOutcome = Readonly<
  | {
      status: "PRESERVATION_VERIFIED";
      attemptId: string;
      packageRelativePath: string;
      receiptRelativePath: string;
      packageSha256: string;
      receiptSha256: string;
      receipt: Readonly<PreservationReceipt>;
      preservationRecord: Readonly<SealedPreservationRecord>;
    }
  | {
      status: "PRESERVATION_INCOMPLETE";
      attemptId: string;
    }
>;

export interface PreserveEvidenceOptions {
  attemptId: string;
  authorityRelativePath: string;
  immutablePackage: unknown;
  transport: EvidencePreservationTransport;
  now?: () => Date;
  integrityOperations?: PreservationIntegrityOperations;
}

export interface PreservationIntegrityOperations {
  serialize(value: unknown): Uint8Array;
  hash(bytes: Uint8Array): string;
  sealReceipt(receipt: PreservationReceipt): Readonly<PreservationReceipt>;
  sealRecord(record: SealedPreservationRecord): Readonly<SealedPreservationRecord>;
}

export interface RepositoryEvidenceOperations {
  mkdir(directory: string): void;
  pathExists(filePath: string): boolean;
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
  isSymbolicLink(filePath: string): boolean;
}

export function canonicalJsonBytes(value: unknown): Uint8Array {
  return Buffer.from(canonicalJson(value, new WeakSet<object>()), "utf8");
}

export function preserveCase001Evidence(
  options: PreserveEvidenceOptions,
): PreservationStatus {
  return preserveCase001EvidenceWithIntegrity(options).status;
}

function preserveCase001EvidenceWithIntegrity(
  options: PreserveEvidenceOptions,
): PreservationOutcome {
  const { attemptId } = options;
  const preservationEvents: PreservationEvent[] = [];
  const record = (kind: PreservationEvent["kind"]) => {
    preservationEvents.push({ sequence: preservationEvents.length + 1, kind });
  };
  try {
    assertAttemptId(attemptId);
    assertRepositoryRelativePath(options.authorityRelativePath);
    assertDeeplyFrozen(options.immutablePackage);

    const packageRelativePath = packagePath(attemptId);
    const receiptRelativePath = receiptPath(attemptId);
    const now = options.now ?? (() => new Date());
    const integrity = options.integrityOperations ?? preservationIntegrityOperations;
    record("preservation-started");
    const writeStartedAt = utc(now());
    const sourceBytes = integrity.serialize(options.immutablePackage);
    const sourceSha256 = integrity.hash(sourceBytes);
    record("source-identity-established");

    options.transport.publish(packageRelativePath, sourceBytes);
    record("package-write-confirmed");
    const writeConfirmedAt = utc(now());
    const persistedBytes = options.transport.read(packageRelativePath);
    record("package-reread");
    const rereadAt = utc(now());
    const persistedSha256 = integrity.hash(persistedBytes);
    requireExactBytes(sourceBytes, persistedBytes);
    if (persistedSha256 !== sourceSha256) {
      throw new Error("Persisted package hash mismatch.");
    }
    record("package-verified");
    const verifiedAt = utc(now());
    const receiptSealedAt = utc(now());
    const receipt = integrity.sealReceipt({
      receiptId: `${attemptId}:preservation-receipt`,
      receiptVersion: CASE_001_PRESERVATION_RECEIPT_VERSION,
      attemptId,
      campaignId: "MEU-CASE-001",
      authorityRelativePath: options.authorityRelativePath,
      packageRelativePath,
      receiptRelativePath,
      serializerVersion: CASE_001_CANONICAL_JSON_VERSION,
      packageContractVersion: CASE_001_PACKAGE_CONTRACT_VERSION,
      storageContract: "REPOSITORY-ATOMIC-FILE-1",
      sourceByteLength: sourceBytes.byteLength,
      persistedByteLength: persistedBytes.byteLength,
      sourceSha256,
      persistedSha256,
      verification: "EXACT_BYTE_MATCH",
      writeStartedAt,
      writeConfirmedAt,
      rereadAt,
      verifiedAt,
      receiptSealedAt,
      stdoutAuthoritative: false,
      semanticInspectionOrTransformation: false,
    });
    record("receipt-created");
    const receiptBytes = integrity.serialize(receipt);
    const receiptSha256 = integrity.hash(receiptBytes);

    options.transport.publish(receiptRelativePath, receiptBytes);
    record("receipt-write-confirmed");
    const persistedReceiptBytes = options.transport.read(receiptRelativePath);
    record("receipt-reread");
    requireExactBytes(receiptBytes, persistedReceiptBytes);
    if (integrity.hash(persistedReceiptBytes) !== receiptSha256) {
      throw new Error("Persisted receipt hash mismatch.");
    }
    record("receipt-verified");
    record("preservation-sealed");
    const preservationRecord = integrity.sealRecord({
      sealed: true,
      events: preservationEvents.map((event) => ({ ...event })),
    });

    return deepFreeze({
      status: "PRESERVATION_VERIFIED" as const,
      attemptId,
      packageRelativePath,
      receiptRelativePath,
      packageSha256: sourceSha256,
      receiptSha256,
      receipt,
      preservationRecord,
    });
  } catch {
    return Object.freeze({
      status: "PRESERVATION_INCOMPLETE" as const,
      attemptId,
    });
  }
}

const preservationIntegrityOperations: PreservationIntegrityOperations =
  Object.freeze({
    serialize: canonicalJsonBytes,
    hash: sha256,
    sealReceipt: deepFreeze,
    sealRecord: deepFreeze,
  });

export function createRepositoryEvidenceTransport(
  operations: RepositoryEvidenceOperations = nodeRepositoryEvidenceOperations,
): EvidencePreservationTransport {
  const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);

  return Object.freeze({
    publish(relativePath: string, bytes: Uint8Array) {
      const finalPath = governedAbsolutePath(repositoryRoot, relativePath);
      const directory = path.dirname(finalPath);
      operations.mkdir(directory);
      refuseSymlinkPath(repositoryRoot, directory, operations);
      if (operations.pathExists(finalPath)) {
        throw new Error("Existing evidence destination is immutable.");
      }

      const temporaryPath = `${finalPath}.tmp`;
      let descriptor: number | undefined;
      let temporaryCreated = false;
      try {
        descriptor = operations.open(temporaryPath, "wx", 0o600);
        temporaryCreated = true;
        writeAll(descriptor, bytes, operations);
        operations.flush(descriptor);
        operations.close(descriptor);
        descriptor = undefined;
        operations.rename(temporaryPath, finalPath);
        temporaryCreated = false;
        const directoryDescriptor = operations.open(directory, "r");
        try {
          operations.flush(directoryDescriptor);
        } finally {
          operations.close(directoryDescriptor);
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
    },
    read(relativePath: string) {
      return operations.read(governedAbsolutePath(repositoryRoot, relativePath));
    },
  });
}

const nodeRepositoryEvidenceOperations: RepositoryEvidenceOperations =
  Object.freeze({
    mkdir(directory: string) {
      fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
    },
    pathExists: fs.existsSync,
    open: fs.openSync,
    write: fs.writeSync,
    flush: fs.fsyncSync,
    close: fs.closeSync,
    rename: fs.renameSync,
    remove: fs.unlinkSync,
    read: fs.readFileSync,
    isSymbolicLink(filePath: string) {
      return fs.lstatSync(filePath).isSymbolicLink();
    },
  });

function canonicalJson(value: unknown, ancestors: WeakSet<object>): string {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Non-finite numbers are unsupported.");
    return JSON.stringify(value);
  }
  if (typeof value !== "object") {
    throw new Error(`Unsupported canonical JSON value: ${typeof value}.`);
  }
  if (ancestors.has(value)) throw new Error("Cyclic values are unsupported.");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) {
          throw new Error("Sparse arrays are unsupported.");
        }
      }
      return `[${value.map((item) => canonicalJson(item, ancestors)).join(",")}]`;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new Error("Unsupported object prototype.");
    }
    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key === "symbol")) {
      throw new Error("Symbol keys are unsupported.");
    }
    const record = value as Record<string, unknown>;
    const keys = (ownKeys as string[]).sort(compareUnicodeCodePoints);
    return `{${keys.map((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(record, key);
      if (!descriptor?.enumerable || !("value" in descriptor)) {
        throw new Error("Only enumerable data properties are supported.");
      }
      return `${JSON.stringify(key)}:${canonicalJson(descriptor.value, ancestors)}`;
    }).join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

function compareUnicodeCodePoints(left: string, right: string): number {
  const leftPoints = Array.from(left, (character) => character.codePointAt(0) ?? 0);
  const rightPoints = Array.from(right, (character) => character.codePointAt(0) ?? 0);
  for (let index = 0; index < Math.min(leftPoints.length, rightPoints.length); index += 1) {
    if (leftPoints[index] !== rightPoints[index]) {
      return leftPoints[index] - rightPoints[index];
    }
  }
  return leftPoints.length - rightPoints.length;
}

function packagePath(attemptId: string): string {
  return `${CASE_001_PRESERVATION_ROOT}/${attemptId}/campaign-package.canonical.json`;
}

function receiptPath(attemptId: string): string {
  return `${CASE_001_PRESERVATION_ROOT}/${attemptId}/preservation-receipt.canonical.json`;
}

function assertAttemptId(attemptId: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(attemptId) ||
      attemptId === "." || attemptId === "..") {
    throw new Error("Invalid attempt identity.");
  }
}

function assertRepositoryRelativePath(relativePath: string): void {
  if (path.isAbsolute(relativePath) || relativePath.split(/[\\/]/).includes("..")) {
    throw new Error("Path must remain repository-relative.");
  }
}

function governedAbsolutePath(repositoryRoot: string, relativePath: string): string {
  assertRepositoryRelativePath(relativePath);
  if (!relativePath.startsWith(`${CASE_001_PRESERVATION_ROOT}/`)) {
    throw new Error("Destination is outside the Case 001 preservation root.");
  }
  const absolutePath = path.resolve(repositoryRoot, relativePath);
  if (!absolutePath.startsWith(`${repositoryRoot}${path.sep}`)) {
    throw new Error("Destination escaped the repository root.");
  }
  return absolutePath;
}

function refuseSymlinkPath(
  repositoryRoot: string,
  directory: string,
  operations: RepositoryEvidenceOperations,
): void {
  let current = directory;
  while (current !== repositoryRoot) {
    if (operations.isSymbolicLink(current)) {
      throw new Error("Symlinked evidence destination is prohibited.");
    }
    current = path.dirname(current);
    if (!current.startsWith(repositoryRoot)) {
      throw new Error("Evidence destination escaped the repository root.");
    }
  }
}

function writeAll(
  descriptor: number,
  bytes: Uint8Array,
  operations: RepositoryEvidenceOperations,
): void {
  let offset = 0;
  while (offset < bytes.byteLength) {
    const written = operations.write(
      descriptor,
      bytes,
      offset,
      bytes.byteLength - offset,
    );
    if (written <= 0) throw new Error("Short evidence write.");
    offset += written;
  }
}

function assertDeeplyFrozen(value: unknown): void {
  if (!value || typeof value !== "object") return;
  if (!Object.isFrozen(value)) throw new Error("Evidence package is mutable.");
  for (const key of Reflect.ownKeys(value)) {
    if (Array.isArray(value) && key === "length") continue;
    if (typeof key === "symbol") throw new Error("Symbol keys are unsupported.");
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor?.enumerable || !("value" in descriptor)) {
      throw new Error("Only enumerable data properties are supported.");
    }
    assertDeeplyFrozen(descriptor.value);
  }
}

function requireExactBytes(expected: Uint8Array, observed: Uint8Array): void {
  if (expected.byteLength !== observed.byteLength) {
    throw new Error("Persisted byte length mismatch.");
  }
  for (let index = 0; index < expected.byteLength; index += 1) {
    if (expected[index] !== observed[index]) {
      throw new Error("Persisted bytes differ from source bytes.");
    }
  }
}

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function utc(value: Date): string {
  if (Number.isNaN(value.getTime())) throw new Error("Invalid preservation time.");
  return value.toISOString();
}

function deepFreeze<T>(value: T): Readonly<T> {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value as Record<string, unknown>)) {
    deepFreeze(child);
  }
  return value;
}