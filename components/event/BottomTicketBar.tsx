import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ---------------------------------------------------------------------------
// BottomTicketBar
// ---------------------------------------------------------------------------
export default function BottomTicketBar({ startingPrice }: { startingPrice: string }) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="absolute bottom-0 left-0 right-0 bg-gwa-dark/95 border-t border-gwa-border"
            style={{
                paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
            }}
        >
            <View className="flex-row items-center justify-between px-5 py-3">
                {/* Price info */}
                <View>
                    <Text className="text-gwa-muted text-[10px] font-semibold uppercase tracking-wider">
                        Starting From
                    </Text>
                    <View className="flex-row items-baseline">
                        <Text className="text-white text-xl font-black">
                            {startingPrice}
                        </Text>
                        <Text className="text-gwa-muted text-xs font-medium ml-1">
                            /per seat
                        </Text>
                    </View>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    activeOpacity={0.85}
                    className="bg-gwa-red rounded-xl px-5 py-3.5 flex-row items-center"
                    style={{
                        shadowColor: '#E53E3E',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.35,
                        shadowRadius: 8,
                        elevation: 6,
                    }}
                >
                    <Ionicons name="ticket-outline" size={18} color="#fff" />
                    <Text className="text-white text-sm font-extrabold uppercase tracking-wider ml-2">
                        Buy Tickets Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
