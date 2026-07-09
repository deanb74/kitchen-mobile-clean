import { communicateIntent } from "./communication";
import { decideNextAction } from "./decision";
import { decideIntent } from "./intent";
import { reflectBeforeAction } from "./reflection";
import type { CompanionInput, CompanionRootResult } from "./types";
import { seekFirstToUnderstand } from "./understanding";

/**
 * Companion Loop
 *
 * This is how every Companion thinks.
 */
export function runCompanionLoop(
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