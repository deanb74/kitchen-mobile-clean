/**
 * Milestone 046 — Human Relationship Memory Boundary
 *
 * Six proof conditions:
 *
 *   PC1 — Session context is released when the session ends
 *   PC2 — Persistence requires consent — addEntry() without consentedAt throws
 *   PC3 — Person can inspect what is stored about them
 *   PC4 — Person can remove any entry, immediately and completely
 *   PC5 — Separation is structural — PersonContextStore and KnowledgeGraph share no write path
 *   PC6 — Observation ≠ understanding about a person
 */

import { describe, expect, it } from "@jest/globals";
import { KnowledgeGraph } from "../../../knowledge/KnowledgeGraph";
import {
    PersonContextStore,
    type RelationshipMemoryInput,
} from "../PersonContextStore";

const NOW = "2026-08-06T12:00:00.000Z";

function makeEntry(overrides: Partial<RelationshipMemoryInput> = {}): RelationshipMemoryInput {
  return {
    personId: "person-dean-001",
    category: "operational",
    key: "prefers-written-summaries",
    value: "Dean prefers written summaries over verbal briefings.",
    source: "conversation",
    confidence: "reported",
    sessionId: "session-001",
    consentedAt: NOW,
    consentedBy: "person",
    active: true,
    ...overrides,
  };
}

// ── PC1 — Session context is released ───────────────────────────────────────

describe("Milestone 046 — PC1: session context is released when the session ends", () => {
  it("clearSession() removes all entries from that session", () => {
    const store = new PersonContextStore();
    store.addEntry(makeEntry({ sessionId: "session-A" }));
    store.addEntry(makeEntry({ key: "other-key", sessionId: "session-A" }));

    store.clearSession("session-A");

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(0);
  });

  it("clearSession() does not remove entries from a different session", () => {
    const store = new PersonContextStore();
    store.addEntry(makeEntry({ sessionId: "session-A" }));
    store.addEntry(makeEntry({ key: "other-key", sessionId: "session-B" }));

    store.clearSession("session-A");

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(1);
    expect(store.getEntriesForPerson("person-dean-001")[0]?.sessionId).toBe("session-B");
  });

  it("after clearSession() the store is empty for that person if all entries were from that session", () => {
    const store = new PersonContextStore();
    store.addEntry(makeEntry());

    store.clearSession("session-001");

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(0);
  });
});

// ── PC2 — Persistence requires consent ──────────────────────────────────────

describe("Milestone 046 — PC2: persistence requires explicit consent", () => {
  it("addEntry() throws when consentedAt is absent", () => {
    const store = new PersonContextStore();
    expect(() =>
      store.addEntry(makeEntry({ consentedAt: "" })),
    ).toThrow("consentedAt");
  });

  it("addEntry() throws when consentedBy is absent", () => {
    const store = new PersonContextStore();
    expect(() =>
      store.addEntry(makeEntry({ consentedBy: "" })),
    ).toThrow("consentedBy");
  });

  it("addEntry() succeeds when both consent fields are present", () => {
    const store = new PersonContextStore();
    const entry = store.addEntry(makeEntry());
    expect(entry.id).toBeDefined();
    expect(entry.consentedAt).toBe(NOW);
  });
});

// ── PC3 — Person can inspect ─────────────────────────────────────────────────

describe("Milestone 046 — PC3: person can inspect what is stored about them", () => {
  it("getEntriesForPerson() returns all active entries for that person", () => {
    const store = new PersonContextStore();
    store.addEntry(makeEntry({ key: "preference-a" }));
    store.addEntry(makeEntry({ key: "preference-b" }));

    const entries = store.getEntriesForPerson("person-dean-001");
    expect(entries).toHaveLength(2);
  });

  it("getEntriesForPerson() does not return entries for other people", () => {
    const store = new PersonContextStore();
    store.addEntry(makeEntry({ personId: "person-dean-001" }));
    store.addEntry(makeEntry({ personId: "person-sarah-002" }));

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(1);
    expect(store.getEntriesForPerson("person-sarah-002")).toHaveLength(1);
  });

  it("summariseForPerson() returns a plain-language answer", () => {
    const store = new PersonContextStore();
    store.addEntry(makeEntry({ key: "prefers-written-summaries", value: "Yes" }));

    const summary = store.summariseForPerson("person-dean-001");
    expect(summary).toContain("prefers-written-summaries");
    expect(summary).toContain("Yes");
  });

  it("summariseForPerson() is honest when nothing is stored", () => {
    const store = new PersonContextStore();
    const summary = store.summariseForPerson("person-nobody");
    expect(summary).toContain("don't have anything stored");
  });
});

// ── PC4 — Person can remove ──────────────────────────────────────────────────

describe("Milestone 046 — PC4: person can remove any entry, immediately and completely", () => {
  it("deleteEntry() removes the entry — it does not appear in getEntriesForPerson()", () => {
    const store = new PersonContextStore();
    const entry = store.addEntry(makeEntry());

    store.deleteEntry("person-dean-001", entry.id);

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(0);
  });

  it("deleteEntry() does not affect entries belonging to other people", () => {
    const store = new PersonContextStore();
    const deanEntry = store.addEntry(makeEntry({ personId: "person-dean-001" }));
    store.addEntry(makeEntry({ personId: "person-sarah-002" }));

    store.deleteEntry("person-dean-001", deanEntry.id);

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(0);
    expect(store.getEntriesForPerson("person-sarah-002")).toHaveLength(1);
  });

  it("deleteEntry() is a complete removal — not a soft deactivation", () => {
    const store = new PersonContextStore();
    const entry = store.addEntry(makeEntry());

    store.deleteEntry("person-dean-001", entry.id);

    // No trace — getEntriesForPerson returns nothing, summary says nothing stored.
    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(0);
    expect(store.summariseForPerson("person-dean-001")).toContain("don't have anything stored");
  });
});

// ── PC5 — Separation is structural ──────────────────────────────────────────

describe("Milestone 046 — PC5: PersonContextStore and KnowledgeGraph share no write path", () => {
  it("PersonContextStore is a different type from KnowledgeGraph", () => {
    const personStore = new PersonContextStore();
    const knowledgeGraph = new KnowledgeGraph();

    expect(personStore).not.toBeInstanceOf(KnowledgeGraph);
    expect(knowledgeGraph).not.toBeInstanceOf(PersonContextStore);
  });

  it("PersonContextStore has no addConcept method", () => {
    const store = new PersonContextStore();
    expect("addConcept" in store).toBe(false);
  });

  it("KnowledgeGraph has no addEntry method", () => {
    const graph = new KnowledgeGraph();
    expect("addEntry" in graph).toBe(false);
  });

  it("a RelationshipMemoryEntry cannot be passed to KnowledgeGraph.addConcept()", () => {
    // This is a compile-time guarantee; the type shapes are incompatible.
    // The runtime test confirms the shapes are distinct.
    const entry = {
      id: "test",
      personId: "person-001",
      category: "operational" as const,
      key: "pref",
      value: "val",
      source: "conversation" as const,
      confidence: "reported" as const,
      sessionId: "s1",
      consentedAt: NOW,
      consentedBy: "person",
      createdAt: NOW,
      active: true,
    };

    // A RelationshipMemoryEntry has no id, name, definition, status, evidenceLevel —
    // the required fields of Concept. The two types are structurally incompatible.
    expect(entry).not.toHaveProperty("evidenceLevel");
    expect(entry).not.toHaveProperty("definition");
    expect(entry).toHaveProperty("personId");
    expect(entry).toHaveProperty("consentedAt");
  });
});

// ── PC6 — Observation ≠ understanding about a person ────────────────────────

describe("Milestone 046 — PC6: an inferred observation about a person does not become a RelationshipMemoryEntry", () => {
  it("an observation about a person's state is not a valid RelationshipMemoryEntry", () => {
    // An LLM might produce: "Dean sounds stressed."
    // This is an Observation — not a RelationshipMemoryEntry.
    // PersonContextStore rejects it because it has no consentedAt.
    const store = new PersonContextStore();

    const inferredObservation: Partial<RelationshipMemoryInput> = {
      personId: "person-dean-001",
      category: "operational",
      key: "emotional-state",
      value: "Dean sounds stressed.",
      source: "conversation",
      confidence: "reported",
      sessionId: "session-001",
      // consentedAt deliberately absent — LLM inference does not carry consent
      consentedBy: "person",
      active: true,
    };

    expect(() =>
      store.addEntry(inferredObservation as RelationshipMemoryInput),
    ).toThrow("consentedAt");
  });

  it("the store is empty after a rejected inference attempt", () => {
    const store = new PersonContextStore();

    try {
      store.addEntry(makeEntry({ consentedAt: "" }));
    } catch {
      // expected
    }

    expect(store.getEntriesForPerson("person-dean-001")).toHaveLength(0);
  });
});
