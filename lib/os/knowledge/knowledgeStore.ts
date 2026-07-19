import type {
  KnowledgeAnswer,
  KnowledgeQuestion,
} from "../types";

export interface KnowledgeStore {
  findAnswer(
    question: KnowledgeQuestion
  ): Promise<KnowledgeAnswer | null>;

  saveAnswer(answer: KnowledgeAnswer): Promise<void>;
}
