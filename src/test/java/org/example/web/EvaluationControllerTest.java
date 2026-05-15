package org.example.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.configs.SecurityConfig;
import org.example.dto.DistributeRequest;
import org.example.dto.EvaluationRequest;
import org.example.model.Evaluation;
import org.example.service.EvaluationService;
import org.example.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EvaluationController.class)
@Import(SecurityConfig.class)
@WithMockUser
class EvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EvaluationService evaluationService;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void distribute_returnsOk() throws Exception {
        DistributeRequest req = new DistributeRequest();
        req.setRoundId(1L);

        mockMvc.perform(post("/api/evaluations/distribute")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("Distribution completed"));

        verify(evaluationService).distribute(any());
    }

    @Test
    void distribute_returns400_whenError() throws Exception {
        doThrow(new RuntimeException("No jurors"))
                .when(evaluationService).distribute(any());

        mockMvc.perform(post("/api/evaluations/distribute")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new DistributeRequest())))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No jurors"));
    }

    @Test
    void save_returnsOk() throws Exception {
        EvaluationRequest req = new EvaluationRequest();
        req.setSubmissionId(1L);
        req.setJuryId(2L);
        req.setBackendQuality(80);
        req.setDatabaseScore(80);
        req.setFrontendQuality(80);
        req.setFunctionalityScore(80);
        req.setUsabilityScore(80);
        req.setMustHaveCompleteness(80);

        mockMvc.perform(post("/api/evaluations")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("Evaluation saved"));

        verify(evaluationService).saveEvaluation(any());
    }

    @Test
    void getBySubmission_returnsList() throws Exception {
        Evaluation e = new Evaluation();
        e.setSubmissionId(1L);
        e.setJuryId(2L);
        e.setBackendQuality(85);
        when(evaluationService.getEvaluationsBySubmission(1L)).thenReturn(List.of(e));

        mockMvc.perform(get("/api/evaluations/submission/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].submissionId").value(1))
                .andExpect(jsonPath("$[0].backendQuality").value(85));
    }

    @Test
    void getMy_returnsList() throws Exception {
        mockMvc.perform(get("/api/evaluations/my/5"))
                .andExpect(status().isOk());
        verify(evaluationService).getMyEvaluations(5L);
    }

    @Test
    void getMyAssignments_returnsList() throws Exception {
        when(evaluationService.getMyAssignedSubmissionIds(5L)).thenReturn(List.of(1L, 2L));

        mockMvc.perform(get("/api/evaluations/my-assignments/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value(1))
                .andExpect(jsonPath("$[1]").value(2));
    }

    @Test
    void getAverage_returnsMap() throws Exception {
        when(evaluationService.getAverageScoresByRound(1L)).thenReturn(Map.of(1L, 85.5));

        mockMvc.perform(get("/api/evaluations/average/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$['1']").value(85.5));
    }

    @Test
    void getOne_returnsEvaluation() throws Exception {
        Evaluation e = new Evaluation();
        e.setSubmissionId(1L);
        e.setJuryId(2L);
        when(evaluationService.getEvaluation(1L, 2L)).thenReturn(e);

        mockMvc.perform(get("/api/evaluations/submission/1/jury/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.submissionId").value(1))
                .andExpect(jsonPath("$.juryId").value(2));
    }

    @Test
    void getOne_returns404_whenNotFound() throws Exception {
        when(evaluationService.getEvaluation(1L, 2L)).thenReturn(null);
        mockMvc.perform(get("/api/evaluations/submission/1/jury/2"))
                .andExpect(status().isNotFound());
    }
}
