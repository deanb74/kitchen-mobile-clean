/**
 * Annie's Living Memory
 *
 * Annie doesn't just remember facts.
 *
 * She remembers:
 *
 * • what she learnt
 * • who taught her
 * • when she learnt it
 * • why it was true
 * • when it may need checking again
 *
 * Knowledge changes.
 *
 * If the world changes,
 * Annie reviews her understanding.
 *
 * Different chef?
 * Different recipe.
 *
 * Different supplier?
 * Different ingredients.
 *
 * Different equipment?
 * Different procedures.
 *
 * Memory should always stay alive.
 */

export interface LivingMemory {
  id: string;
  fact: string;
  source: string;
  learntOn: Date;
  reason: string;
  reviewTriggers: string[];
}

export function createLivingMemory(
  memory: LivingMemory
): LivingMemory {
  return memory;
}

export function shouldReviewMemory(
  memory: LivingMemory,
  trigger: string
): boolean {
  return memory.reviewTriggers.includes(trigger);
}