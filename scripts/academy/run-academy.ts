import assert from "node:assert/strict";
import {
  AndyDigitalColleague,
  firstUncertaintyJourney,
  JourneyRunner,
  MarcMentor,
} from "../../lib/academy";

const divider = "────────────────────────────────────────";

function printObject(value: unknown): void {
  console.log(JSON.stringify(value, null, 2));
}

const marc = new MarcMentor();
const andy = new AndyDigitalColleague();

const academy = new JourneyRunner({
  mentor: marc,
  learner: andy,
});

const result = academy.run(firstUncertaintyJourney);

console.log("\nHELPING HAND ACADEMY RUNTIME");
console.log(result.journey.title);
console.log(divider);

const opening = result.conversation[0];

console.log("\nMARC");
console.log(`> ${opening.text}`);

console.log(`\n${divider}`);
console.log("COGNITIVE TRACE");

console.log("\nObservation");
printObject(result.trace.observation);

console.log("\nContext Formation");
printObject(result.trace.context);

console.log("\nMemory & Recall");
printObject(result.trace.memoryRecall);

console.log("\nUnderstanding");
printObject(result.trace.understanding);

console.log("\nUncertainty");
printObject(result.trace.uncertainty);

console.log("\nCandidate Responses");

result.trace.candidateResponses.forEach(
  (candidate, index) => {
    console.log(`${index + 1}. ${candidate}`);
  },
);

console.log("\nJudgement");
console.log(result.trace.judgement);
console.log(divider);

for (const entry of result.conversation.slice(1)) {
  console.log(`\n${entry.speaker}`);

  for (const line of entry.text.split("\n")) {
    console.log(`> ${line}`);
  }
}

console.log(`\n${divider}`);
console.log("JOURNEY VALIDATION");

const {
  passed,
  ...validationDetails
} = result.assessment;

printObject(validationDetails);

console.log(
  `\nDecision: ${passed ? "PASS" : "NEEDS MENTORING"}`,
);

console.log("\nANDY'S LEARNING");
console.log(result.lesson);

console.log("\nMEMORY AFTER JOURNEY");
printObject(result.memory);

console.log(divider);

assert.equal(
  result.assessment.passed,
  true,
  "Andy did not successfully complete the journey.",
);
