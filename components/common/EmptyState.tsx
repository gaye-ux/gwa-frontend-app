import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon = 'search-outline', title, subtitle }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-10 py-20">
      <View className="w-20 h-20 rounded-full bg-gwa-card items-center justify-center mb-4 border border-gwa-border">
        <Ionicons name={icon} size={36} color="#8FA0BA" />
      </View>
      <Text className="text-white text-lg font-bold text-center">{title}</Text>
      {subtitle && (
        <Text className="text-gwa-muted text-sm text-center mt-2">{subtitle}</Text>
      )}
    </View>
  );
}
