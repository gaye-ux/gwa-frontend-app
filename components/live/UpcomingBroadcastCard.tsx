import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SeasonCalendarEvent } from '@/services/homeData';

interface UpcomingBroadcastCardProps {
    event: SeasonCalendarEvent;
}

export default function UpcomingBroadcastCard({ event }: UpcomingBroadcastCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center bg-[#18233A] border border-[#1E293B] rounded-xl p-3 mb-3"
        >
            {/* Thumbnail */}
            <View className="relative w-24 h-16 rounded-lg overflow-hidden mr-4 border border-[#1E293B]">
                <Image 
                    source={event.thumbnail} 
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 items-center justify-center bg-black/30">
                    <Ionicons name="play-circle" size={24} color="#fff" opacity={0.8} />
                </View>
            </View>

            {/* Details */}
            <View className="flex-1 justify-center">
                <Text className="text-[#FBBF24] text-[9px] font-bold uppercase tracking-widest mb-1">
                    {event.type}
                </Text>
                <Text className="text-white text-sm font-black uppercase italic tracking-wide mb-1" numberOfLines={1}>
                    {event.title}
                </Text>
                
                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={10} color="#8FA0BA" />
                    <Text className="text-[#8FA0BA] text-[10px] font-bold uppercase tracking-widest ml-1 mr-3">
                        {event.date}
                    </Text>
                </View>
            </View>
            
            {/* Notification Bell */}
            <View className="w-8 h-8 rounded-full bg-[#0D1527] border border-[#1E293B] items-center justify-center">
                <Ionicons name="notifications-outline" size={14} color="#8FA0BA" />
            </View>
        </TouchableOpacity>
    );
}
