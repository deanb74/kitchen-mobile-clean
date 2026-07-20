import type { VenueKnowledgeProfile } from "./venueKnowledgeProfile";
import type {
  KnowledgeApplicabilityTags,
  TaggedKnowledgePackage,
} from "../packages/taggedKnowledgePackage";

export interface ApplicabilityDecision {
  applicable: boolean;
  reasons: string[];
}

const normalise = (value: string): string =>
  value.trim().toLowerCase().replace(/[_\s]+/g, "-");

const normaliseMany = (values: string[] = []): string[] =>
  values.map(normalise);

const overlaps = (
  knowledgeValues: string[] | undefined,
  venueValues: string[],
): boolean => {
  if (!knowledgeValues || knowledgeValues.length === 0) {
    return true;
  }

  const required = normaliseMany(knowledgeValues);
  const available = new Set(normaliseMany(venueValues));

  return required.some((value) => available.has(value));
};

/**
 * A broad knowledge region may apply to a more specific venue region.
 *
 * Examples:
 * - Knowledge "uk" applies to venue "uk-england"
 * - Knowledge "uk-england" applies to venue "uk-england-yorkshire"
 * - Knowledge "uk-england" does not apply to venue "uk-scotland"
 */
const regionApplies = (
  knowledgeRegions: string[] | undefined,
  venueRegion: string,
): boolean => {
  if (!knowledgeRegions || knowledgeRegions.length === 0) {
    return true;
  }

  const venue = normalise(venueRegion);

  return normaliseMany(knowledgeRegions).some(
    (knowledgeRegion) =>
      venue === knowledgeRegion ||
      venue.startsWith(`${knowledgeRegion}-`),
  );
};

const checkDimension = (
  label: string,
  knowledgeValues: string[] | undefined,
  venueValues: string[],
  reasons: string[],
): boolean => {
  const matches = overlaps(knowledgeValues, venueValues);

  if (!matches) {
    reasons.push(`No matching ${label}.`);
  }

  return matches;
};

export const evaluateKnowledgeApplicability = (
  knowledge: TaggedKnowledgePackage,
  venue: VenueKnowledgeProfile,
): ApplicabilityDecision => {
  const reasons: string[] = [];
  const tags: KnowledgeApplicabilityTags = knowledge.tags;

  if (knowledge.status !== "approved") {
    reasons.push(`Knowledge status is "${knowledge.status}", not "approved".`);
  }

  const professionMatches = checkDimension(
    "profession",
    tags.professions,
    venue.professions,
    reasons,
  );

  const regionMatches = regionApplies(tags.regions, venue.region);

  if (!regionMatches) {
    reasons.push("Knowledge does not apply to the venue region.");
  }

  const venueTypeMatches = checkDimension(
    "venue type",
    tags.venueTypes,
    venue.venueTypes,
    reasons,
  );

  const departmentMatches = checkDimension(
    "department",
    tags.departments,
    venue.departments,
    reasons,
  );

  const equipmentMatches = checkDimension(
    "equipment",
    tags.equipment,
    venue.equipment,
    reasons,
  );

  const applicable =
    knowledge.status === "approved" &&
    professionMatches &&
    regionMatches &&
    venueTypeMatches &&
    departmentMatches &&
    equipmentMatches;

  if (applicable) {
    reasons.push("Knowledge is relevant to this venue.");
  }

  return {
    applicable,
    reasons,
  };
};

export const isKnowledgeApplicable = (
  knowledge: TaggedKnowledgePackage,
  venue: VenueKnowledgeProfile,
): boolean => evaluateKnowledgeApplicability(knowledge, venue).applicable;
