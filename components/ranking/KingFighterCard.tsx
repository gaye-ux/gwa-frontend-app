import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fighter } from '@/services/homeData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface KingFighterCardProps {
    fighter: Fighter;
}

export default function KingFighterCard({ fighter }: KingFighterCardProps) {
    return (
        <View className="mb-6 rounded-2xl overflow-hidden border border-[#FBBF24]/30 shadow-lg shadow-black/50" style={{ width: SCREEN_WIDTH - 40 }}>
            <ImageBackground
                source={fighter.image}
                style={{ width: '100%', height: 320 }}
                resizeMode="cover"
            >
                {/* Gold/Dark Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(217, 119, 6, 0.4)', '#0D1527']}
                    locations={[0.3, 0.7, 1]}
                    style={{ position: 'absolute', inset: 0 }}
                />

                <View className="flex-1 justify-end p-5">
                    {/* King Badge */}
                    <View className="self-start bg-[#FBBF24] px-3 py-1.5 rounded mb-2">
                        <Text className="text-[#0D1527] text-xs font-black uppercase tracking-widest">
                            👑 KING OF THE ARENA
                        </Text>
                    </View>

                    {/* Rank #1 */}
                    <Text className="text-[#FBBF24] text-[60px] font-black italic leading-none opacity-20 absolute right-5 bottom-[80px]">
                        #1
                    </Text>

                    {/* Fighter Name */}
                    <Text className="text-white text-3xl font-black italic tracking-wide uppercase leading-none mb-1">
                        {fighter.name}
                    </Text>
                    
                    {/* Clan */}
                    <Text className="text-[#FBBF24] text-xs font-bold uppercase tracking-widest mb-4">
                        {fighter.clan}
                    </Text>

                    {/* Stats Row */}
                    <View className="flex-row items-center justify-between border-t border-white/10 pt-3">
                        <View>
                            <Text className="text-[#8FA0BA] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                                Record
                            </Text>
                            <Text className="text-white text-sm font-black">
                                {fighter.record.split('-')[0]} W - {fighter.record.split('-')[1]} L - {fighter.record.split('-')[2]} D
                            </Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-[#8FA0BA] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                                Ranking Points
                            </Text>
                            <Text className="text-[#FBBF24] text-xl font-black italic">
                                {fighter.points?.toLocaleString()} PTS
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
