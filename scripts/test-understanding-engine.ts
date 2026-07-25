import assert from "node:assert/strict";
import {
    corePrinciples,
    KnowledgeGraph,
} from "../lib/knowledge";
import { UnderstandingEngine } from "../lib/understanding";

const divider = "────────────────────────────────────────";

function main(): void {
  const graph = new KnowledgeGraph(corePrinciples);
  const engine = new UnderstandingEngine(graph);

  console.log("\nHELPING HAND UNDERSTANDING ENGINE TEST");
  console.log(divider);

  const conceptUnderstanding = engine.understandConcept(
    "understanding",
  );

  console.log("\nCONCEPT UNDERSTANDING");
  console.log(`Concept: ${conceptUnderstanding.concept.name}`);
  console.log(`Summary: ${conceptUnderstanding.summary}`);
  console.log(
    `Confidence: ${conceptUnderstanding.confidence}`,
  );
  console.log(
    `Evidence: ${conceptUnderstanding.evidenceSummary}`,
  );
  console.log(
    `Related: ${conceptUnderstanding.relatedConcepts.length}`,
  );
  console.log(
    `Referenced by: ${conceptUnderstanding.referencedBy.length}`,
  );

  if (conceptUnderstanding.uncertainty.length > 0) {
    console.log("Uncertainty:");

    for (const item of conceptUnderstanding.uncertainty) {
      console.log(`- ${item}`);
    }
  } else {
    console.log("Uncertainty: none");
  }

  const pathUnderstanding = engine.understandPath(
    "software-is-a-chore",
    "confidence",
  );

  console.log(`\n${divider}`);
  console.log("PATH UNDERSTANDING");
  console.log(`Summary: ${pathUnderstanding.summary}`);
  console.log(
    `Confidence: ${pathUnderstanding.confidence}`,
  );

  if (pathUnderstanding.steps.length > 0) {
    console.log("Steps:");

    for (const step of pathUnderstanding.steps) {
      console.log(
        `- ${step.from.name} -> ${step.to.name}: ${step.explanation}`,
      );
    }
  } else {
    console.log("Steps: none");
  }

  if (pathUnderstanding.uncertainty.length > 0) {
    console.log("Uncertainty:");

    for (const item of pathUnderstanding.uncertainty) {
      console.log(`- ${item}`);
    }
  } else {
    console.log("Uncertainty: none");
  }

  console.log(`\n${divider}`);
  console.log("ASSERTIONS");

  assert.equal(
    conceptUnderstanding.concept.id,
    "understanding",
    "Expected concept understanding for 'understanding'.",
  );

  assert.ok(
    conceptUnderstanding.sourceCount >= 1,
    "Expected concept understanding to include at least one source.",
  );

  assert.ok(
    conceptUnderstanding.confidence > 0,
    "Expected concept confidence to be greater than zero.",
  );

  assert.ok(
    pathUnderstanding.path.concepts.length >= 2,
    "Expected a path understanding with at least two concepts.",
  );

  assert.equal(
    pathUnderstanding.steps.length,
    Math.max(pathUnderstanding.path.concepts.length - 1, 0),
    "Expected path steps to match concept transitions.",
  );

  assert.ok(
    pathUnderstanding.confidence > 0,
    "Expected path confidence to be greater than zero.",
  );

  const candidateUnderstanding = engine.understandConcept(
    "software-is-a-chore",
  );

  assert.ok(
    candidateUnderstanding.uncertainty.length > 0,
    "Expected candidate-level concepts to report uncertainty.",
  );

  assert.throws(
    () =>
      engine.understandPath(
        "software-is-a-chore",
        "unknown-concept",
      ),
    /Unknown concept|No concept path found/,
    "Expected an invalid path request to fail clearly.",
  );

  console.log("All understanding engine checks passed.");
}

main();
