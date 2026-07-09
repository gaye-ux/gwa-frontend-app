import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Wrestler } from '@/services/types';

interface WrestlerInfoProps {
  wrestler: Wrestler;
}

export function WrestlerInfo({ wrestler }: WrestlerInfoProps) {
  const infoRows = [
    { icon: 'person-outline', label: 'Age', value: `${wrestler.age} years` },
    { icon: 'resize-outline', label: 'Height', value: wrestler.height },
    { icon: 'scale-outline', label: 'Weight', value: wrestler.weight },
    { icon: 'calendar-outline', label: 'Born', value: `${wrestler.dateOfBirth}, ${wrestler.placeOfBirth}` },
    { icon: 'flag-outline', label: 'Debut', value: wrestler.careerDebut },
    { icon: 'flame-outline', label: 'Style', value: wrestler.fightingStyle },
  ];

  return (
    <View>
      <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
        <Text className="text-white text-sm font-bold tracking-wider uppercase mb-4">Personal Info</Text>
        <View className="gap-4">
          {infoRows.map((row, i) => (
            <View key={i} className="flex-row items-center">
              <View className="w-8 h-8 rounded-lg bg-gwa-border items-center justify-center">
                <Ionicons name={row.icon as any} size={16} color="#8FA0BA" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-gwa-muted text-xs uppercase tracking-wider">{row.label}</Text>
                <Text className="text-white text-sm font-semibold mt-0.5">{row.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
        <Text className="text-white text-sm font-bold tracking-wider uppercase mb-3">Biography</Text>
        <Text className="text-gray-300 text-sm leading-6">{wrestler.biography}</Text>
      </View>

      {wrestler.titles.length > 0 && (
        <View className="bg-gwa-card rounded-2xl border border-gwa-border p-5 mb-4">
          <Text className="text-white text-sm font-bold tracking-wider uppercase mb-3">Titles & Achievements</Text>
          {wrestler.titles.map((title, i) => (
            <View key={i} className="flex-row items-center mb-2">
              <Ionicons name="trophy" size={16} color="#F59E0B" />
              <Text className="text-gray-300 text-sm ml-3">{title}</Text>
            </View>
          ))}
          <View className="h-px bg-gwa-border my-2" />
          {wrestler.achievements.map((achievement, i) => (
            <View key={i} className="flex-row items-center mb-2">
              <Ionicons name="star" size={16} color="#3B82F6" />
              <Text className="text-gray-300 text-sm ml-3">{achievement}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
