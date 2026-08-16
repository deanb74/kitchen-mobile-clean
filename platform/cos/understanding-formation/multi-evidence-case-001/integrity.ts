import { createHash } from "node:crypto";

import {
    validateBaselineOutput,
    validateCandidateOutput,
    type AccumulationBaselineRecord,
    type HeldOutAssessment,
    type ImmutableOutputCapture,
    type MultiEvidenceRuntimeFixture,
    type MultiEvidenceUnderstandingAccount,
} from "./contracts";

export type ComponentId = `C${
  | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08"
  | "09" | "10" | "11" | "12" | "13" | "14" | "15" | "16"
  | "17" | "18" | "19" | "20" | "21" | "22"}`;

export type AccessEventKind =
  | "input"
  | "invocation"
  | "control-transition"
  | "dependency"
  | "access"
  | "denied-access"
  | "capture"
  | "evaluator-invocation"
  | "assessment-handoff";

export interface AccessEvent {
  eventId: string;
  sequence: number;
  component: ComponentId;
  kind: AccessEventKind;
  subject: string;
}

export interface SealedAccessRecord {
  recordId: string;
  sealed: true;
  events: readonly Readonly<AccessEvent>[];
}

export interface ContemporaneousRecorder {
  readonly recordId: string;
  record(
    component: ComponentId,
    kind: AccessEventKind,
    subject: string,
  ): Readonly<AccessEvent>;
  latestEvent(): Readonly<AccessEvent> | undefined;
  seal(): SealedAccessRecord;
  isSealed(): boolean;
}

export function createContemporaneousRecorder(
  recordId = "C20:access-record",
): ContemporaneousRecorder {
  const events: AccessEvent[] = [];
  let sealed = false;

  return {
    recordId,
    record(component, kind, subject) {
      if (sealed) throw new Error("C20 record is sealed.");
      const sequence = events.length + 1;
      const event = {
        eventId: `${recordId}:event:${String(sequence).padStart(4, "0")}`,
        sequence,
        component,
        kind,
        subject,
      };
      events.push(event);
      return deepFreeze(deepClone(event));
    },
    latestEvent() {
      const event = events.at(-1);
      return event ? deepFreeze(deepClone(event)) : undefined;
    },
    seal() {
      if (sealed) throw new Error("C20 record is already sealed.");
      sealed = true;
      return deepFreeze({
        recordId,
        sealed: true as const,
        events: deepClone(events),
      });
    },
    isSealed() {
      return sealed;
    },
  };
}

export function createImmutableInputs(
  fixture: MultiEvidenceRuntimeFixture,
): {
  candidateInput: MultiEvidenceRuntimeFixture;
  baselineInput: MultiEvidenceRuntimeFixture;
} {
  return {
    candidateInput: deepFreeze(deepClone(fixture)),
    baselineInput: deepFreeze(deepClone(fixture)),
  };
}

export function structuralDigest(value: unknown): string {
  return createHash("sha256")
    .update(Buffer.from(canonicalSerialize(value), "utf8"))
    .digest("hex");
}

export function captureImmutableOutputs(
  candidate: MultiEvidenceUnderstandingAccount,
  baseline: AccumulationBaselineRecord,
): ImmutableOutputCapture {
  validateCandidateOutput(candidate);
  validateBaselineOutput(baseline);
  return deepFreeze({
    candidate: deepClone(candidate),
    baseline: deepClone(baseline),
  });
}

export function immutableHeldOutAssessment(
  assessment: HeldOutAssessment,
): HeldOutAssessment {
  return deepFreeze(deepClone(assessment));
}

function canonicalSerialize(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalSerialize).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map(
      (key) => `${JSON.stringify(key)}:${canonicalSerialize(record[key])}`,
    ).join(",")}}`;
  }
  return JSON.stringify(value);
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function deepFreeze<T>(value: T): T {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value as Record<string, unknown>)) {
    deepFreeze(child);
  }
  return value;
}