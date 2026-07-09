import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { AuthInput } from '@/components/auth/AuthInput';
import { PrimaryButton } from '@/components/common/Button';

type LoginMode = 'pin' | 'otp';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login, requestOtp } = useAuth();

  const [mode, setMode] = useState<LoginMode>('pin');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function switchMode(newMode: LoginMode) {
    setMode(newMode);
    setError('');
  }

  function validate(): boolean {
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (mode === 'pin') {
      if (!pin) {
        setError('Please enter your PIN');
        return false;
      }
      if (pin.length < 4) {
        setError('PIN must be at least 4 digits');
        return false;
      }
    }
    return true;
  }

  async function handleSubmit() {
    setError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (mode === 'pin') {
        await login(phoneNumber, pin);
        router.replace('/(tabs)' as any);
      } else {
        await requestOtp(phoneNumber);
        router.push(`/(auth)/verify-otp?phone=${encodeURIComponent(phoneNumber)}` as any);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gwa-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: insets.top + 40, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6">
          {/* Branding */}
          <View className="items-center mb-10">
            <Text className="text-gwa-accent text-3xl font-black italic tracking-widest uppercase">
              GWA Arena
            </Text>
            <Text className="text-gwa-muted text-sm mt-1 tracking-wide">
              Gambia Wrestling Association
            </Text>
          </View>

          {/* Mode Toggle */}
          <View className="flex-row bg-gwa-card rounded-xl p-1 mb-8 border border-gwa-border">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg ${mode === 'pin' ? 'bg-gwa-accent' : ''}`}
              onPress={() => switchMode('pin')}
              activeOpacity={0.7}
            >
              <Text
                className={`text-center font-bold text-sm tracking-wider ${
                  mode === 'pin' ? 'text-white' : 'text-gwa-muted'
                }`}
              >
                PIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg ${mode === 'otp' ? 'bg-gwa-accent' : ''}`}
              onPress={() => switchMode('otp')}
              activeOpacity={0.7}
            >
              <Text
                className={`text-center font-bold text-sm tracking-wider ${
                  mode === 'otp' ? 'text-white' : 'text-gwa-muted'
                }`}
              >
                OTP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Input */}
          <PhoneInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={error && mode === 'pin' && !pin ? error : error && mode === 'otp' ? error : undefined}
          />

          {/* PIN Input */}
          {mode === 'pin' && (
            <AuthInput
              label="PIN"
              value={pin}
              onChangeText={setPin}
              placeholder="Enter your PIN"
              secureTextEntry
              keyboardType="number-pad"
              maxLength={6}
            />
          )}

          {/* Error */}
          {error ? (
            <Text className="text-gwa-red text-sm text-center mb-4">{error}</Text>
          ) : null}

          {/* Submit */}
          <PrimaryButton
            title={
              submitting
                ? 'Please wait...'
                : mode === 'pin'
                  ? 'Log In'
                  : 'Send Verification Code'
            }
            onPress={handleSubmit}
            containerClassName="w-full py-3.5 rounded-xl"
            color="#E53E3E"
          />

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gwa-border" />
            <Text className="text-gwa-muted text-xs mx-4 tracking-wider uppercase">
              or
            </Text>
            <View className="flex-1 h-px bg-gwa-border" />
          </View>

          {/* Create Account */}
          <TouchableOpacity
            onPress={() => router.push('/(auth)/register' as any)}
            className="items-center py-2"
            activeOpacity={0.7}
          >
            <Text className="text-gwa-muted text-sm">
              Don't have an account?{' '}
              <Text className="text-gwa-accent font-bold">Create Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
