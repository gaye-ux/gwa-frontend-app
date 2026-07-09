import { api } from './api';
import { GwaEvent } from './types';
import { getEvent as getLocalEvent, getUpcomingEvents, getLiveEvents, getFinishedEvents, eventsData } from './data';

export const eventApi = {
  getAll: (params?: { status?: string }) =>
    api.get<GwaEvent[]>(`/events${params?.status ? `?status=${params.status}` : ''}`),

  getById: (id: string) =>
    api.get<GwaEvent>(`/events/${id}`),

  getUpcoming: () =>
    api.get<GwaEvent[]>('/events?status=upcoming'),

  getLive: () =>
    api.get<GwaEvent[]>('/events?status=live'),
};

export function getEventById(id: string): GwaEvent | undefined {
  return getLocalEvent(id);
}

export function getAllEvents(): GwaEvent[] {
  return eventsData;
}
