import {
  chooseNextUnderstanding,
  createVenueDiscoveryObservation,
  exerciseJudgement,
  runVenueDiscovery,
  type JudgementContext,
  type JudgementResult,
  type VenueDiscoveryDimension,
  type VenueDiscoveryObservation,
  type VenueDiscoveryObservationStatus,
  type VenueDiscoveryPrompt,
} from "../os/context";

import {
  speakJudgement,
  type ConversationContext,
  type SpokenResponse,
} from "../annie/conversation/speak";


import {
  ContextStore,
  type ContextCategory,
  type ContextEntry,
} from "./contextStore";

import {
  MissingCogQueue,
  type MissingCogPriority,
} from "./missingCogQueue";

import { onboardingPrompts } from "./onboardingPrompts";
import { OnboardingStage, type OnboardingState } from "./onboardingTypes";

const onboardingStages: OnboardingStage[] = [
  OnboardingStage.Welcome,
  OnboardingStage.CurrentChallenge,
  OnboardingStage.FutureGoal,
  OnboardingStage.Business,
  OnboardingStage.Venue,
  OnboardingStage.Team,
  OnboardingStage.Systems,
  OnboardingStage.Ready,
  OnboardingStage.Complete,
];

type OnboardingObservationSource =
  | "walkaround"
  | "conversation"
  | "setup-wizard"
  | "manager";

export interface OnboardingObservationInput {
  dimension: VenueDiscoveryDimension;
  value: string;
  status?: VenueDiscoveryObservationStatus;
  source: OnboardingObservationSource;
  observedAt?: string;
}

export interface OnboardingObservationResult {
  observation: VenueDiscoveryObservation;
  contextEntry: ContextEntry;
  discoveredPrompts: VenueDiscoveryPrompt[];
  judgement: JudgementResult;
  spokenResponse: SpokenResponse;
}

const mapDiscoveryPriority = (
  priority: VenueDiscoveryPrompt["priority"],
): MissingCogPriority => {
  const priorityMap: Record<
    VenueDiscoveryPrompt["priority"],
    MissingCogPriority
  > = {
    now: "high",
    soon: "medium",
    later: "low",
  };

  return priorityMap[priority];
};

const mapDimensionToContextCategory = (
  dimension: VenueDiscoveryDimension,
): ContextCategory => {
  const categoryMap: Record<VenueDiscoveryDimension, ContextCategory> = {
    "venue-type": "venue",
    "operating-model": "business",
    capability: "business",
    department: "team",
    area: "venue",
    equipment: "systems",
  };

  return categoryMap[dimension];
};

const mapObservationSourceToContextSource = (
  source: OnboardingObservationSource,
): ContextEntry["source"] => {
  const sourceMap: Record<
    OnboardingObservationSource,
    ContextEntry["source"]
  > = {
    walkaround: "manual",
    conversation: "conversation",
    "setup-wizard": "system",
    manager: "manual",
  };

  return sourceMap[source];
};

export class OnboardingEngine {
  private state: OnboardingState;
  private contextStore: ContextStore;
  private missingCogQueue: MissingCogQueue;

  private observations: VenueDiscoveryObservation[] = [];
  private discoveryPrompts: VenueDiscoveryPrompt[] = [];

  constructor() {
    const now = new Date().toISOString();

    this.state = {
      stage: OnboardingStage.Welcome,
      completed: false,
      startedAt: now,
      updatedAt: now,
    };

    this.contextStore = new ContextStore();
    this.missingCogQueue = new MissingCogQueue();
  }

  getState() {
    return this.state;
  }

  getCurrentPrompt() {
    if (this.state.stage === OnboardingStage.Welcome) {
      return onboardingPrompts.welcome;
    }

    return null;
  }

  getContextStore() {
    return this.contextStore;
  }

  getMissingCogQueue() {
    return this.missingCogQueue;
  }

  getObservations() {
    return this.observations;
  }

  getDiscoveryPrompts() {
    return this.discoveryPrompts;
  }

  processObservation(
    input: OnboardingObservationInput,
    judgementContext: Omit<JudgementContext, "prompt"> = {},
    conversationContext: ConversationContext = {},
  ): OnboardingObservationResult {
    const observation = createVenueDiscoveryObservation({
      dimension: input.dimension,
      value: input.value,
      status: input.status ?? "observed",
      source: input.source,
      observedAt: input.observedAt ?? new Date().toISOString(),
    });

    this.storeObservation(observation);

    const contextEntry = this.storeObservationAsContext(observation);

    const discoveryResult = runVenueDiscovery(this.observations);

    this.mergeDiscoveryPrompts(discoveryResult.prompts);
    this.addDiscoveryPromptsToMissingCogQueue(discoveryResult.prompts);

    const judgement = this.getNextOnboardingJudgement(judgementContext);
    const spokenResponse = speakJudgement(judgement, conversationContext);

    this.state = {
      ...this.state,
      updatedAt: new Date().toISOString(),
    };

    return {
      observation,
      contextEntry,
      discoveredPrompts: discoveryResult.prompts,
      judgement,
      spokenResponse,
    };
  }

  getNextOnboardingJudgement(
    judgementContext: Omit<JudgementContext, "prompt"> = {},
  ): JudgementResult {
    const completedPromptIds = this.missingCogQueue
      .getCogs()
      .filter(
        (cog) =>
          cog.status === "answered" || cog.status === "dismissed",
      )
      .map((cog) => cog.key);

    const understanding = chooseNextUnderstanding({
      prompts: this.discoveryPrompts,
      completedPromptIds,
    });

    return exerciseJudgement({
      ...judgementContext,
      prompt: understanding.nextPrompt,
    });
  }

  answerCog(id: string) {
    return this.missingCogQueue.answerCog(id);
  }

  dismissCog(id: string) {
    return this.missingCogQueue.dismissCog(id);
  }

  next() {
    const currentIndex = onboardingStages.indexOf(this.state.stage);
    const nextStage = onboardingStages[currentIndex + 1];

    if (!nextStage) {
      return this.state;
    }

    this.state = {
      ...this.state,
      stage: nextStage,
      completed: nextStage === OnboardingStage.Complete,
      updatedAt: new Date().toISOString(),
    };

    return this.state;
  }

  previous() {
    const currentIndex = onboardingStages.indexOf(this.state.stage);
    const previousStage = onboardingStages[currentIndex - 1];

    if (!previousStage) {
      return this.state;
    }

    this.state = {
      ...this.state,
      stage: previousStage,
      completed: false,
      updatedAt: new Date().toISOString(),
    };

    return this.state;
  }

  reset() {
    const now = new Date().toISOString();

    this.state = {
      stage: OnboardingStage.Welcome,
      completed: false,
      startedAt: now,
      updatedAt: now,
    };

    this.contextStore = new ContextStore();
    this.missingCogQueue = new MissingCogQueue();
    this.observations = [];
    this.discoveryPrompts = [];

    return this.state;
  }

  private storeObservation(observation: VenueDiscoveryObservation) {
    const existingIndex = this.observations.findIndex(
      (item) => item.id === observation.id,
    );

    if (existingIndex >= 0) {
      this.observations[existingIndex] = observation;
      return;
    }

    this.observations.push(observation);
  }

  private storeObservationAsContext(
    observation: VenueDiscoveryObservation,
  ): ContextEntry {
    const key = `discovery:${observation.id}`;
    const existingEntry = this.contextStore.findByKey(key);

    if (existingEntry) {
      return (
        this.contextStore.updateEntry(
          existingEntry.id,
          observation.value,
        ) ?? existingEntry
      );
    }

    return this.contextStore.addEntry({
      category: mapDimensionToContextCategory(
        observation.dimension,
      ),
      key,
      value: observation.value,
      source: mapObservationSourceToContextSource(
        observation.source,
      ),
    });
  }

  private mergeDiscoveryPrompts(
    prompts: VenueDiscoveryPrompt[],
  ) {
    const merged = new Map(
      this.discoveryPrompts.map((prompt) => [
        prompt.id,
        prompt,
      ]),
    );

    for (const prompt of prompts) {
      merged.set(prompt.id, prompt);
    }

    this.discoveryPrompts = Array.from(merged.values());
  }

  private addDiscoveryPromptsToMissingCogQueue(
    prompts: VenueDiscoveryPrompt[],
  ) {
    for (const prompt of prompts) {
      this.missingCogQueue.addCog({
        key: prompt.id,
        question: prompt.prompt,
        reason: `Triggered by ${prompt.triggeredBy.dimension}: ${prompt.triggeredBy.value}`,
        priority: mapDiscoveryPriority(prompt.priority),
      });
    }
  }
}