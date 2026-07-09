import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlobalHeader } from '@/components/common/Header';

type TabIconProps = {
    focused: boolean;
    icon: React.ReactNode;
    label: string;
};

const ACTIVE_COLOR = '#E98C8C';
const INACTIVE_COLOR = '#8FA0BA';


function TabIcon({ focused, icon, label }: TabIconProps) {
    return (
        <View className="items-center justify-center gap-1 w-full px-0.5">
            {icon}
            <Text
                style={{ color: focused ? ACTIVE_COLOR : INACTIVE_COLOR }}
                className="text-[11px] font-medium tracking-wide text-center"
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.85}
            >
                {label}
            </Text>
        </View>
    );
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    // --- Android Safe Area Logic ---
    // Gesture navigation:  insets.bottom = 0  → float 12px off the screen edge
    // 3-button nav bar:    insets.bottom ≈ 48px → sit 16px above it for clear separation
    // iOS home indicator:  insets.bottom = 34px → standard 8px gap above bar
    const tabBarBottom = Platform.OS === 'ios'
        ? insets.bottom + 8
        : Math.max(insets.bottom, 4);

    const tabBarHeight = Platform.OS === 'ios' ? 70 : 60;

    return (
        <Tabs
            screenOptions={{
                header: () => <GlobalHeader />, // Globally sets the header for all pages
                headerShown: true,              // Enables the custom header container
                tabBarLabel: () => null,
                tabBarStyle: {
                    left: 16,
                    right: 16,
                    borderWidth: 1,
                    elevation: 12,
                    paddingTop: 12,
                    shadowRadius: 16,
                    borderRadius: 28,
                    paddingBottom: 12,
                    shadowOpacity: 0.4,
                    shadowColor: '#000',
                    position: 'absolute',
                    borderColor: '#1E293B',
                    backgroundColor: '#0D1527',
                    shadowOffset: { width: 0, height: 6 },
                    bottom: tabBarBottom,
                    height: tabBarHeight,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Home"
                            icon={
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    size={24}
                                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                                />
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="event"
                options={{
                    title: 'Events',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Events"
                            icon={
                                <MaterialIcons
                                    name="sports-kabaddi"
                                    size={24}
                                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                                />
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="live"
                options={{
                    title: 'Live',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Live"
                            icon={
                                <MaterialCommunityIcons
                                    name="television-play"
                                    size={24}
                                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                                />
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="ranking"
                options={{
                    title: 'Rankings',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Rankings"
                            icon={
                                <Ionicons
                                    name="bar-chart-outline"
                                    size={24}
                                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                                />
                            }
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="tickets"
                options={{
                    title: 'Tickets',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Tickets"
                            icon={
                                <Ionicons
                                    name="ticket-outline"
                                    size={24}
                                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                                />
                            }
                        />
                    ),
                }}
            />

        </Tabs>
    );
}