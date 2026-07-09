import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchEvent, fetchCombats, fetchWrestler } from '@/services/dataService';
import EventHero from '@/components/event/EventHero';
import CombatCard from '@/components/event/CombatCard';
import BottomTicketBar from '@/components/event/BottomTicketBar';
import type { GwaEvent, Combat } from '@/services/types';

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [event, setEvent] = useState<GwaEvent | null>(null);
  const [combats, setCombats] = useState<Combat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    Promise.all([
      fetchEvent(eventId).then(setEvent),
      fetchCombats(eventId).then(setCombats),
    ]).catch(() => {}).finally(() => setLoading(false));
  }, [eventId]);

  if (loading) {
    return (
      <View className="flex-1 bg-gwa-dark items-center justify-center">
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 bg-gwa-dark items-center justify-center">
        <Text className="text-gwa-muted text-base">Event not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gwa-dark">
      <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}
        className="absolute z-50 bg-black/40 rounded-full w-10 h-10 items-center justify-center"
        style={{ top: insets.top + 8, left: 16 }}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <EventHero event={event} />

        <View className="px-5 mt-6">
          <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-6">
            <Text className="text-white text-lg font-bold mb-3">{event.title}</Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar-outline" size={16} color="#8FA0BA" />
              <Text className="text-gwa-muted text-sm ml-2">{event.date} • {event.time}</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={16} color="#8FA0BA" />
              <Text className="text-gwa-muted text-sm ml-2">{event.venue}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="pricetag-outline" size={16} color="#E53E3E" />
              <Text className="text-gwa-accent text-sm font-bold ml-2">From {event.startingPrice}</Text>
            </View>
          </View>
        </View>

        {combats.length > 0 && (
          <View className="px-5 mb-8">
            <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
              Fight Card ({combats.length})
            </Text>
            {combats.map((combat) => (
              <CombatCard key={combat.id} combat={combat} />
            ))}
          </View>
        )}
      </ScrollView>

      <BottomTicketBar />
    </View>
  );
}
