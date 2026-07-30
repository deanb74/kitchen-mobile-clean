import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { onboardingPrompts } from "../../lib/onboarding/onboardingPrompts";

export default function AnnieWelcomeScreen() {
  const welcome = onboardingPrompts.welcome;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 34, fontWeight: "700" }}>
            {welcome.greeting}
          </Text>

          <Text style={{ fontSize: 24, marginTop: 20 }}>
            {welcome.introduction}
          </Text>

          <Text style={{ fontSize: 20, lineHeight: 30, marginTop: 20 }}>
            {welcome.role}
          </Text>

          <Text style={{ fontSize: 20, lineHeight: 30, marginTop: 20 }}>
            {welcome.capabilities}
          </Text>

          <Text style={{ fontSize: 22, fontWeight: "600", lineHeight: 32, marginTop: 28 }}>
            {welcome.warmth}
          </Text>

          <Pressable
            onPress={() => router.push("/annie/first-shift" as any)}
            style={{
              marginTop: 24,
              backgroundColor: "#111827",
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text>Let&apos;s go</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}