package org.example.dto;

import java.util.List;

public class TeamProfileDTO extends UserProfileDTO {

    private Long teamId;
    private String teamName;

    private List<TeamMemberDTO> members;
    private List<SubmissionHistoryDTO> submissions;

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

    public List<TeamMemberDTO> getMembers() {
        return members;
    }

    public void setMembers(List<TeamMemberDTO> members) {
        this.members = members;
    }

    public List<SubmissionHistoryDTO> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(List<SubmissionHistoryDTO> submissions) {
        this.submissions = submissions;
    }
}