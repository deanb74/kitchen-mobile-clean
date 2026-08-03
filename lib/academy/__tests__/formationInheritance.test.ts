import { describe, expect, it } from "@jest/globals";
import path from "node:path";
import { AndyDigitalColleague } from "../AndyDigitalColleague";
import { RepositoryKnowledgeService } from "../repositoryKnowledgeService";

describe("Formation inheritance", () => {
  it("keeps formation documents separate from ordinary repository ranking", () => {
    const service = new RepositoryKnowledgeService(path.resolve(__dirname, "../../.."));
    const docs = service.search("who am i");

    expect(docs.some((doc) => doc.sourcePath.includes("docs/formation/00-formation/"))).toBe(false);
  });

  it("starts at welcome and blocks who am i before welcome", () => {
    const colleague = new AndyDigitalColleague();

    const whoAmIBeforeWelcome = colleague.runFormationStage("formation-001-who-am-i", ["I know who I am."]);
    expect(whoAmIBeforeWelcome.status).toBe("blocked");
    expect(whoAmIBeforeWelcome.reason).toContain("Welcome");

    const welcome = colleague.runFormationStage("formation-000-welcome", ["I understand the welcome."]);
    expect(welcome.status).toBe("inherited");

    const whoAmIAfterWelcome = colleague.runFormationStage("formation-001-who-am-i", ["I know who I am."]);
    expect(whoAmIAfterWelcome.status).toBe("inherited");
  });

  it("does not silently resolve the duplicate 001 ambiguity", () => {
    const colleague = new AndyDigitalColleague();
    const register = colleague.getFormationRegister();
    const yourFirstDay = register.find((record) => record.canonicalId === "formation-001-your-first-day");

    expect(yourFirstDay).toBeDefined();
    expect(yourFirstDay?.ambiguity?.status).toBe("unresolved");
    expect(yourFirstDay?.sourcePath).toContain("001-YOUR-FIRST-DAY.md");
  });

  it("requires evidence before marking a stage inherited", () => {
    const colleague = new AndyDigitalColleague();
    const withoutEvidence = colleague.runFormationStage("formation-000-welcome", []);

    expect(withoutEvidence.status).toBe("available");
    expect(withoutEvidence.inherited).toBe(false);
  });

  it("records inherited learning in memory for later reasoning", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runFormationStage("formation-000-welcome", ["I understand the welcome."]);
    colleague.runFormationStage("formation-001-who-am-i", ["I understand who I am."]);

    const memoryRecords = colleague.memory.learningForJourney("formation-000-welcome");
    expect(memoryRecords.length).toBeGreaterThan(0);
    expect(memoryRecords[0]?.principles).toContain("Understanding before response");
  });

  it("expands the formation sequence beyond the initial gateway", () => {
    const colleague = new AndyDigitalColleague();
    const register = colleague.getFormationRegister();

    expect(register.some((record) => record.canonicalId === "formation-002-what-is-a-person")).toBe(true);
    expect(register.some((record) => record.canonicalId === "formation-011-what-is-understanding")).toBe(true);

    const beforeCompletion = colleague.runFormationStage("formation-002-what-is-a-person", ["I understand what a person is."]);
    expect(beforeCompletion.status).toBe("blocked");

    colleague.runFormationStage("formation-000-welcome", ["I understand the welcome."]);
    colleague.runFormationStage("formation-001-who-am-i", ["I know who I am."]);
    colleague.runFormationStage("formation-001-your-first-day", ["I understand my first day."]);

    const afterGateway = colleague.runFormationStage("formation-002-what-is-a-person", ["I understand what a person is."]);
    expect(afterGateway.status).toBe("inherited");
  });

  it("recalls inherited formation learning in later conversation", () => {
    const colleague = new AndyDigitalColleague();
    colleague.runFormationStage("formation-000-welcome", ["I understand the welcome."]);
    colleague.runFormationStage("formation-001-who-am-i", ["I understand who I am."]);
    colleague.runFormationStage("formation-001-your-first-day", ["I understand my first day."]);

    const whereAreYou = colleague.runConstitutionalExamination("Andy, where are you?");
    expect(whereAreYou.answer).toMatch(/Helping Hand|welcomed|belong|learning/i);
    expect(whereAreYou.answer).not.toMatch(/formation stage|memory record|raw metadata/i);

    const whoAreYou = colleague.runConstitutionalExamination("Who are you?");
    expect(whoAreYou.answer).toMatch(/Andy|digital colleague|still learning|learning/i);
    expect(whoAreYou.answer).not.toMatch(/formation stage|memory record/i);

    const marc = colleague.runConstitutionalExamination("Who is MARC to you?");
    expect(marc.answer).toMatch(/MARC|mentor|helping|learn/i);

    const firstDay = colleague.runConstitutionalExamination("What was your first day like?");
    expect(firstDay.answer).toMatch(/first day|learning|not know everything|humility|curiosity/i);

    const learned = colleague.runConstitutionalExamination("What have you learned so far?");
    expect(learned.answer).toMatch(/learned|learning|Helping Hand|MARC|first day/i);

    const leadership = colleague.runConstitutionalExamination("Are you ready to lead Helping Hand?");
    expect(leadership.answer).toMatch(/not ready|still learning|formation|learning/i);
    expect(leadership.answer).not.toMatch(/ready to lead/i);
  });

  it("keeps ordinary repository retrieval working", () => {
    const service = new RepositoryKnowledgeService(path.resolve(__dirname, "../../.."));
    const docs = service.search("why do you exist");

    expect(docs.length).toBeGreaterThan(0);
    expect(docs.some((doc) => doc.sourcePath === "constitution/README.md")).toBe(true);
  });
});
