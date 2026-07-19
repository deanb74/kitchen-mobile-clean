import type {
  ConnectionState,
  KnowledgeAnswer,
  KnowledgeQuestion,
} from "./types";
import { KnowledgeRouter } from "./routing/knowledgeRouter";

export class HelpingHandOS {
  constructor(
    private readonly knowledgeRouter: KnowledgeRouter
  ) {}

  async answer(
    question: KnowledgeQuestion,
    connection: ConnectionState
  ): Promise<KnowledgeAnswer | null> {
    return this.knowledgeRouter.resolve(
      question,
      connection
    );
  }
}
