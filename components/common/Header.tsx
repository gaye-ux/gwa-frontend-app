import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { getUnreadCount } from '@/services/notificationsService';

const ACTIVE_COLOR = '#E98C8C';

export function GlobalHeader() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const unreadNotifs = getUnreadCount();

    return (
        <View
            className="bg-[#0D1527] border-b border-[#1E293B] px-5 flex-row items-center justify-between w-full"
            style={{
                paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10,
                height: Platform.OS === 'ios' ? 60 + insets.top : 70 + insets.top,
            }}
        >
            {/* Left: Menu */}
            <TouchableOpacity activeOpacity={0.7} className="w-10 h-10 items-start justify-center">
                <Feather name="menu" size={26} color={ACTIVE_COLOR} />
            </TouchableOpacity>

            {/* Center: Branding — tap to go home */}
            <TouchableOpacity
                onPress={() => router.push('/(tabs)' as any)}
                className="flex-1 items-center justify-center"
                activeOpacity={0.7}
            >
                <Text
                    style={{ color: ACTIVE_COLOR }}
                    className="text-xl font-black italic tracking-widest text-center uppercase"
                >
                    GWA Arena
                </Text>
            </TouchableOpacity>

            {/* Right: Search + Notifications + Profile */}
            <View className="flex-row items-center gap-3">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-8 h-10 items-center justify-center"
                    onPress={() => router.push('/(screens)/search' as any)}
                >
                    <Ionicons name="search-outline" size={22} color={ACTIVE_COLOR} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-8 h-10 items-center justify-center relative"
                    onPress={() => router.push('/(screens)/notifications' as any)}
                >
                    <Ionicons name="notifications-outline" size={22} color={ACTIVE_COLOR} />
                    {unreadNotifs > 0 && (
                        <View className="absolute top-2 right-1 w-4 h-4 rounded-full bg-gwa-red items-center justify-center">
                            <Text className="text-white text-[9px] font-bold">{unreadNotifs}</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-8 h-10 items-center justify-center"
                    onPress={() => {
                        if (!isAuthenticated) {
                            router.push('/(auth)/login' as any);
                        }
                    }}
                >
                    <FontAwesome6 name="circle-user" size={22} color={ACTIVE_COLOR} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default GlobalHeader;
