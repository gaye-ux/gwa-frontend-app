import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { currentEvent } from '@/services/homeData';
import { useCountdown } from '@/hooks/useCountdown';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CountdownUnit({ value, label }: { value: number; label: string }) {
    return (
        <View className="items-center">
            <Text className="text-white text-3xl font-black tracking-wider">
                {String(value).padStart(2, '0')}
            </Text>
            <Text className="text-gwa-muted text-[10px] font-semibold uppercase tracking-widest mt-0.5">
                {label}
            </Text>
        </View>
    );
}

function CountdownSeparator() {
    return (
        <Text className="text-gwa-accent text-2xl font-black mx-2 -mt-3">:</Text>
    );
}

// ---------------------------------------------------------------------------
// HeroBanner
// ---------------------------------------------------------------------------
export default function HeroBanner() {
    const router = useRouter();
    const event = currentEvent;
    const { days, hours, minutes } = useCountdown(event.countdownTarget);

    return (
        <View style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.15 }}>
            <ImageBackground
                source={event.heroImage}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                {/* Bottom gradient overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(13,17,23,0.6)', 'rgba(13,17,23,0.92)', '#0D1117']}
                    locations={[0, 0.35, 0.65, 1]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    }}
                />

                {/* Content */}
                <View className="flex-1 justify-end pb-5 px-5">
                    {/* Badge */}
                    <View className="flex-row items-center mb-3">
                        <View className="bg-gwa-red/90 rounded-full px-3 py-1 flex-row items-center">
                            <Ionicons name="chevron-back" size={12} color="#fff" />
                            <Text className="text-white text-xs font-bold uppercase tracking-wider ml-0.5">
                                {event.badge}
                            </Text>
                        </View>
                    </View>

                    {/* Fighter Names */}
                    <View className="mb-2">
                        <Text className="text-white text-[28px] font-black uppercase leading-tight tracking-wide">
                            {event.fighter1Name}{' '}
                            <Text className="text-gwa-red italic">VS</Text>{' '}
                            {event.fighter2Name}
                        </Text>
                    </View>

                    {/* Date & Venue */}
                    <Text className="text-gwa-muted text-sm font-medium mb-4">
                        {event.date} • {event.venue}
                    </Text>

                    {/* Countdown */}
                    <View className="flex-row items-center mb-5">
                        <CountdownUnit value={days} label="DAYS" />
                        <CountdownSeparator />
                        <CountdownUnit value={hours} label="HRS" />
                        <CountdownSeparator />
                        <CountdownUnit value={minutes} label="MIN" />
                    </View>

                    {/* CTA Buttons */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="bg-gwa-red rounded-xl py-3.5 items-center mb-3"
                    >
                        <Text className="text-white text-base font-bold uppercase tracking-widest">
                            Buy Tickets
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="border border-white/40 rounded-xl py-3.5 items-center"
                        onPress={() =>
                            router.push({
                                pathname: '/(screens)/event-detail',
                                params: { eventId: event.id },
                            })
                        }
                    >
                        <Text className="text-white text-base font-bold uppercase tracking-widest">
                            View Fight Card
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
