import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NotificationItem } from '@/components/common/NotificationItem';
import { EmptyState } from '@/components/common/EmptyState';
import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from '@/services/dataService';
import { AppNotification } from '@/services/types';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetchNotifications().then(data => {
      setNotifications(data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handlePress = async (item: AppNotification) => {
    if (!item.read) {
      await markNotificationRead(item.id);
      setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
    }
    if (item.link) router.push(item.link as any);
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-3 border-b border-gwa-border">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3" activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#E98C8C" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Notifications</Text>
          {unreadCount > 0 && (
            <View className="ml-3 bg-gwa-accent px-2 py-0.5 rounded-full">
              <Text className="text-white text-xs font-bold">{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
            <Text className="text-gwa-accent text-xs font-bold uppercase tracking-wider">Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#E53E3E" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState icon="notifications-outline" title="No notifications" subtitle="You're all caught up!" />
          }
          renderItem={({ item }) => (
            <NotificationItem notification={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
}
