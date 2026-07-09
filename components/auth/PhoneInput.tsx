import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const DEFAULT_CODE = '+220';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  editable?: boolean;
}

export function PhoneInput({
  value,
  onChangeText,
  error,
  editable = true,
}: PhoneInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = focused
    ? 'border-gwa-accent'
    : error
      ? 'border-gwa-red'
      : 'border-gwa-border';

  return (
    <View className="mb-4">
      <Text className="text-gwa-muted text-xs font-semibold tracking-wider uppercase mb-2 ml-1">
        Phone Number
      </Text>
      <View className={`flex-row items-center border rounded-xl overflow-hidden ${borderColor}`}>
        <View className="bg-[#1A2340] px-4 py-4 border-r border-gwa-border">
          <Text className="text-white text-base font-medium">{DEFAULT_CODE}</Text>
        </View>
        <TextInput
          className="flex-1 text-white text-base py-4 px-4 bg-gwa-card"
          value={value}
          onChangeText={onChangeText}
          placeholder="XXX XX XX XX"
          placeholderTextColor="#4A5568"
          keyboardType="phone-pad"
          maxLength={15}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor="#E98C8C"
        />
      </View>
      {error && (
        <Text className="text-gwa-red text-xs mt-1.5 ml-1">{error}</Text>
      )}
    </View>
  );
}
