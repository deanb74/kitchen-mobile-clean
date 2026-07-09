import type { PlatformUser, Venue, DigitalColleague } from "../identity";

export interface CompanionContext {
  user: PlatformUser;
  venue?: Venue;
  digitalColleague: DigitalColleague;
  stimulus: string;
}