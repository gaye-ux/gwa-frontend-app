import React from 'react';
import { View, Text, Image } from 'react-native';
import { Fighter } from '@/services/homeData';

interface FighterRankRowProps {
    fighter: Fighter;
    rank: number;
}

export default function FighterRankRow({ fighter, rank }: FighterRankRowProps) {
    return (
        <View className="flex-row items-center bg-[#18233A] border border-[#1E293B] rounded-xl p-3 mb-3 shadow-sm">
            {/* Rank Number */}
            <View className="w-8 items-center justify-center mr-2">
                <Text className="text-[#8FA0BA] text-lg font-black italic">
                    #{rank}
                </Text>
            </View>

            {/* Avatar */}
            <Image 
                source={fighter.image} 
                className="w-12 h-12 rounded-full border border-[#1E293B]"
                resizeMode="cover"
            />

            {/* Details */}
            <View className="flex-1 ml-4 justify-center">
                <Text className="text-white text-base font-black italic uppercase tracking-wider" numberOfLines={1}>
                    {fighter.name}
                </Text>
                <Text className="text-[#F97316] text-[10px] font-bold uppercase tracking-widest mt-0.5" numberOfLines={1}>
                    {fighter.clan}
                </Text>
                <Text className="text-[#8FA0BA] text-[9px] font-bold uppercase tracking-widest mt-1" numberOfLines={1}>
                    {fighter.record.split('-')[0]} W - {fighter.record.split('-')[1]} L - {fighter.record.split('-')[2]} D
                </Text>
            </View>

            {/* Points */}
            <View className="items-end justify-center ml-2">
                <Text className="text-white text-sm font-black">
                    {fighter.points?.toLocaleString()}
                </Text>
                <Text className="text-[#8FA0BA] text-[9px] font-bold uppercase tracking-widest">
                    PTS
                </Text>
            </View>
        </View>
    );
}
