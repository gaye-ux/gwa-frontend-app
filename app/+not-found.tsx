import { Link, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />

      <View className="flex-1 bg-black items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-zinc-900 items-center justify-center mb-8">
          <Ionicons name="compass-outline" size={52} color="#FF3B5C" />
        </View>

        <Text className="text-white text-4xl font-bold text-center mb-3">
          Page Not Found
        </Text>

        <Text className="text-gray-400 text-xl text-center mb-10 max-w-[280px]">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Pressable className="bg-white active:bg-gray-200 px-10 py-4 rounded-2xl flex-row items-center gap-3">
            <Ionicons name="home" size={22} color="#000" />
            <Text className="text-black font-semibold text-lg">
              Go Back Home
            </Text>
          </Pressable>
        </Link>

        <Text className="text-gray-500 mt-12 text-sm">
          Need help? Contact support
        </Text>
      </View>
    </>
  );
}