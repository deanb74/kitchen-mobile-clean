import type { KnowledgeItem } from "./knowledgeTypes";

/**
 * Reflection Gate
 *
 * Confidence alone is not enough.
 *
 * Before knowledge is promoted,
 * Helping Hand checks whether it has been reflected on.
 */

export interface ReflectionCheck {
  hasReflected: boolean;
  reflectionSummary?: string;
}

export function passesReflectionGate(
  item: KnowledgeItem,
  reflection: ReflectionCheck
): boolean {
  if (item.confidence < 0.8) {
    return false;
  }

  return reflection.hasReflected === true;
}