export type MissingCogPriority = "low" | "medium" | "high";

export interface MissingCog {
  id: string;
  key: string;
  question: string;
  reason: string;
  priority: MissingCogPriority;
  status: "open" | "answered" | "dismissed";
  createdAt: string;
  updatedAt: string;
}

export class MissingCogQueue {
  private cogs: MissingCog[] = [];

  addCog(cog: Omit<MissingCog, "id" | "status" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();

    const newCog: MissingCog = {
      id: `${cog.key}-${now}`,
      ...cog,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };

    this.cogs.push(newCog);

    return newCog;
  }

  getOpenCogs() {
    return this.cogs.filter((cog) => cog.status === "open");
  }

  getNextCog() {
    const priorityOrder: Record<MissingCogPriority, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return this.getOpenCogs().sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    )[0] ?? null;
  }

  answerCog(id: string) {
    return this.updateStatus(id, "answered");
  }

  dismissCog(id: string) {
    return this.updateStatus(id, "dismissed");
  }

  private updateStatus(id: string, status: MissingCog["status"]) {
    const cog = this.cogs.find((item) => item.id === id);

    if (!cog) {
      return null;
    }

    cog.status = status;
    cog.updatedAt = new Date().toISOString();

    return cog;
  }
}