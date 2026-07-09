import { useState, useEffect } from 'react';
import { fetchEvents, fetchNews } from '@/services/dataService';
import type { GwaEvent, NewsArticle } from '@/services/types';

export function useHomeData() {
  const [events, setEvents] = useState<GwaEvent[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchEvents({ upcoming: 'true' }).then(setEvents).catch(() => {}),
      fetchNews().then(setNews).catch(() => {}),
    ]).finally(() => setReady(true));
  }, []);

  return {
    mainEvent: events[0] ?? null,
    events,
    news,
    ready,
  };
}
