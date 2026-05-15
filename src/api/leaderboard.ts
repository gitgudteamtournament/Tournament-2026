import { request } from './client';

export interface LeaderboardRow {
  teamId: number;
  teamName: string;
  backendAvg: number;
  databaseAvg: number;
  frontendAvg: number;
  functionalityAvg: number;
  usabilityAvg: number;
  completenessAvg: number;
  totalScore: number;
}

export async function getLeaderboard(tournamentId: number): Promise<LeaderboardRow[]> {
  return request<LeaderboardRow[]>(`/api/tournaments/${tournamentId}/leaderboard`);
}
