package org.example.service;

import org.example.dto.DistributeRequest;
import org.example.dto.EvaluationRequest;
import org.example.model.Evaluation;
import org.example.model.Round;
import org.example.model.Submission;
import org.example.model.User;
import org.example.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EvaluationServiceTest {

    @Mock
    private EvaluationRepository evaluationRepository;
    @Mock
    private JuryAssignmentRepository juryAssignmentRepository;
    @Mock
    private SubmissionRepository submissionRepository;
    @Mock
    private RoundRepository roundRepository;
    @Mock
    private UserRepository userRepository;

    private EvaluationService evaluationService;

    @BeforeEach
    void setUp() {
        evaluationService = new EvaluationService(
            evaluationRepository, juryAssignmentRepository,
            submissionRepository, roundRepository, userRepository
        );
    }

    @Test
    void distribute_assignsSubmissionsToJurors() {
        Round closed = new Round();
        closed.setStatus("SUBMISSION_CLOSED");
        when(roundRepository.findById(1L)).thenReturn(closed);

        Submission s1 = new Submission(); s1.setId(10L);
        Submission s2 = new Submission(); s2.setId(20L);
        when(submissionRepository.findByRoundId(1L)).thenReturn(List.of(s1, s2));

        User juror = new User();
        juror.setId(5L);
        when(userRepository.findAllByRole("JURY")).thenReturn(List.of(juror));

        DistributeRequest req = new DistributeRequest();
        req.setRoundId(1L);
        req.setEvaluationsPerSubmission(2);
        req.setMaxSubmissionsPerJuror(5);

        evaluationService.distribute(req);

        verify(juryAssignmentRepository, atLeastOnce()).assign(anyLong(), eq(5L));
        verify(juryAssignmentRepository).clearByRoundId(1L);
    }

    @Test
    void distribute_throws_whenRoundNotClosed() {
        Round active = new Round();
        active.setStatus("ACTIVE");
        when(roundRepository.findById(1L)).thenReturn(active);
        DistributeRequest req = new DistributeRequest();
        req.setRoundId(1L);
        assertThrows(RuntimeException.class, () -> evaluationService.distribute(req));
    }

    @Test
    void distribute_throws_whenNoSubmissions() {
        Round closed = new Round();
        closed.setStatus("SUBMISSION_CLOSED");
        when(roundRepository.findById(1L)).thenReturn(closed);
        when(submissionRepository.findByRoundId(1L)).thenReturn(List.of());
        DistributeRequest req = new DistributeRequest();
        req.setRoundId(1L);
        assertThrows(RuntimeException.class, () -> evaluationService.distribute(req));
    }

    @Test
    void distribute_throws_whenNoJurors() {
        Round closed = new Round();
        closed.setStatus("SUBMISSION_CLOSED");
        when(roundRepository.findById(1L)).thenReturn(closed);
        Submission s = new Submission(); s.setId(1L);
        when(submissionRepository.findByRoundId(1L)).thenReturn(List.of(s));
        when(userRepository.findAllByRole("JURY")).thenReturn(List.of());
        DistributeRequest req = new DistributeRequest();
        req.setRoundId(1L);
        assertThrows(RuntimeException.class, () -> evaluationService.distribute(req));
    }

    @Test
    void saveEvaluation_persistsAllFields() {
        EvaluationRequest req = new EvaluationRequest();
        req.setSubmissionId(1L);
        req.setJuryId(2L);
        req.setBackendQuality(85);
        req.setDatabaseScore(90);
        req.setFrontendQuality(75);
        req.setFunctionalityScore(80);
        req.setUsabilityScore(70);
        req.setMustHaveCompleteness(95);
        req.setComment("Good work");

        evaluationService.saveEvaluation(req);

        verify(evaluationRepository).saveOrUpdate(argThat(e ->
            e.getSubmissionId() == 1L &&
            e.getJuryId() == 2L &&
            e.getBackendQuality() == 85 &&
            e.getDatabaseScore() == 90 &&
            e.getFrontendQuality() == 75 &&
            e.getFunctionalityScore() == 80 &&
            e.getUsabilityScore() == 70 &&
            e.getMustHaveCompleteness() == 95 &&
            "Good work".equals(e.getComment())
        ));
    }

    @Test
    void getEvaluation_delegates() {
        evaluationService.getEvaluation(1L, 2L);
        verify(evaluationRepository).findBySubmissionAndJury(1L, 2L);
    }

    @Test
    void getEvaluationsBySubmission_delegates() {
        evaluationService.getEvaluationsBySubmission(1L);
        verify(evaluationRepository).findBySubmissionId(1L);
    }

    @Test
    void getMyEvaluations_delegates() {
        evaluationService.getMyEvaluations(5L);
        verify(evaluationRepository).findByJuryId(5L);
    }

    @Test
    void getMyAssignedSubmissionIds_delegates() {
        evaluationService.getMyAssignedSubmissionIds(5L);
        verify(juryAssignmentRepository).findSubmissionIdsByJuryId(5L);
    }

    @Test
    void getAverageScoresByRound_computesCorrectly() {
        Evaluation e1 = new Evaluation();
        e1.setSubmissionId(1L);
        e1.setBackendQuality(80);
        e1.setDatabaseScore(80);
        e1.setFrontendQuality(80);
        e1.setFunctionalityScore(80);
        e1.setUsabilityScore(80);
        e1.setMustHaveCompleteness(80);
        // total = 80.0

        Evaluation e2 = new Evaluation();
        e2.setSubmissionId(1L);
        e2.setBackendQuality(100);
        e2.setDatabaseScore(100);
        e2.setFrontendQuality(100);
        e2.setFunctionalityScore(100);
        e2.setUsabilityScore(100);
        e2.setMustHaveCompleteness(100);
        // total = 100.0

        when(evaluationRepository.findByRoundId(1L)).thenReturn(List.of(e1, e2));

        Map<Long, Double> result = evaluationService.getAverageScoresByRound(1L);

        assertTrue(result.containsKey(1L));
        assertEquals(90.0, result.get(1L), 0.01);
    }

    @Test
    void getAverageScoresByRound_returnsEmpty_whenNoEvaluations() {
        when(evaluationRepository.findByRoundId(1L)).thenReturn(List.of());
        Map<Long, Double> result = evaluationService.getAverageScoresByRound(1L);
        assertTrue(result.isEmpty());
    }
}
