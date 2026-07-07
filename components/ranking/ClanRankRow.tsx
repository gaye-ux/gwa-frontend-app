import React from 'react';
import { View, Text } from 'react-native';
import { Clan } from '@/services/homeData';
import { Ionicons } from '@expo/vector-icons';

interface ClanRankRowProps {
    clan: Clan;
    rank: number;
}

export default function ClanRankRow({ clan, rank }: ClanRankRowProps) {
    // Top 3 clans get a special medal color
    let rankColor = '#8FA0BA';
    if (rank === 1) rankColor = '#FBBF24'; // Gold
    if (rank === 2) rankColor = '#94A3B8'; // Silver
    if (rank === 3) rankColor = '#B45309'; // Bronze

    return (
        <View className="flex-row items-center bg-[#18233A] border border-[#1E293B] rounded-xl p-4 mb-3 shadow-sm">
            {/* Rank Number */}
            <View className="w-8 items-center justify-center mr-3">
                <Text 
                    className="text-lg font-black italic"
                    style={{ color: rankColor }}
                >
                    #{rank}
                </Text>
            </View>

            {/* Details */}
            <View className="flex-1 justify-center">
                <Text className="text-white text-sm font-black italic uppercase tracking-wider" numberOfLines={1}>
                    {clan.name}
                </Text>
                <Text className="text-[#8FA0BA] text-[10px] font-bold uppercase tracking-widest mt-1">
                    {clan.fights} Total Fights
                </Text>
            </View>

            {/* Wins */}
            <View className="items-end justify-center bg-[#0D1527] px-3 py-1.5 rounded-lg border border-[#1E293B]">
                <View className="flex-row items-center">
                    <Ionicons name="trophy" size={12} color="#E53E3E" style={{ marginRight: 4 }} />
                    <Text className="text-white text-base font-black">
                        {clan.wins}
                    </Text>
                </View>
                <Text className="text-[#8FA0BA] text-[9px] font-bold uppercase tracking-widest mt-0.5">
                    Wins
                </Text>
            </View>
        </View>
    );
}
