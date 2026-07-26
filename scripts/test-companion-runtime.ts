import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CompanionOrchestrator } from "../src/companion/CompanionOrchestrator";
import type {
    CompanionRuntimeRequest,
    CompanionRuntimeResult,
} from "../src/companion/types";

const divider = "----------------------------------------";

function buildRequest(
  overrides: Partial<CompanionRuntimeRequest> = {},
): CompanionRuntimeRequest {
  return {
    requestId: `req-${Date.now()}`,
    actorId: "staff-001",
    actorRole: "staff",
    siteId: "site-001",
    shiftId: "shift-001",
    capabilityId: "temperature.log",
    prompt: "Log fridge temperature and guide corrective action if above threshold.",
    peopleOutcome:
      "Prevent unsafe food handling and support staff to make safe, timely decisions.",
    networkAvailable: true,
    uncertainty: [],
    confidenceHint: 0.82,
    artifacts: [
      {
        kind: "note",
        detail: "Temperature measured at 6.1C in walk-in chiller.",
      },
      {
        kind: "system",
        detail: "Captured from in-shift digital check flow.",
      },
    ],
    ...overrides,
  };
}

function assertCsaRuntimeResult(result: CompanionRuntimeResult): void {
  assert.equal(result.csaConformant, true, "Expected CSA-conformant trace.");
  assert.equal(
    result.contractViolations.length,
    0,
    "Expected zero runtime contract violations.",
  );

  assert.equal(
    result.trace.context.peopleOutcome.length > 0,
    true,
    "Expected First Law people outcome to be present.",
  );

  assert.equal(
    result.trace.evidence.provenance.source,
    "companion-runtime",
    "Expected evidence provenance source to be companion-runtime.",
  );

  assert.equal(
    result.trace.reflection.findings.length > 0,
    true,
    "Expected reflection to include findings.",
  );
}

async function writeTraceArtifact(payload: {
  generatedAt: string;
  scenarios: CompanionRuntimeResult[];
}) {
  const projectRoot = process.cwd();
  const artifactDir = path.join(projectRoot, "docs", "proofs", "artifacts");
  const artifactPath = path.join(
    artifactDir,
    "companion-runtime-trace.latest.json",
  );

  await mkdir(artifactDir, { recursive: true });
  await writeFile(artifactPath, JSON.stringify(payload, null, 2), "utf8");

  return artifactPath;
}

async function main() {
  console.log("\nHELPING HAND COMPANION RUNTIME HARNESS");
  console.log(divider);

  const orchestrator = new CompanionOrchestrator();

  const successScenario = orchestrator.run(
    buildRequest({
      requestId: "req-success-001",
      actorRole: "staff",
      capabilityId: "temperature.log",
      confidenceHint: 0.88,
      uncertainty: [],
    }),
  );

  const humanHandoffScenario = orchestrator.run(
    buildRequest({
      requestId: "req-human-001",
      actorRole: "staff",
      capabilityId: "temperature.log",
      confidenceHint: 0.45,
      uncertainty: ["Safety risk requires qualified manager confirmation."],
    }),
  );

  assertCsaRuntimeResult(successScenario);
  assertCsaRuntimeResult(humanHandoffScenario);

  assert.equal(
    humanHandoffScenario.trace.authority.disposition,
    "require-human",
    "Expected require-human disposition for safety uncertainty scenario.",
  );

  const payload = {
    generatedAt: new Date().toISOString(),
    scenarios: [successScenario, humanHandoffScenario],
  };

  const artifactPath = await writeTraceArtifact(payload);

  console.log("Runtime harness passed.");
  console.log(`Scenarios executed: ${payload.scenarios.length}`);
  console.log(`Artifact: ${artifactPath}`);
  console.log(divider);
}

main().catch((error: unknown) => {
  console.error("Companion runtime harness failed.");

  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);
});
