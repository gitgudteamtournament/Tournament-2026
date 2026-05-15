package org.example.service;

import org.example.dto.CreateTournamentRequest;
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

    public void createTournament(Long userId, CreateTournamentRequest request) {
        if (!repository.isOrganizer(userId)) {
            throw new RuntimeException("User is not an organizer");
        }
        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        Tournament t = new Tournament();
        t.setTitle(request.getTitle());
        t.setDescription(request.getDescription());
        t.setRules(request.getRules());
        t.setStartDate(request.getStartDate());
        t.setRegistrationStart(request.getRegistrationStart());
        t.setRegistrationEnd(request.getRegistrationEnd());
        t.setMaxTeams(request.getMaxTeams());
        t.setFormat(request.getFormat());
        t.setStatus(TournamentStatus.DRAFT.name());
        t.setCreatedBy(userId);
        repository.createTournament(t);
    }

    public void startTournament(Long userId, Long tournamentId) {
        validateOrganizer(userId);
        repository.updateTournamentStatus(tournamentId, TournamentStatus.REGISTRATION.name());
    }

    public void closeSubmission(Long userId, Long tournamentId) {
        validateOrganizer(userId);
        repository.updateTournamentStatus(tournamentId, TournamentStatus.SUBMISSION_CLOSED.name());
    }

    public void startEvaluation(Long userId, Long tournamentId) {
        validateOrganizer(userId);
        repository.updateTournamentStatus(tournamentId, TournamentStatus.EVALUATION.name());
    }

    public void finishTournament(Long userId, Long tournamentId) {
        validateOrganizer(userId);
        repository.updateTournamentStatus(tournamentId, TournamentStatus.FINISHED.name());
    }

    private void validateOrganizer(Long userId) {
        if (!repository.isOrganizer(userId)) {
            throw new RuntimeException("User is not an organizer");
        }
    }

    public List<TournamentCardDTO> getTournaments(String status) {
        return repository.getTournaments(status);
    }

    public Tournament getById(Long id) {
        return repository.findById(id);
    }
}
