import type { VenueDiscoveryPrompt } from "./venueDiscoveryEngine";

export interface UnderstandingContext {
  prompts: VenueDiscoveryPrompt[];

  completedPromptIds?: string[];

  busy?: boolean;

  currentTopic?: string;
}

export interface UnderstandingDecision {
  nextPrompt?: VenueDiscoveryPrompt;

  remainingPrompts: VenueDiscoveryPrompt[];
}

export const chooseNextUnderstanding = (
  context: UnderstandingContext,
): UnderstandingDecision => {
  const completed = new Set(context.completedPromptIds ?? []);

  const available = context.prompts.filter(
    (prompt) => !completed.has(prompt.id),
  );

  const ordered = [...available].sort((a, b) => {
    const priorityScore = (priority: "now" | "soon" | "later") =>
      priority === "now"
        ? 0
        : priority === "soon"
          ? 1
          : 2;

    return priorityScore(a.priority) - priorityScore(b.priority);
  });

  return {
    nextPrompt: ordered[0],
    remainingPrompts: ordered.slice(1),
  };
};