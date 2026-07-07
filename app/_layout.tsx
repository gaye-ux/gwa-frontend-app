import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#0D1527" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(screens)/event-detail"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="(screens)/buy-tickets"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom', // Use a nice slide up for checkout
          }}
        />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        <Stack.Screen 
          name="(screens)/live-player" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
      </Stack>
    </>
  );
}