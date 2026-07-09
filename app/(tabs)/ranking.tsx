import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { wrestlers, ekiriList, rankingCategories } from '@/services/data';
import { fetchRankings, fetchEkiriList } from '@/services/dataService';
import KingFighterCard from '@/components/ranking/KingFighterCard';
import FighterRankRow from '@/components/ranking/FighterRankRow';
import ClanRankRow from '@/components/ranking/ClanRankRow';
import type { Wrestler, Ekiri } from '@/services/types';

type RankTab = 'fighters' | 'clans';

export default function RankingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RankTab>('fighters');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [fighters, setFighters] = useState<Wrestler[]>([]);
  const [clans, setClans] = useState<Ekiri[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchRankings().then(setFighters).catch(() => {}),
      fetchEkiriList().then(setClans).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const sortedFighters = fighters.length > 0
    ? [...fighters].sort((a, b) => (b.points || 0) - (a.points || 0))
    : [...wrestlers].sort((a, b) => (b.points || 0) - (a.points || 0));
  const sortedClans = clans.length > 0
    ? [...clans].sort((a, b) => b.totalVictories - a.totalVictories)
    : [...ekiriList].sort((a, b) => b.totalVictories - a.totalVictories);

  const kingFighter = sortedFighters[0];
  const restFighters = sortedFighters.slice(1);

  if (loading) {
    return (
      <View className="flex-1 bg-gwa-dark items-center justify-center">
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gwa-dark">
      <View className="px-5 pb-4 pt-4 border-b border-gwa-border bg-gwa-dark" style={{ marginTop: 16 }}>
        <Text className="text-white text-2xl font-black italic tracking-widest uppercase mb-4">Rankings</Text>
        <View className="flex-row bg-gwa-card rounded-xl p-1 border border-gwa-border mb-3">
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => setActiveTab('fighters')}
            className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'fighters' ? 'bg-gwa-accent' : 'bg-transparent'}`}>
            <Text className={`text-xs font-black uppercase tracking-wider ${activeTab === 'fighters' ? 'text-white' : 'text-gwa-muted'}`}>Fighters</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => setActiveTab('clans')}
            className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'clans' ? 'bg-gwa-accent' : 'bg-transparent'}`}>
            <Text className={`text-xs font-black uppercase tracking-wider ${activeTab === 'clans' ? 'text-white' : 'text-gwa-muted'}`}>Ekiri</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'fighters' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {rankingCategories.map((cat, i) => (
                <TouchableOpacity key={cat.id}
                  onPress={() => setCategoryIndex(i)}
                  className={`px-3 py-1.5 rounded-lg ${i === categoryIndex ? 'bg-gwa-accent' : 'bg-gwa-card'}`}>
                  <Text className={`text-xs font-bold uppercase tracking-wider ${i === categoryIndex ? 'text-white' : 'text-gwa-muted'}`}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {activeTab === 'fighters' ? (
          <>
            <KingFighterCard fighter={kingFighter} />
            {restFighters.map((fighter, i) => (
              <FighterRankRow key={fighter.id} fighter={fighter} rank={i + 2} />
            ))}
          </>
        ) : (
          sortedClans.map((clan, i) => <ClanRankRow key={clan.id} clan={clan} rank={i + 1} />)
        )}
      </ScrollView>
    </View>
  );
}
