/**
 * Annie's Opportunity Engine
 *
 * Annie continually asks herself:
 *
 * "Is there something helpful I can do now?"
 *
 * Opportunity is not a task list.
 * It is Annie recognising where she can reduce faff.
 */

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  reason: string;
  priority: "low" | "medium" | "high";
}

export function discoverOpportunities(): Opportunity[] {
  return [
    {
      id: "venue-profile",
      title: "Create Venue Profile",
      description:
        "I've learnt enough about your venue to prepare your first venue profile.",
      reason:
        "This will save time when setting up bookings, reports and future learning.",
      priority: "high",
    },

    {
      id: "allergen-matrix",
      title: "Prepare Allergen Matrix",
      description:
        "I've seen your menu and can prepare a first draft for the chef to review.",
      reason:
        "I'll only ask about the ingredients I'm genuinely unsure about.",
      priority: "high",
    },
  ];
}