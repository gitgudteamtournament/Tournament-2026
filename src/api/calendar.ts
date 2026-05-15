import { request } from './client';

export interface CalendarEvent {
  id: number;
  tournamentId: number;
  title: string;
  description: string;
  eventTime: string;
  type: string;
  createdAt: string;
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return request<CalendarEvent[]>('/api/calendar');
}

export async function getTournamentEvents(tournamentId: number): Promise<CalendarEvent[]> {
  return request<CalendarEvent[]>(`/api/calendar/tournament/${tournamentId}`);
}

export async function createEvent(data: { tournamentId: number; title: string; description?: string; eventTime: string; type?: string }): Promise<{ id: number }> {
  return request<{ id: number }>('/api/calendar', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: number): Promise<void> {
  return request<void>(`/api/calendar/${id}`, { method: 'DELETE' });
}
