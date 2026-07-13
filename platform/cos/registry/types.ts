export type CapabilityClassification =
  | "universal"
  | "universal+professional"
  | "professional"
  | "organisation"
  | "profession";

export type CapabilityStatus =
  | "planned"
  | "experimental"
  | "active";

export interface Capability {
  id: string;
  name: string;
  classification: CapabilityClassification;
  status: CapabilityStatus;
  description: string;
  inheritedBy: string[];
}