package org.example.service;

import org.example.dto.CreateRoundRequest;
import org.example.model.Round;
import org.example.repository.RoundRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoundService {

    private final RoundRepository roundRepository;

    public RoundService(RoundRepository roundRepository) {
        this.roundRepository = roundRepository;
    }

    public void createRound(CreateRoundRequest request) {
        Round round = new Round();
        round.setTournamentId(request.getTournamentId());
        round.setTitle(request.getTitle());
        round.setDescription(request.getDescription());
        round.setTechRequirements(request.getTechRequirements());
        round.setRequirements(request.getRequirements());
        round.setMaterials(request.getMaterials());
        round.setRoundOrder(request.getRoundOrder());
        round.setStartTime(request.getStartTime());
        round.setEndTime(request.getEndTime());
        round.setStatus("DRAFT");
        roundRepository.save(round);
    }

    public Round getRound(Long id) {
        return roundRepository.findById(id);
    }

    public List<Round> getRoundsByTournament(Long tournamentId) {
        return roundRepository.findByTournamentId(tournamentId);
    }

    public List<Round> getAllRounds() {
        return roundRepository.findAll();
    }

    public List<Round> getActiveRounds() {
        return roundRepository.findActive();
    }

    public void activate(Long id) {
        Round r = roundRepository.findById(id);
        if (r == null) throw new RuntimeException("Round not found");
        roundRepository.updateStatus(id, "ACTIVE");
    }

    public void closeSubmissions(Long id) {
        Round r = roundRepository.findById(id);
        if (r == null) throw new RuntimeException("Round not found");
        roundRepository.updateStatus(id, "SUBMISSION_CLOSED");
    }

    public void markEvaluated(Long id) {
        Round r = roundRepository.findById(id);
        if (r == null) throw new RuntimeException("Round not found");
        roundRepository.updateStatus(id, "EVALUATED");
    }

    public void updateRound(Long id, CreateRoundRequest request) {
        Round round = roundRepository.findById(id);
        if (round == null) throw new RuntimeException("Round not found");
        round.setTitle(request.getTitle());
        round.setDescription(request.getDescription());
        round.setTechRequirements(request.getTechRequirements());
        round.setRequirements(request.getRequirements());
        round.setMaterials(request.getMaterials());
        round.setRoundOrder(request.getRoundOrder());
        round.setStartTime(request.getStartTime());
        round.setEndTime(request.getEndTime());
        roundRepository.update(round);
    }
}
