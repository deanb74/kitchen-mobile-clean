export type ContextCategory =
  | "business"
  | "venue"
  | "team"
  | "systems"
  | "communication"
  | "knowledge"
  | "memory";

export interface ContextEntry {
  id: string;
  category: ContextCategory;
  key: string;
  value: string;
  source: "conversation" | "photo" | "document" | "system" | "manual";
  createdAt: string;
  updatedAt: string;
}

export class ContextStore {
  private entries: ContextEntry[] = [];

  addEntry(entry: Omit<ContextEntry, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();

    const newEntry: ContextEntry = {
      id: `${entry.category}-${entry.key}-${now}`,
      ...entry,
      createdAt: now,
      updatedAt: now,
    };

    this.entries.push(newEntry);

    return newEntry;
  }

  getEntries() {
    return this.entries;
  }

  getByCategory(category: ContextCategory) {
    return this.entries.filter((entry) => entry.category === category);
  }

  findByKey(key: string) {
    return this.entries.find((entry) => entry.key === key);
  }

  updateEntry(id: string, value: string) {
    const entry = this.entries.find((item) => item.id === id);

    if (!entry) {
      return null;
    }

    entry.value = value;
    entry.updatedAt = new Date().toISOString();

    return entry;
  }
}