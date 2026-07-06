import React from 'react';
import { ScrollView, View } from 'react-native';

import HeroBanner from '@/components/home/HeroBanner';
import ArenaLiveCard from '@/components/home/ArenaLiveCard';
import SeasonCalendar from '@/components/home/SeasonCalendar';
import ArenaPulse from '@/components/home/ArenaPulse';

export default function Home() {
    return (
        <View className="flex-1 bg-gwa-dark">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Hero — Main Event */}
                <HeroBanner />

                {/* Arena Live */}
                <ArenaLiveCard />

                {/* Season Calendar */}
                <SeasonCalendar />

                {/* The Arena Pulse */}
                <ArenaPulse />
            </ScrollView>
        </View>
    );
}