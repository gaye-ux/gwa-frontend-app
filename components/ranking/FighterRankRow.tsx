import React from 'react';
import { View, Text, Image } from 'react-native';
import { Wrestler } from '@/services/types';

interface FighterRankRowProps {
    fighter: Wrestler;
    rank: number;
}

export default function FighterRankRow({ fighter, rank }: FighterRankRowProps) {
    return (
        <View className="flex-row items-center bg-gwa-card border border-gwa-border rounded-xl p-3 mb-3">
            <View className="w-8 items-center justify-center mr-2">
                <Text className="text-gwa-muted text-lg font-black italic">
                    #{rank}
                </Text>
            </View>

            <Image
                source={fighter.image}
                className="w-12 h-12 rounded-full border border-gwa-border"
                resizeMode="cover"
            />

            <View className="flex-1 ml-4 justify-center">
                <Text className="text-white text-base font-black italic uppercase tracking-wider" numberOfLines={1}>
                    {fighter.name}
                </Text>
                <Text className="text-gwa-accent text-[10px] font-bold uppercase tracking-widest mt-0.5" numberOfLines={1}>
                    {fighter.ekiriName}
                </Text>
                <Text className="text-gwa-muted text-[9px] font-bold uppercase tracking-widest mt-1" numberOfLines={1}>
                    {fighter.wins} W · {fighter.losses} L · {fighter.draws} D
                </Text>
            </View>

            <View className="items-end justify-center ml-2">
                <Text className="text-white text-sm font-black">
                    {fighter.points.toLocaleString()}
                </Text>
                <Text className="text-gwa-muted text-[9px] font-bold uppercase tracking-widest">
                    PTS
                </Text>
            </View>
        </View>
    );
}
