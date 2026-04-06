import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const token = await SecureStore.getItemAsync("token");
      setRoute(token ? "/(tabs)" : "/login");
    };
    check();
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