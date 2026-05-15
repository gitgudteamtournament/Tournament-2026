import { request } from './client';

interface Evaluation {
  id: number;
  submissionId: number;
  juryId: number;
  backendQuality: number;
  databaseScore: number;
  frontendQuality: number;
  functionalityScore: number;
  usabilityScore: number;
  mustHaveCompleteness: number;
  comment?: string;
  evaluatedAt: string;
  juryName?: string;
}

interface EvaluationRequest {
  submissionId: number;
  juryId: number;
  backendQuality: number;
  databaseScore: number;
  frontendQuality: number;
  functionalityScore: number;
  usabilityScore: number;
  mustHaveCompleteness: number;
  comment?: string;
}

interface DistributeRequest {
  roundId: number;
  evaluationsPerSubmission?: number;
  maxSubmissionsPerJuror?: number;
}

export async function distribute(data: DistributeRequest): Promise<void> {
  return request<void>('/api/evaluations/distribute', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function saveEvaluation(data: EvaluationRequest): Promise<Evaluation> {
  return request<Evaluation>('/api/evaluations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getEvaluationsBySubmission(submissionId: number): Promise<Evaluation[]> {
  return request<Evaluation[]>(`/api/evaluations/submission/${submissionId}`);
}

export async function getMyEvaluations(juryId: number): Promise<Evaluation[]> {
  return request<Evaluation[]>(`/api/evaluations/my/${juryId}`);
}

export async function getMyAssignments(juryId: number): Promise<number[]> {
  return request<number[]>(`/api/evaluations/my-assignments/${juryId}`);
}

export async function getAverageScores(roundId: number): Promise<Record<number, number>> {
  return request<Record<number, number>>(`/api/evaluations/average/${roundId}`);
}

export async function getEvaluationBySubmissionAndJury(submissionId: number, juryId: number): Promise<Evaluation> {
  return request<Evaluation>(`/api/evaluations/submission/${submissionId}/jury/${juryId}`);
}
