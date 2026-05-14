package org.example.service;

import org.example.dto.TournamentCardDTO;
import org.example.model.Tournament;
import org.example.model.TournamentStatus;
import org.example.repository.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void closeSubmission(Long userId,
                                Long tournamentId) {

        validateOrganizer(userId);

        repository.updateTournamentStatus(
                tournamentId,
                TournamentStatus.SUBMISSION_CLOSED.name()
        );
    }

    public void startEvaluation(Long userId,
                                Long tournamentId) {

        validateOrganizer(userId);

        repository.updateTournamentStatus(
                tournamentId,
                TournamentStatus.EVALUATION.name()
        );
    }

    public void finishTournament(Long userId,
                                 Long tournamentId) {

        validateOrganizer(userId);

        repository.updateTournamentStatus(
                tournamentId,
                TournamentStatus.FINISHED.name()
        );
    }

    private void validateOrganizer(Long userId) {

        if (!repository.isOrganizer(userId)) {
            throw new RuntimeException("User is not an organizer");
        }
    }

    public List<TournamentCardDTO> getTournaments(String status) {

        return repository.getTournaments(status);
    }
}