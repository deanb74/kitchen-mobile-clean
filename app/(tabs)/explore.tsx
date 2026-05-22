import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { addToOfflineQueue, getOfflineQueueCount } from "../../lib/offlineQueue";
import { deleteStoredItem, getStoredItem } from "../../lib/storage";
import { getSyncStatus, subscribeToSyncStatus } from "../../lib/syncStatus";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function TemperaturesScreen() {
  const [fridge, setFridge] = useState("Fridge 1");
  const [temp, setTemp] = useState("");
  const [type, setType] = useState("fridge");
  const [logs, setLogs] = useState<any[]>([]);
  const [queueCount, setQueueCount] = useState(0);
  const [syncStatus, setSyncStatusState] = useState(getSyncStatus());

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

      const net = await NetInfo.fetch();

      if (!net.isConnected) {
        await addToOfflineQueue({
          id: `${Date.now()}-temp-${fridge}`,
          type: "logTemperature",
          payload,
          createdAt: new Date().toISOString(),
        });

        await loadQueueCount();
        alert("Offline: temperature queued for sync");
        setTemp("");
        return;
      }

      const headers = await getAuthHeaders();
      if (!headers) return;

      const res = await axios.post(`${API}/temperatures`, payload, { headers });

      if (res.data.status === "red") {
        alert("RED WARNING: Temperature is out of range");
      } else if (res.data.status === "amber") {
        alert("AMBER WARNING: Temperature is acceptable but outside optimum range");
      } else {
        alert("Temperature logged");
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
});
