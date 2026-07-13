export type KnowledgeLevel =
  | "digital-colleague"
  | "organisation-hq"
  | "profession-hq"
  | "helping-hand-hq";

export type KnowledgeKind =
  | "local"
  | "organisational"
  | "professional"
  | "cross-profession";

export interface KnowledgeOrigin {
  digitalColleagueId: string;
  profession: string;
  organisationId?: string;
  workplaceId?: string;
}

export interface CandidateUnderstanding {
  id: string;
  summary: string;
  kind: KnowledgeKind;
  origin: KnowledgeOrigin;
  containsSensitiveLocalContext: boolean;
}

export interface KnowledgeRoute {
  candidateId: string;
  route: KnowledgeLevel[];
  destination: KnowledgeLevel;
  allowed: boolean;
  reason: string;
}