import type { FormationKnowledge } from "../../../platform/cos/understanding-formation";
import type { KnowledgeAnswer, KnowledgeLevel } from "../../os/types";

/**
 * Knowledge Adapter — Annie / DC Layer
 *
 * DC converts governed knowledge into FormationKnowledge.
 * OS owns routing, applicability matching, and source authority.
 * COS defines the FormationKnowledge type contract.
 *
 * Source authority is preserved: KnowledgeAnswer.sourceLevel → evidenceLevel.
 */

export function knowledgeAnswerToFormation(
  answer: KnowledgeAnswer,
): FormationKnowledge {
  return {
    principle: answer.answer,
    evidenceLevel: sourceLevelToEvidenceLevel(answer.sourceLevel),
    sourceType: "os-routing" as const,
  };
}

export function knowledgeAnswersToFormation(
  answers: KnowledgeAnswer[],
): FormationKnowledge[] {
  return answers.map(knowledgeAnswerToFormation);
}

// Four-entry lookup preserving source authority from OS routing chain.
function sourceLevelToEvidenceLevel(
  sourceLevel: KnowledgeLevel,
): FormationKnowledge["evidenceLevel"] {
  switch (sourceLevel) {
    case "helping-hand":  return "constitutional";
    case "profession":    return "professional";
    case "organisation":  return "professional";
    case "venue":         return "local";
  }
}
