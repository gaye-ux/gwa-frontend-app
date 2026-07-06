import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Combat } from '@/services/homeData';

// ---------------------------------------------------------------------------
// Single combat row
// ---------------------------------------------------------------------------
function CombatRow({ combat }: { combat: Combat }) {
    return (
        <View className="flex-row items-center py-3.5 px-4">
            {/* Fighter 1 */}
            <View className="flex-row items-center flex-1">
                <Image
                    source={combat.fighter1.image}
                    className="w-9 h-9 rounded-full border border-gwa-border"
                    resizeMode="cover"
                />
                <Text className="text-white text-sm font-bold ml-2.5" numberOfLines={1}>
                    {combat.fighter1.name}
                </Text>
            </View>

            {/* VS */}
            <View className="mx-3 bg-gwa-red/20 rounded px-2 py-0.5">
                <Text className="text-gwa-red text-xs font-extrabold italic">VS</Text>
            </View>

            {/* Fighter 2 */}
            <View className="flex-row-reverse items-center flex-1">
                <Image
                    source={combat.fighter2.image}
                    className="w-9 h-9 rounded-full border border-gwa-border"
                    resizeMode="cover"
                />
                <Text className="text-white text-sm font-bold mr-2.5 text-right" numberOfLines={1}>
                    {combat.fighter2.name}
                </Text>
            </View>
        </View>
    );
}

// ---------------------------------------------------------------------------
// FullFightCard
// ---------------------------------------------------------------------------
export default function FullFightCard({ combats }: { combats: Combat[] }) {
    return (
        <View className="mt-8 px-5">
            {/* Section header */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="list-outline" size={20} color="#E98C8C" />
                <Text className="text-white text-lg font-black italic uppercase tracking-wide ml-2">
                    Full Fight Card
                </Text>
            </View>

            {/* Card */}
            <View className="bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border">
                {/* Sub-header */}
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
