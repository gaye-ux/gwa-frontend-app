import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fetchMyTickets } from '@/services/tickets';
import { TicketPurchase } from '@/services/types';
import { useAuth } from '@/contexts/AuthContext';

function TicketQRDisplay({ code }: { code: string }) {
  const chars = code.split('');
  const rows = 9;
  const cols = Math.ceil(chars.length / rows);
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    grid.push(chars.slice(r * cols, (r + 1) * cols));
  }
  return (
    <View className="items-center justify-center">
      <View className="bg-white rounded-2xl p-4 mb-3">
        {grid.map((row, ri) => (
          <View key={ri} className="flex-row">
            {row.map((ch, ci) => (
              <View key={ci}
                className={`w-[7px] h-[7px] m-[1px] ${ch.charCodeAt(0) % 3 === 0 ? 'bg-black' : ch.charCodeAt(0) % 3 === 1 ? 'bg-gray-800' : 'bg-white border border-gray-300'}`}
              />
            ))}
          </View>
        ))}
      </View>
      <Text className="text-white text-xs font-mono tracking-widest">{code}</Text>
    </View>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: '#065F46', text: '#6EE7B7', label: 'Active' },
    used: { bg: '#1E3A5F', text: '#93C5FD', label: 'Used' },
    cancelled: { bg: '#5F1E1E', text: '#FCA5A5', label: 'Cancelled' },
    expired: { bg: '#4A4A4A', text: '#D1D5DB', label: 'Expired' },
  };
  const s = colors[status] || colors.active;
  return (
    <View className="rounded-full px-3 py-1" style={{ backgroundColor: s.bg }}>
      <Text className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.text }}>{s.label}</Text>
    </View>
  );
}

export default function MyTicketsView() {
  const router = useRouter();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await fetchMyTickets();
      setTickets(data);
    } catch { }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Ionicons name="ticket-outline" size={64} color="#8FA0BA" />
        <Text className="text-white text-lg font-bold mt-6">Sign in to view tickets</Text>
        <Text className="text-[#8FA0BA] mt-2 text-center px-8">You need to be logged in to see your purchased tickets.</Text>
        <TouchableOpacity className="mt-6 bg-[#E53E3E] rounded-xl px-8 py-3"
          onPress={() => router.push('/(auth)/login' as any)}>
          <Text className="text-white font-bold uppercase tracking-wider">Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#E53E3E" />
      </View>
    );
  }

  if (tickets.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Ionicons name="ticket-outline" size={64} color="#8FA0BA" />
        <Text className="text-white text-lg font-bold mt-6">No Tickets Yet</Text>
        <Text className="text-[#8FA0BA] mt-2 text-center">
          You haven&apos;t purchased any tickets yet. Browse upcoming events and grab your seats!
        </Text>
        <TouchableOpacity className="mt-6 bg-[#E53E3E] rounded-xl px-8 py-3"
          onPress={() => router.push('/(tabs)/event' as any)}>
          <Text className="text-white font-bold uppercase tracking-wider">Browse Events</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor="#E53E3E" />}>
      {tickets.map((ticket) => {
        const isExpanded = expandedId === ticket.id;
        return (
          <TouchableOpacity key={ticket.id} activeOpacity={0.9}
            onPress={() => setExpandedId(isExpanded ? null : ticket.id)}
            className="bg-[#18233A] rounded-2xl mb-4 overflow-hidden border border-[#1E293B]">
            <View className="flex-row">
              <Image source={ticket.image} style={{ width: 90, height: 100 }} resizeMode="cover" />
              <View className="flex-1 p-3 justify-center">
                <StatusBadge status={ticket.status} />
                <Text className="text-white text-sm font-black uppercase mt-2 leading-tight" numberOfLines={2}>
                  {ticket.eventName}
                </Text>
                <Text className="text-[#8FA0BA] text-[10px] font-bold uppercase tracking-wider mt-1">
                  {ticket.venue}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="calendar-outline" size={11} color="#8FA0BA" />
                  <Text className="text-[#8FA0BA] text-[9px] font-bold ml-1 uppercase tracking-wider">
                    {new Date(ticket.eventDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </Text>
                </View>
              </View>
              <View className="justify-center pr-3">
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#8FA0BA" />
              </View>
            </View>

            {isExpanded && (
              <View className="border-t border-[#1E293B] px-4 py-4">
                <View className="flex-row justify-between mb-3">
                  <View>
                    <Text className="text-[#8FA0BA] text-[10px] uppercase tracking-wider">Tier</Text>
                    <Text className="text-white text-sm font-bold uppercase">{ticket.ticketName}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-[#8FA0BA] text-[10px] uppercase tracking-wider">Qty</Text>
                    <Text className="text-white text-sm font-bold">{ticket.quantity}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-[#8FA0BA] text-[10px] uppercase tracking-wider">Total</Text>
                    <Text className="text-white text-sm font-bold">{ticket.currency}{ticket.totalPrice.toLocaleString()}</Text>
                  </View>
                </View>

                <View className="border-t border-dashed border-[#1E293B] pt-4 mt-2">
                  <Text className="text-[#8FA0BA] text-[10px] uppercase tracking-wider text-center mb-3">
                    Your Digital Ticket
                  </Text>
                  <TicketQRDisplay code={ticket.qrCode} />
                </View>

                <Text className="text-[#4A5568] text-[9px] text-center mt-3 uppercase tracking-wider">
                  Purchased {new Date(ticket.purchasedAt).toLocaleDateString()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
