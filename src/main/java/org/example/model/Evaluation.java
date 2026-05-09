package org.example.model;

import java.time.LocalDateTime;

public class Evaluation {
    private Long id;
    private Long submissionId;
    private Long juryId;
    private Integer backendQuality;
    private Integer databaseScore;
    private Integer frontendQuality;
    private Integer functionalityScore;
    private Integer usabilityScore;
    private Integer mustHaveCompleteness;
    private String comment;
    private LocalDateTime evaluatedAt;

    private String juryName;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSubmissionId() { return submissionId; }
    public void setSubmissionId(Long submissionId) { this.submissionId = submissionId; }

    public Long getJuryId() { return juryId; }
    public void setJuryId(Long juryId) { this.juryId = juryId; }

    public Integer getBackendQuality() { return backendQuality; }
    public void setBackendQuality(Integer backendQuality) { this.backendQuality = backendQuality; }

    public Integer getDatabaseScore() { return databaseScore; }
    public void setDatabaseScore(Integer databaseScore) { this.databaseScore = databaseScore; }

    public Integer getFrontendQuality() { return frontendQuality; }
    public void setFrontendQuality(Integer frontendQuality) { this.frontendQuality = frontendQuality; }

    public Integer getFunctionalityScore() { return functionalityScore; }
    public void setFunctionalityScore(Integer functionalityScore) { this.functionalityScore = functionalityScore; }

    public Integer getUsabilityScore() { return usabilityScore; }
    public void setUsabilityScore(Integer usabilityScore) { this.usabilityScore = usabilityScore; }

    public Integer getMustHaveCompleteness() { return mustHaveCompleteness; }
    public void setMustHaveCompleteness(Integer mustHaveCompleteness) { this.mustHaveCompleteness = mustHaveCompleteness; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getEvaluatedAt() { return evaluatedAt; }
    public void setEvaluatedAt(LocalDateTime evaluatedAt) { this.evaluatedAt = evaluatedAt; }

    public String getJuryName() { return juryName; }
    public void setJuryName(String juryName) { this.juryName = juryName; }

    public double getTotalScore() {
        int count = 0;
        int sum = 0;
        if (backendQuality != null) { sum += backendQuality; count++; }
        if (databaseScore != null) { sum += databaseScore; count++; }
        if (frontendQuality != null) { sum += frontendQuality; count++; }
        if (functionalityScore != null) { sum += functionalityScore; count++; }
        if (usabilityScore != null) { sum += usabilityScore; count++; }
        if (mustHaveCompleteness != null) { sum += mustHaveCompleteness; count++; }
        return count > 0 ? (double) sum / count : 0;
    }
}
