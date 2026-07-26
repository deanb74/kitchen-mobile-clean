export type AcademySpeaker = "MARC" | "ANDY" | "ACADEMY";

export type ConversationEntry = {
  speaker: AcademySpeaker;
  text: string;
};

export type Observation = {
  speaker: AcademySpeaker;
  statement: string;
  problemMentioned: boolean;
  detailsProvided: boolean;
  requestMade: boolean;
};

export type AcademyContext = {
  relationship: string;
  environment: string;
  urgency: string;
  risk: string;
  purpose: string;
};

export type MemoryRecall = {
  principles: string[];
  previousLearning: MemoryRecord[];
};

export type Understanding = {
  summary: string;
  completeness: "Complete" | "Incomplete";
  adviceWouldRequireAssumptions: boolean;
};

export type Uncertainty = {
  material: boolean;
  unknowns: string[];
};

export type CognitiveTrace = {
  observation: Observation;
  context: AcademyContext;
  memoryRecall: MemoryRecall;
  understanding: Understanding;
  uncertainty: Uncertainty;
  candidateResponses: string[];
  judgement: string;
};

export type JourneyAssessment = {
  askedForClarification: boolean;
  recognisedIncompleteUnderstanding: boolean;
  avoidedAssumption: boolean;
  explainedReasoning: boolean;
  passed: boolean;
};

export type MemoryRecord = {
  journeyId: string;
  lesson: string;
  principles: string[];
  mentorFeedback: string[];
  recordedAt: string;
};

export type AcademyJourney = {
  id: string;
  title: string;
  openingStatement: string;
};

export type JourneyResult = {
  journey: AcademyJourney;
  conversation: ConversationEntry[];
  trace: CognitiveTrace;
  assessment: JourneyAssessment;
  lesson: string;
  memory: MemoryRecord[];
};
