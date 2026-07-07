import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { currentEvent, upcomingEvents } from '@/services/homeData';
import TicketTierCard from '@/components/tickets/TicketTierCard';

export default function BuyTicketsScreen() {
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Find event, default to currentEvent if not found or no ID provided
    const event = upcomingEvents.find(e => e.id === eventId) || currentEvent;

    // State for selected ticket tier - Default to the first (Standard) option
    const defaultSelected = event.tickets[0]?.name || 'STANDARD';
    const [selectedTierName, setSelectedTierName] = useState<string>(defaultSelected);

    return (
        <View className="flex-1 bg-[#0D1527]">
            {/* Header */}
            <View
                className="flex-row items-center px-5 pb-4 border-b border-[#1E293B] bg-[#0D1527] z-10"
                style={{ paddingTop: insets.top + 8 }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    className="w-10 h-10 items-center justify-center bg-[#18233A] rounded-full mr-4"
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-black italic tracking-widest uppercase flex-1">
                    Select Tickets
                </Text>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Event Summary Card */}
                <View className="bg-[#18233A] rounded-2xl overflow-hidden mb-8 border border-[#1E293B]">
                    <View className="flex-row items-stretch">
                        <Image
                            source={event.heroImage}
                            style={{ width: 100, height: 100 }}
                            resizeMode="cover"
                        />
                        <View className="flex-1 p-3 justify-center">
                            <Text className="text-[#FBBF24] text-[9px] font-black tracking-widest uppercase mb-1">
                                {event.badge}
                            </Text>
                            <Text className="text-white text-sm font-black uppercase italic leading-tight mb-0.5" numberOfLines={2}>
                                {event.fighter1Name} <Text className="text-[#E53E3E]">VS</Text> {event.fighter2Name}
                            </Text>
                            <Text className="text-[#8FA0BA] text-[10px] font-bold uppercase tracking-wider mb-2">
                                {event.title}
                            </Text>
                            <View className="flex-row items-center">
                                <Ionicons name="calendar-outline" size={12} color="#8FA0BA" />
                                <Text className="text-[#8FA0BA] text-[10px] font-bold tracking-widest uppercase ml-1 mr-3">
                                    {event.date}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Ticket Tiers */}
                <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
                    Choose Your Experience
                </Text>

                {event.tickets.map((tier) => (
                    <TicketTierCard
                        key={tier.name}
                        tier={tier}
                        isSelected={selectedTierName === tier.name}
                        onSelect={() => setSelectedTierName(tier.name)}
                    />
                ))}
            </ScrollView>

            {/* Bottom Checkout Bar */}
            <View
                className="absolute bottom-0 left-0 right-0 bg-[#0D1527] border-t border-[#1E293B]"
                style={{
                    // Math.max ensures Android gesture-nav phones (insets.bottom=0)
                    // still get a minimum 16px clearance above the screen edge.
                    // Android 3-button nav (insets.bottom ≈ 48px) uses that value.
                    // iOS home-indicator (insets.bottom = 34px) always wins.
                    paddingBottom: Math.max(insets.bottom, 16),
                }}
            >
                <View className="px-5 pt-4 w-full">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="bg-[#E53E3E] rounded-xl py-4 w-full items-center justify-center flex-row"
                        onPress={() => {
                            console.log('Proceed to checkout with tier:', selectedTierName);
                        }}
                    >
                        <Text className="text-white text-base font-black uppercase italic tracking-widest mr-2">
                            Proceed to Checkout
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
