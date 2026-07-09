export type MatchResult = 'W' | 'L' | 'D';
export type CombatStatus = 'upcoming' | 'live' | 'finished';
export type EventStatus = 'upcoming' | 'live' | 'finished';

export interface Wrestler {
  id: string;
  name: string;
  nickname: string;
  age: number;
  height: string;
  weight: string;
  dateOfBirth: string;
  placeOfBirth: string;
  biography: string;
  image: any;
  gallery: any[];

  ekiriId: string;
  ekiriName: string;
  careerDebut: string;
  totalFights: number;
  wins: number;
  losses: number;
  draws: number;
  knockouts: number;
  winningPercentage: number;
  currentRanking: number;
  titles: string[];
  achievements: string[];
  fightingStyle: string;

  last5Results: MatchResult[];
  winStreak: number;
  points: number;
}

export interface Ekiri {
  id: string;
  name: string;
  logo: any;
  bannerColor: string;
  description: string;
  history: string;
  founded: string;
  location: string;
  totalFights: number;
  totalVictories: number;
  totalTitles: number;
  ranking: number;
  wrestlerIds: string[];
  coach: string;
}

export interface Combat {
  id: string;
  eventId: string;
  fighter1Id: string;
  fighter2Id: string;
  isMainCombat: boolean;
  title?: string;
  championship?: string;
  odds1?: string;
  odds2?: string;
  status: CombatStatus;
  winnerId?: string;
  result?: string;
  duration?: string;
  round?: string;
  referee?: string;
  order: number;
}

export interface HeadToHead {
  fighter1Id: string;
  fighter2Id: string;
  fighter1Wins: number;
  fighter2Wins: number;
  draws: number;
  meetings: string[];
}

export interface GwaEvent {
  id: string;
  badge: string;
  seriesName: string;
  title: string;
  fighter1Id: string;
  fighter2Id: string;
  fighter1Name: string;
  fighter2Name: string;
  date: string;
  time: string;
  venue: string;
  countdownTarget: string;
  heroImage: any;
  status: EventStatus;
  description: string;
  sponsors: string[];
  combatIds: string[];
  tickets: TicketTier[];
  startingPrice: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  perks: string;
  available: number;
  total: number;
  highlighted?: boolean;
}

export interface TicketPurchase {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketTierId: string;
  ticketName: string;
  quantity: number;
  totalPrice: number;
  currency: string;
  status: string;
  qrCode: string;
  purchasedAt: string;
  venue: string;
  image: any;
}

export interface AppNotification {
  id: string;
  type: 'event' | 'ticket' | 'ranking' | 'news' | 'combat';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface NewsArticle {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  timestamp: string;
  author: string;
  content?: string;
  image?: any;
}

export interface SeasonEvent {
  id: string;
  thumbnail: any;
  date: string;
  title: string;
  location: string;
  type: string;
}

export interface ArenaMatch {
  id: string;
  thumbnail: any;
  championship: string;
  fighter1: string;
  fighter2: string;
  round: string;
  duration: string;
  status: 'live' | 'upcoming' | 'finished';
}

export interface SearchResult {
  type: 'wrestler' | 'event' | 'ekiri' | 'news';
  id: string;
  title: string;
  subtitle: string;
  image?: any;
}

export interface RankingCategory {
  id: string;
  name: string;
  type: 'national' | 'weightClass' | 'wins' | 'knockouts' | 'rising' | 'fanFavorite';
}
