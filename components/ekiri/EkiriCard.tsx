import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ekiri } from '@/services/types';

interface EkiriCardProps {
  ekiri: Ekiri;
  wrestlerCount: number;
  onPress?: () => void;
}

export function EkiriCard({ ekiri, wrestlerCount, onPress }: EkiriCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gwa-card rounded-2xl border border-gwa-border overflow-hidden"
      activeOpacity={0.8}
    >
      <View className="h-2" style={{ backgroundColor: ekiri.bannerColor }} />
      <View className="p-5">
        <View className="flex-row items-center">
          <View className="w-14 h-14 rounded-full bg-gwa-border items-center justify-center overflow-hidden">
            <Image source={ekiri.logo} className="w-14 h-14" resizeMode="cover" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-white text-lg font-bold">{ekiri.name}</Text>
            <Text className="text-gwa-muted text-xs mt-0.5">{ekiri.location}</Text>
          </View>
          <View className="bg-gwa-accent/20 px-3 py-1.5 rounded-full border border-gwa-accent/30">
            <Text className="text-gwa-accent text-xs font-bold">#{ekiri.ranking}</Text>
          </View>
        </View>

        <View className="flex-row mt-4 pt-4 border-t border-gwa-border gap-4">
          <View className="flex-1 items-center">
            <Text className="text-white text-lg font-black">{ekiri.totalVictories}</Text>
            <Text className="text-gwa-muted text-xs uppercase tracking-wider">Wins</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-white text-lg font-black">{ekiri.totalTitles}</Text>
            <Text className="text-gwa-muted text-xs uppercase tracking-wider">Titles</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-white text-lg font-black">{wrestlerCount}</Text>
            <Text className="text-gwa-muted text-xs uppercase tracking-wider">Wrestlers</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-3">
          <Ionicons name="location-outline" size={14} color="#8FA0BA" />
          <Text className="text-gwa-muted text-xs ml-1">{ekiri.location}</Text>
          <Text className="text-gwa-muted text-xs mx-2">·</Text>
          <Ionicons name="calendar-outline" size={14} color="#8FA0BA" />
          <Text className="text-gwa-muted text-xs ml-1">Founded {ekiri.founded}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
