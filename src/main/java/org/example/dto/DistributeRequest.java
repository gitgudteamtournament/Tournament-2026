package org.example.dto;

public class DistributeRequest {
    private Long roundId;
    private int evaluationsPerSubmission = 2;
    private int maxSubmissionsPerJuror = 5;

    public Long getRoundId() { return roundId; }
    public void setRoundId(Long roundId) { this.roundId = roundId; }

    public int getEvaluationsPerSubmission() { return evaluationsPerSubmission; }
    public void setEvaluationsPerSubmission(int evaluationsPerSubmission) { this.evaluationsPerSubmission = evaluationsPerSubmission; }

    public int getMaxSubmissionsPerJuror() { return maxSubmissionsPerJuror; }
    public void setMaxSubmissionsPerJuror(int maxSubmissionsPerJuror) { this.maxSubmissionsPerJuror = maxSubmissionsPerJuror; }
}
