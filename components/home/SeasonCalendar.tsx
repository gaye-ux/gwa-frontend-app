import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader from './SectionHeader';
import { seasonCalendarEvents, SeasonCalendarEvent } from '@/services/homeData';

// ---------------------------------------------------------------------------
// Single calendar card
// ---------------------------------------------------------------------------
function CalendarCard({ event }: { event: SeasonCalendarEvent }) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            className="mr-3"
            style={{ width: 200 }}
        >
            <View className="bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border">
                {/* Thumbnail with date badge */}
                <View className="relative">
                    <Image
                        source={event.thumbnail}
                        style={{ width: 200, height: 140 }}
                        resizeMode="cover"
                    />
                    {/* Bottom gradient */}
                    <LinearGradient
                        colors={['transparent', 'rgba(19,27,46,0.9)']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 60,
                        }}
                    />
                    {/* Date badge */}
                    <View className="absolute top-2.5 left-2.5 bg-gwa-red/90 rounded-lg px-2.5 py-1">
                        <Text className="text-white text-[11px] font-bold">
                            {event.date}
                        </Text>
                    </View>
                </View>

                {/* Info */}
                <View className="px-3 py-3">
                    <Text
                        className="text-white text-sm font-bold uppercase leading-tight"
                        numberOfLines={2}
                    >
                        {event.title}
                    </Text>
                    <View className="flex-row items-center mt-1.5">
                        <Text className="text-gwa-muted text-xs font-medium">
                            {event.location}
                        </Text>
                    </View>
                    <View className="mt-2 self-start bg-gwa-border rounded px-2 py-0.5">
                        <Text className="text-gwa-muted text-[10px] font-semibold uppercase tracking-wider">
                            {event.type}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// ---------------------------------------------------------------------------
// SeasonCalendar
// ---------------------------------------------------------------------------
export default function SeasonCalendar() {
    return (
        <View className="mt-8">
            <SectionHeader title="SEASON CALENDAR" actionText="Full Schedule" />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
            >
                {seasonCalendarEvents.map((event) => (
                    <CalendarCard key={event.id} event={event} />
                ))}
            </ScrollView>
        </View>
    );
}
