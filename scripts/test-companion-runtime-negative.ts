import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CompanionOrchestrator } from "../src/companion/CompanionOrchestrator";
import type {
    CompanionRuntimeRequest,
    CompanionRuntimeResult,
} from "../src/companion/types";
import { resolveRepositoryRootFromImportMeta } from "./support/repositoryRoot";

const divider = "----------------------------------------";
const repositoryRoot = resolveRepositoryRootFromImportMeta(import.meta.url);

function buildInvalidRequest(
  overrides: Partial<CompanionRuntimeRequest> = {},
): CompanionRuntimeRequest {
  return {
    requestId: "req-negative-001",
    actorId: "",
    actorRole: "staff",
    siteId: "",
    shiftId: "shift-001",
    capabilityId: "temperature.log",
    prompt: "Proceed with temperature logging.",
    peopleOutcome: "",
    networkAvailable: true,
    uncertainty: [],
    confidenceHint: 0.8,
    artifacts: [],
    ...overrides,
  };
}

function assertNonConformance(result: CompanionRuntimeResult): void {
  assert.equal(
    result.csaConformant,
    false,
    "Expected CSA non-conformance for invalid runtime request.",
  );

  assert.equal(
    result.contractViolations.length > 0,
    true,
    "Expected one or more runtime contract violations.",
  );

  const joined = result.contractViolations.join("\n");

  assert.equal(
    joined.includes("ContextEnvelope.actorId is required."),
    true,
    "Expected actorId contract violation.",
  );

  assert.equal(
    joined.includes("ContextEnvelope.siteId is required."),
    true,
    "Expected siteId contract violation.",
  );

  assert.equal(
    joined.includes("ContextEnvelope.peopleOutcome is required by the First Law."),
    true,
    "Expected First Law contract violation for peopleOutcome.",
  );
}

async function writeArtifact(payload: {
  generatedAt: string;
  scenario: CompanionRuntimeResult;
}) {
  const artifactDir = path.join(repositoryRoot, "docs", "proofs", "artifacts");
  const artifactPath = path.join(
    artifactDir,
    "companion-runtime-trace.negative.json",
  );

  await mkdir(artifactDir, { recursive: true });
  await writeFile(artifactPath, JSON.stringify(payload, null, 2), "utf8");

  return artifactPath;
}

async function main() {
  console.log("\nHELPING HAND COMPANION RUNTIME NEGATIVE HARNESS");
  console.log(divider);

  const orchestrator = new CompanionOrchestrator();
  const scenario = orchestrator.run(buildInvalidRequest());

  assertNonConformance(scenario);

  const artifactPath = await writeArtifact({
    generatedAt: new Date().toISOString(),
    scenario,
  });

  console.log("Negative harness passed.");
  console.log(`Violations detected: ${scenario.contractViolations.length}`);
  console.log(`Artifact: ${artifactPath}`);
  console.log(divider);
}

main().catch((error: unknown) => {
  console.error("Companion runtime negative harness failed.");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);
});
