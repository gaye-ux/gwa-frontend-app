import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from './SectionHeader';
import { arenaLiveMatch } from '@/services/homeData';

// ---------------------------------------------------------------------------
// Live indicator dot
// ---------------------------------------------------------------------------
function LiveBadge() {
    return (
        <View className="flex-row items-center bg-gwa-live/20 rounded px-1.5 py-0.5">
            <View className="w-2 h-2 rounded-full bg-gwa-live mr-1" />
            <Text className="text-gwa-live text-xs font-extrabold uppercase">
                Live
            </Text>
        </View>
    );
}

// ---------------------------------------------------------------------------
// ArenaLiveCard
// ---------------------------------------------------------------------------
export default function ArenaLiveCard() {
    return (
        <View className="mt-6">
            {/* Section Header */}
            <SectionHeader
                title="ARENA LIVE"
                actionText="Watch All"
                icon={<LiveBadge />}
            />

            {/* Card */}
            <View className="mx-4 bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border">
                {/* Thumbnail with play button */}
                <View className="relative">
                    <Image
                        source={arenaLiveMatch.thumbnail}
                        className="w-full"
                        style={{ height: 200 }}
                        resizeMode="cover"
                    />
                    {/* Play button overlay */}
                    <View className="absolute inset-0 items-center justify-center">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="w-14 h-14 rounded-full bg-gwa-red/90 items-center justify-center"
                            style={{
                                shadowColor: '#E53E3E',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 8,
                            }}
                        >
                            <Ionicons name="play" size={28} color="#fff" style={{ marginLeft: 3 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Duration badge */}
                    <View className="absolute bottom-2 right-2 bg-black/70 rounded px-2 py-0.5 flex-row items-center">
                        <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                        <Text className="text-white text-xs font-semibold ml-1">
                            {arenaLiveMatch.duration}
                        </Text>
                    </View>
                </View>

                {/* Match info */}
                <View className="p-3.5">
                    <Text className="text-gwa-muted text-xs font-medium mb-1.5 uppercase tracking-wider">
                        {arenaLiveMatch.championship}
                    </Text>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-white text-base font-bold flex-1">
                            {arenaLiveMatch.fighter1}
                            <Text className="text-gwa-red font-extrabold"> vs </Text>
                            {arenaLiveMatch.fighter2}
                        </Text>
                        <View className="flex-row items-center ml-3">
                            <View className="bg-gwa-accent/20 rounded px-2 py-0.5">
                                <Text className="text-gwa-accent text-xs font-bold">
                                    {arenaLiveMatch.round}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
