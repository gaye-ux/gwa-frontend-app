import { Platform } from 'react-native';
import { storage, StorageKeys } from '@/services/storage';

const EXPO_PUSH_API = 'https://exp.host/--/api/v2/push/send';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.gwa.gm/v1';

export interface LocalNotification {
  title: string;
  body: string;
  data?: Record<string, string>;
  categoryId?: string;
}

let ExpoNotifications: any = null;

async function loadModule(): Promise<boolean> {
  if (ExpoNotifications) return true;
  try {
    ExpoNotifications = require('expo-notifications');
    return true;
  } catch {
    console.warn('[GWA Notifications] expo-notifications not installed. Install it with: npx expo install expo-notifications expo-device');
    return false;
  }
}

export const NotificationService = {
  async configure() {
    const ok = await loadModule();
    if (!ok) return;

    ExpoNotifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  },

  async getExpoPushToken(): Promise<string | null> {
    const ok = await loadModule();
    if (!ok) return null;

    try {
      const { status: existing } = await ExpoNotifications.getPermissionsAsync();
      let finalStatus = existing;

      if (existing !== 'granted') {
        const { status } = await ExpoNotifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('[GWA Notifications] Push notification permission not granted');
        return null;
      }

      const tokenData = await ExpoNotifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
      });
      return tokenData.data;
    } catch (err) {
      console.error('[GWA Notifications] Failed to get push token:', err);
      return null;
    }
  },

  async scheduleImmediate(notification: LocalNotification) {
    const ok = await loadModule();
    if (!ok) return null;

    try {
      return await ExpoNotifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          sound: 'default',
          ...(notification.categoryId ? { categoryIdentifier: notification.categoryId } : {}),
        },
        trigger: null,
      });
    } catch (err) {
      console.error('[GWA Notifications] Failed to schedule:', err);
      return null;
    }
  },

  async scheduleWithTrigger(notification: LocalNotification, triggerSeconds: number) {
    const ok = await loadModule();
    if (!ok) return null;

    try {
      return await ExpoNotifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          sound: 'default',
        },
        trigger: { seconds: triggerSeconds },
      });
    } catch (err) {
      console.error('[GWA Notifications] Failed to schedule delayed:', err);
      return null;
    }
  },

  async cancelAll() {
    const ok = await loadModule();
    if (!ok) return;
    await ExpoNotifications.cancelAllScheduledNotificationsAsync();
  },

  async registerTokenOnBackend(token: string) {
    try {
      const authToken = await storage.get(StorageKeys.AUTH_TOKEN);

      await fetch(`${API_BASE_URL}/notifications/register-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify({ token, platform: Platform.OS }),
      });
    } catch {
      // BE not yet available
    }
  },

  async sendToDevice(expoPushToken: string, notification: LocalNotification) {
    try {
      const response = await fetch(EXPO_PUSH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          to: expoPushToken,
          sound: 'default',
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          priority: 'high',
        }),
      });
      return await response.json();
    } catch (err) {
      console.error('[GWA Notifications] Failed to send push:', err);
      return null;
    }
  },

  async sendToMultipleDevices(tokens: string[], notification: LocalNotification) {
    try {
      const response = await fetch(EXPO_PUSH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(
          tokens.map((to) => ({
            to,
            sound: 'default',
            title: notification.title,
            body: notification.body,
            data: notification.data || {},
            priority: 'high',
          }))
        ),
      });
      return await response.json();
    } catch (err) {
      console.error('[GWA Notifications] Failed to send batch push:', err);
      return null;
    }
  },

  addResponseListener(handler: (response: any) => void) {
    loadModule().then((ok) => {
      if (ok) {
        return ExpoNotifications.addNotificationResponseReceivedListener(handler);
      }
    });
    return { remove: () => {} };
  },

  addReceivedListener(handler: (notification: any) => void) {
    loadModule().then((ok) => {
      if (ok) {
        return ExpoNotifications.addNotificationReceivedListener(handler);
      }
    });
    return { remove: () => {} };
  },
};
