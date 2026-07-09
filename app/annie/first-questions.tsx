import { SafeAreaView, Text } from "react-native";

export default function AnnieFirstQuestionsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>
        What would success look like for you?
      </Text>
    </SafeAreaView>
  );
}