import { describe, expect, it } from "@jest/globals";
import { AndyDigitalColleague } from "../AndyDigitalColleague";

describe("AJ-011 reflection", () => {
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

  it("runs reflection after judgement and records confirmed learning", () => {
    const colleague = new AndyDigitalColleague();
    const result = colleague.runConstitutionalExamination(aj004Prompt);
    const reflection = colleague.getLastReflection();

    expect(result.deliberation).toBeDefined();
    expect(reflection).toBeDefined();
    expect(reflection?.investigationId).toBe(result.deliberation?.investigationId);
    expect(reflection?.confirmedLearning.length).toBeGreaterThan(0);
    expect(reflection?.changedUnderstanding.length).toBeGreaterThan(0);
    expect(reflection?.noLearning).toBe(false);
    expect(colleague.memory.all().some((record) => record.lesson.includes("reflection") || record.lesson.includes("learning"))).toBe(true);
  });

  it("does not overwrite judgement and keeps unresolved questions open", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const followUp = colleague.runConstitutionalExamination("Why did you choose that recommendation?");
    const reflection = colleague.getLastReflection();

    expect(followUp.judgementUnderstanding).toBeDefined();
    expect(reflection).toBeDefined();
    expect(reflection?.changedUnderstanding).toEqual(expect.any(Array));
    expect(reflection?.unresolvedUncertainty).toEqual(expect.any(Array));
    expect(reflection?.futureInvestigation).toEqual(expect.any(Array));
  });

  it("keeps ordinary conversations unchanged", () => {
    const colleague = new AndyDigitalColleague();
    const result = colleague.runConstitutionalExamination("Hello Andy.");

    expect(result.retrievalActive).toBe(false);
    expect(colleague.getLastReflection()).toBeNull();
  });
});
