import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ---------------------------------------------------------------------------
// BottomTicketBar
// ---------------------------------------------------------------------------
export default function BottomTicketBar() {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="absolute bottom-0 left-0 right-0 bg-[#0D1527] border-t border-[#1E293B]"
            style={{
                paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
            }}
        >
            <View className="px-5 py-4 w-full">
                <TouchableOpacity
                    activeOpacity={0.85}
                    className="bg-[#E53E3E] rounded py-4 w-full items-center justify-center"
                >
                    <Text className="text-white text-base font-black uppercase italic tracking-widest">
                        Buy Tickets
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
