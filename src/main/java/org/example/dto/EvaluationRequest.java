package org.example.dto;

public class EvaluationRequest {
    private Long submissionId;
    private Long juryId;
    private int backendQuality;
    private int databaseScore;
    private int frontendQuality;
    private int functionalityScore;
    private int usabilityScore;
    private int mustHaveCompleteness;
    private String comment;

    public Long getSubmissionId() { return submissionId; }
    public void setSubmissionId(Long submissionId) { this.submissionId = submissionId; }

    public Long getJuryId() { return juryId; }
    public void setJuryId(Long juryId) { this.juryId = juryId; }

    public int getBackendQuality() { return backendQuality; }
    public void setBackendQuality(int backendQuality) { this.backendQuality = backendQuality; }

    public int getDatabaseScore() { return databaseScore; }
    public void setDatabaseScore(int databaseScore) { this.databaseScore = databaseScore; }

    public int getFrontendQuality() { return frontendQuality; }
    public void setFrontendQuality(int frontendQuality) { this.frontendQuality = frontendQuality; }

    public int getFunctionalityScore() { return functionalityScore; }
    public void setFunctionalityScore(int functionalityScore) { this.functionalityScore = functionalityScore; }

    public int getUsabilityScore() { return usabilityScore; }
    public void setUsabilityScore(int usabilityScore) { this.usabilityScore = usabilityScore; }

    public int getMustHaveCompleteness() { return mustHaveCompleteness; }
    public void setMustHaveCompleteness(int mustHaveCompleteness) { this.mustHaveCompleteness = mustHaveCompleteness; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
