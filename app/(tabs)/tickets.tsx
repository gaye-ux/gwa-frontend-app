import React from 'react';
import { View } from 'react-native';

import MyTicketsView from '@/components/tickets/MyTicketsView';

export default function TicketsTab() {
  return (
    <View className="flex-1 bg-[#0D1527]">
      <MyTicketsView />
    </View>
  );
}
