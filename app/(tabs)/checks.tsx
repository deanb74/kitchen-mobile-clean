import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { getStoredItem } from "../../lib/storage";

const API = "http://192.168.0.183:3001";

export default function ChecksScreen() {
  const [openingChecks, setOpeningChecks] = useState<any[]>([]);
  const [closingChecks, setClosingChecks] = useState<any[]>([]);
  const [selectedCheck, setSelectedCheck] = useState<any>(null);
  const [note, setNote] = useState("");

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
      setOpeningChecks((items) =>
        items.map((item) =>
          item.id === taskId
            ? { ...item, completed: true, completedByEmail: "Saving...", completedAt: new Date().toISOString() }
            : item
        )
      );

      setClosingChecks((items) =>
        items.map((item) =>
          item.id === taskId
            ? { ...item, completed: true, completedByEmail: "Saving...", completedAt: new Date().toISOString() }
            : item
        )
      );

      const token = await getStoredItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        `${API}/tasks/${taskId}/complete`,
        {
          note: noteText,
        },
        { headers }
      );
      await loadChecks();
    } catch (err: any) {
      console.log("COMPLETE CHECK ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not complete check");
    }
  };

  useEffect(() => {
    loadChecks();
  }, []);

  const openingCompleted = openingChecks.filter((item) => item.completed).length;
  const closingCompleted = closingChecks.filter((item) => item.completed).length;

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