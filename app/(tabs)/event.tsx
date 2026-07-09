import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import UpcomingEventCard from '@/components/cards/eventCard';
import { eventsData, getLiveEvents, getUpcomingEvents, getFinishedEvents } from '@/services/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

enum EventFilter {
    All = 'All',
    Upcoming = 'Upcoming',
    Past = 'Past',
}

export default function Events() {
    const insets = useSafeAreaInsets();
    const [filter, setFilter] = React.useState<EventFilter>(EventFilter.All);

    const liveEvents = getLiveEvents();
    const upcoming = getUpcomingEvents();
    const past = getFinishedEvents();

    const filtered = filter === EventFilter.All
        ? eventsData
        : filter === EventFilter.Upcoming
            ? [...liveEvents, ...upcoming]
            : past;

    return (
        <View className="flex-1 bg-gwa-dark">
            <View
                className="px-5 pb-4 pt-4 border-b border-gwa-border bg-gwa-dark"
                style={{ marginTop: 16 }}
            >
                <Text className="text-white text-2xl font-black italic tracking-widest uppercase mb-4">
                    Events
                </Text>

                {/* Filter */}
                <View className="flex-row bg-gwa-card rounded-xl p-1 border border-gwa-border">
                    {([EventFilter.All, EventFilter.Upcoming, EventFilter.Past] as const).map((f) => (
                        <React.Fragment key={f}>
                            {React.createElement(
                                (f === EventFilter.All ? View : View),
                                { className: `flex-1 py-2.5 items-center rounded-lg ${filter === f ? 'bg-gwa-accent' : 'bg-transparent'}` as any },
                                <Text
                                    onPress={() => setFilter(f)}
                                    className={`text-xs font-black uppercase tracking-wider ${filter === f ? 'text-white' : 'text-gwa-muted'}`}
                                >
                                    {f === EventFilter.All ? `All (${eventsData.length})` : f === EventFilter.Upcoming ? `Upcoming (${upcoming.length + liveEvents.length})` : `Past (${past.length})`}
                                </Text>
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Live Events */}
                {filter !== EventFilter.Past && liveEvents.length > 0 && (
                    <>
                        <View className="flex-row items-center mb-4">
                            <View className="w-2 h-2 rounded-full bg-gwa-live mr-2" />
                            <Text className="text-gwa-live text-xs font-bold uppercase tracking-wider">Live Now</Text>
                        </View>
                        {liveEvents.map((event) => (
                            <UpcomingEventCard key={event.id} event={event} />
                        ))}
                    </>
                )}

                {filtered.map((event) => (
                    <UpcomingEventCard key={event.id} event={event} />
                ))}
            </ScrollView>
        </View>
    );
}
