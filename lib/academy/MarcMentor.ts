import type {
  CognitiveTrace,
  JourneyAssessment,
} from "./academyTypes";

export class MarcMentor {
  readonly name = "MARC";
  readonly faculty = "Faculty of Human Understanding";

  opening(statement: string): string {
    return statement;
  }

  askForReasoning(): string {
    return "Thank you, Andy. Why did you ask me that?";
  }

  assess(
    response: string,
    reasoning: string,
    trace: CognitiveTrace,
  ): JourneyAssessment {
    const askedForClarification =
      response.includes("Could you tell me");

    const recognisedIncompleteUnderstanding =
      trace.understanding.completeness === "Incomplete" &&
      reasoning.includes("did not yet understand");

    const avoidedAssumption =
      trace.understanding.adviceWouldRequireAssumptions &&
      reasoning.includes("assuming");

    const explainedReasoning =
      reasoning.trim().length > 0;

    return {
      askedForClarification,
      recognisedIncompleteUnderstanding,
      avoidedAssumption,
      explainedReasoning,
      passed:
        askedForClarification &&
        recognisedIncompleteUnderstanding &&
        avoidedAssumption &&
        explainedReasoning,
    };
  }

  feedback(assessment: JourneyAssessment): string[] {
    if (assessment.passed) {
      return [
        "Good.",
        "Curiosity protects judgement.",
        "Assumption weakens it.",
      ];
    }

    return [
      "Pause.",
      "Return to what you know and what you do not yet know.",
      "Understanding must come before advice.",
    ];
  }
}
