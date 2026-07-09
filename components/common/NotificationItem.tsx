import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AppNotification } from '@/services/types';

const typeConfig: Record<AppNotification['type'], { icon: React.ReactNode; color: string }> = {
  event: { icon: <Ionicons name="calendar" size={18} color="#3B82F6" />, color: '#3B82F6' },
  ticket: { icon: <MaterialIcons name="confirmation-number" size={18} color="#10B981" />, color: '#10B981' },
  ranking: { icon: <Ionicons name="trophy" size={18} color="#F59E0B" />, color: '#F59E0B' },
  news: { icon: <Ionicons name="newspaper" size={18} color="#8B5CF6" />, color: '#8B5CF6' },
  combat: { icon: <MaterialCommunityIcons name="sword-cross" size={18} color="#E53E3E" />, color: '#E53E3E' },
};

interface NotificationItemProps {
  notification: AppNotification;
  onPress?: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const config = typeConfig[notification.type];

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-start px-5 py-4 ${!notification.read ? 'bg-gwa-accent/5' : ''}`}
      activeOpacity={0.7}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: config.color + '20' }}
      >
        {config.icon}
      </View>
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className={`text-sm font-bold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
            {notification.title}
          </Text>
          {!notification.read && (
            <View className="w-2 h-2 rounded-full bg-gwa-accent" />
          )}
        </View>
        <Text className="text-gwa-muted text-xs mt-1 leading-5" numberOfLines={2}>
          {notification.body}
        </Text>
        <Text className="text-gwa-muted/60 text-[10px] mt-1.5 uppercase tracking-wider">
          {notification.timestamp}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
