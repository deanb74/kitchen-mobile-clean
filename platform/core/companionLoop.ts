import type { CompanionContext } from "./companionContext";
import type { CompanionDecision } from "./companionDecision";
import { processStimulus } from "./companionEngine";

/**
 * Companion Loop
 *
 * Every Digital Colleague follows the same journey:
 *
 * Stimulus
 * → Perception
 * → Context
 * → Knowledge
 * → Reflection
 * → Wisdom
 * → Decision
 * → Action
 * → Learning
 */

export interface CompanionLoopResult {
  context: CompanionContext;
  decision: CompanionDecision;
  completedAt: string;
}

export function runCompanionLoop(
  context: CompanionContext
): CompanionLoopResult {
  const decision = processStimulus(context);

  return {
    context,
    decision,
    completedAt: new Date().toISOString(),
  };
}