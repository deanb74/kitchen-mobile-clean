import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function TemperaturesScreen() {
  const [fridge, setFridge] = useState("Fridge 1");
  const [temp, setTemp] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

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

  const loadTemperatures = async () => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;
      const res = await axios.get(`${API}/temperatures`, { headers });
      setLogs(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      alert("Could not load temperatures");
    }
  };

  const submitTemperature = async () => {
    try {
      const headers = await getAuthHeaders();
      if (!headers) return;
      await axios.post(`${API}/temperatures`, { fridge, value: temp }, { headers });
      alert("Temperature logged");
      setTemp("");
      await loadTemperatures();
    } catch (err: any) {
      if (err?.response?.status === 401) return handleUnauthorized();
      alert("Could not log temperature");
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/login");
  };

  useEffect(() => {
    loadTemperatures();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Temperatures</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Log Fridge Temperature</Text>

        <TextInput
          style={styles.input}
          value={fridge}
          onChangeText={setFridge}
          placeholder="Fridge name"
        />

        <TextInput
          style={styles.input}
          value={temp}
          onChangeText={setTemp}
          placeholder="Temperature"
          keyboardType="numeric"
        />

        <Button title="Log Temperature" onPress={submitTemperature} />
      </View>

      <View style={styles.logoutWrap}>
        <Button title="Logout" onPress={logout} color="#dc2626" />
      </View>

      <View style={styles.logs}>
        {logs.map((log) => (
          <View key={log.id} style={styles.card}>
            <Text style={styles.logText}>{log.fridge}: {log.value}°C</Text>
            <Text style={styles.timeText}>{log.createdAt}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  section: { backgroundColor: "#f2f2f2", padding: 16, borderRadius: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutWrap: { marginBottom: 20 },
  logs: { gap: 12 },
  card: { backgroundColor: "#f2f2f2", padding: 16, borderRadius: 10 },
  logText: { fontSize: 18, fontWeight: "600" },
  timeText: { marginTop: 6, color: "#666", fontSize: 12 },
});
