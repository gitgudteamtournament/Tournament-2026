package org.example.dto;

public class LeaderboardRowDTO {

    private Long teamId;
    private String teamName;

    private Double backendAvg;
    private Double databaseAvg;
    private Double frontendAvg;
    private Double functionalityAvg;
    private Double usabilityAvg;
    private Double completenessAvg;

    private Double totalScore;

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Double getBackendAvg() {
        return backendAvg;
    }

    public void setBackendAvg(Double backendAvg) {
        this.backendAvg = backendAvg;
    }

    public Double getDatabaseAvg() {
        return databaseAvg;
    }

    public void setDatabaseAvg(Double databaseAvg) {
        this.databaseAvg = databaseAvg;
    }

    public Double getFrontendAvg() {
        return frontendAvg;
    }

    public void setFrontendAvg(Double frontendAvg) {
        this.frontendAvg = frontendAvg;
    }

    public Double getFunctionalityAvg() {
        return functionalityAvg;
    }

    public void setFunctionalityAvg(Double functionalityAvg) {
        this.functionalityAvg = functionalityAvg;
    }

    public Double getUsabilityAvg() {
        return usabilityAvg;
    }

    public void setUsabilityAvg(Double usabilityAvg) {
        this.usabilityAvg = usabilityAvg;
    }

    public Double getCompletenessAvg() {
        return completenessAvg;
    }

    public void setCompletenessAvg(Double completenessAvg) {
        this.completenessAvg = completenessAvg;
    }

    public Double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Double totalScore) {
        this.totalScore = totalScore;
    }
}