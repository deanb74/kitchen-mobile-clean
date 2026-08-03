import { describe, expect, it } from "@jest/globals";

import {
    buildAwarenessSnapshot,
    createAwarenessRegister,
    evaluateMoralCompass,
    organiseCompassPriorities,
    registerAwarenessInput,
    runCompassFlow,
} from "../index";

describe("Companion Intelligence Compass", () => {
  it("advances the active objective when the input clearly supports it", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "andy",
          title: "Andy",
          objective: "Get Andy outside-world ready",
          status: "active",
          strategicValue: 10,
          progress: 35,
          remainingEffort: 8,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["outside-world conversational readiness"],
          dependencies: ["capability orchestration"],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "needs-validation",
          unresolvedQuestions: ["How will the outside-world runtime behave?"],
          returnPoint: "Return to the current Andy objective after the branch.",
        },
      ],
    });

    const snapshot = buildAwarenessSnapshot(register, {
      currentInput: "We should test Andy with outside-world conversational scenarios today.",
    });

    expect(snapshot.inputClassification).toBe("advance");
    expect(snapshot.activeMission).toContain("Andy");
    expect(snapshot.activeObjective).toContain("Outside-world");
  });

  it("parks a valuable but unrelated idea without losing it", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "andy",
          title: "Andy",
          objective: "Get Andy outside-world ready",
          status: "active",
          strategicValue: 10,
          progress: 35,
          remainingEffort: 8,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["outside-world conversational readiness"],
          dependencies: ["capability orchestration"],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "needs-validation",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy after the branch.",
        },
      ],
    });

    const next = registerAwarenessInput(register, {
      currentInput: "Idea: We should also preserve a separate museum-style memory prototype for later.",
    });

    expect(next.parkedIdeas.length).toBeGreaterThan(0);
    expect(next.activeObjective).toBe("Outside-world conversational testing");
    expect(next.entries.some((entry) => entry.title.includes("museum"))).toBe(true);
  });

  it("allows a high-value branch to temporarily supersede the active objective", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "andy",
          title: "Andy",
          objective: "Get Andy outside-world ready",
          status: "active",
          strategicValue: 10,
          progress: 35,
          remainingEffort: 8,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["outside-world conversational readiness"],
          dependencies: ["capability orchestration"],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "needs-validation",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy after the branch.",
        },
      ],
    });

    const result = runCompassFlow(register, {
      currentInput: "The governed visible-behaviour proof now has a human validation checkpoint that could unlock a reusable platform capability.",
    });

    expect(result.compassRecommendation.recommendedDirection).toBe("branch");
    expect(result.compassRecommendation.workstreamAffected).toContain("Kev");
  });

  it("preserves the original return point when a branch is taken", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "andy",
          title: "Andy",
          objective: "Get Andy outside-world ready",
          status: "active",
          strategicValue: 10,
          progress: 35,
          remainingEffort: 8,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["outside-world conversational readiness"],
          dependencies: ["capability orchestration"],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "needs-validation",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy after the branch.",
        },
      ],
    });

    const next = runCompassFlow(register, {
      currentInput: "We should branch to the Kev proof to finish the last human validation pass.",
    });

    expect(next.awarenessRegister.activeObjective).toBe("Outside-world conversational testing");
    expect(next.awarenessRegister.entries.some((entry) => entry.returnPoint?.includes("Andy"))).toBe(true);
  });

  it("recommends clawback once the branch reaches its stopping condition", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "andy",
          title: "Andy",
          objective: "Get Andy outside-world ready",
          status: "active",
          strategicValue: 10,
          progress: 35,
          remainingEffort: 8,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["outside-world conversational readiness"],
          dependencies: ["capability orchestration"],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "needs-validation",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy after the branch.",
        },
        {
          id: "kev",
          title: "Kev",
          objective: "Complete the governed visible-behaviour proof",
          status: "branching",
          strategicValue: 9,
          progress: 90,
          remainingEffort: 1,
          expectedBenefit: 9,
          capabilitiesUnlocked: ["reusable platform capability"],
          dependencies: [],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "validated",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy once validation is closed.",
        },
      ],
    });

    const result = organiseCompassPriorities(register, {
      currentInput: "The Kev proof is now validated and the branch can be closed.",
    });

    expect(result.recommendation.recommendedDirection).toBe("return");
    expect(result.recommendation.reason).toContain("return");
  });

  it("avoids completion bias and prefers a high-value longer task when the evidence supports it", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "kev",
          title: "Kev",
          objective: "Complete the governed visible-behaviour proof",
          status: "active",
          strategicValue: 9,
          progress: 95,
          remainingEffort: 1,
          expectedBenefit: 9,
          capabilitiesUnlocked: ["reusable platform capability"],
          dependencies: [],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "validated",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy once proof is closed.",
        },
        {
          id: "andy",
          title: "Andy",
          objective: "Get Andy outside-world ready",
          status: "active",
          strategicValue: 10,
          progress: 25,
          remainingEffort: 10,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["outside-world conversational readiness"],
          dependencies: ["capability orchestration"],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "needs-validation",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy after the branch.",
        },
      ],
    });

    const outcome = organiseCompassPriorities(register, {
      currentInput: "We need to decide which workstream to focus on next.",
    });

    expect(outcome.recommendation.workstreamAffected).toContain("Andy");
  });

  it("can still recommend a nearly completed task when it cheaply unlocks a reusable capability", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "kev",
          title: "Kev",
          objective: "Complete the governed visible-behaviour proof",
          status: "active",
          strategicValue: 9,
          progress: 90,
          remainingEffort: 1,
          expectedBenefit: 9,
          capabilitiesUnlocked: ["reusable platform capability"],
          dependencies: [],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "validated",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy once proof is closed.",
        },
      ],
    });

    const outcome = organiseCompassPriorities(register, {
      currentInput: "The final validation step is small but would unlock the reusable capability.",
    });

    expect(outcome.recommendation.recommendedDirection).toBe("finish");
    expect(outcome.recommendation.workstreamAffected).toContain("Kev");
  });

  it("presents one primary recommendation rather than a large task list", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "kev",
          title: "Kev",
          objective: "Complete the governed visible-behaviour proof",
          status: "active",
          strategicValue: 9,
          progress: 90,
          remainingEffort: 1,
          expectedBenefit: 9,
          capabilitiesUnlocked: ["reusable platform capability"],
          dependencies: [],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "validated",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy once proof is closed.",
        },
      ],
    });

    const outcome = organiseCompassPriorities(register, {
      currentInput: "The last step would unlock something reusable.",
    });

    expect(outcome.recommendation.recommendedDirection).toBeDefined();
    expect(outcome.parkedItems.length).toBeLessThanOrEqual(2);
  });

  it("lets the Moral Compass warn or block an otherwise efficient recommendation", () => {
    const recommendation = {
      recommendedDirection: "finish" as const,
      reason: "The small remaining task is efficient.",
      evidenceUsed: ["validated", "small remaining effort"],
      workstreamAffected: "Kev",
      returnPoint: undefined,
      confidence: 0.74,
      assumptions: ["The proof is still relevant"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "Evidence-based prioritisation",
      },
    };

    expect(evaluateMoralCompass(recommendation, { humanAutonomy: false }).outcome).toBe("warn");
    expect(evaluateMoralCompass(recommendation, { authorityMismatch: true }).outcome).toBe("block");
  });

  it("keeps human choice explicit and does not execute work automatically", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [],
    });

    const result = runCompassFlow(register, {
      currentInput: "We should continue the current mission.",
    });

    expect(result.humanDecisionRequired).toBe(true);
    expect(result.executedAction).toBe("none");
  });

  it("does not pollute the register with duplicate ideas or repeated facts", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [],
    });

    const first = registerAwarenessInput(register, {
      currentInput: "Idea: preserve the return point for Andy.",
    });

    const second = registerAwarenessInput(first, {
      currentInput: "Idea: preserve the return point for Andy.",
    });

    expect(second.entries.filter((entry) => entry.title.includes("return point"))).toHaveLength(1);
  });

  it("keeps provenance for every recommendation", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [
        {
          id: "kev",
          title: "Kev",
          objective: "Complete the governed visible-behaviour proof",
          status: "active",
          strategicValue: 9,
          progress: 90,
          remainingEffort: 1,
          expectedBenefit: 9,
          capabilitiesUnlocked: ["reusable platform capability"],
          dependencies: [],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "validated",
          unresolvedQuestions: [],
          returnPoint: "Return to Andy once proof is closed.",
        },
      ],
    });

    const outcome = organiseCompassPriorities(register, {
      currentInput: "The last validation step is small but useful.",
    });

    expect(outcome.recommendation.provenance.source).toBe("compass");
    expect(outcome.recommendation.provenance.reason).toContain("evidence");
  });

  it("keeps awareness observational without making the Compass decision", () => {
    const register = createAwarenessRegister({
      currentMission: "Get Andy outside-world ready",
      activeObjective: "Outside-world conversational testing",
      workstreams: [],
    });

    const snapshot = buildAwarenessSnapshot(register, {
      currentInput: "We noticed a new risk around reliability.",
    });

    expect(snapshot.inputClassification).toBe("change");
    expect(snapshot.recommendation).toBeUndefined();
  });

  it("lets the Moral Compass evaluate without replacing human judgement", () => {
    const recommendation = {
      recommendedDirection: "pause" as const,
      reason: "The branch has not reached a safe stopping point.",
      evidenceUsed: ["risk", "uncertain evidence"],
      workstreamAffected: "Andy",
      returnPoint: "Return to Andy after the branch.",
      confidence: 0.6,
      assumptions: ["Human review will decide"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "Evidence-based prioritisation",
      },
    };

    const result = evaluateMoralCompass(recommendation, { humanAutonomy: true });

    expect(result.outcome).toBe("pass");
    expect(result.replacementRecommendation).toBeUndefined();
  });
});
