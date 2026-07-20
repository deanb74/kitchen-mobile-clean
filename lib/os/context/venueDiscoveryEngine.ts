import type { VenueKnowledgeProfile } from "../knowledge/applicability";

export type VenueDiscoveryDimension =
  | "venue-type"
  | "operating-model"
  | "capability"
  | "department"
  | "area"
  | "equipment";

export type VenueDiscoveryObservationStatus =
  | "observed"
  | "reported"
  | "confirmed";

export interface VenueDiscoveryObservation {
  id: string;
  dimension: VenueDiscoveryDimension;
  value: string;
  status: VenueDiscoveryObservationStatus;
  source:
    | "walkaround"
    | "conversation"
    | "setup-wizard"
    | "manager";
  observedAt: string;
}

export interface VenueDiscoveryPrompt {
  id: string;
  triggeredBy: {
    dimension: VenueDiscoveryDimension;
    value: string;
  };
  prompt: string;
  priority: "now" | "soon" | "later";
  expectedDimensions: VenueDiscoveryDimension[];
  completed: boolean;
}

export interface VenueDiscoveryResult {
  observations: VenueDiscoveryObservation[];
  prompts: VenueDiscoveryPrompt[];
}

interface VenueDiscoveryRule {
  when: {
    dimension: VenueDiscoveryDimension;
    value: string;
  };
  prompts: Array<{
    id: string;
    prompt: string;
    priority: "now" | "soon" | "later";
    expectedDimensions: VenueDiscoveryDimension[];
  }>;
}

const normalise = (value: string): string =>
  value.trim().toLowerCase().replace(/[_\s]+/g, "-");

const VENUE_DISCOVERY_RULES: VenueDiscoveryRule[] = [
  {
    when: {
      dimension: "area",
      value: "commercial-kitchen",
    },
    prompts: [
      {
        id: "commercial-kitchen-equipment",
        prompt:
          "I noticed your commercial kitchen during our walkaround. Can you show me what equipment you have, please?",
        priority: "now",
        expectedDimensions: ["equipment"],
      },
    ],
  },
  {
    when: {
      dimension: "capability",
      value: "draught-beer-service",
    },
    prompts: [
      {
        id: "draught-beer-equipment",
        prompt:
          "I noticed that you serve draught beer. Can you show me the cellar and dispense equipment you use, please?",
        priority: "now",
        expectedDimensions: ["area", "equipment"],
      },
    ],
  },
  {
    when: {
      dimension: "area",
      value: "cellar",
    },
    prompts: [
      {
        id: "cellar-equipment",
        prompt:
          "I noticed your cellar. Can you show me the cooling and dispense equipment you have in here, please?",
        priority: "now",
        expectedDimensions: ["equipment"],
      },
    ],
  },
  {
    when: {
      dimension: "capability",
      value: "accommodation",
    },
    prompts: [
      {
        id: "accommodation-details",
        prompt:
          "I noticed that you offer accommodation. Can you show me the guest rooms and explain how housekeeping is managed, please?",
        priority: "soon",
        expectedDimensions: ["area", "department", "equipment"],
      },
    ],
  },
];

const createObservationId = (
  dimension: VenueDiscoveryDimension,
  value: string,
): string => `${dimension}:${normalise(value)}`;

export const createVenueDiscoveryObservation = (
  input: Omit<VenueDiscoveryObservation, "id">,
): VenueDiscoveryObservation => ({
  ...input,
  value: normalise(input.value),
  id: createObservationId(input.dimension, input.value),
});

export const getVenueDiscoveryPrompts = (
  observations: VenueDiscoveryObservation[],
): VenueDiscoveryPrompt[] => {
  const prompts = observations.flatMap((observation) => {
    const matchingRules = VENUE_DISCOVERY_RULES.filter(
      (rule) =>
        rule.when.dimension === observation.dimension &&
        rule.when.value === normalise(observation.value),
    );

    return matchingRules.flatMap((rule) =>
      rule.prompts.map((prompt) => ({
        ...prompt,
        triggeredBy: {
          dimension: observation.dimension,
          value: observation.value,
        },
        completed: false,
      })),
    );
  });

  return Array.from(
    new Map(prompts.map((prompt) => [prompt.id, prompt])).values(),
  );
};

export const runVenueDiscovery = (
  observations: VenueDiscoveryObservation[],
): VenueDiscoveryResult => ({
  observations,
  prompts: getVenueDiscoveryPrompts(observations),
});

// Temporary reference until profile integration is added.
export type VenueProfileReference = VenueKnowledgeProfile;