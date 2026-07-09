import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { wrestlers, ekiriList, rankingCategories } from '@/services/data';
import KingFighterCard from '@/components/ranking/KingFighterCard';
import FighterRankRow from '@/components/ranking/FighterRankRow';
import ClanRankRow from '@/components/ranking/ClanRankRow';

type RankTab = 'fighters' | 'clans';

export default function RankingScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<RankTab>('fighters');
    const [categoryIndex, setCategoryIndex] = useState(0);

    const sortedFighters = [...wrestlers].sort((a, b) => (b.points || 0) - (a.points || 0));
    const sortedClans = [...ekiriList].sort((a, b) => b.totalVictories - a.totalVictories);

    const kingFighter = sortedFighters[0];
    const restFighters = sortedFighters.slice(1);

    return (
        <View className="flex-1 bg-gwa-dark">
            <View className="px-5 pb-4 pt-4 border-b border-gwa-border bg-gwa-dark" style={{ marginTop: 16 }}>
                <Text className="text-white text-2xl font-black italic tracking-widest uppercase mb-4">
                    Rankings
                </Text>

                {/* Tab Switcher */}
                <View className="flex-row bg-gwa-card rounded-xl p-1 border border-gwa-border mb-3">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('fighters')}
                        className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'fighters' ? 'bg-gwa-accent' : 'bg-transparent'}`}
                    >
                        <Text className={`text-xs font-black uppercase tracking-wider ${activeTab === 'fighters' ? 'text-white' : 'text-gwa-muted'}`}>
                            Fighters
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('clans')}
                        className={`flex-1 py-2.5 items-center rounded-lg ${activeTab === 'clans' ? 'bg-gwa-accent' : 'bg-transparent'}`}
                    >
                        <Text className={`text-xs font-black uppercase tracking-wider ${activeTab === 'clans' ? 'text-white' : 'text-gwa-muted'}`}>
                            Ekiri
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Category Filter (fighters only) */}
                {activeTab === 'fighters' && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2">
                            {rankingCategories.map((cat, i) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    onPress={() => setCategoryIndex(i)}
                                    className={`px-3 py-1.5 rounded-full border ${i === categoryIndex ? 'bg-gwa-accent/20 border-gwa-accent' : 'bg-gwa-card border-gwa-border'}`}
                                    activeOpacity={0.7}
                                >
                                    <Text className={`text-xs font-bold ${i === categoryIndex ? 'text-gwa-accent' : 'text-gwa-muted'}`}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'fighters' ? (
                    <>
                        {kingFighter && (
                            <TouchableOpacity
                                onPress={() => router.push(`/(screens)/wrestler-profile?id=${kingFighter.id}` as any)}
                                activeOpacity={0.9}
                            >
                                <KingFighterCard fighter={kingFighter} />
                            </TouchableOpacity>
                        )}

                        <Text className="text-white text-base font-bold uppercase tracking-wider mb-4 mt-2">
                            Top Contenders
                        </Text>

                        {restFighters.map((fighter, index) => (
                            <TouchableOpacity
                                key={fighter.id}
                                onPress={() => router.push(`/(screens)/wrestler-profile?id=${fighter.id}` as any)}
                                activeOpacity={0.7}
                            >
                                <FighterRankRow
                                    fighter={fighter}
                                    rank={index + 2}
                                />
                            </TouchableOpacity>
                        ))}
                    </>
                ) : (
                    <>
                        <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
                            Ekiri Leaderboard
                        </Text>

                        {sortedClans.map((clan, index) => (
                            <TouchableOpacity
                                key={clan.id}
                                onPress={() => router.push(`/(screens)/ekiri-profile?id=${clan.id}` as any)}
                                activeOpacity={0.7}
                            >
                                <ClanRankRow
                                    clan={clan}
                                    rank={index + 1}
                                />
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}
