import type {
  ConnectionState,
  KnowledgeAnswer,
  KnowledgeQuestion,
} from "../types";
import type { KnowledgeStore } from "../knowledge/knowledgeStore";

export type HQEnquiryService = {
  askProfessionHQ(
    question: KnowledgeQuestion
  ): Promise<KnowledgeAnswer>;
};

export class KnowledgeRouter {
  constructor(
    private readonly knowledgeStore: KnowledgeStore,
    private readonly hq: HQEnquiryService
  ) {}

  async resolve(
    question: KnowledgeQuestion,
    connection: ConnectionState
  ): Promise<KnowledgeAnswer | null> {
    const localAnswer =
      await this.knowledgeStore.findAnswer(question);

    if (localAnswer) {
      return localAnswer;
    }

    if (connection === "offline") {
      return null;
    }

    const answer =
      await this.hq.askProfessionHQ(question);

    await this.knowledgeStore.saveAnswer(answer);

    return answer;
  }
}
