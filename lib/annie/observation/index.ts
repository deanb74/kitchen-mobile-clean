import {
  beginObservationSession,
  type ObservationSession,
} from "../../../platform/cos/observation";

import { hospitalityCuriosityRules } from "./curiosity";
import { observe } from "./observe";

export type {
  Observation,
  ObservationQuestion,
  ObservationSession
} from "../../../platform/cos/observation";

/**
 * Annie's Observation Pipeline
 *
 * Every visual observation begins here.
 *
 * Observe
 * ↓
 * Curiosity
 * ↓
 * Think
 * ↓
 * Understand
 * ↓
 * Remember
 * ↓
 * Offer Help
 * Annie provides:
 * - hospitality observations
 * - hospitality curiosity rules
 *
 * COS provides:
 * - the universal observation session
 * - the curiosity mechanism
 *
 * Observe
 * ↓
 * Curiosity
 * ↓
 * Think
 * ↓
 * Understand
 * ↓
 * Remember
 * ↓
 * Offer Help
 */

export function beginObservation(): ObservationSession {
  return beginObservationSession(
    observe(),
    hospitalityCuriosityRules
  );
}