import { beginObservation } from "../observation";
import { discoverOpportunitiesFromObservation } from "../opportunityFromObservation";
import { createInitialTablePlan } from "../work/tablePlan";

export function runAnnieFirstWorkingDay() {
  const observationSession = beginObservation();

  const opportunities =
    discoverOpportunitiesFromObservation(observationSession);

  const tablePlanOpportunity = opportunities.find(
    (item) => item.id === "table-plan"
  );

  const tablePlan = tablePlanOpportunity
    ? createInitialTablePlan()
    : null;

  return {
    greeting: "Good morning. Would you show me your world?",
    observations: observationSession.observations,
    questions: observationSession.questions,
    opportunities,
    completedWork: {
      tablePlan,
    },
    closing:
      "Thank you for showing me around. I understand a little more than I did this morning.",
  };
}