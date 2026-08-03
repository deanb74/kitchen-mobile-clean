export interface GovernedPrototypeInput {
  fullInputContext: Record<string, unknown>;
  routeDecision: {
    next: "observe" | "translate" | "reflect" | "conversation" | "demonstrate" | "instruct" | "complete";
    reason: string;
  };
  behaviourIntent: string;
  visibleAction: string;
  renderedPresentation?: string;
}

export interface GovernedPrototypeResult {
  route: "observe" | "translate" | "reflect" | "conversation" | "demonstrate" | "instruct" | "complete";
  reason: string;
  behaviourIntent: string;
  visibleAction: string;
  renderedPresentation: string;
  visualLayerDecision: string;
}

export function buildGovernedPrototype(
  input: GovernedPrototypeInput
): GovernedPrototypeResult {
  return {
    route: input.routeDecision.next,
    reason: input.routeDecision.reason,
    behaviourIntent: input.behaviourIntent,
    visibleAction: input.visibleAction,
    renderedPresentation:
      input.renderedPresentation ??
      "Rendered presentation is derived from the CI-selected behaviour intent and visible action; it is not an independent judgement.",
    visualLayerDecision:
      "The visual layer did not decide; Companion Intelligence selected the route and the behaviour instruction.",
  };
}
