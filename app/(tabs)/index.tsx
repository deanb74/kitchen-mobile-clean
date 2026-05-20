import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { addToOfflineQueue, getOfflineQueueCount } from "../../lib/offlineQueue";
import { deleteStoredItem, getStoredItem } from "../../lib/storage";
import { getSyncStatus, subscribeToSyncStatus } from "../../lib/syncStatus";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [queueCount, setQueueCount] = useState(0);
  const [syncStatus, setSyncStatusState] = useState(getSyncStatus());
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = [
    "all",
    "kitchen",
    "front_of_house",
    "cellar",
    "cleaning",
    "maintenance",
    "management",
  ];

  const filteredTasks =
    selectedDepartment === "all"
      ? tasks
      : tasks.filter((task) => task.department === selectedDepartment);

  const handleUnauthorized = async () => {
    await deleteStoredItem("token");
    await deleteStoredItem("role");
    await deleteStoredItem("biometricEnabled");
    await deleteStoredItem("siteId");
    await deleteStoredItem("siteName");
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

  const loadDashboard = async () => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;
      const [res, taskRes] = await Promise.all([
        axios.get(`${API}/staff/dashboard`, { headers }),
        axios.get(`${API}/tasks?department=${selectedDepartment}`, { headers }),
      ]);
      setDashboard(res.data);
      setTasks(taskRes.data || []);
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      console.log(err?.response?.data || err.message);
      return;
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      await loadDashboard();
      await loadQueueCount();
    } finally {
      setLoading(false);
    }
  };

  const loadQueueCount = async () => {
    const count = await getOfflineQueueCount();
    setQueueCount(count);
  };

  const completeTask = async (id: number) => {
    try {
      const net = await NetInfo.fetch();

      if (!net.isConnected) {
        await addToOfflineQueue({
          id: `${Date.now()}-task-${id}`,
          type: "completeTask",
          payload: { taskId: id },
          createdAt: new Date().toISOString(),
        });

        await loadQueueCount();
        alert("Offline: task queued for sync");
        return;
      }

      const headers = await getAuthHeaders();
      if (!headers) return;

      await axios.post(`${API}/tasks/${id}/complete`, {}, { headers });
      await loadDashboard();
      await loadQueueCount();
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      alert("Could not complete task");
    }
  };

  useEffect(() => {
    loadTasks();

    const unsubscribe = subscribeToSyncStatus((status) => {
      setSyncStatusState(status);
      loadQueueCount();
      loadDashboard();
    });

    return unsubscribe;
  }, [selectedDepartment]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

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

      {!dashboard ? (
        <Text style={styles.emptyText}>Loading dashboard...</Text>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.dashboardTitle}>
              Site: {dashboard.site?.name || "No Site"}
            </Text>
            <Text style={styles.timeText}>
              Next reset:{" "}
              {dashboard.site?.resetEnabled
                ? `${String(dashboard.site?.resetHour).padStart(2, "0")}:${String(
                    dashboard.site?.resetMinute
                  ).padStart(2, "0")}`
                : "Disabled"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.dashboardTitle}>
              Completed Today: {dashboard.completedToday}
            </Text>
            <Text style={styles.dashboardTitle}>
              Remaining Tasks: {dashboard.remainingTasks}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Latest Site Temperatures</Text>
            {dashboard.latestTemps.length === 0 ? (
              <Text style={styles.emptyText}>No temperature logs yet</Text>
            ) : (
              dashboard.latestTemps.map((log: any) => (
                <View key={log.id} style={styles.tempItem}>
                  <Text style={styles.taskText}>
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
              ))
            )}
          </View>
        </>
      )}

      <Button
        title={loading ? "Loading..." : "Reload Tasks"}
        onPress={loadTasks}
      />

      <View style={styles.deptFilterRow}>
        {departments.map((d) => (
          <Pressable
            key={d}
            style={[styles.deptBtn, selectedDepartment === d && styles.deptBtnActive]}
            onPress={() => setSelectedDepartment(d)}
          >
            <Text style={styles.deptBtnText}>
              {d === "all" ? "All" : d.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {filteredTasks.map((task) => (
          <View key={task.id} style={styles.card}>
            <Text style={styles.taskText}>
              {task.completed ? "✅" : "•"} {task.name}
            </Text>

            {task.completedAt && (
              <Text style={styles.timeText}>
                Completed: {new Date(task.completedAt).toLocaleString()}
              </Text>
            )}

            {!task.completed && (
              <Button title="Complete" onPress={() => completeTask(task.id)} />
            )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  list: {
    marginTop: 20,
    gap: 12,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 18,
    marginBottom: 8,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  tempItem: {
    marginTop: 8,
  },
  timeText: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
  statusText: {
    marginTop: 4,
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
  deptFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  deptBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },
  deptBtnActive: {
    backgroundColor: "#7c3aed",
  },
  deptBtnText: {
    fontSize: 13,
    color: "#111",
  },
});
