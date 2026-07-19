export type DigitalColleagueIdentity = {
  id: string;
  name: string;
  profession: string;
  organisationId?: string;
  venueId?: string;
};

export type KnowledgeLevel =
  | "venue"
  | "organisation"
  | "profession"
  | "helping-hand";

export type ConnectionState = "online" | "offline";

export type KnowledgeQuestion = {
  id: string;
  question: string;
  colleague: DigitalColleagueIdentity;
  context?: Record<string, unknown>;
  createdAt: string;
};

export type KnowledgeAnswer = {
  questionId: string;
  answer: string;
  sourceLevel: KnowledgeLevel;
  confidence?: number;
  approvedAt?: string;
  version?: string;
};
