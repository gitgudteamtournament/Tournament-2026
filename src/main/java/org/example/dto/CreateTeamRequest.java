package org.example.dto;

import java.util.List;

public class CreateTeamRequest {

    private Long tournamentId;
    private String organization;
    private String contactTelegram;
    private String contactDiscord;
    private String name;
    private List<MemberInfo> members;

    public Long getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(Long tournamentId) {
        this.tournamentId = tournamentId;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MemberInfo> getMembers() {
        return members;
    }

    public void setMembers(List<MemberInfo> members) {
        this.members = members;
    }

    public static class MemberInfo {
        private String name;
        private String email;
        private String city;
        private String school;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getSchool() {
            return school;
        }

        public void setSchool(String school) {
            this.school = school;
        }
    }

}