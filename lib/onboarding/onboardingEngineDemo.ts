import { OnboardingEngine } from "./onboardingEngine";

export function runOnboardingEngineDemo() {
  const engine = new OnboardingEngine();

  console.log("==================================");
  console.log("ANNIE ARRIVES AT A NEW VENUE");
  console.log("==================================");

  console.log("\nWelcome");
  console.log(engine.getCurrentPrompt());

  console.log("\nAnnie notices a cellar...");

  const result = engine.processObservation(
    {
      dimension: "area",
      value: "cellar",
      source: "walkaround",
    },
    {
      situationIntensity: "calm",
      personAvailable: true,
    },
    {
      personName: "Dean",
      relationship: "new",
      role: "manager",
    },
  );

  console.log("\nObservation");
  console.log(result.observation);

  console.log("\nContext");
  console.log(engine.getContextStore().getEntries());

  console.log("\nDiscovery prompts");
  console.log(result.discoveredPrompts);

  console.log("\nMissing understanding");
  console.log(engine.getMissingCogQueue().getOpenCogs());

  console.log("\nJudgement");
  console.log(result.judgement);

  console.log("\nAnnie says");
  console.log(result.spokenResponse);

  return result;
}