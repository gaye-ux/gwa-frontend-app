import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fighterRankings, clanRankings } from '@/services/homeData';
import KingFighterCard from '@/components/ranking/KingFighterCard';
import FighterRankRow from '@/components/ranking/FighterRankRow';
import ClanRankRow from '@/components/ranking/ClanRankRow';

export default function RankingScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'fighters' | 'clans'>('fighters');

    // Make sure rankings are sorted
    const sortedFighters = [...fighterRankings].sort((a, b) => (b.points || 0) - (a.points || 0));
    const sortedClans = [...clanRankings].sort((a, b) => b.wins - a.wins);

    const kingFighter = sortedFighters[0];
    const restFighters = sortedFighters.slice(1);

    return (
        <View className="flex-1 bg-[#0D1527]">
            {/* Header Section */}
            <View 
                className="px-5 pb-4 border-b border-[#1E293B] bg-[#0D1527] z-10"
                style={{ paddingTop: insets.top + 16 }}
            >
                <Text className="text-white text-2xl font-black italic tracking-widest uppercase mb-4">
                    Rankings
                </Text>

                {/* Custom Toggle Switch */}
                <View className="flex-row bg-[#18233A] rounded-xl p-1 border border-[#1E293B]">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('fighters')}
                        className={`flex-1 py-2.5 items-center rounded-lg ${
                            activeTab === 'fighters' ? 'bg-[#E53E3E]' : 'bg-transparent'
                        }`}
                    >
                        <Text 
                            className={`text-xs font-black uppercase tracking-wider ${
                                activeTab === 'fighters' ? 'text-white' : 'text-[#8FA0BA]'
                            }`}
                        >
                            Fighters
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('clans')}
                        className={`flex-1 py-2.5 items-center rounded-lg ${
                            activeTab === 'clans' ? 'bg-[#E53E3E]' : 'bg-transparent'
                        }`}
                    >
                        <Text 
                            className={`text-xs font-black uppercase tracking-wider ${
                                activeTab === 'clans' ? 'text-white' : 'text-[#8FA0BA]'
                            }`}
                        >
                            Clans
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* List Content */}
            <ScrollView 
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'fighters' ? (
                    <>
                        {/* King Card for #1 */}
                        {kingFighter && (
                            <KingFighterCard fighter={kingFighter} />
                        )}

                        {/* List for the rest */}
                        <Text className="text-white text-base font-bold uppercase tracking-wider mb-4 mt-2">
                            Top Contenders
                        </Text>
                        
                        {restFighters.map((fighter, index) => (
                            <FighterRankRow 
                                key={fighter.name} 
                                fighter={fighter} 
                                rank={index + 2} // Starts at #2
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
                            Clan Leaderboard
                        </Text>
                        
                        {sortedClans.map((clan, index) => (
                            <ClanRankRow 
                                key={clan.id}
                                clan={clan}
                                rank={index + 1}
                            />
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}