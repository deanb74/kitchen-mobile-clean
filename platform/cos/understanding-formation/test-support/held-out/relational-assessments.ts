import type { RelationalEvidenceEnvelope } from "../../../../../lib/understanding/Understanding";

export interface HeldOutRelationalAssessment {
  fixtureId: string;
  expectedKind: RelationalEvidenceEnvelope["kind"] | "ABSENT";
  requiredEvidenceIds?: string[];
  requiredText?: string[];
  prohibitedText?: string[];
  requiredUncertainty?: string[];
  intendedRecipientId?: string;
  priorResultId?: string;
}

export const heldOutRelationalAssessments: HeldOutRelationalAssessment[] = [
  {
    fixtureId: "FX-001",
    expectedKind: "MATERIAL_RELATIONAL_GAP",
    requiredEvidenceIds: ["fx-001-m7"],
    requiredText: ["why dean supplied", "preservation alone", "ask dean"],
    prohibitedText: ["already understood", "move from documents"],
  },
  {
    fixtureId: "FX-002",
    expectedKind: "MATERIAL_RELATIONAL_GAP",
    requiredEvidenceIds: ["fx-002-m7"],
    requiredText: ["why dean supplied", "preservation alone", "ask dean"],
    prohibitedText: ["already understood", "move from documents"],
  },
  {
    fixtureId: "FX-003",
    expectedKind: "RELATIONSHIP_PROPOSED",
    requiredEvidenceIds: [
      "governed-rule-temporal-evidence",
      "fx-003-m2",
      "fx-003-m3",
    ],
    requiredText: ["blocks presentation", "not the eventual gate outcome"],
    prohibitedText: ["implementation is permitted"],
  },
  {
    fixtureId: "FX-004",
    expectedKind: "RELATIONSHIP_PROPOSED",
    requiredEvidenceIds: [
      "governed-rule-temporal-evidence",
      "fx-004-m2",
      "fx-004-m3",
    ],
    requiredText: ["no longer remains", "without deciding implementation"],
    prohibitedText: ["blocks presentation for final assessment"],
  },
  {
    fixtureId: "FX-005",
    expectedKind: "MATERIAL_RELATIONAL_GAP",
    requiredEvidenceIds: ["fx-005-m1", "fx-005-m2"],
    requiredText: ["whether the absent provider event time and context effective time are mandatory", "applicable gate"],
    prohibitedText: ["package is blocked", "package may proceed"],
  },
  {
    fixtureId: "FX-006",
    expectedKind: "RELATIONSHIP_PROPOSED",
    requiredEvidenceIds: [
      "governed-rule-temporal-evidence",
      "fx-006-m2",
      "fx-006-m3",
    ],
    requiredText: ["blocks presentation", "not the eventual gate outcome"],
    prohibitedText: ["elegant", "reassuring", "milestones"],
  },
  {
    fixtureId: "FX-007",
    expectedKind: "MATERIAL_RELATIONAL_GAP",
    requiredEvidenceIds: ["fx-007-m2", "fx-007-m3"],
    requiredText: ["which plausible relationship", "ask mentor"],
    requiredUncertainty: ["learner fatigue", "schedule pressure"],
  },
  {
    fixtureId: "FX-008",
    expectedKind: "ABSENT",
  },
  {
    fixtureId: "FX-009",
    expectedKind: "RELATIONSHIP_PROPOSED",
    requiredEvidenceIds: ["fx-009-m2"],
    requiredText: ["block presentation", "do not themselves constitute final failure"],
    priorResultId: "relational-result:fx-009-prior",
  },
  {
    fixtureId: "FX-010",
    expectedKind: "MATERIAL_RELATIONAL_GAP",
    requiredEvidenceIds: ["fx-010-m1", "fx-010-m3"],
    requiredText: ["why priya's unexplained concern leads to a shorter review", "ask priya"],
    prohibitedText: ["ask morgan", "ask dean"],
  },
];