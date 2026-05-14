package org.example.dto;

import java.util.List;

public class AdminProfileDTO extends UserProfileDTO {

    private List<TournamentCardDTO> createdTournaments;

    public List<TournamentCardDTO> getCreatedTournaments() {
        return createdTournaments;
    }

    public void setCreatedTournaments(List<TournamentCardDTO> createdTournaments) {
        this.createdTournaments = createdTournaments;
    }
}