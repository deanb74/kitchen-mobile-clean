import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AcademyHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Helping Hand Academy</Text>

      <Text style={styles.welcome}>Welcome Annie</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Faculty Member</Text>
        <Text style={styles.name}>MARC</Text>
        <Text style={styles.subtitle}>
          Faculty of Human Understanding
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Today's Lesson</Text>
        <Text style={styles.lesson}>
          Why Do Professions Exist?
        </Text>
        <Text style={styles.time}>
          Estimated Time: 15–20 minutes
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/academy/marc")}
      >
        <Text style={styles.buttonText}>
          Begin Learning
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  lesson: {
    fontSize: 20,
    fontWeight: "600",
  },
  time: {
    marginTop: 8,
    color: "#666",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#0A7CFF",
    paddingVertical: 18,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});