import type {
  KnowledgeAnswer,
  KnowledgeQuestion,
} from "../../types";
import type { KnowledgeStore } from "../knowledgeStore";

export class InMemoryKnowledgeStore implements KnowledgeStore {
  private readonly answers = new Map<string, KnowledgeAnswer>();

  async findAnswer(
    question: KnowledgeQuestion
  ): Promise<KnowledgeAnswer | null> {
    return this.answers.get(question.question.trim().toLowerCase()) ?? null;
  }

  async saveAnswer(answer: KnowledgeAnswer): Promise<void> {
    const key = answer.questionId.trim().toLowerCase();
    this.answers.set(key, answer);
  }

  get size(): number {
    return this.answers.size;
  }
}
