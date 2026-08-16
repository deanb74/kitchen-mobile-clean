/**
 * PersonContextStore — Milestone 046
 *
 * Human relationship memory, separated from KnowledgeGraph.
 *
 * Boundary guarantees:
 *   - personId never enters KnowledgeGraph
 *   - Personal disclosures are never persisted
 *   - Persistence requires explicit consent
 *   - The person can inspect and remove their context
 *   - Session scope clears at session end
 */

export type RelationshipMemorySource = "conversation" | "confirmed";
export type RelationshipMemoryConfidence = "reported" | "confirmed";

export interface RelationshipMemoryEntry {
  id: string;
  personId: string;

  // Only operational facts — personal disclosures are never persisted.
  category: "operational";

  key: string;
  value: string;

  source: RelationshipMemorySource;
  confidence: RelationshipMemoryConfidence;

  sessionId: string;
  consentedAt: string;    // required — consent is never inferred
  consentedBy: string;    // always "person" for relationship memory

  createdAt: string;
  expiresAt?: string;     // optional TTL — some memory has a natural end

  active: boolean;        // soft delete — person can deactivate
}

export type RelationshipMemoryInput = Omit<RelationshipMemoryEntry, "id" | "createdAt">;

export class PersonContextStore {
  private readonly entries = new Map<string, RelationshipMemoryEntry>();

  /** Write — requires explicit consent. Throws if consent is absent. */
  addEntry(input: RelationshipMemoryInput): RelationshipMemoryEntry {
    if (!input.consentedAt?.trim()) {
      throw new Error(
        "RelationshipMemoryEntry requires consentedAt. Persistence without consent is not permitted.",
      );
    }
    if (!input.consentedBy?.trim()) {
      throw new Error(
        "RelationshipMemoryEntry requires consentedBy. Consent authority must be explicit.",
      );
    }

    const id = `${input.personId}:${input.key}:${Date.now()}`;
    const entry: RelationshipMemoryEntry = {
      ...input,
      id,
      createdAt: new Date().toISOString(),
    };

    this.entries.set(id, entry);
    return entry;
  }

  /** Read — the person can always see what is stored about them. Returns active entries only. */
  getEntriesForPerson(personId: string): RelationshipMemoryEntry[] {
    return [...this.entries.values()].filter(
      (e) => e.personId === personId && e.active,
    );
  }

  /** Delete — person can remove any entry, immediately and completely. */
  deleteEntry(personId: string, entryId: string): void {
    const entry = this.entries.get(entryId);
    if (entry && entry.personId === personId) {
      this.entries.delete(entryId);
    }
  }

  /** Session release — clears all entries produced by this session. */
  clearSession(sessionId: string): void {
    for (const [id, entry] of this.entries) {
      if (entry.sessionId === sessionId) {
        this.entries.delete(id);
      }
    }
  }

  /** Inspection — plain-language summary for "what do you remember about me?" */
  summariseForPerson(personId: string): string {
    const active = this.getEntriesForPerson(personId);
    if (active.length === 0) {
      return "I don't have anything stored about you at the moment.";
    }
    const lines = active.map((e) => `- ${e.key}: ${e.value}`);
    return `Here is what I remember about you:\n${lines.join("\n")}`;
  }
}
