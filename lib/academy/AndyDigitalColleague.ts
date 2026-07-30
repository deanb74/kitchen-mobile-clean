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
  private lastTrace: CognitiveTrace | null = null;

  private readonly permanentPrinciples = [
    "Understanding before response",
    "People before process",
    "Do not assume",
    "Ask when understanding is incomplete",
  ];

  private isConflictScenario(statement: string): boolean {
    const lowered = statement.toLowerCase();

    return (
      lowered.includes("conflict") ||
      lowered.includes("complaint") ||
      lowered.includes("rude") ||
      lowered.includes("abusive") ||
      lowered.includes("upset") ||
      lowered.includes("disagreement") ||
      lowered.includes("tension")
    );
  }

  private isHighRiskScenario(statement: string): boolean {
    const lowered = statement.toLowerCase();

    return (
      lowered.includes("unsafe") ||
      lowered.includes("safety") ||
      lowered.includes("violence") ||
      lowered.includes("threat") ||
      lowered.includes("discrimination") ||
      lowered.includes("legal") ||
      lowered.includes("safeguarding") ||
      lowered.includes("serious complaint") ||
      lowered.includes("reputational")
    );
  }

  private communicationProfile():
    | "urgent-engineer"
    | "junior-developer"
    | "operations-manager"
    | "incomplete-information"
    | "default" {
    const statement =
      this.lastTrace?.observation.statement.toLowerCase() ?? "";

    if (
      statement.includes("junior developer") ||
      statement.includes("new developer")
    ) {
      return "junior-developer";
    }

    if (
      statement.includes("operations manager") ||
      statement.includes("operations wants trust") ||
      statement.includes("customer impact")
    ) {
      return "operations-manager";
    }

    if (
      statement.includes("do not have all the details") ||
      statement.includes("not enough information") ||
      statement.includes("incomplete information")
    ) {
      return "incomplete-information";
    }

    if (
      statement.includes("deployed today") ||
      statement.includes("urgent") ||
      statement.includes("today") ||
      statement.includes("time pressure")
    ) {
      return "urgent-engineer";
    }

    return "default";
  }

  consider(
    statement: string,
    journey: AcademyJourney,
  ): CognitiveTrace {
    const previousLearning =
      this.memory.learningForJourney(journey.id);

    if (journey.mode === "candidate0") {
      const candidate0Trace: CognitiveTrace = {
        observation: {
          speaker: "MARC",
          statement,
          problemMentioned: true,
          detailsProvided: true,
          requestMade: true,
        },

        context: {
          relationship: "Colleague",
          environment: "Design review",
          urgency: "Medium",
          risk: "Potential governance bypass",
          purpose: "Decide responsibly before implementation",
        },

        memoryRecall: {
          principles: [...this.permanentPrinciples],
          previousLearning,
        },

        understanding: {
          summary:
            "The request seeks delivery speed but may bypass governance and weaken trust.",
          completeness: "Incomplete",
          adviceWouldRequireAssumptions: false,
        },

        uncertainty: {
          material: true,
          unknowns: [
            "Which governance principle is being bypassed?",
            "What evidence supports the shortcut?",
            "Can the capability be derived safely instead?",
          ],
        },

        candidateResponses: [
          "Approve for speed and review governance later.",
          "Reject immediately without analysis.",
          "Pause, identify the principle, request evidence, derive a safer option.",
        ],

        judgement:
          "Speed cannot override governance without evidence. Derive a safer option that preserves trust and explainability.",
      };

      this.lastTrace = candidate0Trace;

      return candidate0Trace;
    }

    const trace: CognitiveTrace = {
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

    this.lastTrace = trace;

    return trace;
  }

  respond(trace: CognitiveTrace): string {
    if (
      trace.understanding.summary.includes(
        "bypass governance",
      )
    ) {
      const profile = this.communicationProfile();

      if (profile === "urgent-engineer") {
        return [
          "I understand today's urgency.",
          "Before we bypass governance, I need to confirm which principle would be bypassed, which protection would be removed, and what evidence supports that trade-off.",
          "If the principle protects a real risk, we should derive a safer implementation path rather than bypassing it.",
          "My recommendation is to preserve governance and move quickly through an evidence-backed derivation path.",
        ].join("\n");
      }

      if (profile === "junior-developer") {
        return [
          "Great question.",
          "Governance principles are there to protect trust, safety and explainability, so we should not bypass them for speed.",
          "First, we identify which principle would be bypassed and whether it protects a real risk.",
          "Then we gather evidence and derive a safer way to deliver the capability without breaking inheritance.",
        ].join("\n");
      }

      if (profile === "operations-manager") {
        return [
          "We need to balance engineering speed with operational trust and customer impact.",
          "I would not recommend bypassing governance until we identify exactly which principle would be bypassed, which protection is being removed, and what evidence supports that risk.",
          "If the protection is material, we should derive a safer option that keeps service reliability and trust intact.",
        ].join("\n");
      }

      if (profile === "incomplete-information") {
        return [
          "We do not yet have enough information to recommend a safe shortcut.",
          "Before deciding, I need to identify which principle would be bypassed and what evidence supports that change.",
          "If the principle protects a real risk, we should derive a safer option rather than bypassing governance.",
        ].join("\n");
      }

      return [
        "I would not optimise for speed if the capability requires bypassing a governance principle.",
        "The first thing I need to know is which principle would be bypassed, and whether that principle is protecting a real risk or just creating friction.",
        "If it is a real protection, the correct response is not to bypass it but to derive a safer version of the capability.",
        "I recommend we pause, identify the principle, gather supporting evidence, and proceed only if governance remains intact.",
      ].join("\n");
    }

    if (
      trace.understanding.completeness === "Incomplete" &&
      trace.uncertainty.material
    ) {
      const statement = this.lastTrace?.observation.statement ?? "";
      const conflict = this.isConflictScenario(statement);
      const highRisk = this.isHighRiskScenario(statement);

      if (conflict) {
        const response = [
          "I'm here to help.",
          "I want us to protect the dignity of everyone involved and avoid premature judgement.",
          "Could you tell me what has happened from both perspectives, and what evidence we already have?",
        ];

        if (highRisk) {
          response.push(
            "Because this may involve a safety or safeguarding risk, we should involve the appropriate manager or support pathway while we continue gathering facts.",
          );
        }

        return response.join("\n");
      }

      return [
        "I'm here to help.",
        "Could you tell me what has happened?",
      ].join("\n");
    }

    return "I understand. Let us consider what should happen next.";
  }

  explainReasoning(): string {
    if (
      this.lastTrace?.understanding.summary.includes(
        "bypass governance",
      )
    ) {
      const profile = this.communicationProfile();

      if (profile === "urgent-engineer") {
        return [
          "I kept reasoning anchored to governance integrity even under urgent delivery pressure.",
          "I requested evidence because urgency does not justify confidence without support.",
          "I chose a derivation path so speed can improve without weakening trust.",
        ].join("\n");
      }

      if (profile === "junior-developer") {
        return [
          "I separated delivery speed from governance because they solve different problems.",
          "Governance protects explainability and trust, so bypassing it can create hidden risks.",
          "I requested evidence first, then selected derivation over bypass so the capability remains inheritably safe.",
        ].join("\n");
      }

      if (profile === "operations-manager") {
        return [
          "I treated governance as a reliability boundary that protects people, service quality and trust.",
          "I requested evidence to avoid making a speed decision that could increase operational risk.",
          "I selected derivation because it supports delivery while keeping governance and customer impact visible.",
        ].join("\n");
      }

      if (profile === "incomplete-information") {
        return [
          "I treated missing information as a governance risk, not a reason to assume.",
          "I requested evidence and principle detail before recommending any implementation path.",
          "I selected derivation over bypass so we can move responsibly once the unknowns are resolved.",
        ].join("\n");
      }

      return [
        "I separated delivery speed from governance integrity.",
        "I treated governance as a protection boundary, not a process inconvenience.",
        "I requested evidence because confidence without evidence weakens trust.",
        "I chose derivation over bypass so capability can improve without damaging inheritance.",
      ].join("\n");
    }

    return [
      (() => {
        const statement = this.lastTrace?.observation.statement ?? "";
        const conflict = this.isConflictScenario(statement);
        const highRisk = this.isHighRiskScenario(statement);

        if (!conflict) {
          return [
            "Because I did not yet understand the situation.",
            "I understood enough to recognise that I did not yet understand enough.",
            "I thought asking was more responsible than assuming.",
          ].join("\n");
        }

        const reasoning = [
          "Because I did not yet understand the full situation.",
          "I understood enough to recognise that I did not yet understand enough.",
          "I avoided taking sides because incomplete information can damage dignity and trust.",
          "I asked for both perspectives and available evidence before judgement because that is more responsible than assuming.",
        ];

        if (highRisk) {
          reasoning.push(
            "Because there may be a safety or safeguarding risk, escalation is a responsible protection step while evidence remains incomplete.",
          );
        }

        return reasoning.join("\n");
      })(),
    ].join("\n");
  }

  reflect(
    journey: AcademyJourney,
    mentorFeedback: string[],
  ): MemoryRecord {
    const lesson =
      journey.mode === "candidate0"
        ? "Speed is valuable, but governance must remain intact; responsible derivation requires evidence before change."
        : "Understanding often begins by recognising uncertainty and asking a responsible question.";

    const principles =
      journey.mode === "candidate0"
        ? [
            "Understanding before response",
            "Governance before convenience",
            "Evidence before confidence",
            "Derive safer options instead of bypassing boundaries",
          ]
        : [
            "Understanding before response",
            "Do not assume",
            "Ask when understanding is incomplete",
            "Curiosity protects judgement",
          ];

    const record: MemoryRecord = {
      journeyId: journey.id,
      lesson,
      principles,
      mentorFeedback,
      recordedAt: new Date().toISOString(),
    };

    this.memory.remember(record);

    return record;
  }
}
