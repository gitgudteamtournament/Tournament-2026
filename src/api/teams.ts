import { request } from './client';

export interface MemberInfo {
  name: string;
  email: string;
  city: string;
  school: string;
}

export interface CreateTeamRequest {
  tournamentId: number;
  name: string;
  organization?: string;
  contactTelegram?: string;
  contactDiscord?: string;
  members: MemberInfo[];
}

export async function createTeam(data: CreateTeamRequest): Promise<number> {
  return request<number>('/api/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
