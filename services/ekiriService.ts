import { api } from './api';
import { Ekiri } from './types';
import { getEkiri as getLocalEkiri, ekiriList } from './data';

export const ekiriApi = {
  getAll: () =>
    api.get<Ekiri[]>('/ekiri'),

  getById: (id: string) =>
    api.get<Ekiri>(`/ekiri/${id}`),
};

export function getEkiriById(id: string): Ekiri | undefined {
  return getLocalEkiri(id);
}

export function getAllEkiri(): Ekiri[] {
  return ekiriList;
}
