import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  clearOfflineQueue,
  getOfflineQueue,
  type OfflineAction,
} from "../lib/offlineQueue";
import { syncOfflineQueue } from "../lib/syncQueue";

export default function QueueScreen() {
  const [items, setItems] = useState<OfflineAction[]>([]);
  const [loading, setLoading] = useState(false);

  const loadQueue = async () => {
    const queue = await getOfflineQueue();
    setItems(queue);
  };

  const retrySync = async () => {
    try {
      setLoading(true);
      const result = await syncOfflineQueue();
      await loadQueue();
      Alert.alert(
        "Sync complete",
        `Synced: ${result.synced}\nRemaining: ${result.remaining}`
      );
    } catch {
      Alert.alert("Could not sync queue");
    } finally {
      setLoading(false);
    }
  };

  const clearQueue = async () => {
    Alert.alert("Clear queue", "Remove all pending offline actions?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearOfflineQueue();
          await loadQueue();
        },
      },
    ]);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pending Sync Queue</Text>

      <View style={styles.actions}>
        <Button
          title={loading ? "Syncing..." : "Retry Sync"}
          onPress={retrySync}
        />
        <View style={styles.spacer} />
        <Button title="Clear Queue" onPress={clearQueue} color="#dc2626" />
      </View>

      <View style={styles.spacer} />

      {items.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No pending offline actions</Text>
        </View>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.itemTitle}>
              {item.type === "completeTask" ? "Complete Task" : "Log Temperature"}
            </Text>

            {item.type === "completeTask" && (
              <Text style={styles.itemText}>
                Task ID: {item.payload.taskId}
              </Text>
            )}

            {item.type === "logTemperature" && (
              <>
                <Text style={styles.itemText}>
                  Unit: {item.payload.fridge}
                </Text>
                <Text style={styles.itemText}>
                  Value: {item.payload.value}°C
                </Text>
                <Text style={styles.itemText}>
                  Type: {item.payload.type}
                </Text>
              </>
            )}

            <Text style={styles.timeText}>
              Queued: {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        ))
      )}

      <View style={styles.spacer} />
      <Button title="Back" onPress={() => router.back()} />
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
  actions: {
    gap: 10,
  },
  spacer: {
    height: 12,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  itemText: {
    fontSize: 15,
    marginBottom: 4,
  },
  timeText: {
    marginTop: 8,
    color: "#666",
    fontSize: 12,
  },
});