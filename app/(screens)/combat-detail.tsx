import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getCombat, getWrestler, getHeadToHead } from '@/services/data';
import { HeadToHeadCard } from '@/components/wrestler/HeadToHead';
import { EmptyState } from '@/components/common/EmptyState';

export default function CombatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const combat = getCombat(id || '');

  if (!combat) {
    return (
      <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
        <EmptyState icon="shield-outline" title="Combat not found" />
      </View>
    );
  }

  const fighter1 = getWrestler(combat.fighter1Id);
  const fighter2 = getWrestler(combat.fighter2Id);
  const h2h = getHeadToHead(combat.fighter1Id, combat.fighter2Id);

  if (!fighter1 || !fighter2) {
    return (
      <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
        <EmptyState icon="warning-outline" title="Fighter data missing" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gwa-dark">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Fighter Matchup Hero */}
        <View className="relative h-64">
          <View className="absolute inset-0 flex-row">
            <View className="flex-1 bg-gradient-to-r from-gwa-card to-transparent" />
            <View className="flex-1" />
          </View>
          <LinearGradient colors={['transparent', '#0D1117']} className="absolute inset-0" locations={[0.5, 1]} />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 items-center justify-center z-10"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-end pb-6 px-5">
            {/* Fighter 1 */}
            <TouchableOpacity
              onPress={() => router.push(`/(screens)/wrestler-profile?id=${fighter1.id}` as any)}
              className="flex-1 items-center"
              activeOpacity={0.7}
            >
              <Image source={fighter1.image} className="w-24 h-24 rounded-full border-2 border-gwa-accent" />
              <Text className="text-white text-sm font-bold mt-2 text-center">{fighter1.name}</Text>
              <Text className="text-gwa-muted text-[10px] mt-0.5">{fighter1.ekiriName}</Text>
              <Text className="text-white text-lg font-black mt-1">{fighter1.points}</Text>
            </TouchableOpacity>

            {/* VS */}
            <View className="items-center px-4">
              <View className="bg-gwa-accent px-4 py-2 rounded-full">
                <Text className="text-white text-lg font-black">VS</Text>
              </View>
              {combat.championship && (
                <Text className="text-gwa-muted text-[10px] mt-2 text-center uppercase tracking-wider">
                  {combat.championship}
                </Text>
              )}
            </View>

            {/* Fighter 2 */}
            <TouchableOpacity
              onPress={() => router.push(`/(screens)/wrestler-profile?id=${fighter2.id}` as any)}
              className="flex-1 items-center"
              activeOpacity={0.7}
            >
              <Image source={fighter2.image} className="w-24 h-24 rounded-full border-2 border-[#3B82F6]" />
              <Text className="text-white text-sm font-bold mt-2 text-center">{fighter2.name}</Text>
              <Text className="text-gwa-muted text-[10px] mt-0.5">{fighter2.ekiriName}</Text>
              <Text className="text-white text-lg font-black mt-1">{fighter2.points}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 -mt-2">
          {/* Status Bar */}
          <View className="bg-gwa-card rounded-2xl border border-gwa-border p-4 mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className={`w-2.5 h-2.5 rounded-full mr-2 ${
                    combat.status === 'live' ? 'bg-gwa-live' : combat.status === 'finished' ? 'bg-green-400' : 'bg-gwa-muted'
                  }`}
                />
                <Text className="text-white text-sm font-bold uppercase tracking-wider">
                  {combat.status === 'live' ? 'Live Now' : combat.status === 'finished' ? 'Finished' : 'Upcoming'}
                </Text>
              </View>
              {combat.round && (
                <Text className="text-gwa-muted text-xs">{combat.round}</Text>
              )}
              {combat.duration && (
                <Text className="text-gwa-muted text-xs">{combat.duration}</Text>
              )}
            </View>
            {combat.referee && (
              <View className="flex-row items-center mt-2 pt-2 border-t border-gwa-border">
                <Ionicons name="shield-outline" size={14} color="#8FA0BA" />
                <Text className="text-gwa-muted text-xs ml-1.5">Referee: {combat.referee}</Text>
              </View>
            )}
          </View>

          {/* Fighter Quick Comparison */}
          <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
            <Text className="text-white text-sm font-bold tracking-wider uppercase mb-4">Fighter Comparison</Text>
            <View className="flex-row">
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Record</Text>
                <Text className="text-white text-sm font-bold">{fighter1.wins}-{fighter1.losses}-{fighter1.draws}</Text>
              </View>
              <View className="px-4 items-center justify-center">
                <Text className="text-gwa-muted text-xs">VS</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Record</Text>
                <Text className="text-white text-sm font-bold">{fighter2.wins}-{fighter2.losses}-{fighter2.draws}</Text>
              </View>
            </View>
            <View className="flex-row mt-4 pt-4 border-t border-gwa-border">
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">KO %</Text>
                <Text className="text-white text-sm font-bold">{((fighter1.knockouts / fighter1.totalFights) * 100).toFixed(0)}%</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Height</Text>
                <Text className="text-white text-sm font-bold">{fighter1.height}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Weight</Text>
                <Text className="text-white text-sm font-bold">{fighter1.weight}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Style</Text>
                <Text className="text-white text-[10px] font-bold">{fighter1.fightingStyle}</Text>
              </View>
            </View>
            <View className="flex-row mt-2">
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">KO %</Text>
                <Text className="text-white text-sm font-bold">{((fighter2.knockouts / fighter2.totalFights) * 100).toFixed(0)}%</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Height</Text>
                <Text className="text-white text-sm font-bold">{fighter2.height}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Weight</Text>
                <Text className="text-white text-sm font-bold">{fighter2.weight}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-gwa-muted text-[10px] uppercase tracking-wider mb-2">Style</Text>
                <Text className="text-white text-[10px] font-bold">{fighter2.fightingStyle}</Text>
              </View>
            </View>
          </View>

          {/* Head to Head */}
          {h2h && (
            <View className="mb-4">
              <HeadToHeadCard
                headToHead={h2h}
                fighter1={fighter1}
                fighter2={fighter2}
              />
            </View>
          )}

          {/* Odds */}
          {combat.odds1 && combat.odds2 && (
            <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
              <Text className="text-white text-sm font-bold tracking-wider uppercase mb-4">Betting Odds</Text>
              <View className="flex-row">
                <View className="flex-1 items-center bg-green-900/30 rounded-xl py-3 border border-green-600/30">
                  <Text className="text-green-400 text-lg font-black">{combat.odds1}</Text>
                  <Text className="text-green-400/70 text-xs mt-1">{fighter1.name}</Text>
                </View>
                <View className="px-3 items-center justify-center">
                  <Text className="text-gwa-muted text-xs font-bold">VS</Text>
                </View>
                <View className="flex-1 items-center bg-red-900/30 rounded-xl py-3 border border-red-600/30">
                  <Text className="text-red-400 text-lg font-black">{combat.odds2}</Text>
                  <Text className="text-red-400/70 text-xs mt-1">{fighter2.name}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
