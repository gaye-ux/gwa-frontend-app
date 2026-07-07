import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GwaEvent } from '@/services/homeData';
import { PrimaryButton, OutlineButton } from '@/components/common/Button';

interface UpcomingEventCardProps {
    event: GwaEvent;
}

export default function UpcomingEventCard({ event }: UpcomingEventCardProps) {
    const router = useRouter();

    return (
        <View className="bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border mb-6">
            {/* Top Image Section */}
            <View style={{ height: 180 }}>
                <ImageBackground
                    source={event.heroImage}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(19,27,46,0.5)', 'rgba(19,27,46,1)']}
                        locations={[0, 0.5, 1]}
                        style={{ position: 'absolute', inset: 0 }}
                    />
                </ImageBackground>
            </View>

            {/* Content Section */}
            <View className="px-5 pt-3 pb-5">
                {/* Badge / Category */}
                <Text className="text-[#FBBF24] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    {event.badge}
                </Text>

                {/* Title */}
                <Text className="text-white text-2xl font-black uppercase tracking-wide">
                    {event.title}
                </Text>
                
                {/* Subtitle / Series Name */}
                <Text className="text-gwa-muted text-xs font-medium mt-1">
                    {event.seriesName}
                </Text>

                {/* Date & Time */}
                <View className="flex-row items-center mt-4">
                    <Ionicons name="calendar-outline" size={16} color="#8FA0BA" />
                    <View className="ml-2">
                        <Text className="text-gwa-muted text-[9px] font-bold uppercase tracking-wider">
                            Date & Time
                        </Text>
                        <Text className="text-white text-sm font-bold uppercase tracking-wide">
                            {event.date} - {event.time}
                        </Text>
                    </View>
                </View>

                {/* Venue */}
                <View className="flex-row items-center mt-3 mb-5">
                    <Ionicons name="location-outline" size={16} color="#8FA0BA" />
                    <View className="ml-2">
                        <Text className="text-gwa-muted text-[9px] font-bold uppercase tracking-wider">
                            Venue
                        </Text>
                        <Text className="text-white text-sm font-bold tracking-wide">
                            {event.venue}
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row items-center justify-between">
                    <OutlineButton
                        title="View Details"
                        containerClassName="flex-1 mr-2"
                        onPress={() =>
                            router.push({
                                pathname: '/(screens)/event-detail',
                                params: { eventId: event.id },
                            })
                        }
                    />
                    <PrimaryButton
                        title="Buy Tickets"
                        iconName="ticket-outline"
                        containerClassName="flex-1 ml-2"
                        onPress={() =>
                            router.push({
                                pathname: '/(screens)/buy-tickets',
                                params: { eventId: event.id },
                            })
                        }
                    />
                </View>
            </View>
        </View>
    );
}
