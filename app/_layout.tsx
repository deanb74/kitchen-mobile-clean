import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="annie/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="annie/first-questions" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Academy */}
      <Stack.Screen
        name="academy/index"
        options={{
          title: "Helping Hand Academy",
        }}
      />

      <Stack.Screen
        name="academy/marc"
        options={{
          title: "MARC",
        }}
      />
    </Stack>
  );
}
