import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '@/components/common/SearchBar';
import { EmptyState } from '@/components/common/EmptyState';
import { searchAll } from '@/services/dataService';
import { SearchResult } from '@/services/types';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangeText = useCallback((text: string) => {
    setQuery(text);
    if (!text.trim()) { setResults([]); return; }
    setLoading(true);
    searchAll(text).then(setResults).catch(() => {}).finally(() => setLoading(false));
  }, []);

  function handleResultPress(result: SearchResult) {
    switch (result.type) {
      case 'wrestler':
        router.push(`/(screens)/wrestler-profile?id=${result.id}` as any);
        break;
      case 'event':
        router.push(`/(screens)/event-detail?eventId=${result.id}` as any);
        break;
      case 'ekiri':
        router.push(`/(screens)/ekiri-profile?id=${result.id}` as any);
        break;
    }
  }

  const typeIcons: Record<SearchResult['type'], keyof typeof Ionicons.glyphMap> = {
    wrestler: 'person', event: 'calendar', ekiri: 'people', news: 'newspaper',
  };

  return (
    <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
      <View className="px-5 pt-4 pb-3 border-b border-gwa-border">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#E98C8C" />
          </TouchableOpacity>
          <View className="flex-1">
            <SearchBar
              value={query}
              onChangeText={handleChangeText}
              placeholder="Search wrestlers, events, ekiris..."
              onClear={() => { setQuery(''); setResults([]); }}
              autoFocus
            />
          </View>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#E53E3E" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 8 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            query.trim() ? (
              <EmptyState icon="search-outline" title="No results found" subtitle={`No matches for "${query}"`} />
            ) : (
              <EmptyState icon="search-outline" title="Search GWA" subtitle="Find wrestlers, events, and ekiris" />
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => handleResultPress(item)}
              className="flex-row items-center px-5 py-3">
              {item.image ? (
                <Image source={item.image} className="w-10 h-10 rounded-full mr-3" resizeMode="cover" />
              ) : (
                <View className="w-10 h-10 rounded-full bg-gwa-card items-center justify-center mr-3">
                  <Ionicons name={typeIcons[item.type]} size={18} color="#8FA0BA" />
                </View>
              )}
              <View className="flex-1">
                <Text className="text-white text-sm font-bold">{item.title}</Text>
                <Text className="text-gwa-muted text-xs mt-0.5">{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8FA0BA" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
