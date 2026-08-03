import {
    temperatureAdapter,
    type TemperatureInteractionRecordPreview,
} from "@/src/companion/adapters/TemperatureAdapter";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { API_BASE_URL } from "../../lib/api";
import { getOfflineQueueCount } from "../../lib/offlineQueue";
import { deleteStoredItem, getStoredItem } from "../../lib/storage";
import { getSyncStatus, subscribeToSyncStatus } from "../../lib/syncStatus";

const API = API_BASE_URL;

  function describeCorrectiveAction(status: string): string {
    if (status === "red") {
      return "Corrective action created";
    }

    if (status === "amber") {
      return "Monitor and confirm";
    }

    return "No corrective action required";
  }

export default function TemperaturesScreen() {
  const [fridge, setFridge] = useState("Fridge 1");
  const [temp, setTemp] = useState("");
  const [type, setType] = useState("fridge");
  const [logs, setLogs] = useState<any[]>([]);
  const [queueCount, setQueueCount] = useState(0);
  const [syncStatus, setSyncStatusState] = useState(getSyncStatus());
    const [latestInteractionRecord, setLatestInteractionRecord] = useState<TemperatureInteractionRecordPreview | null>(null);
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
      const result = await temperatureAdapter.submit({
        fridge,
        value: temp,
        type,
        getAuthHeaders,
      });

      if (result.mode === "queued-offline") {
        await loadQueueCount();
        alert("Offline: temperature queued for sync");
        setTemp("");
        return;
      }

      if (result.mode === "auth-required") return;

      const { interactionRecord } = result;
      const { saveStatus } = interactionRecord;

      if (saveStatus === "red") {
        alert("RED WARNING: Temperature is out of range");
      } else if (saveStatus === "amber") {
        alert("AMBER WARNING: Temperature is acceptable but outside optimum range");
      } else {
        alert("Temperature logged");
      }

      setLatestInteractionRecord(interactionRecord);
      setInteractionRecordExpanded(true);

      console.log(
        "Decision Engine What is happening?:",
        interactionRecord.decisionSnapshot,
      );

      if (!interactionRecord.csaConformant) {
        console.log(
          "Companion runtime contract violations:",
          interactionRecord.contractViolations,
        );
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
                Review Outcome: {latestInteractionRecord.interactionRecord.reviewOutcome}
              </Text>
            </View>
            <Text style={styles.interactionRecordToggle}>
              {interactionRecordExpanded ? "Hide" : "Show"}
            </Text>
          </Pressable>

          {interactionRecordExpanded && (
            <View style={styles.interactionRecordBody}>
              <View style={styles.interactionRecordSection}>
                <Text style={styles.interactionRecordSectionTitle}>Operational Event</Text>
                <Text style={styles.interactionRecordText}>
                  Type: {latestInteractionRecord.operationalEvent.type}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Actor: {latestInteractionRecord.operationalEvent.actor}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Venue: {latestInteractionRecord.operationalEvent.venue}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Outcome: {latestInteractionRecord.operationalEvent.outcome}
                </Text>
              </View>

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
                  Status: {latestInteractionRecord.interactionRecord.authority.disposition.toUpperCase()}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Reason: {latestInteractionRecord.interactionRecord.authority.reason}
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
                  Optional photo: {latestInteractionRecord.interactionRecord.evidence.artifacts.some((artifact) => artifact.kind === "image") ? "Captured" : "Not captured"}
                </Text>
                <Text style={styles.interactionRecordText}>
                  Optional voice note: {latestInteractionRecord.interactionRecord.evidence.artifacts.some((artifact) => artifact.kind === "audio") ? "Captured" : "Not captured"}
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
                <Text style={styles.interactionRecordText}>
                  {latestInteractionRecord.interactionRecord.reviewOutcome}
                </Text>
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
