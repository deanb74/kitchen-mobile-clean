import type { KnowledgeItem, KnowledgeStage } from "./knowledgeTypes";

/**
 * Knowledge Promotion
 *
 * Not every observation becomes wisdom.
 *
 * Helping Hand promotes knowledge only when
 * it has enough confidence, reflection and usefulness.
 */

export interface PromotionDecision {
  canPromote: boolean;
  nextStage?: KnowledgeStage;
  reason: string;
}

const stageOrder: KnowledgeStage[] = [
  "observation",
  "information",
  "understanding",
  "experience",
  "principle",
  "transferable-wisdom",
];

export function decidePromotion(
  item: KnowledgeItem
): PromotionDecision {
  const currentIndex = stageOrder.indexOf(item.stage);
  const nextStage = stageOrder[currentIndex + 1];

  if (!nextStage) {
    return {
      canPromote: false,
      reason: "This knowledge is already at the highest stage.",
    };
  }

  if (item.confidence < 0.8) {
    return {
      canPromote: false,
      reason: "This needs more confidence before it can be promoted.",
    };
  }

  return {
    canPromote: true,
    nextStage,
    reason: `This can move from ${item.stage} to ${nextStage}.`,
  };
}