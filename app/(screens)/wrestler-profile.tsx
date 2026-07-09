import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchWrestler, fetchCombats } from '@/services/dataService';
import { WrestlerHero } from '@/components/wrestler/WrestlerHero';
import { WrestlerStats } from '@/components/wrestler/WrestlerStats';
import { WrestlerInfo } from '@/components/wrestler/WrestlerInfo';
import { FormIndicator } from '@/components/wrestler/FormIndicator';
import { EmptyState } from '@/components/common/EmptyState';
import type { Wrestler, Combat } from '@/services/types';

export default function WrestlerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [wrestler, setWrestler] = useState<Wrestler | null>(null);
  const [combats, setCombats] = useState<Combat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchWrestler(id).then(w => {
      if (w) setWrestler(w);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-gwa-dark items-center justify-center" style={{ paddingTop: insets.top }}>
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  if (!wrestler) {
    return (
      <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
        <EmptyState icon="person-outline" title="Wrestler not found" subtitle="This wrestler does not exist." />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gwa-dark">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <WrestlerHero wrestler={wrestler} />
        <WrestlerStats wrestler={wrestler} />
        <WrestlerInfo wrestler={wrestler} />
        <FormIndicator results={wrestler.last5Results} />
      </ScrollView>
    </View>
  );
}
