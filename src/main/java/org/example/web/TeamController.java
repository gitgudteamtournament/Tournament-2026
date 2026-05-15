package org.example.web;

import org.example.dto.CreateTeamRequest;
import org.example.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    public ResponseEntity<Long> createTeam(@RequestBody CreateTeamRequest request,
                                            Principal principal) {
        Long teamId = teamService.createTeam(request, principal.getName());
        return ResponseEntity.ok(teamId);
    }
}
