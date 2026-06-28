import { View, Text } from 'react-native';

export default function Media() {
    return (
        <View className="flex-1 bg-black">
            <View className="pt-12 px-6">
                <Text className="text-white text-3xl font-bold">Media</Text>
                <Text className="text-gray-400 mt-2">Media</Text>
            </View>

            {/* Add your content here */}
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500 text-xl">No media data yet</Text>
            </View>
        </View>
    );
}