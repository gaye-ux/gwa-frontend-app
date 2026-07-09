import React from 'react';
import { View, Text } from 'react-native';
import { MatchResult } from '@/services/types';

interface FormIndicatorProps {
  results: MatchResult[];
  winStreak?: number;
}

function ResultBadge({ result }: { result: MatchResult }) {
  const colors = {
    W: { bg: '#10B981', text: 'W' },
    L: { bg: '#E53E3E', text: 'L' },
    D: { bg: '#F59E0B', text: 'D' },
  };

  const c = colors[result];

  return (
    <View
      className="w-8 h-8 rounded-lg items-center justify-center"
      style={{ backgroundColor: c.bg }}
    >
      <Text className="text-white text-xs font-black">{c.text}</Text>
    </View>
  );
}

export function FormIndicator({ results, winStreak }: FormIndicatorProps) {
  return (
    <View className="flex-row items-center gap-2">
      {results.map((r, i) => (
        <ResultBadge key={i} result={r} />
      ))}
      {winStreak !== undefined && winStreak > 0 && (
        <View className="ml-2 bg-gwa-accent/20 px-3 py-1 rounded-full border border-gwa-accent/30">
          <Text className="text-gwa-accent text-xs font-bold tracking-wider">
            {winStreak}🔥
          </Text>
        </View>
      )}
    </View>
  );
}
