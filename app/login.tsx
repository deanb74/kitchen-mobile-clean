import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import { setStoredItem } from "../lib/storage";

const API = "https://kitchen-daily-checks-backend.up.railway.app";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
  try {
    setLoading(true);

    const res = await axios.post(`${API}/login`, { email, password });

    console.log("LOGIN RESPONSE:", res.data); // 👈 debug

    await setStoredItem("token", res.data.token);

    // ✅ SAFE ROLE HANDLING
    const role = res.data.user?.role || "staff";
    await setStoredItem("role", role);

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

    Alert.alert(
      "Start shift?",
      "Are you starting your shift now?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => router.replace("/(tabs)"),
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await axios.post(
                `${API}/shift/start`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${res.data.token}`,
                  },
                }
              );
            } catch (err: any) {
              console.log("SHIFT START ERROR:", err?.response?.data || err.message);
            }

            router.replace("/(tabs)");
          },
        },
      ]
    );
  } catch (err: any) {
    console.log("LOGIN ERROR FULL:", err);
    console.log("LOGIN ERROR RESPONSE:", err?.response?.data);

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
