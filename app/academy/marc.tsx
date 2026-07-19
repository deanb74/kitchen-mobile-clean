import { View, Text } from "react-native";

export default function MarcScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700" }}>
        Hello Annie.
      </Text>

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          textAlign: "center",
        }}
      >
        Welcome to Helping Hand Academy.
      </Text>

      <Text
        style={{
          marginTop: 30,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Why do you think professions exist?
      </Text>
    </View>
  );
}