import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { arenaLiveMatch } from '@/services/homeData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Dummy chat messages
const INITIAL_MESSAGES = [
    { id: '1', user: 'SenegalKing', text: 'Let\'s go Eumeu!! 🔥', isVip: true },
    { id: '2', user: 'GWA_Fan99', text: 'This round is crazy', isVip: false },
    { id: '3', user: 'TaphaArmy', text: 'Tapha taking over now watch 🦁', isVip: false },
];

const NEW_MESSAGES = [
    { id: '4', user: 'BanjulBoy', text: 'What a throw!', isVip: false },
    { id: '5', user: 'WrestlingGod', text: 'Heavyweight clash of the century', isVip: true },
    { id: '6', user: 'DakarVibes', text: 'Eumeu looking tired...', isVip: false },
    { id: '7', user: 'SenegalKing', text: 'Never! He is just pacing himself 👑', isVip: true },
];

export default function LivePlayerScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'chat' | 'stats'>('chat');
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputMsg, setInputMsg] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Simulate incoming chat messages
    useEffect(() => {
        let msgIndex = 0;
        const interval = setInterval(() => {
            if (msgIndex < NEW_MESSAGES.length) {
                setMessages(prev => [...prev, NEW_MESSAGES[msgIndex]]);
                msgIndex++;
            } else {
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Pulsing dot animation loop
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

    const sendMessage = () => {
        if (!inputMsg.trim()) return;
        setMessages(prev => [...prev, { id: Date.now().toString(), user: 'You', text: inputMsg, isVip: false }]);
        setInputMsg('');
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* Header / Photo Banner */}
            <View className="relative w-full" style={{ height: SCREEN_WIDTH * 0.5625 }}>
                <ImageBackground
                    source={arenaLiveMatch.thumbnail}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                >
                    {/* Top Controls Gradient */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.8)']}
                        locations={[0, 0.5, 1]}
                        style={{ position: 'absolute', inset: 0 }}
                    />

                    {/* Top Bar */}
                    <View className="flex-row justify-between items-center p-4">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-8 h-8 rounded-full bg-black/50 items-center justify-center backdrop-blur-md"
                        >
                            <Ionicons name="chevron-down" size={20} color="#fff" />
                        </TouchableOpacity>

                        <View className="flex-row items-center bg-[#E53E3E]/90 rounded px-2 py-1">
                            <Animated.View 
                                style={{ opacity: pulseAnim }}
                                className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" 
                            />
                            <Text className="text-white text-[10px] font-extrabold uppercase tracking-widest">
                                Live
                            </Text>
                        </View>
                    </View>

                    {/* Bottom Details Bar */}
                    <View className="flex-row justify-between items-end p-4 absolute bottom-0 left-0 right-0">
                        <View>
                            <Text className="text-white text-base font-black italic uppercase">
                                {arenaLiveMatch.fighter1} <Text className="text-[#E53E3E]">VS</Text> {arenaLiveMatch.fighter2}
                            </Text>
                            <View className="flex-row items-center mt-1">
                                <Ionicons name="eye" size={12} color="#FBBF24" />
                                <Text className="text-[#FBBF24] text-[10px] font-bold tracking-widest ml-1">
                                    14.5K WATCHING
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            {/* Interactive Panel */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 bg-[#0D1527]"
            >
                {/* Tabs */}
                <View className="flex-row border-b border-[#1E293B]">
                    <TouchableOpacity 
                        onPress={() => setActiveTab('chat')}
                        className={`flex-1 py-4 items-center border-b-2 ${activeTab === 'chat' ? 'border-[#E53E3E]' : 'border-transparent'}`}
                    >
                        <Text className={`font-black uppercase tracking-widest text-xs ${activeTab === 'chat' ? 'text-white' : 'text-[#8FA0BA]'}`}>
                            Live Chat
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setActiveTab('stats')}
                        className={`flex-1 py-4 items-center border-b-2 ${activeTab === 'stats' ? 'border-[#E53E3E]' : 'border-transparent'}`}
                    >
                        <Text className={`font-black uppercase tracking-widest text-xs ${activeTab === 'stats' ? 'text-white' : 'text-[#8FA0BA]'}`}>
                            Match Stats
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tab Content */}
                {activeTab === 'chat' ? (
                    <View className="flex-1">
                        <ScrollView 
                            ref={scrollViewRef}
                            className="flex-1 px-4 pt-4"
                            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                        >
                            {messages.filter(msg => !!msg).map((msg) => (
                                <View key={msg.id} className="mb-3">
                                    <View className="flex-row items-center mb-0.5">
                                        <Text className={`text-[11px] font-bold ${msg.isVip ? 'text-[#FBBF24]' : 'text-[#8FA0BA]'}`}>
                                            {msg.user}
                                        </Text>
                                        {msg.isVip && <Ionicons name="star" size={8} color="#FBBF24" style={{ marginLeft: 4 }} />}
                                    </View>
                                    <Text className="text-white text-sm">
                                        {msg.text}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>

                        {/* Chat Input */}
                        <View className="p-4 border-t border-[#1E293B] flex-row items-center bg-[#18233A]">
                            <TextInput
                                value={inputMsg}
                                onChangeText={setInputMsg}
                                placeholder="Say something..."
                                placeholderTextColor="#8FA0BA"
                                className="flex-1 bg-[#0D1527] text-white rounded-full px-4 py-2 border border-[#1E293B]"
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity 
                                onPress={sendMessage}
                                className="w-10 h-10 ml-2 bg-[#E53E3E] rounded-full items-center justify-center"
                            >
                                <Ionicons name="send" size={16} color="#fff" style={{ marginLeft: 2 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="flex-1 items-center justify-center p-4">
                        <Ionicons name="bar-chart" size={48} color="#1E293B" />
                        <Text className="text-[#8FA0BA] text-sm font-bold uppercase tracking-widest mt-4">
                            Stats feed unavailable
                        </Text>
                        <Text className="text-[#8FA0BA]/50 text-xs text-center mt-2">
                            Live telemetry is currently disabled for this broadcast.
                        </Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
