package org.example.web;

import org.example.dto.CreateRoundRequest;
import org.example.model.Round;
import org.example.service.RoundService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rounds")
public class RoundController {

    private final RoundService roundService;

    public RoundController(RoundService roundService) {
        this.roundService = roundService;
    }

    @PostMapping
    public ResponseEntity<String> createRound(@RequestBody CreateRoundRequest request) {
        roundService.createRound(request);
        return ResponseEntity.ok("Round created");
    }

    @GetMapping
    public ResponseEntity<List<Round>> getAll() {
        return ResponseEntity.ok(roundService.getAllRounds());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Round>> getActive() {
        return ResponseEntity.ok(roundService.getActiveRounds());
    }

    @GetMapping("/tournament/{tournamentId}")
    public ResponseEntity<List<Round>> getByTournament(@PathVariable Long tournamentId) {
        return ResponseEntity.ok(roundService.getRoundsByTournament(tournamentId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Round> getRound(@PathVariable Long id) {
        Round r = roundService.getRound(id);
        if (r == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(r);
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<String> activate(@PathVariable Long id) {
        roundService.activate(id);
        return ResponseEntity.ok("Round activated");
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<String> close(@PathVariable Long id) {
        roundService.closeSubmissions(id);
        return ResponseEntity.ok("Submissions closed");
    }

    @PutMapping("/{id}/evaluated")
    public ResponseEntity<String> evaluated(@PathVariable Long id) {
        roundService.markEvaluated(id);
        return ResponseEntity.ok("Round marked as evaluated");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody CreateRoundRequest request) {
        roundService.updateRound(id, request);
        return ResponseEntity.ok("Round updated");
    }
}
