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
}
