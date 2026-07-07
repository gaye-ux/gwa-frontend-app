import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
    title: string;
    onPress: () => void;
    iconName?: keyof typeof Ionicons.glyphMap;
    containerClassName?: string;
    textClassName?: string;
    color?: string;
    textColor?: string;
}

export function PrimaryButton({
    title,
    onPress,
    iconName,
    containerClassName = '',
    textClassName = '',
    color = '#E53E3E',
    textColor = 'white'
}: ButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className={`rounded-lg py-2.5 px-4 flex-row items-center justify-center ${containerClassName}`}
            style={{ backgroundColor: color }}
        >
            {iconName && <Ionicons name={iconName} size={16} color={textColor} style={{ marginRight: 6 }} />}
            <Text
                className={`font-bold text-sm tracking-wider uppercase ${textClassName}`}
                style={{ color: textColor }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export function OutlineButton({
    title,
    onPress,
    iconName,
    containerClassName = '',
    textClassName = '',
    color = '#1E293B', // Default to gwa-border color
    textColor = 'white'
}: ButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className={`border rounded-lg py-2.5 px-4 flex-row items-center justify-center bg-transparent ${containerClassName}`}
            style={{ borderColor: color }}
        >
            {iconName && <Ionicons name={iconName} size={16} color={textColor} style={{ marginRight: 6 }} />}
            <Text
                className={`font-bold text-sm tracking-wider uppercase ${textClassName}`}
                style={{ color: textColor }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
