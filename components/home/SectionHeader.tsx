import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
    title: string;
    actionText?: string;
    onAction?: () => void;
    titleStyle?: 'default' | 'serif';
    icon?: React.ReactNode;
}

export default function SectionHeader({
    title,
    actionText,
    onAction,
    titleStyle = 'default',
    icon,
}: SectionHeaderProps) {
    return (
        <View className="flex-row items-center justify-between px-4 mb-3">
            <View className="flex-row items-center gap-2">
                {icon}
                <Text
                    className={`text-white text-lg tracking-wide ${
                        titleStyle === 'serif'
                            ? 'font-black italic'
                            : 'font-bold uppercase'
                    }`}
                >
                    {title}
                </Text>
            </View>
            {actionText && (
                <TouchableOpacity activeOpacity={0.7} onPress={onAction}>
                    <Text className="text-gwa-muted text-sm font-medium">
                        {actionText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
