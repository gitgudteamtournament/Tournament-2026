package org.example.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.configs.SecurityConfig;
import org.example.dto.SubmissionRequest;
import org.example.model.Submission;
import org.example.service.SubmissionService;
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
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SubmissionController.class)
@Import(SecurityConfig.class)
class SubmissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SubmissionService submissionService;

    @Test
    void create_returnsId() throws Exception {
        SubmissionRequest req = new SubmissionRequest();
        req.setRoundId(1L);
        req.setTeamId(1L);
        req.setGithubLink("https://github.com/test");
        req.setVideoLink("https://youtube.com/test");

        when(submissionService.createSubmission(any())).thenReturn(42L);

        mockMvc.perform(post("/api/submissions")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("42"));
    }

    @Test
    void create_returns400_whenError() throws Exception {
        when(submissionService.createSubmission(any()))
                .thenThrow(new RuntimeException("Round not found"));

        SubmissionRequest req = new SubmissionRequest();
        req.setRoundId(99L);

        mockMvc.perform(post("/api/submissions")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Round not found"));
    }

    @Test
    void update_returnsOk() throws Exception {
        SubmissionRequest req = new SubmissionRequest();
        req.setGithubLink("https://github.com/new");

        mockMvc.perform(put("/api/submissions/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("Submission updated"));

        verify(submissionService).updateSubmission(eq(1L), any());
    }

    @Test
    void update_returns400_whenError() throws Exception {
        doThrow(new RuntimeException("Not found"))
                .when(submissionService).updateSubmission(eq(1L), any());

        mockMvc.perform(put("/api/submissions/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new SubmissionRequest())))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Not found"));
    }

    @Test
    void get_returnsSubmission() throws Exception {
        Submission s = new Submission();
        s.setId(1L);
        s.setGithubLink("https://github.com/test");
        when(submissionService.getSubmission(1L)).thenReturn(s);

        mockMvc.perform(get("/api/submissions/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.githubLink").value("https://github.com/test"));
    }

    @Test
    void get_returns404_whenNotFound() throws Exception {
        when(submissionService.getSubmission(99L)).thenReturn(null);
        mockMvc.perform(get("/api/submissions/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getByRound_returnsList() throws Exception {
        mockMvc.perform(get("/api/submissions/round/1"))
                .andExpect(status().isOk());
        verify(submissionService).getSubmissionsByRound(1L);
    }

    @Test
    void getByTeam_returnsList() throws Exception {
        mockMvc.perform(get("/api/submissions/team/1"))
                .andExpect(status().isOk());
        verify(submissionService).getSubmissionsByTeam(1L);
    }
}
