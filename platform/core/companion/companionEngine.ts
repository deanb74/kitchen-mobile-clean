import { communicateIntent } from "./communication";
import { decideNextAction } from "./decision";
import { decideIntent } from "./intent";
import { reflectBeforeAction } from "./reflection";
import type { CompanionInput, CompanionRootResult } from "./types";
import { seekFirstToUnderstand } from "./understanding";

/**
 * Helping Hand Companion Engine
 *
 * Every Digital Colleague begins here.
 *
 * Seek first to understand.
 * Always.
 */
export function beginCompanionship(
  input: CompanionInput
): CompanionRootResult {
  const understanding = seekFirstToUnderstand(input);
  const reflection = reflectBeforeAction(understanding);
  const decision = decideNextAction(understanding, reflection);
  const intent = decideIntent(decision);
  const communication = communicateIntent(intent);

  return {
    understanding,
    reflection,
    decision,
    intent,
    communication,
  };
}