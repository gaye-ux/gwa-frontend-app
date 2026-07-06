import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GwaEvent } from '@/services/homeData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BadgePill({ text, color }: { text: string; color: string }) {
    return (
        <View
            className="rounded px-2.5 py-1 mr-2"
            style={{ backgroundColor: color }}
        >
            <Text className="text-white text-[10px] font-extrabold uppercase tracking-wider">
                {text}
            </Text>
        </View>
    );
}

function TicketCard({
    name,
    price,
    perks,
    highlighted,
}: {
    name: string;
    price: string;
    perks: string;
    highlighted?: boolean;
}) {
    return (
        <View
            className={`flex-1 rounded-xl py-3 px-2 items-center mx-1 border ${
                highlighted
                    ? 'bg-gwa-red/15 border-gwa-red/50'
                    : 'bg-gwa-card border-gwa-border'
            }`}
        >
            <Text className="text-gwa-muted text-[9px] font-bold uppercase tracking-widest mb-1">
                {name}
            </Text>
            <Text
                className={`text-xl font-black ${
                    highlighted ? 'text-gwa-red' : 'text-white'
                }`}
            >
                {price}
            </Text>
            <Text className="text-gwa-muted text-[9px] font-medium text-center mt-1 leading-3">
                {perks}
            </Text>
        </View>
    );
}

// ---------------------------------------------------------------------------
// EventHero
// ---------------------------------------------------------------------------
export default function EventHero({ event }: { event: GwaEvent }) {
    return (
        <View style={{ width: SCREEN_WIDTH }}>
            <ImageBackground
                source={event.heroImage}
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.65 }}
                resizeMode="cover"
            >
                {/* Gradient overlay */}
                <LinearGradient
                    colors={[
                        'rgba(13,17,23,0.3)',
                        'rgba(13,17,23,0.7)',
                        '#0D1117',
                    ]}
                    locations={[0, 0.6, 1]}
                    style={{ position: 'absolute', inset: 0 }}
                />

                {/* Badges at bottom of image */}
                <View className="flex-1 justify-end px-5 pb-4">
                    <View className="flex-row items-center">
                        <BadgePill text="LIVE SOON" color="#E53E3E" />
                        <BadgePill text={event.seriesName} color="rgba(30,41,59,0.8)" />
                    </View>
                </View>
            </ImageBackground>

            {/* Content below image */}
            <View className="px-5 -mt-1">
                {/* Title */}
                <Text className="text-white text-[26px] font-black uppercase leading-tight tracking-wide mt-2">
                    {event.title}
                </Text>

                {/* Date & Time */}
                <View className="flex-row items-center mt-3">
                    <Ionicons name="calendar-outline" size={14} color="#8FA0BA" />
                    <Text className="text-gwa-muted text-sm font-medium ml-1.5">
                        {event.date} • {event.time}
                    </Text>
                </View>

                {/* Venue */}
                <View className="flex-row items-center mt-1.5">
                    <Ionicons name="location-outline" size={14} color="#8FA0BA" />
                    <Text className="text-gwa-muted text-sm font-medium ml-1.5">
                        {event.venue}
                    </Text>
                </View>

                {/* Ticket Tiers */}
                <View className="flex-row mt-5 mx-[-4px]">
                    {event.tickets.map((tier) => (
                        <TicketCard
                            key={tier.name}
                            name={tier.name}
                            price={tier.price}
                            perks={tier.perks}
                            highlighted={tier.highlighted}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}
