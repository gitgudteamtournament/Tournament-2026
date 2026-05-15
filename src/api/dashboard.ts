import { request } from './client';

export interface UserDashboard {
  teamId: number;
  teamName: string;
  tournamentId: number;
  tournamentTitle: string;
  tournamentStatus: string;
  submissionId: number;
  submissionStatus: string;
}

export async function getDashboard(userId: number): Promise<UserDashboard> {
  return request<UserDashboard>(`/api/dashboard/${userId}`);
}
