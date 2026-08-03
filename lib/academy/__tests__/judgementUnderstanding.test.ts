import { describe, expect, it } from "@jest/globals";
import { AndyDigitalColleague } from "../AndyDigitalColleague";

describe("AJ-010 judgement understanding", () => {
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

  it("creates a judgement-understanding record for a why question", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("Why did you choose that recommendation?");

    expect(result.judgementUnderstanding).toBeDefined();
    expect(result.judgementUnderstanding?.questionBeingAnswered).toContain("Why");
    expect(result.judgementUnderstanding?.decisiveConsideration).toBeTruthy();
  });

  it("answers why questions naturally without mentioning internal machinery", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("Why did you choose that recommendation?");

    expect(result.answer).toContain("What persuaded me");
    expect(result.answer).not.toContain("deliberation record");
    expect(result.answer).not.toContain("engine");
  });

  it("answers alternatives questions with credible alternatives", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("What alternatives did you consider?");

    expect(result.answer).toMatch(/Treat the repository as sufficient|Improve governance/i);
    expect(result.answer).not.toContain("I recommend");
  });

  it("answers responsibility questions without inventing people", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("Who should become involved?");

    expect(result.answer).toMatch(/governance|ownership|evidence|responsibility/i);
  });

  it("answers success questions with observable criteria", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("How would you know it had succeeded?");

    expect(result.answer).toMatch(/worked|succeeded|governance|responsibility|evidence/i);
  });

  it("answers risk questions with relevant consequences", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("What happens if we ignore it?");

    expect(result.answer).toMatch(/confusion|uncertainty|risk|governance|ownership/i);
  });

  it("answers confidence questions with what would change it", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("How confident are you, and what would change your confidence?");

    expect(result.answer).toMatch(/confidence|would change|uncertainty|evidence/i);
  });

  it("answers changed-thinking questions by comparing past and current understanding", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runConstitutionalExamination(aj004Prompt);
    const result = colleague.runConstitutionalExamination("Has this conversation changed your thinking? If so, how?");

    expect(result.answer).toMatch(/unchanged|deepened|thinking|understanding/i);
  });
}
);