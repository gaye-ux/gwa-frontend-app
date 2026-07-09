import React from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';

import HeroBanner from '@/components/home/HeroBanner';
import ArenaLiveCard from '@/components/home/ArenaLiveCard';
import SeasonCalendar from '@/components/home/SeasonCalendar';
import ArenaPulse from '@/components/home/ArenaPulse';
import { useHomeData } from '@/hooks/useHomeData';

export default function Home() {
  const { mainEvent, events, news, ready } = useHomeData();

  if (!ready) {
    return (
      <View className="flex-1 bg-gwa-dark items-center justify-center">
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gwa-dark">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HeroBanner event={mainEvent} />
        <ArenaLiveCard />
        <SeasonCalendar />
        <ArenaPulse articles={news} />
      </ScrollView>
    </View>
  );
}
