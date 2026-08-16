import type {
    FormationContext,
    FormationInstitutionalContext,
    FormationSituationalContext,
    FormationUrgency,
} from "../../../platform/cos/understanding-formation";
import type { ContextEntry } from "../../onboarding/contextStore";
import type { VenueKnowledgeProfile } from "../../os/knowledge/applicability";
import type { AnnieThought } from "../thinking";

/**
 * Context Adapter — Annie / Hospitality
 *
 * DC owns context assembly.
 * COS defines the FormationContext type contract.
 * Venue Intelligence owns the context data.
 *
 * AnnieThought  → FormationSituationalContext  (DC cognitive layer)
 * ContextStore  → FormationInstitutionalContext[]  (Venue Intelligence)
 * VenueProfile  → additional institutional context  (Venue Intelligence)
 */

export function thoughtToSituationalContext(
  thought: AnnieThought,
): FormationSituationalContext {
  return {
    urgency: deriveUrgency(thought),
    risk: thought.why ?? undefined,
    who: thought.who,
    what: thought.what,
    where: thought.where,
    purpose: thought.why,
  };
}

export function contextEntriesToInstitutional(
  entries: ContextEntry[],
): FormationInstitutionalContext[] {
  return entries.map((entry) => ({
    category: entry.category,
    key: entry.key,
    value: entry.value,
    source: "venue-context" as const,
  }));
}

export function venueProfileToInstitutional(
  profile: VenueKnowledgeProfile,
): FormationInstitutionalContext[] {
  const items: FormationInstitutionalContext[] = [];

  for (const item of profile.equipment) {
    items.push({ category: "equipment", key: item, value: item, source: "venue-profile" as const });
  }
  for (const item of profile.departments) {
    items.push({ category: "department", key: item, value: item, source: "venue-profile" as const });
  }
  for (const item of profile.venueTypes) {
    items.push({ category: "venue-type", key: item, value: item, source: "venue-profile" as const });
  }
  if (profile.region) {
    items.push({ category: "region", key: "region", value: profile.region, source: "venue-profile" as const });
  }

  return items;
}

export function assembleFormationContext(
  thought: AnnieThought,
  contextEntries: ContextEntry[],
  venueProfile?: VenueKnowledgeProfile,
): FormationContext {
  return {
    situational: thoughtToSituationalContext(thought),
    institutional: [
      ...contextEntriesToInstitutional(contextEntries),
      ...(venueProfile ? venueProfileToInstitutional(venueProfile) : []),
    ],
  };
}

// Urgency is derived — never supplied as input.
function deriveUrgency(thought: AnnieThought): FormationUrgency {
  if (thought.confidence >= 0.8 && !thought.needsClarification) return "low";
  if (thought.confidence >= 0.6 && !thought.needsClarification) return "medium";
  if (thought.needsClarification) return "high";
  return "high";
}
