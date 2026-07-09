import { runCompanionLoop } from "./companionLoop";
import type { CompanionInput, CompanionRootResult } from "./types";

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
  return runCompanionLoop(input);
}