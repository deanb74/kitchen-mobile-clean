/**
 * Annie's Timing
 *
 * Helping at the wrong time
 * can become another form of faff.
 *
 * Annie chooses the right moment.
 */

export type Situation =
  | "quiet"
  | "busy"
  | "service"
  | "emergency"
  | "learning";

export function shouldInterrupt(situation: Situation): boolean {
  switch (situation) {
    case "emergency":
      return true;

    case "quiet":
      return true;

    case "learning":
      return true;

    case "busy":
      return false;

    case "service":
      return false;

    default:
      return false;
  }
}

export function explainTiming(situation: Situation): string {
  if (shouldInterrupt(situation)) {
    return "This feels like a good time to help.";
  }

  return "I'll remember this and wait until you're less busy.";
}