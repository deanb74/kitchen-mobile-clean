import { askAnnieWithCompanionRoot } from "./useCompanionLoop";

export const companionSignalsDemo = {
  empty: askAnnieWithCompanionRoot(""),
  memory: askAnnieWithCompanionRoot("Do you remember last time?"),
  observation: askAnnieWithCompanionRoot("Can you look at this?"),
  clarification: askAnnieWithCompanionRoot("Stuff"),
  research: askAnnieWithCompanionRoot("Can you help me understand GP?"),
};