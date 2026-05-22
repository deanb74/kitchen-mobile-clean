import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type VoiceNoteInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function VoiceNoteInput({
  value,
  onChangeText,
  placeholder = "Add note",
}: VoiceNoteInputProps) {
  return (
    <View style={styles.voiceInputRow}>
      <TextInput
        style={[styles.input, styles.voiceInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline
      />

      <Pressable
        style={styles.micButton}
        onPress={() =>
          Alert.alert(
            "Voice note",
            "Tap inside the note box, then use the microphone on your keyboard to dictate."
          )
        }
      >
        <Text style={styles.micButtonText}>🎤</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  voiceInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    minHeight: 46,
  },
  voiceInput: {
    flex: 1,
  },
  micButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  micButtonText: {
    fontSize: 22,
  },
});