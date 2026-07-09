import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Combat } from '@/services/types';
import { getWrestler } from '@/services/data';

function CombatRow({ combat }: { combat: Combat }) {
    const f1 = getWrestler(combat.fighter1Id);
    const f2 = getWrestler(combat.fighter2Id);
    if (!f1 || !f2) return null;

    return (
        <View className="flex-row items-center py-4 px-4">
            <View className="flex-row items-center flex-1">
                <Image
                    source={f1.image}
                    className="w-12 h-12 rounded-full border border-gwa-border"
                    resizeMode="cover"
                />
                <Text className="text-white text-base font-bold ml-3" numberOfLines={1}>
                    {f1.name}
                </Text>
            </View>

            <View className="mx-3 bg-gwa-red/20 rounded px-3 py-1">
                <Text className="text-gwa-red text-sm font-extrabold italic">VS</Text>
            </View>

            <View className="flex-row-reverse items-center flex-1">
                <Image
                    source={f2.image}
                    className="w-12 h-12 rounded-full border border-gwa-border"
                    resizeMode="cover"
                />
                <Text className="text-white text-base font-bold mr-3 text-right" numberOfLines={1}>
                    {f2.name}
                </Text>
            </View>
        </View>
    );
}

export default function FullFightCard({ combats }: { combats: Combat[] }) {
    return (
        <View className="mt-8 px-5">
            <View className="flex-row items-center mb-3">
                <Ionicons name="list-outline" size={20} color="#E98C8C" />
                <Text className="text-white text-lg font-black italic uppercase tracking-wide ml-2">
                    Full Fight Card
                </Text>
            </View>

            <View className="bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border">
                <View className="px-4 pt-3 pb-1">
                    <Text className="text-gwa-muted text-xs font-bold uppercase tracking-widest">
                        Main Card
                    </Text>
                </View>

                {combats.map((combat, index) => (
                    <View key={combat.id}>
                        <CombatRow combat={combat} />
                        {index < combats.length - 1 && (
                            <View className="h-px bg-gwa-border mx-4" />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}
