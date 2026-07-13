export * from "./types";
export * from "./capabilities";

import { capabilities } from "./capabilities";

export function getCapability(id: string) {
  return capabilities.find(capability => capability.id === id);
}

export function getCapabilities() {
  return capabilities;
}