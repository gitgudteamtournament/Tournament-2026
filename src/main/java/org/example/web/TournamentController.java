package org.example.web;

import org.example.dto.CreateTournamentRequest;
import org.example.model.Tournament;
import org.example.service.TournamentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
            @RequestBody CreateTournamentRequest request
    ) {
        try {
            service.createTournament(userId, request);
            return ResponseEntity.ok(Map.of("message", "Tournament created"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{tournamentId}/close-submission")
    public ResponseEntity<?> closeSubmission(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {
        service.closeSubmission(userId, tournamentId);
        return ResponseEntity.ok(Map.of("message", "Submission closed"));
    }

    @PutMapping("/{tournamentId}/start-evaluation")
    public ResponseEntity<?> startEvaluation(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {
        service.startEvaluation(userId, tournamentId);
        return ResponseEntity.ok(Map.of("message", "Evaluation started"));
    }

    @PutMapping("/{tournamentId}/finish")
    public ResponseEntity<?> finishTournament(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {
        service.finishTournament(userId, tournamentId);
        return ResponseEntity.ok(Map.of("message", "Tournament finished"));
    }

    @PutMapping("/{tournamentId}/start")
    public ResponseEntity<?> startTournament(
            @PathVariable Long tournamentId,
            @RequestParam Long userId
    ) {
        service.startTournament(userId, tournamentId);
        return ResponseEntity.ok(Map.of("message", "Tournament started"));
    }

    @GetMapping("/get-tournaments")
    public ResponseEntity<?> getTournaments(
            @RequestParam(required = false) String status
    ) {
        return ResponseEntity.ok(service.getTournaments(status));
    }

    @GetMapping("/{tournamentId}")
    public ResponseEntity<?> getById(@PathVariable Long tournamentId) {
        Tournament t = service.getById(tournamentId);
        if (t == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(t);
    }

    @GetMapping("/archive")
    public ResponseEntity<?> getArchive() {
        return ResponseEntity.ok(service.getTournaments("FINISHED"));
    }
}
