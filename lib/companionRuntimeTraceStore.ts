import type {
    CompanionRuntimeResult,
    TraceReviewOutcome,
    TraceReviewRecord,
} from "@/src/companion/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TRACE_KEY = "companionRuntimeTraces";
const TRACE_REVIEW_KEY = "companionRuntimeTraceReviews";
const MAX_TRACES = 50;

export async function appendCompanionRuntimeTrace(
  trace: CompanionRuntimeResult,
): Promise<void> {
  const traces = await getCompanionRuntimeTraces();
  traces.unshift(trace);

  if (traces.length > MAX_TRACES) {
    traces.length = MAX_TRACES;
  }

  await AsyncStorage.setItem(TRACE_KEY, JSON.stringify(traces));
}

export async function getCompanionRuntimeTraces(): Promise<CompanionRuntimeResult[]> {
  const raw = await AsyncStorage.getItem(TRACE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as CompanionRuntimeResult[];
  } catch {
    return [];
  }
}

export async function getCompanionTraceReviews(): Promise<
  Record<string, TraceReviewRecord>
> {
  const raw = await AsyncStorage.getItem(TRACE_REVIEW_KEY);

  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, TraceReviewRecord>;
  } catch {
    return {};
  }
}

export async function setCompanionTraceReview(
  requestId: string,
  outcome: TraceReviewOutcome,
): Promise<void> {
  const reviews = await getCompanionTraceReviews();

  reviews[requestId] = {
    outcome,
    reviewedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(TRACE_REVIEW_KEY, JSON.stringify(reviews));
}
