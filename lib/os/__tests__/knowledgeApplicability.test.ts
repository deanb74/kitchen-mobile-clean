import {
  evaluateKnowledgeApplicability,
  isKnowledgeApplicable,
  type TaggedKnowledgePackage,
  type VenueKnowledgeProfile,
} from "../index";

const pub: VenueKnowledgeProfile = {
  venueId: "venue-pub-001",
  professions: ["hospitality"],
  region: "uk-england-yorkshire",
  venueTypes: ["pub", "restaurant"],
  departments: ["kitchen", "bar", "cellar"],
  equipment: [
    "commercial-fryer",
    "walk-in-chiller",
    "draught-beer-system",
    "beer-lines",
  ],
  capabilities: [],
  facts: [],
  createdAt: "2026-07-19T00:00:00.000Z",
  updatedAt: "2026-07-19T00:00:00.000Z",
};

const chipShop: VenueKnowledgeProfile = {
  venueId: "venue-chip-shop-001",
  professions: ["hospitality"],
  region: "uk-england-yorkshire",
  venueTypes: ["chip-shop", "takeaway"],
  departments: ["kitchen", "counter"],
  equipment: [
    "commercial-fryer",
    "refrigerated-display",
  ],
  capabilities: [],
  facts: [],
  createdAt: "2026-07-19T00:00:00.000Z",
  updatedAt: "2026-07-19T00:00:00.000Z",
};

const beerLineCleaning: TaggedKnowledgePackage = {
  id: "hospitality-cellar-beer-line-cleaning",
  version: "1.0.0",
  title: "Cleaning draught beer lines",
  summary: "Governed procedure for cleaning draught beer lines.",
  content: {
    procedure: [
      "Isolate the system.",
      "Prepare the approved cleaning solution.",
      "Clean and rinse the beer lines.",
    ],
  },
  status: "approved",
  priority: "important",
  approvedBy: "Hospitality HQ",
  approvedAt: "2026-07-19T00:00:00.000Z",
  tags: {
    professions: ["hospitality"],
    regions: ["uk"],
    venueTypes: ["pub", "bar", "hotel-bar", "social-club"],
    departments: ["bar", "cellar"],
    equipment: ["draught-beer-system", "beer-lines"],
    topics: ["hygiene", "cellar", "maintenance"],
  },
};

const generalFoodSafety: TaggedKnowledgePackage = {
  id: "hospitality-food-safety-hand-washing",
  version: "1.0.0",
  title: "Effective hand washing",
  summary: "General hand-washing knowledge for food operations.",
  content: {
    instruction: "Wash hands thoroughly at all required times.",
  },
  status: "approved",
  priority: "important",
  approvedBy: "Hospitality HQ",
  approvedAt: "2026-07-19T00:00:00.000Z",
  tags: {
    professions: ["hospitality"],
    regions: ["uk"],
    departments: ["kitchen"],
    topics: ["food-safety", "personal-hygiene"],
  },
};

describe("Helping Hand OS knowledge applicability", () => {
  it("makes beer-line knowledge available to a relevant pub", () => {
    expect(isKnowledgeApplicable(beerLineCleaning, pub)).toBe(true);
  });

  it("does not give beer-line knowledge to a chip shop", () => {
    const decision = evaluateKnowledgeApplicability(
      beerLineCleaning,
      chipShop,
    );

    expect(decision.applicable).toBe(false);
    expect(decision.reasons).toContain("No matching venue type.");
    expect(decision.reasons).toContain("No matching department.");
    expect(decision.reasons).toContain("No matching equipment.");
  });

  it("makes general food-safety knowledge available to both venues", () => {
    expect(isKnowledgeApplicable(generalFoodSafety, pub)).toBe(true);
    expect(isKnowledgeApplicable(generalFoodSafety, chipShop)).toBe(true);
  });

  it("allows broad regional knowledge to reach a narrower region", () => {
    expect(isKnowledgeApplicable(generalFoodSafety, pub)).toBe(true);
  });

  it("rejects knowledge approved for a different region", () => {
    const scotlandOnly: TaggedKnowledgePackage = {
      ...generalFoodSafety,
      id: "hospitality-scotland-specific-guidance",
      tags: {
        ...generalFoodSafety.tags,
        regions: ["uk-scotland"],
      },
    };

    const decision = evaluateKnowledgeApplicability(scotlandOnly, pub);

    expect(decision.applicable).toBe(false);
    expect(decision.reasons).toContain(
      "Knowledge does not apply to the venue region.",
    );
  });

  it("does not distribute unapproved knowledge", () => {
    const draftKnowledge: TaggedKnowledgePackage = {
      ...generalFoodSafety,
      status: "draft",
    };

    const decision = evaluateKnowledgeApplicability(draftKnowledge, pub);

    expect(decision.applicable).toBe(false);
    expect(decision.reasons).toContain(
      'Knowledge status is "draft", not "approved".',
    );
  });
});
