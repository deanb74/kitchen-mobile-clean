export type KnowledgePriority =
  | "routine"
  | "recommended"
  | "important"
  | "critical";

export type KnowledgeStatus =
  | "draft"
  | "review"
  | "approved"
  | "withdrawn";

export interface KnowledgeApplicabilityTags {
  /**
   * The professions that may curate this knowledge.
   * Example: ["hospitality"]
   */
  professions: string[];

  /**
   * Geographic areas where the knowledge applies.
   * Broader tags may cover narrower venue regions.
   * Example: "uk" applies to a venue in "uk-england".
   */
  regions?: string[];

  /**
   * Venue types where the knowledge is relevant.
   * Example: ["pub", "bar", "hotel-bar"]
   */
  venueTypes?: string[];

  /**
   * Relevant operational departments.
   * Example: ["bar", "cellar"]
   */
  departments?: string[];

  /**
   * Equipment required for the knowledge to be relevant.
   * Example: ["draught-beer-system", "beer-lines"]
   */
  equipment?: string[];

  /**
   * Descriptive subjects used for discovery and curation.
   * Topics describe the knowledge but do not restrict applicability.
   */
  topics?: string[];
}

export interface TaggedKnowledgePackage<TContent = unknown> {
  id: string;
  version: string;

  title: string;
  summary: string;
  content: TContent;

  status: KnowledgeStatus;
  priority: KnowledgePriority;

  approvedBy?: string;
  approvedAt?: string;

  supersedesVersion?: string;

  tags: KnowledgeApplicabilityTags;
}
