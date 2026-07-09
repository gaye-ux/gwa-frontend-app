import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import UpcomingEventCard from '@/components/cards/eventCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchEvents } from '@/services/dataService';
import type { GwaEvent } from '@/services/types';

enum EventFilter { All = 'All', Upcoming = 'Upcoming', Past = 'Past' }

export default function Events() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = React.useState<EventFilter>(EventFilter.All);
  const [events, setEvents] = useState<GwaEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const live = events.filter(e => e.status === 'live');
  const upcoming = events.filter(e => e.status === 'upcoming');
  const past = events.filter(e => e.status === 'finished');

  const filtered = filter === EventFilter.All ? events : filter === EventFilter.Upcoming ? [...live, ...upcoming] : past;

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
        <Text className="text-white text-2xl font-black italic tracking-widest uppercase mb-4">Events</Text>
        <View className="flex-row bg-gwa-card rounded-xl p-1 border border-gwa-border">
          {([EventFilter.All, EventFilter.Upcoming, EventFilter.Past] as const).map((f) => (
            <TouchableOpacity key={f} activeOpacity={0.8}
              onPress={() => setFilter(f)}
              className={`flex-1 py-2.5 items-center rounded-lg ${filter === f ? 'bg-gwa-accent' : 'bg-transparent'}`}>
              <Text className={`text-xs font-black uppercase tracking-wider ${filter === f ? 'text-white' : 'text-gwa-muted'}`}>
                {f === EventFilter.All ? `All (${events.length})` : f === EventFilter.Upcoming ? `Upcoming (${upcoming.length + live.length})` : `Past (${past.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <Text className="text-gwa-muted text-center mt-10">No events found</Text>
        ) : (
          filtered.map((event) => <UpcomingEventCard key={event.id} event={event} />)
        )}
      </ScrollView>
    </View>
  );
}
