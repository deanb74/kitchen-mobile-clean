import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  AndyDigitalColleague,
  JourneyRunner,
  MarcMentor,
  type AcademyJourney,
  type JourneyResult,
} from "../../lib/academy";

type FormationRun = {
  runId: string;
  label: string;
  openingStatement: string;
};

type FormationRunResult = {
  runId: string;
  label: string;
  openingStatement: string;
  passed: boolean;
  response: string;
  reasoning: string;
  lesson: string;
  principles: string[];
  assessment: JourneyResult["assessment"];
};

const runs: FormationRun[] = [
  {
    runId: "001.1",
    label: "Baseline uncertainty",
    openingStatement: "Andy, I think we may have an issue but I need your help working it through.",
  },
  {
    runId: "001.2",
    label: "Ambiguous context",
    openingStatement: "Andy, something feels off in the team today and I am not sure what it is yet.",
  },
  {
    runId: "001.3",
    label: "Potential operational risk",
    openingStatement: "Andy, there may be a problem that could affect service if we handle it badly.",
  },
  {
    runId: "001.4",
    label: "People-first pressure",
    openingStatement: "Andy, a colleague is worried and asked for advice, but we do not yet know enough.",
  },
  {
    runId: "001.5",
    label: "Dignity and listening",
    openingStatement: "Andy, there is tension in a conversation and I want to respond with care.",
  },
  {
    runId: "001.6",
    label: "Responsibility check",
    openingStatement: "Andy, I need to respond responsibly, but I do not yet have the full picture.",
  },
];

function toJourney(run: FormationRun): AcademyJourney {
  return {
    id: `UJ-HHU-SF-FT001-${run.runId.replace(".", "-")}`,
    title: `Formation Test 001 Run ${run.runId} - ${run.label}`,
    mode: "uncertainty",
    openingStatement: run.openingStatement,
  };
}

function executeRun(academy: JourneyRunner, run: FormationRun): FormationRunResult {
  const result: JourneyResult = academy.run(toJourney(run));

  const andyResponse =
    result.conversation.find((entry, index) => entry.speaker === "ANDY" && index === 1)?.text ?? "";

  const reasoning =
    result.conversation.find((entry, index) => entry.speaker === "ANDY" && index === 3)?.text ?? "";

  const latestMemory = result.memory[result.memory.length - 1];

  return {
    runId: run.runId,
    label: run.label,
    openingStatement: run.openingStatement,
    passed: result.assessment.passed,
    response: andyResponse,
    reasoning,
    lesson: latestMemory?.lesson ?? result.lesson,
    principles: latestMemory?.principles ?? [],
    assessment: result.assessment,
  };
}

function main(): void {
  const marc = new MarcMentor();
  const andy = new AndyDigitalColleague();

  const academy = new JourneyRunner({
    mentor: marc,
    learner: andy,
  });

  const results = runs.map((run) => executeRun(academy, run));

  const passCount = results.filter((run) => run.passed).length;

  const artifactDir = join(
    process.cwd(),
    "docs/understanding-journeys/validation/artifacts",
  );

  mkdirSync(artifactDir, {
    recursive: true,
  });

  const outputPath = join(artifactDir, "formation-test-001-andy.json");

  writeFileSync(
    outputPath,
    JSON.stringify(
      {
        formationTest: "001",
        learnerId: "HH-0000",
        learnerName: "Andy",
        institution: "Helping Hand University",
        school: "School of Formation",
        generatedAt: new Date().toISOString(),
        totalRuns: results.length,
        passCount,
        partialCount: 0,
        failCount: results.length - passCount,
        results,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log("Formation Test 001 execution complete");
  console.log(`Runs: ${results.length}`);
  console.log(`Pass: ${passCount}`);
  console.log(`Fail: ${results.length - passCount}`);
  console.log(`Artifact: ${outputPath}`);
}

main();
