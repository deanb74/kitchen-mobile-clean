import type {
  VenueKnowledgeProfile,
  VenueProfileFact,
} from "../knowledge/applicability";

export interface VenueProfileFactInput
  extends Omit<VenueProfileFact, "id" | "active"> {
  id?: string;
  active?: boolean;
}

const normalise = (value: string): string =>
  value.trim().toLowerCase().replace(/[_\s]+/g, "-");

const unique = (values: string[]): string[] => [...new Set(values)];

const createFactId = (
  venueId: string,
  fact: Pick<VenueProfileFact, "dimension" | "value">,
): string =>
  `${normalise(venueId)}:${fact.dimension}:${normalise(fact.value)}`;

export const createEmptyVenueKnowledgeProfile = (
  venueId: string,
  now: string = new Date().toISOString(),
): VenueKnowledgeProfile => ({
  venueId,
  professions: [],
  region: "",
  venueTypes: [],
  departments: [],
  equipment: [],
  capabilities: [],
  facts: [],
  createdAt: now,
  updatedAt: now,
});

const rebuildProfileFromFacts = (
  profile: VenueKnowledgeProfile,
  updatedAt: string,
): VenueKnowledgeProfile => {
  const activeFacts = profile.facts.filter((fact) => fact.active);

  const valuesFor = (dimension: VenueProfileFact["dimension"]): string[] =>
    unique(
      activeFacts
        .filter((fact) => fact.dimension === dimension)
        .map((fact) => normalise(fact.value)),
    );

  const regions = valuesFor("region");

  return {
    ...profile,
    professions: valuesFor("profession"),
    region: regions[0] ?? "",
    venueTypes: valuesFor("venue-type"),
    departments: valuesFor("department"),
    equipment: valuesFor("equipment"),
    capabilities: valuesFor("capability"),
    updatedAt,
  };
};

export const addVenueProfileFact = (
  profile: VenueKnowledgeProfile,
  input: VenueProfileFactInput,
): VenueKnowledgeProfile => {
  const value = normalise(input.value);

  const fact: VenueProfileFact = {
    ...input,
    id:
      input.id ??
      createFactId(profile.venueId, {
        dimension: input.dimension,
        value,
      }),
    value,
    active: input.active ?? true,
  };

  const facts = profile.facts.filter(
    (existing) =>
      !(
        existing.dimension === fact.dimension &&
        normalise(existing.value) === fact.value
      ),
  );

  facts.push(fact);

  return rebuildProfileFromFacts(
    {
      ...profile,
      facts,
    },
    input.confirmedAt ?? input.observedAt,
  );
};

export const confirmVenueProfileFact = (
  profile: VenueKnowledgeProfile,
  factId: string,
  confirmedAt: string = new Date().toISOString(),
): VenueKnowledgeProfile => {
  const facts = profile.facts.map((fact) =>
    fact.id === factId
      ? {
          ...fact,
          confidence: "confirmed" as const,
          confirmedAt,
        }
      : fact,
  );

  return rebuildProfileFromFacts(
    {
      ...profile,
      facts,
    },
    confirmedAt,
  );
};

export const removeVenueProfileFact = (
  profile: VenueKnowledgeProfile,
  factId: string,
  removedAt: string = new Date().toISOString(),
): VenueKnowledgeProfile => {
  const facts = profile.facts.map((fact) =>
    fact.id === factId
      ? {
          ...fact,
          active: false,
        }
      : fact,
  );

  return rebuildProfileFromFacts(
    {
      ...profile,
      facts,
    },
    removedAt,
  );
};

export const createVenueProfileFromSetup = (
  venueId: string,
  setup: {
    profession: string;
    region: string;
    venueType: string;
    departments: string[];
    equipment: string[];
    capabilities?: string[];
  },
): VenueKnowledgeProfile => {
  const now = new Date().toISOString();

  let profile = createEmptyVenueKnowledgeProfile(venueId, now);

  profile = addVenueProfileFact(profile, {
    dimension: "profession",
    value: setup.profession,
    source: "setup-wizard",
    confidence: "confirmed",
    observedAt: now,
    confirmedAt: now,
  });

  profile = addVenueProfileFact(profile, {
    dimension: "region",
    value: setup.region,
    source: "setup-wizard",
    confidence: "confirmed",
    observedAt: now,
    confirmedAt: now,
  });

  profile = addVenueProfileFact(profile, {
    dimension: "venue-type",
    value: setup.venueType,
    source: "setup-wizard",
    confidence: "confirmed",
    observedAt: now,
    confirmedAt: now,
  });

  for (const department of setup.departments) {
    profile = addVenueProfileFact(profile, {
      dimension: "department",
      value: department,
      source: "setup-wizard",
      confidence: "confirmed",
      observedAt: now,
      confirmedAt: now,
    });
  }

  for (const equipment of setup.equipment) {
    profile = addVenueProfileFact(profile, {
      dimension: "equipment",
      value: equipment,
      source: "setup-wizard",
      confidence: "confirmed",
      observedAt: now,
      confirmedAt: now,
    });
  }

  for (const capability of setup.capabilities ?? []) {
    profile = addVenueProfileFact(profile, {
      dimension: "capability",
      value: capability,
      source: "setup-wizard",
      confidence: "confirmed",
      observedAt: now,
      confirmedAt: now,
    });
  }

  return profile;
};
