import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Wrestler } from '@/services/types';

interface WrestlerHeroProps {
  wrestler: Wrestler;
  onBack?: () => void;
}

export function WrestlerHero({ wrestler, onBack }: WrestlerHeroProps) {
  return (
    <View className="relative h-72">
      <Image
        source={wrestler.image}
        className="w-full h-full"
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', '#0D1117']}
        className="absolute inset-0"
        locations={[0.3, 1]}
      />
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
      )}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-5">
        <View className="flex-row items-end justify-between">
          <View className="flex-1">
            <Text className="text-white text-3xl font-black tracking-wider">
              {wrestler.name}
            </Text>
            <Text className="text-gwa-accent text-base font-semibold mt-1">
              "{wrestler.nickname}"
            </Text>
            <View className="flex-row items-center mt-2">
              <View className="bg-gwa-accent/20 px-3 py-1 rounded-full border border-gwa-accent/30">
                <Text className="text-gwa-accent text-xs font-bold tracking-wider">
                  #{wrestler.currentRanking} RANKED
                </Text>
              </View>
              <View className="bg-gwa-card ml-2 px-3 py-1 rounded-full border border-gwa-border">
                <Text className="text-white text-xs font-bold">{wrestler.ekiriName}</Text>
              </View>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-white text-4xl font-black">{wrestler.points}</Text>
            <Text className="text-gwa-muted text-xs tracking-wider uppercase">Points</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
