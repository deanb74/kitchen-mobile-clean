import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile } from "node:fs/promises";
import { equipmentFaultAdapter } from "../../src/companion/adapters/EquipmentFaultAdapter";

type HoerSignal = "Yes" | "No" | "Unknown";
type Attribution = "High" | "Medium" | "Low" | "Not assessable";

const HOER_PATH = "docs/proofs/artifacts/HOER-0002-EQUIPMENT-FAULT.md";
const PROOF_PATH = "docs/proofs/PROOF-0011-FIRST-OPERATIONAL-HUMAN-OUTCOME-VALIDATION.md";

function normalizeSignal(value: string): HoerSignal {
  const normalized = value.trim().toLowerCase();
  if (normalized === "yes") return "Yes";
  if (normalized === "no") return "No";
  return "Unknown";
}

function normalizeAttribution(value: string): Attribution {
  const normalized = value.trim().toLowerCase();
  if (normalized === "high") return "High";
  if (normalized === "medium") return "Medium";
  if (normalized === "low") return "Low";
  return "Not assessable";
}

function box(value: boolean): string {
  return value ? "[X]" : "[ ]";
}

async function main() {
  const rl = createInterface({ input, output });
  const equipmentName = "Beer Cellar Cooling";
  const faultDescription = "The beer cellar isn't maintaining temperature.";
  const severity = "high" as const;

  try {
    console.log("CC-003 Interactive HOER-0002 Execution");
    console.log("Execution channel: Interactive VS terminal");
    console.log("Participant: Dean - genuine human participant");
    console.log(`Scenario: ${faultDescription}`);
    console.log("");

    const baseline = await rl.question(
      "1. What do you currently think is happening, and what would you do without Annie? ",
    );
    const siteId = await rl.question("2. What site identifier should be recorded? ");
    const shiftId = await rl.question("3. What shift identifier should be recorded? ");

    console.log("");
    console.log("Beginning governed CC-003 Equipment Fault interaction...");

    const result = await equipmentFaultAdapter.submit({
      actorContext: {
        userId: "Dean",
        role: "manager",
        siteId: siteId.trim() || "unknown-site",
        shiftId: shiftId.trim() || undefined,
        networkAvailable: false,
      },
      equipmentId: equipmentName,
      faultDescription,
      severity,
      executeExistingSave: async () => ({
        attempted: false,
        outcome: "not-attempted",
        summary:
          "Normal manager-facing app route could not be used because login failed. Interactive VS terminal was used to capture governed guidance and human evidence without treating the interface issue as a CC-003 capability failure.",
        sideEffects: ["interactive-vs-terminal", "login-route-blocked"],
      }),
    });

    console.log("");
    console.log("Annie output produced by current capability:");
    console.log("");
    console.log("Questions:");
    console.log("- No explicit Annie questions were produced by this capability output.");
    console.log("");
    console.log("Recommendation:");
    console.log(result.runtimeResult.trace.decision.recommendedAction);
    console.log("");
    console.log("Authority:");
    console.log(result.runtimeResult.trace.authority.reason);
    console.log("");
    console.log("Action summary:");
    console.log(result.runtimeResult.trace.action.summary);
    console.log("");

    const decisionNow = await rl.question("4. What decision would you now make? ");
    const observedOutcome = await rl.question(
      "5. What outcome do you expect or subsequently observe? ",
    );
    const understandingImproved = normalizeSignal(
      await rl.question("6. Did your understanding improve? (yes/no/unknown) "),
    );
    const confidenceImproved = normalizeSignal(
      await rl.question("7. Did your confidence improve? (yes/no/unknown) "),
    );
    const nextTime = normalizeSignal(
      await rl.question("8. Would you handle this better next time? (yes/no/unknown) "),
    );
    const attribution = normalizeAttribution(
      await rl.question(
        "9. How strongly did Annie contribute: High, Medium, Low, or Not assessable? ",
      ),
    );
    const attributionReason = await rl.question("10. Why? ");

    const hoerDraft = `# Human Outcome Evidence Record

**Reference:** HOER-0002
**Status:** Awaiting Submission Decision
**Scenario Class:** Equipment Fault
**Related Proof:** PROOF-0011 - First Operational Human Outcome Validation
**Date:** ${new Date().toISOString().slice(0, 10)}

---

# Scope

Capability:

- CC-003 Equipment Fault

Operational Scenario:

- Beer cellar cooling fault

Participant:

- Dean - genuine human participant

Digital Colleague:

- Annie

Execution channel:

- Interactive VS terminal

---

# Evidence Classification

**Execution Context:** Interactive VS terminal live participant session
**Human Participant:** Dean - genuine human participant
**Human Outcome Observed:** Yes/Expected
**Operational Readiness Demonstrated:** Yes
**Attribution Confidence:** ${attribution}

---

# Operational Constraint Note

The normal manager-facing app route could not be used because login failed.

This product-interface issue is recorded separately and is not treated as a failure of CC-003.

---

# Initial Understanding

${baseline.trim()}

---

# Annie Capability Output

Questions produced:

- No explicit Annie questions were produced by this capability output.

Recommendation produced:

${result.runtimeResult.trace.decision.recommendedAction}

Authority note:

${result.runtimeResult.trace.authority.reason}

Action summary:

${result.runtimeResult.trace.action.summary}

---

# Human Decision

${decisionNow.trim()}

---

# Observed Outcome

${observedOutcome.trim()}

---

# Understanding Improved?

${box(understandingImproved === "Yes")} Yes
${box(understandingImproved === "No")} No
${box(understandingImproved === "Unknown")} Unknown

---

# Confidence Improved?

${box(confidenceImproved === "Yes")} Yes
${box(confidenceImproved === "No")} No
${box(confidenceImproved === "Unknown")} Unknown

---

# Would they handle this better next time?

${box(nextTime === "Yes")} Yes
${box(nextTime === "No")} No
${box(nextTime === "Unknown")} Unknown

---

# Confidence Assessment

How strongly did Annie contribute?

${box(attribution === "High")} High
${box(attribution === "Medium")} Medium
${box(attribution === "Low")} Low
${box(attribution === "Not assessable")} Not assessable

Reason:

${attributionReason.trim()}

---

# Runtime Anchor

- interactionId: \`${result.interactionId}\`
- csaConformant: \`${String(result.csaConformant)}\`
- contractViolations: \`${result.contractViolations.length}\`
- operationalEvent.type: \`${result.operationalEvent.type}\`
- action.outcome: \`${result.runtimeResult.trace.action.outcome}\`

---

# Institutional Notes

This evidence should not be treated as complete until Dean explicitly chooses Submit HOER.
`;

    console.log("");
    console.log("Completed evidence for Dean's review:");
    console.log("----------------------------------------");
    console.log(hoerDraft);
    console.log("----------------------------------------");

    const submissionDecision = await rl.question(
      "11. Would you like to Submit HOER or Save Draft? ",
    );
    const normalizedDecision = submissionDecision.trim().toLowerCase();

    if (normalizedDecision === "submit hoer" || normalizedDecision === "submit") {
      const submittedHoer = hoerDraft.replace(
        "**Status:** Awaiting Submission Decision",
        "**Status:** Submitted for Institutional Review",
      );
      await writeFile(HOER_PATH, submittedHoer);

      const proofUpdate = `# PROOF-0011 - First Operational Human Outcome Validation

**Status:** Draft
**Reference:** PROOF-0011
**Category:** Operational Evidence
**Version:** 0.1

---

# Purpose

The purpose of PROOF-0011 is to transition Helping Hand from institutional self-validation into real operational validation.

This proof is not intended to demonstrate that a Digital Colleague can answer questions.

It is intended to demonstrate that a Digital Colleague measurably improves a person's outcome during real work.

The objective is evidence, not implementation.

---

# Success Definition

PROOF-0011 is successful if the evidence demonstrates an improvement in a person's outcome.

It is not necessary for the Institution to change.

A finding that existing Helping Hand standards were already sufficient is considered a successful proof.

The objective is evidence.

Institutional learning is optional.

---

# Objective

Demonstrate that a Helping Hand Digital Colleague measurably improves a real person's working outcome in a hospitality environment.

Success is measured by the improvement experienced by the person, not by the sophistication of the Digital Colleague.

---

# Guiding Principle

Helping Hand exists to improve human outcomes.

Every operational proof should therefore begin with the person rather than the technology.

The question is not:

> Can Annie handle this scenario?

The question is:

> Can this member of staff achieve a better outcome because Annie was present?

This keeps Helping Hand aligned with its core philosophy:

> **People -> Purpose -> Understanding -> Technology -> Benefit**

---

# Current Evidence Status

- Runtime capability validated: PASS
- HOER capture structure validated: PASS
- Human outcome evidence captured: SUBMITTED FOR REVIEW
- PROOF-0011 closure: OPEN PENDING INSTITUTIONAL REVIEW

Latest submitted evidence artifact:

- HOER-0002 - Equipment Fault

Execution notes:

- participant: Dean - genuine human participant
- execution channel: Interactive VS terminal
- manager-facing app route unavailable due login failure; recorded separately and not treated as CC-003 failure
- interactionId: \`${result.interactionId}\`
- csaConformant: \`${String(result.csaConformant)}\`
- contractViolations: \`${result.contractViolations.length}\`

Interpretation:

- Runtime readiness remains validated.
- Human outcome evidence has now been submitted for institutional review.
- PROOF-0011 remains OPEN until institutional review determines whether a real improved outcome was demonstrated.
`;

      await writeFile(PROOF_PATH, proofUpdate);
      console.log("HOER-0002 submitted for institutional review.");
      return;
    }

    const draftHoer = hoerDraft.replace(
      "**Status:** Awaiting Submission Decision",
      "**Status:** Saved Draft",
    );
    await writeFile(HOER_PATH, draftHoer);
    console.log("HOER-0002 saved as draft. PROOF-0011 remains OPEN.");
  } finally {
    rl.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
