package org.example.service;

import org.example.dto.DistributeRequest;
import org.example.dto.EvaluationRequest;
import org.example.model.Evaluation;
import org.example.model.Round;
import org.example.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final JuryAssignmentRepository juryAssignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final RoundRepository roundRepository;
    private final UserRepository userRepository;

    public EvaluationService(EvaluationRepository evaluationRepository,
                             JuryAssignmentRepository juryAssignmentRepository,
                             SubmissionRepository submissionRepository,
                             RoundRepository roundRepository,
                             UserRepository userRepository) {
        this.evaluationRepository = evaluationRepository;
        this.juryAssignmentRepository = juryAssignmentRepository;
        this.submissionRepository = submissionRepository;
        this.roundRepository = roundRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void distribute(DistributeRequest request) {
        Long roundId = request.getRoundId();
        int evalsPerSub = request.getEvaluationsPerSubmission();
        int maxPerJuror = request.getMaxSubmissionsPerJuror();

        Round round = roundRepository.findById(roundId);
        if (round == null) throw new RuntimeException("Round not found");
        if (!"SUBMISSION_CLOSED".equals(round.getStatus())) {
            throw new RuntimeException("Submissions must be closed before distribution");
        }

        juryAssignmentRepository.clearByRoundId(roundId);

        List<Long> submissionIds = submissionRepository.findByRoundId(roundId)
                .stream().map(s -> s.getId()).toList();
        List<Long> juryIds = userRepository.findAllByRole("JURY")
                .stream().map(u -> u.getId()).toList();

        if (submissionIds.isEmpty()) throw new RuntimeException("No submissions to distribute");
        if (juryIds.isEmpty()) throw new RuntimeException("No jurors available");

        Map<Long, Integer> juryLoad = new HashMap<>();
        for (Long jid : juryIds) juryLoad.put(jid, 0);

        Random rnd = new Random();
        for (Long sid : submissionIds) {
            List<Long> available = new ArrayList<>(juryIds);
            available.removeIf(jid -> juryLoad.get(jid) >= maxPerJuror);
            Collections.shuffle(available, rnd);

            int assigned = 0;
            for (Long jid : available) {
                if (assigned >= evalsPerSub) break;
                List<Long> already = juryAssignmentRepository.findJuryIdsBySubmissionId(sid);
                if (!already.contains(jid)) {
                    juryAssignmentRepository.assign(sid, jid);
                    juryLoad.put(jid, juryLoad.get(jid) + 1);
                    assigned++;
                }
            }
        }
    }

    public void saveEvaluation(EvaluationRequest request) {
        Evaluation e = new Evaluation();
        e.setSubmissionId(request.getSubmissionId());
        e.setJuryId(request.getJuryId());
        e.setBackendQuality(request.getBackendQuality());
        e.setDatabaseScore(request.getDatabaseScore());
        e.setFrontendQuality(request.getFrontendQuality());
        e.setFunctionalityScore(request.getFunctionalityScore());
        e.setUsabilityScore(request.getUsabilityScore());
        e.setMustHaveCompleteness(request.getMustHaveCompleteness());
        e.setComment(request.getComment());
        evaluationRepository.saveOrUpdate(e);
    }

    public Evaluation getEvaluation(Long submissionId, Long juryId) {
        return evaluationRepository.findBySubmissionAndJury(submissionId, juryId);
    }

    public List<Evaluation> getEvaluationsBySubmission(Long submissionId) {
        return evaluationRepository.findBySubmissionId(submissionId);
    }

    public List<Evaluation> getMyEvaluations(Long juryId) {
        return evaluationRepository.findByJuryId(juryId);
    }

    public List<Long> getMyAssignedSubmissionIds(Long juryId) {
        return juryAssignmentRepository.findSubmissionIdsByJuryId(juryId);
    }

    public Map<Long, Double> getAverageScoresByRound(Long roundId) {
        List<Evaluation> all = evaluationRepository.findByRoundId(roundId);
        Map<Long, List<Evaluation>> grouped = new HashMap<>();
        for (Evaluation e : all) {
            grouped.computeIfAbsent(e.getSubmissionId(), k -> new ArrayList<>()).add(e);
        }
        Map<Long, Double> result = new HashMap<>();
        for (Map.Entry<Long, List<Evaluation>> entry : grouped.entrySet()) {
            double avg = entry.getValue().stream()
                    .mapToDouble(Evaluation::getTotalScore)
                    .average().orElse(0);
            result.put(entry.getKey(), Math.round(avg * 100.0) / 100.0);
        }
        return result;
    }
}
