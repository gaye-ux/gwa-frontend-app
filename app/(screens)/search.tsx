import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '@/components/common/SearchBar';
import { EmptyState } from '@/components/common/EmptyState';
import { searchAll } from '@/services/search';
import { SearchResult } from '@/services/types';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    setResults(searchAll(text));
  }, []);

  function handleResultPress(result: SearchResult) {
    switch (result.type) {
      case 'wrestler':
        router.push(`/(screens)/wrestler-profile?id=${result.id}` as any);
        break;
      case 'event':
        router.push(`/(screens)/event-detail?id=${result.id}` as any);
        break;
      case 'ekiri':
        router.push(`/(screens)/ekiri-profile?id=${result.id}` as any);
        break;
    }
  }

  const typeIcons: Record<SearchResult['type'], keyof typeof Ionicons.glyphMap> = {
    wrestler: 'person',
    event: 'calendar',
    ekiri: 'people',
    news: 'newspaper',
  };

  return (
    <View className="flex-1 bg-gwa-dark" style={{ paddingTop: insets.top }}>
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-3" activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#E98C8C" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold flex-1">Search</Text>
        </View>
        <SearchBar
          value={query}
          onChangeText={handleSearch}
          autoFocus
          onClear={() => {
            setQuery('');
            setResults([]);
          }}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, flexGrow: 1 }}
        ListEmptyComponent={
          query.length > 0 ? (
            <EmptyState
              icon="search-outline"
              title="No results found"
              subtitle={`No results for "${query}". Try a different search term.`}
            />
          ) : (
            <EmptyState
              icon="search-outline"
              title="Search GWA Arena"
              subtitle="Find wrestlers, events, ekiri, and news"
            />
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleResultPress(item)}
            className="flex-row items-center bg-gwa-card rounded-xl border border-gwa-border p-4 mb-2"
            activeOpacity={0.7}
          >
            {item.image ? (
              <Image source={item.image} className="w-12 h-12 rounded-full" />
            ) : (
              <View className="w-12 h-12 rounded-full bg-gwa-border items-center justify-center">
                <Ionicons name={typeIcons[item.type]} size={20} color="#8FA0BA" />
              </View>
            )}
            <View className="flex-1 ml-3">
              <Text className="text-white text-sm font-bold">{item.title}</Text>
              <Text className="text-gwa-muted text-xs mt-0.5">{item.subtitle}</Text>
            </View>
            <View className="bg-gwa-border px-2 py-1 rounded">
              <Text className="text-gwa-muted text-[10px] uppercase tracking-wider">{item.type}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
