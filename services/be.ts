import { storage, StorageKeys } from './storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.gwa.gm/v1';

export interface BEResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function fmtHeight(cm?: number | null): string {
  if (!cm) return '—';
  return `${(cm / 100).toFixed(2)} M`;
}

function fmtWeight(kg?: number | null): string {
  if (!kg) return '—';
  return `${Math.round(kg)} KG`;
}

function makeAuthHeader(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = await storage.get(StorageKeys.AUTH_TOKEN);
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...makeAuthHeader(token),
      ...((options?.headers as Record<string, string>) || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error?.message || `Request failed (${res.status})`);
  // BE wraps all successful responses in { success: true, data: ... }
  return (json.data || json) as T;
}

export const BE = {
  get<T>(endpoint: string) { return request<T>(endpoint); },
  post<T>(endpoint: string, body?: unknown) { return request<T>(endpoint, { method: 'POST', body: body ? JSON.stringify(body) : undefined }); },
  patch<T>(endpoint: string, body?: unknown) { return request<T>(endpoint, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }); },
  delete(endpoint: string) { return request<{ message: string }>(endpoint, { method: 'DELETE' }); },

  fmtHeight,
  fmtWeight,
};
