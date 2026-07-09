import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NotificationItem } from '@/components/common/NotificationItem';
import { EmptyState } from '@/components/common/EmptyState';
import { getNotifications } from '@/services/notificationsService';
import { AppNotification } from '@/services/types';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notifications] = useState<AppNotification[]>(getNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
      {/* Header */}
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
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="notifications-outline"
            title="No notifications"
            subtitle="You're all caught up!"
          />
        }
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => {
              // Future: navigate to the relevant screen
            }}
          />
        )}
      />
    </View>
  );
}
