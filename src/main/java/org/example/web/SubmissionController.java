package org.example.web;

import org.example.dto.SubmissionRequest;
import org.example.model.Submission;
import org.example.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SubmissionRequest request) {
        try {
            Long id = submissionService.createSubmission(request);
            return ResponseEntity.ok(id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SubmissionRequest request) {
        try {
            submissionService.updateSubmission(id, request);
            return ResponseEntity.ok("Submission updated");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> get(@PathVariable Long id) {
        Submission s = submissionService.getSubmission(id);
        if (s == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(s);
    }

    @GetMapping("/round/{roundId}")
    public ResponseEntity<List<Submission>> getByRound(@PathVariable Long roundId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByRound(roundId));
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Submission>> getByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByTeam(teamId));
    }
}
