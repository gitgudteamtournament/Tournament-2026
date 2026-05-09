package org.example.web;

import org.example.model.Tournament;
import org.example.service.TournamentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentService service;

    public TournamentController(TournamentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> createTournament(
            @RequestParam Long userId,
            @RequestBody Tournament tournament
    ) {
        service.createTournament(userId, tournament);
        return ResponseEntity.ok("Tournament created");
    }
}