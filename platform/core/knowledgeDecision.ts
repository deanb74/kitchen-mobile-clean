import type { KnowledgeItem } from "../knowledge";
import type { CompanionDecision } from "./companionDecision";

/**
 * Knowledge Decision
 *
 * The Companion Engine uses knowledge carefully.
 *
 * Confidence alone is not enough.
 * Understanding must be good enough to help.
 */

export function decideFromKnowledge(
  knowledge?: KnowledgeItem
): CompanionDecision {
  if (!knowledge) {
    return {
      action: "reflect",
      reason: "I do not have enough knowledge yet to answer well.",
    };
  }

  if (knowledge.confidence < 0.8) {
    return {
      action: "ask",
      reason: "I need to improve my understanding before answering.",
    };
  }

  return {
    action: "answer",
    reason: "I have enough confidence to help with this.",
  };
}