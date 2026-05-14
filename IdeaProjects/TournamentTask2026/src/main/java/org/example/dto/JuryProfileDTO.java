package org.example.dto;

import java.util.List;

public class JuryProfileDTO extends UserProfileDTO {

    private List<EvaluatedSubmissionDTO> evaluatedSubmissions;

    public List<EvaluatedSubmissionDTO> getEvaluatedSubmissions() {
        return evaluatedSubmissions;
    }

    public void setEvaluatedSubmissions(List<EvaluatedSubmissionDTO> evaluatedSubmissions) {
        this.evaluatedSubmissions = evaluatedSubmissions;
    }
}