export const understandingDomains = [
  "people",
  "shifts",
  "equipment",
  "compliance",
  "training",
  "maintenance",
  "stock",
  "customers",
  "finance",
  "documents",
  "incidents",
  "reports",
  "knowledge",
  "observations",
] as const;

export type UnderstandingDomain =
  (typeof understandingDomains)[number];