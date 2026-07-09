import { AnnieFirstDayChecklist } from "./checklist";
import { AnnieLifecycle } from "./lifecycle";

export const AnnieFirstDay = {
  title: "Annie's First Day",
  description:
    "Annie is not installed. Annie is welcomed, inducted, and begins work as a Digital Colleague.",
  lifecycle: AnnieLifecycle,
  checklist: AnnieFirstDayChecklist,
} as const;

export * from "./workingDay";
