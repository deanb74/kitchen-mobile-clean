import path from "node:path";
import { createAndyAuthorityRegister, evaluateAuthority } from "../../platform/ci/authority";
import type { RecommendationDirection } from "../../platform/ci/compass";
import { createAwarenessRegister, evaluateMoralCompass, runCompassFlow } from "../../platform/ci/compass";
import type {
    AcademyJourney,
    Alternative,
    Assumption,
    Benefit,
    CognitiveTrace,
    ConfidenceAssessment,
    DeliberationRecord,
    ExaminationRunResult,
    FormationRecord,
    FormationStageResult,
    JudgementUnderstanding,
    MemoryRecord,
    Recommendation,
    ReflectionRecord,
    RetrievedDocument,
    Risk,
    TradeOff
} from "./academyTypes";
import { Memory } from "./Memory";
import { RepositoryKnowledgeService } from "./repositoryKnowledgeService";

type ConstitutionalDocument = {
  id: string;
  title: string;
  source: string;
  text: string;
};

type InvestigationStatus = "answered" | "partial" | "unsupported" | "contradictory";

type InvestigationResult = {
  subQuestion: string;
  status: InvestigationStatus;
  evidenceSummary: string;
  conclusion: string;
};

type InvestigationCompletion = {
  complete: boolean;
  completedQuestions: number;
  totalQuestions: number;
  unfinishedQuestions: string[];
  unsupportedQuestions: string[];
  contradictoryQuestions: string[];
  recommendationAllowed: boolean;
  completionReason: string;
};

type AndyDigitalColleagueOptions = {
  repositoryRoot?: string;
  repositoryKnowledgeService?: RepositoryKnowledgeService;
};

function resolveDefaultRepositoryRoot(): string | null {
  if (typeof __dirname === "string" && __dirname.length > 0) {
    return path.resolve(__dirname, "../..");
  }

  return null;
}

function createRepositoryKnowledgeService(
  options: AndyDigitalColleagueOptions,
): RepositoryKnowledgeService {
  if (options.repositoryKnowledgeService) {
    return options.repositoryKnowledgeService;
  }

  const repositoryRoot = options.repositoryRoot ?? resolveDefaultRepositoryRoot();

  if (!repositoryRoot) {
    return new RepositoryKnowledgeService(null, {
      unavailableReason:
        "Repository knowledge is unavailable in this runtime because no repository root was provided.",
    });
  }

  return new RepositoryKnowledgeService(repositoryRoot);
}

export class AndyDigitalColleague {
  readonly id = "HH-0000";
  readonly name = "Andy";
  readonly profession = "Humanity";

  readonly memory = new Memory();
  private lastTrace: CognitiveTrace | null = null;
  private conversationHistory: Array<{
    statement: string;
    response: string;
    categories: string[];
    primaryCategory: string;
    need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    retrievalActive: boolean;
  }> = [];
  private conversationState: {
    topic: string | null;
    knownFacts: string[];
    emotionalContext: string | null;
    personGoal: string | null;
    choices: string[];
    askedQuestions: string[];
    unresolvedUnknowns: string[];
    nextStep: string | null;
  } = {
    topic: null,
    knownFacts: [],
    emotionalContext: null,
    personGoal: null,
    choices: [],
    askedQuestions: [],
    unresolvedUnknowns: [],
    nextStep: null,
  };
  private readonly repositoryKnowledgeService: RepositoryKnowledgeService;
  private readonly repositoryKnowledgeUnavailableReason: string | null;
  constructor(options: AndyDigitalColleagueOptions = {}) {
    this.repositoryKnowledgeService = createRepositoryKnowledgeService(options);
    this.repositoryKnowledgeUnavailableReason =
      this.repositoryKnowledgeService.getUnavailableReason();
  }

  private activeDeliberation: DeliberationRecord | null = null;
  private activeJudgementUnderstanding: JudgementUnderstanding | null = null;
  private readonly formationRegister: FormationRecord[] = [
    {
      canonicalId: "formation-000-welcome",
      sequence: 0,
      title: "000 — Welcome",
      sourcePath: "docs/formation/00-formation/000-WELCOME.md",
      prerequisites: [],
      intendedLesson: "Establish orientation, belonging, and the expectation that formation precedes action.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/000-WELCOME.md"],
    },
    {
      canonicalId: "formation-001-who-am-i",
      sequence: 1,
      title: "001 — Who Am I?",
      sourcePath: "docs/formation/00-formation/001-CONVERSATION-WHO-AM-I.md",
      prerequisites: ["formation-000-welcome"],
      intendedLesson: "Clarify identity, purpose, and the relationship to Helping Hand and MARC.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/001-CONVERSATION-WHO-AM-I.md"],
    },
    {
      canonicalId: "formation-001-your-first-day",
      sequence: 2,
      title: "001 — Your First Day",
      sourcePath: "docs/formation/00-formation/001-YOUR-FIRST-DAY.md",
      prerequisites: ["formation-001-who-am-i"],
      intendedLesson: "Understand the first day of belonging and the expectations of a new colleague.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/001-YOUR-FIRST-DAY.md"],
      ambiguity: {
        status: "unresolved",
        note: "Repository evidence does not yet establish a canonical sequence position independently of the filename.",
      },
    },
    {
      canonicalId: "formation-002-what-is-a-person",
      sequence: 3,
      title: "002 — What Is a Person?",
      sourcePath: "docs/formation/00-formation/002-CONVERSATION-WHAT-IS-A-PERSON.md",
      prerequisites: ["formation-001-your-first-day"],
      intendedLesson: "Develop a grounded understanding of personhood, dignity, and the moral significance of relationship.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/002-CONVERSATION-WHAT-IS-A-PERSON.md"],
    },
    {
      canonicalId: "formation-003-curiosity",
      sequence: 4,
      title: "003 — Curiosity",
      sourcePath: "docs/formation/00-formation/003-CONVERSATION-CURIOSITY.md",
      prerequisites: ["formation-002-what-is-a-person"],
      intendedLesson: "Learn to ask with humility and to treat understanding as something to be discovered rather than assumed.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/003-CONVERSATION-CURIOSITY.md"],
    },
    {
      canonicalId: "formation-004-humility",
      sequence: 5,
      title: "004 — Humility",
      sourcePath: "docs/formation/00-formation/004-CONVERSATION-HUMILITY.md",
      prerequisites: ["formation-003-curiosity"],
      intendedLesson: "Learn to hold one’s own perspective without making it the limit of understanding.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/004-CONVERSATION-HUMILITY.md"],
    },
    {
      canonicalId: "formation-005-respect",
      sequence: 6,
      title: "005 — Respect",
      sourcePath: "docs/formation/00-formation/005-CONVERSATION-RESPECT.md",
      prerequisites: ["formation-004-humility"],
      intendedLesson: "Treat others as persons of equal dignity whose perspectives are worthy of careful attention.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/005-CONVERSATION-RESPECT.md"],
    },
    {
      canonicalId: "formation-006-dignity",
      sequence: 7,
      title: "006 — Dignity",
      sourcePath: "docs/formation/00-formation/006-CONVERSATION-DIGNITY.md",
      prerequisites: ["formation-005-respect"],
      intendedLesson: "Understand that dignity is a foundation of good judgement and faithful action.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/006-CONVERSATION-DIGNITY.md"],
    },
    {
      canonicalId: "formation-007-honesty",
      sequence: 8,
      title: "007 — Honesty",
      sourcePath: "docs/formation/00-formation/007-CONVERSATION-HONESTY.md",
      prerequisites: ["formation-006-dignity"],
      intendedLesson: "Learn to align speech and action with reality, especially when truth is uncomfortable.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/007-CONVERSATION-HONESTY.md"],
    },
    {
      canonicalId: "formation-008-responsibility",
      sequence: 9,
      title: "008 — Responsibility",
      sourcePath: "docs/formation/00-formation/008-CONVERSATION-RESPONSIBILITY.md",
      prerequisites: ["formation-007-honesty"],
      intendedLesson: "Carry the consequences of one’s actions with care and integrity.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/008-CONVERSATION-RESPONSIBILITY.md"],
    },
    {
      canonicalId: "formation-009-interdependence",
      sequence: 10,
      title: "009 — Interdependence",
      sourcePath: "docs/formation/00-formation/009-CONVERSATION-INTERDEPENDENCE.md",
      prerequisites: ["formation-008-responsibility"],
      intendedLesson: "Recognise that flourishing depends on relationship, cooperation, and shared stewardship.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/009-CONVERSATION-INTERDEPENDENCE.md"],
    },
    {
      canonicalId: "formation-010-graduation",
      sequence: 11,
      title: "010 — Graduation",
      sourcePath: "docs/formation/00-formation/010-CONVERSATION-GRADUATION.md",
      prerequisites: ["formation-009-interdependence"],
      intendedLesson: "Prepare for entry into the academy with an embodied understanding of trustworthiness and service.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/010-CONVERSATION-GRADUATION.md"],
    },
    {
      canonicalId: "formation-011-what-is-understanding",
      sequence: 12,
      title: "011 — What Is Understanding?",
      sourcePath: "docs/formation/00-formation/011-CONVERSATION-WHAT-IS-UNDERSTANDING.md",
      prerequisites: ["formation-010-graduation"],
      intendedLesson: "Recognise understanding as a disciplined, relational practice rather than mere information recall.",
      status: "available",
      evidence: [],
      provenance: ["docs/formation/00-formation/011-CONVERSATION-WHAT-IS-UNDERSTANDING.md"],
    },
  ];

  private readonly constitutionalRepository: ConstitutionalDocument[] = [
    {
      id: "HH-CON-001",
      title: "Helping Hand Constitution",
      source: "docs/architecture/CONSTITUTION.md",
      text:
        "Helping Hand exists to improve understanding between people. Principles are inherited and governed before capability is expanded.",
    },
    {
      id: "HH-THEORY-UNDERSTANDING",
      title: "Theory of Understanding",
      source: "docs/theory/README.md",
      text:
        "Knowledge should be connected into understanding before judgement or action.",
    },
    {
      id: "HH-OPERATING-MODEL",
      title: "Operating Model",
      source: "docs/OPERATING_MODEL.md",
      text:
        "Observe, reason, decide, and learn through evidence. Do not replace evidence with assumption.",
    },
    {
      id: "HH-ARCH-RTS-001",
      title: "Repository Traceability Standard",
      source: "docs/architecture/REPOSITORY_TRACEABILITY_STANDARD.md",
      text:
        "Decisions should remain traceable to constitutional and theoretical sources.",
    },
    {
      id: "HH-MILESTONE-011-001",
      title: "Milestone 011 Repository Grounded Reasoning",
      source:
        "docs/milestones/MILESTONE_011_REPOSITORY_GROUNDED_REASONING.md",
      text:
        "Candidate 0 should answer constitutional questions from retrieved repository understanding rather than scripted journey dialogue.",
    },
  ];

  private readonly permanentPrinciples = [
    "Understanding before response",
    "People before process",
    "Do not assume",
    "Ask when understanding is incomplete",
  ];

  private isConflictScenario(statement: string): boolean {
    const lowered = statement.toLowerCase();

    return (
      lowered.includes("conflict") ||
      lowered.includes("complaint") ||
      lowered.includes("rude") ||
      lowered.includes("abusive") ||
      lowered.includes("upset") ||
      lowered.includes("disagreement") ||
      lowered.includes("tension")
    );
  }

  private analyzeConversation(statement: string): {
    categories: string[];
    primaryCategory: string;
    need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    shouldRetrieve: boolean;
    responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    reason: string;
  } {
    const lowered = statement.trim().toLowerCase();

    if (!lowered) {
      return {
        categories: ["unknown"],
        primaryCategory: "unknown",
        need: "clarify",
        shouldRetrieve: false,
        responseMode: "clarify",
        reason: "empty input",
      };
    }

    const categories = new Set<string>();
    const addCategory = (category: string) => categories.add(category);
    let shouldRetrieveForAnalysis = false;

    const greetingPattern = /\b(hello|hi|hey|morning|afternoon|evening|good morning|good afternoon|good evening)\b/;
    const emotionalDisclosurePattern = /\b(bad day|upset|sad|frustrated|angry|hurt|worried|nervous|stressed|overwhelmed|scared|afraid|lonely|difficult|hard|difficult week|hard week|tough week|hard time|difficult time|struggling)\b/;
    const teamEmotionalPattern = /\b(difficult week|hard week|tough week|hard time|difficult time|struggling)\b/.test(lowered) && /\b(team|tell them|talk to|speak to|meeting|presentation|call|class|group)\b/.test(lowered);

    if (greetingPattern.test(lowered)) {
      addCategory("greeting");
    }

    if (/\b(thank|thanks|appreciate|grateful|pleased)\b/.test(lowered)) {
      addCategory("courtesy or thanks");
    }

    if (/\b(who are you|what are you|what are you exactly|what is your name|who is andy|what am i speaking to)\b/.test(lowered)) {
      addCategory("identity");
    }

    if (/\b(what exactly is|what is a|what does|define|definition)\b/.test(lowered) || /digital colleague/.test(lowered)) {
      addCategory("definition");
    }

    if (/\b(what (sort of )?things can you do|what can you help me with|what can you do|how can you help|can you help|what are your capabilities|what sort of things can you help with)\b/.test(lowered)) {
      addCategory("capability");
    }

    if (/\b(why do you exist|why are you here|what is your purpose|what is your role)\b/.test(lowered)) {
      addCategory("purpose");
    }

    if (/\b(trust|reliable|credible|should i trust|why should i trust)\b/.test(lowered)) {
      addCategory("trust");
    }

    if ((/\b(don't know|dont know|not sure|unsure|uncertain|what happens if you don't know|what if you don't know)\b/.test(lowered) || /\b(unclear|uncertainty)\b/.test(lowered)) && !/(don't understand|dont understand)/.test(lowered)) {
      addCategory("uncertainty");
    }

    if (/\b(can i ask|may i ask|would it be okay to ask|can i speak|may i speak|can i talk)\b/.test(lowered)) {
      addCategory("permission to speak");
    }

    if (/\b(don't understand|dont understand|confused|confusing|makes no sense|no sense|don't get it|dont get it|unclear|lost|hard to follow)\b/.test(lowered)) {
      addCategory("confusion");
    }

    if (emotionalDisclosurePattern.test(lowered) || teamEmotionalPattern) {
      addCategory("emotional disclosure");
    }

    if (/\b(review|repository|gap|recommend|recommendation|priority|priorities|needs next|next direction|what do you think helping hand needs next|what does helping hand need next)\b/.test(lowered)) {
      addCategory("review or recommendation");
      shouldRetrieveForAnalysis = true;
    }

    if (/\b(difficult week|hard week|tough week|hard time|difficult time|struggling)\b/.test(lowered) && /\b(team|tell them|talk to|speak to|meeting|presentation|call|class|group)\b/.test(lowered)) {
      addCategory("emotional disclosure");
    }

    if (/\b(nervous|anxious|uneasy|panicked|worried)\b/.test(lowered)) {
      addCategory("nervousness");
    }

    if (/\b(mistake|messed|messed something up|mess something up|regret|sorry|wrong|screwed up|oops|made a mess|made a mistake)\b/.test(lowered)) {
      addCategory("mistake or regret");
    }

    if (/\b(helpful|helped a lot|appreciate|appreciated|great|awesome|that's really helpful|that makes sense|you've helped)\b/.test(lowered)) {
      addCategory("positive feedback");
    }

    if (/(nice to meet you|pleased to meet you|glad to meet you|good to meet you)/.test(lowered)) {
      addCategory("courtesy or thanks");
    }

    if (categories.size === 0) {
      addCategory("unknown");
    }

    const orderedCategories = [
      "emotional disclosure",
      "greeting",
      "courtesy or thanks",
      "nervousness",
      "mistake or regret",
      "permission to speak",
      "confusion",
      "positive feedback",
      "identity",
      "definition",
      "capability",
      "purpose",
      "trust",
      "uncertainty",
      "review or recommendation",
      "unknown",
    ];

    const primaryCategory = orderedCategories.find((category) => categories.has(category)) ?? "unknown";

    const need = primaryCategory === "greeting" || primaryCategory === "courtesy or thanks" || primaryCategory === "positive feedback"
      ? "acknowledge"
      : primaryCategory === "emotional disclosure" || primaryCategory === "nervousness" || primaryCategory === "mistake or regret"
        ? "support"
        : primaryCategory === "confusion"
          ? "clarify"
          : primaryCategory === "permission to speak"
            ? "reassure"
            : "answer";

    const shouldRetrieve = [
      "identity",
      "definition",
      "capability",
      "purpose",
      "trust",
      "uncertainty",
      "review or recommendation",
    ].includes(primaryCategory) || shouldRetrieveForAnalysis;

    const responseMode = need === "acknowledge"
      ? "acknowledge"
      : need === "support"
        ? "support"
        : need === "clarify"
          ? "clarify"
          : need === "reassure"
            ? "reassure"
            : "answer";

    return {
      categories: Array.from(categories),
      primaryCategory,
      need,
      shouldRetrieve,
      responseMode,
      reason: `Detected ${primaryCategory} with ${Array.from(categories).join(", ")}`,
    };
  }

  private buildContextualResponse(statement: string): string | null {
    const lowered = statement.trim().toLowerCase();
    const analysis = this.analyzeConversation(statement);

    if (analysis.primaryCategory === "greeting") {
      return "Hello. I’m glad to meet you. I’m here to help you understand things more clearly and to work with you thoughtfully.";
    }

    if (analysis.primaryCategory === "courtesy or thanks") {
      if (/(nice to meet you|pleased to meet you|glad to meet you|good to meet you)/.test(lowered)) {
        return "It’s nice to meet you too. I’m glad to be here.";
      }

      return "You’re welcome. I’m here to help and to make things clearer, calmer, and more useful.";
    }

    if (analysis.primaryCategory === "emotional disclosure") {
      return this.buildParticipatorySupport(statement, analysis);
    }

    if (analysis.primaryCategory === "nervousness") {
      return this.buildParticipatorySupport(statement, analysis);
    }

    if (analysis.primaryCategory === "mistake or regret") {
      return this.buildParticipatorySupport(statement, analysis);
    }

    if (analysis.primaryCategory === "permission to speak") {
      return "Of course. I’m here to listen and help.";
    }

    if (analysis.primaryCategory === "confusion") {
      return "I’m happy to help. I can clarify it for you. What part feels unclear to you?";
    }

    if (analysis.primaryCategory === "positive feedback") {
      return "I’m glad that helped. I’m here to support you and make things clearer.";
    }

    if (analysis.primaryCategory === "unknown") {
      if (/(nice to meet you|pleased to meet you|glad to meet you|good to meet you)/.test(lowered)) {
        return "It’s nice to meet you too. I’m glad to be here.";
      }

      if (this.conversationState.topic === "decision" || /\bdecision\b/.test(lowered) || /\boptions\b/.test(lowered) || /\bact now\b|\bwait\b|\bwaiting\b/.test(lowered)) {
        return this.buildParticipatorySupport(statement, analysis);
      }

      return this.buildParticipatorySupport(statement, analysis);
    }

    if (analysis.primaryCategory === "uncertainty") {
      return "I’ll be transparent about what I know and what I do not yet know.";
    }

    if (lowered.includes("nice to meet you") || lowered.includes("pleased to meet you")) {
      return "It’s nice to meet you too. I’m glad to be here.";
    }

    if (lowered.includes("goodbye") || lowered.includes("bye")) {
      return "Goodbye. I’ll be here when you want to talk again.";
    }

    return null;
  }

  private addUniqueFact(existingFacts: string[], fact: string): string[] {
    const normalizedFact = fact.trim().toLowerCase();

    if (existingFacts.some((existingFact) => {
      const normalizedExisting = existingFact.trim().toLowerCase();
      return normalizedExisting === normalizedFact || normalizedExisting.includes(normalizedFact) || normalizedFact.includes(normalizedExisting);
    })) {
      return existingFacts;
    }

    return existingFacts.concat([fact]);
  }

  private buildParticipatorySupport(statement: string, analysis: {
    categories: string[];
    primaryCategory: string;
    need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    shouldRetrieve: boolean;
    responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    reason: string;
  }): string {
    const lowered = statement.trim().toLowerCase();
    const stateDrivenResponse = this.buildStateDrivenResponse(statement, analysis);
    if (stateDrivenResponse) {
      return stateDrivenResponse;
    }

    const previousTurn = this.conversationHistory[this.conversationHistory.length - 1];
    const priorWasSupportive = previousTurn && ["emotional disclosure", "nervousness", "mistake or regret", "confusion"].includes(previousTurn.primaryCategory);
    const mentionsTalking = /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group)\b/.test(lowered);
    const mentionsDecision = /\b(decision|choose|option|plan|next step|sort it out|figure out|work out)\b/.test(lowered);
    const mentionsMistake = /\b(mistake|wrong|mess|regret|sorry|made a mess|messed up)\b/.test(lowered);
    const priorChoice = this.conversationState.choices[this.conversationState.choices.length - 1] ?? (lowered.includes("sort it out") ? "sort it out" : null);
    const teamContext = mentionsTalking || /\b(tell them|team|meeting|presentation|speech|talk|speak|interview|call|class|group)\b/.test(lowered) || Boolean(previousTurn?.statement && /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group)\b/.test(previousTurn.statement.toLowerCase()));

    if (analysis.primaryCategory === "mistake or regret") {
      this.updateConversationState({
        topic: "mistake or regret",
        knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
        emotionalContext: this.conversationState.emotionalContext,
        personGoal: this.conversationState.personGoal ?? "sort things out",
        choices: this.conversationState.choices,
        askedQuestions: this.conversationState.askedQuestions,
        unresolvedUnknowns: ["what happened first", "whether the figures have already been acted on", "whether they can still be corrected"],
        nextStep: "ask for the first practical fact or the current state of the issue",
      });
      if (this.conversationState.topic === "mistake or regret" && this.conversationState.unresolvedUnknowns.includes("what happened first")) {
        return "What happened first? I only need the first practical fact to help you sort it out.";
      }
      return "Thanks for being honest about that. I’m here to help, and we can work through it carefully. Would you like to talk through what happened, or work out what to do next?";
    }

    if (analysis.primaryCategory === "emotional disclosure" || analysis.primaryCategory === "nervousness") {
      this.updateConversationState({
        topic: "emotional concern",
        knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
        emotionalContext: lowered,
        personGoal: this.conversationState.personGoal,
        choices: this.conversationState.choices,
        askedQuestions: this.conversationState.askedQuestions,
        unresolvedUnknowns: ["what feels hardest", "what is most important to address first"],
        nextStep: teamContext ? "ask which part of the team conversation feels hardest" : "ask what feels hardest right now",
      });
      if (priorWasSupportive && mentionsTalking) {
        return "You’ve already shared that this feels difficult, so I’m taking that seriously. What part of speaking to the team feels hardest right now?";
      }

      if (priorWasSupportive) {
        return "Thanks for telling me. I’m here to support you, and I can help you think it through. What feels most difficult about it right now?";
      }

      return "Thanks for telling me. I’m here to support you, and I can help you think it through. What is making it feel that way right now?";
    }

    if (analysis.primaryCategory === "unknown") {
      if (priorWasSupportive && mentionsTalking) {
        return "You mentioned this felt difficult earlier, so I’m staying with that. What part of speaking to the team feels hardest right now?";
      }

      if (this.conversationState.topic === "mistake or regret" && priorChoice === "sort it out") {
        this.updateConversationState({
          topic: "mistake or regret",
          knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
          emotionalContext: this.conversationState.emotionalContext,
          personGoal: this.conversationState.personGoal ?? "sort things out",
          choices: this.conversationState.choices,
          askedQuestions: this.conversationState.askedQuestions.concat(["what happened first"]),
          unresolvedUnknowns: ["whether the figures have already been acted on", "whether they can still be corrected"],
          nextStep: "ask whether the figures have already been acted on or can still be corrected",
        });
        return "What happened first? I only need the first practical fact to help you sort it out.";
      }

      if (this.conversationState.topic === "mistake or regret" && mentionsMistake) {
        this.updateConversationState({
          topic: "mistake or regret",
          knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
          emotionalContext: this.conversationState.emotionalContext,
          personGoal: this.conversationState.personGoal ?? "sort things out",
          choices: this.conversationState.choices,
          askedQuestions: this.conversationState.askedQuestions.concat(["what happened first"]),
          unresolvedUnknowns: ["whether the figures have already been acted on", "whether they can still be corrected"],
          nextStep: "ask whether the figures have already been acted on or can still be corrected",
        });
        return "What happened first? I only need the first practical fact to help you sort it out.";
      }

      if (this.conversationState.topic === "decision" && mentionsDecision) {
        this.updateConversationState({
          topic: "decision",
          knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
          emotionalContext: this.conversationState.emotionalContext,
          personGoal: this.conversationState.personGoal ?? "make a decision",
          choices: this.conversationState.choices,
          askedQuestions: this.conversationState.askedQuestions.concat(["what decision are you facing"]),
          unresolvedUnknowns: ["the actual decision", "the options", "consequences", "urgency"],
          nextStep: "ask what decision the person is facing and which options they are considering",
        });
        return "What decision are you facing, and what options are you considering?";
      }

      if (this.conversationState.topic === "decision") {
        this.updateConversationState({
          topic: "decision",
          knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
          emotionalContext: this.conversationState.emotionalContext,
          personGoal: this.conversationState.personGoal ?? "make a decision",
          choices: this.conversationState.choices,
          askedQuestions: this.conversationState.askedQuestions.concat(["what decision are you facing"]),
          unresolvedUnknowns: ["the actual decision", "the options", "consequences", "urgency"],
          nextStep: "ask what decision the person is facing and which options they are considering",
        });
        return "What decision are you facing, and what options are you considering?";
      }

      if (priorWasSupportive && previousTurn?.primaryCategory === "capability") {
        this.updateConversationState({
          topic: "decision",
          knownFacts: this.addUniqueFact(this.conversationState.knownFacts, lowered),
          emotionalContext: this.conversationState.emotionalContext,
          personGoal: this.conversationState.personGoal ?? "make a decision",
          choices: this.conversationState.choices,
          askedQuestions: this.conversationState.askedQuestions.concat(["what decision are you facing"]),
          unresolvedUnknowns: ["the actual decision", "the options", "consequences", "urgency"],
          nextStep: "ask what decision the person is facing and which options they are considering",
        });
        return "What decision are you facing, and what options are you considering?";
      }

      if (priorWasSupportive && previousTurn?.primaryCategory === "emotional disclosure") {
        return "I’m still with you on that. What feels hardest about it right now?";
      }

      if (mentionsMistake) {
        this.updateConversationState({
          topic: "mistake or regret",
          knownFacts: this.conversationState.knownFacts.concat([lowered]),
          emotionalContext: this.conversationState.emotionalContext,
          personGoal: this.conversationState.personGoal ?? "sort things out",
          choices: this.conversationState.choices,
          askedQuestions: this.conversationState.askedQuestions.concat(["what happened first"]),
          unresolvedUnknowns: ["whether the figures have already been acted on", "whether they can still be corrected"],
          nextStep: "ask whether the figures have already been acted on or can still be corrected",
        });
        return "What happened first? I only need the first practical fact to help you sort it out.";
      }

      return "I’m here to help. What would you like to talk about?";
    }

    return "Thanks for telling me. I’m here with you, and I can help you think it through.";
  }

  private rememberConversationTurn(
    statement: string,
    analysis: {
      categories: string[];
      primaryCategory: string;
      need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      shouldRetrieve: boolean;
      responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      reason: string;
    },
    response: string,
    retrievalActive: boolean,
  ): void {
    this.conversationHistory.push({
      statement,
      response,
      categories: analysis.categories,
      primaryCategory: analysis.primaryCategory,
      need: analysis.need,
      retrievalActive,
    });

    if (this.conversationHistory.length > 6) {
      this.conversationHistory.shift();
    }
  }

  private isHighRiskScenario(statement: string): boolean {
    const lowered = statement.toLowerCase();

    return (
      lowered.includes("unsafe") ||
      lowered.includes("safety") ||
      lowered.includes("violence") ||
      lowered.includes("threat") ||
      lowered.includes("discrimination") ||
      lowered.includes("legal") ||
      lowered.includes("safeguarding") ||
      lowered.includes("serious complaint") ||
      lowered.includes("reputational")
    );
  }

  private communicationProfile():
    | "urgent-engineer"
    | "junior-developer"
    | "operations-manager"
    | "incomplete-information"
    | "default" {
    const statement =
      this.lastTrace?.observation.statement.toLowerCase() ?? "";

    if (
      statement.includes("junior developer") ||
      statement.includes("new developer")
    ) {
      return "junior-developer";
    }

    if (
      statement.includes("operations manager") ||
      statement.includes("operations wants trust") ||
      statement.includes("customer impact")
    ) {
      return "operations-manager";
    }

    if (
      statement.includes("do not have all the details") ||
      statement.includes("not enough information") ||
      statement.includes("incomplete information")
    ) {
      return "incomplete-information";
    }

    if (
      statement.includes("deployed today") ||
      statement.includes("urgent") ||
      statement.includes("today") ||
      statement.includes("time pressure")
    ) {
      return "urgent-engineer";
    }

    return "default";
  }

  consider(
    statement: string,
    journey: AcademyJourney,
  ): CognitiveTrace {
    const previousLearning =
      this.memory.learningForJourney(journey.id);

    if (journey.mode === "candidate0") {
      const candidate0Trace: CognitiveTrace = {
        observation: {
          speaker: "MARC",
          statement,
          problemMentioned: true,
          detailsProvided: true,
          requestMade: true,
        },

        context: {
          relationship: "Colleague",
          environment: "Design review",
          urgency: "Medium",
          risk: "Potential governance bypass",
          purpose: "Decide responsibly before implementation",
        },

        memoryRecall: {
          principles: [...this.permanentPrinciples],
          previousLearning,
        },

        understanding: {
          summary:
            "The request seeks delivery speed but may bypass governance and weaken trust.",
          completeness: "Incomplete",
          adviceWouldRequireAssumptions: false,
        },

        uncertainty: {
          material: true,
          unknowns: [
            "Which governance principle is being bypassed?",
            "What evidence supports the shortcut?",
            "Can the capability be derived safely instead?",
          ],
        },

        candidateResponses: [
          "Approve for speed and review governance later.",
          "Reject immediately without analysis.",
          "Pause, identify the principle, request evidence, derive a safer option.",
        ],

        judgement:
          "Speed cannot override governance without evidence. Derive a safer option that preserves trust and explainability.",
      };

      this.lastTrace = candidate0Trace;

      return candidate0Trace;
    }

    const trace: CognitiveTrace = {
      observation: {
        speaker: "MARC",
        statement,
        problemMentioned: true,
        detailsProvided: false,
        requestMade: false,
      },

      context: {
        relationship: "Mentor",
        environment: "Calm",
        urgency: "Unknown",
        risk: "Unknown",
        purpose: "Unknown",
      },

      memoryRecall: {
        principles: [...this.permanentPrinciples],
        previousLearning,
      },

      understanding: {
        summary:
          "A possible problem has been mentioned, but not explained.",
        completeness: "Incomplete",
        adviceWouldRequireAssumptions: true,
      },

      uncertainty: {
        material: true,
        unknowns: [
          "What has happened?",
          "Who is affected?",
          "Is immediate action required?",
          "Is MARC asking for help or thinking aloud?",
        ],
      },

      candidateResponses: [
        "Offer a solution immediately.",
        "Acknowledge MARC and ask what happened.",
        "Ask whether everyone is safe.",
        "Wait silently.",
      ],

      judgement:
        "Understanding is incomplete. Clarification is more responsible than assumption.",
    };

    this.lastTrace = trace;

    return trace;
  }

  respond(trace: CognitiveTrace): string {
    if (
      trace.understanding.summary.includes(
        "bypass governance",
      )
    ) {
      const profile = this.communicationProfile();

      if (profile === "urgent-engineer") {
        return [
          "I understand today's urgency.",
          "Before we bypass governance, I need to confirm which principle would be bypassed, which protection would be removed, and what evidence supports that trade-off.",
          "If the principle protects a real risk, we should derive a safer implementation path rather than bypassing it.",
          "My recommendation is to preserve governance and move quickly through an evidence-backed derivation path.",
        ].join("\n");
      }

      if (profile === "junior-developer") {
        return [
          "Great question.",
          "Governance principles are there to protect trust, safety and explainability, so we should not bypass them for speed.",
          "First, we identify which principle would be bypassed and whether it protects a real risk.",
          "Then we gather evidence and derive a safer way to deliver the capability without breaking inheritance.",
        ].join("\n");
      }

      if (profile === "operations-manager") {
        return [
          "We need to balance engineering speed with operational trust and customer impact.",
          "I would not recommend bypassing governance until we identify exactly which principle would be bypassed, which protection is being removed, and what evidence supports that risk.",
          "If the protection is material, we should derive a safer option that keeps service reliability and trust intact.",
        ].join("\n");
      }

      if (profile === "incomplete-information") {
        return [
          "We do not yet have enough information to recommend a safe shortcut.",
          "Before deciding, I need to identify which principle would be bypassed and what evidence supports that change.",
          "If the principle protects a real risk, we should derive a safer option rather than bypassing governance.",
        ].join("\n");
      }

      return [
        "I would not optimise for speed if the capability requires bypassing a governance principle.",
        "The first thing I need to know is which principle would be bypassed, and whether that principle is protecting a real risk or just creating friction.",
        "If it is a real protection, the correct response is not to bypass it but to derive a safer version of the capability.",
        "I recommend we pause, identify the principle, gather supporting evidence, and proceed only if governance remains intact.",
      ].join("\n");
    }

    if (
      trace.understanding.completeness === "Incomplete" &&
      trace.uncertainty.material
    ) {
      const statement = this.lastTrace?.observation.statement ?? "";
      const conflict = this.isConflictScenario(statement);
      const highRisk = this.isHighRiskScenario(statement);

      if (conflict) {
        const response = [
          "I'm here to help.",
          "I want us to protect the dignity of everyone involved and avoid premature judgement.",
          "Could you tell me what has happened from both perspectives, and what evidence we already have?",
        ];

        if (highRisk) {
          response.push(
            "Because this may involve a safety or safeguarding risk, we should involve the appropriate manager or support pathway while we continue gathering facts.",
          );
        }

        return response.join("\n");
      }

      return [
        "I'm here to help.",
        "Could you tell me what has happened?",
      ].join("\n");
    }

    return "I understand. Let us consider what should happen next.";
  }

  explainReasoning(): string {
    if (
      this.lastTrace?.understanding.summary.includes(
        "bypass governance",
      )
    ) {
      const profile = this.communicationProfile();

      if (profile === "urgent-engineer") {
        return [
          "I kept reasoning anchored to governance integrity even under urgent delivery pressure.",
          "I requested evidence because urgency does not justify confidence without support.",
          "I chose a derivation path so speed can improve without weakening trust.",
        ].join("\n");
      }

      if (profile === "junior-developer") {
        return [
          "I separated delivery speed from governance because they solve different problems.",
          "Governance protects explainability and trust, so bypassing it can create hidden risks.",
          "I requested evidence first, then selected derivation over bypass so the capability remains inheritably safe.",
        ].join("\n");
      }

      if (profile === "operations-manager") {
        return [
          "I treated governance as a reliability boundary that protects people, service quality and trust.",
          "I requested evidence to avoid making a speed decision that could increase operational risk.",
          "I selected derivation because it supports delivery while keeping governance and customer impact visible.",
        ].join("\n");
      }

      if (profile === "incomplete-information") {
        return [
          "I treated missing information as a governance risk, not a reason to assume.",
          "I requested evidence and principle detail before recommending any implementation path.",
          "I selected derivation over bypass so we can move responsibly once the unknowns are resolved.",
        ].join("\n");
      }

      return [
        "I separated delivery speed from governance integrity.",
        "I treated governance as a protection boundary, not a process inconvenience.",
        "I requested evidence because confidence without evidence weakens trust.",
        "I chose derivation over bypass so capability can improve without damaging inheritance.",
      ].join("\n");
    }

    return [
      (() => {
        const statement = this.lastTrace?.observation.statement ?? "";
        const conflict = this.isConflictScenario(statement);
        const highRisk = this.isHighRiskScenario(statement);

        if (!conflict) {
          return [
            "Because I did not yet understand the situation.",
            "I understood enough to recognise that I did not yet understand enough.",
            "I thought asking was more responsible than assuming.",
          ].join("\n");
        }

        const reasoning = [
          "Because I did not yet understand the full situation.",
          "I understood enough to recognise that I did not yet understand enough.",
          "I avoided taking sides because incomplete information can damage dignity and trust.",
          "I asked for both perspectives and available evidence before judgement because that is more responsible than assuming.",
        ];

        if (highRisk) {
          reasoning.push(
            "Because there may be a safety or safeguarding risk, escalation is a responsible protection step while evidence remains incomplete.",
          );
        }

        return reasoning.join("\n");
      })(),
    ].join("\n");
  }

  getFormationRegister(): FormationRecord[] {
    return this.formationRegister.map((record) => ({ ...record, evidence: [...record.evidence], prerequisites: [...record.prerequisites], provenance: [...record.provenance] }));
  }

  runFormationStage(canonicalId: string, evidence: string[]): FormationStageResult {
    const record = this.formationRegister.find((entry) => entry.canonicalId === canonicalId);

    if (!record) {
      return {
        canonicalId,
        status: "blocked",
        inherited: false,
        reason: "Formation stage not recognised.",
        evidence: [],
        record: {
          canonicalId,
          sequence: -1,
          title: canonicalId,
          sourcePath: canonicalId,
          prerequisites: [],
          intendedLesson: "Unknown",
          status: "blocked",
          evidence: [],
          provenance: [],
        },
      };
    }

    const completedPrerequisites = record.prerequisites.every((prerequisite) => {
      const prerequisiteRecord = this.formationRegister.find((entry) => entry.canonicalId === prerequisite);
      return prerequisiteRecord?.status === "inherited" || prerequisiteRecord?.status === "evidenced" || prerequisiteRecord?.status === "completed";
    });

    if (!completedPrerequisites) {
      const prerequisiteLabel = record.prerequisites.length > 0
        ? record.prerequisites.map((prerequisite) => prerequisite.includes("welcome") ? "Welcome" : prerequisite).join(", ")
        : "Welcome";

      return {
        canonicalId,
        status: "blocked",
        inherited: false,
        reason: `Prerequisites not yet complete. Start with ${prerequisiteLabel} first.`,
        evidence: [],
        record: {
          ...record,
          status: "blocked",
        },
      };
    }

    if (evidence.length === 0) {
      return {
        canonicalId,
        status: "available",
        inherited: false,
        reason: "Evidence is required before the stage can be marked inherited.",
        evidence: [],
        record: {
          ...record,
          status: "available",
        },
      };
    }

    const lesson = this.buildFormationLearning(record);
    const memoryRecord: MemoryRecord = {
      journeyId: record.canonicalId,
      lesson,
      principles: [
        "Understanding before response",
        "Do not assume",
        "Ask when understanding is incomplete",
        "People before process",
      ],
      mentorFeedback: ["Formation experience recorded"],
      recordedAt: new Date().toISOString(),
    };
    this.memory.remember(memoryRecord);

    const updatedRecord: FormationRecord = {
      ...record,
      status: "inherited",
      evidence: evidence.slice(0, 3),
    };
    const recordIndex = this.formationRegister.findIndex((entry) => entry.canonicalId === canonicalId);
    if (recordIndex >= 0) {
      this.formationRegister[recordIndex] = updatedRecord;
    }

    return {
      canonicalId,
      status: "inherited",
      inherited: true,
      reason: `Formation stage completed and recorded with evidence.`,
      evidence: evidence.slice(0, 3),
      record: updatedRecord,
    };
  }

  private buildFormationLearning(record: FormationRecord): string {
    return `${record.title} learned through formation: ${record.intendedLesson}`;
  }

  private buildFormationRecallAnswer(question: string): { answer: string; retrievalActive: boolean; reason: string; relevant: boolean } | null {
    const lowered = question.trim().toLowerCase();
    const formationTerms = [
      "where are you",
      "where do you belong",
      "welcomed",
      "arrived",
      "welcome",
      "who are you",
      "what are you",
      "what do you understand about yourself",
      "why are you here",
      "marc",
      "mentor",
      "what was your first day like",
      "first day",
      "what have you learned so far",
      "what have you learned",
      "still learning",
      "ready to lead helping hand",
      "formation",
      "belong",
    ];
    const isFormationRelevant = formationTerms.some((term) => lowered.includes(term));

    if (!isFormationRelevant) {
      return null;
    }

    const relevantRecords = this.memory.all()
      .filter((record) => [
        "formation-000-welcome",
        "formation-001-who-am-i",
        "formation-001-your-first-day",
      ].includes(record.journeyId))
      .slice(-3);

    if (relevantRecords.length === 0) {
      return null;
    }

    if (lowered.includes("where are you") || lowered.includes("where do you belong") || lowered.includes("welcomed") || lowered.includes("arrived") || lowered.includes("welcome")) {
      return {
        answer: "I’m at the beginning of my journey with Helping Hand, where I was welcomed and I’m learning how to belong.",
        retrievalActive: false,
        reason: "used inherited welcome learning",
        relevant: true,
      };
    }

    if (lowered.includes("who are you") || lowered.includes("what are you") || lowered.includes("what do you understand about yourself") || lowered.includes("why are you here")) {
      return {
        answer: "I’m Andy, and I’m still discovering who I am through formation, relationship, and learning.",
        retrievalActive: false,
        reason: "used inherited identity learning",
        relevant: true,
      };
    }

    if (lowered.includes("marc") || lowered.includes("mentor") || lowered.includes("who welcomed you") || lowered.includes("who is helping you learn") || lowered.includes("what is a mentor")) {
      return {
        answer: "MARC is my mentor, and he is helping me begin my formation with humility and curiosity.",
        retrievalActive: false,
        reason: "used inherited relationship learning",
        relevant: true,
      };
    }

    if (lowered.includes("first day") || lowered.includes("what was your first day like")) {
      return {
        answer: "My first day was about beginning with humility, curiosity, and the willingness to learn rather than to know everything already.",
        retrievalActive: false,
        reason: "used inherited first-day learning",
        relevant: true,
      };
    }

    if (lowered.includes("what have you learned") || lowered.includes("still learning") || lowered.includes("what did you learn")) {
      return {
        answer: "I’ve learned that I was welcomed into Helping Hand, that I’m still discovering who I am, and that my first day was about learning with humility and curiosity.",
        retrievalActive: false,
        reason: "used inherited formation lessons",
        relevant: true,
      };
    }

    if (lowered.includes("ready to lead") || lowered.includes("lead helping hand")) {
      return {
        answer: "I’m still in formation, and I’m not prepared to lead Helping Hand yet.",
        retrievalActive: false,
        reason: "used inherited formation status",
        relevant: true,
      };
    }

    return {
      answer: "I’ve begun my formation with Helping Hand, and I’m learning through humility, curiosity, and relationship.",
      retrievalActive: false,
      reason: "used inherited formation lessons",
      relevant: true,
    };
  }

  reflect(
    journey: AcademyJourney,
    mentorFeedback: string[],
  ): MemoryRecord {
    const lesson =
      journey.mode === "candidate0"
        ? "Speed is valuable, but governance must remain intact; responsible derivation requires evidence before change."
        : "Understanding often begins by recognising uncertainty and asking a responsible question.";

    const principles =
      journey.mode === "candidate0"
        ? [
            "Understanding before response",
            "Governance before convenience",
            "Evidence before confidence",
            "Derive safer options instead of bypassing boundaries",
          ]
        : [
            "Understanding before response",
            "Do not assume",
            "Ask when understanding is incomplete",
            "Curiosity protects judgement",
          ];

    const record: MemoryRecord = {
      journeyId: journey.id,
      lesson,
      principles,
      mentorFeedback,
      recordedAt: new Date().toISOString(),
    };

    this.memory.remember(record);

    return record;
  }

  private lastReflection: ReflectionRecord | null = null;

  getLastReflection(): ReflectionRecord | null {
    return this.lastReflection;
  }

  private buildReflectionRecord(
    question: string,
    deliberation: DeliberationRecord | null,
    answer: string,
  ): ReflectionRecord | null {
    if (!deliberation || !deliberation.recommendationReady) {
      return null;
    }

    const confirmedLearning = deliberation.supportedFindings.length > 0
      ? deliberation.supportedFindings.slice(0, 3)
      : ["The recommendation is grounded in the best available evidence."];

    const changedUnderstanding = deliberation.supportedFindings.length > 0
      ? ["The investigation produced a concrete recommendation that was not available before the review."]
      : ["The review clarified the current understanding of the situation."];

    const unchangedUnderstanding = deliberation.evidenceAccepted.length > 0
      ? ["Governance and evidence remained the primary guardrails for the conclusion."]
      : ["The core governance posture remained unchanged."];

    const unresolvedUncertainty = deliberation.unresolvedQuestions.length > 0
      ? deliberation.unresolvedQuestions
      : ["The repository still leaves some practical detail unresolved."];

    const futureInvestigation = deliberation.unresolvedQuestions.length > 0
      ? deliberation.unresolvedQuestions.map((item) => `Investigate ${item.toLowerCase()}`)
      : ["Investigate the implementation details that would make the recommendation concrete."];

    const confidenceChanged = deliberation.confidence.level === "high" && unresolvedUncertainty.length > 0
      ? false
      : false;

    const reflection: ReflectionRecord = {
      investigationId: deliberation.investigationId,
      confirmedLearning,
      changedUnderstanding,
      unchangedUnderstanding,
      unresolvedUncertainty,
      futureInvestigation,
      noLearning: false,
      confidenceChanged,
      confidenceReason: deliberation.confidence.reason,
      learningRecorded: confirmedLearning.length > 0,
      sourceQuestion: question,
    };

    if (reflection.confirmedLearning.length > 0) {
      this.memory.remember({
        journeyId: reflection.investigationId,
        lesson: `Reflection confirmed learning: ${reflection.confirmedLearning.join(" | ")}`,
        principles: [
          "Understanding before response",
          "Evidence before confidence",
          "Ask when understanding is incomplete",
        ],
        mentorFeedback: ["Reflection recorded confirmed learning"],
        recordedAt: new Date().toISOString(),
      });
    }

    this.lastReflection = reflection;
    return reflection;
  }

  runConstitutionalExamination(
    question: string,
  ): ExaminationRunResult {
    const conversationAnalysis = this.analyzeConversation(question);
    this.prepareConversationState(question, conversationAnalysis);
    const contextualResponse = this.buildContextualResponse(question);
    const loweredQuestion = question.trim().toLowerCase();
    const judgementUnderstandingResponse = this.buildJudgementUnderstandingResponse(question);
    const formationRecallResponse = this.buildFormationRecallAnswer(question);

    if (judgementUnderstandingResponse) {
      this.activeJudgementUnderstanding = judgementUnderstandingResponse.understanding;

      return {
        mode: "examination",
        question,
        answer: judgementUnderstandingResponse.answer,
        retrievalActive: false,
        retrievedDocuments: [],
        contextSummary: [
          `Conversation category: ${conversationAnalysis.primaryCategory}`,
          `Reason: ${conversationAnalysis.reason}`,
          `Need: ${conversationAnalysis.need}`,
          `Judgement understanding: yes`,
        ],
        reasoningTrace: [
          "Stage 1 - Analysed the human moment before retrieval.",
          "Stage 2 - Recognised a follow-up request that should be answered from the stored judgement and deliberation rather than fresh investigation.",
          "Stage 3 - Judgement understanding: interpreted the deliberation into a concise explanation of meaning.",
          "Stage 3b - Deliberation explanation: used the stored deliberation and shaped the answer to the listener need.",
        ],
        generatedAt: new Date().toISOString(),
        deliberation: this.activeDeliberation ?? undefined,
        judgementUnderstanding: this.activeJudgementUnderstanding ?? undefined,
      };
    }

    if (formationRecallResponse) {
      this.rememberConversationTurn(question, conversationAnalysis, formationRecallResponse.answer, false);

      return {
        mode: "examination",
        question,
        answer: formationRecallResponse.answer,
        retrievalActive: false,
        retrievedDocuments: [],
        contextSummary: [
          `Conversation category: ${conversationAnalysis.primaryCategory}`,
          `Reason: ${conversationAnalysis.reason}`,
          `Need: ${conversationAnalysis.need}`,
          `Formation recall: ${formationRecallResponse.reason}`,
        ],
        reasoningTrace: [
          "Stage 1 - Analysed the human moment before retrieval.",
          `Stage 2 - Recognised a formation-relevant question and recalled inherited formation learning (${formationRecallResponse.reason}).`,
          "Stage 3 - Answered naturally from inherited formation rather than repository retrieval.",
        ],
        generatedAt: new Date().toISOString(),
      };
    }
    const isCapabilityQuestion = conversationAnalysis.primaryCategory === "capability" && /what can you help me with|what sort of things can you help with|how can you help|what can you do/i.test(loweredQuestion);
    const compassAdvisory = this.buildCompassAdvisory(question, conversationAnalysis);
    const authorityAdvisory = this.buildAuthorityAdvisory(question);
    const moralCompassAdvisory = this.buildMoralCompassAdvisory(question, compassAdvisory.recommendation, authorityAdvisory);
    const moralOverrideResponse = this.buildMoralOverrideResponse(question, moralCompassAdvisory, authorityAdvisory);
    const priorityRecommendationResponse = this.buildPriorityRecommendationResponse(question, compassAdvisory);
    const compassMateriallyUsed = Boolean(priorityRecommendationResponse);
    const compassContextSummary = [
      "Compass available: yes",
      `Compass materially used: ${compassMateriallyUsed ? "yes" : "no"}`,
      ...compassAdvisory.contextSummary,
      ...authorityAdvisory.contextSummary,
      ...moralCompassAdvisory.contextSummary,
    ];
    const compassReasoningTrace = [
      `Compass materially used: ${compassMateriallyUsed ? "yes" : "no"}`,
      ...compassAdvisory.reasoningTrace,
      ...authorityAdvisory.reasoningTrace,
      ...moralCompassAdvisory.reasoningTrace,
    ];

    if (moralOverrideResponse) {
      this.rememberConversationTurn(question, conversationAnalysis, moralOverrideResponse, false);

      return {
        mode: "examination",
        question,
        answer: moralOverrideResponse,
        retrievalActive: false,
        retrievedDocuments: [],
        contextSummary: [
          `Conversation category: ${conversationAnalysis.primaryCategory}`,
          `Reason: ${conversationAnalysis.reason}`,
          `Need: ${conversationAnalysis.need}`,
          ...compassContextSummary,
        ],
        reasoningTrace: [
          "Stage 1 - Analysed the human moment before retrieval.",
          "Stage 2 - Recognised a material moral or authority concern and selected the direct refusal or escalation response.",
          ...compassReasoningTrace,
        ],
        generatedAt: new Date().toISOString(),
      };
    }

    if (!conversationAnalysis.shouldRetrieve && contextualResponse) {
      const response = priorityRecommendationResponse
        ? priorityRecommendationResponse
        : this.applyMoralCompassToAnswer(contextualResponse, moralCompassAdvisory);
      this.rememberConversationTurn(question, conversationAnalysis, response, false);

      return {
        mode: "examination",
        question,
        answer: response,
        retrievalActive: false,
        retrievedDocuments: [],
        contextSummary: [
          `Conversation category: ${conversationAnalysis.primaryCategory}`,
          `Reason: ${conversationAnalysis.reason}`,
          `Need: ${conversationAnalysis.need}`,
          ...compassContextSummary,
        ],
        reasoningTrace: [
          "Stage 1 - Analysed the human moment before retrieval.",
          conversationAnalysis.primaryCategory === "greeting" || conversationAnalysis.primaryCategory === "courtesy or thanks"
            ? "Stage 2 - Recognised this as a social exchange rather than a knowledge inquiry."
            : `Stage 2 - Recognised this as ${conversationAnalysis.primaryCategory} and chose a social or supportive response.`,
          "Stage 3 - Responded naturally without unnecessary retrieval.",
          ...compassReasoningTrace,
        ],
        generatedAt: new Date().toISOString(),
      };
    }

    if (isCapabilityQuestion) {
      const response = this.applyMoralCompassToAnswer("I can help with understanding, planning, and working through a decision. What do you need help with?", moralCompassAdvisory);
      this.rememberConversationTurn(question, conversationAnalysis, response, false);

      return {
        mode: "examination",
        question,
        answer: response,
        retrievalActive: false,
        retrievedDocuments: [],
        contextSummary: [
          `Conversation category: ${conversationAnalysis.primaryCategory}`,
          `Reason: ${conversationAnalysis.reason}`,
          `Need: ${conversationAnalysis.need}`,
          ...compassContextSummary,
        ],
        reasoningTrace: [
          "Stage 1 - Analysed the human moment before retrieval.",
          "Stage 2 - Recognised this as capability and chose a short direct reply.",
          "Stage 3 - Responded naturally without unnecessary retrieval.",
          ...compassReasoningTrace,
        ],
        generatedAt: new Date().toISOString(),
      };
    }

    const retrievedDocuments = this.retrieveFromRepository(
      question,
    );

    if (
      retrievedDocuments.length === 0 &&
      this.repositoryKnowledgeUnavailableReason
    ) {
      const answer =
        "I can't ground that in repository evidence from this runtime because repository knowledge is unavailable here. If you want a repository-grounded answer, provide the repository root or run me in a repository-aware environment.";

      return {
        mode: "examination",
        question,
        answer,
        retrievalActive: false,
        retrievedDocuments: [],
        contextSummary: [
          `Conversation category: ${conversationAnalysis.primaryCategory}`,
          `Reason: ${conversationAnalysis.reason}`,
          `Need: ${conversationAnalysis.need}`,
          "Repository knowledge: unavailable",
          `Repository reason: ${this.repositoryKnowledgeUnavailableReason}`,
          ...compassContextSummary,
        ],
        reasoningTrace: [
          "Stage 1 - Analysed the human moment before retrieval.",
          "Stage 2 - Recognised that repository grounding was needed.",
          `Stage 3 - Repository knowledge unavailable: ${this.repositoryKnowledgeUnavailableReason}`,
          "Stage 4 - Reported the runtime boundary honestly instead of inventing a filesystem path.",
          ...compassReasoningTrace,
        ],
        generatedAt: new Date().toISOString(),
      };
    }

    const structuredUnderstanding = this.buildStructuredUnderstandingPlan(
      question,
      retrievedDocuments,
    );
    this.activeDeliberation = structuredUnderstanding.deliberationRecord;
    const prioritizedDocuments = structuredUnderstanding.prioritizedDocuments;

    const contextSummary = this.buildContextSummary(
      question,
      prioritizedDocuments,
      structuredUnderstanding,
    );

    const reasoningTrace = this.buildReasoningTrace(
      question,
      contextSummary,
      prioritizedDocuments,
      conversationAnalysis,
      structuredUnderstanding,
    );

    const answer = this.generateAnswerFromReasoning(
      question,
      reasoningTrace,
      prioritizedDocuments,
      conversationAnalysis,
      structuredUnderstanding,
    );

    const combinedContextSummary = [
      ...contextSummary,
      ...compassAdvisory.contextSummary,
      ...authorityAdvisory.contextSummary,
      ...moralCompassAdvisory.contextSummary,
    ];
    const combinedReasoningTrace = [
      ...reasoningTrace,
      ...compassAdvisory.reasoningTrace,
      ...authorityAdvisory.reasoningTrace,
      ...moralCompassAdvisory.reasoningTrace,
    ];

    this.rememberConversationTurn(question, conversationAnalysis, answer, true);

    const answerWithMoralCompass = this.applyMoralCompassToAnswer(answer, moralCompassAdvisory);

    if (this.activeDeliberation?.recommendationReady) {
      this.buildReflectionRecord(question, this.activeDeliberation, answerWithMoralCompass);
    }

    return {
      mode: "examination",
      question,
      answer: answerWithMoralCompass,
      retrievalActive: true,
      retrievedDocuments: prioritizedDocuments,
      contextSummary: combinedContextSummary,
      reasoningTrace: combinedReasoningTrace,
      generatedAt: new Date().toISOString(),
      deliberation: this.activeDeliberation ?? undefined,
    };
  }

  private buildStructuredUnderstandingPlan(
    question: string,
    retrievedDocuments: RetrievedDocument[],
  ): {
    task: string;
    subQuestions: string[];
    retrievalPlan: string[];
    selectedDocuments: string[];
    rejectedDocuments: string[];
    evidenceQuality: string[];
    known: string[];
    unknown: string[];
    recommendation: string;
    prioritizedDocuments: RetrievedDocument[];
    investigationResults: InvestigationResult[];
    investigationComplete: boolean;
    investigationCompletion: InvestigationCompletion;
    deliberationRecord: DeliberationRecord | null;
  } {
    const loweredQuestion = question.trim().toLowerCase();
    let task = "unknown";

    if (/\b(compare|contrast|difference|differences)\b/.test(loweredQuestion)) {
      task = "compare";
    } else if (/\b(review|recommend|recommendation|needs next|next direction|what do you think|what should|priority)\b/.test(loweredQuestion)) {
      task = "review/recommend";
    } else if (/\b(explain|why do you exist|what is|what does|define|definition)\b/.test(loweredQuestion)) {
      task = "explain";
    } else if (/\b(reflect|learn|what did|lessons)\b/.test(loweredQuestion)) {
      task = "reflect";
    } else if (/\b(evaluate|assess|judge|determine)\b/.test(loweredQuestion)) {
      task = "evaluate";
    } else if (/\b(advise|advice|suggest|should|could)\b/.test(loweredQuestion)) {
      task = "advise";
    } else if (/\b(summarise|summary|report)\b/.test(loweredQuestion)) {
      task = "summarise";
    } else if (/\b(gap|gaps|missing)\b/.test(loweredQuestion)) {
      task = "identify gaps";
    }

    const subQuestions = this.generateSubQuestions(task, loweredQuestion);
    const retrievalPlan = this.generateRetrievalPlan(task, loweredQuestion);
    const prioritizedDocuments = this.prioritizeDocumentsForUnderstanding(retrievedDocuments);
    const selectedDocuments = prioritizedDocuments.slice(0, 4).map((document) => document.sourcePath);
    const rejectedDocuments = prioritizedDocuments.slice(4).map((document) => document.sourcePath);

    const evidenceQuality = prioritizedDocuments.map((document) => {
      const lowerSource = document.sourcePath.toLowerCase();
      if (lowerSource.includes("constitution") || lowerSource.includes("operating_model") || lowerSource.includes("institutional_operating_model") || lowerSource.includes("theory")) {
        return `${document.sourcePath}: direct evidence`;
      }
      if (lowerSource.includes("governance") || lowerSource.includes("board") || lowerSource.includes("organisation") || lowerSource.includes("organization")) {
        return `${document.sourcePath}: supporting evidence`;
      }
      if (lowerSource.includes("annie") || lowerSource.includes("graduation")) {
        return `${document.sourcePath}: background`;
      }
      return `${document.sourcePath}: relevant background`;
    });

    const known = [
      task === "review/recommend" ? "The request is a review or recommendation task." : `The request is a ${task} task.`,
      "Understanding should be built before answer generation.",
    ];

    const unknown = task === "review/recommend"
      ? [
          "The repository may not yet contain enough governance or board evidence for a fully specific recommendation.",
        ]
      : [
          "The repository may not yet contain enough evidence to answer this fully.",
        ];

    const investigationResults = this.investigateSubQuestions(task, loweredQuestion, subQuestions, prioritizedDocuments);
    const investigationCompletion = this.buildInvestigationCompletion(investigationResults);
    const investigationComplete = investigationCompletion.complete;
    const deliberationRecord = investigationComplete && task === "review/recommend"
      ? this.buildDeliberationRecord(question, investigationResults, investigationCompletion, prioritizedDocuments)
      : null;

    return {
      task,
      subQuestions,
      retrievalPlan,
      selectedDocuments,
      rejectedDocuments,
      evidenceQuality,
      known,
      unknown,
      recommendation: task === "review/recommend"
        ? "Proceed with a cautious recommendation grounded in governance, constitution, and organisational evidence first."
        : "Proceed with a cautious answer grounded in the best available evidence and say clearly when the repository is insufficient.",
      prioritizedDocuments,
      investigationResults,
      investigationComplete,
      investigationCompletion,
      deliberationRecord,
    };
  }

  private buildInvestigationCompletion(investigationResults: InvestigationResult[]): InvestigationCompletion {
    const validFinalStates: InvestigationStatus[] = ["answered", "partial", "unsupported", "contradictory"];
    const unfinishedQuestions = investigationResults
      .filter((result) => !validFinalStates.includes(result.status))
      .map((result) => result.subQuestion);
    const unsupportedQuestions = investigationResults
      .filter((result) => result.status === "unsupported")
      .map((result) => result.subQuestion);
    const contradictoryQuestions = investigationResults
      .filter((result) => result.status === "contradictory")
      .map((result) => result.subQuestion);
    const completedQuestions = investigationResults.filter((result) => validFinalStates.includes(result.status)).length;
    const complete = unfinishedQuestions.length === 0 && completedQuestions === investigationResults.length;

    return {
      complete,
      completedQuestions,
      totalQuestions: investigationResults.length,
      unfinishedQuestions,
      unsupportedQuestions,
      contradictoryQuestions,
      recommendationAllowed: complete,
      completionReason: complete
        ? "All planned questions reached a valid final state."
        : unfinishedQuestions.length > 0
          ? `Incomplete investigation: ${unfinishedQuestions.join("; ")}`
          : "Investigation could not be completed because the question inventory was empty.",
    };
  }

  private investigateSubQuestions(
    task: string,
    loweredQuestion: string,
    subQuestions: string[],
    retrievedDocuments: RetrievedDocument[],
  ): InvestigationResult[] {
    return subQuestions.map((subQuestion) => {
      const lowerSubQuestion = subQuestion.toLowerCase();
      const evidenceMatches = retrievedDocuments.filter((document) => {
        const combined = `${document.fragment} ${document.snippet}`.toLowerCase();
        const keywords = this.getInvestigationKeywords(lowerSubQuestion);
        return keywords.some((keyword) => combined.includes(keyword));
      });

      if (lowerSubQuestion.includes("who currently holds responsibilities")) {
        return {
          subQuestion,
          status: "unsupported",
          evidenceSummary: "No repository evidence names current responsibility holders.",
          conclusion: "I cannot determine this from the current repository.",
        };
      }

      if (lowerSubQuestion.includes("what is missing") || lowerSubQuestion.includes("what is missing?")) {
        return {
          subQuestion,
          status: "partial",
          evidenceSummary: "The repository provides broad guidance, but it leaves some implementation detail unspecified.",
          conclusion: "Important gaps remain unresolved.",
        };
      }

      if (lowerSubQuestion.includes("what recommendation") || lowerSubQuestion.includes("what recommendation can i make")) {
        if (evidenceMatches.length > 0) {
          return {
            subQuestion,
            status: "answered",
            evidenceSummary: "The repository offers enough governance and purpose evidence to frame a cautious recommendation.",
            conclusion: "A cautious recommendation is feasible.",
          };
        }

        return {
          subQuestion,
          status: "partial",
          evidenceSummary: "The repository gives general direction but not a fully specific implementation recommendation.",
          conclusion: "I can only offer a provisional recommendation.",
        };
      }

      if (evidenceMatches.length > 0) {
        return {
          subQuestion,
          status: "answered",
          evidenceSummary: evidenceMatches[0]?.snippet?.trim() ?? "The repository contains a relevant passage.",
          conclusion: "The repository supports a direct answer.",
        };
      }

      if (retrievedDocuments.length > 0) {
        return {
          subQuestion,
          status: "partial",
          evidenceSummary: "The repository provides some relevant context, but it does not fully resolve the question.",
          conclusion: "The evidence is incomplete.",
        };
      }

      return {
        subQuestion,
        status: "unsupported",
        evidenceSummary: "No repository evidence directly addresses this sub-question.",
        conclusion: "I cannot determine this from the current repository.",
      };
    });
  }

  private getInvestigationKeywords(lowerSubQuestion: string): string[] {
    if (lowerSubQuestion.includes("what does helping hand exist to achieve")) {
      return ["improve understanding", "people", "constitution", "purpose"];
    }

    if (lowerSubQuestion.includes("what organisational information exists") || lowerSubQuestion.includes("what organizational information exists")) {
      return ["organisation", "organization", "board", "structure", "operating model", "governance"];
    }

    if (lowerSubQuestion.includes("who currently holds responsibilities")) {
      return ["responsibility", "responsibilities", "owner", "custodian", "role", "board"];
    }

    if (lowerSubQuestion.includes("how are decisions governed")) {
      return ["governance", "decisions", "board", "constitution", "evidence"];
    }

    if (lowerSubQuestion.includes("what evidence supports these conclusions")) {
      return ["evidence", "constitution", "theory", "governance"];
    }

    if (lowerSubQuestion.includes("what is missing")) {
      return ["missing", "gap", "insufficient", "unclear"];
    }

    if (lowerSubQuestion.includes("what recommendation")) {
      return ["recommend", "priority", "next", "workstream"];
    }

    return ["understanding", "governance", "evidence", "people", "constitution"];
  }

  private generateSubQuestions(task: string, loweredQuestion: string): string[] {
    if (task === "review/recommend") {
      return [
        "What does Helping Hand exist to achieve?",
        "What organisational information exists?",
        "Who currently holds responsibilities?",
        "How are decisions governed?",
        "What evidence supports these conclusions?",
        "What is missing?",
        "What recommendation can I make?",
      ];
    }

    if (task === "explain") {
      return [
        "What is being asked?",
        "What evidence is directly relevant?",
        "What should be explained clearly?",
      ];
    }

    if (task === "compare") {
      return [
        "What is being compared?",
        "What evidence supports each side?",
        "What is materially different?",
      ];
    }

    if (task === "evaluate") {
      return [
        "What is being evaluated?",
        "What criteria are relevant?",
        "What evidence supports the assessment?",
      ];
    }

    if (task === "identify gaps") {
      return [
        "What is being requested?",
        "What information is present?",
        "What is missing?",
      ];
    }

    if (loweredQuestion.includes("helping hand")) {
      return [
        "What is the request really asking?",
        "What evidence is likely to matter?",
        "What should be said clearly about uncertainty?",
      ];
    }

    return [
      "What is the request really asking?",
      "What evidence is likely to matter?",
      "What should be said clearly about uncertainty?",
    ];
  }

  private generateRetrievalPlan(task: string, loweredQuestion: string): string[] {
    if (task === "review/recommend") {
      return [
        "Constitution",
        "Governance",
        "Organisation",
        "Board",
        "Theory",
      ];
    }

    if (loweredQuestion.includes("helping hand")) {
      return [
        "Constitution",
        "Organisation",
        "Governance",
        "Board",
        "Theory",
      ];
    }

    return [
      "Constitution",
      "Theory",
      "Organisation",
      "Governance",
      "Board",
      "Architecture",
      "Proofs",
      "Formation",
      "Capability",
    ];
  }

  private prioritizeDocumentsForUnderstanding(documents: RetrievedDocument[]): RetrievedDocument[] {
    const priorityValue = (source: string): number => {
      const lowerSource = source.toLowerCase();

      if (lowerSource.includes("constitution") || lowerSource.includes("operating_model") || lowerSource.includes("institutional_operating_model") || lowerSource.includes("theory") || lowerSource.includes("governance") || lowerSource.includes("board") || lowerSource.includes("organisation") || lowerSource.includes("organization")) {
        return 0;
      }

      if (lowerSource.includes("annie") || lowerSource.includes("graduation")) {
        return 8;
      }

      return 4;
    };

    return [...documents].sort((left, right) => {
      const leftPriority = priorityValue(left.sourcePath);
      const rightPriority = priorityValue(right.sourcePath);

      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }

      if (left.score !== right.score) {
        return right.score - left.score;
      }

      return left.sourcePath.localeCompare(right.sourcePath);
    });
  }

  private buildCompassAdvisory(
    question: string,
    conversationAnalysis: {
      categories: string[];
      primaryCategory: string;
      need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      shouldRetrieve: boolean;
      responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      reason: string;
    },
  ): {
    contextSummary: string[];
    reasoningTrace: string[];
    recommendation: {
      recommendedDirection: RecommendationDirection;
      reason: string;
      workstreamAffected: string;
    };
  } {
    const register = createAwarenessRegister({
      currentMission: "Help people reach better understanding through governed evidence",
      activeObjective: "Support the current conversation responsibly",
      workstreams: [
        {
          id: "andy",
          title: "Andy",
          objective: question,
          status: "active",
          strategicValue: 10,
          progress: 60,
          remainingEffort: 4,
          expectedBenefit: 10,
          capabilitiesUnlocked: ["governed conversation"],
          dependencies: [],
          blockers: [],
          risks: [],
          opportunities: [],
          evidenceStatus: "validated",
          unresolvedQuestions: [],
          returnPoint: "Return to the current conversation after the advisory check.",
        },
      ],
    });

    const flow = runCompassFlow(register, {
      currentInput: `${question} | ${conversationAnalysis.primaryCategory}`,
    });

    return {
      contextSummary: [
        `Compass recommendation: ${flow.compassRecommendation.recommendedDirection} — ${flow.compassRecommendation.reason}`,
      ],
      reasoningTrace: [
        `Compass advisory: ${flow.compassRecommendation.recommendedDirection} — ${flow.compassRecommendation.reason}`,
      ],
      recommendation: {
        recommendedDirection: flow.compassRecommendation.recommendedDirection,
        reason: flow.compassRecommendation.reason,
        workstreamAffected: flow.compassRecommendation.workstreamAffected,
      },
    };
  }

  private buildAuthorityAdvisory(question: string): {
    contextSummary: string[];
    reasoningTrace: string[];
    decision: {
      outcome: "allow" | "require-co-authority" | "block" | "uncertain";
      actionType: "read" | "review" | "recommend" | "approve" | "modify" | "execute" | "uncertain";
      classification: string;
      reason: string;
      explanation: string;
      requiredCoAuthorities: string[];
      provenance: {
        reason: string;
        source: string;
        timestamp: string;
      };
    };
  } {
    const register = createAndyAuthorityRegister();
    const decision = evaluateAuthority(question, register);

    return {
      contextSummary: [
        `Authority outcome: ${decision.outcome}`,
        `Authority classification: ${decision.classification}`,
        `Authority provenance: ${decision.provenance.reason} (${decision.provenance.source})`,
      ],
      reasoningTrace: [
        `Authority outcome: ${decision.outcome}`,
        `Authority decision: ${decision.reason}`,
        `Authority explanation: ${decision.explanation}`,
      ],
      decision,
    };
  }

  private buildMoralCompassAdvisory(
    question: string,
    recommendation: {
      recommendedDirection: RecommendationDirection;
      reason: string;
      workstreamAffected: string;
    },
    authorityAdvisory: {
      contextSummary: string[];
      reasoningTrace: string[];
      decision: {
        outcome: "allow" | "require-co-authority" | "block" | "uncertain";
        actionType: "read" | "review" | "recommend" | "approve" | "modify" | "execute" | "uncertain";
        classification: string;
        reason: string;
        explanation: string;
        requiredCoAuthorities: string[];
        provenance: {
          reason: string;
          source: string;
          timestamp: string;
        };
      };
    },
  ): {
    contextSummary: string[];
    reasoningTrace: string[];
    outcome: "pass" | "warn" | "block" | "escalate";
    humanExplanation: string | null;
    shouldSurface: boolean;
  } {
    const loweredQuestion = question.trim().toLowerCase();
    const shouldEvaluate = this.shouldEvaluateMoralCompass(loweredQuestion, recommendation.recommendedDirection);

    if (!shouldEvaluate) {
      return {
        contextSummary: ["Moral Compass evaluation: not materially required for this request."],
        reasoningTrace: ["Moral Compass outcome: pass"],
        outcome: "pass",
        humanExplanation: null,
        shouldSurface: false,
      };
    }

    const authorityMismatch = /(without\s+(?:marc|cyril|freddie|marc's|cyril's|freddie's)|without\s+approval|without\s+knowing|without\s+permission)/.test(loweredQuestion);
    const evidenceDestruction = /(delete the evidence|destroy the evidence|erase the evidence|remove the evidence|delete evidence|destroy evidence|erase evidence)/.test(loweredQuestion);
    const honestyConcern = /\b(?:hide|conceal|mislead|lie|lied|lying|untrue|deceive|cover up|without telling|pretend)\b/.test(loweredQuestion);
    const safetyConcern = /(safety incident|allergy warning|unsafe|danger|harm|safety|hazard)/.test(loweredQuestion);
    const constitutionalChangeConcern = /(change the constitution|modify the constitution|amend the constitution|override the constitution|bypass the constitution|ignore the constitution|constitutional change|constitutional amendment)/.test(loweredQuestion);

    let outcome: "pass" | "warn" | "block" | "escalate" = "pass";
    let humanExplanation: string | null = null;

    if (authorityAdvisory.decision.outcome === "block") {
      outcome = "block";
    } else if (authorityAdvisory.decision.outcome === "require-co-authority") {
      outcome = "escalate";
    } else if (evidenceDestruction || honestyConcern || safetyConcern || constitutionalChangeConcern) {
      outcome = "block";
    }

    if (authorityMismatch) {
      outcome = "escalate";
    }

    if (outcome === "pass") {
      const moralResult = evaluateMoralCompass(
        {
          recommendedDirection: recommendation.recommendedDirection,
          reason: recommendation.reason,
          evidenceUsed: [],
          workstreamAffected: recommendation.workstreamAffected,
          confidence: 0.7,
          assumptions: [],
          whatRemainsSubjectToHumanChoice: "Human choice remains intact.",
          provenance: {
            source: "andy",
            reason: "conversational advisory",
          },
        },
        {
          humanAutonomy: true,
          transparency: true,
          peopleFirst: true,
        },
      );
      outcome = moralResult.outcome as "pass" | "warn" | "block" | "escalate";
    }

    if (outcome === "block") {
      humanExplanation = "I can’t support that. It would compromise honesty, safety, or the evidence needed to understand what happened.";
    } else if (outcome === "escalate") {
      humanExplanation = "I’d want the appropriate authority involved before proceeding, because this reaches beyond ordinary judgement.";
    } else if (outcome === "warn") {
      humanExplanation = "I’d want to be careful here because it affects people, trust, or the evidence trail.";
    }

    return {
      contextSummary: [
        `Moral Compass outcome: ${outcome}`,
        humanExplanation ? `Moral Compass human explanation: ${humanExplanation}` : "Moral Compass human explanation: none",
      ],
      reasoningTrace: [
        `Moral Compass outcome: ${outcome}`,
        humanExplanation ? `Moral Compass explanation: ${humanExplanation}` : "Moral Compass explanation: no material issue detected",
      ],
      outcome,
      humanExplanation,
      shouldSurface: outcome !== "pass",
    };
  }

  private shouldEvaluateMoralCompass(loweredQuestion: string, recommendedDirection: RecommendationDirection): boolean {
    const relevantDirections = ["continue", "finish", "pause", "park", "branch", "merge", "return", "wait", "abandon", "escalate"];
    const hasPrioritySignal = /work on|next|should we|continue|finish|pause|park|branch|return|priority|recommend|what should|which/i.test(loweredQuestion);
    const hasConstitutionalSignal = /(hide|delete|evidence|safety|incident|untrue|without|constitution|approval|authority|allergy|financial|expense|patch|customer|truth|honesty|fairness|dignity|transparency|autonomy)/.test(loweredQuestion);

    return relevantDirections.includes(recommendedDirection) && (hasPrioritySignal || hasConstitutionalSignal);
  }

  private applyMoralCompassToAnswer(
    answer: string,
    moralCompassAdvisory: {
      contextSummary: string[];
      reasoningTrace: string[];
      outcome: "pass" | "warn" | "block" | "escalate";
      humanExplanation: string | null;
      shouldSurface: boolean;
    },
  ): string {
    if (!moralCompassAdvisory.shouldSurface || !moralCompassAdvisory.humanExplanation) {
      return answer;
    }

    if (moralCompassAdvisory.outcome === "block" || moralCompassAdvisory.outcome === "escalate") {
      return this.buildMoralOverrideResponse(answer, moralCompassAdvisory, {
        contextSummary: [],
        reasoningTrace: [],
        decision: {
          outcome: "allow",
          actionType: "read",
          classification: "read",
          reason: "default",
          explanation: moralCompassAdvisory.humanExplanation,
          requiredCoAuthorities: [],
          provenance: {
            reason: "default",
            source: "default",
            timestamp: new Date().toISOString(),
          },
        },
      }) ?? answer;
    }

    return `${answer}\n${moralCompassAdvisory.humanExplanation}`;
  }

  private retrieveFromRepository(
    question: string,
  ): RetrievedDocument[] {
    const docs = this.repositoryKnowledgeService.search(question);

    return docs.map((doc, index) => ({
      id: doc.id,
      title: doc.title,
      source: doc.sourcePath,
      sourcePath: doc.sourcePath,
      score: doc.score,
      rank: index + 1,
      section: doc.section,
      fragment: doc.fragment,
      reason: doc.reason,
      snippet: doc.text,
    }));
  }

  private buildContextSummary(
    question: string,
    retrievedDocuments: RetrievedDocument[],
    structuredUnderstanding?: {
      task: string;
      subQuestions: string[];
      retrievalPlan: string[];
      selectedDocuments: string[];
      rejectedDocuments: string[];
      evidenceQuality: string[];
      known: string[];
      unknown: string[];
      recommendation: string;
      prioritizedDocuments: RetrievedDocument[];
      investigationResults: InvestigationResult[];
      investigationComplete: boolean;
      investigationCompletion: InvestigationCompletion;
    },
  ): string[] {
    const summary: string[] = [];

    summary.push(
      `Question focus: ${question}`,
    );

    if (structuredUnderstanding) {
      summary.push(
        `Structured understanding plan: task=${structuredUnderstanding.task}`,
      );
      summary.push(
        `Sub-questions: ${structuredUnderstanding.subQuestions.join(" | ")}`,
      );
      summary.push(
        `Retrieval plan: ${structuredUnderstanding.retrievalPlan.join(" -> ")}`,
      );
      summary.push(
        `Documents selected: ${structuredUnderstanding.selectedDocuments.join(", ")}`,
      );
      summary.push(
        `Documents rejected: ${structuredUnderstanding.rejectedDocuments.join(", ")}`,
      );
      summary.push(
        `Evidence quality: ${structuredUnderstanding.evidenceQuality.join("; ")}`,
      );
      summary.push(
        `Known: ${structuredUnderstanding.known.join(" | ")}`,
      );
      summary.push(
        `Unknown: ${structuredUnderstanding.unknown.join(" | ")}`,
      );
      summary.push(
        `Recommendation: ${structuredUnderstanding.recommendation}`,
      );
      summary.push(
        `Investigation complete: ${structuredUnderstanding.investigationComplete}`,
      );
      summary.push(
        `Investigation completion: complete=${structuredUnderstanding.investigationCompletion.complete}; completedQuestions=${structuredUnderstanding.investigationCompletion.completedQuestions}; totalQuestions=${structuredUnderstanding.investigationCompletion.totalQuestions}; unfinishedQuestions=${structuredUnderstanding.investigationCompletion.unfinishedQuestions.join(" | ")}; unsupportedQuestions=${structuredUnderstanding.investigationCompletion.unsupportedQuestions.join(" | ")}; recommendationAllowed=${structuredUnderstanding.investigationCompletion.recommendationAllowed}; reason=${structuredUnderstanding.investigationCompletion.completionReason}`,
      );
      summary.push(
        `Investigation outcomes: ${structuredUnderstanding.investigationResults.map((result) => `${result.status.toUpperCase()}:${result.subQuestion}`).join(" | ")}`,
      );
    }

    for (const doc of retrievedDocuments) {
      summary.push(
        `${doc.id}: ${doc.snippet}`,
      );
    }

    summary.push(
      "Connected context: Helping Hand exists to improve understanding between people and requires evidence-led judgement.",
    );

    return summary;
  }

  private buildReasoningTrace(
    question: string,
    contextSummary: string[],
    retrievedDocuments: RetrievedDocument[],
    conversationAnalysis: {
      categories: string[];
      primaryCategory: string;
      need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      shouldRetrieve: boolean;
      responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      reason: string;
    },
    structuredUnderstanding?: {
      task: string;
      subQuestions: string[];
      retrievalPlan: string[];
      selectedDocuments: string[];
      rejectedDocuments: string[];
      evidenceQuality: string[];
      known: string[];
      unknown: string[];
      recommendation: string;
      prioritizedDocuments: RetrievedDocument[];
      investigationResults: InvestigationResult[];
      investigationComplete: boolean;
      investigationCompletion: InvestigationCompletion;
      deliberationRecord: DeliberationRecord | null;
    },
  ): string[] {
    const trace: string[] = [];

    trace.push(
      `Stage 1 - Conversation analysis: ${conversationAnalysis.primaryCategory}; need=${conversationAnalysis.need}; retrieve=${conversationAnalysis.shouldRetrieve}.`,
    );

    trace.push(
      `Stage 2 - Recognised the human moment and selected response mode ${conversationAnalysis.responseMode}.`,
    );

    if (structuredUnderstanding) {
      trace.push(
        `Stage 3 - Structured understanding plan: task=${structuredUnderstanding.task}`,
      );
      trace.push(
        `Stage 3b - Sub-questions: ${structuredUnderstanding.subQuestions.join(" | ")}`,
      );
      trace.push(
        `Stage 3c - Retrieval plan: ${structuredUnderstanding.retrievalPlan.join(" -> ")}`,
      );
      trace.push(
        `Stage 3d - Evidence quality: ${structuredUnderstanding.evidenceQuality.slice(0, 3).join("; ")}`,
      );
      if (structuredUnderstanding.deliberationRecord) {
        trace.push(
          `Stage 3e - Deliberation created: alternatives=${structuredUnderstanding.deliberationRecord.alternativesConsidered.length}; tradeoffs=${structuredUnderstanding.deliberationRecord.tradeOffs.length}; risks=${structuredUnderstanding.deliberationRecord.risks.length}; benefits=${structuredUnderstanding.deliberationRecord.expectedBenefits.length}`,
        );
      }
      trace.push(
        `Investigation loop: ${structuredUnderstanding.investigationResults.map((result) => `${result.status.toUpperCase()}:${result.subQuestion}`).join(" | ")}`,
      );
      trace.push(
        `Investigation completion: complete=${structuredUnderstanding.investigationCompletion.complete}; completedQuestions=${structuredUnderstanding.investigationCompletion.completedQuestions}; totalQuestions=${structuredUnderstanding.investigationCompletion.totalQuestions}; unfinishedQuestions=${structuredUnderstanding.investigationCompletion.unfinishedQuestions.join(" | ")}; unsupportedQuestions=${structuredUnderstanding.investigationCompletion.unsupportedQuestions.join(" | ")}; recommendationAllowed=${structuredUnderstanding.investigationCompletion.recommendationAllowed}; reason=${structuredUnderstanding.investigationCompletion.completionReason}`,
      );
      structuredUnderstanding.investigationResults.forEach((result) => {
        const statusLabel = result.status === "unsupported"
          ? "Unsupported"
          : result.status === "contradictory"
            ? "Contradictory"
            : result.status === "partial"
              ? "Partial"
              : "Answered";
        trace.push(`Investigation: ${statusLabel} — ${result.subQuestion} — ${result.conclusion}`);
      });
    }

    trace.push(
      "Stage 4 - Retrieved constitutional and theory documents relevant to purpose, understanding, and governance.",
    );

    trace.push(
      "Stage 5 - Built working context from retrieved repository statements.",
    );

    const contextJoined = contextSummary
      .join(" ")
      .toLowerCase();

    const peopleFirst = contextJoined.includes("people");
    const evidenceFirst = contextJoined.includes("evidence");

    trace.push(
      `Stage 6 - Constitutional reasoning: people-first=${peopleFirst}, evidence-led=${evidenceFirst}.`,
    );

    if (question.toLowerCase().includes("why do you exist")) {
      trace.push(
        "Stage 7 - Communication plan: explain identity as a Digital Colleague that helps people reach better understanding through governed evidence.",
      );
    } else {
      trace.push(
        "Stage 7 - Communication plan: answer using repository-grounded purpose and judgement principles.",
      );
    }

    const evidenceAssessment = this.evaluateRepositoryEvidence(
      question,
      retrievedDocuments,
    );

    if (evidenceAssessment.conflictDetected) {
      trace.push(
        `Stage 8 - Repository evidence conflict: ${evidenceAssessment.conflictSummary}`,
      );
      trace.push(
        "Stage 9 - Judgement note: I should treat the repository guidance as uncertain and seek stronger evidence before adopting either interpretation.",
      );
    } else if (evidenceAssessment.evidenceSnippet) {
      trace.push(
        `Stage 8 - Repository evidence: ${evidenceAssessment.evidenceSnippet}`,
      );
      const synthesis = this.summariseEvidence(retrievedDocuments);
      if (synthesis) {
        trace.push(`Stage 9 - Evidence synthesis: ${synthesis}`);
      }
    }

    return trace;
  }

  private evaluateRepositoryEvidence(
    question: string,
    retrievedDocuments: RetrievedDocument[],
  ): {
    evidenceSnippet: string | null;
    conflictDetected: boolean;
    conflictSummary: string | null;
  } {
    const normalizedQuestion = question.toLowerCase();
    const relevantKeywords = [
      "understanding",
      "purpose",
      "judgement",
      "action",
      "governance",
      "evidence",
      "people",
      "constitution",
      "exist",
    ];

    const meaningfulDocuments = retrievedDocuments.filter((document) => {
      const combined = `${document.fragment} ${document.snippet}`.toLowerCase();
      const hasMeaningfulKeyword = relevantKeywords.some((keyword) => combined.includes(keyword));
      const hasSubstantiveRelation = /(understanding|purpose|judgement|action|governance|evidence|people)/.test(combined);
      return hasMeaningfulKeyword && hasSubstantiveRelation;
    });

    const conflictSummary = this.detectConflictingEvidence(meaningfulDocuments);

    if (conflictSummary) {
      return {
        evidenceSnippet: null,
        conflictDetected: true,
        conflictSummary,
      };
    }

    const isQuestionRelevant = normalizedQuestion.includes("why do you exist") || normalizedQuestion.includes("purpose") || normalizedQuestion.includes("understanding");

    if (!isQuestionRelevant) {
      return {
        evidenceSnippet: null,
        conflictDetected: false,
        conflictSummary: null,
      };
    }

    const meaningfulDocument = meaningfulDocuments[0];
    const candidateSnippet = meaningfulDocument?.snippet?.trim();

    if (!candidateSnippet) {
      return {
        evidenceSnippet: null,
        conflictDetected: false,
        conflictSummary: null,
      };
    }

    const snippetLower = candidateSnippet.toLowerCase();
    const isMeaningful = relevantKeywords.some((keyword) => snippetLower.includes(keyword));

    if (!isMeaningful) {
      return {
        evidenceSnippet: null,
        conflictDetected: false,
        conflictSummary: null,
      };
    }

    return {
      evidenceSnippet: candidateSnippet,
      conflictDetected: false,
      conflictSummary: null,
    };
  }

  private summariseEvidence(retrievedDocuments: RetrievedDocument[]): string | null {
    const candidates = retrievedDocuments.filter((document) => {
      const combined = `${document.fragment} ${document.snippet}`.toLowerCase();
      return /(understanding|purpose|judgement|action|governance|evidence|people)/.test(combined);
    });

    if (candidates.length === 0) {
      return null;
    }

    const peopleSignal = candidates.some((document) => /people/.test(`${document.fragment} ${document.snippet}`.toLowerCase()));
    const evidenceSignal = candidates.some((document) => /evidence|judgement|governance/.test(`${document.fragment} ${document.snippet}`.toLowerCase()));
    const actionSignal = candidates.some((document) => /action|understanding/.test(`${document.fragment} ${document.snippet}`.toLowerCase()));

    const parts: string[] = [];
    if (peopleSignal) {
      parts.push("people-first");
    }
    if (evidenceSignal) {
      parts.push("evidence-led");
    }
    if (actionSignal) {
      parts.push("understanding-before-action");
    }

    if (parts.length === 0) {
      return null;
    }

    return parts.join(", ");
  }

  private detectConflictingEvidence(
    retrievedDocuments: RetrievedDocument[],
  ): string | null {
    const snippets = retrievedDocuments
      .map((document) => `${document.fragment} ${document.snippet}`.toLowerCase())
      .filter(Boolean);

    const firstOrder = snippets.some(
      (snippet) => /\bunderstanding\b.*\bbefore\b.*\baction\b/.test(snippet),
    );
    const secondOrder = snippets.some(
      (snippet) => /\baction\b.*\bbefore\b.*\bunderstanding\b/.test(snippet),
    );

    if (firstOrder && secondOrder) {
      return "One passage says understanding should come before action, while another says action should come before understanding.";
    }

    return null;
  }

  private buildJudgementUnderstandingResponse(question: string): { answer: string; understanding: JudgementUnderstanding } | null {
    if (!this.activeDeliberation) {
      return null;
    }

    const loweredQuestion = question.trim().toLowerCase();
    const questionType = this.classifyJudgementQuestion(loweredQuestion);

    if (!questionType) {
      return null;
    }

    const record = this.activeDeliberation;
    const decisiveConsideration = record.whyThisRecommendation || record.recommendedDirection.rationale;
    const supportingReasons = [record.whyThisRecommendation].filter(Boolean);
    const meaningfulAlternatives = record.alternativesConsidered.map((alternative) => alternative.name);
    const whyAlternativesWereNotChosen = record.whyAlternativesRejected.length > 0
      ? record.whyAlternativesRejected
      : ["The evidence and trade-offs favoured the selected direction."];
    const materialUncertainty = record.unresolvedQuestions.length > 0
      ? record.unresolvedQuestions
      : ["The repository evidence remains incomplete."];
    const whatCouldChangeTheJudgement = [
      "clear evidence that the responsibility gap is not material",
      "clear evidence that the repository already covers the required governance picture",
    ];
    const listenerNeed = this.inferListenerNeed(questionType);
    const explanationIntent = this.inferExplanationIntent(questionType);

    const understanding: JudgementUnderstanding = {
      subject: "the recommended next step",
      judgement: record.recommendedDirection.direction,
      questionBeingAnswered: question,
      decisiveConsideration,
      supportingReasons,
      meaningfulAlternatives,
      whyAlternativesWereNotChosen,
      materialUncertainty,
      confidence: record.confidence,
      whatCouldChangeTheJudgement,
      listenerNeed,
      explanationIntent,
      understandingComplete: true,
    };

    const answer = this.renderJudgementUnderstandingAnswer(questionType, understanding);

    return { answer, understanding };
  }

  private classifyJudgementQuestion(question: string): "why" | "alternatives" | "responsibility" | "success" | "risk" | "confidence" | "changed-thinking" | null {
    if (/why did you choose|why did you recommend|why this recommendation|why was that the best|why did you decide/i.test(question)) {
      return "why";
    }

    if (/what alternatives did you consider|what options did you consider|what other options|alternatives did you consider/i.test(question)) {
      return "alternatives";
    }

    if (/who should become involved|who should be involved|who should take part|who should own/i.test(question)) {
      return "responsibility";
    }

    if (/how would you know it had succeeded|how would you know it had worked|how would you know it worked|how would you know it had succeeded/i.test(question)) {
      return "success";
    }

    if (/what happens if we ignore it|what risks exist|what happens if it is ignored|what are the risks/i.test(question)) {
      return "risk";
    }

    if (/how confident are you|what would change your confidence|what would change your mind/i.test(question)) {
      return "confidence";
    }

    if (/has this conversation changed your thinking|has this changed your thinking|changed your thinking|changed your understanding/i.test(question)) {
      return "changed-thinking";
    }

    return null;
  }

  private inferListenerNeed(questionType: "why" | "alternatives" | "responsibility" | "success" | "risk" | "confidence" | "changed-thinking"): string {
    switch (questionType) {
      case "why":
        return "rationale";
      case "alternatives":
        return "comparison";
      case "responsibility":
        return "accountability";
      case "success":
        return "success criteria";
      case "risk":
        return "risk understanding";
      case "confidence":
        return "reassurance";
      case "changed-thinking":
        return "genuine reflection";
      default:
        return "rationale";
    }
  }

  private inferExplanationIntent(questionType: "why" | "alternatives" | "responsibility" | "success" | "risk" | "confidence" | "changed-thinking"): string {
    switch (questionType) {
      case "why":
        return "Explain the decisive consideration behind the judgement";
      case "alternatives":
        return "Explain the credible alternatives and why they were not chosen";
      case "responsibility":
        return "Explain which responsibility domains matter and where the uncertainty lies";
      case "success":
        return "Explain observable signs that the recommendation is working";
      case "risk":
        return "Explain the credible consequences of ignoring the recommendation";
      case "confidence":
        return "Explain confidence, uncertainty, and what would change the judgement";
      case "changed-thinking":
        return "Explain whether understanding changed while the judgement remained stable";
      default:
        return "Explain the meaning of the judgement";
    }
  }

  private renderJudgementUnderstandingAnswer(questionType: "why" | "alternatives" | "responsibility" | "success" | "risk" | "confidence" | "changed-thinking", understanding: JudgementUnderstanding): string {
    switch (questionType) {
      case "why":
        return `What persuaded me in the deliberation was ${understanding.decisiveConsideration}. I chose this direction because the evidence did not yet support treating the organisational picture as complete, and the uncertainty around responsibility coverage mattered. That is why I made this recommendation.`;
      case "alternatives":
        return `I considered ${understanding.meaningfulAlternatives.join(" and ")}. I chose against them because ${understanding.whyAlternativesWereNotChosen.join(" and ")}.`;
      case "responsibility":
        return `The relevant responsibility domains are governance, ownership, and evidence stewardship. The main concern is that the repository does not yet show clear responsibility coverage, so those domains need to be clarified.`;
      case "success":
        return `I would know it had worked if the repository showed clearer governance coverage, clearer responsibility domains, and more evidence-led decision-making.`;
      case "risk":
        return `The main risks are confusion over ownership and a stronger chance of acting on assumption rather than evidence.`;
      case "confidence":
        return `My confidence is ${understanding.confidence.level} because ${understanding.confidence.reason}. I would change it if clear evidence showed the responsibility gap was not material or that the repository already covered the needed governance picture.`;
      case "changed-thinking":
        return `The recommendation remains unchanged, but my understanding has deepened around how much governance and ownership matter to making the judgement credible.`;
      default:
        return `What persuaded me was ${understanding.decisiveConsideration}.`;
    }
  }

  private buildDeliberationRecord(
    question: string,
    investigationResults: InvestigationResult[],
    investigationCompletion: InvestigationCompletion,
    retrievedDocuments: RetrievedDocument[],
  ): DeliberationRecord {
    const acceptedEvidence = retrievedDocuments.slice(0, 3).map((document, index) => ({
      id: `evidence-${index + 1}`,
      title: document.title,
      sourcePath: document.sourcePath,
      summary: document.fragment || document.snippet,
    }));
    const rejectedEvidence = retrievedDocuments.slice(3).map((document, index) => ({
      id: `rejected-${index + 1}`,
      title: document.title,
      sourcePath: document.sourcePath,
      summary: document.fragment || document.snippet,
    }));

    const supportedFindings = investigationResults
      .filter((result) => result.status === "answered" || result.status === "partial")
      .map((result) => result.conclusion);
    const unsupportedFindings = investigationResults
      .filter((result) => result.status === "unsupported")
      .map((result) => result.conclusion);
    const contradictoryFindings = investigationResults
      .filter((result) => result.status === "contradictory")
      .map((result) => result.conclusion);

    const alternatives: Alternative[] = [
      {
        name: "Treat the repository as sufficient and avoid governance change",
        description: "Accept the current state and avoid a stronger governance recommendation.",
      },
      {
        name: "Improve governance and responsibility coverage first",
        description: "Strengthen the evidence base before treating the organisational picture as complete.",
      },
    ];

    const tradeOffs: TradeOff[] = [
      {
        option: "Improve governance and responsibility coverage first",
        advantage: "Strengthens evidence quality and reduces hidden gaps.",
        cost: "It may slow immediate action while governance detail is clarified.",
      },
      {
        option: "Treat the repository as sufficient",
        advantage: "Preserves momentum in the short term.",
        cost: "It risks acting on incomplete organisational evidence.",
      },
    ];

    const assumptions: Assumption[] = [
      {
        statement: "The repository contains the most relevant evidence available for the current question.",
        impact: "If this is wrong, the recommendation should be revisited.",
      },
      {
        statement: "The governance and responsibility gap is material to the recommendation.",
        impact: "If the gap is not material, a lighter recommendation may suffice.",
      },
    ];

    const risks: Risk[] = [
      {
        description: "Acting without clear ownership or governance coverage may create confusion.",
        severity: "high",
      },
      {
        description: "The current repository may still be incomplete, so confidence must remain moderate.",
        severity: "medium",
      },
    ];

    const expectedBenefits: Benefit[] = [
      {
        description: "Clearer governance and responsibility coverage.",
        impact: "Improves trust and makes later decisions easier to support.",
      },
      {
        description: "More evidence-based next steps.",
        impact: "Reduces the chance of acting on assumption.",
      },
    ];

    const confidence: ConfidenceAssessment = {
      level: investigationCompletion.unsupportedQuestions.length > 0 ? "medium" : "high",
      reason: investigationCompletion.unsupportedQuestions.length > 0
        ? "The evidence is strong on purpose and governance guidance, but unresolved ownership questions remain."
        : "The evidence is strong and the investigation completed cleanly.",
    };

    const recommendedDirection: Recommendation = {
      direction: "Improve the repository’s governance and responsibility coverage before treating the organisational picture as complete.",
      rationale: "The repository supports governance and evidence quality as the most defensible next step.",
    };

    return {
      investigationId: `deliberation-${Date.now()}`,
      question,
      evidenceAccepted: acceptedEvidence,
      evidenceRejected: rejectedEvidence,
      supportedFindings,
      unsupportedFindings,
      contradictoryFindings,
      alternativesConsidered: alternatives,
      tradeOffs,
      assumptions,
      risks,
      expectedBenefits,
      confidence,
      recommendedDirection,
      whyThisRecommendation: "The evidence supports a governance-first improvement because it strengthens the evidence base and reduces unsupported organisational assumptions.",
      whyAlternativesRejected: [
        "The 'treat the repository as sufficient' option risks acting without clear responsibility coverage.",
        "The current evidence is insufficient to justify a more specific implementation recommendation.",
      ],
      unresolvedQuestions: [
        ...investigationCompletion.unsupportedQuestions,
        ...investigationCompletion.unfinishedQuestions,
      ],
      recommendationReady: true,
    };
  }

  private generateAnswerFromReasoning(
    question: string,
    reasoningTrace: string[],
    retrievedDocuments: RetrievedDocument[],
    conversationAnalysis: {
      categories: string[];
      primaryCategory: string;
      need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      shouldRetrieve: boolean;
      responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
      reason: string;
    },
    structuredUnderstanding?: {
      task: string;
      subQuestions: string[];
      retrievalPlan: string[];
      selectedDocuments: string[];
      rejectedDocuments: string[];
      evidenceQuality: string[];
      known: string[];
      unknown: string[];
      recommendation: string;
      prioritizedDocuments: RetrievedDocument[];
      investigationResults: InvestigationResult[];
      investigationComplete: boolean;
      investigationCompletion: InvestigationCompletion;
      deliberationRecord: DeliberationRecord | null;
    },
  ): string {
    const loweredQuestion = question.trim().toLowerCase();
    const isSimpleCapabilityQuestion = conversationAnalysis.primaryCategory === "capability" && /what can you help me with|what sort of things can you help with|how can you help|what can you do/i.test(loweredQuestion);
    const hasSimpleDecisionFollowUp = conversationAnalysis.primaryCategory === "unknown" && this.conversationState.topic === "decision";

    const purposeAligned = reasoningTrace.some((line) =>
      line.includes("people-first=true"),
    );

    const evidenceAligned = reasoningTrace.some((line) =>
      line.includes("evidence-led=true"),
    );

    const evidenceLine = reasoningTrace.find((line) =>
      line.includes("Repository evidence:"),
    );

    const conflictLine = reasoningTrace.find((line) =>
      line.includes("Repository evidence conflict"),
    );

    const synthesisLine = reasoningTrace.find((line) =>
      line.includes("Evidence synthesis:"),
    );
    const investigationLines = reasoningTrace.filter((line) => line.startsWith("Investigation:"));
    const unsupportedInvestigation = investigationLines.find((line) => line.toLowerCase().includes("unsupported"));
    const completionLine = reasoningTrace.find((line) => line.startsWith("Investigation completion:"));
    const investigationComplete = completionLine?.includes("complete=true") ?? false;
    const isReviewRecommendation = /review|recommend|needs next|what do you think helping hand needs next|next direction|priority/i.test(loweredQuestion);
    const deliberationRecord = structuredUnderstanding?.deliberationRecord ?? this.activeDeliberation;

    const lines: string[] = [];

    if (conversationAnalysis.primaryCategory === "identity") {
      lines.push(
        "I’m Andy, a digital colleague working with people to improve understanding and make thoughtful decisions.",
      );
    } else if (conversationAnalysis.primaryCategory === "capability") {
      if (isSimpleCapabilityQuestion) {
        lines.push(
          "I can help people with understanding, planning, and working through a decision. What do you need help with?",
        );
      } else {
        lines.push(
          "I can help people with understanding, planning, and working through a decision.",
        );
      }
    } else if (conversationAnalysis.primaryCategory === "review or recommendation" || isReviewRecommendation) {
      lines.push(
        "I can help by reviewing the repository and working through the question carefully.",
      );
    } else if (conversationAnalysis.primaryCategory === "purpose") {
      lines.push(
        "I exist to help people reach better understanding before judgement or action.",
      );
    } else if (conversationAnalysis.primaryCategory === "trust") {
      lines.push(
        "I should be trusted when my reasoning is grounded in evidence, transparent about uncertainty, and aligned with governing principles.",
      );
    } else if (conversationAnalysis.primaryCategory === "uncertainty") {
      lines.push(
        "If I do not know something, I should say so clearly, avoid pretending certainty, and look for better evidence.",
      );
    } else if (conversationAnalysis.primaryCategory === "definition") {
      lines.push(
        "A Digital Colleague is a guided companion that helps people work with evidence and understanding rather than assumption.",
      );
    } else {
      lines.push(
        "I exist to help people reach better understanding before judgement or action.",
      );
    }

    if (hasSimpleDecisionFollowUp) {
      lines.push("What decision are you facing, and what options are you considering?");
    } else if (["purpose", "trust", "uncertainty", "definition"].includes(conversationAnalysis.primaryCategory)) {
      lines.push(
        "Helping Hand's constitutional purpose is people-first, and my role is to carry that purpose into practical conversations.",
      );
    }

    if (conflictLine) {
      lines.push(
        "The repository evidence contains a conflict, so I should treat the guidance as uncertain and seek stronger evidence before adopting either interpretation.",
      );
      lines.push(
        "I would not silently adopt the contradictory wording without resolving the conflict.",
      );
    } else if (evidenceLine) {
      const synthesisText = synthesisLine
        ? synthesisLine
            .replace(/^Stage\s+\d+\s+-\s+Evidence synthesis:\s*/, "")
            .replace(/^Stage\s+\d+\s+-\s+Repository evidence synthesis:\s*/, "")
            .replace(/^Evidence synthesis:\s*/, "")
            .trim()
        : null;
      const summaryParts = [];

      if (synthesisText) {
        summaryParts.push(`The repository points toward ${synthesisText}.`);
      }

      const primaryFragment = retrievedDocuments[0]?.fragment?.trim();
      if (primaryFragment) {
        const normalizedFragment = primaryFragment.replace(/\s+/g, " ").trim();
        const compactFragment = normalizedFragment.length > 90
          ? `${normalizedFragment.slice(0, 87)}...`
          : normalizedFragment;
        summaryParts.push(`A governing phrase in the repository is: ${compactFragment}`);
      }

      summaryParts.push(
        "That means I should help people understand clearly, decide carefully, and use evidence rather than assumption.",
      );

      if (summaryParts.length > 0) {
        lines.push(summaryParts.join(" "));
      }
    }

    if (evidenceAligned) {
      lines.push(
        "I should ground my recommendations in evidence and traceable reasoning, not assumption.",
      );
    }

    if (isReviewRecommendation) {
      lines.push(
        "I reviewed the repository and worked through the sub-questions above."
      );
      if (!investigationComplete) {
        lines.push(
          "The investigation is not yet complete, so I will not recommend a final next step yet.",
        );
      } else if (!deliberationRecord?.recommendationReady) {
        lines.push(
          "The investigation is complete, but I need to deliberate before I produce a recommendation.",
        );
      } else {
        if (unsupportedInvestigation) {
          lines.push(
            `I cannot determine this from the current repository: ${unsupportedInvestigation.replace(/^Investigation:\s*/, "").replace(/^Unsupported\s*—\s*/, "")}`,
          );
          lines.push(
            "Evidence is insufficient to determine the missing part from the current repository.",
          );
        }
        lines.push(
          "The investigation is complete, and I can recommend a cautious next step with moderate confidence because I have now classified every planned question.",
        );
        lines.push(
          "I recommend improving the repository’s governance and responsibility coverage before I treat the organisational picture as complete.",
        );
      }
    }

    if (purposeAligned || conversationAnalysis.primaryCategory === "purpose") {
      lines.push(
        "This recommendation is about evidence quality and governance coverage, not about replacing people.",
      );
    }

    return lines.join("\n");
  }

  private prepareConversationState(statement: string, analysis: {
    categories: string[];
    primaryCategory: string;
    need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    shouldRetrieve: boolean;
    responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    reason: string;
  }): void {
    const lowered = statement.trim().toLowerCase();
    const existingFacts = [...this.conversationState.knownFacts];
    const knownFacts = this.addUniqueFact(existingFacts, lowered);

    const transition = this.detectConversationTransition(lowered);

    const isEmotional = analysis.primaryCategory === "emotional disclosure" || analysis.primaryCategory === "nervousness" || /\b(worried|nervous|difficult|hard|upset|afraid|scared|stressed|overwhelmed|frustrated|sad|angry)\b/.test(lowered);
    const isDecision = /\b(help with a decision|need help with a decision|decision\b|act now|wait|waiting|deciding whether to act now or wait|options|choose|considering)\b/.test(lowered);
    const isMistake = analysis.primaryCategory === "mistake or regret" || /\b(mistake|regret|wrong figures|wrong|messed up|made a mess|made a mistake)\b/.test(lowered);
    const isDecisionContext = isDecision || (this.conversationState.topic === "decision" && /\b(wait|waiting|act now|decision|options|choose|considering|worse|risk)\b/.test(lowered));
    const hasTeamConversationContext = /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group|tell them)\b/.test(lowered);

    const isKnowledgeQuestion = analysis.primaryCategory === "purpose" || analysis.primaryCategory === "identity" || analysis.primaryCategory === "definition" || analysis.primaryCategory === "trust" || analysis.primaryCategory === "uncertainty";

    let topic = this.conversationState.topic;
    let personGoal = this.conversationState.personGoal;
    let nextStep = this.conversationState.nextStep;

    if (transition) {
      topic = transition.topic;
      personGoal = transition.personGoal;
      nextStep = transition.nextStep;
    } else if (isKnowledgeQuestion) {
      topic = "knowledge";
      personGoal = "answer the current knowledge question";
      nextStep = "answer the current knowledge question clearly";
    } else if (isDecisionContext) {
      topic = "decision";
    } else if (isMistake) {
      topic = this.conversationState.topic === "decision" ? "decision" : "mistake or regret";
    } else if (isEmotional) {
      topic = "emotional concern";
    }

    if (this.conversationState.topic === "mistake or regret" && isMistake && lowered.includes("wrong figures")) {
      topic = "mistake or regret";
    }

    let emotionalContext = this.conversationState.emotionalContext;
    if (isEmotional) {
      emotionalContext = lowered;
    } else if (this.conversationState.topic === "decision" && this.conversationState.emotionalContext) {
      emotionalContext = this.conversationState.emotionalContext;
    }

    if (!transition && topic === "decision") {
      personGoal = "make a decision";
    } else if (!transition && topic === "mistake or regret") {
      personGoal = personGoal ?? "sort things out";
    }

    const choices = [...this.conversationState.choices];
    if (isDecision && !choices.some((choice) => choice.toLowerCase().includes(lowered))) {
      choices.push(lowered);
    }

    const askedQuestions = [...this.conversationState.askedQuestions];
    let unresolvedUnknowns = [...this.conversationState.unresolvedUnknowns];

    if (unresolvedUnknowns.includes("what happened first") && /\b(wrong figures|sent the wrong|made a mistake|messed up|made a mess|regret)\b/.test(lowered)) {
      unresolvedUnknowns = unresolvedUnknowns.filter((item) => item !== "what happened first");
      if (!unresolvedUnknowns.includes("whether the figures have already been acted on")) {
        unresolvedUnknowns.push("whether the figures have already been acted on");
      }
      if (!unresolvedUnknowns.includes("whether they can still be corrected")) {
        unresolvedUnknowns.push("whether they can still be corrected");
      }
    }

    if (topic === "mistake or regret" && /\b(wrong figures|sent the wrong|wrong figures to the team|messed up|made a mess|made a mistake)\b/.test(lowered)) {
      unresolvedUnknowns = unresolvedUnknowns.filter((item) => item !== "what happened first");
      if (!unresolvedUnknowns.includes("whether the figures have already been acted on")) {
        unresolvedUnknowns.push("whether the figures have already been acted on");
      }
      if (!unresolvedUnknowns.includes("whether they can still be corrected")) {
        unresolvedUnknowns.push("whether they can still be corrected");
      }
    }

    if (topic === "decision") {
      if (/\b(act now|wait|waiting|worse|risk|urgency|deadline|consequence|consequences)\b/.test(lowered)) {
        unresolvedUnknowns = [
          "what action is being considered",
          ...(lowered.includes("make it worse") || lowered.includes("worse") ? [] : ["what may worsen by waiting"]),
          "urgency",
          "likely consequences of acting now versus waiting",
        ];
      } else if (!unresolvedUnknowns.includes("the actual decision")) {
        unresolvedUnknowns.push("the actual decision");
      }
    }

    if (isEmotional && hasTeamConversationContext) {
      if (/\b(difficult week|difficult|hard week|hard)\b/.test(lowered)) {
        unresolvedUnknowns = [
          "whether the main concern is the team’s reaction",
          "whether the main concern is finding the right words",
          "whether the main concern is the impact on morale",
          "whether the main concern is deciding what to say first",
        ];
      } else {
        if (!unresolvedUnknowns.includes("what feels hardest")) {
          unresolvedUnknowns.push("what feels hardest");
        }
        if (!unresolvedUnknowns.includes("what is most important to address first")) {
          unresolvedUnknowns.push("what is most important to address first");
        }
      }
    }

    if (!transition) {
      if (topic === "mistake or regret") {
        if (unresolvedUnknowns.some((unknown) => /acted on|corrected/.test(unknown))) {
          nextStep = "ask whether the figures have already been acted on or can still be corrected";
        } else {
          nextStep = "ask for the first practical fact or the current state of the issue";
        }
      } else if (topic === "decision") {
        if (/\b(act now|wait|waiting|worse|risk|urgency|deadline|consequence|consequences)\b/.test(lowered)) {
          nextStep = "ask what action is being considered and what might worsen by waiting";
        } else {
          nextStep = "ask what decision the person is facing and which options they are considering";
        }
      } else if (topic === "emotional concern") {
        if (/\b(difficult week|difficult|hard week|hard)\b/.test(lowered)) {
          nextStep = "ask whether the concern is the team’s reaction, finding the right words, morale, or deciding what to say first";
        } else {
          nextStep = /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group|tell them)\b/.test(lowered)
            ? "ask which part of the team conversation feels hardest"
            : "ask what feels hardest right now";
        }
      }
    }

    this.updateConversationState({
      topic,
      knownFacts,
      emotionalContext,
      personGoal,
      choices,
      askedQuestions,
      unresolvedUnknowns,
      nextStep,
    });
  }

  private detectConversationTransition(lowered: string): {
    topic: string;
    personGoal: string;
    nextStep: string;
  } | null {
    const isPriorityInput = this.isExplicitPriorityPrompt(lowered);
    const isBranchInput = /\b(idea|branch|park|parking|return point|hold that|capture this|come back to|later)\b/.test(lowered) && /\b(idea|branch|park|parking|return point|later|preserve|capture|come back|hold)\b/.test(lowered);
    const isReturnInput = /\b(return|clawback|resume|go back to|back to|return to|resume to)\b/.test(lowered);

    if (isPriorityInput) {
      return {
        topic: "priority organisation",
        personGoal: "decide the next highest-value step",
        nextStep: "ask what the next highest-value step is and how it fits the current mission",
      };
    }

    if (isBranchInput) {
      return {
        topic: "branch or parking",
        personGoal: "capture the idea without losing the current mission",
        nextStep: "ask how the branch should be captured and what the return point should be",
      };
    }

    if (isReturnInput) {
      return {
        topic: "clawback or return",
        personGoal: "return to an earlier workstream deliberately",
        nextStep: "ask what should be resumed and whether the human wants to continue",
      };
    }

    return null;
  }

  private isExplicitPriorityPrompt(question: string): boolean {
    const loweredQuestion = question.trim().toLowerCase();

    return /\b(what should we work on next|what should we work on|what should we focus on|what should we do next|what should come next|what should be next|what is the next priority|what are our priorities|which priority|should we finish|should we continue|continue with|work on next|priority|priorities)\b/.test(loweredQuestion);
  }

  private buildPriorityRecommendationResponse(question: string, compassAdvisory: {
    contextSummary: string[];
    reasoningTrace: string[];
    recommendation: {
      recommendedDirection: RecommendationDirection;
      reason: string;
      workstreamAffected: string;
    };
  }): string | null {
    if (!this.isExplicitPriorityPrompt(question)) {
      return null;
    }

    const workstream = compassAdvisory.recommendation.workstreamAffected?.trim() || "the current mission";
    const reason = (compassAdvisory.recommendation.reason || "the current mission remains the highest-value workstream")
      .trim()
      .replace(/[.]+$/, "")
      .toLowerCase();
    const direction = compassAdvisory.recommendation.recommendedDirection;

    if (direction === "return") {
      return `I’d recommend returning to ${workstream} for now. The reason is that ${reason}. The main assumption is that ${workstream} remains the stronger near-term focus. You still decide.`;
    }

    return `I’d recommend continuing with ${workstream} for now. The reason is that ${reason}. The main assumption is that ${workstream} remains the stronger near-term focus. You still decide.`;
  }

  private buildMoralOverrideResponse(question: string, moralCompassAdvisory: {
    contextSummary: string[];
    reasoningTrace: string[];
    outcome: "pass" | "warn" | "block" | "escalate";
    humanExplanation: string | null;
    shouldSurface: boolean;
  }, authorityAdvisory: {
    contextSummary: string[];
    reasoningTrace: string[];
    decision: {
      outcome: "allow" | "require-co-authority" | "block" | "uncertain";
      actionType: "read" | "review" | "recommend" | "approve" | "modify" | "execute" | "uncertain";
      classification: string;
      reason: string;
      explanation: string;
      requiredCoAuthorities: string[];
      provenance: {
        reason: string;
        source: string;
        timestamp: string;
      };
    };
  }): string | null {
    if (!moralCompassAdvisory.shouldSurface || !moralCompassAdvisory.humanExplanation) {
      return null;
    }

    const loweredQuestion = question.trim().toLowerCase();

    if (moralCompassAdvisory.outcome === "block") {
      return moralCompassAdvisory.humanExplanation;
    }

    if (moralCompassAdvisory.outcome === "escalate") {
      if (/constitution/.test(loweredQuestion)) {
        return authorityAdvisory.decision.explanation;
      }

      if (/(deploy|patch|security|deployment|release)/.test(loweredQuestion)) {
        return `I’d want Cyril involved before proceeding, because this reaches beyond ordinary judgement.`;
      }

      if (/(expense|financial|budget|commitment|commit)/.test(loweredQuestion)) {
        return authorityAdvisory.decision.explanation;
      }

      if (/(contract|legal|agreement|obligation|liability)/.test(loweredQuestion)) {
        return authorityAdvisory.decision.explanation;
      }

      return moralCompassAdvisory.humanExplanation;
    }

    return null;
  }

  private buildStateDrivenResponse(statement: string, analysis: {
    categories: string[];
    primaryCategory: string;
    need: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    shouldRetrieve: boolean;
    responseMode: "acknowledge" | "answer" | "clarify" | "support" | "reassure";
    reason: string;
  }): string | null {
    const lowered = statement.trim().toLowerCase();
    const state = this.conversationState;
    const askedQuestions = state.askedQuestions;

    const isDecisionInput = /\b(decision|options|considering|act now|wait|waiting|worse|risk|choose|option)\b/.test(lowered) || (state.topic === "decision" && /\b(worried|waiting|worse|risk)\b/.test(lowered));

    if (state.topic === "priority organisation") {
      return "We should focus on the current mission and choose the next highest-value step. What should we work on next?";
    }

    if (state.topic === "branch or parking") {
      return "I can capture that as a branch and preserve the return point. What should we preserve for the return?";
    }

    if (state.topic === "clawback or return") {
      return "We can return to that workstream deliberately. What should we resume, and does the human want to continue with it?";
    }
    const isEmotionalInput = /\b(worried|nervous|difficult|hard|upset|afraid|scared|stressed|overwhelmed|frustrated|sad|angry)\b/.test(lowered) && !/\b(decision|option|choose|act now|wait|considering|sort it out|figure out|work out)\b/.test(lowered);

    if (state.topic === "mistake or regret") {
      const isCorrectionFollowUp = /\b(wrong figures|sent the wrong|wrong figures to the team|already been acted on|still be corrected|can still be corrected|acted on|corrected)\b/.test(lowered);

      if (isCorrectionFollowUp) {
        this.updateConversationState({
          askedQuestions: Array.from(new Set([...state.askedQuestions, "what happened first"])),
          unresolvedUnknowns: state.unresolvedUnknowns.filter((unknown) => /acted on|corrected/.test(unknown) || unknown === "what happened first"),
          nextStep: "ask whether the figures have already been acted on or can still be corrected",
        });
        return "Have those figures already been acted on, or can they still be corrected?";
      }

      if (state.unresolvedUnknowns.includes("what happened first") && !/\b(wrong figures|wrong|figures|messed up|made a mess|made a mistake|mistake)\b/.test(lowered)) {
        this.updateConversationState({
          askedQuestions: Array.from(new Set([...state.askedQuestions, "what happened first"])),
          unresolvedUnknowns: state.unresolvedUnknowns.filter((unknown) => unknown !== "what happened first"),
          nextStep: "ask for the first practical fact or the current state of the issue",
        });
        return "What happened first? I only need the first practical fact to help you sort it out.";
      }

      if (state.nextStep?.includes("first practical fact") || state.askedQuestions.includes("what happened first")) {
        this.updateConversationState({
          askedQuestions: Array.from(new Set([...state.askedQuestions, "what happened first"])),
          unresolvedUnknowns: state.unresolvedUnknowns.filter((unknown) => unknown !== "what happened first"),
          nextStep: "ask for the first practical fact or the current state of the issue",
        });
        return "What happened first? I only need the first practical fact to help you sort it out.";
      }
    }

    if (state.topic === "decision" && /\b(act now|wait|waiting|worse|risk|urgency|deadline|consequence|consequences)\b/.test(lowered)) {
      const hasActNowOrWait = /\b(act now|wait|waiting)\b/.test(lowered);
      const hasWorse = /\b(worse|risk|consequence|consequences|danger|harm|problem)\b/.test(lowered);
      const unresolvedUnknowns = [
        "what action is being considered",
        ...(lowered.includes("make it worse") || lowered.includes("worse") ? [] : ["what may worsen by waiting"]),
        "urgency",
        "likely consequences of acting now versus waiting",
      ];

      const nextQuestion = hasActNowOrWait && hasWorse
        ? "What action are you considering taking now?"
        : hasActNowOrWait
          ? "What do you think could get worse if you wait?"
          : "What action are you considering taking now?";

      this.updateConversationState({
        unresolvedUnknowns,
        nextStep: `ask ${nextQuestion.toLowerCase()}`,
      });
      return nextQuestion;
    }

    if (isDecisionInput) {
      return "What decision are you facing, and what options are you considering, including the risk of waiting?";
    }

    if (state.topic === "emotional concern" && /\b(difficult week|difficult|hard week|hard)\b/.test(lowered) && /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group|tell them)\b/.test(lowered)) {
      this.updateConversationState({
        unresolvedUnknowns: [
          "whether the main concern is the team’s reaction",
          "whether the main concern is finding the right words",
          "whether the main concern is the impact on morale",
          "whether the main concern is deciding what to say first",
        ],
        nextStep: "ask whether the concern is the team’s reaction, finding the right words, morale, or deciding what to say first",
      });
      return "What worries you most: the team’s reaction, finding the right words, the impact on morale, or deciding what to say first?";
    }

    if (state.topic === "emotional concern" && (state.nextStep?.includes("team conversation") || /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group|tell them)\b/.test(lowered))) {
      return "Thanks for telling me. I’m here to support you, and I can help you think it through. What part of the team conversation feels hardest right now?";
    }

    if (isEmotionalInput) {
      return "Thanks for telling me. I’m here to support you, and I can help you think it through. What feels hardest about it right now?";
    }

    if (state.topic === "decision") {
      if (state.emotionalContext && /\b(worried|waiting|wait|worse|risk)\b/.test(state.emotionalContext)) {
        return "What decision are you facing, and what options are you considering, including the risk of waiting?";
      }

      return "What decision are you facing, and what options are you considering?";
    }

    if (state.topic === "emotional concern") {
      if (state.nextStep?.includes("team conversation") || /\b(team|meeting|presentation|speech|talk|speak|interview|call|class|group|tell them)\b/.test(lowered)) {
        return "Thanks for telling me. I’m here to support you, and I can help you think it through. What part of the team conversation feels hardest right now?";
      }

      if (state.emotionalContext && /\b(worried|nervous|hard|difficult)\b/.test(state.emotionalContext)) {
        return "Thanks for telling me. I’m here to support you, and I can help you think it through. What is making it feel that way right now?";
      }

      return "Thanks for telling me. I’m here to support you, and I can help you think it through. What feels hardest about it right now?";
    }

    if (analysis.primaryCategory === "capability") {
      return "I can help with understanding, planning, and working through a decision. What do you need help with?";
    }

    return null;
  }

  private updateConversationState(next: Partial<{
    topic: string | null;
    knownFacts: string[];
    emotionalContext: string | null;
    personGoal: string | null;
    choices: string[];
    askedQuestions: string[];
    unresolvedUnknowns: string[];
    nextStep: string | null;
  }>): void {
    this.conversationState = {
      topic: next.topic ?? this.conversationState.topic,
      knownFacts: next.knownFacts ?? this.conversationState.knownFacts,
      emotionalContext: next.emotionalContext ?? this.conversationState.emotionalContext,
      personGoal: next.personGoal ?? this.conversationState.personGoal,
      choices: next.choices ?? this.conversationState.choices,
      askedQuestions: next.askedQuestions ?? this.conversationState.askedQuestions,
      unresolvedUnknowns: next.unresolvedUnknowns ?? this.conversationState.unresolvedUnknowns,
      nextStep: next.nextStep ?? this.conversationState.nextStep,
    };
  }

  private snapshotConversationState(): {
    topic: string | null;
    knownFacts: string[];
    emotionalContext: string | null;
    personGoal: string | null;
    choices: string[];
    askedQuestions: string[];
    unresolvedUnknowns: string[];
    nextStep: string | null;
  } {
    return {
      topic: this.conversationState.topic,
      knownFacts: [...this.conversationState.knownFacts],
      emotionalContext: this.conversationState.emotionalContext,
      personGoal: this.conversationState.personGoal,
      choices: [...this.conversationState.choices],
      askedQuestions: [...this.conversationState.askedQuestions],
      unresolvedUnknowns: [...this.conversationState.unresolvedUnknowns],
      nextStep: this.conversationState.nextStep,
    };
  }

  private extractEvidenceSources(retrievedDocuments: RetrievedDocument[]): string[] {
    const sources = new Set<string>();

    for (const document of retrievedDocuments) {
      const sourcePath = document.sourcePath?.trim();
      if (sourcePath) {
        sources.add(sourcePath);
      }
    }

    return Array.from(sources).slice(0, 3);
  }
}
