import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function getStoredItem(key: string) {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }

  return SecureStore.getItemAsync(key);
}

export async function setStoredItem(key: string, value: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }

  return SecureStore.setItemAsync(key, value);
}

export async function deleteStoredItem(key: string) {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
    return;
  }

  return SecureStore.deleteItemAsync(key);
}