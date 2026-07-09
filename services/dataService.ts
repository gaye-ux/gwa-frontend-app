import { BE } from './be';
import {
  Wrestler, Ekiri, GwaEvent, Combat, HeadToHead,
  NewsArticle, AppNotification, SearchResult, TicketTier, TicketPurchase,
} from './types';
import {
  wrestlers as mockWrestlers,
  ekiriList as mockEkiri,
  eventsData as mockEvents,
  combats as mockCombats,
  headToHeads as mockHeadToHeads,
  newsArticles as mockNews,
  notificationsData as mockNotifications,
} from './data';

function beWrestlerToFE(w: any): Wrestler {
  return {
    id: w.id,
    name: w.name,
    nickname: w.alias || w.name,
    age: w.age || 0,
    height: BE.fmtHeight(w.heightCm),
    weight: BE.fmtWeight(w.weightKg),
    dateOfBirth: '',
    placeOfBirth: w.nationality || '',
    biography: w.bio || '',
    image: w.imageUrl ? { uri: w.imageUrl } : require('@/assets/images/fighter_1.png'),
    gallery: w.imageUrl ? [{ uri: w.imageUrl }] : [],
    ekiriId: w.ekiriId || '',
    ekiriName: w.ekiri?.name || '',
    careerDebut: '',
    totalFights: (w.wins || 0) + (w.losses || 0) + (w.draws || 0),
    wins: w.wins || 0,
    losses: w.losses || 0,
    draws: w.draws || 0,
    knockouts: Math.round((w.wins || 0) * 0.5),
    winningPercentage: w.wins + w.losses > 0 ? Math.round((w.wins / (w.wins + w.losses)) * 100) : 0,
    currentRanking: w.rank || 99,
    titles: [],
    achievements: [],
    fightingStyle: '',
    last5Results: [],
    winStreak: 0,
    points: ((w.wins || 0) * 50) - ((w.losses || 0) * 20),
  };
}

function beEkiriToFE(e: any): Ekiri {
  return {
    id: e.id,
    name: e.name,
    logo: e.imageUrl ? { uri: e.imageUrl } : require('@/assets/images/fighter_1.png'),
    bannerColor: '#18233A',
    description: e.bio || '',
    history: '',
    founded: e.founded?.toString() || '',
    location: e.location || '',
    totalFights: e._count?.wrestlers || e.members || 0,
    totalVictories: 0,
    totalTitles: 0,
    ranking: e.rank || 99,
    wrestlerIds: [],
    coach: e.coach || '',
  };
}

function beEventToFE(ev: any): GwaEvent {
  const headlinerName = ev.headliner?.name || ev.title || '';
  const coHeadlinerName = ev.coHeadliner?.name || '';
  const d = new Date(ev.date);
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' GMT';

  return {
    id: ev.id,
    badge: ev.status === 'LIVE' ? 'LIVE NOW' : ev.status === 'COMPLETED' ? 'PAST EVENT' : 'UPCOMING',
    seriesName: ev.subtitle || '',
    title: ev.title,
    fighter1Id: ev.headlinerId || '',
    fighter2Id: ev.coHeadlinerId || '',
    fighter1Name: headlinerName,
    fighter2Name: coHeadlinerName,
    date: dateStr,
    time: timeStr,
    venue: ev.venue,
    countdownTarget: ev.date,
    heroImage: ev.imageUrl ? { uri: ev.imageUrl } : require('@/assets/images/hero_fighters.png'),
    status: ev.status === 'LIVE' ? 'live' : ev.status === 'COMPLETED' ? 'finished' : 'upcoming',
    description: ev.description || '',
    sponsors: ev.sponsors || [],
    combatIds: [],
    tickets: [],
    startingPrice: ev.ticketPrice || 'D500',
  };
}

function beCombatToFE(c: any): Combat {
  return {
    id: c.id,
    eventId: c.eventId,
    fighter1Id: c.wrestlerAId || '',
    fighter2Id: c.wrestlerBId || '',
    isMainCombat: c.isMainEvent || false,
    title: c.title || undefined,
    championship: c.title || undefined,
    odds1: undefined,
    odds2: undefined,
    status: c.status === 'COMPLETED' ? 'finished' : c.status === 'IN_PROGRESS' ? 'live' : 'upcoming',
    winnerId: c.winnerId || undefined,
    result: c.result || undefined,
    duration: undefined,
    round: c.round?.toString(),
    referee: undefined,
    order: c.boutOrder || 0,
  };
}

// ── Wrestlers ──────────────────────────────────────────

export async function fetchWrestlers(params?: { search?: string; ekiriId?: string; sort?: string }): Promise<Wrestler[]> {
  try {
    const qs = new URLSearchParams();
    if (params?.search) qs.set('search', params.search);
    if (params?.ekiriId) qs.set('ekiriId', params.ekiriId);
    if (params?.sort) qs.set('sort', params.sort);
    const res = await BE.get<{ wrestlers: any[] }>(`/wrestlers${qs.toString() ? '?' + qs.toString() : ''}`);
    return res.wrestlers.map(beWrestlerToFE);
  } catch {
    return params?.ekiriId ? mockWrestlers.filter(w => w.ekiriId === params.ekiriId) : mockWrestlers;
  }
}

export async function fetchWrestler(id: string): Promise<Wrestler | null> {
  try {
    const res = await BE.get<{ wrestler: any }>(`/wrestlers/${id}`);
    const w = beWrestlerToFE(res.wrestler);
    if (res.wrestler.headToHeads) {
      (w as any).__h2h = res.wrestler.headToHeads;
    }
    return w;
  } catch {
    return mockWrestlers.find(w => w.id === id) || null;
  }
}

// ── Ekiri ──────────────────────────────────────────────

export async function fetchEkiriList(): Promise<Ekiri[]> {
  try {
    const res = await BE.get<{ ekiris: any[] }>('/ekiri');
    return res.ekiris.map(beEkiriToFE);
  } catch {
    return mockEkiri;
  }
}

export async function fetchEkiri(id: string): Promise<Ekiri | null> {
  try {
    const res = await BE.get<{ ekiri: any }>(`/ekiri/${id}`);
    const ekiri = beEkiriToFE(res.ekiri);
    if (res.ekiri.wrestlers) {
      (ekiri as any).__members = res.ekiri.wrestlers.map(beWrestlerToFE);
    }
    return ekiri;
  } catch {
    return mockEkiri.find(e => e.id === id) || null;
  }
}

// ── Events ─────────────────────────────────────────────

export async function fetchEvents(params?: { status?: string; category?: string; upcoming?: string }): Promise<GwaEvent[]> {
  try {
    const qs = new URLSearchParams();
    if (params?.status) qs.set('status', params.status);
    if (params?.category) qs.set('category', params.category);
    if (params?.upcoming) qs.set('upcoming', params.upcoming);
    const res = await BE.get<{ events: any[] }>(`/events${qs.toString() ? '?' + qs.toString() : ''}`);
    return res.events.map(beEventToFE);
  } catch {
    return mockEvents;
  }
}

export async function fetchEvent(id: string): Promise<GwaEvent | null> {
  try {
    const res = await BE.get<{ event: any }>(`/events/${id}`);
    const ev = beEventToFE(res.event);
    if (res.event.combats) {
      (ev as any).__combats = res.event.combats.map(beCombatToFE);
    }
    if (res.event.ticketTiers) {
      ev.tickets = res.event.ticketTiers.map((t: any) => ({
        id: t.id,
        name: t.name,
        price: `${t.currency || 'GMD'}${t.price}`,
        perks: (t.benefits || []).join(' · '),
        available: t.available,
        total: t.seats,
        highlighted: t.name === 'VIP' || t.name === 'PREMIUM',
      }));
      ev.startingPrice = `${ev.tickets[0]?.price || 'D500'}`;
    }
    return ev;
  } catch {
    const ev = mockEvents.find(e => e.id === id);
    if (ev) {
      ev.tickets = ev.tickets || [];
    }
    return ev || null;
  }
}

// ── Combats ────────────────────────────────────────────

export async function fetchCombats(eventId?: string): Promise<Combat[]> {
  try {
    const qs = eventId ? `?eventId=${eventId}` : '';
    const res = await BE.get<{ combats: any[] }>(`/combats${qs}`);
    return res.combats.map(beCombatToFE);
  } catch {
    return eventId ? mockCombats.filter(c => c.eventId === eventId).sort((a, b) => a.order - b.order) : mockCombats;
  }
}

export async function fetchCombat(id: string): Promise<Combat | null> {
  try {
    const res = await BE.get<{ combat: any }>(`/combats/${id}`);
    return beCombatToFE(res.combat);
  } catch {
    return mockCombats.find(c => c.id === id) || null;
  }
}

// ── Rankings ───────────────────────────────────────────

export async function fetchRankings(weightClass?: string): Promise<Wrestler[]> {
  try {
    const qs = weightClass ? `?weightClass=${weightClass}` : '';
    const res = await BE.get<{ rankings: any[] }>(`/rankings${qs}`);
    return res.rankings.map(beWrestlerToFE);
  } catch {
    return [...mockWrestlers].sort((a, b) => (b.currentRanking || 99) - (a.currentRanking || 99));
  }
}

// ── News ───────────────────────────────────────────────

export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    const res = await BE.get<{ articles: any[] }>('/news');
    return res.articles.map((a: any) => ({
      id: a.id,
      category: a.category || 'GENERAL',
      categoryColor: '#3B82F6',
      title: a.title,
      timestamp: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : '',
      author: a.author || 'GWA Editorial',
      content: a.content || a.excerpt || '',
      image: a.imageUrl ? { uri: a.imageUrl } : undefined,
    }));
  } catch {
    return mockNews;
  }
}

// ── Notifications ──────────────────────────────────────

export async function fetchNotifications(): Promise<AppNotification[]> {
  try {
    const res = await BE.get<{ notifications: any[] }>('/notifications');
    return res.notifications.map((n: any) => ({
      id: n.id,
      type: (n.type || 'general').toLowerCase() as AppNotification['type'],
      title: n.title,
      body: n.body,
      timestamp: new Date(n.createdAt).toLocaleDateString(),
      read: n.isRead,
      link: n.data?.link,
    }));
  } catch {
    return mockNotifications;
  }
}

export async function markNotificationRead(id: string): Promise<void> {
  try {
    await BE.patch(`/notifications/${id}/read`);
  } catch { /* ignore */ }
}

export async function markAllNotificationsRead(): Promise<void> {
  try {
    await BE.patch('/notifications/read-all');
  } catch { /* ignore */ }
}

// ── Search ─────────────────────────────────────────────

export async function searchAll(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  try {
    const wrestlers = await fetchWrestlers({ search: query });
    const results: SearchResult[] = wrestlers.map(w => ({
      type: 'wrestler' as const,
      id: w.id,
      title: w.name,
      subtitle: `${w.nickname} · ${w.ekiriName} · #${w.currentRanking}`,
      image: w.image,
    }));
    return results.slice(0, 20);
  } catch {
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    for (const w of mockWrestlers) {
      if (w.name.toLowerCase().includes(q) || w.nickname.toLowerCase().includes(q)) {
        results.push({ type: 'wrestler', id: w.id, title: w.name, subtitle: `${w.nickname} · ${w.ekiriName} · #${w.currentRanking}`, image: w.image });
      }
    }
    for (const e of mockEvents) {
      if (e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)) {
        results.push({ type: 'event', id: e.id, title: e.title, subtitle: `${e.date} · ${e.venue}`, image: e.heroImage });
      }
    }
    for (const ek of mockEkiri) {
      if (ek.name.toLowerCase().includes(q) || ek.location.toLowerCase().includes(q)) {
        results.push({ type: 'ekiri', id: ek.id, title: ek.name, subtitle: `${ek.location} · Rank #${ek.ranking}`, image: ek.logo });
      }
    }
    return results;
  }
}
