import { api } from './api';
import { Wrestler } from './types';
import { getWrestler as getLocalWrestler, wrestlers as localWrestlers } from './data';

export const wrestlerApi = {
  getAll: (params?: { ekiriId?: string; search?: string }) =>
    api.get<Wrestler[]>(`/wrestlers?${new URLSearchParams(params as any).toString()}`),

  getById: (id: string) =>
    api.get<Wrestler>(`/wrestlers/${id}`),

  getByEkiri: (ekiriId: string) =>
    api.get<Wrestler[]>(`/wrestlers?ekiriId=${ekiriId}`),

  search: (query: string) =>
    api.get<Wrestler[]>(`/wrestlers/search?q=${encodeURIComponent(query)}`),

  getRankings: () =>
    api.get<Wrestler[]>('/wrestlers/rankings'),
};

export function getWrestlerById(id: string): Wrestler | undefined {
  return getLocalWrestler(id);
}

export function getAllWrestlers(): Wrestler[] {
  return localWrestlers;
}
