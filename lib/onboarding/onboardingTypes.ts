export enum OnboardingStage {
  Welcome = "welcome",
  CurrentChallenge = "current_challenge",
  FutureGoal = "future_goal",
  Business = "business",
  Venue = "venue",
  Team = "team",
  Systems = "systems",
  Ready = "ready",
  Complete = "complete",
}

export interface OnboardingState {
  stage: OnboardingStage;
  completed: boolean;
  startedAt: string;
  updatedAt: string;
}