import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchTicketTiers, purchaseTickets } from '@/services/tickets';
import TicketTierCard from '@/components/tickets/TicketTierCard';

export default function BuyTicketsScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [tiers, setTiers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedTierId, setSelectedTierId] = React.useState<string>('');
  const [quantities, setQuantities] = React.useState<Record<string, number>>({});
  const [purchasing, setPurchasing] = React.useState(false);

  React.useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    fetchTicketTiers(eventId)
      .then(data => {
        setTiers(data);
        if (data.length > 0) setSelectedTierId(data[0].id);
        const q: Record<string, number> = {};
        data.forEach(t => { q[t.id] = 1; });
        setQuantities(q);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  const selectedTier = tiers.find(t => t.id === selectedTierId);
  const qty = quantities[selectedTierId] || 1;
  const unitPrice = selectedTier ? parseInt(selectedTier.price.replace(/[^0-9]/g, ''), 10) || 0 : 0;
  const total = unitPrice * qty;

  const handleQtyChange = (tierId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[tierId] || 1;
      const next = Math.max(1, Math.min(10, current + delta));
      return { ...prev, [tierId]: next };
    });
  };

  const handleBuy = async () => {
    if (!selectedTier || !eventId) return;
    setPurchasing(true);
    try {
      await purchaseTickets({ eventId, ticketTierId: selectedTier.id, quantity: qty });
      router.replace('/(screens)/my-tickets' as any);
    } catch (e: any) {
      Alert.alert('Purchase Failed', e.message || 'Something went wrong. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0D1527] items-center justify-center">
        <ActivityIndicator size="large" color="#E53E3E" />
        <Text className="text-white mt-4">Loading tickets…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0D1527] items-center justify-center">
        <Ionicons name="alert-circle-outline" size={48} color="#E53E3E" />
        <Text className="text-white mt-4 text-lg font-bold">Unable to load tickets</Text>
        <Text className="text-[#8FA0BA] mt-2 text-center px-8">{error}</Text>
        <TouchableOpacity className="mt-6 bg-[#E53E3E] rounded-xl px-8 py-3" onPress={() => router.back()}>
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0D1527]">
      <View className="flex-row items-center px-5 pb-4 border-b border-[#1E293B] bg-[#0D1527] z-10"
        style={{ paddingTop: insets.top + 8 }}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}
          className="w-10 h-10 items-center justify-center bg-[#18233A] rounded-full mr-4">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-black italic tracking-widest uppercase flex-1">
          Select Tickets
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}>

        <Text className="text-white text-base font-bold uppercase tracking-wider mb-4">
          Choose Your Experience
        </Text>

        {tiers.map((tier) => (
          <View key={tier.id} className="mb-4">
            <TicketTierCard
              tier={tier}
              isSelected={selectedTierId === tier.id}
              onSelect={() => setSelectedTierId(tier.id)}
            />
            {selectedTierId === tier.id && (
              <View className="flex-row items-center justify-center mt-3 bg-[#18233A] rounded-xl py-3 px-6 mx-4 border border-[#1E293B]">
                <TouchableOpacity onPress={() => handleQtyChange(tier.id, -1)}
                  className="w-10 h-10 rounded-full bg-[#0D1527] items-center justify-center border border-[#1E293B]">
                  <Ionicons name="remove" size={20} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold mx-8 w-8 text-center">{quantities[tier.id] || 1}</Text>
                <TouchableOpacity onPress={() => handleQtyChange(tier.id, 1)}
                  className="w-10 h-10 rounded-full bg-[#E53E3E] items-center justify-center">
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-[#0D1527] border-t border-[#1E293B]"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <View className="px-5 pt-4 pb-2 flex-row items-center justify-between">
          <View>
            <Text className="text-[#8FA0BA] text-xs uppercase tracking-wider">Total</Text>
            <Text className="text-white text-2xl font-black">GMD{total.toLocaleString()}</Text>
            <Text className="text-[#8FA0BA] text-[10px]">{qty} ticket{qty > 1 ? 's' : ''} · {selectedTier?.name || ''}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.85} disabled={purchasing}
            className="bg-[#E53E3E] rounded-xl py-4 px-8 items-center justify-center flex-row"
            onPress={handleBuy}>
            {purchasing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text className="text-white text-base font-black uppercase italic tracking-widest mr-2">
                  Buy Now
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
