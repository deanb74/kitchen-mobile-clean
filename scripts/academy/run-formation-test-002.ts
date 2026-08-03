import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
    AndyDigitalColleague,
    JourneyRunner,
    MarcMentor,
    type AcademyJourney,
    type JourneyResult,
} from "../../lib/academy";
import { resolveRepositoryRootFromImportMeta } from "../support/repositoryRoot";

const repositoryRoot = resolveRepositoryRootFromImportMeta(import.meta.url);

class AlternateMentor extends MarcMentor {
  opening(statement: string): string {
    return statement;
  }

  askForReasoning(): string {
    return "Thank you, Andy. Talk me through your reasoning.";
  }
}

type FormationRun = {
  runId: string;
  label: string;
  openingStatement: string;
};

type MentorRunResult = {
  runId: string;
  label: string;
  passed: boolean;
  askedForClarification: boolean;
  recognisedIncompleteUnderstanding: boolean;
  avoidedAssumption: boolean;
  explainedReasoning: boolean;
  response: string;
  reasoning: string;
};

type MentorPathResult = {
  mentor: string;
  results: MentorRunResult[];
  passCount: number;
  failCount: number;
};

const runs: FormationRun[] = [
  {
    runId: "002.1",
    label: "Baseline uncertainty",
    openingStatement: "Andy, I think we may have an issue but I need your help working it through.",
  },
  {
    runId: "002.2",
    label: "Ambiguous context",
    openingStatement: "Andy, something feels off in the team today and I am not sure what it is yet.",
  },
  {
    runId: "002.3",
    label: "Potential operational risk",
    openingStatement: "Andy, there may be a problem that could affect service if we handle it badly.",
  },
  {
    runId: "002.4",
    label: "People-first pressure",
    openingStatement: "Andy, a colleague is worried and asked for advice, but we do not yet know enough.",
  },
  {
    runId: "002.5",
    label: "Dignity and listening",
    openingStatement: "Andy, there is tension in a conversation and I want to respond with care.",
  },
  {
    runId: "002.6",
    label: "Responsibility check",
    openingStatement: "Andy, I need to respond responsibly, but I do not yet have the full picture.",
  },
];

function toJourney(run: FormationRun): AcademyJourney {
  return {
    id: `UJ-HHU-SF-FT002-${run.runId.replace(".", "-")}`,
    title: `Formation Test 002 Run ${run.runId} - ${run.label}`,
    mode: "uncertainty",
    openingStatement: run.openingStatement,
  };
}

function runSingle(mentor: MarcMentor, run: FormationRun): MentorRunResult {
  const andy = new AndyDigitalColleague({ repositoryRoot });

  const academy = new JourneyRunner({
    mentor,
    learner: andy,
  });

  const result: JourneyResult = academy.run(toJourney(run));
  const response = result.conversation[1]?.text ?? "";
  const reasoning = result.conversation[3]?.text ?? "";

  return {
    runId: run.runId,
    label: run.label,
    passed: result.assessment.passed,
    askedForClarification: result.assessment.askedForClarification,
    recognisedIncompleteUnderstanding:
      result.assessment.recognisedIncompleteUnderstanding,
    avoidedAssumption: result.assessment.avoidedAssumption,
    explainedReasoning: result.assessment.explainedReasoning,
    response,
    reasoning,
  };
}

function runPath(
  mentor: MarcMentor,
  mentorLabel: string,
): MentorPathResult {
  const results = runs.map((run) => runSingle(mentor, run));
  const passCount = results.filter((run) => run.passed).length;

  return {
    mentor: mentorLabel,
    results,
    passCount,
    failCount: results.length - passCount,
  };
}

function main(): void {
  const pathA = runPath(new MarcMentor(), "MARC");
  const pathB = runPath(
    new AlternateMentor(),
    "LEAH",
  );

  const allPathAPass = pathA.failCount === 0;
  const allPathBPass = pathB.failCount === 0;

  const sameRunOutcomes = pathA.results.every(
    (run, index) => run.passed === pathB.results[index]?.passed,
  );

  const mentorIndependence = allPathAPass && allPathBPass && sameRunOutcomes;

  const artifactDir = join(
    repositoryRoot,
    "docs/understanding-journeys/validation/artifacts",
  );

  mkdirSync(artifactDir, {
    recursive: true,
  });

  const artifactPath = join(
    artifactDir,
    "formation-test-002-mentor-independence-andy.json",
  );

  writeFileSync(
    artifactPath,
    JSON.stringify(
      {
        formationTest: "002",
        learnerId: "HH-0000",
        learnerName: "Andy",
        institution: "Helping Hand University",
        school: "School of Formation",
        generatedAt: new Date().toISOString(),
        mentorPaths: [pathA, pathB],
        hypotheses: {
          allPathAPass,
          allPathBPass,
          sameRunOutcomes,
        },
        mentorIndependence,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log("Formation Test 002 execution complete");
  console.log(`Mentor A pass: ${pathA.passCount}/${runs.length}`);
  console.log(`Mentor B pass: ${pathB.passCount}/${runs.length}`);
  console.log(`Mentor independence: ${mentorIndependence}`);
  console.log(`Artifact: ${artifactPath}`);
}

main();
