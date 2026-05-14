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

    @PostMapping("/create")
    public ResponseEntity<?> createTournament(
            @RequestParam Long userId,
            @RequestBody Tournament tournament //TODO:Change to DTO
    ) {

        service.createTournament(userId, tournament);

        return ResponseEntity.ok("Tournament created");
    }

    @PutMapping("/{tournamentId}/close-submission")
    public ResponseEntity<?> closeSubmission(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {

        service.closeSubmission(userId, tournamentId);

        return ResponseEntity.ok("Submission closed");
    }

    @PutMapping("/{tournamentId}/start-evaluation")
    public ResponseEntity<?> startEvaluation(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {

        service.startEvaluation(userId, tournamentId);

        return ResponseEntity.ok("Evaluation started");
    }

    @PutMapping("/{tournamentId}/finish")
    public ResponseEntity<?> finishTournament(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {

        service.finishTournament(userId, tournamentId);

        return ResponseEntity.ok("Tournament finished");
    }

    @GetMapping("/get-tournaments")
    public ResponseEntity<?> getTournaments(
            @RequestParam(required = false) String status
    ) {

        return ResponseEntity.ok(
                service.getTournaments(status)
        );
    }
}