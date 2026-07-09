import React, { useEffect, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArenaMatch } from '@/services/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface FeaturedLiveStreamProps {
    match: ArenaMatch;
}

export default function FeaturedLiveStream({ match }: FeaturedLiveStreamProps) {
    const router = useRouter();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(`/(screens)/live-player?matchId=${match.id}`)}
            className="w-full mt-4 rounded-2xl overflow-hidden border border-gwa-border shadow-lg shadow-black/50"
        >
            <ImageBackground
                source={match.thumbnail}
                style={{ width: '100%', height: SCREEN_WIDTH * 0.6 }}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(13,21,39,0.7)', 'transparent', 'rgba(13,21,39,0.9)']}
                    locations={[0, 0.4, 1]}
                    style={{ position: 'absolute', inset: 0 }}
                />

                <View className="flex-row justify-between items-center p-3">
                    <View className="flex-row items-center bg-gwa-red/90 rounded px-2.5 py-1">
                        <Animated.View style={{ opacity: pulseAnim }} className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
                        <Text className="text-white text-[10px] font-extrabold uppercase tracking-widest">Live</Text>
                    </View>

                    <View className="flex-row items-center bg-black/60 rounded px-2.5 py-1">
                        <Ionicons name="eye" size={12} color="#FBBF24" style={{ marginRight: 6 }} />
                        <Text className="text-[#FBBF24] text-[10px] font-bold tracking-widest">14.5K</Text>
                    </View>
                </View>

                <View className="absolute inset-0 items-center justify-center pointer-events-none">
                    <View className="w-16 h-16 rounded-full bg-white/20 border border-white/30 items-center justify-center">
                        <Ionicons name="play" size={32} color="#fff" style={{ marginLeft: 4 }} />
                    </View>
                </View>

                <View className="flex-1 justify-end p-4">
                    <Text className="text-gwa-muted text-[10px] font-bold uppercase tracking-widest mb-1">
                        {match.championship} • {match.round}
                    </Text>
                    <Text className="text-white text-xl font-black uppercase italic leading-tight" numberOfLines={2}>
                        {match.fighter1} <Text className="text-gwa-red">VS</Text> {match.fighter2}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}
