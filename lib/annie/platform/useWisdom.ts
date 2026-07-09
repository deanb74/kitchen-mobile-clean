import { chooseWisdomSource } from "../wisdom";

export function askAnnieWisdom() {
  return chooseWisdomSource(
    0.6,   // confidence
    false, // hasObservation
    false  // hasMemory
  );
}