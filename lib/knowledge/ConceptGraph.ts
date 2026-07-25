import type { Concept } from "./Concept";
import { ConceptIndex } from "./ConceptIndex";

export interface ConceptConnection {
  fromConceptId: string;
  toConceptId: string;
}

export interface ConceptPath {
  conceptIds: string[];
  concepts: Concept[];
}

export class ConceptGraph {
  constructor(private readonly index: ConceptIndex) {}

  getConnections(): ConceptConnection[] {
    const connections: ConceptConnection[] = [];

    for (const concept of this.index.getAll()) {
      for (const relatedConceptId of concept.relatedConceptIds) {
        connections.push({
          fromConceptId: concept.id,
          toConceptId: relatedConceptId,
        });
      }
    }

    return connections;
  }

  getReferencedBy(conceptId: string): Concept[] {
    return this.index
      .getAll()
      .filter((concept) =>
        concept.relatedConceptIds.includes(conceptId),
      );
  }

  getNeighbours(conceptId: string): Concept[] {
    const directRelations =
      this.index.findRelated(conceptId);

    const reverseRelations =
      this.getReferencedBy(conceptId);

    const unique = new Map<string, Concept>();

    for (const concept of [
      ...directRelations,
      ...reverseRelations,
    ]) {
      unique.set(concept.id, concept);
    }

    return [...unique.values()];
  }

  getMissingReferences(): ConceptConnection[] {
    return this.getConnections().filter(
      ({ toConceptId }) =>
        !this.index.has(toConceptId),
    );
  }

  findPath(
    fromIdOrName: string,
    toIdOrName: string,
  ): ConceptPath | undefined {
    const from =
      this.index.requireByIdOrName(fromIdOrName);

    const to =
      this.index.requireByIdOrName(toIdOrName);

    if (from.id === to.id) {
      return {
        conceptIds: [from.id],
        concepts: [from],
      };
    }

    const queue: string[][] = [[from.id]];
    const visited = new Set<string>([from.id]);

    while (queue.length > 0) {
      const path = queue.shift();

      if (!path) {
        continue;
      }

      const currentId = path[path.length - 1];
      const neighbours =
        this.getNeighbours(currentId);

      for (const neighbour of neighbours) {
        if (visited.has(neighbour.id)) {
          continue;
        }

        const nextPath = [...path, neighbour.id];

        if (neighbour.id === to.id) {
          return {
            conceptIds: nextPath,
            concepts: nextPath.map((id) =>
              this.index.requireByIdOrName(id),
            ),
          };
        }

        visited.add(neighbour.id);
        queue.push(nextPath);
      }
    }

    return undefined;
  }
}