import { type Href, router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import { onboardingPrompts } from "../lib/onboarding/onboardingPrompts";

export default function AnnieScreen() {
  const welcome = onboardingPrompts.welcome;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: "700",
            marginBottom: 30,
          }}
        >
          👋 Hello, I&apos;m Annie
        </Text>

        <Text style={{ fontSize: 18, lineHeight: 30 }}>
          {welcome.introduction}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.role}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.capabilities}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.warmth}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.learning}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.humility}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.businessContext}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 30 }}>
          {welcome.partnership}
        </Text>

        <Pressable
          style={{
            marginTop: 40,
            backgroundColor: "#2f7cff",
            paddingVertical: 18,
            borderRadius: 14,
            alignItems: "center",
          }}
          onPress={() => {
            router.replace("/(tabs)" as Href);
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Let&apos;s get to know each other
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}