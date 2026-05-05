package org.example.dto;

public class CreateTeamRequest {

    private Long tournamentId;
    private Long captainId;
    private String organization;
    private String contactTelegram;
    private String contactDiscord;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(Long tournamentId) {
        this.tournamentId = tournamentId;
    }

    public Long getCaptainId() {
        return captainId;
    }

    public void setCaptainId(Long captainId) {
        this.captainId = captainId;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getContactTelegram() {
        return contactTelegram;
    }

    public void setContactTelegram(String contactTelegram) {
        this.contactTelegram = contactTelegram;
    }

    public String getContactDiscord() {
        return contactDiscord;
    }

    public void setContactDiscord(String contactDiscord) {
        this.contactDiscord = contactDiscord;
    }
}