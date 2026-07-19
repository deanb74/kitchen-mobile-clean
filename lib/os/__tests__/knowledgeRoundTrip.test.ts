import { HelpingHandOS } from "../helpingHandOS";
import { KnowledgeRouter } from "../routing/knowledgeRouter";
import { InMemoryKnowledgeStore } from "../knowledge/testing/inMemoryKnowledgeStore";
import { MockHospitalityHQ } from "../hq/testing/mockHospitalityHQ";
import type { KnowledgeQuestion } from "../types";

describe("Helping Hand OS knowledge round trip", () => {
  it("asks Profession HQ once, stores the answer, then reuses it locally", async () => {
    const store = new InMemoryKnowledgeStore();
    const hospitalityHQ = new MockHospitalityHQ();

    const router = new KnowledgeRouter(store, hospitalityHQ);
    const os = new HelpingHandOS(router);

    const question: KnowledgeQuestion = {
      id: "question-1",
      question: "What temperature should chilled food be stored at?",
      colleague: {
        id: "HH-0001",
        name: "Annie",
        profession: "hospitality",
        venueId: "test-venue",
      },
      context: {
        area: "kitchen",
      },
      createdAt: new Date().toISOString(),
    };

    const firstAnswer = await os.answer(question, "online");

    expect(firstAnswer).not.toBeNull();
    expect(firstAnswer?.sourceLevel).toBe("profession");
    expect(hospitalityHQ.enquiryCount).toBe(1);
    expect(store.size).toBe(1);

    const secondAnswer = await os.answer(question, "online");

    expect(secondAnswer).toEqual(firstAnswer);
    expect(hospitalityHQ.enquiryCount).toBe(1);
    expect(store.size).toBe(1);
  });

  it("does not contact Profession HQ while offline", async () => {
    const store = new InMemoryKnowledgeStore();
    const hospitalityHQ = new MockHospitalityHQ();

    const router = new KnowledgeRouter(store, hospitalityHQ);
    const os = new HelpingHandOS(router);

    const question: KnowledgeQuestion = {
      id: "question-2",
      question: "What is the latest professional guidance?",
      colleague: {
        id: "HH-0001",
        name: "Annie",
        profession: "hospitality",
      },
      createdAt: new Date().toISOString(),
    };

    const answer = await os.answer(question, "offline");

    expect(answer).toBeNull();
    expect(hospitalityHQ.enquiryCount).toBe(0);
    expect(store.size).toBe(0);
  });
});
