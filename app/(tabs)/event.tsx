import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Events() {
    return (
        // Changed to match the deep navy palette from the navigation bar
        <View className="flex-1 bg-[#0D1527]">

            {/* Header Section */}
            <View className="pt-16 px-6 pb-4">
                <Text className="text-white text-3xl font-bold tracking-tight">
                    Events
                </Text>
                <Text className="text-[#8FA0BA] text-sm mt-1 font-medium">
                    Upcoming competitions
                </Text>
            </View>

            {/* Premium Empty State Content */}
            <View className="flex-1 items-center justify-center px-8 pb-24">

                {/* Visual Icon Container with a subtle glow profile */}
                <View className="w-20 h-20 bg-[#1E293B]/50 rounded-full items-center justify-center mb-5 border border-[#1E293B]">
                    <MaterialIcons
                        name="sports-kabaddi"
                        size={36}
                        color="#8FA0BA"
                    />
                </View>

                {/* Typography Block */}
                <Text className="text-white text-lg font-semibold tracking-wide text-center">
                    No Upcoming Events
                </Text>

                <Text className="text-[#8FA0BA] text-sm text-center mt-2 px-4 leading-5">
                    We couldn't find any matches scheduled right now. Check back soon for the latest schedule.
                </Text>

                {/* Optional Action Button to fill the space beautifully */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="mt-6 bg-[#E98C8C] px-6 py-2.5 rounded-full"
                >
                    <Text className="text-[#0D1527] font-semibold text-sm tracking-wide">
                        Refresh Feed
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}