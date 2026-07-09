import { SearchResult, Wrestler, GwaEvent, Ekiri, NewsArticle } from './types';
import { wrestlers, ekiriList, eventsData, newsArticles } from './data';

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const w of wrestlers) {
    if (
      w.name.toLowerCase().includes(q) ||
      w.nickname.toLowerCase().includes(q) ||
      w.ekiriName.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'wrestler',
        id: w.id,
        title: w.name,
        subtitle: `${w.nickname} · ${w.ekiriName} · #${w.currentRanking}`,
        image: w.image,
      });
    }
  }

  for (const e of eventsData) {
    if (
      e.title.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.seriesName.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'event',
        id: e.id,
        title: e.title,
        subtitle: `${e.date} · ${e.venue}`,
        image: e.heroImage,
      });
    }
  }

  for (const ek of ekiriList) {
    if (
      ek.name.toLowerCase().includes(q) ||
      ek.location.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'ekiri',
        id: ek.id,
        title: ek.name,
        subtitle: `${ek.location} · Rank #${ek.ranking}`,
        image: ek.logo,
      });
    }
  }

  for (const n of newsArticles) {
    if (
      n.title.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'news',
        id: n.id,
        title: n.title,
        subtitle: `${n.category} · ${n.author}`,
      });
    }
  }

  return results;
}
