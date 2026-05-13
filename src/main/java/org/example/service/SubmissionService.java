package org.example.service;

import org.example.dto.SubmissionRequest;
import org.example.model.Round;
import org.example.model.Submission;
import org.example.repository.RoundRepository;
import org.example.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final RoundRepository roundRepository;

    public SubmissionService(SubmissionRepository submissionRepository, RoundRepository roundRepository) {
        this.submissionRepository = submissionRepository;
        this.roundRepository = roundRepository;
    }

    public Long createSubmission(SubmissionRequest request) {
        Round round = roundRepository.findById(request.getRoundId());
        if (round == null) throw new RuntimeException("Round not found");
        if (!"ACTIVE".equals(round.getStatus())) {
            throw new RuntimeException("Submissions are not open for this round");
        }
        if (submissionRepository.existsByRoundAndTeam(request.getRoundId(), request.getTeamId())) {
            throw new RuntimeException("Your team already submitted for this round");
        }
        Submission submission = new Submission();
        submission.setRoundId(request.getRoundId());
        submission.setTeamId(request.getTeamId());
        submission.setGithubLink(request.getGithubLink());
        submission.setVideoLink(request.getVideoLink());
        submission.setLiveDemoLink(request.getLiveDemoLink());
        submission.setDescription(request.getDescription());
        return submissionRepository.save(submission);
    }

    public void updateSubmission(Long id, SubmissionRequest request) {
        Submission existing = submissionRepository.findById(id);
        if (existing == null) throw new RuntimeException("Submission not found");
        Round round = roundRepository.findById(existing.getRoundId());
        if (round == null || !"ACTIVE".equals(round.getStatus())) {
            throw new RuntimeException("Cannot edit submission after deadline");
        }
        existing.setGithubLink(request.getGithubLink());
        existing.setVideoLink(request.getVideoLink());
        existing.setLiveDemoLink(request.getLiveDemoLink());
        existing.setDescription(request.getDescription());
        submissionRepository.update(existing);
    }

    public Submission getSubmission(Long id) {
        return submissionRepository.findById(id);
    }

    public List<Submission> getSubmissionsByRound(Long roundId) {
        return submissionRepository.findByRoundId(roundId);
    }

    public List<Submission> getSubmissionsByTeam(Long teamId) {
        return submissionRepository.findByTeamId(teamId);
    }
}
