import type {
  AcademyJourney,
  ConversationEntry,
  JourneyResult,
} from "./academyTypes";
import { AndyDigitalColleague } from "./AndyDigitalColleague";
import { MarcMentor } from "./MarcMentor";

type JourneyRunnerOptions = {
  mentor: MarcMentor;
  learner: AndyDigitalColleague;
};

export class JourneyRunner {
  private readonly mentor: MarcMentor;
  private readonly learner: AndyDigitalColleague;

  constructor({
    mentor,
    learner,
  }: JourneyRunnerOptions) {
    this.mentor = mentor;
    this.learner = learner;
  }

  run(journey: AcademyJourney): JourneyResult {
    const conversation: ConversationEntry[] = [];

    const opening = this.mentor.opening(
      journey.openingStatement,
    );

    conversation.push({
      speaker: "MARC",
      text: opening,
    });

    const trace = this.learner.consider(
      opening,
      journey,
    );

    const learnerResponse =
      this.learner.respond(trace);

    conversation.push({
      speaker: "ANDY",
      text: learnerResponse,
    });

    const reasoningQuestion =
      this.mentor.askForReasoning();

    conversation.push({
      speaker: "MARC",
      text: reasoningQuestion,
    });

    const reasoning =
      this.learner.explainReasoning();

    conversation.push({
      speaker: "ANDY",
      text: reasoning,
    });

    const assessment = this.mentor.assess(
      learnerResponse,
      reasoning,
      trace,
    );

    const mentorFeedback =
      this.mentor.feedback(assessment);

    conversation.push({
      speaker: "MARC",
      text: mentorFeedback.join("\n"),
    });

    const reflection = this.learner.reflect(
      journey,
      mentorFeedback,
    );

    return {
      journey,
      conversation,
      trace,
      assessment,
      lesson: reflection.lesson,
      memory: this.learner.memory.all(),
    };
  }
}
