import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GwaEvent } from '@/services/homeData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BadgePill({ text, bgClass, textClass }: { text: string; bgClass: string; textClass: string }) {
    return (
        <View className={`px-3 py-1 mr-2 rounded-sm ${bgClass}`}>
            <Text className={`text-[10px] font-black uppercase tracking-wider ${textClass}`}>
                {text}
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
                style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.0 }}
                resizeMode="cover"
            >
                {/* Gradient overlay to blend into the background below */}
                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(13,21,39,0.3)',
                        'rgba(13,21,39,0.8)',
                        '#0D1527',
                    ]}
                    locations={[0.4, 0.7, 0.9, 1]}
                    style={{ position: 'absolute', inset: 0 }}
                />

                {/* Content placed at the bottom of the image container */}
                <View className="flex-1 justify-end px-5 pb-6">
                    {/* Badges */}
                    <View className="flex-row items-center mb-3">
                        <BadgePill 
                            text={`LIVE ${event.date}`} 
                            bgClass="bg-[#E96677]" 
                            textClass="text-white" 
                        />
                        <BadgePill 
                            text={event.badge} 
                            bgClass="bg-[#FBBF24]" 
                            textClass="text-[#0D1527]" 
                        />
                    </View>

                    {/* Title */}
                    <Text 
                        className="text-white font-black uppercase tracking-wide leading-none"
                        style={{ fontSize: 44, fontStyle: 'italic', marginBottom: 12 }}
                    >
                        {event.title.split('\n').map((line, i) => (
                            <Text key={i}>{line}{'\n'}</Text>
                        ))}
                    </Text>

                    {/* Date & Venue Row */}
                    <View className="flex-row items-center">
                        <View className="flex-row items-center mr-4">
                            <Ionicons name="calendar-outline" size={14} color="#8FA0BA" />
                            <Text className="text-[#8FA0BA] text-[11px] font-bold tracking-widest uppercase ml-1.5">
                                {event.date}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={14} color="#8FA0BA" />
                            <Text className="text-[#8FA0BA] text-[11px] font-bold tracking-widest uppercase ml-1.5">
                                {event.venue}
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
