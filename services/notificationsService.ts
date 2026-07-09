import { api } from './api';
import { AppNotification } from './types';
import { notificationsData } from './data';

export const notificationApi = {
  getAll: () =>
    api.get<AppNotification[]>('/notifications'),

  markRead: (id: string) =>
    api.patch<AppNotification>(`/notifications/${id}/read`, {}),

  markAllRead: () =>
    api.patch<AppNotification[]>('/notifications/read-all', {}),
};

export function getNotifications(): AppNotification[] {
  return notificationsData;
}

export function getUnreadCount(): number {
  return notificationsData.filter((n) => !n.read).length;
}
