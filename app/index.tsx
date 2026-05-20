import * as LocalAuthentication from "expo-local-authentication";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { getStoredItem } from "../lib/storage";

export default function Index() {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getStoredItem("token");
      const biometricEnabled = await getStoredItem("biometricEnabled");

      if (!token) {
        setRoute("/login");
        return;
      }

      if (Platform.OS !== "web" && biometricEnabled === "true") {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Unlock Kitchen Daily Checks",
            fallbackLabel: "Use Passcode",
          });

          if (!result.success) {
            setRoute("/login");
            return;
          }
        }
      }

      setRoute("/(tabs)");
    };

    checkAuth();
  }, []);

  if (!route) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={route as "/login" | "/(tabs)"} />;
}