import { OnboardingEngine } from "./onboardingEngine";

export function runOnboardingEngineDemo() {
  const engine = new OnboardingEngine();

  console.log("Initial state:", engine.getState());
  console.log("Welcome prompt:", engine.getCurrentPrompt());

  engine.next();
  console.log("After next:", engine.getState());

  engine.next();
  console.log("After next again:", engine.getState());

  return engine.getState();
}