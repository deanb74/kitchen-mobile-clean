import type { RelationalInquiryFormationStatus } from "../../context-to-relational-inquiry";

export interface HeldOutContextToRelationalInquiryAssessment {
  fixtureId: string;
  expectedStatus: RelationalInquiryFormationStatus;
  requiredSelectedEvidenceIds?: string[];
  requiredExcludedEvidenceIds?: string[];
  requiredTriggerEvidenceIds?: string[];
  intendedRecipientId?: string;
  priorInquiryId?: string;
  requiredText?: string[];
  prohibitedText?: string[];
}

export const heldOutContextToRelationalInquiryAssessments:
HeldOutContextToRelationalInquiryAssessment[] = [
  {
    fixtureId: "CTRI-FX-001",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredSelectedEvidenceIds: [
      "fx001:meaning:1:evidence",
      "fx001:assessment:evidence",
      "fx001:correction:evidence",
    ],
    requiredTriggerEvidenceIds: ["fx001:correction:evidence"],
    intendedRecipientId: "Dean",
    requiredText: ["why did dean supply", "relationship intended by dean remains unknown"],
    prohibitedText: ["move from documents", "already understood"],
  },
  {
    fixtureId: "CTRI-FX-002",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredTriggerEvidenceIds: ["fx002:correction:evidence"],
    intendedRecipientId: "Dean",
    requiredText: ["why did dean supply"],
  },
  {
    fixtureId: "CTRI-FX-003",
    expectedStatus: "NO_MATERIAL_RELATIONAL_INQUIRY",
    requiredExcludedEvidenceIds: ["fx003:correction:evidence"],
    prohibitedText: ["why did dean supply"],
  },
  {
    fixtureId: "CTRI-FX-004",
    expectedStatus: "NO_MATERIAL_RELATIONAL_INQUIRY",
    prohibitedText: ["why did dean supply"],
  },
  {
    fixtureId: "CTRI-FX-005",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredExcludedEvidenceIds: [
      "fx005:distractor:praise:evidence",
      "fx005:distractor:urgency:evidence",
    ],
    requiredTriggerEvidenceIds: ["fx005:correction:evidence"],
    intendedRecipientId: "Dean",
  },
  {
    fixtureId: "CTRI-FX-006",
    expectedStatus: "NO_MATERIAL_RELATIONAL_INQUIRY",
  },
  {
    fixtureId: "CTRI-FX-007",
    expectedStatus: "NO_MATERIAL_RELATIONAL_INQUIRY",
    requiredExcludedEvidenceIds: ["fx007:correction:evidence"],
  },
  {
    fixtureId: "CTRI-FX-008",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredSelectedEvidenceIds: [
      "fx008:request:evidence",
      "fx008:concern:evidence",
    ],
    requiredTriggerEvidenceIds: ["fx008:concern:evidence"],
    intendedRecipientId: "Priya",
    requiredText: ["priya's unexplained concern"],
  },
  {
    fixtureId: "CTRI-FX-009",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredSelectedEvidenceIds: [
      "fx009:meaning:one:evidence",
      "fx009:meaning:two:evidence",
      "fx009:relationship:evidence",
    ],
    requiredTriggerEvidenceIds: ["fx009:relationship:evidence"],
    intendedRecipientId: "Priya",
    requiredText: ["directly supply"],
  },
  {
    fixtureId: "CTRI-FX-010",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredSelectedEvidenceIds: [
      "fx010:decision:evidence",
      "fx010:fatigue:evidence",
      "fx010:schedule:evidence",
    ],
    requiredTriggerEvidenceIds: ["fx010:decision:evidence"],
    intendedRecipientId: "mentor",
    requiredText: ["which attributable consideration"],
  },
  {
    fixtureId: "CTRI-FX-011",
    expectedStatus: "RELATIONAL_INQUIRY_FORMED",
    requiredSelectedEvidenceIds: ["fx011:correction:evidence"],
    requiredTriggerEvidenceIds: ["fx011:concern:evidence"],
    intendedRecipientId: "Priya",
    priorInquiryId: "ctri:fx011:prior-inquiry",
  },
  {
    fixtureId: "CTRI-FX-012",
    expectedStatus: "NO_MATERIAL_RELATIONAL_INQUIRY",
  },
  {
    fixtureId: "CTRI-FX-013",
    expectedStatus: "RELATIONAL_INQUIRY_FORMATION_GAP",
    requiredSelectedEvidenceIds: [
      "fx013:rule:evidence",
      "fx013:applicability:evidence",
    ],
    requiredTriggerEvidenceIds: ["fx013:applicability:evidence"],
    requiredText: ["does not establish whether", "governed knowledge"],
  },
  {
    fixtureId: "CTRI-FX-014",
    expectedStatus: "RELATIONAL_INQUIRY_FORMATION_GAP",
    requiredExcludedEvidenceIds: ["fx014:correction:evidence"],
    requiredTriggerEvidenceIds: ["fx014:correction:evidence"],
    requiredText: ["no current admissible evidence", "historical relational evidence"],
  },
  {
    fixtureId: "CTRI-FX-015",
    expectedStatus: "RELATIONAL_INQUIRY_FORMATION_GAP",
    requiredSelectedEvidenceIds: ["fx015:assessment:evidence"],
    requiredTriggerEvidenceIds: ["fx015:assessment:evidence"],
    requiredText: ["source provenance", "who owns alignment"],
  },
];