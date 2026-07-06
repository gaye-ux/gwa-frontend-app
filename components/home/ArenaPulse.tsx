import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from './SectionHeader';
import { arenaPulseArticles, ArenaPulseArticle } from '@/services/homeData';

// ---------------------------------------------------------------------------
// Single article row
// ---------------------------------------------------------------------------
function ArticleRow({ article }: { article: ArenaPulseArticle }) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-start px-4 py-3"
        >
            {/* Category color bar */}
            <View
                className="w-1 rounded-full mt-1 mr-3"
                style={{ backgroundColor: article.categoryColor, height: 40 }}
            />

            {/* Content */}
            <View className="flex-1">
                <Text
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: article.categoryColor }}
                >
                    {article.category}
                </Text>
                <Text
                    className="text-white text-[15px] font-semibold leading-snug"
                    numberOfLines={2}
                >
                    {article.title}
                </Text>
                <Text className="text-gwa-muted text-xs font-medium mt-1">
                    {article.timestamp} • By{' '}
                    <Text className="text-gwa-accent">{article.author}</Text>
                </Text>
            </View>

            {/* Arrow */}
            <Ionicons
                name="chevron-forward"
                size={18}
                color="#8FA0BA"
                style={{ marginTop: 12 }}
            />
        </TouchableOpacity>
    );
}

// ---------------------------------------------------------------------------
// ArenaPulse
// ---------------------------------------------------------------------------
export default function ArenaPulse() {
    return (
        <View className="mt-8">
            <SectionHeader title="THE ARENA PULSE" titleStyle="serif" />

            <View className="mx-4 bg-gwa-card rounded-2xl overflow-hidden border border-gwa-border">
                {arenaPulseArticles.map((article, index) => (
                    <View key={article.id}>
                        <ArticleRow article={article} />
                        {index < arenaPulseArticles.length - 1 && (
                            <View className="h-px bg-gwa-border mx-4" />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}
