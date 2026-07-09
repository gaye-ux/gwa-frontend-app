import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search wrestlers, events, ekiri...',
  onClear,
  autoFocus = false,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-gwa-card border border-gwa-border rounded-xl px-4 h-12">
      <Ionicons name="search-outline" size={18} color="#8FA0BA" />
      <TextInput
        className="flex-1 text-white text-base ml-3"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#4A5568"
        autoFocus={autoFocus}
        selectionColor="#E98C8C"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={18} color="#8FA0BA" />
        </TouchableOpacity>
      )}
    </View>
  );
}
