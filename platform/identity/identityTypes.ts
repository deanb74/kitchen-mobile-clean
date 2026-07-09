/**
 * Helping Hand Identity
 *
 * Identity defines who exists in the platform
 * and where they belong.
 */

import type { IndustryId } from "../industry";

export type PlatformRole =
  | "owner"
  | "manager"
  | "staff"
  | "digital-colleague";

export interface PlatformUser {
  id: string;
  name: string;
  role: PlatformRole;
}

export interface Organisation {
  id: string;
  name: string;
}

export interface Venue {
  id: string;
  organisationId?: string;
  name: string;
  industry: IndustryId;
}

export interface DigitalColleague {
  id: string;
  name: string;
  industry: IndustryId;
  assignedVenueId?: string;
}