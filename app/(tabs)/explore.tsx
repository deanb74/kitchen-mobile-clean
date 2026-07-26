import { appendCompanionRuntimeTrace } from "@/lib/companionRuntimeTraceStore";
import { CompanionOrchestrator } from "@/src/companion/CompanionOrchestrator";
import type { CompanionRuntimeResult } from "@/src/companion/types";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { addToOfflineQueue, getOfflineQueueCount } from "../../lib/offlineQueue";
import { deleteStoredItem, getStoredItem } from "../../lib/storage";
import { getSyncStatus, subscribeToSyncStatus } from "../../lib/syncStatus";

const API = "http://192.168.0.183:3001";
const companionRuntime = new CompanionOrchestrator();

function buildTemperatureContextEnvelope(params: {
  interactionId: string;
  userId: string;
  role: string;
  siteId: string;
  equipmentId: string;
  equipmentType: string;
  currentShift?: string;
  peopleOutcome: string;
  currentOperationalState: string;
  timestamp: string;
  networkAvailable: boolean;
}) {
  return {
    interactionId: params.interactionId,
    userId: params.userId,
    role: params.role,
    requestId: params.interactionId,
    siteId: params.siteId,
    equipmentId: params.equipmentId,
    equipmentType: params.equipmentType,
    currentShift: params.currentShift,
    mode: params.networkAvailable ? ("online" as const) : ("offline" as const),
    timestamp: params.timestamp,
    localTimeIso: params.timestamp,
    networkAvailable: params.networkAvailable,
    capabilityId: "temperature.log",
    peopleOutcome: params.peopleOutcome,
    currentOperationalState: params.currentOperationalState,
  };
}

function buildOfflineTemperatureMeta(params: {
  contextEnvelope: ReturnType<typeof buildTemperatureContextEnvelope>;
  idempotencyKey: string;
  originalAttemptedAt: string;
  originalActionIntent: string;
}) {
  return {
    interactionId: params.contextEnvelope.interactionId,
    userId: params.contextEnvelope.userId,
    role: params.contextEnvelope.role,
    requestId: params.contextEnvelope.requestId,
    siteId: params.contextEnvelope.siteId,
    equipmentId: params.contextEnvelope.equipmentId,
    equipmentType: params.contextEnvelope.equipmentType,
    currentShift: params.contextEnvelope.currentShift,
    peopleOutcome: params.contextEnvelope.peopleOutcome,
    originalActionIntent: params.originalActionIntent,
    originalAttemptedAt: params.originalAttemptedAt,
    idempotencyKey: params.idempotencyKey,
    currentOperationalState: params.contextEnvelope.currentOperationalState,
  };
}

function buildTemperatureDecisionSnapshot(params: {
  equipment: string;
  equipmentType: string;
  observedTemperature: number;
}) {
  return {
    intent: "TemperatureRecording" as const,
    equipment: params.equipment,
    observedTemperature: params.observedTemperature,
    expectedRange: params.equipmentType === "freezer" ? "-18 to -15°C" : "0 to 5°C",
    risk: params.equipmentType === "freezer"
      ? params.observedTemperature > -15
        ? "High"
        : "Low"
      : params.observedTemperature > 5
        ? "High"
        : "Low",
    confidence: 0.99,
    reason:
      params.equipmentType === "freezer"
        ? "Recorded temperature exceeds configured freezer operating range."
        : "Recorded temperature exceeds configured safe operating range.",
  };
}

  function describeCorrectiveAction(status: string): string {
    if (status === "red") {
      return "Corrective action created";
    }

    if (status === "amber") {
      return "Monitor and confirm";
    }

    return "No corrective action required";
  }

  type InteractionRecordPreview = {
    interactionId: string;
    assistedBy: string;
    submittedAt: string;
    saveStatus: string;
    contextEnvelope: ReturnType<typeof buildTemperatureContextEnvelope>;
    decisionSnapshot: ReturnType<typeof buildTemperatureDecisionSnapshot>;
    runtimeResult: CompanionRuntimeResult;
  };

export default function TemperaturesScreen() {
  const [fridge, setFridge] = useState("Fridge 1");
  const [temp, setTemp] = useState("");
  const [type, setType] = useState("fridge");
  const [logs, setLogs] = useState<any[]>([]);
  const [queueCount, setQueueCount] = useState(0);
  const [syncStatus, setSyncStatusState] = useState(getSyncStatus());
    const [latestInteractionRecord, setLatestInteractionRecord] = useState<InteractionRecordPreview | null>(null);
    const [interactionRecordExpanded, setInteractionRecordExpanded] = useState(false);

  const handleUnauthorized = async () => {
    await deleteStoredItem("token");
    await deleteStoredItem("role");
    await deleteStoredItem("biometricEnabled");
    router.replace("/login");
  };

  const getAuthHeaders = async () => {
    const token = await getStoredItem("token");
    if (!token) {
      await handleUnauthorized();
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const loadTemperatures = async () => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;

      const res = await axios.get(`${API}/temperatures`, { headers });
      setLogs(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      console.log(err?.response?.data || err.message);
      alert("Could not load temperatures");
    }
  };

  const loadQueueCount = async () => {
    const count = await getOfflineQueueCount();
    setQueueCount(count);
  };

  const submitTemperature = async () => {
    try {
      const payload = {
        fridge,
        value: temp,
        type,
      };

      const [userId, actorRole, siteId, shiftId] = await Promise.all([
        getStoredItem("userId"),
        getStoredItem("role"),
        getStoredItem("siteId"),
        getStoredItem("shiftId"),
      ]);

      const net = await NetInfo.fetch();

      const envelopeTimestamp = new Date().toISOString();
      const contextEnvelope = buildTemperatureContextEnvelope({
        interactionId: `temp-${Date.now()}`,
        userId: userId || "unknown-user",
        role: actorRole || "staff",
        siteId: siteId || "unknown-site",
        equipmentId: fridge,
        equipmentType: type,
        currentShift: shiftId || undefined,
        peopleOutcome:
          "Prevent unsafe food handling and support timely, safe operational decisions.",
        currentOperationalState: net.isConnected
          ? "temperature-entry-active"
          : "temperature-queued-offline",
        timestamp: envelopeTimestamp,
        networkAvailable: net.isConnected === true,
      });
      const decisionSnapshot = buildTemperatureDecisionSnapshot({
        equipment: fridge,
        equipmentType: type,
        observedTemperature: Number(temp),
      });
      let completionStatus = "unknown";

      if (!net.isConnected) {
        const queuedAt = new Date().toISOString();
        const idempotencyKey = `${Date.now()}-temp-${fridge}`;

        await addToOfflineQueue({
          id: idempotencyKey,
          type: "logTemperature",
          payload,
          runtimeMeta: buildOfflineTemperatureMeta({
            contextEnvelope,
            idempotencyKey,
            originalAttemptedAt: queuedAt,
            originalActionIntent: `Log ${type} temperature for ${fridge} at ${temp}C`,
          }),
          createdAt: queuedAt,
        });

        await loadQueueCount();
        alert("Offline: temperature queued for sync");
        setTemp("");
        return;
      }

      const headers = await getAuthHeaders();
      if (!headers) return;

      const runtimeResult = await companionRuntime.runAroundAction(
        {
          requestId: contextEnvelope.interactionId,
          actorId: contextEnvelope.userId,
          actorRole: contextEnvelope.role,
          siteId: contextEnvelope.siteId,
          shiftId: contextEnvelope.currentShift,
          capabilityId: "temperature.log",
          prompt: `Log ${type} temperature for ${fridge} at ${temp}C`,
          peopleOutcome:
            "Prevent unsafe food handling and support timely, safe operational decisions.",
          networkAvailable: true,
          confidenceHint: 0.85,
          uncertainty: [],
          contextEnvelope,
        },
        async () => {
          const res = await axios.post(`${API}/temperatures`, payload, { headers });
          completionStatus = String(res.data.status || "unknown");

          if (res.data.status === "red") {
            alert("RED WARNING: Temperature is out of range");
          } else if (res.data.status === "amber") {
            alert("AMBER WARNING: Temperature is acceptable but outside optimum range");
          } else {
            alert("Temperature logged");
          }

          return {
            attempted: true,
            outcome: "succeeded" as const,
            summary: `Temperature submission succeeded with status ${res.data.status || "unknown"}.`,
            sideEffects: ["temperature-record-created"],
          };
        },
      );

      await appendCompanionRuntimeTrace(runtimeResult);

      setLatestInteractionRecord({
        interactionId: contextEnvelope.interactionId,
        assistedBy: contextEnvelope.userId,
        submittedAt: envelopeTimestamp,
        saveStatus: completionStatus,
        contextEnvelope,
        decisionSnapshot,
        runtimeResult,
      });
      setInteractionRecordExpanded(true);

      console.log("Decision Engine What is happening?:", decisionSnapshot);

      if (!runtimeResult.csaConformant) {
        console.log("Companion runtime contract violations:", runtimeResult.contractViolations);
      }

      setTemp("");
      await loadTemperatures();
      await loadQueueCount();
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      console.log(err?.response?.data || err.message);
      alert("Could not log temperature");
    }
  };

  const logout = async () => {
    await deleteStoredItem("token");
    await deleteStoredItem("role");
    await deleteStoredItem("biometricEnabled");
    router.replace("/login");
  };

  useEffect(() => {
    loadTemperatures();
    loadQueueCount();

    const unsubscribe = subscribeToSyncStatus((status) => {
      setSyncStatusState(status);
      loadQueueCount();
      loadTemperatures();
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Kitchen Daily Checks</Text>

        <Pressable onPress={logout}>
          <Text style={styles.logoutIcon}>⎋</Text>
        </Pressable>
      </View>

      {syncStatus === "syncing" && (
        <View style={styles.syncBanner}>
          <Text style={styles.syncText}>Syncing offline changes...</Text>
        </View>
      )}

      {syncStatus === "synced" && queueCount === 0 && (
        <View style={styles.syncedBanner}>
          <Text style={styles.syncedText}>All changes synced</Text>
        </View>
      )}

      {queueCount > 0 && (
        <Pressable
          style={styles.queueBanner}
          onPress={() => router.push("/queue")}
        >
          <Text style={styles.queueText}>Pending Sync: {queueCount}</Text>
          <Text style={styles.queueSubText}>Tap to view queued actions</Text>
        </Pressable>
      )}

      <Pressable
        style={styles.traceBanner}
        onPress={() => router.push("/companion-traces")}
      >
        <Text style={styles.traceText}>Interaction Record Viewer</Text>
        <Text style={styles.traceSubText}>Inspect CSA runtime stages and interaction records</Text>
      </Pressable>

      {latestInteractionRecord && (
        <View style={styles.interactionRecordCard}>
          <Pressable
            style={styles.interactionRecordHeader}
            onPress={() => setInteractionRecordExpanded((prev) => !prev)}
          >
            <View style={styles.interactionRecordHeaderText}>
              <Text style={styles.interactionRecordBadge}>
                ✓ Assisted by {latestInteractionRecord.assistedBy}
              </Text>
              <Text style={styles.interactionRecordTitle}>View Interaction Record</Text>
              <Text style={styles.interactionRecordSubtitle}>
                Review Outcome: Unreviewed
              </Text>
            </View>
            <Text style={styles.interactionRecordToggle}>
              {interactionRecordExpanded ? "Hide" : "Show"}
            </Text>
          </Pressable>

          {interactionRecordExpanded && (
            <View style={styles.interactionRecordBody}>
              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Context</Text>
                <Text style={styles.interactionRecordText}>
                  Interaction ID: {latestInteractionRecord.interactionId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Person: {latestInteractionRecord.contextEnvelope.userId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Role: {latestInteractionRecord.contextEnvelope.role}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Site: {latestInteractionRecord.contextEnvelope.siteId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Equipment: {latestInteractionRecord.contextEnvelope.equipmentId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Shift: {latestInteractionRecord.contextEnvelope.currentShift || "Not captured"}
                </Text>
                <Text style={styles.interactionRecordText}>
                  People outcome: {latestInteractionRecord.contextEnvelope.peopleOutcome}
                </Text>
              </View>

              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Decision</Text>
                <Text style={styles.interactionRecordText}>
                  Intent: Temperature Recording
                </Text>
                <Text style={styles.interactionRecordText}>
                  Expected: {latestInteractionRecord.decisionSnapshot.expectedRange}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Observed: {latestInteractionRecord.decisionSnapshot.observedTemperature}°C
                </Text>
                <Text style={styles.interactionRecordText}>
                  Confidence: {latestInteractionRecord.decisionSnapshot.confidence}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Reason: {latestInteractionRecord.decisionSnapshot.reason}
                </Text>
              </View>

              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Authority</Text>
                <Text style={styles.interactionRecordText}>
                  Status: {latestInteractionRecord.runtimeResult.trace.authority.disposition.toUpperCase()}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Reason: {latestInteractionRecord.runtimeResult.trace.authority.reason}
                </Text>
              </View>

              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Action</Text>
                <Text style={styles.interactionRecordText}>
                  Existing code executes.
                </Text>
                <Text style={styles.interactionRecordText}>
                  Temperature saved.
                </Text>
                <Text style={styles.interactionRecordText}>
                  {latestInteractionRecord.saveStatus === "red" || latestInteractionRecord.saveStatus === "amber"
                    ? "Corrective action raised."
                    : "No corrective action raised."}
                </Text>
              </View>

              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Evidence</Text>
                <Text style={styles.interactionRecordText}>
                  Temperature: {latestInteractionRecord.decisionSnapshot.observedTemperature}°C
                </Text>
                <Text style={styles.interactionRecordText}>
                  Timestamp: {new Date(latestInteractionRecord.submittedAt).toLocaleString()}
                </Text>
                <Text style={styles.interactionRecordText}>
                  User: {latestInteractionRecord.contextEnvelope.userId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Site: {latestInteractionRecord.contextEnvelope.siteId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Equipment: {latestInteractionRecord.contextEnvelope.equipmentId}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Corrective action: {describeCorrectiveAction(latestInteractionRecord.saveStatus)}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Optional photo: {latestInteractionRecord.runtimeResult.trace.evidence.artifacts.some((artifact) => artifact.kind === "image") ? "Captured" : "Not captured"}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Optional voice note: {latestInteractionRecord.runtimeResult.trace.evidence.artifacts.some((artifact) => artifact.kind === "audio") ? "Captured" : "Not captured"}
                </Text>
              </View>

              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Reflection</Text>
                <Text style={styles.interactionRecordText}>
                  High temperature detected.
                </Text>
                <Text style={styles.interactionRecordText}>
                  Corrective action created.
                </Text>
                <Text style={styles.interactionRecordText}>
                  Evidence complete.
                </Text>
                <Text style={styles.interactionRecordText}>
                  No runtime violations.
                </Text>
              </View>

              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Review Outcome</Text>
                <Text style={styles.interactionRecordText}>Unreviewed</Text>
              </View>
            </View>
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Log Temperature</Text>

        <TextInput
          style={styles.input}
          value={fridge}
          onChangeText={setFridge}
          placeholder="Fridge or freezer name"
        />

        <View style={styles.typeRow}>
          <Button title="Fridge" onPress={() => setType("fridge")} />
          <View style={styles.typeGap} />
          <Button title="Freezer" onPress={() => setType("freezer")} />
        </View>

        <Text style={styles.typeLabel}>Selected: {type}</Text>

        <TextInput
          style={styles.input}
          value={temp}
          onChangeText={setTemp}
          placeholder="Temperature (e.g. 3 or -19)"
          keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
          autoCorrect={false}
        />
        <Button title="Log Temperature" onPress={submitTemperature} />
      </View>

      <View style={styles.logs}>
        {logs.map((log) => (
          <View key={log.id} style={styles.card}>
            <Text style={styles.logText}>
              {log.fridge} ({log.type}): {log.value}°C
            </Text>

            <Text
              style={[
                styles.statusText,
                log.status === "green"
                  ? styles.green
                  : log.status === "amber"
                  ? styles.amber
                  : styles.red,
              ]}
            >
              {log.status.toUpperCase()}
            </Text>

            <Text style={styles.timeText}>
              {new Date(log.createdAt).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  logoutIcon: {
    fontSize: 26,
    fontWeight: "700",
  },
  section: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  typeGap: {
    width: 10,
  },
  typeLabel: {
    marginBottom: 10,
    fontSize: 14,
    color: "#444",
  },
  logs: {
    gap: 12,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
  },
  logText: {
    fontSize: 18,
    fontWeight: "600",
  },
  statusText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
  },
  green: {
    color: "green",
  },
  amber: {
    color: "orange",
  },
  red: {
    color: "red",
  },
  timeText: {
    marginTop: 6,
    color: "#666",
    fontSize: 12,
  },
  syncBanner: {
    backgroundColor: "#dbeafe",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  syncText: {
    color: "#1d4ed8",
    textAlign: "center",
    fontWeight: "600",
  },
  syncedBanner: {
    backgroundColor: "#dcfce7",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  syncedText: {
    color: "#166534",
    textAlign: "center",
    fontWeight: "600",
  },
  queueBanner: {
    backgroundColor: "#fef3c7",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  queueText: {
    color: "#92400e",
    fontWeight: "600",
    textAlign: "center",
  },
  queueSubText: {
    color: "#92400e",
    textAlign: "center",
    marginTop: 4,
    fontSize: 12,
  },
  traceBanner: {
    backgroundColor: "#e0f2fe",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  traceText: {
    color: "#075985",
    fontWeight: "600",
    textAlign: "center",
  },
  traceSubText: {
    color: "#075985",
    textAlign: "center",
    marginTop: 4,
    fontSize: 12,
  },
  interactionRecordCard: {
    backgroundColor: "#ecfeff",
    borderColor: "#67e8f9",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  interactionRecordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  interactionRecordHeaderText: {
    flex: 1,
  },
  interactionRecordBadge: {
    color: "#0f766e",
    fontWeight: "700",
    marginBottom: 4,
  },
  interactionRecordTitle: {
    color: "#155e75",
    fontSize: 16,
    fontWeight: "700",
  },
  interactionRecordSubtitle: {
    color: "#0f766e",
    marginTop: 4,
    fontSize: 12,
  },
  interactionRecordToggle: {
    color: "#0f766e",
    fontWeight: "700",
  },
  interactionRecordBody: {
    marginTop: 12,
    gap: 12,
  },
  interactionRecordSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  interactionRecordSectionTitle: {
    color: "#0f766e",
    fontWeight: "700",
    marginBottom: 2,
  },
  interactionRecordText: {
    color: "#134e4a",
    fontSize: 13,
    lineHeight: 18,
  },
});
