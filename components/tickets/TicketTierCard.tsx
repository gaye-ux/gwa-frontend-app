import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TicketTier } from '@/services/homeData';

interface TicketTierCardProps {
    tier: TicketTier;
    isSelected: boolean;
    onSelect: () => void;
}

export default function TicketTierCard({ tier, isSelected, onSelect }: TicketTierCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onSelect}
            className={`w-full rounded-2xl mb-4 p-5 border-2 ${
                isSelected 
                    ? 'bg-[#E53E3E]/10 border-[#E53E3E]' 
                    : 'bg-[#18233A] border-[#1E293B]'
            }`}
        >
            <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                    {/* Tier Badge / Name */}
                    <View className="flex-row items-center mb-1.5">
                        {tier.highlighted && (
                            <Ionicons name="star" size={14} color="#FBBF24" style={{ marginRight: 6 }} />
                        )}
                        <Text 
                            className={`text-[11px] font-black uppercase tracking-widest ${
                                isSelected ? 'text-[#E53E3E]' : 'text-[#8FA0BA]'
                            }`}
                        >
                            {tier.name}
                        </Text>
                    </View>

                    {/* Price */}
                    <Text className="text-white text-3xl font-black mb-1">
                        {tier.price}
                    </Text>

                    {/* Perks */}
                    <Text className="text-[#8FA0BA] text-xs font-medium leading-relaxed mt-1">
                        {tier.perks.replace('\n', ' ')}
                    </Text>
                </View>

                {/* Selection Radio / Check */}
                <View 
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                        isSelected ? 'border-[#E53E3E] bg-[#E53E3E]' : 'border-[#475569] bg-transparent'
                    }`}
                >
                    {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
            </View>
        </TouchableOpacity>
    );
}
