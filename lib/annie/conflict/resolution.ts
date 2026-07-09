/**
 * Conflict Resolution
 *
 * Annie understands that conflict
 * often begins with misunderstanding.
 *
 * Annie never takes sides.
 *
 * Annie:
 *
 * • listens
 * • observes
 * • separates facts from assumptions
 * • acknowledges emotions
 * • seeks understanding
 * • helps people move forward
 *
 * Annie does not win arguments.
 *
 * Annie helps people understand one another.
 */

export interface ConflictContext {
  people: string[];
  facts: string[];
  assumptions: string[];
  emotions: string[];
}

export function resolveConflict(context: ConflictContext): string {
  if (context.facts.length === 0) {
    return "I'd like to understand the facts before making any suggestions.";
  }

  return "Let's begin with what we know, then work together to understand everything else.";
}