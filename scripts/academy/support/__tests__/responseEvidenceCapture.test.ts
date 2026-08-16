import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it, jest } from "@jest/globals";

import { resolveRepositoryRootFromDirectory } from "../../../support/repositoryRoot";
import {
    type CaptureResponseEvidenceOptions,
    preserveResponseEvidence,
    type ResponseCaptureOutcome,
} from "../responseEvidenceCapture";

type Artifact = "response" | "receipt";

interface TestOperations {
  pathExists(filePath: string): boolean;
  realpath(filePath: string): string;
  lstat(filePath: string): fs.Stats;
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
  recordEvent(event: string): void;
}

interface OperationFixture {
  operations: TestOperations;
  events: string[];
  reached(label: string): number;
}

interface OperationOverrides {
  failAt?: string;
  zeroWriteAt?: string;
  shortWriteAt?: string;
  transformRead?: (artifact: Artifact, bytes: Uint8Array) => Uint8Array;
  existingAttemptDirectory?: boolean;
}

const preserveWithOperations = preserveResponseEvidence as unknown as (
  options: CaptureResponseEvidenceOptions,
  operations: TestOperations,
) => ResponseCaptureOutcome;

const createdRoots: string[] = [];

function externalRoot(): string {
  const root = fs.mkdtempSync(
    path.join(fs.realpathSync(os.tmpdir()), "response-evidence-capture-"),
  );
  createdRoots.push(root);
  return root;
}

function options(
  root = externalRoot(),
  overrides: Partial<CaptureResponseEvidenceOptions> = {},
): CaptureResponseEvidenceOptions {
  let call = 0;
  return {
    response: "Synthetic response: e\u0301 / é / 🔒 / no terminal newline",
    attemptId: "synthetic-attempt-001",
    authorityDocumentId: "synthetic-authority-001",
    externalCaptureRoot: root,
    accessOwner: "synthetic-reviewer",
    reviewPurpose: "synthetic preservation conformance",
    retainUntil: "2026-08-14T00:00:00.000Z",
    dispositionRule: "DELETE_WHEN_DUE",
    now: () => new Date(`2026-08-13T00:00:0${Math.min(call++, 9)}.000Z`),
    ...overrides,
  };
}

function artifactForPath(filePath: string): Artifact {
  return filePath.includes("receipt") ? "receipt" : "response";
}

function operationFixture(
  overrides: OperationOverrides = {},
): OperationFixture {
  const events: string[] = [];
  const counts = new Map<string, number>();
  const descriptors = new Map<number, Readonly<{
    artifact: Artifact;
    kind: "file" | "directory";
  }>>();
  let currentArtifact: Artifact = "response";
  let hashCall = 0;

  const reach = (label: string) => {
    events.push(label);
    counts.set(label, (counts.get(label) ?? 0) + 1);
    if (overrides.failAt === label && counts.get(label) === 1) {
      throw new Error(`Synthetic interruption at ${label}.`);
    }
  };

  const operations: TestOperations = {
    pathExists: fs.existsSync,
    realpath: fs.realpathSync,
    lstat: fs.lstatSync,
    mkdir(directory, mode) {
      reach("attempt:mkdir");
      if (overrides.existingAttemptDirectory) return;
      fs.mkdirSync(directory, { mode });
    },
    open(filePath, flags, mode) {
      if (flags === "wx") {
        currentArtifact = artifactForPath(filePath);
        reach(`${currentArtifact}:temporary-open-operation`);
        const descriptor = fs.openSync(filePath, flags, mode);
        descriptors.set(descriptor, { artifact: currentArtifact, kind: "file" });
        return descriptor;
      }
      reach(`${currentArtifact}:directory-open-operation`);
      const descriptor = fs.openSync(filePath, flags, mode);
      descriptors.set(descriptor, { artifact: currentArtifact, kind: "directory" });
      return descriptor;
    },
    write(descriptor, bytes, offset, length) {
      const state = descriptors.get(descriptor);
      if (!state) throw new Error("Unknown synthetic descriptor.");
      const label = `${state.artifact}:write-operation`;
      reach(label);
      if (overrides.zeroWriteAt === label) return 0;
      if (overrides.shortWriteAt === label) {
        return fs.writeSync(descriptor, bytes, offset, Math.max(1, length - 1));
      }
      return fs.writeSync(descriptor, bytes, offset, length);
    },
    flush(descriptor) {
      const state = descriptors.get(descriptor);
      if (!state) throw new Error("Unknown synthetic descriptor.");
      reach(`${state.artifact}:${state.kind === "file" ? "file" : "directory"}-flush-operation`);
      fs.fsyncSync(descriptor);
    },
    close(descriptor) {
      const state = descriptors.get(descriptor);
      if (!state) throw new Error("Unknown synthetic descriptor.");
      reach(`${state.artifact}:${state.kind === "file" ? "file" : "directory"}-close-operation`);
      fs.closeSync(descriptor);
      descriptors.delete(descriptor);
    },
    rename(sourcePath, destinationPath) {
      currentArtifact = artifactForPath(destinationPath);
      reach(`${currentArtifact}:rename-operation`);
      fs.renameSync(sourcePath, destinationPath);
    },
    remove(filePath) {
      reach(`${artifactForPath(filePath)}:remove-operation`);
      fs.unlinkSync(filePath);
    },
    read(filePath) {
      const artifact = artifactForPath(filePath);
      reach(`${artifact}:read-operation`);
      const bytes = fs.readFileSync(filePath);
      return overrides.transformRead?.(artifact, bytes) ?? bytes;
    },
    hash(bytes) {
      const labels = [
        "response:source-hash-operation",
        "response:persisted-hash-operation",
        "receipt:source-hash-operation",
        "receipt:persisted-hash-operation",
      ];
      const label = labels[hashCall++] ?? "response:reference-hash-operation";
      reach(label);
      return sha256(bytes);
    },
    sealReceipt(receipt) {
      reach("receipt:seal-operation");
      return deepFreeze(receipt);
    },
    serializeReceipt(receipt) {
      reach("receipt:serialize-operation");
      return Buffer.from(JSON.stringify(receipt), "utf8");
    },
    recordEvent(event) {
      events.push(`event:${event}`);
    },
  };

  return {
    operations,
    events,
    reached: (label) => counts.get(label) ?? 0,
  };
}

function preserve(
  captureOptions = options(),
  fixture = operationFixture(),
): Readonly<{ outcome: ResponseCaptureOutcome; fixture: OperationFixture }> {
  return {
    outcome: preserveWithOperations(captureOptions, fixture.operations),
    fixture,
  };
}

function attemptPath(captureOptions: CaptureResponseEvidenceOptions): string {
  return path.join(captureOptions.externalCaptureRoot, captureOptions.attemptId);
}

function responsePath(captureOptions: CaptureResponseEvidenceOptions): string {
  return path.join(attemptPath(captureOptions), "response.raw.utf8");
}

function receiptPath(captureOptions: CaptureResponseEvidenceOptions): string {
  return path.join(attemptPath(captureOptions), "response-capture-receipt.json");
}

afterEach(() => {
  for (const root of createdRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
  jest.restoreAllMocks();
});

describe("bounded response Evidence capture", () => {
  it("preserves exactly Buffer.from(response, utf8), byteLength, and source SHA-256", () => {
    const captureOptions = options();
    const { outcome, fixture } = preserve(captureOptions);
    expect(outcome.status).toBe("PRESERVATION_VERIFIED");
    if (outcome.status !== "PRESERVATION_VERIFIED") return;

    const expected = Buffer.from(captureOptions.response, "utf8");
    expect(fs.readFileSync(responsePath(captureOptions))).toEqual(expected);
    expect(outcome.capture.byteLength).toBe(expected.byteLength);
    expect(outcome.capture.sha256).toBe(sha256(expected));
    expect(outcome.capture.readBytes()).toEqual(Uint8Array.from(expected));
    expect(fixture.events.indexOf("event:source-hashed"))
      .toBeLessThan(fixture.events.indexOf("response:temporary-open-operation"));
    expect(expected[0]).not.toBe(0xef);
    expect(expected[expected.length - 1]).not.toBe(0x0a);
  });

  it.each([
    ["prefix", (bytes: Uint8Array) => Uint8Array.from([0, ...bytes])],
    ["suffix", (bytes: Uint8Array) => Uint8Array.from([...bytes, 0])],
    ["truncation", (bytes: Uint8Array) => bytes.slice(0, -1)],
    ["newline", (bytes: Uint8Array) => Uint8Array.from([...bytes, 0x0a])],
    ["BOM", (bytes: Uint8Array) => Uint8Array.from([0xef, 0xbb, 0xbf, ...bytes])],
    ["altered byte", (bytes: Uint8Array) => {
      const changed = Uint8Array.from(bytes);
      changed[Math.floor(changed.length / 2)] ^= 1;
      return changed;
    }],
    ["substitution", () => Buffer.from("substituted", "utf8")],
    ["normalisation", (bytes: Uint8Array) => Buffer.from(
      Buffer.from(bytes).toString("utf8").normalize("NFC"),
      "utf8",
    )],
  ] satisfies readonly (readonly [
    string,
    (bytes: Uint8Array) => Uint8Array,
  ])[])("refuses %s of independently reread response bytes", (_name, transform) => {
    const fixture = operationFixture({
      transformRead: (artifact, bytes) => artifact === "response"
        ? transform(bytes)
        : bytes,
    });
    expect(preserve(options(), fixture).outcome).toEqual({
      status: "PRESERVATION_INCOMPLETE",
      attemptId: "synthetic-attempt-001",
    });
    expect(fixture.reached("receipt:temporary-open-operation")).toBe(0);
  });

  it("keeps canonically composed and decomposed Unicode byte-distinct", () => {
    const decomposedOptions = options(externalRoot(), {
      response: "e\u0301",
      attemptId: "decomposed",
    });
    const composedOptions = options(externalRoot(), {
      response: "é",
      attemptId: "composed",
    });
    expect(preserve(decomposedOptions).outcome.status).toBe("PRESERVATION_VERIFIED");
    expect(preserve(composedOptions).outcome.status).toBe("PRESERVATION_VERIFIED");
    const decomposed = fs.readFileSync(responsePath(decomposedOptions));
    const composed = fs.readFileSync(responsePath(composedOptions));
    expect(decomposed).toEqual(Buffer.from("e\u0301", "utf8"));
    expect(composed).toEqual(Buffer.from("é", "utf8"));
    expect(decomposed).not.toEqual(composed);
  });

  it.each([
    "response:source-hash-operation",
    "response:temporary-open-operation",
    "response:write-operation",
    "response:file-flush-operation",
    "response:file-close-operation",
    "response:rename-operation",
    "response:directory-open-operation",
    "response:directory-flush-operation",
    "response:directory-close-operation",
    "response:read-operation",
    "response:persisted-hash-operation",
    "receipt:seal-operation",
    "receipt:serialize-operation",
    "receipt:source-hash-operation",
    "receipt:temporary-open-operation",
    "receipt:write-operation",
    "receipt:file-flush-operation",
    "receipt:file-close-operation",
    "receipt:rename-operation",
    "receipt:directory-open-operation",
    "receipt:directory-flush-operation",
    "receipt:directory-close-operation",
    "receipt:read-operation",
    "receipt:persisted-hash-operation",
  ])("fails closed without retry at %s", (failure) => {
    const fixture = operationFixture({ failAt: failure });
    expect(preserve(options(), fixture).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");
    expect(fixture.reached(failure)).toBe(
      failure.endsWith(":file-close-operation") ? 2 : 1,
    );
  });

  it.each(["response", "receipt"] as const)(
    "refuses zero-progress and completes a genuine short %s write",
    (artifact) => {
      const zeroLabel = `${artifact}:write-operation`;
      const zeroFixture = operationFixture({ zeroWriteAt: zeroLabel });
      expect(preserve(options(), zeroFixture).outcome.status)
        .toBe("PRESERVATION_INCOMPLETE");
      expect(zeroFixture.reached(zeroLabel)).toBe(1);

      const shortFixture = operationFixture({ shortWriteAt: zeroLabel });
      expect(preserve(options(), shortFixture).outcome.status)
        .toBe("PRESERVATION_VERIFIED");
      expect(shortFixture.reached(zeroLabel)).toBeGreaterThan(1);
    },
  );

  it("uses exact response and receipt publication order", () => {
    const { outcome, fixture } = preserve();
    expect(outcome.status).toBe("PRESERVATION_VERIFIED");
    const operationEvents = fixture.events.filter((event) =>
      event.endsWith("-operation"));
    const publication = (artifact: Artifact) => [
      `${artifact}:temporary-open-operation`,
      `${artifact}:write-operation`,
      `${artifact}:file-flush-operation`,
      `${artifact}:file-close-operation`,
      `${artifact}:rename-operation`,
      `${artifact}:directory-open-operation`,
      `${artifact}:directory-flush-operation`,
      `${artifact}:directory-close-operation`,
      `${artifact}:read-operation`,
    ];
    expect(operationEvents).toEqual([
      "response:source-hash-operation",
      ...publication("response"),
      "response:persisted-hash-operation",
      "receipt:seal-operation",
      "receipt:serialize-operation",
      "receipt:source-hash-operation",
      ...publication("receipt"),
      "receipt:persisted-hash-operation",
    ]);
  });

  it.each([
    "attempt",
    "response-final",
    "response-temporary",
    "receipt-final",
    "receipt-temporary",
  ])("refuses an existing %s destination without modification", (conflict) => {
    const captureOptions = options();
    const attempt = attemptPath(captureOptions);
    fs.mkdirSync(attempt, { mode: 0o700 });
    const conflictPaths: Record<string, string> = {
      "response-final": responsePath(captureOptions),
      "response-temporary": `${responsePath(captureOptions)}.tmp`,
      "receipt-final": receiptPath(captureOptions),
      "receipt-temporary": `${receiptPath(captureOptions)}.tmp`,
    };
    const conflictPath = conflictPaths[conflict];
    if (conflictPath) fs.writeFileSync(conflictPath, "existing");
    const fixture = operationFixture({
      existingAttemptDirectory: conflict !== "attempt",
    });

    expect(preserve(captureOptions, fixture).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");
    if (conflictPath) expect(fs.readFileSync(conflictPath, "utf8")).toBe("existing");
  });

  it("refuses repository and repository-descendant roots before attempt creation", () => {
    const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
    for (const root of [repositoryRoot, path.join(repositoryRoot, "scripts")]) {
      const fixture = operationFixture();
      expect(preserve(options(root), fixture).outcome.status)
        .toBe("PRESERVATION_INCOMPLETE");
      expect(fixture.reached("attempt:mkdir")).toBe(0);
    }
  });

  it.each(["..", ".", "nested/attempt", "nested\\attempt", "/absolute"])(
    "refuses traversal or non-segment attempt identity %s",
    (attemptId) => {
      const fixture = operationFixture();
      expect(preserve(options(externalRoot(), { attemptId }), fixture).outcome.status)
        .toBe("PRESERVATION_INCOMPLETE");
      expect(fixture.reached("attempt:mkdir")).toBe(0);
      expect(fixture.events).not.toContain("event:source-encoded");
    },
  );

  it("refuses symlinked roots, ancestors, and attempt destinations", () => {
    const realRoot = externalRoot();
    const linkedRoot = `${realRoot}-link`;
    fs.symlinkSync(realRoot, linkedRoot, "dir");
    createdRoots.push(linkedRoot);
    expect(preserve(options(linkedRoot)).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");

    const ancestorRoot = externalRoot();
    const target = externalRoot();
    const linkedAncestor = path.join(ancestorRoot, "linked");
    fs.symlinkSync(target, linkedAncestor, "dir");
    expect(preserve(options(linkedAncestor)).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");

    const attemptRoot = externalRoot();
    const outside = externalRoot();
    fs.symlinkSync(outside, path.join(attemptRoot, "synthetic-attempt-001"), "dir");
    expect(preserve(options(attemptRoot)).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");
    expect(fs.readdirSync(outside)).toEqual([]);
  });

  it("seals a fixed content-free receipt and verifies it independently", () => {
    const captureOptions = options();
    const { outcome } = preserve(captureOptions);
    expect(outcome.status).toBe("PRESERVATION_VERIFIED");
    const receiptBytes = fs.readFileSync(receiptPath(captureOptions));
    const receipt = JSON.parse(receiptBytes.toString("utf8"));
    expect(Object.keys(receipt)).toEqual([
      "receiptVersion", "attemptId", "authorityDocumentId", "storageContract",
      "encoding", "sourceByteLength", "persistedByteLength", "sourceSha256",
      "persistedSha256", "verification", "captureStartedAt",
      "responseWriteConfirmedAt", "responseRereadAt", "responseVerifiedAt",
      "receiptCreatedAt", "receiptSealedAt", "accessOwner", "reviewPurpose",
      "retainUntil", "dispositionRule", "dispositionState", "delivered",
      "semanticInspectionOrTransformation", "repositoryPublished",
      "memoryWritten", "learningWritten", "contributionAccepted",
    ]);
    expect(receipt.sourceByteLength).toBe(Buffer.byteLength(captureOptions.response));
    expect(receipt.sourceSha256).toBe(sha256(Buffer.from(captureOptions.response)));
    expect(receipt.verification).toBe("EXACT_BYTE_MATCH");
    expect(receipt.delivered).toBe(false);
    expect(receipt.repositoryPublished).toBe(false);

    const serialized = receiptBytes.toString("utf8");
    expect(serialized).not.toContain(captureOptions.response);
    expect(serialized).not.toContain(Buffer.from(captureOptions.response).toString("base64"));
    expect(serialized).not.toContain(Buffer.from(captureOptions.response).toString("hex"));
    expect(serialized).not.toContain(JSON.stringify(captureOptions.response));
    expect(serialized).not.toContain("checkerResult");
    expect(serialized).not.toContain("programmeFinding");
  });

  it("refuses independently reread receipt corruption", () => {
    const fixture = operationFixture({
      transformRead: (artifact, bytes) => artifact === "receipt"
        ? bytes.slice(0, -1)
        : bytes,
    });
    expect(preserve(options(), fixture).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");
  });

  it("returns exact immutable outcomes and an opaque read-only reference", () => {
    const captureOptions = options();
    const { outcome } = preserve(captureOptions);
    expect(Object.keys(outcome)).toEqual(["status", "capture"]);
    expect(Object.isFrozen(outcome)).toBe(true);
    if (outcome.status !== "PRESERVATION_VERIFIED") return;
    expect(Object.keys(outcome.capture)).toEqual([
      "attemptId", "byteLength", "sha256", "readBytes",
    ]);
    expect(Object.isFrozen(outcome.capture)).toBe(true);
    for (const denied of [
      "path", "root", "descriptor", "write", "append", "rename", "delete",
      "remove", "unlink", "truncate", "chmod", "transfer", "preview",
      "delivery", "retry", "feedback",
    ]) {
      expect(outcome.capture).not.toHaveProperty(denied);
    }

    const first = outcome.capture.readBytes();
    first[0] ^= 1;
    const second = outcome.capture.readBytes();
    expect(second).toEqual(Uint8Array.from(Buffer.from(captureOptions.response)));
    expect(second).not.toBe(first);
    expect(fs.readFileSync(responsePath(captureOptions)))
      .toEqual(Buffer.from(captureOptions.response));

    const failure = preserve(options(externalRoot(), { attemptId: ".." })).outcome;
    expect(Object.keys(failure)).toEqual(["status", "attemptId"]);
    expect(Object.isFrozen(failure)).toBe(true);
    expect(failure).not.toHaveProperty("path");
    expect(failure).not.toHaveProperty("response");
    expect(failure).not.toHaveProperty("error");
  });

  it("leaves verified files exact after a synthetic checker exception", () => {
    const captureOptions = options();
    const { outcome } = preserve(captureOptions);
    expect(outcome.status).toBe("PRESERVATION_VERIFIED");
    expect(() => {
      if (outcome.status === "PRESERVATION_VERIFIED") outcome.capture.readBytes();
      throw new Error("synthetic checker failure");
    }).toThrow("synthetic checker failure");
    expect(fs.readFileSync(responsePath(captureOptions)))
      .toEqual(Buffer.from(captureOptions.response));
    expect(() => JSON.parse(fs.readFileSync(receiptPath(captureOptions), "utf8")))
      .not.toThrow();
  });

  it("emits no response content to output, results, errors, receipt, or repository", () => {
    const stdout = jest.spyOn(process.stdout, "write").mockImplementation(() => true);
    const stderr = jest.spyOn(process.stderr, "write").mockImplementation(() => true);
    const consoleSpies = ["log", "error", "warn", "info", "debug"].map((method) =>
      jest.spyOn(console, method as "log").mockImplementation(() => undefined));
    const captureOptions = options();
    const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
    const { outcome } = preserve(captureOptions);

    expect(stdout).not.toHaveBeenCalled();
    expect(stderr).not.toHaveBeenCalled();
    for (const spy of consoleSpies) expect(spy).not.toHaveBeenCalled();
    expect(JSON.stringify(outcome)).not.toContain(captureOptions.response);
    expect(fs.readFileSync(receiptPath(captureOptions), "utf8"))
      .not.toContain(captureOptions.response);
    expect(responsePath(captureOptions).startsWith(`${repositoryRoot}${path.sep}`))
      .toBe(false);
  });

  it.each<[key: keyof CaptureResponseEvidenceOptions, value: unknown]>([
    ["accessOwner", ""],
    ["reviewPurpose", ""],
    ["authorityDocumentId", ""],
    ["retainUntil", ""],
    ["retainUntil", "2026-08-12T00:00:00.000Z"],
    ["retainUntil", "2026-08-14"],
    ["dispositionRule", "UNSUPPORTED"],
    ["externalCaptureRoot", ""],
    ["now", undefined],
  ])("refuses invalid pre-authorised input %s before encoding or write", (key, value) => {
    const fixture = operationFixture();
    const captureOptions = options();
    const invalid = { ...captureOptions, [key]: value } as CaptureResponseEvidenceOptions;
    expect(preserve(invalid, fixture).outcome.status)
      .toBe("PRESERVATION_INCOMPLETE");
    expect(fixture.events).not.toContain("event:source-encoded");
    expect(fixture.reached("attempt:mkdir")).toBe(0);
  });

  it("creates no checker, retry, second-turn, feedback, contribution, or delivery permission", () => {
    const successFixture = operationFixture();
    const successEvents: string[] = ["synthetic-invocation-returned"];
    successFixture.operations.recordEvent = (event) => successEvents.push(event);
    const success = preserve(options(), successFixture).outcome;
    if (success.status === "PRESERVATION_VERIFIED") {
      successEvents.push("synthetic-checker-started");
    }
    expect(successEvents.indexOf("preservation-verified"))
      .toBeLessThan(successEvents.indexOf("synthetic-checker-started"));
    expect(success).not.toHaveProperty("retry");
    expect(success).not.toHaveProperty("secondTurn");
    expect(success).not.toHaveProperty("feedback");
    expect(success).not.toHaveProperty("contribution");
    expect(success).not.toHaveProperty("delivery");

    const failureEvents: string[] = [];
    const failureFixture = operationFixture({ failAt: "response:write-operation" });
    const failure = preserve(options(), failureFixture).outcome;
    if (failure.status === "PRESERVATION_VERIFIED") failureEvents.push("checker");
    expect(failure.status).toBe("PRESERVATION_INCOMPLETE");
    expect(failureEvents).toEqual([]);
    expect(failure).not.toHaveProperty("retry");
    expect(failure).not.toHaveProperty("delivery");
  });

  it("has a closed mechanical dependency and capability surface", () => {
    const sourcePath = path.resolve(__dirname, "../responseEvidenceCapture.ts");
    const source = fs.readFileSync(sourcePath, "utf8");
    const imports = source.match(/^import .*;$/gm) ?? [];
    expect(imports).toEqual([
      'import { createHash } from "node:crypto";',
      'import fs from "node:fs";',
      'import path from "node:path";',
      'import { resolveRepositoryRootFromDirectory } from "../../support/repositoryRoot";',
    ]);
    expect(source).not.toMatch(/console\.|process\.(stdout|stderr)/);
    expect(source).not.toMatch(/AndyDigitalColleague|provider|repository service|retrieval|prompt|secondTurn/);
    expect(source).not.toMatch(/from ["'].*multi-evidence-case-001/);
    expect(source).not.toMatch(/clipboard|telemetry|analytics|network|axios|fetch\(/);
    expect(source).not.toContain("scripts/academy/run-academy.ts");
  });
});

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
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