import { request } from './client';

export interface TournamentCard {
  id: number;
  title: string;
  description: string;
  status: string;
  format: string;
}

export interface Tournament extends TournamentCard {
  rules: string;
  startDate: string;
  registrationStart: string;
  registrationEnd: string;
  maxTeams: number;
  createdBy: number;
}

export interface CreateTournamentRequest {
  title: string;
  description?: string;
  rules?: string;
  startDate?: string;
  registrationStart?: string;
  registrationEnd?: string;
  maxTeams?: number;
  format?: string;
}

export async function createTournament(userId: number, data: CreateTournamentRequest): Promise<void> {
  return request<void>(`/api/tournaments/create?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTournaments(status?: string): Promise<TournamentCard[]> {
  const params = status ? `?status=${status}` : '';
  return request<TournamentCard[]>(`/api/tournaments/get-tournaments${params}`);
}

export async function getTournament(id: number): Promise<Tournament> {
  return request<Tournament>(`/api/tournaments/${id}`);
}

export async function getArchive(): Promise<TournamentCard[]> {
  return request<TournamentCard[]>('/api/tournaments/archive');
}

export async function startTournament(tournamentId: number, userId: number): Promise<void> {
  return request<void>(`/api/tournaments/${tournamentId}/start?userId=${userId}`, { method: 'PUT' });
}

export async function closeSubmission(tournamentId: number, userId: number): Promise<void> {
  return request<void>(`/api/tournaments/${tournamentId}/close-submission?userId=${userId}`, { method: 'PUT' });
}

export async function startEvaluation(tournamentId: number, userId: number): Promise<void> {
  return request<void>(`/api/tournaments/${tournamentId}/start-evaluation?userId=${userId}`, { method: 'PUT' });
}

export async function finishTournament(tournamentId: number, userId: number): Promise<void> {
  return request<void>(`/api/tournaments/${tournamentId}/finish?userId=${userId}`, { method: 'PUT' });
}
