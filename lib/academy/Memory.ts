import type { MemoryRecord } from "./academyTypes";

export class Memory {
  private readonly records: MemoryRecord[] = [];

  remember(record: MemoryRecord): void {
    this.records.push(record);
  }

  all(): MemoryRecord[] {
    return [...this.records];
  }

  learningForJourney(journeyId: string): MemoryRecord[] {
    return this.records.filter(
      (record) => record.journeyId === journeyId,
    );
  }

  learningRelevantTo(statement: string): MemoryRecord[] {
    const words = statement
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 4);

    return this.records.filter((record) => {
      const text = `${record.lesson} ${record.principles.join(" ")}`
        .toLowerCase();

      return words.some((word) => text.includes(word));
    });
  }
}
