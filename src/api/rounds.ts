import { request } from './client';

interface Round {
  id: number;
  tournamentId: number;
  title: string;
  description: string;
  techRequirements: string;
  requirements: string;
  materials: string;
  roundOrder: number;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateRoundRequest {
  tournamentId: number;
  title: string;
  description: string;
  techRequirements?: string;
  requirements?: string;
  materials?: string;
  roundOrder?: number;
  startTime?: string;
  endTime?: string;
}

export async function getAllRounds(): Promise<Round[]> {
  return request<Round[]>('/api/rounds');
}

export async function getActiveRounds(): Promise<Round[]> {
  return request<Round[]>('/api/rounds/active');
}

export async function getRound(id: number): Promise<Round> {
  return request<Round>(`/api/rounds/${id}`);
}

export async function getRoundsByTournament(tournamentId: number): Promise<Round[]> {
  return request<Round[]>(`/api/rounds/tournament/${tournamentId}`);
}

export async function createRound(data: CreateRoundRequest): Promise<Round> {
  return request<Round>('/api/rounds', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateRound(id: number, data: CreateRoundRequest): Promise<Round> {
  return request<Round>(`/api/rounds/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function activateRound(id: number): Promise<void> {
  return request<void>(`/api/rounds/${id}/activate`, { method: 'PUT' });
}

export async function closeRound(id: number): Promise<void> {
  return request<void>(`/api/rounds/${id}/close`, { method: 'PUT' });
}

export async function markEvaluated(id: number): Promise<void> {
  return request<void>(`/api/rounds/${id}/evaluated`, { method: 'PUT' });
}
