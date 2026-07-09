import { ContextStore } from "./contextStore";
import { MissingCogQueue } from "./missingCogQueue";
import { onboardingPrompts } from "./onboardingPrompts";
import { OnboardingStage, OnboardingState } from "./onboardingTypes";

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

export class OnboardingEngine {
  private state: OnboardingState;
  private contextStore: ContextStore;
  private missingCogQueue: MissingCogQueue;

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

    return this.state;
  }
}