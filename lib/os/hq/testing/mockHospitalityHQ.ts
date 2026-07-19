import type {
  KnowledgeAnswer,
  KnowledgeQuestion,
} from "../../types";
import type { HQEnquiryService } from "../../routing/knowledgeRouter";

export class MockHospitalityHQ implements HQEnquiryService {
  public enquiryCount = 0;

  async askProfessionHQ(
    question: KnowledgeQuestion
  ): Promise<KnowledgeAnswer> {
    this.enquiryCount += 1;

    return {
      questionId: question.question.trim().toLowerCase(),
      answer:
        "Mock Hospitality HQ answer: refrigerate chilled food at 8°C or below, with 5°C or below commonly used as the operating target.",
      sourceLevel: "profession",
      confidence: 1,
      approvedAt: new Date().toISOString(),
      version: "test-1",
    };
  }
}
