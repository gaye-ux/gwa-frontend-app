import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Combat } from '@/services/homeData';

const CARD_WIDTH = (Dimensions.get('window').width - 40) / 2;

// ---------------------------------------------------------------------------
// Stat Row
// ---------------------------------------------------------------------------
function StatRow({
    left,
    label,
    right,
}: {
    left: string;
    label: string;
    right: string;
}) {
    return (
        <View className="flex-row items-center justify-between py-2 border-b border-gwa-border/50">
            <Text className="text-white text-sm font-bold flex-1 text-left">
                {left}
            </Text>
            <Text className="text-gwa-muted text-xs font-semibold uppercase tracking-wider flex-1 text-center">
                {label}
            </Text>
            <Text className="text-white text-sm font-bold flex-1 text-right">
                {right}
            </Text>
        </View>
    );
}

// ---------------------------------------------------------------------------
// MainMatchup
// ---------------------------------------------------------------------------
export default function MainMatchup({ combat }: { combat: Combat }) {
    const { fighter1, fighter2 } = combat;

    return (
        <View className="mt-8 px-5">
            {/* Section header */}
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-lg font-black italic uppercase tracking-wide">
                    Main Event{'\n'}Matchup
                </Text>
                {combat.title && (
                    <View className="bg-gwa-border rounded-lg px-3 py-1.5">
                        <Text className="text-gwa-muted text-[10px] font-bold uppercase tracking-wider text-right">
                            {combat.title}
                        </Text>
                    </View>
                )}
            </View>

            {/* Fighter portraits */}
            <View className="bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border">
                <View className="flex-row items-end justify-center relative" style={{ height: 220 }}>
                    {/* Fighter 1 */}
                    <View className="flex-1 items-center">
                        <Image
                            source={fighter1.image}
                            style={{ width: CARD_WIDTH, height: 220 }}
                            resizeMode="cover"
                        />
                    </View>

                    {/* VS Badge — centered overlay */}
                    <View
                        className="absolute z-10 items-center justify-center"
                        style={{ top: '40%' }}
                    >
                        <View className="w-12 h-12 rounded-full bg-gwa-red items-center justify-center"
                            style={{
                                shadowColor: '#E53E3E',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.5,
                                shadowRadius: 12,
                                elevation: 10,
                            }}
                        >
                            <Text className="text-white text-base font-black italic">VS</Text>
                        </View>
                    </View>

                    {/* Fighter 2 */}
                    <View className="flex-1 items-center">
                        <Image
                            source={fighter2.image}
                            style={{ width: CARD_WIDTH, height: 220 }}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Bottom gradient */}
                    <LinearGradient
                        colors={['transparent', 'rgba(19,27,46,1)']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 80,
                        }}
                    />
                </View>

                {/* Fighter names & nicknames */}
                <View className="flex-row justify-between px-4 -mt-6 z-20">
                    <View className="flex-1">
                        <Text className="text-[10px] text-gwa-muted font-medium italic uppercase tracking-wider">
                            {fighter1.nickname}
                        </Text>
                        <Text className="text-white text-base font-black uppercase mt-0.5">
                            {fighter1.name}
                        </Text>
                    </View>
                    <View className="flex-1 items-end">
                        <Text className="text-[10px] text-gwa-muted font-medium italic uppercase tracking-wider text-right">
                            {fighter2.nickname}
                        </Text>
                        <Text className="text-white text-base font-black uppercase mt-0.5 text-right">
                            {fighter2.name}
                        </Text>
                    </View>
                </View>

                {/* Stats comparison */}
                <View className="px-4 mt-4 pb-4">
                    <StatRow left={fighter1.record} label="Record" right={fighter2.record} />
                    <StatRow left={fighter1.weight} label="Weight" right={fighter2.weight} />
                    <StatRow left={fighter1.height} label="Height" right={fighter2.height} />
                    <StatRow
                        left={String(fighter1.age)}
                        label="Age"
                        right={String(fighter2.age)}
                    />
                </View>
            </View>
        </View>
    );
}
