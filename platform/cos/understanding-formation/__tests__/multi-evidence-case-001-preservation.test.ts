import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "@jest/globals";

import { resolveRepositoryRootFromDirectory } from "../../../../scripts/support/repositoryRoot";
import {
    preserveCase001CampaignPackage,
    type Case001CampaignEvidence,
} from "../multi-evidence-case-001/experiment";
import {
    CASE_001_CANONICAL_JSON_VERSION,
    CASE_001_PRESERVATION_ROOT,
    canonicalJsonBytes,
    createRepositoryEvidenceTransport,
    preserveCase001Evidence,
    type EvidencePreservationTransport,
    type PreservationIntegrityOperations,
    type RepositoryEvidenceOperations,
} from "../multi-evidence-case-001/preservation";

const AUTHORITY_PATH =
  "docs/formation/HH0000_MULTI_EVIDENCE_UNDERSTANDING_CASE_001_EXECUTION_EVIDENCE_PRESERVATION_ARCHITECTURE_COMBINED_AUTHORITY_REVIEW.md";

function syntheticPackage(label = "source") {
  return deepFreeze({
    mechanical: { status: "COMPLETED", label },
    values: [true, null, 7, "evidence"],
    nested: { z: "last", a: "first" },
  });
}

function memoryTransport(
  transformRead: (relativePath: string, bytes: Uint8Array) => Uint8Array =
    (_relativePath, bytes) => bytes,
  failPublish: boolean | ((relativePath: string) => boolean) = false,
): EvidencePreservationTransport & { files: Map<string, Uint8Array> } {
  const files = new Map<string, Uint8Array>();
  return {
    files,
    publish(relativePath, bytes) {
      if (failPublish === true ||
          (typeof failPublish === "function" && failPublish(relativePath))) {
        throw new Error("Synthetic write failure.");
      }
      if (files.has(relativePath)) throw new Error("Overwrite refused.");
      files.set(relativePath, Uint8Array.from(bytes));
    },
    read(relativePath) {
      const bytes = files.get(relativePath);
      if (!bytes) throw new Error("Synthetic file missing.");
      return transformRead(relativePath, Uint8Array.from(bytes));
    },
  };
}

function preserve(
  transport: EvidencePreservationTransport,
  immutablePackage: unknown = syntheticPackage(),
  attemptId = "synthetic-attempt-001",
  integrityOperations?: PreservationIntegrityOperations,
) {
  const times = [
    "2026-08-10T17:00:00.000Z",
    "2026-08-10T17:00:01.000Z",
    "2026-08-10T17:00:02.000Z",
    "2026-08-10T17:00:03.000Z",
    "2026-08-10T17:00:04.000Z",
  ];
  let index = 0;
  return preserveCase001Evidence({
    attemptId,
    authorityRelativePath: AUTHORITY_PATH,
    immutablePackage,
    transport,
    now: () => new Date(times[index++] ?? times[times.length - 1]),
    integrityOperations,
  });
}

function syntheticIntegrityOperations(
  overrides: Partial<PreservationIntegrityOperations> = {},
): PreservationIntegrityOperations {
  return {
    serialize: canonicalJsonBytes,
    hash: sha256,
    sealReceipt: deepFreeze,
    sealRecord: deepFreeze,
    ...overrides,
  };
}

type PublicationArtifact = "package" | "receipt";
type PublicationBoundary =
  | "temporary-open"
  | "write"
  | "file-flush"
  | "file-close"
  | "rename"
  | "directory-open"
  | "directory-flush"
  | "directory-close"
  | "read";

function repositoryOperations(
  interrupt?: Readonly<{
    artifact: PublicationArtifact;
    boundary: PublicationBoundary;
    shortWrite?: boolean;
  }>,
): Readonly<{
  operations: RepositoryEvidenceOperations;
  events: string[];
  interruptionCount: () => number;
}> {
  const events: string[] = [];
  const descriptors = new Map<number, Readonly<{
    artifact: PublicationArtifact;
    kind: "file" | "directory";
  }>>();
  let currentArtifact: PublicationArtifact = "package";
  let interruptions = 0;

  const artifactForPath = (filePath: string): PublicationArtifact =>
    filePath.includes("preservation-receipt") ? "receipt" : "package";
  const reach = (artifact: PublicationArtifact, boundary: PublicationBoundary) => {
    events.push(`${artifact}:${boundary}`);
    if (interruptions === 0 && interrupt?.artifact === artifact &&
        interrupt.boundary === boundary) {
      interruptions += 1;
      if (!interrupt.shortWrite) throw new Error(`Interrupted at ${boundary}.`);
      return true;
    }
    return false;
  };

  return {
    events,
    interruptionCount: () => interruptions,
    operations: {
      mkdir(directory) {
        fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
      },
      pathExists: fs.existsSync,
      open(filePath, flags, mode) {
        if (flags === "wx") {
          currentArtifact = artifactForPath(filePath);
          reach(currentArtifact, "temporary-open");
          const descriptor = fs.openSync(filePath, flags, mode);
          descriptors.set(descriptor, { artifact: currentArtifact, kind: "file" });
          return descriptor;
        }
        reach(currentArtifact, "directory-open");
        const descriptor = fs.openSync(filePath, flags, mode);
        descriptors.set(descriptor, { artifact: currentArtifact, kind: "directory" });
        return descriptor;
      },
      write(descriptor, bytes, offset, length) {
        const descriptorState = descriptors.get(descriptor);
        if (!descriptorState) throw new Error("Unknown synthetic descriptor.");
        if (reach(descriptorState.artifact, "write")) return 0;
        return fs.writeSync(descriptor, bytes, offset, length);
      },
      flush(descriptor) {
        const descriptorState = descriptors.get(descriptor);
        if (!descriptorState) throw new Error("Unknown synthetic descriptor.");
        reach(
          descriptorState.artifact,
          descriptorState.kind === "file" ? "file-flush" : "directory-flush",
        );
        fs.fsyncSync(descriptor);
      },
      close(descriptor) {
        const descriptorState = descriptors.get(descriptor);
        if (!descriptorState) throw new Error("Unknown synthetic descriptor.");
        reach(
          descriptorState.artifact,
          descriptorState.kind === "file" ? "file-close" : "directory-close",
        );
        fs.closeSync(descriptor);
        descriptors.delete(descriptor);
      },
      rename(sourcePath, destinationPath) {
        currentArtifact = artifactForPath(destinationPath);
        reach(currentArtifact, "rename");
        fs.renameSync(sourcePath, destinationPath);
      },
      remove: fs.unlinkSync,
      read(filePath) {
        const artifact = artifactForPath(filePath);
        reach(artifact, "read");
        return fs.readFileSync(filePath);
      },
      isSymbolicLink(filePath) {
        return fs.lstatSync(filePath).isSymbolicLink();
      },
    },
  };
}

describe("Case 001 C23/C24 evidence preservation", () => {
  it("uses code-point key order and preserves array, Unicode, and terminal bytes exactly", () => {
    const value = deepFreeze({
      "\u{10000}": "astral",
      "\uE000": "private-use",
      text: "e\u0301",
      array: [3, 2, 1],
    });
    const bytes = canonicalJsonBytes(value);

    expect(Buffer.from(bytes).toString("utf8")).toBe(
      '{"array":[3,2,1],"text":"é","":"private-use","𐀀":"astral"}',
    );
    expect(bytes[0]).toBe("{".charCodeAt(0));
    expect(bytes[bytes.length - 1]).toBe("}".charCodeAt(0));
  });

  it("canonically preserves one immutable synthetic package and verifies its sealed receipt", () => {
    const transport = memoryTransport();
    const immutablePackage = syntheticPackage();
    let sealedRecord: unknown;
    const outcome = preserve(
      transport,
      immutablePackage,
      undefined,
      syntheticIntegrityOperations({
        sealRecord(record) {
          sealedRecord = deepFreeze(record);
          return sealedRecord as Readonly<typeof record>;
        },
      }),
    );

    expect(outcome).toBe("PRESERVATION_VERIFIED");

    const expectedPackageBytes = Buffer.from(
      '{"mechanical":{"label":"source","status":"COMPLETED"},"nested":{"a":"first","z":"last"},"values":[true,null,7,"evidence"]}',
      "utf8",
    );
    const packageRelativePath =
      `${CASE_001_PRESERVATION_ROOT}/synthetic-attempt-001/campaign-package.canonical.json`;
    const receiptRelativePath =
      `${CASE_001_PRESERVATION_ROOT}/synthetic-attempt-001/preservation-receipt.canonical.json`;
    expect(Buffer.from(transport.files.get(packageRelativePath) ?? []))
      .toEqual(expectedPackageBytes);
    const packageSha256 = sha256(expectedPackageBytes);
    const receiptBytes = transport.files.get(receiptRelativePath);
    expect(receiptBytes).toBeDefined();
    const receipt = JSON.parse(Buffer.from(receiptBytes ?? []).toString("utf8"));
    expect(receipt.serializerVersion).toBe(CASE_001_CANONICAL_JSON_VERSION);
    expect(receipt.sourceByteLength).toBe(expectedPackageBytes.byteLength);
    expect(receipt.persistedByteLength).toBe(expectedPackageBytes.byteLength);
    expect(receipt.sourceSha256).toBe(packageSha256);
    expect(receipt.persistedSha256).toBe(packageSha256);
    expect(receipt.verification).toBe("EXACT_BYTE_MATCH");
    expect(receipt).not.toHaveProperty("preservationRecord");
    expect(sealedRecord).toEqual({
      sealed: true,
      events: [
        { sequence: 1, kind: "preservation-started" },
        { sequence: 2, kind: "source-identity-established" },
        { sequence: 3, kind: "package-write-confirmed" },
        { sequence: 4, kind: "package-reread" },
        { sequence: 5, kind: "package-verified" },
        { sequence: 6, kind: "receipt-created" },
        { sequence: 7, kind: "receipt-write-confirmed" },
        { sequence: 8, kind: "receipt-reread" },
        { sequence: 9, kind: "receipt-verified" },
        { sequence: 10, kind: "preservation-sealed" },
      ],
    });
    expect(receipt.stdoutAuthoritative).toBe(false);
    expect(receipt.semanticInspectionOrTransformation).toBe(false);
    expect(receipt.writeStartedAt).toBe("2026-08-10T17:00:00.000Z");
    expect(receipt.writeConfirmedAt).toBe("2026-08-10T17:00:01.000Z");
    expect(receipt.rereadAt).toBe("2026-08-10T17:00:02.000Z");
    expect(receipt.verifiedAt).toBe("2026-08-10T17:00:03.000Z");
    expect(receipt.receiptSealedAt).toBe("2026-08-10T17:00:04.000Z");
    expect(sha256(receiptBytes ?? new Uint8Array())).toMatch(/^[a-f0-9]{64}$/);
  });

  it("seals the receipt before publication and the C24 record only after receipt verification", () => {
    const order: string[] = [];
    const transport = memoryTransport();
    const observedTransport: EvidencePreservationTransport = {
      publish(relativePath, bytes) {
        order.push(relativePath.endsWith("campaign-package.canonical.json")
          ? "publish-package"
          : "publish-receipt");
        transport.publish(relativePath, bytes);
      },
      read(relativePath) {
        order.push(relativePath.endsWith("campaign-package.canonical.json")
          ? "read-package"
          : "read-receipt");
        return transport.read(relativePath);
      },
    };
    let serialization = 0;
    let hashing = 0;
    const integrity = syntheticIntegrityOperations({
      serialize(value) {
        order.push(serialization++ === 0 ? "serialize-package" : "serialize-receipt");
        return canonicalJsonBytes(value);
      },
      hash(bytes) {
        const labels = [
          "hash-source-package",
          "hash-reread-package",
          "hash-source-receipt",
          "hash-reread-receipt",
        ];
        order.push(labels[hashing++] ?? "unexpected-hash");
        return sha256(bytes);
      },
      sealReceipt(receipt) {
        order.push("seal-receipt");
        return deepFreeze(receipt);
      },
      sealRecord(record) {
        order.push("seal-record");
        return deepFreeze(record);
      },
    });

    expect(preserve(observedTransport, syntheticPackage(), undefined, integrity))
      .toBe("PRESERVATION_VERIFIED");
    expect(order).toEqual([
      "serialize-package",
      "hash-source-package",
      "publish-package",
      "read-package",
      "hash-reread-package",
      "seal-receipt",
      "serialize-receipt",
      "hash-source-receipt",
      "publish-receipt",
      "read-receipt",
      "hash-reread-receipt",
      "seal-record",
    ]);
  });

  it.each([
    ["package hash", {
      hash: (() => {
        let calls = 0;
        return (bytes: Uint8Array) => calls++ === 1 ? "0".repeat(64) : sha256(bytes);
      })(),
    }],
    ["receipt creation", { sealReceipt: () => { throw new Error("receipt"); } }],
    ["receipt serialization", {
      serialize: (() => {
        let calls = 0;
        return (value: unknown) => {
          if (calls++ === 1) throw new Error("receipt serialization");
          return canonicalJsonBytes(value);
        };
      })(),
    }],
    ["receipt hash", {
      hash: (() => {
        let calls = 0;
        return (bytes: Uint8Array) => calls++ === 3 ? "0".repeat(64) : sha256(bytes);
      })(),
    }],
    ["C24 record seal", { sealRecord: () => { throw new Error("record"); } }],
  ] satisfies ReadonlyArray<readonly [
    string,
    Partial<PreservationIntegrityOperations>,
  ]>)("fails closed on %s failure", (_name, overrides) => {
    expect(preserve(
      memoryTransport(),
      syntheticPackage(),
      undefined,
      syntheticIntegrityOperations(overrides),
    )).toBe("PRESERVATION_INCOMPLETE");
  });

  it("routes one immutable post-package value through C22 and returns only opaque status", () => {
    const transport = memoryTransport();
    const status = preserveCase001CampaignPackage({
      attemptId: "synthetic-c22-attempt",
      authorityRelativePath: AUTHORITY_PATH,
      immutablePackage: syntheticPackage() as unknown as Case001CampaignEvidence,
      transport,
      now: () => new Date("2026-08-10T17:00:00.000Z"),
    });

    expect(status).toBe("PRESERVATION_VERIFIED");
    expect(typeof status).toBe("string");
    expect(["PRESERVATION_VERIFIED", "PRESERVATION_INCOMPLETE"])
      .toContain(status);
    expect(transport.files.size).toBe(2);
  });

  it.each([
    ["prefix", (bytes: Uint8Array) => Uint8Array.from([0, ...bytes])],
    ["truncation", (bytes: Uint8Array) => bytes.slice(0, -1)],
    ["append", (bytes: Uint8Array) => Uint8Array.from([...bytes, 0])],
    ["mutation", (bytes: Uint8Array) => {
      const changed = Uint8Array.from(bytes);
      changed[Math.floor(changed.length / 2)] ^= 1;
      return changed;
    }],
    ["substitution", () => canonicalJsonBytes(deepFreeze({ substitute: true }))],
    ["wrong-attempt", () => canonicalJsonBytes(syntheticPackage("other-attempt"))],
  ])("refuses %s corruption of package bytes", (_name, corrupt) => {
    const transport = memoryTransport((relativePath, bytes) =>
      relativePath.endsWith("campaign-package.canonical.json")
        ? corrupt(bytes)
        : bytes);

    expect(preserve(transport)).toBe("PRESERVATION_INCOMPLETE");
    expect([...transport.files.keys()].some((item) =>
      item.endsWith("preservation-receipt.canonical.json"))).toBe(false);
  });

  it("refuses receipt corruption after package verification", () => {
    const transport = memoryTransport((relativePath, bytes) =>
      relativePath.endsWith("preservation-receipt.canonical.json")
        ? bytes.slice(0, -1)
        : bytes);

    expect(preserve(transport)).toBe("PRESERVATION_INCOMPLETE");
  });

  it("refuses receipt publication failure after package verification", () => {
    const transport = memoryTransport(
      undefined,
      (relativePath) => relativePath.endsWith("preservation-receipt.canonical.json"),
    );

    expect(preserve(transport)).toBe("PRESERVATION_INCOMPLETE");
  });

  it("refuses mutable, lossy, cyclic, sparse, accessor, and unsupported package values", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    Object.freeze(cyclic);
    const sparse = Object.freeze(new Array(2));
    let accessorInvocations = 0;
    const accessor = Object.freeze(Object.defineProperty({}, "value", {
      enumerable: true,
      get: () => { accessorInvocations += 1; return "hidden"; },
    }));
    const unsupported = [
      { mutable: true },
      Object.freeze({ value: undefined }),
      Object.freeze({ value: Number.NaN }),
      Object.freeze({ value: Number.POSITIVE_INFINITY }),
      Object.freeze({ value: 1n }),
      Object.freeze({ value: Symbol("value") }),
      Object.freeze({ value: () => undefined }),
      Object.freeze(new Date("2026-08-10T00:00:00.000Z")),
      cyclic,
      sparse,
      accessor,
    ];

    for (const value of unsupported) {
      expect(preserve(memoryTransport(), value))
        .toBe("PRESERVATION_INCOMPLETE");
    }
    expect(accessorInvocations).toBe(0);
  });

  it("refuses write failure, overwrite, invalid attempt identity, and path traversal", () => {
    expect(preserve(memoryTransport(undefined, true)))
      .toBe("PRESERVATION_INCOMPLETE");

    const transport = memoryTransport();
    expect(preserve(transport)).toBe("PRESERVATION_VERIFIED");
    expect(preserve(transport)).toBe("PRESERVATION_INCOMPLETE");
    expect(preserve(memoryTransport(), syntheticPackage(), "../escape"))
      .toBe("PRESERVATION_INCOMPLETE");
  });

  it("publishes and independently rereads exact bytes through repository C23 transport", () => {
    const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
    const attemptId = `synthetic-preservation-${process.pid}`;
    const attemptDirectory = path.resolve(
      repositoryRoot,
      CASE_001_PRESERVATION_ROOT,
      attemptId,
    );
    fs.rmSync(attemptDirectory, { recursive: true, force: true });
    try {
      const outcome = preserve(
        createRepositoryEvidenceTransport(),
        syntheticPackage(),
        attemptId,
      );
      expect(outcome).toBe("PRESERVATION_VERIFIED");
      const packageRelativePath =
        `${CASE_001_PRESERVATION_ROOT}/${attemptId}/campaign-package.canonical.json`;
      const receiptRelativePath =
        `${CASE_001_PRESERVATION_ROOT}/${attemptId}/preservation-receipt.canonical.json`;
      expect(sha256(fs.readFileSync(path.resolve(
        repositoryRoot,
        packageRelativePath,
      )))).toMatch(/^[a-f0-9]{64}$/);
      const receipt = JSON.parse(fs.readFileSync(path.resolve(
        repositoryRoot,
        receiptRelativePath,
      ), "utf8"));
      expect(receipt.packageRelativePath).toBe(packageRelativePath);
      expect(preserve(
        createRepositoryEvidenceTransport(),
        syntheticPackage(),
        attemptId,
      )).toBe("PRESERVATION_INCOMPLETE");
    } finally {
      fs.rmSync(attemptDirectory, { recursive: true, force: true });
    }
  });

  it("uses fixed write, flush, close, rename, directory flush, and re-read order", () => {
    const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
    const attemptId = `synthetic-order-${process.pid}`;
    const attemptDirectory = path.resolve(
      repositoryRoot,
      CASE_001_PRESERVATION_ROOT,
      attemptId,
    );
    fs.rmSync(attemptDirectory, { recursive: true, force: true });
    const observed = repositoryOperations();
    try {
      expect(preserve(
        createRepositoryEvidenceTransport(observed.operations),
        syntheticPackage(),
        attemptId,
      )).toBe("PRESERVATION_VERIFIED");
      const onePublication = [
        "temporary-open",
        "write",
        "file-flush",
        "file-close",
        "rename",
        "directory-open",
        "directory-flush",
        "directory-close",
        "read",
      ];
      expect(observed.events).toEqual([
        ...onePublication.map((boundary) => `package:${boundary}`),
        ...onePublication.map((boundary) => `receipt:${boundary}`),
      ]);
    } finally {
      fs.rmSync(attemptDirectory, { recursive: true, force: true });
    }
  });

  it.each(([
    "temporary-open",
    "write",
    "file-flush",
    "file-close",
    "rename",
    "directory-open",
    "directory-flush",
    "directory-close",
    "read",
  ] as const).flatMap((boundary) => (["package", "receipt"] as const)
    .map((artifact) => [artifact, boundary] as const)))(
    "fails closed without retry when %s publication is interrupted at %s",
    (artifact, boundary) => {
      const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
      const attemptId = `synthetic-interrupt-${artifact}-${boundary}-${process.pid}`;
      const attemptDirectory = path.resolve(
        repositoryRoot,
        CASE_001_PRESERVATION_ROOT,
        attemptId,
      );
      fs.rmSync(attemptDirectory, { recursive: true, force: true });
      const observed = repositoryOperations({ artifact, boundary });
      try {
        expect(preserve(
          createRepositoryEvidenceTransport(observed.operations),
          syntheticPackage(),
          attemptId,
        )).toBe("PRESERVATION_INCOMPLETE");
        expect(observed.interruptionCount()).toBe(1);
        expect(observed.events.filter((event) =>
          event === `${artifact}:${boundary}`)).toHaveLength(
            boundary === "file-close" ? 2 : 1,
          );
      } finally {
        fs.rmSync(attemptDirectory, { recursive: true, force: true });
      }
    },
  );

  it.each(["package", "receipt"] as const)(
    "rejects a short %s write without retry",
    (artifact) => {
      const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
      const attemptId = `synthetic-short-${artifact}-${process.pid}`;
      const attemptDirectory = path.resolve(
        repositoryRoot,
        CASE_001_PRESERVATION_ROOT,
        attemptId,
      );
      fs.rmSync(attemptDirectory, { recursive: true, force: true });
      const observed = repositoryOperations({
        artifact,
        boundary: "write",
        shortWrite: true,
      });
      try {
        expect(preserve(
          createRepositoryEvidenceTransport(observed.operations),
          syntheticPackage(),
          attemptId,
        )).toBe("PRESERVATION_INCOMPLETE");
        expect(observed.interruptionCount()).toBe(1);
        expect(observed.events.filter((event) => event === `${artifact}:write`))
          .toHaveLength(1);
      } finally {
        fs.rmSync(attemptDirectory, { recursive: true, force: true });
      }
    },
  );

  it.each(["temporary", "receipt"] as const)(
    "refuses an existing %s destination",
    (conflict) => {
      const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
      const attemptId = `synthetic-conflict-${conflict}-${process.pid}`;
      const attemptDirectory = path.resolve(
        repositoryRoot,
        CASE_001_PRESERVATION_ROOT,
        attemptId,
      );
      const packagePath = path.join(attemptDirectory, "campaign-package.canonical.json");
      const receiptPath = path.join(
        attemptDirectory,
        "preservation-receipt.canonical.json",
      );
      fs.rmSync(attemptDirectory, { recursive: true, force: true });
      fs.mkdirSync(attemptDirectory, { recursive: true });
      fs.writeFileSync(
        conflict === "temporary" ? `${packagePath}.tmp` : receiptPath,
        "conflict",
      );
      try {
        expect(preserve(
          createRepositoryEvidenceTransport(),
          syntheticPackage(),
          attemptId,
        )).toBe("PRESERVATION_INCOMPLETE");
        expect(fs.readFileSync(
          conflict === "temporary" ? `${packagePath}.tmp` : receiptPath,
          "utf8",
        )).toBe("conflict");
      } finally {
        fs.rmSync(attemptDirectory, { recursive: true, force: true });
      }
    },
  );

  it("refuses a symlinked repository evidence destination", () => {
    const repositoryRoot = resolveRepositoryRootFromDirectory(__dirname);
    const attemptId = `synthetic-symlink-${process.pid}`;
    const attemptDirectory = path.resolve(
      repositoryRoot,
      CASE_001_PRESERVATION_ROOT,
      attemptId,
    );
    const externalDirectory = fs.mkdtempSync(
      path.join(fs.realpathSync(require("node:os").tmpdir()), "meu-preservation-"),
    );
    fs.mkdirSync(path.dirname(attemptDirectory), { recursive: true });
    fs.rmSync(attemptDirectory, { recursive: true, force: true });
    fs.symlinkSync(externalDirectory, attemptDirectory, "dir");
    try {
      expect(preserve(
        createRepositoryEvidenceTransport(),
        syntheticPackage(),
        attemptId,
      )).toBe("PRESERVATION_INCOMPLETE");
      expect(fs.readdirSync(externalDirectory)).toEqual([]);
    } finally {
      fs.rmSync(attemptDirectory, { recursive: true, force: true });
      fs.rmSync(externalDirectory, { recursive: true, force: true });
    }
  });
});

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function deepFreeze<T>(value: T): Readonly<T> {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value as Record<string, unknown>)) {
    deepFreeze(child);
  }
  return value;
}