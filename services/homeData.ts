// Backward-compatible re-exports
export * from './types';
export {
  wrestlers as fighterRankings,
  ekiriList as clanRankings,
  newsArticles as arenaPulseArticles,
  arenaLive as arenaLiveMatch,
  seasonCalendar as seasonCalendarEvents,
  eventsData as upcomingEvents,
} from './data';

import { NewsArticle, SeasonEvent } from './types';
import { eventsData } from './data';
export const currentEvent = eventsData[0];

export type { NewsArticle as ArenaPulseArticle, SeasonEvent as SeasonCalendarEvent };
