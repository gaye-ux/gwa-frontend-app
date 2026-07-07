import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { arenaLiveMatch, seasonCalendarEvents } from '@/services/homeData';
import FeaturedLiveStream from '@/components/live/FeaturedLiveStream';
import UpcomingBroadcastCard from '@/components/live/UpcomingBroadcastCard';

export default function LiveScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#0D1527]">
            {/* Header Section */}
            <View 
                className="px-5 pb-4 border-b border-[#1E293B] bg-[#0D1527] z-10"
                style={{ paddingTop: insets.top + 16 }}
            >
                <Text className="text-white text-2xl font-black italic tracking-widest uppercase flex-row items-center">
                    Arena <Text className="text-[#E53E3E]">Live</Text>
                </Text>
            </View>

            {/* Hub Content */}
            <ScrollView 
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Currently Streaming */}
                <Text className="text-white text-base font-bold uppercase tracking-wider mb-2">
                    Streaming Now
                </Text>
                <FeaturedLiveStream match={arenaLiveMatch} />

                {/* Upcoming Schedule */}
                <View className="mt-8">
                    <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
                        Upcoming Broadcasts
                    </Text>
                    
                    {seasonCalendarEvents.map((event) => (
                        <UpcomingBroadcastCard key={event.id} event={event} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}