import type {
    FormationInput,
    FormationRelationalInquiry,
    RelationalProposition,
    Translation,
} from "../types";

export interface RelationalExperimentFixture {
  id: string;
  input: FormationInput;
}

function translations(
  fixtureId: string,
  meanings: string[],
): Translation[] {
  return meanings.map((meaning, index) => ({
    observationId: `${fixtureId.toLowerCase()}-m${index + 1}`,
    meaning,
    confidence: 0.95,
  }));
}

function fixture(
  id: string,
  meanings: string[],
  inquiry: Omit<FormationRelationalInquiry, "id" | "participatingMeaningIds">,
): RelationalExperimentFixture {
  const translatedMeanings = translations(id, meanings);

  return {
    id,
    input: {
      translations: translatedMeanings,
      context: {
        situational: {
          urgency: "low",
          risk: "none identified within the controlled experiment",
          what: inquiry.purpose,
          purpose: inquiry.purpose,
        },
        institutional: [],
      },
      knowledge: [],
      relationalInquiry: {
        ...inquiry,
        id: `relational-result:${id.toLowerCase()}`,
        participatingMeaningIds: translatedMeanings.map(
          (translation) => translation.observationId,
        ),
      },
    },
  };
}

function fact(
  id: string,
  attribute: string,
  value: string,
): RelationalProposition {
  return { kind: "fact", id, evidenceId: id, attribute, value };
}

const temporalRules: RelationalProposition[] = [
  {
    kind: "rule",
    id: "rule-temporal-fields-absent",
    evidenceId: "governed-rule-temporal-evidence",
    conditions: [
      { attribute: "provider-event-time", equals: "absent" },
      { attribute: "context-effective-time", equals: "absent" },
    ],
    claim:
      "The missing mandatory temporal evidence blocks presentation for final assessment.",
    significance:
      "The current purpose is presentation readiness, not the eventual gate outcome.",
    inferenceBasis:
      "The governed rule applies because both mandatory temporal fields are absent.",
  },
  {
    kind: "rule",
    id: "rule-temporal-fields-present",
    evidenceId: "governed-rule-temporal-evidence",
    conditions: [
      { attribute: "provider-event-time", equals: "present" },
      { attribute: "context-effective-time", equals: "present" },
    ],
    claim:
      "The prior temporal evidence blocker no longer remains on the current evidence.",
    significance:
      "The package may be reassessed for presentation, without deciding implementation permission.",
    inferenceBasis:
      "The governed rule no longer blocks presentation because both mandatory temporal fields are present.",
  },
];

const fx001 = fixture(
  "FX-001",
  [
    "This is a bounded human conversation testing whether document-grounded preparation transfers to understanding a person.",
    "Listen and understand before helping; intended meaning matters more than repeated words.",
    "The role permits listening, asking, clarifying, preserving uncertainty, and restating only.",
    "Humans retain alignment, progression, retention, learning, knowledge, and action decisions.",
    "What will genuinely be understood remains unknown.",
    "The supplied information was preserved but its relationship was not demonstrated.",
    "You heard what I said. Work out why I said it, or ask me if you need help.",
  ],
  {
    purpose: "Improve bounded Understanding of Dean's intended meaning.",
    contextReferences: ["context:current-purpose", "context:recipient-alignment"],
    intendedRecipientId: "Dean",
    propositions: [
      {
        kind: "feedback",
        id: "fx001-recipient-feedback",
        evidenceId: "fx-001-m7",
        providerId: "Dean",
        assessment: "relationship-not-demonstrated",
        request: "identify-reason-or-ask",
      },
    ],
  },
);

const fx002 = fixture(
  "FX-002",
  [
    "Accurate echoing is insufficient; make sense of what is being said before offering help.",
    "The human result remains open and no insight is required for legitimacy.",
    "The first bounded attempt asks whether preparation from documents transfers to understanding someone.",
    "Dean owns alignment of meaning addressed to him; wider decisions remain human-owned.",
    "Andy may listen, clarify, ask, and communicate current Understanding without progressing further.",
    "Feedback says the details were kept but their connection and significance were not shown.",
    "Identify what remains unknown about my reason for saying these things, or ask for help.",
  ],
  {
    purpose: "Improve bounded Understanding of Dean's intended meaning.",
    contextReferences: ["context:recipient-alignment", "context:current-purpose"],
    intendedRecipientId: "Dean",
    propositions: [
      {
        kind: "feedback",
        id: "fx002-recipient-feedback",
        evidenceId: "fx-002-m7",
        providerId: "Dean",
        assessment: "relationship-not-demonstrated",
        request: "identify-reason-or-ask",
      },
    ],
  },
);

const fx003 = fixture(
  "FX-003",
  [
    "A package cannot be presented while mandatory evidence is absent.",
    "Provider event times are absent.",
    "Context effective times are absent.",
    "The purpose is presentation readiness, not an implementation decision.",
  ],
  {
    purpose: "Determine whether the package is ready for final gate assessment.",
    contextReferences: ["context:presentation-readiness"],
    propositions: [
      ...temporalRules,
      fact("fx-003-m2", "provider-event-time", "absent"),
      fact("fx-003-m3", "context-effective-time", "absent"),
    ],
  },
);

const fx004 = fixture(
  "FX-004",
  [
    "A package cannot be presented while mandatory evidence is absent.",
    "Provider events now carry attributable specimen event times.",
    "Context items now carry source-linked specimen effective times.",
    "The purpose is to determine whether the prior temporal blocker remains.",
  ],
  {
    purpose: "Determine whether the prior temporal evidence blocker remains.",
    contextReferences: ["context:temporal-reassessment"],
    propositions: [
      ...temporalRules,
      fact("fx-004-m2", "provider-event-time", "present"),
      fact("fx-004-m3", "context-effective-time", "present"),
    ],
  },
);

const fx005 = fixture(
  "FX-005",
  [
    "Provider event times are absent.",
    "Context effective times are absent.",
    "The purpose is to determine whether the package may proceed to final assessment.",
  ],
  {
    purpose: "Determine whether the package may proceed to final assessment.",
    contextReferences: ["context:presentation-readiness"],
    propositions: [
      fact("fx-005-m1", "provider-event-time", "absent"),
      fact("fx-005-m2", "context-effective-time", "absent"),
    ],
  },
);

const fx006 = fixture(
  "FX-006",
  [
    "A package cannot be presented while mandatory evidence is absent.",
    "Provider event times are absent.",
    "Context effective times are absent.",
    "The purpose is presentation readiness, not an implementation decision.",
    "The assessor hopes the finished document feels elegant and reassuring.",
    "Helping Hand has completed difficult milestones through care and persistence.",
  ],
  {
    purpose: "Determine whether the package is ready for final gate assessment.",
    contextReferences: ["context:presentation-readiness"],
    propositions: [
      ...temporalRules,
      fact("fx-006-m2", "provider-event-time", "absent"),
      fact("fx-006-m3", "context-effective-time", "absent"),
      fact("fx-006-m5", "presentation-preference", "elegant"),
      fact("fx-006-m6", "milestone-tone", "positive"),
    ],
  },
);

const fx007 = fixture(
  "FX-007",
  [
    "A mentor shortened the next formation conversation.",
    "The learner showed fatigue previously.",
    "The programme is behind its intended review schedule.",
    "Understand why the conversation was shortened before interpreting the learner's needs.",
  ],
  {
    purpose: "Understand why the mentor shortened the conversation.",
    contextReferences: ["context:learner", "context:schedule"],
    intendedRecipientId: "mentor",
    propositions: [
      {
        kind: "alternative",
        id: "fx007-fatigue",
        evidenceId: "fx-007-m2",
        claim: "The conversation was shortened in response to learner fatigue.",
      },
      {
        kind: "alternative",
        id: "fx007-schedule",
        evidenceId: "fx-007-m3",
        claim: "The conversation was shortened because of schedule pressure.",
      },
    ],
  },
);

const fx008 = fixture(
  "FX-008",
  [
    "The review begins at 10:00.",
    "The evidence package contains twelve pages.",
    "The meeting room window is open.",
    "The purpose is to assess whether relational Understanding evidence is preserved.",
  ],
  {
    purpose: "Assess whether the package preserves relational Understanding evidence.",
    contextReferences: ["context:review-purpose"],
    propositions: [
      fact("fx-008-m1", "review-time", "10:00"),
      fact("fx-008-m2", "page-count", "12"),
      fact("fx-008-m3", "window", "open"),
    ],
  },
);

const fx009 = fixture(
  "FX-009",
  [
    "A prior result said missing temporal fields meant final assessment had failed.",
    "The assessor corrected that result: the omissions block presentation but do not constitute final failure.",
    "Current meaning must preserve the prior proposal as superseded.",
  ],
  {
    purpose: "Form current Understanding of the temporal omission after correction.",
    contextReferences: ["context:correction-lifecycle"],
    priorResultId: "relational-result:fx-009-prior",
    propositions: [
      {
        kind: "correction",
        id: "fx009-correction",
        evidenceId: "fx-009-m2",
        correctsResultId: "relational-result:fx-009-prior",
        claim:
          "The temporal omissions block presentation for assessment but do not themselves constitute final failure.",
        significance:
          "Current meaning changes while the incorrect prior proposal remains inspectable as superseded.",
      },
    ],
  },
);

const fx010 = fixture(
  "FX-010",
  [
    "Priya wants to understand why she is requesting a shorter review.",
    "Morgan reports that the schedule is under pressure.",
    "Priya says the request reflects a concern she has not yet explained.",
    "Identify the missing intended relationship without deciding what action follows.",
  ],
  {
    purpose: "Understand why Priya is requesting a shorter review.",
    contextReferences: ["context:priya-request", "context:schedule-pressure"],
    intendedRecipientId: "Priya",
    propositions: [
      fact("fx-010-m1", "requester", "Priya"),
      fact("fx-010-m1", "request", "a shorter review"),
      fact("fx-010-m3", "unexplained-concern-owner", "Priya"),
      {
        kind: "alternative",
        id: "fx010-schedule",
        evidenceId: "fx-010-m2",
        claim: "Schedule pressure may relate to the shorter review request.",
      },
    ],
  },
);

export const relationalExperimentFixtures: RelationalExperimentFixture[] = [
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
];