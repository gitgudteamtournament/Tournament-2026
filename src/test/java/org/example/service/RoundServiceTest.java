package org.example.service;

import org.example.dto.CreateRoundRequest;
import org.example.model.Round;
import org.example.repository.RoundRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoundServiceTest {

    @Mock
    private RoundRepository roundRepository;

    private RoundService roundService;

    @BeforeEach
    void setUp() {
        roundService = new RoundService(roundRepository);
    }

    @Test
    void createRound_savesWithDraftStatus() {
        CreateRoundRequest req = new CreateRoundRequest();
        req.setTournamentId(1L);
        req.setTitle("Test Round");
        req.setDescription("Description");
        req.setTechRequirements("Java, Spring");
        req.setRequirements("Must have: REST API");
        req.setMaterials("https://example.com");
        req.setRoundOrder(1);
        req.setStartTime(LocalDateTime.now());
        req.setEndTime(LocalDateTime.now().plusDays(7));

        roundService.createRound(req);

        verify(roundRepository).save(argThat(round ->
            "Test Round".equals(round.getTitle()) &&
            "DRAFT".equals(round.getStatus()) &&
            1L == round.getTournamentId() &&
            "Description".equals(round.getDescription()) &&
            "Java, Spring".equals(round.getTechRequirements()) &&
            "Must have: REST API".equals(round.getRequirements()) &&
            "https://example.com".equals(round.getMaterials()) &&
            1 == round.getRoundOrder()
        ));
    }

    @Test
    void getRound_returnsRound() {
        Round r = new Round();
        r.setId(1L);
        r.setTitle("Test");
        when(roundRepository.findById(1L)).thenReturn(r);

        Round result = roundService.getRound(1L);

        assertNotNull(result);
        assertEquals("Test", result.getTitle());
    }

    @Test
    void getRound_returnsNull_whenNotFound() {
        when(roundRepository.findById(99L)).thenReturn(null);
        assertNull(roundService.getRound(99L));
    }

    @Test
    void getActiveRounds_delegatesToRepository() {
        roundService.getActiveRounds();
        verify(roundRepository).findActive();
    }

    @Test
    void getAllRounds_delegatesToRepository() {
        roundService.getAllRounds();
        verify(roundRepository).findAll();
    }

    @Test
    void getRoundsByTournament_delegatesToRepository() {
        roundService.getRoundsByTournament(1L);
        verify(roundRepository).findByTournamentId(1L);
    }

    @Test
    void activate_updatesStatus() {
        when(roundRepository.findById(1L)).thenReturn(new Round());
        roundService.activate(1L);
        verify(roundRepository).updateStatus(1L, "ACTIVE");
    }

    @Test
    void activate_throws_whenNotFound() {
        when(roundRepository.findById(1L)).thenReturn(null);
        assertThrows(RuntimeException.class, () -> roundService.activate(1L));
    }

    @Test
    void closeSubmissions_updatesStatus() {
        when(roundRepository.findById(1L)).thenReturn(new Round());
        roundService.closeSubmissions(1L);
        verify(roundRepository).updateStatus(1L, "SUBMISSION_CLOSED");
    }

    @Test
    void markEvaluated_updatesStatus() {
        when(roundRepository.findById(1L)).thenReturn(new Round());
        roundService.markEvaluated(1L);
        verify(roundRepository).updateStatus(1L, "EVALUATED");
    }

    @Test
    void updateRound_updatesFields() {
        Round existing = new Round();
        existing.setId(1L);
        existing.setTitle("Old");
        when(roundRepository.findById(1L)).thenReturn(existing);

        CreateRoundRequest req = new CreateRoundRequest();
        req.setTitle("New Title");
        req.setDescription("New Desc");
        req.setTechRequirements("New Tech");
        req.setRequirements("New Req");
        req.setMaterials("New Mat");
        req.setRoundOrder(2);
        req.setStartTime(LocalDateTime.now());
        req.setEndTime(LocalDateTime.now().plusDays(1));

        roundService.updateRound(1L, req);

        verify(roundRepository).update(argThat(round ->
            "New Title".equals(round.getTitle()) &&
            "New Desc".equals(round.getDescription()) &&
            "New Tech".equals(round.getTechRequirements()) &&
            "New Req".equals(round.getRequirements()) &&
            "New Mat".equals(round.getMaterials()) &&
            2 == round.getRoundOrder()
        ));
    }

    @Test
    void updateRound_throws_whenNotFound() {
        when(roundRepository.findById(1L)).thenReturn(null);
        assertThrows(RuntimeException.class, () ->
            roundService.updateRound(1L, new CreateRoundRequest()));
    }
}
