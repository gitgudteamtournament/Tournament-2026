package org.example.web;

import org.example.dto.DistributeRequest;
import org.example.dto.EvaluationRequest;
import org.example.model.Evaluation;
import org.example.service.EvaluationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    private final EvaluationService evaluationService;

    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @PostMapping("/distribute")
    public ResponseEntity<String> distribute(@RequestBody DistributeRequest request) {
        try {
            evaluationService.distribute(request);
            return ResponseEntity.ok("Distribution completed");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody EvaluationRequest request) {
        evaluationService.saveEvaluation(request);
        return ResponseEntity.ok("Evaluation saved");
    }

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<List<Evaluation>> getBySubmission(@PathVariable Long submissionId) {
        return ResponseEntity.ok(evaluationService.getEvaluationsBySubmission(submissionId));
    }

    @GetMapping("/my/{juryId}")
    public ResponseEntity<List<Evaluation>> getMy(@PathVariable Long juryId) {
        return ResponseEntity.ok(evaluationService.getMyEvaluations(juryId));
    }

    @GetMapping("/my-assignments/{juryId}")
    public ResponseEntity<List<Long>> getMyAssignments(@PathVariable Long juryId) {
        return ResponseEntity.ok(evaluationService.getMyAssignedSubmissionIds(juryId));
    }

    @GetMapping("/average/{roundId}")
    public ResponseEntity<Map<Long, Double>> getAverage(@PathVariable Long roundId) {
        return ResponseEntity.ok(evaluationService.getAverageScoresByRound(roundId));
    }

    @GetMapping("/submission/{submissionId}/jury/{juryId}")
    public ResponseEntity<Evaluation> getOne(@PathVariable Long submissionId, @PathVariable Long juryId) {
        Evaluation e = evaluationService.getEvaluation(submissionId, juryId);
        if (e == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(e);
    }
}
