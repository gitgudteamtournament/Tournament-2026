import { request } from './client';

interface Submission {
  id: number;
  roundId: number;
  teamId: number;
  githubLink: string;
  videoLink: string;
  liveDemoLink?: string;
  description?: string;
  status: string;
  teamName?: string;
  submittedAt: string;
  updatedAt: string;
}

interface SubmissionRequest {
  roundId: number;
  teamId: number;
  githubLink: string;
  videoLink: string;
  liveDemoLink?: string;
  description?: string;
}

export async function createSubmission(data: SubmissionRequest): Promise<Submission> {
  return request<Submission>('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSubmission(id: number, data: SubmissionRequest): Promise<Submission> {
  return request<Submission>(`/api/submissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getSubmission(id: number): Promise<Submission> {
  return request<Submission>(`/api/submissions/${id}`);
}

export async function getSubmissionsByRound(roundId: number): Promise<Submission[]> {
  return request<Submission[]>(`/api/submissions/round/${roundId}`);
}

export async function getSubmissionsByTeam(teamId: number): Promise<Submission[]> {
  return request<Submission[]>(`/api/submissions/team/${teamId}`);
}
