import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getEvent, getCombatsForEvent, getWrestler, getMainEvent } from '@/services/data';
import EventHero from '@/components/event/EventHero';
import CombatCard from '@/components/event/CombatCard';
import BottomTicketBar from '@/components/event/BottomTicketBar';

export default function EventDetailScreen() {
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const event = getEvent(eventId || '') || getMainEvent();
    const combats = event ? getCombatsForEvent(event.id) : [];

    if (!event) {
        return (
            <View className="flex-1 bg-gwa-dark items-center justify-center">
                <Text className="text-gwa-muted text-base">Event not found</Text>
            </View>
        );
    }

    const headliner1 = getWrestler(event.fighter1Id);
    const headliner2 = getWrestler(event.fighter2Id);

    return (
        <View className="flex-1 bg-gwa-dark">
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                className="absolute z-50 bg-black/40 rounded-full w-10 h-10 items-center justify-center"
                style={{ top: insets.top + 8, left: 16 }}
            >
                <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <EventHero event={event} />

                {/* Event Info */}
                <View className="px-5 mt-6">
                    <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-6">
                        <Text className="text-white text-sm font-bold tracking-wider uppercase mb-2">
                            About This Event
                        </Text>
                        <Text className="text-gray-300 text-sm leading-6">{event.description}</Text>

                        {headliner1 && headliner2 && (
                            <View className="flex-row mt-4 pt-4 border-t border-gwa-border gap-3">
                                <TouchableOpacity
                                    onPress={() => router.push(`/(screens)/wrestler-profile?id=${headliner1.id}` as any)}
                                    className="flex-1 bg-gwa-border/50 rounded-xl p-3 items-center"
                                    activeOpacity={0.7}
                                >
                                    <Text className="text-gwa-accent text-xs font-bold uppercase tracking-wider">Headliner</Text>
                                    <Text className="text-white text-sm font-bold mt-1 text-center">{headliner1.name}</Text>
                                    <Text className="text-gwa-muted text-[10px]">{headliner1.ekiriName}</Text>
                                </TouchableOpacity>
                                <Text className="text-gwa-muted text-lg font-black self-center">VS</Text>
                                <TouchableOpacity
                                    onPress={() => router.push(`/(screens)/wrestler-profile?id=${headliner2.id}` as any)}
                                    className="flex-1 bg-gwa-border/50 rounded-xl p-3 items-center"
                                    activeOpacity={0.7}
                                >
                                    <Text className="text-gwa-accent text-xs font-bold uppercase tracking-wider">Headliner</Text>
                                    <Text className="text-white text-sm font-bold mt-1 text-center">{headliner2.name}</Text>
                                    <Text className="text-gwa-muted text-[10px]">{headliner2.ekiriName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {event.sponsors.length > 0 && (
                            <View className="mt-4 pt-4 border-t border-gwa-border">
                                <Text className="text-gwa-muted text-[10px] font-bold uppercase tracking-wider mb-2">Sponsors</Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {event.sponsors.map((s, i) => (
                                        <View key={i} className="bg-gwa-border/50 px-3 py-1.5 rounded-lg border border-gwa-border">
                                            <Text className="text-gwa-muted text-xs">{s}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Combats */}
                <View className="px-5">
                    <View className="flex-row items-center mb-5">
                        <View className="w-1 h-5 bg-gwa-accent mr-2" />
                        <Text className="text-white text-[15px] font-black italic tracking-wide uppercase">
                            Fight Card ({combats.length})
                        </Text>
                    </View>

                    {combats.length > 0 ? (
                        combats.map((combat) => (
                            <CombatCard key={combat.id} combat={combat} />
                        ))
                    ) : (
                        <View className="bg-gwa-card rounded-2xl border border-gwa-border p-8 items-center">
                            <Ionicons name="shield-outline" size={32} color="#8FA0BA" />
                            <Text className="text-gwa-muted text-sm mt-3 text-center">
                                Fight card not yet announced
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <BottomTicketBar />
        </View>
    );
}
