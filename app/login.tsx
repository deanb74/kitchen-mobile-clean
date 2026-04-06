import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function LoginScreen() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/login`, { email, password });
      await SecureStore.setItemAsync("token", res.data.token);
      router.replace("/(tabs)");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitchen Daily Checks</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Button title={loading ? "Logging in..." : "Login"} onPress={login} />

      <View style={styles.spacer} />

      <Button
        title="Create New Account"
        onPress={() => router.replace("/register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24, textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  spacer: { height: 12 },
});