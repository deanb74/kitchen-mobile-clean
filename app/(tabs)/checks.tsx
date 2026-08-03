import { appendCompanionRuntimeTrace } from "@/lib/companionRuntimeTraceStore";
import { cleaningAdapter } from "@/src/companion/adapters/CleaningAdapter";
import { closingChecksAdapter } from "@/src/companion/adapters/ClosingChecksAdapter";
import { openingChecksAdapter } from "@/src/companion/adapters/OpeningChecksAdapter";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { API_BASE_URL } from "../../lib/api";
import { getStoredItem } from "../../lib/storage";

const API = API_BASE_URL;

export default function ChecksScreen() {
  const [openingChecks, setOpeningChecks] = useState<any[]>([]);
  const [closingChecks, setClosingChecks] = useState<any[]>([]);
  const [selectedCheck, setSelectedCheck] = useState<any>(null);
  const [note, setNote] = useState("");

  const normalizeStoredValue = (value: string | null): string | null => {
    if (value == null) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;

      const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);

      if (typeof globalThis.atob !== "function") return null;

      const decoded = globalThis.atob(padded);
      return JSON.parse(decoded) as Record<string, unknown>;
    } catch {
      return null;
    }
  };

  const resolveIdentityFromToken = async () => {
    const token = normalizeStoredValue(await getStoredItem("token"));
    if (!token) return null;

    const payload = decodeJwtPayload(token);
    if (!payload) return null;

    const payloadUser =
      payload.user && typeof payload.user === "object"
        ? (payload.user as Record<string, unknown>)
        : null;
    const payloadSite =
      payload.site && typeof payload.site === "object"
        ? (payload.site as Record<string, unknown>)
        : null;

    const userIdCandidate =
      payload.userId ?? payload.id ?? payload.sub ?? payloadUser?.id;
    const roleCandidate = payload.role;
    const siteIdCandidate = payload.siteId ?? payloadSite?.id;

    return {
      userId:
        userIdCandidate != null
          ? String(userIdCandidate)
          : null,
      role: roleCandidate != null ? String(roleCandidate) : null,
      siteId: siteIdCandidate != null ? String(siteIdCandidate) : null,
    };
  };

  const resolveActorContext = async () => {
    const tokenIdentity = await resolveIdentityFromToken();

    const [userId, actorId, id, role, siteId, shiftId] = await Promise.all([
      getStoredItem("userId"),
      getStoredItem("actorId"),
      getStoredItem("id"),
      getStoredItem("role"),
      getStoredItem("siteId"),
      getStoredItem("shiftId"),
    ]);

    return {
      userId:
        normalizeStoredValue(userId) ||
        normalizeStoredValue(actorId) ||
        normalizeStoredValue(id) ||
        normalizeStoredValue(tokenIdentity?.userId ?? null) ||
        "unknown-user",
      role:
        normalizeStoredValue(role) ||
        normalizeStoredValue(tokenIdentity?.role ?? null) ||
        "staff",
      siteId:
        normalizeStoredValue(siteId) ||
        normalizeStoredValue(tokenIdentity?.siteId ?? null) ||
        "unknown-site",
      shiftId: normalizeStoredValue(shiftId) || undefined,
      networkAvailable: true,
    };
  };

  const setCheckSavingState = (taskId: number) => {
    const completedAt = new Date().toISOString();

    setOpeningChecks((items) =>
      items.map((item) =>
        item.id === taskId
          ? { ...item, completed: true, completedByEmail: "Saving...", completedAt }
          : item,
      ),
    );

    setClosingChecks((items) =>
      items.map((item) =>
        item.id === taskId
          ? { ...item, completed: true, completedByEmail: "Saving...", completedAt }
          : item,
      ),
    );
  };

  const saveCheckCompletion = async (taskId: number, noteText?: string) => {
    const token = await getStoredItem("token");

    if (!token || token.trim().length === 0) {
      throw new Error("Missing auth token");
    }

    const headers = { Authorization: `Bearer ${token}` };

    await axios.post(
      `${API}/tasks/${taskId}/complete`,
      {
        note: noteText,
      },
      { headers },
    );
  };

  const loadChecks = async () => {
    try {
      const token = await getStoredItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [openingRes, closingRes] = await Promise.all([
        axios.get(`${API}/checks?type=opening&department=front_of_house`, { headers }),
        axios.get(`${API}/checks?type=closing&department=front_of_house`, { headers }),
      ]);

      setOpeningChecks(openingRes.data.checks || []);
      setClosingChecks(closingRes.data.checks || []);
    } catch (err: any) {
      console.log("LOAD CHECKS ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not load checks");
    }
  };

  const completeCheck = async (
    taskId: number,
    noteText?: string
  ) => {
    try {
      setCheckSavingState(taskId);
      await saveCheckCompletion(taskId, noteText);
      await loadChecks();
    } catch (err: any) {
      console.log("COMPLETE CHECK ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not complete check");
    }
  };

  const completeCleaningCheck = async (check: any, noteText?: string) => {
    try {
      setCheckSavingState(check.id);

      const actorContext = await resolveActorContext();
      const findings = noteText?.trim() ? [noteText.trim()] : [];

      const result = await cleaningAdapter.submit({
        actorContext,
        area: String(check?.area?.name || check?.department || "front_of_house"),
        checklistId: String(check.id),
        completed: true,
        findings,
        executeExistingSave: async () => {
          await saveCheckCompletion(check.id, noteText);

          return {
            attempted: true,
            outcome: "succeeded" as const,
            summary: `Cleaning completion recorded for task ${check.id}.`,
            sideEffects:
              findings.length > 0
                ? ["follow-up-review-required"]
                : ["cleaning-completion-recorded"],
          };
        },
      });

      await appendCompanionRuntimeTrace(result.runtimeResult);

      const runtimeTimestamp = result.runtimeResult.trace.context.timestamp;
      const actionCompletedAt =
        result.runtimeResult.trace.action.completedAt ||
        result.runtimeResult.trace.action.createdAt;

      Alert.alert(
        "Cleaning completion recorded",
        `Task ${check.id} at site ${actorContext.siteId} completed.\nInteraction ${result.interactionId}.\nRuntime timestamp ${runtimeTimestamp}.\nAction completed ${actionCompletedAt}.\nRisk ${result.decisionSnapshot.risk}.`,
      );

      await loadChecks();
    } catch (err: any) {
      console.log("COMPLETE CLEANING CHECK ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not complete cleaning check");
    }
  };

  const completeOpeningCheckEvent = async (check: any, noteText?: string) => {
    try {
      setCheckSavingState(check.id);

      const actorContext = await resolveActorContext();
      const startedAt =
        check?.createdAt ||
        check?.startedAt ||
        new Date().toISOString();

      const result = await openingChecksAdapter.submit({
        actorContext,
        checklistId: String(check.id),
        completed: true,
        startedAt,
        completedAt: new Date().toISOString(),
        executeExistingSave: async () => {
          await saveCheckCompletion(check.id, noteText);

          return {
            attempted: true,
            outcome: "succeeded" as const,
            summary: `Opening checks completion recorded for task ${check.id}.`,
            sideEffects: ["opening-checks-completion-recorded"],
          };
        },
      });

      await appendCompanionRuntimeTrace(result.runtimeResult);

      const runtimeTimestamp = result.interactionRecord.context.timestamp;
      const actionCompletedAt =
        result.interactionRecord.action.completedAt ||
        result.interactionRecord.action.createdAt;

      Alert.alert(
        "Opening checks event recorded",
        `Task ${check.id} at site ${actorContext.siteId} completed.\nInteraction ${result.interactionId}.\nRuntime timestamp ${runtimeTimestamp}.\nAction completed ${actionCompletedAt}.\nRisk ${result.decisionSnapshot.risk}.`,
      );

      await loadChecks();
    } catch (err: any) {
      console.log("COMPLETE OPENING CHECK EVENT ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not complete opening checks event");
    }
  };

  const completeClosingCheckEvent = async (check: any, noteText?: string) => {
    try {
      setCheckSavingState(check.id);

      const actorContext = await resolveActorContext();
      const unresolvedItems = noteText?.trim() ? [noteText.trim()] : [];

      const result = await closingChecksAdapter.submit({
        actorContext,
        checklistId: String(check.id),
        completed: true,
        unresolvedItems,
        executeExistingSave: async () => {
          await saveCheckCompletion(check.id, noteText);

          return {
            attempted: true,
            outcome: "succeeded" as const,
            summary: `Closing checks completion recorded for task ${check.id}.`,
            sideEffects:
              unresolvedItems.length > 0
                ? ["closing-follow-up-required"]
                : ["closing-checks-completion-recorded"],
          };
        },
      });

      await appendCompanionRuntimeTrace(result.runtimeResult);

      const runtimeTimestamp = result.runtimeResult.trace.context.timestamp;
      const actionCompletedAt =
        result.runtimeResult.trace.action.completedAt ||
        result.runtimeResult.trace.action.createdAt;

      Alert.alert(
        "Closing checks event recorded",
        `Task ${check.id} at site ${actorContext.siteId} completed.\nInteraction ${result.interactionId}.\nRuntime timestamp ${runtimeTimestamp}.\nAction completed ${actionCompletedAt}.\nRisk ${result.decisionSnapshot.risk}.`,
      );

      await loadChecks();
    } catch (err: any) {
      console.log("COMPLETE CLOSING CHECK EVENT ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not complete closing checks event");
    }
  };

  useEffect(() => {
    loadChecks();
  }, []);

  const openingCompleted = openingChecks.filter((item) => item.completed).length;
  const closingCompleted = closingChecks.filter((item) => item.completed).length;
  const isSelectedOpeningCheck =
    !!selectedCheck &&
    openingChecks.some((item) => item.id === selectedCheck.id);
  const isSelectedClosingCheck =
    !!selectedCheck &&
    closingChecks.some((item) => item.id === selectedCheck.id);

  const getRagStyle = (completed: number, total: number) => {
    if (total === 0) return styles.ragRed;
    const percent = completed / total;
    if (percent >= 1) return styles.ragGreen;
    if (percent >= 0.5) return styles.ragAmber;
    return styles.ragRed;
  };

  const getProgressPercent = (completed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const getProgressFillStyle = (completed: number, total: number) => {
    const percent = getProgressPercent(completed, total);
    if (percent >= 100) return styles.progressGreen;
    if (percent >= 50) return styles.progressAmber;
    return styles.progressRed;
  };

  const renderCheck = (item: any) => (
    <Pressable
      key={item.id}
      style={[styles.card, item.completed && styles.completedCard]}
      disabled={item.completed}
      onPress={() => {
        if (item.completed) return;
        setSelectedCheck(item);
        setNote("");
      }}
    >
      <Text style={styles.cardText}>
        {item.completed ? "✅ " : "⬜ "} {item.name}
      </Text>

      {item.completed ? (
        <Text style={styles.metaText}>
          Completed by {item.completedByEmail || "Unknown"} at{" "}
          {item.completedAt ? new Date(item.completedAt).toLocaleString() : "Unknown time"}
        </Text>
      ) : null}

      {item.complianceRecords?.[0]?.notes ? (
        <Text style={styles.metaText}>
          Note: {item.complianceRecords[0].notes}
        </Text>
      ) : null}

      {item.complianceRecords?.[0]?.value ? (
        <View
          style={[
            styles.riskBadge,
            item.complianceRecords[0].value === "red"
              ? styles.riskBadgeRed
              : item.complianceRecords[0].value === "amber"
              ? styles.riskBadgeAmber
              : styles.riskBadgeGreen,
          ]}
        >
          <Text style={styles.riskBadgeText}>
            {item.complianceRecords[0].value.toUpperCase()} RISK
          </Text>
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Checks</Text>

      <View
        style={[
          styles.summaryCard,
          getRagStyle(
            openingCompleted + closingCompleted,
            openingChecks.length + closingChecks.length
          ),
        ]}
      >
        <Text style={styles.summaryText}>
          FoH Opening: {openingCompleted} / {openingChecks.length} complete
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              getProgressFillStyle(openingCompleted, openingChecks.length),
              { width: `${getProgressPercent(openingCompleted, openingChecks.length)}%` },
            ]}
          />
        </View>

        <Text style={styles.summaryText}>
          FoH Closing: {closingCompleted} / {closingChecks.length} complete
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              getProgressFillStyle(closingCompleted, closingChecks.length),
              { width: `${getProgressPercent(closingCompleted, closingChecks.length)}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FoH Opening Checks</Text>
        {openingChecks.length === 0 ? (
          <Text>No opening checks for today.</Text>
        ) : (
          openingChecks.map(renderCheck)
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FoH Closing Checks</Text>
        {closingChecks.length === 0 ? (
          <Text>No closing checks for today.</Text>
        ) : (
          closingChecks.map(renderCheck)
        )}
      </View>

      <Modal
        visible={!!selectedCheck}
        transparent
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Complete Check
            </Text>

            <Text style={{ marginBottom: 12 }}>
              {selectedCheck?.name}
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Optional note..."
              multiline
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 10,
                minHeight: 80,
                marginBottom: 12,
              }}
            />

            <Pressable
              style={{
                backgroundColor: "#16a34a",
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
              }}
              onPress={async () => {
                await completeCheck(
                  selectedCheck.id,
                  note
                );
                setSelectedCheck(null);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                Complete Check
              </Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#0f766e",
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
              }}
              onPress={async () => {
                await completeCleaningCheck(selectedCheck, note);
                setSelectedCheck(null);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                Complete As Cleaning Event
              </Text>
            </Pressable>

            {isSelectedOpeningCheck ? (
              <Pressable
                style={{
                  backgroundColor: "#1d4ed8",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
                onPress={async () => {
                  await completeOpeningCheckEvent(selectedCheck, note);
                  setSelectedCheck(null);
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Complete As Opening Event
                </Text>
              </Pressable>
            ) : null}

            {isSelectedClosingCheck ? (
              <Pressable
                style={{
                  backgroundColor: "#7c3aed",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
                onPress={async () => {
                  await completeClosingCheckEvent(selectedCheck, note);
                  setSelectedCheck(null);
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Complete As Closing Event
                </Text>
              </Pressable>
            ) : null}

            <Pressable
              onPress={() => setSelectedCheck(null)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  summaryCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  section: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  completedCard: {
    opacity: 0.75,
  },
  cardText: {
    fontSize: 15,
  },
  metaText: {
    marginTop: 6,
    fontSize: 12,
    color: "#6b7280",
  },
  riskBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  riskBadgeRed: {
    backgroundColor: "#fee2e2",
  },
  riskBadgeAmber: {
    backgroundColor: "#fef3c7",
  },
  riskBadgeGreen: {
    backgroundColor: "#dcfce7",
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  ragGreen: {
    backgroundColor: "#dcfce7",
    borderColor: "#16a34a",
    borderWidth: 2,
  },
  ragAmber: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    borderWidth: 2,
  },
  ragRed: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
    borderWidth: 2,
  },
  progressTrack: {
    height: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  progressGreen: {
    backgroundColor: "#16a34a",
  },
  progressAmber: {
    backgroundColor: "#f59e0b",
  },
  progressRed: {
    backgroundColor: "#dc2626",
  },
});