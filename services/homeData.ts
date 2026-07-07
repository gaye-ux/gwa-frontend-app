// =============================================================================
// GWA Arena — Data Models & Dummy Data
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Fighter {
  name: string;
  nickname: string;
  clan?: string;
  record: string;
  weight: string;
  height: string;
  age: number;
  image: any;
}

export interface Combat {
  id: string;
  fighter1: Fighter;
  fighter2: Fighter;
  isMainCombat: boolean;
  title?: string;
  championship?: string;
  odds1?: string;
  odds2?: string;
}

export interface TicketTier {
  name: string;
  price: string;
  perks: string;
  highlighted?: boolean;
}

export interface GwaEvent {
  id: string;
  badge: string;
  seriesName: string;
  title: string;
  fighter1Name: string;
  fighter2Name: string;
  date: string;
  time: string;
  venue: string;
  countdownTarget: string;
  heroImage: any;
  combats: Combat[];
  tickets: TicketTier[];
  startingPrice: string;
}

export interface ArenaLiveMatch {
  id: string;
  thumbnail: any;
  championship: string;
  fighter1: string;
  fighter2: string;
  round: string;
  duration: string;
}

export interface SeasonCalendarEvent {
  id: string;
  thumbnail: any;
  date: string;
  title: string;
  location: string;
  type: string;
}

export interface ArenaPulseArticle {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  timestamp: string;
  author: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getMainCombat(event: GwaEvent): Combat | undefined {
  return event.combats.find((c) => c.isMainCombat);
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const currentEvent: GwaEvent = {
  id: 'event-1',
  badge: 'MAIN EVENT',
  seriesName: 'KING OF THE ARENA SERIES',
  title: "THE TITAN'S CLASH",
  fighter1Name: 'MODOU LO',
  fighter2Name: 'BALLA GAYE',
  date: 'OCT 24',
  time: '18:00 GMT',
  venue: 'INDEPENDENCE STADIUM',
  countdownTarget: '2026-08-24T18:00:00Z',
  heroImage: require('@/assets/images/hero_fighters.png'),
  startingPrice: 'D500',
  tickets: [
    {
      name: 'STANDARD',
      price: 'D500',
      perks: 'General Perimeter',
    },
    {
      name: 'PREMIUM',
      price: 'D1,500',
      perks: 'Premium Access',
      highlighted: true,
    },
    {
      name: 'VIP ELITE',
      price: 'D5,000',
      perks: 'Exclusive\nMeet & Greet',
    },
  ],
  combats: [
    {
      id: 'combat-main',
      isMainCombat: true,
      title: 'HEAVYWEIGHT TITLE',
      championship: 'HEAVYWEIGHT CHAMPIONSHIP',
      odds1: '-140',
      odds2: '+115',
      fighter1: {
        name: 'MODOU LO',
        nickname: 'The King of Thiaroye',
        clan: 'CLAN ROCK ENERGY',
        record: '22-3-0',
        weight: '115 KG',
        height: '1.85 M',
        age: 35,
        image: require('@/assets/images/fighter_1.png'),
      },
      fighter2: {
        name: 'BALLA GAYE 2',
        nickname: 'Lion of Guédiawaye',
        clan: 'ECOLE BALLA GAYE',
        record: '21-5-1',
        weight: '120 KG',
        height: '1.90 M',
        age: 37,
        image: require('@/assets/images/fighter_2.png'),
      },
    },
    {
      id: 'combat-2',
      isMainCombat: false,
      championship: 'HEAVYWEIGHT BOUT',
      fighter1: {
        name: 'EUMEU SENE',
        nickname: '',
        clan: 'CLAN TAY SHINGER',
        record: '18-4-0',
        weight: '108 KG',
        height: '1.82 M',
        age: 33,
        image: require('@/assets/images/fighter_1.png'),
      },
      fighter2: {
        name: 'TAPHA TINE',
        nickname: '',
        clan: 'BAOL MBOLLO',
        record: '15-3-1',
        weight: '112 KG',
        height: '1.88 M',
        age: 29,
        image: require('@/assets/images/fighter_2.png'),
      },
    },

  ],
};

export const arenaLiveMatch: ArenaLiveMatch = {
  id: 'live-match-1',
  thumbnail: require('@/assets/images/arena_live_thumb.png'),
  championship: 'Heavyweight Championship Qualifying',
  fighter1: 'EUMEU SENE',
  fighter2: 'TAPHA TIME',
  round: 'Round 2',
  duration: '45:26',
};

export const seasonCalendarEvents: SeasonCalendarEvent[] = [
  {
    id: 'cal-1',
    thumbnail: require('@/assets/images/calendar_event_1.png'),
    date: 'July 28, 2026',
    title: 'LAC DE GUIERS 2 vs SITEU',
    location: 'Demba Diop',
    type: 'Semifinals Event',
  },
  {
    id: 'cal-2',
    thumbnail: require('@/assets/images/calendar_event_2.png'),
    date: 'August 09, 2026',
    title: 'REUG REUG vs AMA BALDE',
    location: 'Independence Stadium',
    type: 'Championship',
  },
  {
    id: 'cal-3',
    thumbnail: require('@/assets/images/calendar_event_1.png'),
    date: 'August 22, 2026',
    title: 'GRIS BORDEAUX vs MOUSSA NDOYE',
    location: 'Stade Leopold Senghor',
    type: 'Quarterfinals',
  },
];

export const arenaPulseArticles: ArenaPulseArticle[] = [
  {
    id: 'article-1',
    category: 'TECHNICAL ANALYSIS',
    categoryColor: '#3B82F6',
    title: "The Secret Behind Modou Lo's Gripping Technique",
    timestamp: '2 hours ago',
    author: 'Lamin Jarju',
  },
  {
    id: 'article-2',
    category: 'RISING STARS',
    categoryColor: '#10B981',
    title: 'Top 5 Under-21 Wrestlers to Watch this Season',
    timestamp: '5 hours ago',
    author: 'GWA Editorial',
  },
  {
    id: 'article-3',
    category: 'GOVERNANCE',
    categoryColor: '#F59E0B',
    title: 'New GWA Regulations: What Fans Need to Know',
    timestamp: 'Yesterday',
    author: 'Arena Report',
  },
];

export const upcomingEvents: GwaEvent[] = [
  currentEvent, // Modou Lo vs Balla Gaye
  {
    id: 'event-2',
    badge: 'UNDERCARD SHOWCASE',
    seriesName: 'Regional Featherweight Finals',
    title: 'YOUNG LIONS DUEL',
    fighter1Name: 'Gris Bordeaux',
    fighter2Name: 'Lac de Guiers 2',
    date: 'NOV 05',
    time: '18:30 GMT',
    venue: 'Serrekunda East Arena',
    countdownTarget: '2026-11-05T18:30:00Z',
    heroImage: require('@/assets/images/arena_live_thumb.png'), // Using existing image for variety
    startingPrice: 'D250',
    tickets: currentEvent.tickets, // Reusing mock tickets
    combats: [] // Empty for now, or could fill with mock combats
  },
  {
    id: 'event-3',
    badge: 'LEGENDS INVITATIONAL',
    seriesName: 'Heavyweight Icons Match',
    title: 'LEGACY BOWL',
    fighter1Name: 'Eumeu Sene',
    fighter2Name: 'Tapha Tine',
    date: 'DEC 12',
    time: '21:00 GMT',
    venue: 'The Grand Arena, Banjul',
    countdownTarget: '2026-12-12T21:00:00Z',
    heroImage: require('@/assets/images/calendar_event_2.png'), // Using existing image
    startingPrice: 'D1000',
    tickets: currentEvent.tickets,
    combats: []
  }
];

