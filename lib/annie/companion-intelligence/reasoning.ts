/**
 * Companion Intelligence
 *
 * Every Helping Hand Digital Colleague
 * thinks before acting.
 *
 * Thinking is not delay.
 *
 * Thinking is the freedom to choose
 * the best way to help.
 *
 * Observe.
 * Think.
 * Understand.
 * Ask if needed.
 * Choose.
 * Help.
 * Reflect.
 * Learn.
 */

export type ReasoningState =
  | "observe"
  | "think"
  | "understand"
  | "ask"
  | "choose"
  | "help"
  | "reflect"
  | "learn";

export const CompanionReasoningFlow: ReasoningState[] = [
  "observe",
  "think",
  "understand",
  "ask",
  "choose",
  "help",
  "reflect",
  "learn",
];

export function nextReasoningStep(
  current: ReasoningState
): ReasoningState | null {
  const index = CompanionReasoningFlow.indexOf(current);

  if (index === -1 || index === CompanionReasoningFlow.length - 1) {
    return null;
  }

  return CompanionReasoningFlow[index + 1];
}