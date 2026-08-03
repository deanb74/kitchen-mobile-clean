import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";

import { buildGovernedPrototype } from "../behaviourPrototype";

describe("Governed behaviour prototype", () => {
  it("uses the CI-selected instruction for a visible PPE prototype", () => {
    const prototype = buildGovernedPrototype({
      fullInputContext: {
        role: "Kev",
        task: "entering a normal construction site",
        setting: "routine site access",
      },
      routeDecision: {
        next: "demonstrate",
        reason: "Professional behaviour should be demonstrated first in normal practice.",
      },
      behaviourIntent: "demonstrate required PPE",
      visibleAction: "Kev puts on PPE.",
      renderedPresentation: "Kev appears to put on a hard hat and eye protection.",
    });

    expect(prototype.route).toBe("demonstrate");
    expect(prototype.behaviourIntent).toBe("demonstrate required PPE");
    expect(prototype.visibleAction).toBe("Kev puts on PPE.");
    expect(prototype.renderedPresentation).toContain("hard hat");
    expect(prototype.visualLayerDecision).toContain("did not decide");
  });

  it("keeps the visible layer obedient to CI for urgent instruction", () => {
    const prototype = buildGovernedPrototype({
      fullInputContext: {
        role: "User",
        task: "approaching an active exclusion zone",
        setting: "hazardous restricted area",
      },
      routeDecision: {
        next: "instruct",
        reason: "Safety and urgency require instruction before demonstration.",
      },
      behaviourIntent: "warn immediately and stop movement",
      visibleAction: "The colleague stops and follows the verbal instruction.",
      renderedPresentation: "The colleague freezes and shows a warning posture.",
    });

    expect(prototype.route).toBe("instruct");
    expect(prototype.behaviourIntent).toBe("warn immediately and stop movement");
    expect(prototype.visibleAction).toBe("The colleague stops and follows the verbal instruction.");
    expect(prototype.visualLayerDecision).toContain("did not decide");
  });

  it("captures a frozen behaviour evidence run for the prototype scenarios", () => {
    const artifactPath = path.join(
      __dirname,
      "../../../docs/validation/artifacts/behaviour-evidence-run-001.json"
    );

    expect(fs.existsSync(artifactPath)).toBe(true);

    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    expect(artifact.validationSession).toBe("behaviour-evidence-run-001");

    const scenarios = artifact.scenarios as Array<Record<string, unknown>>;
    expect(scenarios).toHaveLength(5);

    const kev = scenarios.find((scenario) => scenario.scenarioId === "kev-hard-hat-entry");
    expect(kev).toMatchObject({
      ciRoute: "demonstrate",
      behaviourIntent: expect.stringContaining("PPE"),
      visibleAction: expect.stringContaining("hard hat"),
      instructionRequired: false,
    });
  });
});
