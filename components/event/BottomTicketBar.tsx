import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

// ---------------------------------------------------------------------------
// BottomTicketBar
// ---------------------------------------------------------------------------
export default function BottomTicketBar() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { eventId } = useLocalSearchParams<{ eventId: string }>();

    return (
        <View
            className="absolute bottom-0 left-0 right-0 bg-[#0D1527] border-t border-[#1E293B]"
            style={{
                // On iOS, always trust insets.bottom (notch/home-indicator = 34px)
                // On Android: gesture nav gives insets.bottom = 0, but we still need breathing room.
                //             3-button nav gives insets.bottom ~48px. Use Math.max to handle both.
                paddingBottom: Math.max(insets.bottom, 16),
            }}
        >
            <View className="px-5 pt-4 w-full">
                <TouchableOpacity
                    activeOpacity={0.85}
                    className="bg-[#E53E3E] rounded py-4 w-full items-center justify-center"
                    onPress={() =>
                        router.push({
                            pathname: '/(screens)/buy-tickets',
                            params: { eventId: eventId },
                        })
                    }
                >
                    <Text className="text-white text-base font-black uppercase italic tracking-widest">
                        Buy Tickets
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
