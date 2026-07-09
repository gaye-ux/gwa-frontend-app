import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ekiri } from '@/services/types';

interface ClanRankRowProps {
    clan: Ekiri;
    rank: number;
}

export default function ClanRankRow({ clan, rank }: ClanRankRowProps) {
    let rankColor = '#8FA0BA';
    if (rank === 1) rankColor = '#FBBF24';
    if (rank === 2) rankColor = '#94A3B8';
    if (rank === 3) rankColor = '#B45309';

    return (
        <View className="flex-row items-center bg-gwa-card border border-gwa-border rounded-xl p-4 mb-3">
            <View className="w-8 items-center justify-center mr-3">
                <Text className="text-lg font-black italic" style={{ color: rankColor }}>
                    #{rank}
                </Text>
            </View>

            <View className="flex-1 justify-center">
                <Text className="text-white text-sm font-black italic uppercase tracking-wider" numberOfLines={1}>
                    {clan.name}
                </Text>
                <Text className="text-gwa-muted text-[10px] font-bold uppercase tracking-widest mt-1">
                    {clan.totalFights} Total Fights
                </Text>
            </View>

            <View className="items-end justify-center bg-gwa-dark px-3 py-1.5 rounded-lg border border-gwa-border">
                <View className="flex-row items-center">
                    <Ionicons name="trophy" size={12} color="#E53E3E" style={{ marginRight: 4 }} />
                    <Text className="text-white text-base font-black">
                        {clan.totalVictories}
                    </Text>
                </View>
                <Text className="text-gwa-muted text-[9px] font-bold uppercase tracking-widest mt-0.5">
                    Wins
                </Text>
            </View>
        </View>
    );
}
