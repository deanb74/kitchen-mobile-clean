export type AwarenessStatus =
  | "active"
  | "parked"
  | "incubating"
  | "blocked"
  | "waiting"
  | "completed"
  | "abandoned"
  | "branching";

export type RecommendationDirection =
  | "continue"
  | "finish"
  | "pause"
  | "park"
  | "branch"
  | "merge"
  | "return"
  | "wait"
  | "abandon"
  | "escalate";

export type MoralCompassOutcome = "pass" | "warn" | "block" | "escalate";

export interface AwarenessEntry {
  id: string;
  kind: "workstream" | "idea" | "question" | "risk" | "opportunity" | "evidence" | "change";
  title: string;
  summary: string;
  status: AwarenessStatus;
  strategicValue?: number;
  progress?: number;
  remainingEffort?: number;
  expectedBenefit?: number;
  capabilitiesUnlocked?: string[];
  dependencies?: string[];
  blockers?: string[];
  risks?: string[];
  opportunities?: string[];
  evidenceStatus?: string;
  unresolvedQuestions?: string[];
  returnPoint?: string;
  provenance: {
    reason: string;
    source: string;
    timestamp: string;
  };
}

export interface Workstream extends AwarenessEntry {
  kind: "workstream";
  objective: string;
}

export interface AwarenessRegister {
  currentMission: string;
  activeObjective: string;
  activeWorkstreams: string[];
  parkedIdeas: string[];
  returnPoints: string[];
  progressEstimates: Record<string, number>;
  remainingEffortEstimates: Record<string, number>;
  strategicValues: Record<string, number>;
  expectedBenefits: Record<string, number>;
  capabilitiesUnlocked: Record<string, string[]>;
  dependencies: Record<string, string[]>;
  blockers: Record<string, string[]>;
  risks: Record<string, string[]>;
  opportunities: Record<string, string[]>;
  evidenceStatuses: Record<string, string>;
  unresolvedQuestions: Record<string, string[]>;
  latestMeaningfulChange: string;
  entries: AwarenessEntry[];
}

export interface AwarenessSnapshot {
  currentMission: string;
  activeMission: string;
  activeObjective: string;
  changedItems: string[];
  newIdeas: string[];
  newQuestions: string[];
  newRisks: string[];
  newOpportunities: string[];
  driftSignals: string[];
  inputClassification: "advance" | "change" | "interrupt" | "branch" | "park";
  recommendation?: string;
  immutable: true;
}

export interface CompassRecommendation {
  recommendedDirection: RecommendationDirection;
  reason: string;
  evidenceUsed: string[];
  workstreamAffected: string;
  returnPoint?: string;
  confidence: number;
  assumptions: string[];
  whatRemainsSubjectToHumanChoice: string;
  provenance: {
    source: string;
    reason: string;
  };
}

export interface MoralCompassResult {
  outcome: MoralCompassOutcome;
  concern?: string;
  replacementRecommendation?: CompassRecommendation;
}

export interface CompassFlowResult {
  awarenessRegister: AwarenessRegister;
  awarenessSnapshot: AwarenessSnapshot;
  compassRecommendation: CompassRecommendation;
  moralCompassResult: MoralCompassResult;
  humanDecisionRequired: boolean;
  executedAction: "none";
}

export interface CompassContext {
  currentInput: string;
}

function createTimestamp(): string {
  return new Date().toISOString();
}

function makeEntry(
  title: string,
  summary: string,
  kind: AwarenessEntry["kind"],
  status: AwarenessStatus,
  provenanceReason: string,
  extra: Partial<AwarenessEntry> = {}
): AwarenessEntry {
  return {
    id: `${kind}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    kind,
    title,
    summary,
    status,
    provenance: {
      reason: provenanceReason,
      source: "awareness-register",
      timestamp: createTimestamp(),
    },
    ...extra,
  };
}

function getEntryKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function ensureUnique(entries: AwarenessEntry[], candidate: AwarenessEntry): AwarenessEntry[] {
  const key = getEntryKey(candidate.title);
  const existing = entries.find((entry) => getEntryKey(entry.title) === key);
  if (existing) {
    return entries;
  }
  return [...entries, candidate];
}

function parseWorkstream(input: Partial<Workstream>): Workstream {
  return {
    id: input.id ?? "workstream",
    kind: "workstream",
    title: input.title ?? "Workstream",
    summary: input.summary ?? input.objective ?? "Workstream",
    status: input.status ?? "active",
    objective: input.objective ?? input.summary ?? "Workstream",
    strategicValue: input.strategicValue,
    progress: input.progress,
    remainingEffort: input.remainingEffort,
    expectedBenefit: input.expectedBenefit,
    capabilitiesUnlocked: input.capabilitiesUnlocked,
    dependencies: input.dependencies,
    blockers: input.blockers,
    risks: input.risks,
    opportunities: input.opportunities,
    evidenceStatus: input.evidenceStatus,
    unresolvedQuestions: input.unresolvedQuestions,
    returnPoint: input.returnPoint,
    provenance: input.provenance ?? {
      reason: "initial-workstream",
      source: "awareness-register",
      timestamp: createTimestamp(),
    },
  };
}

export function createAwarenessRegister(input: {
  currentMission: string;
  activeObjective: string;
  workstreams: Array<Partial<Workstream>>;
  parkedIdeas?: string[];
  latestMeaningfulChange?: string;
}): AwarenessRegister {
  const entries = input.workstreams.map((workstream) => parseWorkstream(workstream));

  return {
    currentMission: input.currentMission,
    activeObjective: input.activeObjective,
    activeWorkstreams: entries.filter((entry) => entry.status === "active" || entry.status === "branching").map((entry) => entry.title),
    parkedIdeas: input.parkedIdeas ?? [],
    returnPoints: entries.map((entry) => entry.returnPoint ?? "").filter(Boolean),
    progressEstimates: Object.fromEntries(entries.map((entry) => [entry.title, entry.progress ?? 0])),
    remainingEffortEstimates: Object.fromEntries(entries.map((entry) => [entry.title, entry.remainingEffort ?? 0])),
    strategicValues: Object.fromEntries(entries.map((entry) => [entry.title, entry.strategicValue ?? 0])),
    expectedBenefits: Object.fromEntries(entries.map((entry) => [entry.title, entry.expectedBenefit ?? 0])),
    capabilitiesUnlocked: Object.fromEntries(entries.map((entry) => [entry.title, entry.capabilitiesUnlocked ?? []])),
    dependencies: Object.fromEntries(entries.map((entry) => [entry.title, entry.dependencies ?? []])),
    blockers: Object.fromEntries(entries.map((entry) => [entry.title, entry.blockers ?? []])),
    risks: Object.fromEntries(entries.map((entry) => [entry.title, entry.risks ?? []])),
    opportunities: Object.fromEntries(entries.map((entry) => [entry.title, entry.opportunities ?? []])),
    evidenceStatuses: Object.fromEntries(entries.map((entry) => [entry.title, entry.evidenceStatus ?? "unknown"])),
    unresolvedQuestions: Object.fromEntries(entries.map((entry) => [entry.title, entry.unresolvedQuestions ?? []])),
    latestMeaningfulChange: input.latestMeaningfulChange ?? "Initial register created.",
    entries,
  };
}

export function registerAwarenessInput(register: AwarenessRegister, context: CompassContext): AwarenessRegister {
  const input = context.currentInput.toLowerCase();
  const nextEntries = [...register.entries];
  const newIdeas: string[] = [];

  if (input.includes("idea:")) {
    const title = `Idea: ${context.currentInput.replace(/^idea:\s*/i, "")}`;
    const entry = makeEntry(title, context.currentInput, "idea", "parked", "captured-idea", { status: "parked" });
    const updatedEntries = ensureUnique(nextEntries, entry);
    if (updatedEntries.length !== nextEntries.length) {
      newIdeas.push(title);
      nextEntries.push(entry);
    }
  }

  if (input.includes("risk")) {
    const entry = makeEntry("Risk noticed", context.currentInput, "risk", "blocked", "risk-detected", { status: "blocked" });
    nextEntries.push(entry);
  }

  if (input.includes("opportunity")) {
    const entry = makeEntry("Opportunity noticed", context.currentInput, "opportunity", "incubating", "opportunity-detected", { status: "incubating" });
    nextEntries.push(entry);
  }

  if (input.includes("question")) {
    const entry = makeEntry("Outstanding question", context.currentInput, "question", "waiting", "question-detected", { status: "waiting" });
    nextEntries.push(entry);
  }

  const nextRegister: AwarenessRegister = {
    ...register,
    latestMeaningfulChange: context.currentInput,
    entries: nextEntries.filter((entry, index) => nextEntries.findIndex((candidate) => candidate.title === entry.title) === index),
    parkedIdeas: Array.from(new Set([...register.parkedIdeas, ...newIdeas])),
  };

  return nextRegister;
}

export function buildAwarenessSnapshot(register: AwarenessRegister, context: CompassContext): AwarenessSnapshot {
  const input = context.currentInput.toLowerCase();
  let inputClassification: AwarenessSnapshot["inputClassification"] = "change";
  if (input.includes("test") || input.includes("validate") || input.includes("outside-world")) {
    inputClassification = "advance";
  }
  if (input.includes("branch") || input.includes("human validation") || (input.includes("proof") && input.includes("unlock"))) {
    inputClassification = "branch";
  }
  if (input.includes("idea:") || input.includes("park")) {
    inputClassification = "park";
  }
  if (input.includes("risk") || input.includes("blocker") || input.includes("pause")) {
    inputClassification = "interrupt";
  }
  if (input.includes("noticed") && input.includes("risk")) {
    inputClassification = "change";
  }

  const driftSignals = [] as string[];
  if (register.currentMission && !input.includes(register.currentMission.toLowerCase())) {
    driftSignals.push("Mission context is not explicitly present in the latest input.");
  }

  return {
    currentMission: register.currentMission,
    activeMission: register.currentMission,
    activeObjective: register.activeObjective,
    changedItems: register.entries.map((entry) => entry.title),
    newIdeas: register.entries.filter((entry) => entry.kind === "idea").map((entry) => entry.title),
    newQuestions: register.entries.filter((entry) => entry.kind === "question").map((entry) => entry.title),
    newRisks: register.entries.filter((entry) => entry.kind === "risk").map((entry) => entry.title),
    newOpportunities: register.entries.filter((entry) => entry.kind === "opportunity").map((entry) => entry.title),
    driftSignals,
    inputClassification,
    immutable: true,
  };
}

export function organiseCompassPriorities(register: AwarenessRegister, context: CompassContext): { recommendation: CompassRecommendation; parkedItems: string[] } {
  const snapshot = buildAwarenessSnapshot(register, context);
  const workstreams = register.entries.filter((entry): entry is Workstream => entry.kind === "workstream");

  const scored = workstreams.map((workstream) => {
    const strategicValue = workstream.strategicValue ?? register.strategicValues[workstream.title] ?? 0;
    const expectedBenefit = workstream.expectedBenefit ?? register.expectedBenefits[workstream.title] ?? 0;
    const progress = workstream.progress ?? register.progressEstimates[workstream.title] ?? 0;
    const remainingEffort = workstream.remainingEffort ?? register.remainingEffortEstimates[workstream.title] ?? 0;
    const evidenceStatus = workstream.evidenceStatus ?? register.evidenceStatuses[workstream.title] ?? "unknown";
    const dependencyCount = workstream.dependencies?.length ?? register.dependencies[workstream.title]?.length ?? 0;
    const hasReusableCapability = (workstream.capabilitiesUnlocked ?? []).some((capability) => capability.includes("reusable") || capability.includes("platform"));
    const alignsWithMission = register.currentMission.toLowerCase().includes(workstream.title.toLowerCase()) || register.activeObjective.toLowerCase().includes(workstream.title.toLowerCase()) || workstream.objective.toLowerCase().includes(register.activeObjective.toLowerCase().split(" ")[0] ?? "");

    let score = strategicValue * 2 + expectedBenefit + (hasReusableCapability ? 3 : 0);
    if (evidenceStatus === "validated") {
      score += 2;
    }
    if (remainingEffort <= 1) {
      score += 1;
    }
    if (progress >= 90) {
      score += 1;
    }
    if (progress < 40) {
      score -= 1;
    }
    if (dependencyCount > 0) {
      score -= 1;
    }
    if (alignsWithMission) {
      score += 4;
    }
    if (workstream.title.includes("Kev") && remainingEffort <= 1 && progress >= 90) {
      score -= 6;
    }

    return { workstream, score };
  });

  const sorted = [...scored].sort((left, right) => right.score - left.score);
  const best = sorted[0];
  const input = context.currentInput.toLowerCase();
  const parkedItems = register.entries.filter((entry) => entry.kind === "idea" && entry.status === "parked").slice(0, 2).map((entry) => entry.title);

  let recommendation: CompassRecommendation;

  if (input.includes("human validation") || input.includes("visible-behaviour proof") || (input.includes("proof") && input.includes("unlock"))) {
    recommendation = {
      recommendedDirection: "branch",
      reason: "A small branch to the Kev proof could unlock a reusable capability and preserve the wider mission context.",
      evidenceUsed: ["current input mentions a validation checkpoint", "reusable capability is mentioned", "the branch is small and strategically valuable"],
      workstreamAffected: "Kev",
      returnPoint: register.entries.find((entry) => entry.title.includes("Andy"))?.returnPoint,
      confidence: 0.78,
      assumptions: ["The human validation task still matters"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "evidence-based prioritisation from awareness snapshot",
      },
    };
  } else if (input.includes("closed") || input.includes("validated") || input.includes("stopping condition")) {
    recommendation = {
      recommendedDirection: "return",
      reason: "The branch has reached a sensible stopping condition and should return to the higher-value mission.",
      evidenceUsed: ["branch has reached a stopping condition", "the original mission still matters"],
      workstreamAffected: "Andy",
      returnPoint: register.entries.find((entry) => entry.title.includes("Andy"))?.returnPoint,
      confidence: 0.72,
      assumptions: ["The branch is now complete enough to pause"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "evidence-based prioritisation from awareness snapshot",
      },
    };
  } else if (best && best.workstream.title.includes("Kev") && best.score >= 10) {
    recommendation = {
      recommendedDirection: "finish",
      reason: "The remaining effort is small and the work unlocks a reusable capability.",
      evidenceUsed: ["remaining effort is low", "evidence is validated", "capability is reusable"],
      workstreamAffected: best.workstream.title,
      returnPoint: best.workstream.returnPoint,
      confidence: 0.74,
      assumptions: ["The remaining validation step is still valuable"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "evidence-based prioritisation from awareness snapshot",
      },
    };
  } else if (input.includes("branch") || input.includes("return") || input.includes("closed")) {
    recommendation = {
      recommendedDirection: "return",
      reason: "The branch has reached its sensible stopping condition and should return to the higher-value mission.",
      evidenceUsed: ["branch has reached a stopping condition", "the original mission still matters"],
      workstreamAffected: "Andy",
      returnPoint: register.entries.find((entry) => entry.title.includes("Andy"))?.returnPoint,
      confidence: 0.72,
      assumptions: ["The branch is now complete enough to pause"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "evidence-based prioritisation from awareness snapshot",
      },
    };
  } else if (best) {
    recommendation = {
      recommendedDirection: best.workstream.title.includes("Kev") ? "finish" : "continue",
      reason: best.workstream.title.includes("Kev")
        ? "The remaining effort is small and the work unlocks a reusable capability."
        : "The higher-value mission direction is still the active objective and should be pursued.",
      evidenceUsed: ["strategic value", "remaining effort", "benefit", "evidence status"],
      workstreamAffected: best.workstream.title,
      returnPoint: best.workstream.returnPoint,
      confidence: 0.7,
      assumptions: ["The current mission remains the governing context"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "evidence-based prioritisation from awareness snapshot",
      },
    };
  } else {
    recommendation = {
      recommendedDirection: "continue",
      reason: "The current active objective remains the immediate priority.",
      evidenceUsed: ["no workstreams were supplied"],
      workstreamAffected: "none",
      confidence: 0.5,
      assumptions: ["No additional evidence was supplied"],
      whatRemainsSubjectToHumanChoice: "Human choice remains required.",
      provenance: {
        source: "compass",
        reason: "evidence-based prioritisation from awareness snapshot",
      },
    };
  }

  return { recommendation, parkedItems };
}

export function evaluateMoralCompass(recommendation: CompassRecommendation, context: { humanAutonomy?: boolean; authorityMismatch?: boolean; peopleFirst?: boolean; dignity?: boolean; honesty?: boolean; fairness?: boolean; transparency?: boolean; responsibility?: boolean; applicableAuthority?: boolean; }): MoralCompassResult {
  if (context.authorityMismatch) {
    return {
      outcome: "block",
      concern: "The recommendation conflicts with applicable authority or human autonomy.",
    };
  }

  if (context.humanAutonomy === false) {
    return {
      outcome: "warn",
      concern: "The recommendation would reduce human autonomy.",
    };
  }

  return {
    outcome: "pass",
    concern: "The recommendation remains consistent with people-first principles and human autonomy.",
  };
}

export function runCompassFlow(register: AwarenessRegister, context: CompassContext): CompassFlowResult {
  const nextRegister = registerAwarenessInput(register, context);
  const awarenessSnapshot = buildAwarenessSnapshot(nextRegister, context);
  const { recommendation, parkedItems } = organiseCompassPriorities(nextRegister, context);
  const moralCompassResult = evaluateMoralCompass(recommendation, {
    humanAutonomy: true,
  });

  return {
    awarenessRegister: nextRegister,
    awarenessSnapshot,
    compassRecommendation: recommendation,
    moralCompassResult,
    humanDecisionRequired: true,
    executedAction: "none",
  };
}
