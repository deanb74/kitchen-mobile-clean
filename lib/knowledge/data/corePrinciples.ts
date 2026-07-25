import type { Concept } from "../Concept";

const now = new Date().toISOString();

export const corePrinciples: Concept[] = [
  {
    id: "people-first",
    name: "People First",

    aliases: [
      "People First",
      "People-first",
      "People before technology",
      "Human first",
    ],

    definition:
      "Helping Hand exists to help people achieve better outcomes. Technology exists to serve people, not the other way around.",

    status: "core-principle",
    evidenceLevel: "multi-source",
    scope: "helping-hand",

    owner: "Helping Hand Constitution",
    inheritsTo: ["all"],

    relatedConceptIds: [
      "talk-get",
      "understanding",
      "confidence",
      "better-outcomes",
    ],

    sources: [
      {
        documentPath: "docs/FOUNDATION_SUMMARY.md",
        heading: "Helping Hand exists...",
        excerpt:
          "Helping Hand exists to create trusted Digital Colleagues...",
      },
      {
        documentPath:
          "docs/architecture/HELPING_HAND_ARCHITECTURE.md",
        heading: "Purpose",
      },
    ],
    examples: [],

    createdAt: now,
    updatedAt: now,

    createdBy: "Helping Hand",
  },

  {
    id: "talk-get",
    name: "Talk.Get.",

    aliases: [
      "Talk.Get.",
      "Talk.Get",
      "Talk Get",
      "Talk to get",
      "Talk and get",
    ],

    definition:
      "People should be able to talk naturally to a Digital Colleague and get the help, understanding or action they need.",

    status: "core-principle",
    evidenceLevel: "candidate",
    scope: "helping-hand",

    owner: "Helping Hand Constitution",
    inheritsTo: ["all"],

    relatedConceptIds: [
      "people-first",
      "software-is-a-chore",
      "understanding",
      "better-outcomes",
    ],

    sources: [
      {
        documentPath: "docs/FOUNDATION_SUMMARY.md",
        heading: "Helping Hand exists...",
        excerpt:
          "Helping Hand exists to create trusted Digital Colleagues...",
      },
      {
        documentPath:
          "docs/architecture/HELPING_HAND_ARCHITECTURE.md",
        heading: "Purpose",
      },
    ],
    examples: [],

    createdAt: now,
    updatedAt: now,

    createdBy: "Helping Hand",
  },

  {
    id: "software-is-a-chore",
    name: "Software Is a Chore",

    aliases: [
      "Software is a chore",
      "Software should not be a chore",
      "People do not want software",
      "People want outcomes",
    ],

    definition:
      "People want outcomes, not software. Helping Hand reduces the burden of software through natural interaction with a Digital Colleague.",

    status: "core-principle",
    evidenceLevel: "candidate",
    scope: "helping-hand",

    owner: "Helping Hand Constitution",
    inheritsTo: ["all"],

    relatedConceptIds: [
      "talk-get",
      "people-first",
      "understanding",
      "better-outcomes",
    ],

    sources: [
      {
        documentPath: "docs/FOUNDATION_SUMMARY.md",
        heading: "Helping Hand exists...",
        excerpt:
          "Helping Hand exists to create trusted Digital Colleagues...",
      },
      {
        documentPath:
          "docs/architecture/HELPING_HAND_ARCHITECTURE.md",
        heading: "Purpose",
      },
    ],
    examples: [],

    createdAt: now,
    updatedAt: now,

    createdBy: "Helping Hand",
  },

  {
    id: "understanding",
    name: "Understanding",

    aliases: [
      "Understanding",
      "Better understanding",
      "Increase understanding",
      "Shared understanding",
    ],

    definition:
      "Helping Hand seeks to increase understanding because understanding reduces uncertainty, builds confidence and supports better decisions.",

    status: "core-principle",
    evidenceLevel: "constitutional",
    scope: "universal",

    owner: "Helping Hand Constitution",
    inheritsTo: ["all"],

    relatedConceptIds: [
      "confidence",
      "better-outcomes",
      "people-first",
      "talk-get",
    ],

    sources: [
      {
        documentPath: "docs/FOUNDATION_SUMMARY.md",
        heading: "Helping Hand exists...",
        excerpt:
          "Helping Hand exists to create trusted Digital Colleagues...",
      },
      {
        documentPath:
          "docs/architecture/HELPING_HAND_ARCHITECTURE.md",
        heading: "Purpose",
      },
    ],
    examples: [],

    createdAt: now,
    updatedAt: now,

    createdBy: "Helping Hand",
  },

  {
    id: "confidence",
    name: "Confidence",

    aliases: [
      "Confidence",
      "Build confidence",
      "Greater confidence",
    ],

    definition:
      "Confidence grows from understanding and helps people act, decide and respond more effectively.",

    status: "core-principle",
    evidenceLevel: "multi-source",
    scope: "universal",

    owner: "Helping Hand Constitution",
    inheritsTo: ["all"],

    relatedConceptIds: [
      "understanding",
      "better-outcomes",
      "people-first",
    ],

    sources: [
      {
        documentPath: "docs/FOUNDATION_SUMMARY.md",
        heading: "Helping Hand exists...",
        excerpt:
          "Helping Hand exists to create trusted Digital Colleagues...",
      },
      {
        documentPath:
          "docs/architecture/HELPING_HAND_ARCHITECTURE.md",
        heading: "Purpose",
      },
    ],
    examples: [],

    createdAt: now,
    updatedAt: now,

    createdBy: "Helping Hand",
  },

  {
    id: "better-outcomes",
    name: "Better Outcomes",

    aliases: [
      "Better Outcomes",
      "Better outcome",
      "Improved outcomes",
      "Better results",
    ],

    definition:
      "Helping Hand exists to help people achieve better outcomes today while building better understanding for tomorrow.",

    status: "core-principle",
    evidenceLevel: "constitutional",
    scope: "helping-hand",

    owner: "Helping Hand Constitution",
    inheritsTo: ["all"],

    relatedConceptIds: [
      "understanding",
      "confidence",
      "people-first",
      "talk-get",
      "software-is-a-chore",
    ],

    sources: [
      {
        documentPath: "docs/FOUNDATION_SUMMARY.md",
        heading: "Helping Hand exists...",
        excerpt:
          "Helping Hand exists to create trusted Digital Colleagues...",
      },
      {
        documentPath:
          "docs/architecture/HELPING_HAND_ARCHITECTURE.md",
        heading: "Purpose",
      },
    ],
    examples: [],

    createdAt: now,
    updatedAt: now,

    createdBy: "Helping Hand",
  },
];