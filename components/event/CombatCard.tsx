import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Combat } from '@/services/types';
import { getWrestler } from '@/services/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CombatCardProps {
    combat: Combat;
}

export default function CombatCard({ combat }: CombatCardProps) {
    const router = useRouter();
    const isMainEvent = combat.isMainCombat;
    const containerWidth = SCREEN_WIDTH - 40;
    const halfWidth = containerWidth / 2;

    const fighter1 = getWrestler(combat.fighter1Id);
    const fighter2 = getWrestler(combat.fighter2Id);

    if (!fighter1 || !fighter2) return null;

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push(`/(screens)/combat-detail?id=${combat.id}` as any)}
            className="mb-6 rounded overflow-hidden"
        >
            {/* Split Images Section */}
            <View className="flex-row relative" style={{ height: 180 }}>
                <ImageBackground
                    source={fighter1.image}
                    style={{ width: halfWidth, height: '100%' }}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(13,21,39,0.8)', 'rgba(13,21,39,1)']}
                        locations={[0.4, 0.85, 1]}
                        style={{ position: 'absolute', inset: 0 }}
                    />
                    <View className="absolute bottom-2 left-3">
                        <Text className="text-white text-base font-black italic tracking-wide uppercase">
                            {fighter1.name}
                        </Text>
                        <Text className="text-[#F97316] text-[9px] font-bold tracking-widest uppercase mt-0.5">
                            {fighter1.ekiriName}
                        </Text>
                    </View>
                </ImageBackground>

                <View className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-white/10 z-10" />

                <ImageBackground
                    source={fighter2.image}
                    style={{ width: halfWidth, height: '100%' }}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(13,21,39,0.8)', 'rgba(13,21,39,1)']}
                        locations={[0.4, 0.85, 1]}
                        style={{ position: 'absolute', inset: 0 }}
                    />
                    <View className="absolute bottom-2 right-3 items-end">
                        <Text className="text-white text-base font-black italic tracking-wide uppercase">
                            {fighter2.name}
                        </Text>
                        <Text className="text-[#FBBF24] text-[9px] font-bold tracking-widest uppercase mt-0.5">
                            {fighter2.ekiriName}
                        </Text>
                    </View>
                </ImageBackground>

                <View
                    className="absolute top-[40%] left-[50%] z-20 items-center justify-center"
                    style={{
                        transform: [{ translateX: -18 }, { translateY: -14 }, { skewX: '-10deg' }]
                    }}
                >
                    <View className={`px-2 py-1 ${isMainEvent ? 'bg-[#FFB1B1]' : 'bg-white'}`}>
                        <Text
                            className={`text-[13px] font-black italic ${isMainEvent ? 'text-[#D80027]' : 'text-[#0D1527]'}`}
                            style={{ transform: [{ skewX: '10deg' }] }}
                        >
                            VS
                        </Text>
                    </View>
                </View>
            </View>

            {/* Bottom Bar */}
            <View className="bg-[#18233A] px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className={`w-2 h-2 rounded-full mr-2 ${
                        combat.status === 'live' ? 'bg-gwa-live' : combat.status === 'finished' ? 'bg-green-400' : 'bg-gwa-muted'
                    }`} />
                    <Text className={`text-[10px] font-extrabold uppercase tracking-widest ${isMainEvent ? 'text-[#F97316]' : 'text-[#64748B]'}`}>
                        {combat.championship || 'Combat'}
                    </Text>
                </View>

                {combat.odds1 && combat.odds2 && (
                    <View className="flex-row items-center">
                        <View className="items-center mr-4">
                            <Text className="text-[#64748B] text-[8px] font-bold uppercase mb-0.5">Odds</Text>
                            <Text className="text-[#F472B6] text-xs font-black">{combat.odds1}</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-[#64748B] text-[8px] font-bold uppercase mb-0.5">Odds</Text>
                            <Text className="text-[#38BDF8] text-xs font-black">{combat.odds2}</Text>
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}
