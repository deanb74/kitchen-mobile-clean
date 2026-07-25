import type { Concept } from "./Concept";

function normalise(value: string): string {
  return value.trim().toLowerCase();
}

export class ConceptIndex {
  private readonly concepts = new Map<string, Concept>();

  constructor(initialConcepts: Concept[] = []) {
    for (const concept of initialConcepts) {
      this.add(concept);
    }
  }

  add(concept: Concept): void {
    const key = normalise(concept.id);

    if (this.concepts.has(key)) {
      throw new Error(`Concept already exists: ${concept.id}`);
    }

    this.concepts.set(key, concept);
  }

  upsert(concept: Concept): void {
    this.concepts.set(normalise(concept.id), concept);
  }

  getById(id: string): Concept | undefined {
    return this.concepts.get(normalise(id));
  }

  getByIdOrName(idOrName: string): Concept | undefined {
    const query = normalise(idOrName);
    const byId = this.getById(query);

    if (byId) {
      return byId;
    }

    return this.getAll().find((concept) => {
      const names = [
        concept.name,
        ...concept.aliases,
      ];

      return names.some(
        (name) => normalise(name) === query,
      );
    });
  }

  requireByIdOrName(idOrName: string): Concept {
    const concept = this.getByIdOrName(idOrName);

    if (!concept) {
      throw new Error(`Unknown concept: ${idOrName}`);
    }

    return concept;
  }

  getAll(): Concept[] {
    return [...this.concepts.values()];
  }

  findByName(name: string): Concept[] {
    const query = normalise(name);

    if (!query) {
      return [];
    }

    return this.getAll().filter((concept) => {
      const names = [
        concept.name,
        ...concept.aliases,
      ];

      return names.some((value) =>
        normalise(value).includes(query),
      );
    });
  }

  search(query: string): Concept[] {
    const term = normalise(query);

    if (!term) {
      return [];
    }

    return this.getAll().filter((concept) => {
      const searchableValues = [
        concept.id,
        concept.name,
        concept.definition,
        concept.owner,
        ...concept.aliases,
      ];

      return searchableValues.some((value) =>
        normalise(value).includes(term),
      );
    });
  }

  findRelated(conceptId: string): Concept[] {
    const concept = this.getById(conceptId);

    if (!concept) {
      return [];
    }

    return concept.relatedConceptIds
      .map((relatedId) => this.getById(relatedId))
      .filter(
        (related): related is Concept =>
          related !== undefined,
      );
  }

  remove(id: string): boolean {
    return this.concepts.delete(normalise(id));
  }

  has(id: string): boolean {
    return this.concepts.has(normalise(id));
  }

  get size(): number {
    return this.concepts.size;
  }
}