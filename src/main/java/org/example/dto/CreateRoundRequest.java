package org.example.dto;

import java.time.LocalDateTime;

public class CreateRoundRequest {
    private Long tournamentId;
    private String title;
    private String description;
    private String techRequirements;
    private String requirements;
    private String materials;
    private Integer roundOrder;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Long getTournamentId() { return tournamentId; }
    public void setTournamentId(Long tournamentId) { this.tournamentId = tournamentId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTechRequirements() { return techRequirements; }
    public void setTechRequirements(String techRequirements) { this.techRequirements = techRequirements; }

    public String getRequirements() { return requirements; }
    public void setRequirements(String requirements) { this.requirements = requirements; }

    public String getMaterials() { return materials; }
    public void setMaterials(String materials) { this.materials = materials; }

    public Integer getRoundOrder() { return roundOrder; }
    public void setRoundOrder(Integer roundOrder) { this.roundOrder = roundOrder; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
}
