import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyTicketsView from '@/components/tickets/MyTicketsView';

export default function MyTicketsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#0D1527]">
      <View className="flex-row items-center px-5 pb-4 border-b border-[#1E293B]"
        style={{ paddingTop: insets.top + 8, backgroundColor: '#0D1527' }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}
          className="w-10 h-10 items-center justify-center bg-[#18233A] rounded-full mr-4">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-black italic tracking-widest uppercase flex-1">
          My Tickets
        </Text>
      </View>
      <MyTicketsView />
    </View>
  );
}
