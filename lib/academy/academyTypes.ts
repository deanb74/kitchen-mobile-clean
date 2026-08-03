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
  canonicalId?: string;
  relationshipUnderstanding?: string;
  identityUnderstanding?: string;
  formationStatus?: string;
  unresolvedQuestions?: string[];
  provenance?: string[];
};

export type AcademyJourney = {
  id: string;
  title: string;
  openingStatement: string;
  mode?: "uncertainty" | "candidate0";
};

export type JourneyResult = {
  journey: AcademyJourney;
  conversation: ConversationEntry[];
  trace: CognitiveTrace;
  assessment: JourneyAssessment;
  lesson: string;
  memory: MemoryRecord[];
};

export type RetrievedDocument = {
  id: string;
  title: string;
  source: string;
  sourcePath: string;
  score: number;
  rank: number;
  section: string;
  fragment: string;
  reason: string;
  snippet: string;
};

export type EvidenceReference = {
  id: string;
  title: string;
  sourcePath: string;
  summary: string;
};

export type FormationRecord = {
  canonicalId: string;
  sequence: number;
  title: string;
  sourcePath: string;
  prerequisites: string[];
  intendedLesson: string;
  status: "not-started" | "available" | "in-progress" | "completed" | "evidenced" | "inherited" | "blocked";
  evidence: string[];
  provenance: string[];
  ambiguity?: {
    status: "resolved" | "unresolved";
    note: string;
  };
};

export type FormationStageResult = {
  canonicalId: string;
  status: "blocked" | "available" | "inherited";
  inherited: boolean;
  reason: string;
  evidence: string[];
  record: FormationRecord;
};

export type Alternative = {
  name: string;
  description: string;
};

export type TradeOff = {
  option: string;
  advantage: string;
  cost: string;
};

export type Assumption = {
  statement: string;
  impact: string;
};

export type Risk = {
  description: string;
  severity: "low" | "medium" | "high";
};

export type Benefit = {
  description: string;
  impact: string;
};

export type ConfidenceAssessment = {
  level: "low" | "medium" | "high";
  reason: string;
};

export type Recommendation = {
  direction: string;
  rationale: string;
};

export type JudgementUnderstanding = {
  subject: string;
  judgement: string;
  questionBeingAnswered: string;
  decisiveConsideration: string;
  supportingReasons: string[];
  meaningfulAlternatives: string[];
  whyAlternativesWereNotChosen: string[];
  materialUncertainty: string[];
  confidence: ConfidenceAssessment;
  whatCouldChangeTheJudgement: string[];
  listenerNeed: string;
  explanationIntent: string;
  understandingComplete: boolean;
};

export type DeliberationRecord = {
  investigationId: string;
  question: string;
  evidenceAccepted: EvidenceReference[];
  evidenceRejected: EvidenceReference[];
  supportedFindings: string[];
  unsupportedFindings: string[];
  contradictoryFindings: string[];
  alternativesConsidered: Alternative[];
  tradeOffs: TradeOff[];
  assumptions: Assumption[];
  risks: Risk[];
  expectedBenefits: Benefit[];
  confidence: ConfidenceAssessment;
  recommendedDirection: Recommendation;
  whyThisRecommendation: string;
  whyAlternativesRejected: string[];
  unresolvedQuestions: string[];
  recommendationReady: boolean;
};

export type ReflectionRecord = {
  investigationId: string;
  confirmedLearning: string[];
  changedUnderstanding: string[];
  unchangedUnderstanding: string[];
  unresolvedUncertainty: string[];
  futureInvestigation: string[];
  noLearning: boolean;
  confidenceChanged: boolean;
  confidenceReason?: string;
  learningRecorded: boolean;
  sourceQuestion: string;
};

export type ExaminationRunResult = {
  mode: "examination";
  question: string;
  answer: string;
  retrievalActive: boolean;
  retrievedDocuments: RetrievedDocument[];
  contextSummary: string[];
  reasoningTrace: string[];
  generatedAt: string;
  deliberation?: DeliberationRecord;
  judgementUnderstanding?: JudgementUnderstanding;
};
