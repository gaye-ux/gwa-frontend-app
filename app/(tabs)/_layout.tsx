import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Platform, Text, View } from 'react-native';
import React from 'react';

type TabIconProps = {
    focused: boolean;
    icon: React.ReactNode;
    label: string;
};

const ACTIVE_COLOR = '#E98C8C';
const INACTIVE_COLOR = '#8FA0BA';

function TabIcon({ focused, icon, label }: TabIconProps) {
    return (
        // Added w-full and horizontal padding to give the text maximum breathing room per tab
        <View className="items-center justify-center gap-1 w-full px-0.5">
            {icon}
            <Text
                style={{ color: focused ? ACTIVE_COLOR : INACTIVE_COLOR }}
                className="text-[11px] font-medium tracking-wide text-center"
                numberOfLines={1}          // Forces text to stay on one line
                adjustsFontSizeToFit={true} // Shrinks font size gracefully on smaller devices
                minimumFontScale={0.85}     // Prevents it from shrinking too small to read
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
                headerShown: false,
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