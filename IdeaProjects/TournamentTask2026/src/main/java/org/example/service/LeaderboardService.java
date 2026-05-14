package org.example.service;

import org.example.dto.LeaderboardRowDTO;
import org.example.model.TournamentStatus;
import org.example.repository.LeaderboardRepository;
import org.example.repository.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;
    private final TournamentRepository tournamentRepository;

    public LeaderboardService(LeaderboardRepository leaderboardRepository,
                              TournamentRepository tournamentRepository) {

        this.leaderboardRepository = leaderboardRepository;
        this.tournamentRepository = tournamentRepository;
    }

    public List<LeaderboardRowDTO> getLeaderboard(Long tournamentId) {

        String status = tournamentRepository.getTournamentStatus(tournamentId);

        if (!TournamentStatus.FINISHED.name().equals(status)) {
            throw new RuntimeException("Leaderboard is not available yet");
        }

        return leaderboardRepository.getLeaderboard(tournamentId);
    }
}