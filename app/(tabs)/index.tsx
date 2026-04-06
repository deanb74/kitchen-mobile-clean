import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUnauthorized = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/login");
  };

  const getAuthHeaders = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      await handleUnauthorized();
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const headers = await getAuthHeaders();
      if (!headers) return;
      const res = await axios.get(`${API}/tasks`, { headers });
      setTasks(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      alert("Could not load tasks");
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;
      await axios.post(`${API}/tasks/${id}/complete`, {}, { headers });
      await loadTasks();
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      alert("Could not complete task");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <Button title={loading ? "Loading..." : "Reload Tasks"} onPress={loadTasks} />
      <View style={styles.list}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.card}>
            <Text style={styles.taskText}>
              {task.completed ? "✅" : "•"} {task.name}
            </Text>
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
  container: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  list: { marginTop: 20, gap: 12 },
  card: { backgroundColor: "#f2f2f2", padding: 16, borderRadius: 10 },
  taskText: { fontSize: 18, marginBottom: 8 },
});
