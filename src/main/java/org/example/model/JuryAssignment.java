package org.example.model;

import java.time.LocalDateTime;

public class JuryAssignment {
    private Long id;
    private Long submissionId;
    private Long juryId;
    private LocalDateTime assignedAt;
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSubmissionId() { return submissionId; }
    public void setSubmissionId(Long submissionId) { this.submissionId = submissionId; }

    public Long getJuryId() { return juryId; }
    public void setJuryId(Long juryId) { this.juryId = juryId; }

    public LocalDateTime getAssignedAt() { return assignedAt; }
    public void setAssignedAt(LocalDateTime assignedAt) { this.assignedAt = assignedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
