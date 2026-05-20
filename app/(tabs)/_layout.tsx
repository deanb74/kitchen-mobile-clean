import Ionicons from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { getStoredItem } from "../../lib/storage";
import { syncOfflineQueue } from "../../lib/syncQueue";

export default function TabLayout() {
  const [role, setRole] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await getStoredItem("role");
      setRole(storedRole);
      setLoaded(true);
    };
    loadRole();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected === true) {
        syncOfflineQueue().then((result) => {
          console.log("Offline queue sync result:", result);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  if (!loaded) return null;

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2563eb", headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "My Tasks",
          tabBarLabel: "Tasks",
          headerTitle: "My Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Temperatures",
          tabBarLabel: "Temps",
          headerTitle: "Temperatures",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="thermometer-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="manager"
        options={{
          title: "Manager",
          tabBarLabel: "Manager",
          headerTitle: "Manager",
          href: role === "manager" ? "/manager" : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}