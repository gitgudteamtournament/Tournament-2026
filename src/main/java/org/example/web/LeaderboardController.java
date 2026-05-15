package org.example.web;

import org.example.dto.LeaderboardRowDTO;
import org.example.service.LeaderboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping("/{tournamentId}/leaderboard")
    public List<LeaderboardRowDTO> getLeaderboard(
            @PathVariable Long tournamentId
    ) {
        return leaderboardService.getLeaderboard(tournamentId);
    }
}