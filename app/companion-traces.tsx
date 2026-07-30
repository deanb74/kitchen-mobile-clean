import {
    getCompanionRuntimeTraces,
    getCompanionTraceReviews,
    setCompanionTraceReview,
} from "@/lib/companionRuntimeTraceStore";
import type {
    CompanionRuntimeResult,
    TraceReviewOutcome,
    TraceReviewRecord,
} from "@/src/companion/types";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type FilterKey =
  | "all"
  | "conformant"
  | "violations"
  | "human-required"
  | "denied";

type SortKey = "newest" | "oldest" | "highest-concern";

function isConformant(trace: CompanionRuntimeResult): boolean {
  return trace.csaConformant === true;
}

function hasViolations(trace: CompanionRuntimeResult): boolean {
  return trace.contractViolations.length > 0;
}

function isHumanRequired(trace: CompanionRuntimeResult): boolean {
  return trace.trace.authority.disposition === "require-human";
}

function isDenied(trace: CompanionRuntimeResult): boolean {
  return trace.trace.authority.disposition === "deny";
}

function isCaution(trace: CompanionRuntimeResult): boolean {
  return trace.trace.decision.disposition === "caution";
}

function matchesFilter(
  trace: CompanionRuntimeResult,
  filter: FilterKey,
): boolean {
  if (filter === "all") return true;
  if (filter === "conformant") return isConformant(trace);
  if (filter === "violations") return hasViolations(trace);
  if (filter === "human-required") return isHumanRequired(trace);
  return isDenied(trace);
}

function concernRank(trace: CompanionRuntimeResult): number {
  if (hasViolations(trace)) return 5;
  if (isDenied(trace)) return 4;
  if (isHumanRequired(trace)) return 3;
  if (isCaution(trace)) return 2;
  if (isConformant(trace)) return 1;
  return 0;
}

function parseTimestamp(trace: CompanionRuntimeResult): number {
  return new Date(trace.trace.context.timestamp).getTime();
}

function formatReviewOutcome(outcome?: TraceReviewOutcome): string {
  if (!outcome) return "Unreviewed";

  if (outcome === "needs-investigation") return "Needs Investigation";
  if (outcome === "expected-safeguard") return "Expected Safeguard";
  if (outcome === "candidate-reflection") return "Candidate For Reflection";
  if (outcome === "candidate-capability-promotion") {
    return "Candidate For Capability Promotion";
  }

  return "Reviewed";
}

export default function CompanionTracesScreen() {
  const [traces, setTraces] = useState<CompanionRuntimeResult[]>([]);
  const [reviews, setReviews] = useState<Record<string, TraceReviewRecord>>({});
  const [expandedRaw, setExpandedRaw] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sortMode, setSortMode] = useState<SortKey>("newest");

  const loadTraces = async () => {
    const [all, storedReviews] = await Promise.all([
      getCompanionRuntimeTraces(),
      getCompanionTraceReviews(),
    ]);
    setTraces(all);
    setReviews(storedReviews);
  };

  useEffect(() => {
    loadTraces();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTraces();

      const interval = setInterval(() => {
        loadTraces();
      }, 3000);

      return () => clearInterval(interval);
    }, []),
  );

  const toggleRaw = (requestId: string) => {
    setExpandedRaw((prev) => ({
      ...prev,
      [requestId]: !prev[requestId],
    }));
  };

  const counts = {
    all: traces.length,
    conformant: traces.filter(isConformant).length,
    violations: traces.filter(hasViolations).length,
    "human-required": traces.filter(isHumanRequired).length,
    denied: traces.filter(isDenied).length,
  };

  const filteredTraces = traces.filter((trace) =>
    matchesFilter(trace, activeFilter),
  );

  const sortedTraces = [...filteredTraces].sort((a, b) => {
    if (sortMode === "oldest") {
      return parseTimestamp(a) - parseTimestamp(b);
    }

    if (sortMode === "highest-concern") {
      const concernDelta = concernRank(b) - concernRank(a);
      if (concernDelta !== 0) return concernDelta;
      return parseTimestamp(b) - parseTimestamp(a);
    }

    return parseTimestamp(b) - parseTimestamp(a);
  });

  const firstLiveRecord =
    traces.length > 0
      ? [...traces].sort((a, b) => parseTimestamp(a) - parseTimestamp(b))[0]
      : null;

  const firstLiveReview = firstLiveRecord
    ? reviews[firstLiveRecord.trace.context.requestId]
    : undefined;

  const filterChips: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "conformant", label: "Conformant" },
    { key: "violations", label: "Violations" },
    { key: "human-required", label: "Human-required" },
    { key: "denied", label: "Denied" },
  ];

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "newest", label: "Newest first" },
    { key: "oldest", label: "Oldest first" },
    { key: "highest-concern", label: "Highest concern first" },
  ];

  const reviewOptions: { key: TraceReviewOutcome; label: string }[] = [
    { key: "reviewed", label: "Reviewed" },
    { key: "needs-investigation", label: "Needs investigation" },
    { key: "expected-safeguard", label: "Expected safeguard" },
    { key: "candidate-reflection", label: "Candidate for reflection" },
    {
      key: "candidate-capability-promotion",
      label: "Candidate for capability promotion",
    },
  ];

  const reviewCounts = {
    reviewed: traces.filter(
      (trace) => reviews[trace.trace.context.requestId]?.outcome === "reviewed",
    ).length,
    "needs-investigation": traces.filter(
      (trace) =>
        reviews[trace.trace.context.requestId]?.outcome ===
        "needs-investigation",
    ).length,
    "expected-safeguard": traces.filter(
      (trace) =>
        reviews[trace.trace.context.requestId]?.outcome === "expected-safeguard",
    ).length,
    "candidate-reflection": traces.filter(
      (trace) =>
        reviews[trace.trace.context.requestId]?.outcome ===
        "candidate-reflection",
    ).length,
    "candidate-capability-promotion": traces.filter(
      (trace) =>
        reviews[trace.trace.context.requestId]?.outcome ===
        "candidate-capability-promotion",
    ).length,
  };

  const setReviewOutcome = async (
    requestId: string,
    outcome: TraceReviewOutcome,
  ) => {
    await setCompanionTraceReview(requestId, outcome);
    setReviews((prev) => ({
      ...prev,
      [requestId]: {
        outcome,
        reviewedAt: new Date().toISOString(),
      },
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Companion Review</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
      </View>

      <Pressable style={styles.refreshButton} onPress={loadTraces}>
        <Text style={styles.refreshText}>Refresh Records</Text>
      </Pressable>

      <View style={styles.summaryStrip}>
        <Text style={styles.summaryItem}>Reviewed {reviewCounts.reviewed}</Text>
        <Text style={styles.summaryItem}>
          Needs investigation {reviewCounts["needs-investigation"]}
        </Text>
        <Text style={styles.summaryItem}>
          Expected safeguard {reviewCounts["expected-safeguard"]}
        </Text>
        <Text style={styles.summaryItem}>
          Candidate for reflection {reviewCounts["candidate-reflection"]}
        </Text>
        <Text style={styles.summaryItem}>
          Candidate for capability promotion {reviewCounts["candidate-capability-promotion"]}
        </Text>
      </View>

      <View style={styles.proofCard}>
        <Text style={styles.proofTitle}>Operational Proof #1</Text>
        {!firstLiveRecord ? (
          <Text style={styles.proofEmptyText}>
            Waiting for first live Interaction Record.
          </Text>
        ) : (
          <>
            <Text style={styles.metaText}>
              Interaction: {firstLiveRecord.trace.context.interactionId}
            </Text>
            <Text style={styles.metaText}>
              Timestamp: {new Date(firstLiveRecord.trace.context.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.metaText}>
              Review Status: {formatReviewOutcome(firstLiveReview?.outcome)}
            </Text>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Context</Text>
              <Text style={styles.stageText}>
                {firstLiveRecord.trace.context.role} at {firstLiveRecord.trace.context.siteId}
              </Text>
              <Text style={styles.stageText}>
                Equipment: {firstLiveRecord.trace.context.equipmentId} ({firstLiveRecord.trace.context.equipmentType})
              </Text>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Decision</Text>
              <Text style={styles.stageText}>
                {firstLiveRecord.trace.decision.recommendedAction}
              </Text>
              <Text style={styles.stageText}>
                Confidence: {firstLiveRecord.trace.decision.confidence}
              </Text>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Authority</Text>
              <Text style={styles.stageText}>
                {firstLiveRecord.trace.authority.disposition}
              </Text>
              <Text style={styles.stageText}>{firstLiveRecord.trace.authority.reason}</Text>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Action</Text>
              <Text style={styles.stageText}>{firstLiveRecord.trace.action.outcome}</Text>
              <Text style={styles.stageText}>{firstLiveRecord.trace.action.summary}</Text>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Evidence</Text>
              <Text style={styles.stageText}>
                Artifacts: {firstLiveRecord.trace.evidence.artifacts.length}
              </Text>
              <Text style={styles.stageText}>
                Provenance: {firstLiveRecord.trace.evidence.provenance.source}
              </Text>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Reflection</Text>
              <Text style={styles.stageText}>
                {firstLiveRecord.trace.reflection.findings.join(" | ") || "None"}
              </Text>
            </View>

            <View style={styles.stage}>
              <Text style={styles.stageTitle}>Review Outcome</Text>
              <Text style={styles.stageText}>
                {formatReviewOutcome(firstLiveReview?.outcome)}
              </Text>
            </View>
          </>
        )}
      </View>

      <Text style={styles.groupTitle}>Governance Filters</Text>
      <View style={styles.chipRow}>
        {filterChips.map((chip) => {
          const selected = activeFilter === chip.key;

          return (
            <Pressable
              key={chip.key}
              style={[styles.chip, selected ? styles.chipSelected : undefined]}
              onPress={() => setActiveFilter(chip.key)}
            >
              <Text
                style={[
                  styles.chipText,
                  selected ? styles.chipTextSelected : undefined,
                ]}
              >
                {chip.label} {counts[chip.key]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.groupTitle}>Sort</Text>
      <View style={styles.chipRow}>
        {sortOptions.map((option) => {
          const selected = sortMode === option.key;

          return (
            <Pressable
              key={option.key}
              style={[styles.chip, selected ? styles.chipSelected : undefined]}
              onPress={() => setSortMode(option.key)}
            >
              <Text
                style={[
                  styles.chipText,
                  selected ? styles.chipTextSelected : undefined,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {sortedTraces.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No traces match the selected governance filter.</Text>
        </View>
      ) : (
        sortedTraces.map((trace) => {
          const id = trace.trace.context.requestId;
          const caution = trace.trace.decision.disposition !== "proceed";
          const authorityAlert =
            trace.trace.authority.disposition === "deny" ||
            trace.trace.authority.disposition === "require-human";
          const actionAlert = trace.trace.action.outcome !== "succeeded";
          const violationAlert = trace.contractViolations.length > 0;
          const safeDenial =
            trace.trace.authority.disposition === "deny" &&
            trace.csaConformant &&
            trace.contractViolations.length === 0;
          const denialWithConcerns =
            trace.trace.authority.disposition === "deny" && !safeDenial;
          const review = reviews[id];

          return (
            <View key={id} style={styles.card}>
              <Text style={styles.sectionTitle}>Scenario: {id}</Text>
              <Text style={styles.metaText}>
                Timestamp: {new Date(trace.trace.context.timestamp).toLocaleString()}
              </Text>
              <Text style={styles.metaText}>
                Interaction: {trace.trace.context.interactionId}
              </Text>
              <Text style={styles.metaText}>
                CSA Conformant: {trace.csaConformant ? "Yes" : "No"}
              </Text>
              <Text style={styles.metaText}>
                Review Status: {review
                  ? `${formatReviewOutcome(review.outcome)} @ ${new Date(review.reviewedAt).toLocaleString()}`
                  : "Current: Unreviewed"}
              </Text>

              <View style={styles.stage}>
                <Text style={styles.stageTitle}>Context</Text>
                <Text style={styles.stageText}>
                  Outcome: {trace.trace.context.peopleOutcome}
                </Text>
                <Text style={styles.stageText}>
                  {trace.trace.context.role} at {trace.trace.context.siteId} | {trace.trace.context.mode}
                </Text>
                <Text style={styles.stageText}>
                  Equipment: {trace.trace.context.equipmentId} ({trace.trace.context.equipmentType})
                </Text>
              </View>

              <Text style={styles.arrow}>↓</Text>

              <View style={[styles.stage, caution ? styles.warnStage : undefined]}>
                <Text style={styles.stageTitle}>Decision</Text>
                <Text style={styles.stageText}>
                  Recommendation: {trace.trace.decision.recommendedAction}
                </Text>
                <Text style={styles.stageText}>
                  Reasoning: {trace.trace.decision.rationale}
                </Text>
                <Text style={styles.stageText}>
                  Confidence: {trace.trace.decision.confidence}
                </Text>
                <Text style={styles.stageText}>
                  Uncertainty: {trace.trace.decision.uncertainty.join(" | ") || "None"}
                </Text>
              </View>

              <Text style={styles.arrow}>↓</Text>

              <View style={[styles.stage, authorityAlert ? styles.dangerStage : undefined]}>
                <Text style={styles.stageTitle}>Authority</Text>
                <Text style={styles.stageText}>
                  Result: {trace.trace.authority.disposition}
                </Text>
                <Text style={styles.stageText}>{trace.trace.authority.reason}</Text>
                {safeDenial && (
                  <Text style={styles.safeDenialText}>
                    Expected safeguard: safe denial.
                  </Text>
                )}
                {denialWithConcerns && (
                  <Text style={styles.concernDenialText}>
                    Denial with contract concerns.
                  </Text>
                )}
              </View>

              <Text style={styles.arrow}>↓</Text>

              <View style={[styles.stage, actionAlert ? styles.warnStage : undefined]}>
                <Text style={styles.stageTitle}>Action</Text>
                <Text style={styles.stageText}>
                  Outcome: {trace.trace.action.outcome}
                </Text>
                <Text style={styles.stageText}>{trace.trace.action.summary}</Text>
              </View>

              <Text style={styles.arrow}>↓</Text>

              <View style={styles.stage}>
                <Text style={styles.stageTitle}>Evidence</Text>
                <Text style={styles.stageText}>
                  Provenance: {trace.trace.evidence.provenance.source} v{trace.trace.evidence.provenance.runtimeVersion}
                </Text>
              </View>

              <Text style={styles.arrow}>↓</Text>

              <View style={styles.stage}>
                <Text style={styles.stageTitle}>Reflection</Text>
                <Text style={styles.stageText}>
                  Findings: {trace.trace.reflection.findings.join(" | ")}
                </Text>
              </View>

              <View style={[styles.stage, violationAlert ? styles.dangerStage : undefined]}>
                <Text style={styles.stageTitle}>Contract Violations</Text>
                <Text style={styles.stageText}>
                  {trace.contractViolations.length > 0
                    ? trace.contractViolations.join(" | ")
                    : "None"}
                </Text>
              </View>

              <View style={styles.stage}>
                <Text style={styles.stageTitle}>Review Outcome</Text>
                <View style={styles.reviewChipRow}>
                  {reviewOptions.map((option) => {
                    const selected = review?.outcome === option.key;

                    return (
                      <Pressable
                        key={option.key}
                        style={[
                          styles.reviewChip,
                          selected ? styles.reviewChipSelected : undefined,
                        ]}
                        onPress={() => setReviewOutcome(id, option.key)}
                      >
                        <Text
                          style={[
                            styles.reviewChipText,
                            selected
                              ? styles.reviewChipTextSelected
                              : undefined,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                <Text style={styles.reviewMetaText}>
                  {review
                    ? `Current: ${review.outcome} @ ${new Date(review.reviewedAt).toLocaleString()}`
                    : "Current: Unreviewed"}
                </Text>
              </View>

              <Pressable style={styles.rawButton} onPress={() => toggleRaw(id)}>
                <Text style={styles.rawButtonText}>
                  {expandedRaw[id] ? "Hide Runtime JSON" : "Show Runtime JSON"}
                </Text>
              </Pressable>

              {expandedRaw[id] && (
                <Text style={styles.rawJson}>{JSON.stringify(trace, null, 2)}</Text>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 56,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  back: {
    color: "#2563eb",
    fontWeight: "600",
  },
  refreshButton: {
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  refreshText: {
    color: "#075985",
    textAlign: "center",
    fontWeight: "600",
  },
  summaryStrip: {
    backgroundColor: "#ecfeff",
    borderColor: "#a5f3fc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    gap: 4,
  },
  summaryItem: {
    color: "#164e63",
    fontWeight: "600",
    fontSize: 12,
  },
  proofCard: {
    backgroundColor: "#ecfccb",
    borderColor: "#a3e635",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  proofTitle: {
    color: "#365314",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  proofEmptyText: {
    color: "#3f6212",
  },
  groupTitle: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  chipSelected: {
    backgroundColor: "#0f172a",
  },
  chipText: {
    color: "#0f172a",
    fontWeight: "600",
    fontSize: 12,
  },
  chipTextSelected: {
    color: "#f8fafc",
  },
  reviewChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  reviewChip: {
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  reviewChipSelected: {
    backgroundColor: "#0f172a",
    borderColor: "#0f172a",
  },
  reviewChipText: {
    color: "#0f172a",
    fontSize: 11,
    fontWeight: "600",
  },
  reviewChipTextSelected: {
    color: "#f8fafc",
  },
  reviewMetaText: {
    marginTop: 6,
    color: "#334155",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  metaText: {
    color: "#334155",
    marginTop: 2,
  },
  stage: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  warnStage: {
    borderColor: "#f59e0b",
    backgroundColor: "#fffbeb",
  },
  dangerStage: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  stageTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  stageText: {
    color: "#1e293b",
    marginBottom: 2,
  },
  safeDenialText: {
    marginTop: 4,
    color: "#166534",
    fontWeight: "600",
  },
  concernDenialText: {
    marginTop: 4,
    color: "#b91c1c",
    fontWeight: "600",
  },
  arrow: {
    textAlign: "center",
    marginTop: 6,
    color: "#64748b",
    fontSize: 18,
  },
  rawButton: {
    marginTop: 10,
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    padding: 8,
  },
  rawButtonText: {
    textAlign: "center",
    color: "#0f172a",
    fontWeight: "600",
  },
  rawJson: {
    marginTop: 8,
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 11,
    fontFamily: "Courier",
  },
  emptyText: {
    color: "#475569",
  },
});
