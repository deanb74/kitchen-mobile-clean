import axios from "axios";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getStoredItem } from "./storage";

const API = "http://192.168.0.183:3001";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log("Push notifications require a physical device");
    return null;
  }

  const existingPermission = await Notifications.getPermissionsAsync();
  let finalStatus = existingPermission.status;

  if (existingPermission.status !== "granted") {
    const requestedPermission = await Notifications.requestPermissionsAsync();
    finalStatus = requestedPermission.status;
  }

  if (finalStatus !== "granted") {
    console.log("Push notification permission not granted");
    return null;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ||
    Constants.easConfig?.projectId;

  if (!projectId) {
    console.log("Missing EAS projectId");
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token.data;
}

export async function savePushTokenToBackend(pushToken: string) {
  const authToken = await getStoredItem("token");

  if (!authToken) {
    console.log("No auth token available for push token save");
    return;
  }

  await axios.post(
    `${API}/push-token`,
    { pushToken },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}