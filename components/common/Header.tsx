import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
    const insets = useSafeAreaInsets();

    const BRAND_COLOR = '#E98C8C'; // Pink/Coral brand color from your image

    return (
        <View
            className="bg-[#0D1527] border-b border-[#1E293B] px-5 flex-row items-center justify-between w-full"
            style={{
                paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10,
                height: Platform.OS === 'ios' ? 60 + insets.top : 70 + insets.top,
            }}
        >
            {/* Left Action: Hamburger Menu */}
            <TouchableOpacity
                activeOpacity={0.7}
                className="w-10 h-10 items-start justify-center"
            >
                <Feather name="menu" size={26} color={BRAND_COLOR} />
            </TouchableOpacity>

            {/* Center Branding: Bold, Italic Stylized Title */}
            <View className="flex-1 items-center justify-center">
                <Text
                    style={{ color: BRAND_COLOR }}
                    className="text-xl font-black italic tracking-widest text-center uppercase"
                >
                    GWA Arena
                </Text>
            </View>

            {/* Right Action: Profile/Account Circle */}
            <TouchableOpacity
                activeOpacity={0.7}
                className="w-10 h-10 items-end justify-center"
            >
                <FontAwesome6 name="circle-user" size={24} color={BRAND_COLOR} />
            </TouchableOpacity>
        </View>
    );
}