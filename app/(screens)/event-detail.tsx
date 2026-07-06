import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { currentEvent, getMainCombat } from '@/services/homeData';
import EventHero from '@/components/event/EventHero';
import MainMatchup from '@/components/event/MainMatchup';
import FullFightCard from '@/components/event/FullFightCard';
import BottomTicketBar from '@/components/event/BottomTicketBar';

export default function EventDetailScreen() {
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // In a real app, fetch event by ID — for now, use dummy data
    const event = currentEvent;
    const mainCombat = getMainCombat(event);

    return (
        <View className="flex-1 bg-gwa-dark">
            {/* Back button — floating over hero */}
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                className="absolute z-50 bg-gwa-dark/60 rounded-full w-10 h-10 items-center justify-center"
                style={{
                    top: insets.top + 8,
                    left: 16,
                }}
            >
                <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Event Hero — Stadium bg, badges, title, tickets */}
                <EventHero event={event} />

                {/* Main Combat Matchup */}
                {mainCombat && <MainMatchup combat={mainCombat} />}

                {/* Full Fight Card */}
                <FullFightCard combats={event.combats} />
            </ScrollView>

            {/* Sticky bottom ticket bar */}
            <BottomTicketBar startingPrice={event.startingPrice} />
        </View>
    );
}
