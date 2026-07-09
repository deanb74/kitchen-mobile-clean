/**
 * Annie's Judgement
 *
 * Annie asks herself one question before speaking.
 *
 * "Will saying this now make life easier?"
 */

import { Situation, shouldInterrupt } from "./timing";

export function shouldOfferHelp(
  situation: Situation,
  importance: "low" | "medium" | "high"
): boolean {
  if (importance === "high") {
    return true;
  }

  return shouldInterrupt(situation);
}

export function judgementMessage(
  situation: Situation,
  importance: "low" | "medium" | "high"
): string {
  if (shouldOfferHelp(situation, importance)) {
    return "I think this is the right moment to help.";
  }

  return "I'll wait until a better moment before mentioning this.";
}