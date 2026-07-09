import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchEkiri } from '@/services/dataService';
import { EkiriCard } from '@/components/ekiri/EkiriCard';
import { EmptyState } from '@/components/common/EmptyState';
import type { Ekiri } from '@/services/types';

export default function EkiriProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [ekiri, setEkiri] = useState<Ekiri | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEkiri(id).then(e => {
      if (e) {
        setEkiri(e);
        setMembers((e as any).__members || []);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-gwa-dark items-center justify-center" style={{ paddingTop: insets.top }}>
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

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
        <View className="relative h-48">
          <View className="w-full h-full" style={{ backgroundColor: ekiri.bannerColor }} />
          <LinearGradient colors={['transparent', '#0D1117']} className="absolute inset-0" locations={[0.4, 1]} />
          <TouchableOpacity onPress={() => router.back()}
            className="absolute top-12 left-4 z-20 bg-black/40 rounded-full w-10 h-10 items-center justify-center">
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="items-center -mt-16 z-10 px-5">
          <Image source={ekiri.logo} className="w-24 h-24 rounded-2xl border-2 border-gwa-border mb-4" />
          <Text className="text-white text-2xl font-black uppercase tracking-widest mb-1">{ekiri.name}</Text>
          <View className="flex-row items-center gap-4 mt-1">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#8FA0BA" />
              <Text className="text-gwa-muted text-xs font-medium ml-1">{ekiri.location}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="flag-outline" size={14} color="#8FA0BA" />
              <Text className="text-gwa-muted text-xs font-medium ml-1">Rank #{ekiri.ranking}</Text>
            </View>
          </View>
        </View>

        {ekiri.description ? (
          <View className="px-5 mt-6">
            <Text className="text-white text-base font-bold mb-2">About</Text>
            <Text className="text-gwa-muted text-sm leading-relaxed">{ekiri.description}</Text>
          </View>
        ) : null}

        {members.length > 0 && (
          <View className="px-5 mt-8">
            <Text className="text-white text-base font-bold mb-4 uppercase tracking-wider">Members ({members.length})</Text>
            {members.map((w: any) => (
              <View key={w.id} className="flex-row items-center bg-gwa-card rounded-2xl p-4 mb-3 border border-gwa-border">
                <Image source={w.image} className="w-12 h-12 rounded-full" resizeMode="cover" />
                <View className="ml-3 flex-1">
                  <Text className="text-white text-sm font-bold uppercase">{w.name}</Text>
                  <Text className="text-gwa-muted text-xs">{w.nickname} · #{w.currentRanking}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
