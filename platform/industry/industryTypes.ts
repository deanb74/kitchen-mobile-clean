/**
 * Helping Hand Industry Identity
 *
 * Every Digital Colleague belongs to an industry.
 * Industries provide language, terminology,
 * legislation, best practice and transferable wisdom.
 */

export type IndustryId =
  | "hospitality"
  | "construction"
  | "retail"
  | "healthcare"
  | "education"
  | "manufacturing"
  | "logistics"
  | "office"
  | "other";

export interface Industry {
  id: IndustryId;
  name: string;
  description: string;
}