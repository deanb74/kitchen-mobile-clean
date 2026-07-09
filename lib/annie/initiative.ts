import { Opportunity } from "./opportunity";

/**
 * Annie's Initiative
 *
 * Annie doesn't wait to be useful.
 *
 * When she discovers an opportunity,
 * she politely offers to help.
 */

export function offerHelp(opportunity: Opportunity): string {
  return `I've noticed I may be able to help.

${opportunity.description}

Would you like me to do that?`;
}