import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { HeadToHead as HeadToHeadType, Wrestler } from '@/services/types';

interface HeadToHeadProps {
  headToHead: HeadToHeadType;
  fighter1: Wrestler;
  fighter2: Wrestler;
  onPress?: () => void;
}

export function HeadToHeadCard({ headToHead, fighter1, fighter2, onPress }: HeadToHeadProps) {
  const total = headToHead.fighter1Wins + headToHead.fighter2Wins + headToHead.draws;
  const pct1 = total > 0 ? (headToHead.fighter1Wins / total) * 100 : 0;
  const pct2 = total > 0 ? (headToHead.fighter2Wins / total) * 100 : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gwa-card rounded-2xl border border-gwa-border p-5"
      activeOpacity={0.8}
    >
      <Text className="text-gwa-muted text-xs font-bold tracking-widest uppercase text-center mb-4">
        Head to Head
      </Text>

      <View className="flex-row items-center justify-between mb-4">
        <View className="items-center flex-1">
          <Image source={fighter1.image} className="w-12 h-12 rounded-full" />
          <Text className="text-white text-xs font-bold mt-2 text-center" numberOfLines={2}>
            {fighter1.name}
          </Text>
          <Text className="text-white text-2xl font-black mt-1">{headToHead.fighter1Wins}</Text>
        </View>

        <View className="items-center px-4">
          <Text className="text-gwa-muted text-lg font-black">VS</Text>
          <Text className="text-gwa-muted text-xs mt-1">{headToHead.draws} Draws</Text>
          <Text className="text-gwa-muted text-xs">{total} Meetings</Text>
        </View>

        <View className="items-center flex-1">
          <Image source={fighter2.image} className="w-12 h-12 rounded-full" />
          <Text className="text-white text-xs font-bold mt-2 text-center" numberOfLines={2}>
            {fighter2.name}
          </Text>
          <Text className="text-white text-2xl font-black mt-1">{headToHead.fighter2Wins}</Text>
        </View>
      </View>

      <View className="flex-row h-2 rounded-full overflow-hidden bg-gwa-border">
        <View style={{ flex: pct1 }} className="bg-gwa-accent" />
        <View style={{ flex: headToHead.draws > 0 ? (headToHead.draws / total) * 100 : 0 }} className="bg-[#F59E0B]" />
        <View style={{ flex: pct2 }} className="bg-[#3B82F6]" />
      </View>

      <View className="flex-row justify-between mt-2">
        <Text className="text-gwa-accent text-xs font-bold">{headToHead.fighter1Wins} W</Text>
        <Text className="text-gwa-muted text-xs">{headToHead.draws} D</Text>
        <Text className="text-[#3B82F6] text-xs font-bold">{headToHead.fighter2Wins} W</Text>
      </View>
    </TouchableOpacity>
  );
}
