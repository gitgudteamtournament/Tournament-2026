package org.example.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.configs.SecurityConfig;
import org.example.dto.CreateRoundRequest;
import org.example.model.Round;
import org.example.service.RoundService;
import org.example.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RoundController.class)
@Import(SecurityConfig.class)
@WithMockUser
class RoundControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RoundService roundService;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void createRound_returnsOk() throws Exception {
        CreateRoundRequest req = new CreateRoundRequest();
        req.setTitle("Test");
        req.setTournamentId(1L);

        mockMvc.perform(post("/api/rounds")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("Round created"));

        verify(roundService).createRound(any());
    }

    @Test
    void getAll_returnsList() throws Exception {
        Round r = new Round();
        r.setId(1L);
        r.setTitle("Test");
        when(roundService.getAllRounds()).thenReturn(List.of(r));

        mockMvc.perform(get("/api/rounds"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Test"));
    }

    @Test
    void getActive_returnsList() throws Exception {
        when(roundService.getActiveRounds()).thenReturn(List.of());
        mockMvc.perform(get("/api/rounds/active"))
                .andExpect(status().isOk());
    }

    @Test
    void getRound_returnsRound() throws Exception {
        Round r = new Round();
        r.setId(1L);
        r.setTitle("Test");
        when(roundService.getRound(1L)).thenReturn(r);

        mockMvc.perform(get("/api/rounds/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void getRound_returns404_whenNotFound() throws Exception {
        when(roundService.getRound(99L)).thenReturn(null);
        mockMvc.perform(get("/api/rounds/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getByTournament_returnsList() throws Exception {
        mockMvc.perform(get("/api/rounds/tournament/1"))
                .andExpect(status().isOk());
        verify(roundService).getRoundsByTournament(1L);
    }

    @Test
    void activate_returnsOk() throws Exception {
        mockMvc.perform(put("/api/rounds/1/activate")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Round activated"));
        verify(roundService).activate(1L);
    }

    @Test
    void close_returnsOk() throws Exception {
        mockMvc.perform(put("/api/rounds/1/close")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Submissions closed"));
        verify(roundService).closeSubmissions(1L);
    }

    @Test
    void evaluated_returnsOk() throws Exception {
        mockMvc.perform(put("/api/rounds/1/evaluated")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Round marked as evaluated"));
        verify(roundService).markEvaluated(1L);
    }

    @Test
    void update_returnsOk() throws Exception {
        CreateRoundRequest req = new CreateRoundRequest();
        req.setTitle("Updated");

        mockMvc.perform(put("/api/rounds/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("Round updated"));

        verify(roundService).updateRound(eq(1L), any());
    }
}
