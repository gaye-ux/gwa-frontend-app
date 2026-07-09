import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'phone-pad' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  maxLength?: number;
  editable?: boolean;
}

export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  maxLength,
  editable = true,
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);

  const isPassword = secureTextEntry;
  const [showPassword, setShowPassword] = useState(false);
  const effectiveSecure = isPassword ? !showPassword : false;

  const borderColor = focused
    ? 'border-gwa-accent'
    : error
      ? 'border-gwa-red'
      : 'border-gwa-border';

  return (
    <View className="mb-4">
      <Text className="text-gwa-muted text-xs font-semibold tracking-wider uppercase mb-2 ml-1">
        {label}
      </Text>
      <View
        className={`flex-row items-center border rounded-xl px-4 ${borderColor} bg-gwa-card`}
      >
        <TextInput
          className="flex-1 text-white text-base py-4"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#4A5568"
          secureTextEntry={effectiveSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor="#E98C8C"
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-2"
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#8FA0BA"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-gwa-red text-xs mt-1.5 ml-1">{error}</Text>
      )}
    </View>
  );
}
