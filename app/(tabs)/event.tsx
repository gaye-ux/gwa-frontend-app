import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import UpcomingEventCard from '@/components/cards/eventCard';
import { upcomingEvents } from '@/services/homeData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Events() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-gwa-dark">
            {/* Header Section */}
            <View 
                className="px-5 pb-4 pt-4 border-b border-gwa-border flex-row justify-between items-center bg-gwa-dark"
                style={{ marginTop: 16 }}
            >
                <Text className="text-white text-2xl font-black italic tracking-widest uppercase">
                    Upcoming Events
                </Text>
                
                {/* LIVE SOON badge */}
                <View className="bg-gwa-red/90 rounded px-2.5 py-1">
                    <Text className="text-white text-[10px] font-extrabold uppercase tracking-widest">
                        Live Soon
                    </Text>
                </View>
            </View>

            {/* List of Events */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {upcomingEvents.map((event) => (
                    <UpcomingEventCard key={event.id} event={event} />
                ))}
            </ScrollView>
        </View>
    );
}