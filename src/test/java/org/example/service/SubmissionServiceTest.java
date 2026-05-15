package org.example.service;

import org.example.dto.SubmissionRequest;
import org.example.model.Round;
import org.example.model.Submission;
import org.example.repository.RoundRepository;
import org.example.repository.SubmissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SubmissionServiceTest {

    @Mock
    private SubmissionRepository submissionRepository;
    @Mock
    private RoundRepository roundRepository;

    private SubmissionService submissionService;

    @BeforeEach
    void setUp() {
        submissionService = new SubmissionService(submissionRepository, roundRepository);
    }

    @Test
    void createSubmission_saves_whenRoundActive() {
        Round active = new Round();
        active.setId(1L);
        active.setStatus("ACTIVE");
        when(roundRepository.findById(1L)).thenReturn(active);
        when(submissionRepository.existsByRoundAndTeam(1L, 1L)).thenReturn(false);
        when(submissionRepository.save(any())).thenReturn(42L);

        SubmissionRequest req = new SubmissionRequest();
        req.setRoundId(1L);
        req.setTeamId(1L);
        req.setGithubLink("https://github.com/test");
        req.setVideoLink("https://youtube.com/test");
        req.setLiveDemoLink("https://demo.com");
        req.setDescription("Test submission");

        Long id = submissionService.createSubmission(req);

        assertEquals(42L, id);
        verify(submissionRepository).save(argThat(s ->
            s.getRoundId() == 1L &&
            s.getTeamId() == 1L &&
            "https://github.com/test".equals(s.getGithubLink()) &&
            "https://youtube.com/test".equals(s.getVideoLink())
        ));
    }

    @Test
    void createSubmission_throws_whenRoundNotFound() {
        when(roundRepository.findById(1L)).thenReturn(null);
        SubmissionRequest req = new SubmissionRequest();
        req.setRoundId(1L);
        assertThrows(RuntimeException.class, () -> submissionService.createSubmission(req));
    }

    @Test
    void createSubmission_throws_whenRoundNotActive() {
        Round draft = new Round();
        draft.setStatus("DRAFT");
        when(roundRepository.findById(1L)).thenReturn(draft);
        SubmissionRequest req = new SubmissionRequest();
        req.setRoundId(1L);
        assertThrows(RuntimeException.class, () -> submissionService.createSubmission(req));
    }

    @Test
    void createSubmission_throws_whenDuplicate() {
        Round active = new Round();
        active.setStatus("ACTIVE");
        when(roundRepository.findById(1L)).thenReturn(active);
        when(submissionRepository.existsByRoundAndTeam(1L, 1L)).thenReturn(true);
        SubmissionRequest req = new SubmissionRequest();
        req.setRoundId(1L);
        req.setTeamId(1L);
        assertThrows(RuntimeException.class, () -> submissionService.createSubmission(req));
    }

    @Test
    void updateSubmission_updates_whenRoundActive() {
        Submission existing = new Submission();
        existing.setId(1L);
        existing.setRoundId(1L);
        when(submissionRepository.findById(1L)).thenReturn(existing);
        Round active = new Round();
        active.setStatus("ACTIVE");
        when(roundRepository.findById(1L)).thenReturn(active);

        SubmissionRequest req = new SubmissionRequest();
        req.setGithubLink("https://github.com/new");
        req.setVideoLink("https://youtube.com/new");
        req.setDescription("Updated");

        submissionService.updateSubmission(1L, req);

        verify(submissionRepository).update(argThat(s ->
            "https://github.com/new".equals(s.getGithubLink()) &&
            "https://youtube.com/new".equals(s.getVideoLink()) &&
            "Updated".equals(s.getDescription())
        ));
    }

    @Test
    void updateSubmission_throws_whenNotFound() {
        when(submissionRepository.findById(1L)).thenReturn(null);
        assertThrows(RuntimeException.class, () ->
            submissionService.updateSubmission(1L, new SubmissionRequest()));
    }

    @Test
    void updateSubmission_throws_whenRoundNotActive() {
        Submission existing = new Submission();
        existing.setRoundId(1L);
        when(submissionRepository.findById(1L)).thenReturn(existing);
        Round draft = new Round();
        draft.setStatus("DRAFT");
        when(roundRepository.findById(1L)).thenReturn(draft);
        assertThrows(RuntimeException.class, () ->
            submissionService.updateSubmission(1L, new SubmissionRequest()));
    }

    @Test
    void getSubmission_delegates() {
        submissionService.getSubmission(1L);
        verify(submissionRepository).findById(1L);
    }

    @Test
    void getSubmissionsByRound_delegates() {
        submissionService.getSubmissionsByRound(1L);
        verify(submissionRepository).findByRoundId(1L);
    }

    @Test
    void getSubmissionsByTeam_delegates() {
        submissionService.getSubmissionsByTeam(1L);
        verify(submissionRepository).findByTeamId(1L);
    }
}
