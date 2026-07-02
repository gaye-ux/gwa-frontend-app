import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome6 } from '@expo/vector-icons';

type TabIconProps = {
    focused: boolean;
    icon: React.ReactNode;
    label: string;
};

const ACTIVE_COLOR = '#E98C8C';
const INACTIVE_COLOR = '#8FA0BA';

// 1. Unified Global Header matching your exact design snippet
function GlobalHeader() {
    const insets = useSafeAreaInsets();
    return (
        <View
            className="bg-[#0D1527] border-b border-[#1E293B] px-5 flex-row items-center justify-between w-full"
            style={{
                paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10,
                height: Platform.OS === 'ios' ? 60 + insets.top : 70 + insets.top,
            }}
        >
            <TouchableOpacity activeOpacity={0.7} className="w-10 h-10 items-start justify-center">
                <Feather name="menu" size={26} color={ACTIVE_COLOR} />
            </TouchableOpacity>

            <View className="flex-1 items-center justify-center">
                <Text
                    style={{ color: ACTIVE_COLOR }}
                    className="text-xl font-black italic tracking-widest text-center uppercase"
                >
                    GWA Arena
                </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} className="w-10 h-10 items-end justify-center">
                <FontAwesome6 name="circle-user" size={24} color={ACTIVE_COLOR} />
            </TouchableOpacity>
        </View>
    );
}

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
    return (
        <Tabs
            screenOptions={{
                header: () => <GlobalHeader />, // Globally sets the header for all pages
                headerShown: true,              // Enables the custom header container
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: '#0D1527',
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#1E293B',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    height: Platform.OS === 'ios' ? 88 : 74,
                    paddingTop: 10,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    elevation: 0,
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
                name="media"
                options={{
                    title: 'Media',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            label="Media"
                            icon={
                                <Ionicons
                                    name={focused ? "play-circle" : "play-circle-outline"}
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