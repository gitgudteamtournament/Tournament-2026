import { request } from './client';

export interface Announcement {
  id: number;
  title: string;
  content: string;
  createdBy: number;
  createdAt: string;
  pinned: boolean;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return request<Announcement[]>('/api/announcements');
}

export async function getAnnouncement(id: number): Promise<Announcement> {
  return request<Announcement>(`/api/announcements/${id}`);
}

export async function createAnnouncement(data: { title: string; content: string; createdBy: number; pinned?: boolean }): Promise<Announcement> {
  return request<Announcement>('/api/announcements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAnnouncement(id: number, data: { title: string; content: string; pinned?: boolean }): Promise<void> {
  return request<void>(`/api/announcements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAnnouncement(id: number): Promise<void> {
  return request<void>(`/api/announcements/${id}`, { method: 'DELETE' });
}
