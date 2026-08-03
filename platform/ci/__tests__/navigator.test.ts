import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";

import { chooseNextRoute } from "../index";

describe("Companion Intelligence Navigator", () => {

  it("observes first", () => {
    expect(
      chooseNextRoute({
        hasObservations: false,
        hasTranslations: false,
        needsReflection: false,
        needsClarification: false,
      }).next
    ).toBe("observe");
  });

  it("translates after observation", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: false,
        needsReflection: false,
        needsClarification: false,
      }).next
    ).toBe("translate");
  });

  it("asks for clarification when required", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: false,
        needsClarification: true,
      }).next
    ).toBe("conversation");
  });

  it("demonstrates professional behaviour before instruction in normal practice", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: false,
        needsClarification: true,
        requiresDemonstration: true,
      }).next
    ).toBe("demonstrate");
  });

  it("instructs first when safety or compliance requires immediate intervention", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: false,
        needsClarification: true,
        requiresImmediateInstruction: true,
      }).next
    ).toBe("instruct");
  });

  it("demonstrates handwashing for ready-to-eat food handling", () => {
    const route = chooseNextRoute({
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: false,
      requiresDemonstration: true,
      requiresImmediateInstruction: false,
      requiresComplianceInstruction: false,
    });

    expect(route.next).toBe("demonstrate");
    expect(route.reason).toContain("demonstrated first");
  });

  it("demonstrates PPE for entry to a normal construction site", () => {
    const route = chooseNextRoute({
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: false,
      requiresDemonstration: true,
      requiresImmediateInstruction: false,
      requiresComplianceInstruction: false,
    });

    expect(route.next).toBe("demonstrate");
    expect(route.reason).toContain("demonstrated first");
  });

  it("instructs immediately for an active exclusion zone", () => {
    const route = chooseNextRoute({
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: false,
      requiresDemonstration: true,
      requiresImmediateInstruction: true,
      requiresComplianceInstruction: false,
    });

    expect(route.next).toBe("instruct");
    expect(route.reason).toContain("instruction before demonstration");
  });

  it("demonstrates hand hygiene for routine patient interaction", () => {
    const route = chooseNextRoute({
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: false,
      requiresDemonstration: true,
      requiresImmediateInstruction: false,
      requiresComplianceInstruction: false,
    });

    expect(route.next).toBe("demonstrate");
    expect(route.reason).toContain("demonstrated first");
  });

  it("demonstrates curiosity by asking first when facts are unclear", () => {
    const route = chooseNextRoute({
      hasObservations: true,
      hasTranslations: true,
      needsReflection: false,
      needsClarification: true,
      requiresDemonstration: true,
      requiresImmediateInstruction: false,
      requiresComplianceInstruction: false,
    });

    expect(route.next).toBe("demonstrate");
    expect(route.reason).toContain("demonstrated first");
  });

  it("captures a frozen evidence run for the navigator scenarios", () => {
    const artifactPath = path.join(
      __dirname,
      "../../../docs/validation/artifacts/navigator-evidence-run-001.json"
    );

    expect(fs.existsSync(artifactPath)).toBe(true);

    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    expect(artifact.validationSession).toBe("navigator-evidence-run-001");

    const scenarios = artifact.scenarios as Array<Record<string, unknown>>;
    expect(scenarios).toHaveLength(5);

    const summary = Object.fromEntries(
      scenarios.map((scenario) => [scenario.scenarioId, scenario])
    );

    expect(summary["annie-ready-to-eat-food"]).toMatchObject({
      chosenRoute: "demonstrate",
      downstreamBehaviourInstruction: expect.stringContaining("handwashing"),
      verbalInstructionRequired: false,
    });

    expect(summary["kev-normal-site-entry"]).toMatchObject({
      chosenRoute: "demonstrate",
      downstreamBehaviourInstruction: expect.stringContaining("PPE"),
      verbalInstructionRequired: false,
    });

    expect(summary["active-exclusion-zone"]).toMatchObject({
      chosenRoute: "instruct",
      verbalInstructionRequired: true,
    });

    expect(summary["harry-routine-patient-interaction"]).toMatchObject({
      chosenRoute: "demonstrate",
      downstreamBehaviourInstruction: expect.stringContaining("hand hygiene"),
      verbalInstructionRequired: false,
    });

    expect(summary["andy-unclear-facts"]).toMatchObject({
      chosenRoute: "demonstrate",
      downstreamBehaviourInstruction: expect.stringContaining("conversational modelling"),
      verbalInstructionRequired: false,
    });
  });

  it("reflects when appropriate", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: true,
        needsClarification: false,
      }).next
    ).toBe("reflect");
  });

  it("completes when no further capability is needed", () => {
    expect(
      chooseNextRoute({
        hasObservations: true,
        hasTranslations: true,
        needsReflection: false,
        needsClarification: false,
      }).next
    ).toBe("complete");
  });

});