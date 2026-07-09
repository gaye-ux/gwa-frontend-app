import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { AuthInput } from '@/components/auth/AuthInput';
import { PrimaryButton } from '@/components/common/Button';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { register } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!phoneNumber.trim()) newErrors.phone = 'Phone number is required';
    if (!fullName.trim()) newErrors.name = 'Full name is required';
    if (!pin) newErrors.pin = 'PIN is required';
    if (pin && pin.length < 4) newErrors.pin = 'PIN must be at least 4 digits';
    if (pin !== confirmPin) newErrors.confirmPin = 'PINs do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    if (!validate()) return;

    setSubmitting(true);
    try {
      await register(phoneNumber, fullName, pin);
      router.replace('/(tabs)');
    } catch (err: any) {
      setErrors({ form: err.message || 'Registration failed' });
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
          {/* Back */}
          <TouchableOpacity onPress={() => router.back()} className="mb-6" activeOpacity={0.7}>
            <Text className="text-gwa-accent">← Back</Text>
          </TouchableOpacity>

          {/* Branding */}
          <View className="items-center mb-10">
            <Text className="text-gwa-accent text-3xl font-black italic tracking-widest uppercase">
              GWA Arena
            </Text>
            <Text className="text-gwa-muted text-sm mt-1">Create Your Account</Text>
          </View>

          {/* Form */}
          <PhoneInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors.phone}
          />

          <AuthInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            autoCapitalize="words"
            error={errors.name}
          />

          <AuthInput
            label="PIN"
            value={pin}
            onChangeText={setPin}
            placeholder="4-6 digit PIN"
            secureTextEntry
            keyboardType="number-pad"
            maxLength={6}
            error={errors.pin}
          />

          <AuthInput
            label="Confirm PIN"
            value={confirmPin}
            onChangeText={setConfirmPin}
            placeholder="Re-enter your PIN"
            secureTextEntry
            keyboardType="number-pad"
            maxLength={6}
            error={errors.confirmPin}
          />

          {errors.form ? (
            <Text className="text-gwa-red text-sm text-center mb-4">{errors.form}</Text>
          ) : null}

          <PrimaryButton
            title={submitting ? 'Please wait...' : 'Create Account'}
            onPress={handleRegister}
            containerClassName="w-full py-3.5 rounded-xl mt-2"
            color="#E53E3E"
          />

          {/* Login link */}
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login' as any)}
            className="items-center mt-6 py-2"
            activeOpacity={0.7}
          >
            <Text className="text-gwa-muted text-sm">
              Already have an account?{' '}
              <Text className="text-gwa-accent font-bold">Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
