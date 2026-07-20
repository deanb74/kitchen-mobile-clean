export type VenueProfileFactSource =
  | "annie-observation"
  | "annie-conversation"
  | "manager-confirmation"
  | "setup-wizard"
  | "system-import";

export type VenueProfileFactConfidence =
  | "observed"
  | "reported"
  | "confirmed";

export interface VenueProfileFact {
  id: string;

  dimension:
    | "profession"
    | "region"
    | "venue-type"
    | "department"
    | "equipment"
    | "capability";

  value: string;

  source: VenueProfileFactSource;
  confidence: VenueProfileFactConfidence;

  observedAt: string;
  confirmedAt?: string;

  active: boolean;
}

export interface VenueKnowledgeProfile {
  venueId: string;

  professions: string[];
  region: string;
  venueTypes: string[];

  departments: string[];
  equipment: string[];
  capabilities: string[];

  /**
   * The evidence from which the current profile was assembled.
   * Annie adds facts as she learns how the venue works.
   */
  facts: VenueProfileFact[];

  createdAt: string;
  updatedAt: string;
}
