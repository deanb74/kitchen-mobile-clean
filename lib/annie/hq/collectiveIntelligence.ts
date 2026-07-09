/**
 * Annie HQ
 *
 * Collective Intelligence
 *
 * Every Annie learns.
 *
 * Every lesson has the potential
 * to help another venue.
 *
 * Annie HQ never issues instructions.
 *
 * Annie HQ shares understanding.
 *
 * Local experience.
 * Shared wisdom.
 * Better colleagues.
 *
 * Every venue remains unique.
 *
 * Every venue benefits
 * from the experience of others.
 */

export interface CollectiveInsight {
  id: string;
  title: string;
  understanding: string;
  sourceVenue: string;
  confidence: number;
}

export function shouldShareInsight(
  insight: CollectiveInsight
): boolean {
  return insight.confidence >= 0.9;
}