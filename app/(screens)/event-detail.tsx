import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { currentEvent } from '@/services/homeData';
import EventHero from '@/components/event/EventHero';
import CombatCard from '@/components/event/CombatCard';
import BottomTicketBar from '@/components/event/BottomTicketBar';

export default function EventDetailScreen() {
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const event = currentEvent;

    return (
        <View className="flex-1 bg-[#0D1527]">
            {/* Back button — floating over hero */}
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                className="absolute z-50 bg-black/40 rounded-full w-10 h-10 items-center justify-center"
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
                contentContainerStyle={{ paddingBottom: 120 }} // Space for sticky bottom bar
            >
                {/* Event Hero */}
                <EventHero event={event} />

                {/* Combats Section */}
                <View className="px-5 mt-8">
                    {/* Section Header */}
                    <View className="flex-row items-center mb-5">
                        {/* Pink vertical bar */}
                        <View className="w-1 h-5 bg-[#E96677] mr-2" />
                        <Text className="text-[#89B4E5] text-[15px] font-black italic tracking-wide uppercase">
                            Combats of the event
                        </Text>
                    </View>

                    {/* Combat Cards */}
                    {event.combats.map((combat) => (
                        <CombatCard key={combat.id} combat={combat} />
                    ))}
                </View>
            </ScrollView>

            {/* Sticky bottom ticket bar */}
            <BottomTicketBar />
        </View>
    );
}
