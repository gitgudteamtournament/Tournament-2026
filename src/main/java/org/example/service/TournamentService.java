package org.example.service;

import org.example.model.Tournament;
import org.example.repository.TournamentRepository;
import org.springframework.stereotype.Service;

@Service
public class TournamentService {

    private final TournamentRepository repository;

    public TournamentService(TournamentRepository repository) {
        this.repository = repository;
    }

    public void createTournament(Long userId, Tournament tournament) {

        if (!repository.isOrganizer(userId)) {
            throw new RuntimeException("User is not an organizer");
        }

        tournament.setCreatedBy(userId);

        repository.createTournament(tournament);
    }
}
