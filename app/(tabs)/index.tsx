  // Report equipment fault
  const reportEquipmentFault = async (equipmentId: number) => {
    try {
      const headers = await getAuthHeaders();

      if (!headers) return;

      await axios.post(
        `${API}/equipment/${equipmentId}/report-fault`,
        { notes: equipmentFaultNotes },
        { headers }
      );

      Alert.alert("Equipment fault reported");
      setEquipmentFaultNotes("");
      await loadTasks();
    } catch (err: any) {
      Alert.alert(
        "Could not report equipment fault",
        err?.response?.data?.error || err.message
      );
    }
  };
import VoiceNoteInput from "@/components/VoiceNoteInput";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
// import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const [taskFilter, setTaskFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [staffSection, setStaffSection] = useState("home");
  const [handoverNotes, setHandoverNotes] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [taskPhoto, setTaskPhoto] = useState<string | null>(null);
  const [correctiveActions, setCorrectiveActions] = useState<any[]>([]);
  const [correctionResponseNote, setCorrectionResponseNote] = useState("");
  const [equipmentFaultNotes, setEquipmentFaultNotes] = useState("");

  const departments = [
    "all",
    "kitchen",
    "front_of_house",
    "cellar",
    "cleaning",
    "maintenance",
    "management",
  ];

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "overdue") {
      return (
        !task.completed &&
        task.dueAt &&
        new Date(task.dueAt) < new Date()
      );
    }

    if (taskFilter === "open") {
      return !task.completed;
    }

    if (taskFilter === "completed") {
      return task.completed;
    }

    return true;
  });
  const overdueTaskCount = dashboard?.overdueTaskCount || 0;
  const activeTheme = { card: "#f2f2f2", text: "#111827" };
  const themedText = { color: activeTheme.text };

  const getTaskStatusColor = (task: any) => {
    const hasCorrective = correctiveActions.some(
      (record) => record.taskId === task.id
    );

    if (task.escalationLevel >= 2) return "#9333ea"; // repeated/escalated issue
    if (hasCorrective) return "#facc15"; // corrective action
    if (task.completed) return "#16a34a"; // completed

    if (task.dueAt) {
      const due = new Date(task.dueAt).getTime();
      const now = Date.now();

      if (due < now) return "#dc2626"; // overdue

      const oneHour = 1000 * 60 * 60;
      if (due - now < oneHour) return "#f59e0b"; // due soon
    }

    return "#6b7280"; // normal
  };

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

  const loadCorrectiveActions = async () => {
    try {
      const headers = await getAuthHeaders();

      if (!headers) return;

      const res = await axios.get(`${API}/staff/corrective-actions`, {
        headers,
      });

      setCorrectiveActions(res.data);
    } catch (err: any) {
      console.log("LOAD CORRECTIVE ACTIONS ERROR:", err?.response?.data || err.message);
    }
  };

  const completeTask = async (
    id: number,
    note?: string,
    correctionResponse?: string
  ) => {
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

      await axios.post(
        `${API}/tasks/${id}/complete`,
        {
          note,
          correctionResponse,
        },
        { headers }
      );

      await loadTasks();
      await loadCorrectiveActions();
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      alert("Could not complete task");
    }
  };

  const addTaskPhoto = async () => {
    Alert.alert(
      "Photo evidence",
      "Photo capture will be enabled in the production/dev build. For now, add a written note."
    );
  };

  const endShift = async () => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;

      const res = await axios.post(
        `${API}/shift/end`,
        { handoverNotes },
        { headers }
      );

      Alert.alert(
        "Shift ended",
        `Open tasks: ${res.data.summary.openTaskCount}\nOverdue: ${res.data.summary.overdueTaskCount}\nEscalated: ${res.data.summary.escalatedTaskCount}`
      );

      setHandoverNotes("");
      loadDashboard();
    } catch (err: any) {
      console.log("END SHIFT ERROR:", err?.response?.data || err.message);
      Alert.alert("Could not end shift");
    }
  };

  const logout = async () => {
    await deleteStoredItem("token");
    await deleteStoredItem("role");
    await deleteStoredItem("biometricEnabled");
    await deleteStoredItem("siteId");
    await deleteStoredItem("siteName");
    router.replace("/login");
  };

  useEffect(() => {
    loadTasks();
    loadCorrectiveActions();

    const unsubscribe = subscribeToSyncStatus((status) => {
      setSyncStatusState(status);
      loadQueueCount();
      loadDashboard();
    });

    return unsubscribe;
  }, [selectedDepartment]);

  useEffect(() => {
    if (staffSection === "corrective") {
      loadCorrectiveActions();
    }
  }, [staffSection]);

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

      <View style={styles.tileGrid}>
        <Pressable style={styles.tile} onPress={() => setStaffSection("tasks")}>
          <Text style={styles.tileIcon}>✅</Text>
          <Text style={styles.tileText}>My Tasks</Text>
        </Pressable>

        <Pressable style={styles.tile} onPress={() => setStaffSection("shift")}>
          <Text style={styles.tileIcon}>🕒</Text>
          <Text style={styles.tileText}>Shift</Text>
        </Pressable>

        <Pressable style={styles.tile} onPress={() => setStaffSection("temps")}>
          <Text style={styles.tileIcon}>🌡</Text>
          <Text style={styles.tileText}>Temperatures</Text>
        </Pressable>

        <Pressable style={styles.tile} onPress={() => setStaffSection("handover")}>
          <Text style={styles.tileIcon}>📝</Text>
          <Text style={styles.tileText}>Handover</Text>
        </Pressable>

        <Pressable
          style={[
            styles.tile,
            styles.warningTile,
          ]}
          onPress={async () => {
            await loadCorrectiveActions();
            setStaffSection("corrective");
          }}
        >
          <Text style={styles.warningTileIcon}>⚠️</Text>

          <Text style={styles.warningTileText}>
            Corrective Actions
          </Text>

          <Text style={styles.warningTileBadge}>
            {correctiveActions.length}
          </Text>
        </Pressable>
      </View>

      {staffSection === "shift" && (
        <>
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
                <Pressable
                  onPress={() => {
                    setTaskFilter("overdue");
                    setStaffSection("tasks");
                  }}
                >
                  <Text style={styles.statusWarning}>{overdueTaskCount} overdue</Text>
                </Pressable>
              </View>
            </>
          )}
        </>
      )}

      {staffSection === "temps" && (
        <>
          {!dashboard ? (
            <Text style={styles.emptyText}>Loading dashboard...</Text>
          ) : (
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
          )}
        </>
      )}

      {staffSection === "tasks" && (
        <>
          <Button
            title={loading ? "Loading..." : "Reload Tasks"}
            onPress={loadTasks}
          />

          <View style={styles.deptFilterRow}>
            <Pressable
              style={[styles.deptBtn, taskFilter === "open" && styles.deptBtnActive]}
              onPress={() => setTaskFilter("open")}
            >
              <Text style={styles.deptBtnText}>Open</Text>
            </Pressable>
            <Pressable
              style={[styles.deptBtn, taskFilter === "overdue" && styles.deptBtnActive]}
              onPress={() => setTaskFilter("overdue")}
            >
              <Text style={styles.deptBtnText}>Overdue</Text>
            </Pressable>
            <Pressable
              style={[styles.deptBtn, taskFilter === "completed" && styles.deptBtnActive]}
              onPress={() => setTaskFilter("completed")}
            >
              <Text style={styles.deptBtnText}>Completed</Text>
            </Pressable>
            <Pressable
              style={[styles.deptBtn, taskFilter === "all" && styles.deptBtnActive]}
              onPress={() => setTaskFilter("all")}
            >
              <Text style={styles.deptBtnText}>All</Text>
            </Pressable>
          </View>

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

          <View style={styles.legendRow}>
            <Text style={styles.legendText}>🟡 Corrective</Text>
            <Text style={styles.legendText}>🔴 Overdue</Text>
            <Text style={styles.legendText}>🟣 Escalated</Text>
          </View>

          <View style={styles.list}>
            {filteredTasks.map((task) => (
              <Pressable
                key={task.id}
                onPress={() => setSelectedTask(task)}
                style={[
                  styles.card,
                  {
                    borderLeftWidth: 6,
                    borderLeftColor: getTaskStatusColor(task),
                  },
                ]}
              >
                <Text style={[styles.taskText, { color: getTaskStatusColor(task) }]}>
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
              </Pressable>
            ))}
          </View>
        </>
      )}

      {staffSection === "handover" && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>End Shift / Handover</Text>

            <VoiceNoteInput
              value={handoverNotes}
              onChangeText={setHandoverNotes}
              placeholder="Handover notes"
            />

            <Button title="End Shift" onPress={endShift} />
          </View>
        </>
      )}

      {staffSection === "corrective" && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themedText]}>
            Corrective Actions
          </Text>

          {correctiveActions.map((record) => (
            <Pressable
              key={record.id}
              style={[styles.card, { borderLeftWidth: 6, borderLeftColor: "#facc15" }]}
              onPress={() => {
                const linkedTask = tasks.find((task) => task.id === record.taskId);

                if (linkedTask) {
                  setSelectedTask(linkedTask);
                  setStaffSection("tasks");
                }
              }}
            >
              <Text>⚠ Corrective Action Required</Text>
              <Text>Task: {record.task?.name || `Task ID ${record.taskId}`}</Text>
              <Text>Manager note: {record.correctiveAction}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {selectedTask?.equipmentId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Report Equipment Fault
          </Text>

          <VoiceNoteInput
            value={equipmentFaultNotes}
            onChangeText={setEquipmentFaultNotes}
            placeholder="Describe the equipment fault"
          />

          <Button
            title="Report Fault & Mark Out Of Service"
            onPress={() =>
              reportEquipmentFault(selectedTask.equipmentId)
            }
          />
        </View>
      )}

      <Modal
        visible={!!selectedTask}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedTask(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.sectionTitle}>
              {selectedTask?.name}
            </Text>

            <Text>Department: {selectedTask?.department || "None"}</Text>
            <Text>
              Due:{" "}
              {selectedTask?.dueAt
                ? new Date(selectedTask.dueAt).toLocaleString()
                : "No due time"}
            </Text>
            <Text>
              Escalation Level: {selectedTask?.escalationLevel || 0}
            </Text>

            <Button title="Add Photo Evidence" onPress={addTaskPhoto} />

            {taskPhoto && (
              <Image
                source={{ uri: taskPhoto }}
                style={styles.photoPreview}
              />
            )}

            <VoiceNoteInput
              value={taskNote}
              onChangeText={setTaskNote}
              placeholder="Completion note / corrective action"
            />

            <Button
              title="Complete Task"
              onPress={async () => {
                if (!selectedTask) return;
                await completeTask(selectedTask.id, taskNote, correctionResponseNote);
                setTaskNote("");
                setCorrectionResponseNote("");
                setSelectedTask(null);
              }}
            />

            <Button
              title="Close"
              onPress={() => setSelectedTask(null)}
            />
          </View>
        </View>
      </Modal>
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
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  voiceInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  voiceInput: {
    flex: 1,
  },
  micButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  micButtonText: {
    fontSize: 22,
  },
  list: {
    marginTop: 20,
    gap: 12,
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  legendText: {
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 12,
  },
  tile: {
    width: "47%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },
  tileIcon: {
    fontSize: 28,
  },
  tileText: {
    fontWeight: "700",
    marginTop: 6,
  },
  warningTile: {
    backgroundColor: "#facc15",
    borderWidth: 2,
    borderColor: "#111827",
  },
  warningTileIcon: {
    fontSize: 28,
  },
  warningTileText: {
    fontWeight: "800",
    color: "#111827",
    marginTop: 6,
  },
  warningTileBadge: {
    marginTop: 6,
    backgroundColor: "#111827",
    color: "#facc15",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "800",
  },
  taskText: {
    fontSize: 18,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
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
  statusWarning: {
    fontWeight: "700",
    color: "#dc2626",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  photoPreview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginVertical: 10,
  },
});
