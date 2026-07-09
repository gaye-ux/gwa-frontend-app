import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { PrimaryButton } from '@/components/common/Button';

const CODE_LENGTH = 6;

export default function VerifyOtpScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyOtp, requestOtp } = useAuth();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    setCanResend(true);
  }, [resendTimer]);

  function handleChange(text: string, index: number) {
    const digit = text.replace(/[^0-9]/g, '');
    const newCode = [...code];

    if (!digit) {
      if (index > 0) {
        newCode[index] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    newCode[index] = digit[0];
    setCode(newCode);

    if (index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(key: string, index: number) {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    const otp = code.join('');
    if (otp.length !== CODE_LENGTH) {
      setError('Please enter the complete code');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await verifyOtp(phone || '', otp);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Invalid code. Please try again.');
      setCode(Array(CODE_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    setError('');

    try {
      await requestOtp(phone || '');
    } catch {
      setError('Failed to resend code');
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gwa-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 px-6" style={{ paddingTop: insets.top + 40 }}>
        {/* Back */}
        <TouchableOpacity onPress={() => router.back()} className="mb-8" activeOpacity={0.7}>
          <Text className="text-gwa-accent">← Back</Text>
        </TouchableOpacity>

        {/* Branding */}
        <View className="items-center mb-6">
          <Text className="text-gwa-accent text-3xl font-black italic tracking-widest uppercase mb-2">
            GWA Arena
          </Text>
        </View>

        {/* Instructions */}
        <Text className="text-white text-xl font-bold text-center mb-2">
          Enter Verification Code
        </Text>
        <Text className="text-gwa-muted text-sm text-center mb-10">
          Sent to {phone || 'your phone'}
        </Text>

        {/* OTP Input Boxes */}
        <View className="flex-row justify-center gap-3 mb-8">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              className={`w-12 h-14 border-2 rounded-xl text-center text-white text-xl font-bold ${
                code[index]
                  ? 'border-gwa-accent bg-gwa-card'
                  : 'border-gwa-border bg-gwa-card'
              }`}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              selectionColor="#E98C8C"
            />
          ))}
        </View>

        {/* Error */}
        {error ? (
          <Text className="text-gwa-red text-sm text-center mb-4">{error}</Text>
        ) : null}

        {/* Verify */}
        <PrimaryButton
          title={submitting ? 'Verifying...' : 'Verify'}
          onPress={handleVerify}
          containerClassName="w-full py-3.5 rounded-xl"
          color="#E53E3E"
        />

        {/* Resend */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={!canResend}
          className="items-center mt-8 py-2"
          activeOpacity={0.7}
        >
          <Text className={`text-sm ${canResend ? 'text-gwa-accent' : 'text-gwa-muted'}`}>
            {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
