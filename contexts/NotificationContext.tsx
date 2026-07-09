import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { NotificationService, LocalNotification } from '@/services/notifications';

interface NotificationContextType {
  expoPushToken: string | null;
  lastNotification: any;
  pushTokenRegistered: boolean;
  schedule: (notification: LocalNotification) => Promise<void>;
  scheduleDelayed: (notification: LocalNotification, seconds: number) => Promise<void>;
  registerToken: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] = useState<any>(null);
  const [pushTokenRegistered, setPushTokenRegistered] = useState(false);

  const responseListener = useRef<any>(null);
  const receivedListener = useRef<any>(null);

  useEffect(() => {
    NotificationService.configure();

    NotificationService.getExpoPushToken().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    receivedListener.current = NotificationService.addReceivedListener((notification) => {
      setLastNotification(notification);
    });

    responseListener.current = NotificationService.addResponseListener((response) => {
      const data = response.notification.request.content.data;
      handleNotificationNavigation(data);
    });

    return () => {
      receivedListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  function handleNotificationNavigation(data: any) {
    if (!data?.link) return;
    try {
      const { router } = require('expo-router');
      router.push(data.link);
    } catch {
      // expo-router not available or route invalid
    }
  }

  const schedule = useCallback(async (notification: LocalNotification) => {
    await NotificationService.scheduleImmediate(notification);
  }, []);

  const scheduleDelayed = useCallback(async (notification: LocalNotification, seconds: number) => {
    await NotificationService.scheduleWithTrigger(notification, seconds);
  }, []);

  const registerToken = useCallback(async () => {
    if (!expoPushToken) return;
    await NotificationService.registerTokenOnBackend(expoPushToken);
    setPushTokenRegistered(true);
  }, [expoPushToken]);

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        lastNotification,
        pushTokenRegistered,
        schedule,
        scheduleDelayed,
        registerToken,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
