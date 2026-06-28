import { View, Text } from 'react-native';

export default function Home() {
    return (
        <View className="flex-1 bg-black items-center justify-center">
            <Text className="text-white text-4xl font-bold">Welcome to GWA</Text>
            <Text className="text-gray-400 text-xl mt-3">Mr. Gaye</Text>
        </View>
    );
}