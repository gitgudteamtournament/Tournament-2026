package org.example.dto;

public class TeamMemberDTO {

    private Long userId;
    private String name;
    private boolean captain;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isCaptain() { return captain; }
    public void setCaptain(boolean captain) { this.captain = captain; }
}