import React from 'react';
import { View, Text } from 'react-native';
import { Wrestler } from '@/services/types';

interface WrestlerStatsProps {
  wrestler: Wrestler;
}

export function WrestlerStats({ wrestler }: WrestlerStatsProps) {
  const stats = [
    { label: 'Total Fights', value: wrestler.totalFights.toString() },
    { label: 'Wins', value: wrestler.wins.toString(), color: '#10B981' },
    { label: 'Losses', value: wrestler.losses.toString(), color: '#E53E3E' },
    { label: 'Draws', value: wrestler.draws.toString(), color: '#F59E0B' },
    { label: 'KO Wins', value: wrestler.knockouts.toString() },
    { label: 'Win %', value: `${wrestler.winningPercentage}%` },
  ];

  return (
    <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5">
      <View className="flex-row flex-wrap">
        {stats.map((stat, index) => (
          <View key={index} className="w-1/3 mb-4" style={index >= 3 ? { marginBottom: 0 } : undefined}>
            <Text
              className="text-2xl font-black text-center"
              style={{ color: stat.color || 'white' }}
            >
              {stat.value}
            </Text>
            <Text className="text-gwa-muted text-xs text-center mt-1 font-medium tracking-wider uppercase">
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
