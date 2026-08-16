export type ConceptStatus =
  | "candidate"
  | "validated"
  | "core-principle"
  | "deprecated";

export type EvidenceLevel =
  | "candidate"
  | "single-source"
  | "multi-source"
  | "constitutional";

// Alias for use in write guard without importing the full Concept interface.
export type ConceptEvidenceLevel = EvidenceLevel;

export type ConceptScope =
  | "universal"
  | "helping-hand"
  | "professional";

export type ConceptOwner =
  | "Helping Hand Constitution"
  | "Helping Hand Academy"
  | "Helping Hand"
  | "Hospitality HQ"
  | "Healthcare HQ"
  | "Construction HQ"
  | string;

export type ConceptInheritance =
  | "all"
  | "helping-hand"
  | "hospitality"
  | "healthcare"
  | "construction"
  | string;

export interface ConceptSource {
  documentPath: string;
  heading?: string;
  excerpt?: string;
}

export interface ConceptExample {
  description: string;
  source?: string;
}

export interface Concept {
  id: string;
  name: string;
  aliases: string[];

  definition: string;

  status: ConceptStatus;
  evidenceLevel: EvidenceLevel;
  scope: ConceptScope;

  owner: ConceptOwner;
  inheritsTo: ConceptInheritance[];

  relatedConceptIds: string[];
  sources: ConceptSource[];
  examples: ConceptExample[];

  createdAt: string;
  updatedAt: string;

  createdBy: string;
  confidence?: number;
  /** Set only on changeIntent: "reinforce" — not on update, supersede, or retire. Edit ≠ confirmation. */
  lastReinforcedAt?: string;
  /** Governance record IDs of proposals that questioned this concept. A challenge signals review, not incorrectness. */
  challengedBy?: string[];
}