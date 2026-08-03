import { describe, expect, it } from "@jest/globals";
import { AndyDigitalColleague } from "../AndyDigitalColleague";

describe("AJ-009 deliberation", () => {
  const aj004Prompt = `Andy...

I'd like to thank you.

We've spent a long time preparing Helping Hand.

The Constitution is now frozen.

The Board has been formed.

The organisational structure exists.

You have inherited Memory, Understanding, Awareness, the Compass, the Moral Compass and Judgement.

Today I don't want to test you.

I simply want to have a conversation.

Please take your time.

Review anything you believe you need to review.

Then tell me...

What do you think Helping Hand needs next?`;

  it("creates a deliberation record after investigation completion", () => {
    const colleague = new AndyDigitalColleague();
    const result = colleague.runConstitutionalExamination(aj004Prompt);

    expect(result.deliberation).toBeDefined();
    expect(result.deliberation?.recommendationReady).toBe(true);
    expect(result.deliberation?.alternativesConsidered.length).toBeGreaterThan(0);
    expect(result.deliberation?.tradeOffs.length).toBeGreaterThan(0);
    expect(result.deliberation?.risks.length).toBeGreaterThan(0);
    expect(result.deliberation?.expectedBenefits.length).toBeGreaterThan(0);
    expect(result.reasoningTrace.some((line) => line.includes("Deliberation"))).toBe(true);
  });

  it("uses deliberation to answer a later why question instead of rerunning investigation", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const explanation = colleague.runConstitutionalExamination("Why did you choose that recommendation?");

    expect(explanation.answer).toContain("deliberation");
    expect(explanation.answer).toContain("recommendation");
    expect(explanation.reasoningTrace.some((line) => line.includes("Deliberation explanation"))).toBe(true);
  });

  it("does not produce a recommendation when deliberation is not ready", () => {
    const colleague = new AndyDigitalColleague();

    (colleague as unknown as { buildStructuredUnderstandingPlan: () => any }).buildStructuredUnderstandingPlan = () => ({
      task: "review/recommend",
      subQuestions: ["What recommendation can I make?"],
      retrievalPlan: [],
      selectedDocuments: [],
      rejectedDocuments: [],
      evidenceQuality: [],
      known: [],
      unknown: [],
      recommendation: "Proceed cautiously.",
      prioritizedDocuments: [],
      investigationResults: [
        {
          subQuestion: "What recommendation can I make?",
          status: "answered",
          evidenceSummary: "Recommendation evidence is available.",
          conclusion: "A recommendation is possible.",
        },
      ],
      investigationComplete: true,
      investigationCompletion: {
        complete: true,
        completedQuestions: 1,
        totalQuestions: 1,
        unfinishedQuestions: [],
        unsupportedQuestions: [],
        contradictoryQuestions: [],
        recommendationAllowed: true,
        completionReason: "All planned questions reached a valid final state.",
      },
      deliberationRecord: null,
    });

    const result = colleague.runConstitutionalExamination("Tell me what Helping Hand needs next.");

    expect(result.answer).not.toContain("I recommend");
    expect(result.answer).toContain("deliberate");
  });
});
