import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2563eb", headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Tasks",
          tabBarLabel: "Tasks",
          headerTitle: "Tasks",
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
    </Tabs>
  );
}