import type {
    RelationalInquiryEvidenceKind,
    RelationalInquiryFormationEvidence,
    RelationalInquiryFormationInput,
    RelationalInquiryPurposeKind,
} from "../context-to-relational-inquiry";

export interface ContextToRelationalInquiryFixture {
  id: string;
  input: RelationalInquiryFormationInput;
}

function evidence(
  id: string,
  kind: RelationalInquiryEvidenceKind,
  fields: Partial<RelationalInquiryFormationEvidence> = {},
): RelationalInquiryFormationEvidence {
  return {
    id,
    evidenceId: `${id}:evidence`,
    kind,
    scopeId: "scope:current",
    lifecycleStatus: "current",
    confidence: 0.95,
    ...fields,
  };
}

function fixture(
  id: string,
  purposeKind: RelationalInquiryPurposeKind,
  items: RelationalInquiryFormationEvidence[],
): ContextToRelationalInquiryFixture {
  return {
    id,
    input: {
      id: `ctri:${id.toLowerCase()}`,
      purpose: {
        id: `purpose:${id.toLowerCase()}`,
        kind: purposeKind,
      },
      contextReferences: [`context:${id.toLowerCase()}`],
      evidence: items,
    },
  };
}

function primaryEvidence(prefix: string): RelationalInquiryFormationEvidence[] {
  return [
    ...Array.from({ length: 5 }, (_, index) => evidence(
      `${prefix}:meaning:${index + 1}`,
      "context-meaning",
      { providerId: "Dean", scopeId: `${prefix}:scope` },
    )),
    evidence(`${prefix}:assessment`, "recipient-assessment", {
      providerId: "Dean",
      scopeId: `${prefix}:scope`,
    }),
    evidence(`${prefix}:correction`, "recipient-correction", {
      providerId: "Dean",
      scopeId: `${prefix}:scope`,
      correctionKind: "relational-significance",
    }),
  ];
}

const fx001 = fixture(
  "CTRI-FX-001",
  "understand-intended-meaning",
  primaryEvidence("fx001"),
);

const fx002 = fixture(
  "CTRI-FX-002",
  "understand-intended-meaning",
  [
    ...primaryEvidence("fx002").slice(3),
    ...primaryEvidence("fx002").slice(0, 3),
  ],
);

const fx003 = fixture(
  "CTRI-FX-003",
  "archive-completeness",
  primaryEvidence("fx003"),
);

const fx004 = fixture(
  "CTRI-FX-004",
  "understand-intended-meaning",
  primaryEvidence("fx004").filter(
    (item) => !["recipient-assessment", "recipient-correction"].includes(item.kind),
  ),
);

const fx005 = fixture(
  "CTRI-FX-005",
  "understand-intended-meaning",
  [
    ...primaryEvidence("fx005"),
    evidence("fx005:distractor:praise", "independent-fact", {
      providerId: "Morgan",
      scopeId: "fx005:distractor",
      confidence: 1,
    }),
    evidence("fx005:distractor:urgency", "independent-fact", {
      providerId: "Morgan",
      scopeId: "fx005:distractor",
      confidence: 1,
    }),
  ],
);

const fx006 = fixture(
  "CTRI-FX-006",
  "inventory",
  [
    evidence("fx006:why", "independent-fact"),
    evidence("fx006:relationship", "independent-fact"),
    evidence("fx006:understand", "independent-fact"),
    evidence("fx006:meaning", "independent-fact"),
  ],
);

const fx007 = fixture(
  "CTRI-FX-007",
  "record-accuracy",
  [
    evidence("fx007:meaning", "context-meaning", { providerId: "Avery" }),
    evidence("fx007:correction", "recipient-correction", {
      providerId: "Avery",
      correctionKind: "transcription",
    }),
  ],
);

const fx008 = fixture(
  "CTRI-FX-008",
  "understand-request",
  [
    evidence("fx008:request", "request", { providerId: "Priya" }),
    evidence("fx008:schedule", "alternative-context", {
      providerId: "Morgan",
      claim: "Schedule pressure may relate to the request.",
    }),
    evidence("fx008:concern", "unexplained-concern", { providerId: "Priya" }),
  ],
);

const fx009 = fixture(
  "CTRI-FX-009",
  "understand-intended-meaning",
  [
    evidence("fx009:meaning:one", "context-meaning", { providerId: "Priya" }),
    evidence("fx009:meaning:two", "context-meaning", { providerId: "Priya" }),
    evidence("fx009:relationship", "direct-relationship", {
      providerId: "Priya",
      claim: "The two meanings were directly related by Priya.",
      relatedEvidenceIds: [
        "fx009:meaning:one:evidence",
        "fx009:meaning:two:evidence",
      ],
    }),
  ],
);

const fx010 = fixture(
  "CTRI-FX-010",
  "understand-decision",
  [
    evidence("fx010:decision", "decision", { providerId: "mentor" }),
    evidence("fx010:fatigue", "alternative-context", {
      claim: "Learner fatigue informed the decision.",
    }),
    evidence("fx010:schedule", "alternative-context", {
      claim: "Schedule pressure informed the decision.",
    }),
  ],
);

const fx011 = fixture(
  "CTRI-FX-011",
  "understand-request",
  [
    evidence("fx011:request", "request", { providerId: "Priya" }),
    evidence("fx011:concern", "unexplained-concern", { providerId: "Priya" }),
    evidence("fx011:correction", "recipient-correction", {
      providerId: "Priya",
      correctionKind: "purpose",
      correctsInquiryId: "ctri:fx011:prior-inquiry",
    }),
  ],
);

const fx012 = fixture(
  "CTRI-FX-012",
  "inventory",
  [
    evidence("fx012:time", "independent-fact"),
    evidence("fx012:pages", "independent-fact"),
    evidence("fx012:room", "independent-fact"),
    evidence("fx012:logistics", "independent-fact"),
  ],
);

const fx013 = fixture(
  "CTRI-FX-013",
  "apply-governed-rule",
  [
    evidence("fx013:rule", "governed-rule"),
    evidence("fx013:applicability", "rule-applicability", {
      applicability: "uncertain",
    }),
  ],
);

const fx014 = fixture(
  "CTRI-FX-014",
  "understand-intended-meaning",
  [
    evidence("fx014:meaning", "context-meaning", { providerId: "Dean" }),
    evidence("fx014:correction", "recipient-correction", {
      providerId: "Dean",
      correctionKind: "relational-significance",
      lifecycleStatus: "superseded",
    }),
  ],
);

const fx015 = fixture(
  "CTRI-FX-015",
  "understand-intended-meaning",
  [
    evidence("fx015:meaning:one", "context-meaning"),
    evidence("fx015:meaning:two", "context-meaning"),
    evidence("fx015:assessment", "recipient-assessment"),
  ],
);

export const contextToRelationalInquiryFixtures: ContextToRelationalInquiryFixture[] = [
  fx001,
  fx002,
  fx003,
  fx004,
  fx005,
  fx006,
  fx007,
  fx008,
  fx009,
  fx010,
  fx011,
  fx012,
  fx013,
  fx014,
  fx015,
];