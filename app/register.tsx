import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import { setStoredItem } from "../lib/storage";

const API = "http://192.168.0.183:3001";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const register = async () => {
  try {
    setLoading(true);

    const res = await axios.post(`${API}/register`, { email, password });

    await setStoredItem("token", res.data.token);
    await setStoredItem("role", res.data.user.role);
    await setStoredItem("siteId", String(res.data.user.siteId || ""));
    await setStoredItem("siteName", res.data.user.siteName || "");
    await setStoredItem("biometricEnabled", "true");

    try {
      const pushToken = await registerForPushNotificationsAsync();

      if (pushToken) {
        await axios.post(
          `${API}/push-token`,
          { pushToken },
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          }
        );
      }
    } catch (pushError) {
      console.log("Push registration skipped:", pushError);
    }

    router.replace("/(tabs)" as any);
  } catch (err: any) {
    console.log("REGISTER ERROR:", err?.response?.data || err.message || err);
    alert(err?.response?.data?.error || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

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

      <Button title={loading ? "Creating..." : "Create Account"} onPress={register} />

      <View style={styles.spacer} />

      <Button title="Back to Login" onPress={() => router.replace("/login")} />
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