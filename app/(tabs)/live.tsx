import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { arenaLive, seasonCalendar, getLiveEvents } from '@/services/data';
import FeaturedLiveStream from '@/components/live/FeaturedLiveStream';
import UpcomingBroadcastCard from '@/components/live/UpcomingBroadcastCard';

export default function LiveScreen() {
    const insets = useSafeAreaInsets();
    const liveEvents = getLiveEvents();
    const hasLiveContent = liveEvents.length > 0 || arenaLive.status === 'live';

    return (
        <View className="flex-1 bg-gwa-dark">
            <View className="px-5 pb-4 pt-4 border-b border-gwa-border bg-gwa-dark" style={{ marginTop: 16 }}>
                <View className="flex-row items-center">
                    <Text className="text-white text-2xl font-black italic tracking-widest uppercase flex-1">
                        Arena <Text className="text-gwa-red">Live</Text>
                    </Text>
                    {hasLiveContent && (
                        <View className="bg-gwa-live/20 px-3 py-1 rounded-full border border-gwa-live/30 flex-row items-center">
                            <View className="w-2 h-2 rounded-full bg-gwa-live mr-1.5" />
                            <Text className="text-gwa-live text-xs font-bold uppercase tracking-wider">Live</Text>
                        </View>
                    )}
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Currently Streaming */}
                {hasLiveContent && (
                    <>
                        <Text className="text-white text-base font-bold uppercase tracking-wider mb-2">
                            Streaming Now
                        </Text>
                        <FeaturedLiveStream match={arenaLive} />

                        {/* Live Event Details */}
                        {liveEvents.length > 0 && (
                            <View className="bg-gwa-card rounded-2xl border border-gwa-border p-4 mt-4 mb-6">
                                <Text className="text-gwa-muted text-xs font-bold uppercase tracking-wider mb-2">Live Events</Text>
                                {liveEvents.map((evt) => (
                                    <View key={evt.id} className="flex-row items-center py-2 border-b border-gwa-border last:border-b-0">
                                        <View className="w-2 h-2 rounded-full bg-gwa-live mr-3" />
                                        <View className="flex-1">
                                            <Text className="text-white text-sm font-bold">{evt.title}</Text>
                                            <Text className="text-gwa-muted text-xs">{evt.venue}</Text>
                                        </View>
                                        <Text className="text-gwa-accent text-xs font-bold uppercase">{evt.badge}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}

                {/* Upcoming Schedule */}
                <View className="mt-6">
                    <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
                        Upcoming Broadcasts
                    </Text>

                    {seasonCalendar.map((event) => (
                        <UpcomingBroadcastCard key={event.id} event={event} />
                    ))}
                </View>

                {/* No content state */}
                {!hasLiveContent && seasonCalendar.length === 0 && (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gwa-muted text-base">No live or upcoming broadcasts</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
