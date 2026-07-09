import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getWrestler } from '@/services/data';
import { getHeadToHead, getWrestlerCombatHistory } from '@/services/data';
import { WrestlerHero } from '@/components/wrestler/WrestlerHero';
import { WrestlerStats } from '@/components/wrestler/WrestlerStats';
import { WrestlerInfo } from '@/components/wrestler/WrestlerInfo';
import { FormIndicator } from '@/components/wrestler/FormIndicator';
import { HeadToHeadCard } from '@/components/wrestler/HeadToHead';
import { EmptyState } from '@/components/common/EmptyState';

export default function WrestlerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const wrestler = getWrestler(id || '');

  if (!wrestler) {
    return (
      <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
        <EmptyState icon="person-outline" title="Wrestler not found" subtitle="This wrestler does not exist." />
      </View>
    );
  }

  const headToHead = wrestler ? getHeadToHead(wrestler.id, wrestler.id === 'w-1' ? 'w-2' : 'w-1') : undefined;
  const fightHistory = getWrestlerCombatHistory(wrestler.id);

  const rivalId = headToHead
    ? headToHead.fighter1Id === wrestler.id ? headToHead.fighter2Id : headToHead.fighter1Id
    : undefined;
  const rival = rivalId ? getWrestler(rivalId) : undefined;

  return (
    <View className="flex-1 bg-gwa-dark">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <WrestlerHero
          wrestler={wrestler}
          onBack={() => router.back()}
        />

        <View className="px-5 -mt-4">
          <View className="mb-5">
            <WrestlerStats wrestler={wrestler} />
          </View>

          <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
            <Text className="text-white text-sm font-bold tracking-wider uppercase mb-3">Recent Form</Text>
            <FormIndicator results={wrestler.last5Results} winStreak={wrestler.winStreak} />
          </View>

          <WrestlerInfo wrestler={wrestler} />

          {headToHead && rival && (
            <View className="mb-4">
              <HeadToHeadCard
                headToHead={headToHead}
                fighter1={headToHead.fighter1Id === wrestler.id ? wrestler : rival}
                fighter2={headToHead.fighter2Id === wrestler.id ? wrestler : rival}
                onPress={() => {
                  const otherId = headToHead.fighter1Id === wrestler.id ? headToHead.fighter2Id : headToHead.fighter1Id;
                  router.push(`/(screens)/wrestler-profile?id=${otherId}` as any);
                }}
              />
            </View>
          )}

          {fightHistory.length > 0 && (
            <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
              <Text className="text-white text-sm font-bold tracking-wider uppercase mb-4">Fight History</Text>
              {fightHistory.map((combat) => {
                const f1 = getWrestler(combat.fighter1Id);
                const f2 = getWrestler(combat.fighter2Id);
                const isWinner = combat.winnerId === wrestler.id;
                const didFight = combat.fighter1Id === wrestler.id || combat.fighter2Id === wrestler.id;
                if (!didFight || !f1 || !f2) return null;
                const opponent = combat.fighter1Id === wrestler.id ? f2 : f1;

                return (
                  <View key={combat.id} className="flex-row items-center py-3 border-b border-gwa-border last:border-b-0">
                    <View className="flex-1">
                      <Text className="text-white text-sm font-bold">vs {opponent.name}</Text>
                      <Text className="text-gwa-muted text-xs mt-0.5">{combat.championship || 'Combat'}</Text>
                    </View>
                    <View className="items-end">
                      {combat.status === 'finished' ? (
                        <Text className={`text-xs font-black ${isWinner ? 'text-green-400' : 'text-gwa-red'}`}>
                          {isWinner ? 'WIN' : 'LOSS'}
                        </Text>
                      ) : (
                        <Text className="text-gwa-muted text-xs uppercase">{combat.status}</Text>
                      )}
                      {combat.duration && (
                        <Text className="text-gwa-muted text-[10px] mt-0.5">{combat.duration}</Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
