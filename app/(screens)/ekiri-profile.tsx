import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getEkiri } from '@/services/data';
import { getWrestlersByEkiri } from '@/services/data';
import { EkiriCard } from '@/components/ekiri/EkiriCard';
import { EmptyState } from '@/components/common/EmptyState';

export default function EkiriProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const ekiri = getEkiri(id || '');
  const members = ekiri ? getWrestlersByEkiri(ekiri.id) : [];

  if (!ekiri) {
    return (
      <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
        <EmptyState icon="people-outline" title="Ekiri not found" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gwa-dark">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Banner */}
        <View className="relative h-48">
          <View className="w-full h-full" style={{ backgroundColor: ekiri.bannerColor }} />
          <LinearGradient
            colors={['transparent', '#0D1117']}
            className="absolute inset-0"
            locations={[0.4, 1]}
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          <View className="absolute bottom-0 left-0 right-0 px-6 pb-5">
            <View className="flex-row items-end justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden bg-gwa-card">
                  <Image source={ekiri.logo} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="ml-4">
                  <Text className="text-white text-2xl font-black">{ekiri.name}</Text>
                  <Text className="text-white/80 text-sm">{ekiri.location}</Text>
                </View>
              </View>
              <View className="bg-white/20 px-3 py-1.5 rounded-full">
                <Text className="text-white text-xs font-bold">#{ekiri.ranking}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 -mt-2">
          {/* Quick Stats */}
          <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
            <View className="flex-row">
              <View className="flex-1 items-center">
                <Text className="text-white text-2xl font-black">{ekiri.totalVictories}</Text>
                <Text className="text-gwa-muted text-xs uppercase tracking-wider mt-1">Total Wins</Text>
              </View>
              <View className="flex-1 items-center border-x border-gwa-border">
                <Text className="text-white text-2xl font-black">{ekiri.totalTitles}</Text>
                <Text className="text-gwa-muted text-xs uppercase tracking-wider mt-1">Titles</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-white text-2xl font-black">{ekiri.totalFights}</Text>
                <Text className="text-gwa-muted text-xs uppercase tracking-wider mt-1">Fights</Text>
              </View>
            </View>
          </View>

          {/* Description & History */}
          <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
            <Text className="text-white text-sm font-bold tracking-wider uppercase mb-3">About</Text>
            <Text className="text-gray-300 text-sm leading-6 mb-4">{ekiri.description}</Text>
            <Text className="text-white text-sm font-bold tracking-wider uppercase mb-3">History</Text>
            <Text className="text-gray-300 text-sm leading-6">{ekiri.history}</Text>

            <View className="flex-row items-center mt-4 pt-4 border-t border-gwa-border gap-4">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={14} color="#8FA0BA" />
                <Text className="text-gwa-muted text-xs ml-1">Founded {ekiri.founded}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={14} color="#8FA0BA" />
                <Text className="text-gwa-muted text-xs ml-1">{ekiri.coach}</Text>
              </View>
            </View>
          </View>

          {/* Wrestlers */}
          <Text className="text-white text-sm font-bold tracking-wider uppercase mb-3 ml-1">
            Wrestlers ({members.length})
          </Text>
          {members.map((w) => (
            <TouchableOpacity
              key={w.id}
              onPress={() => router.push(`/(screens)/wrestler-profile?id=${w.id}` as any)}
              className="bg-gwa-card rounded-xl border border-gwa-border p-4 mb-2 flex-row items-center"
              activeOpacity={0.7}
            >
              <Image source={w.image} className="w-12 h-12 rounded-full" />
              <View className="flex-1 ml-3">
                <Text className="text-white text-sm font-bold">{w.name}</Text>
                <Text className="text-gwa-muted text-xs mt-0.5">"{w.nickname}"</Text>
              </View>
              <View className="items-end">
                <Text className="text-white text-xs font-bold">#{w.currentRanking}</Text>
                <Text className="text-gwa-muted text-[10px]">{w.wins}-{w.losses}-{w.draws}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
