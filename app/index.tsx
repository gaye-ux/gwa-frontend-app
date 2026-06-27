import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold mb-2">Welcome to Expo Router</Text>
      <Text className="text-base text-gray-600">Your clean setup is ready!</Text>
    </View>
  );
}
