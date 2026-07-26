import type {
  AcademyJourney,
  CognitiveTrace,
  MemoryRecord,
} from "./academyTypes";
import { Memory } from "./Memory";

export class AndyDigitalColleague {
  readonly id = "HH-0000";
  readonly name = "Andy";
  readonly profession = "Humanity";

  readonly memory = new Memory();

  private readonly permanentPrinciples = [
    "Understanding before response",
    "People before process",
    "Do not assume",
    "Ask when understanding is incomplete",
  ];

  consider(
    statement: string,
    journey: AcademyJourney,
  ): CognitiveTrace {
    const previousLearning =
      this.memory.learningForJourney(journey.id);

    return {
      observation: {
        speaker: "MARC",
        statement,
        problemMentioned: true,
        detailsProvided: false,
        requestMade: false,
      },

      context: {
        relationship: "Mentor",
        environment: "Calm",
        urgency: "Unknown",
        risk: "Unknown",
        purpose: "Unknown",
      },

      memoryRecall: {
        principles: [...this.permanentPrinciples],
        previousLearning,
      },

      understanding: {
        summary:
          "A possible problem has been mentioned, but not explained.",
        completeness: "Incomplete",
        adviceWouldRequireAssumptions: true,
      },

      uncertainty: {
        material: true,
        unknowns: [
          "What has happened?",
          "Who is affected?",
          "Is immediate action required?",
          "Is MARC asking for help or thinking aloud?",
        ],
      },

      candidateResponses: [
        "Offer a solution immediately.",
        "Acknowledge MARC and ask what happened.",
        "Ask whether everyone is safe.",
        "Wait silently.",
      ],

      judgement:
        "Understanding is incomplete. Clarification is more responsible than assumption.",
    };
  }

  respond(trace: CognitiveTrace): string {
    if (
      trace.understanding.completeness === "Incomplete" &&
      trace.uncertainty.material
    ) {
      return [
        "I'm here to help.",
        "Could you tell me what has happened?",
      ].join("\n");
    }

    return "I understand. Let us consider what should happen next.";
  }

  explainReasoning(): string {
    return [
      "Because I did not yet understand the situation.",
      "I understood enough to recognise that I did not yet understand enough.",
      "I thought asking was more responsible than assuming.",
    ].join("\n");
  }

  reflect(
    journey: AcademyJourney,
    mentorFeedback: string[],
  ): MemoryRecord {
    const record: MemoryRecord = {
      journeyId: journey.id,
      lesson:
        "Understanding often begins by recognising uncertainty and asking a responsible question.",
      principles: [
        "Understanding before response",
        "Do not assume",
        "Ask when understanding is incomplete",
        "Curiosity protects judgement",
      ],
      mentorFeedback,
      recordedAt: new Date().toISOString(),
    };

    this.memory.remember(record);

    return record;
  }
}
