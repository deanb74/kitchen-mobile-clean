import assert from "node:assert/strict";
import {
    corePrinciples,
    KnowledgeGraph,
} from "../lib/knowledge";

const divider = "────────────────────────────────────────";

function printConceptNames(title: string, names: string[]): void {
  console.log(`\n${title}`);

  if (names.length === 0) {
    console.log("(none)");
    return;
  }

  for (const name of names) {
    console.log(`- ${name}`);
  }
}

function main(): void {
  const graph = new KnowledgeGraph(corePrinciples);

  console.log("\nHELPING HAND KNOWLEDGE GRAPH TEST");
  console.log(divider);

  console.log(`Concepts loaded: ${graph.getConcepts().length}`);
  console.log(`Connections: ${graph.getConnections().length}`);

  const missingReferences = graph.getMissingReferences();

  console.log(
    `Missing references: ${missingReferences.length}`,
  );

  const understandingNode = graph.getNode("understanding");

  printConceptNames(
    "Understanding → related concepts",
    understandingNode.relatedConcepts.map(
      (concept) => concept.name,
    ),
  );

  printConceptNames(
    "Understanding → referenced by",
    understandingNode.referencedBy.map(
      (concept) => concept.name,
    ),
  );

  printConceptNames(
    "Understanding → neighbours",
    understandingNode.neighbours.map(
      (concept) => concept.name,
    ),
  );

  const path = graph.findPath(
    "software-is-a-chore",
    "confidence",
  );

  if (path) {
    console.log("\nPath software-is-a-chore → confidence");
    console.log(path.concepts.map((c) => c.name).join(" -> "));
  } else {
    console.log("\nNo path found between software-is-a-chore and confidence.");
  }

  console.log(`\n${divider}`);
  console.log("ASSERTIONS");

  assert.ok(
    graph.getConcepts().length > 0,
    "Expected at least one concept in the graph.",
  );

  assert.equal(
    missingReferences.length,
    0,
    "Expected no missing concept references.",
  );

  assert.ok(
    understandingNode.neighbours.length > 0,
    "Expected Understanding to have neighbours.",
  );

  assert.ok(
    path,
    "Expected a path from software-is-a-chore to confidence.",
  );

  console.log("All graph checks passed.");
}

main();
