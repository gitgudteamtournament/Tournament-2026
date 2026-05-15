package org.example.repository;

import org.example.dto.*;
import org.example.model.UserRole;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserProfileRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserProfileRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public UserProfileDTO getUserBase(Long userId) {

        String sql = """
            SELECT name, email, role
            FROM users
            WHERE id = ?
        """;

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {

            UserProfileDTO dto = new UserProfileDTO();
            dto.setName(rs.getString("name"));
            dto.setEmail(rs.getString("email"));
            dto.setRole(rs.getString("role"));

            return dto;

        }, userId);
    }

    public TeamProfileDTO getTeamProfile(Long userId) {

        String sql = """
            SELECT t.id AS team_id, t.name AS team_name
            FROM team_members tm
            JOIN teams t ON t.id = tm.team_id
            WHERE tm.user_id = ?
            LIMIT 1
        """;

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {

            TeamProfileDTO dto = new TeamProfileDTO();

            dto.setTeamId(rs.getLong("team_id"));
            dto.setTeamName(rs.getString("team_name"));

            return dto;

        }, userId);
    }

    public List<TeamMemberDTO> getTeamMembers(Long teamId) {

        String sql = """
            SELECT u.id, u.name, tm.is_captain
            FROM team_members tm
            JOIN users u ON u.id = tm.user_id
            WHERE tm.team_id = ?
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            TeamMemberDTO dto = new TeamMemberDTO();

            dto.setUserId(rs.getLong("id"));
            dto.setName(rs.getString("name"));
            dto.setCaptain(rs.getBoolean("is_captain"));

            return dto;

        }, teamId);
    }

    public List<SubmissionHistoryDTO> getTeamSubmissions(Long teamId) {

        String sql = """
            SELECT s.id, s.round_id, t.title, s.status, s.submitted_at
            FROM submission s
            JOIN tournaments t ON t.id = s.tournament_id
            WHERE s.team_id = ?
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            SubmissionHistoryDTO dto = new SubmissionHistoryDTO();

            dto.setSubmissionId(rs.getLong("id"));
            dto.setTournamentId(rs.getLong("round_id"));
            dto.setTournamentTitle(rs.getString("title"));
            dto.setStatus(rs.getString("status"));
            dto.setSubmittedAt(rs.getTimestamp("submitted_at").toLocalDateTime());

            return dto;

        }, teamId);
    }

    public List<EvaluatedSubmissionDTO> getJuryEvaluations(Long juryId) {

        String sql = """
            SELECT
                e.submission_id,
                s.team_id,
                t.name AS team_name,
                tr.title AS tournament_title,
                s.status,

                (
                    (e.backend_quality +
                     e.database_score +
                     e.frontend_quality +
                     e.functionality_score +
                     e.usability_score +
                     e.must_have_completeness) / 6.0
                ) AS score

            FROM evaluation e
            JOIN submission s ON s.id = e.submission_id
            JOIN teams t ON t.id = s.team_id
            JOIN tournaments tr ON tr.id = s.tournament_id

            WHERE e.jury_id = ?
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            EvaluatedSubmissionDTO dto = new EvaluatedSubmissionDTO();

            dto.setSubmissionId(rs.getLong("submission_id"));
            dto.setTeamId(rs.getLong("team_id"));
            dto.setTeamName(rs.getString("team_name"));
            dto.setTournamentTitle(rs.getString("tournament_title"));
            dto.setStatus(rs.getString("status"));
            dto.setScore(rs.getDouble("score"));

            return dto;

        }, juryId);
    }

    public List<TournamentCardDTO> getCreatedTournaments(Long adminId) {

        String sql = """
            SELECT id, title, description, status, format
            FROM tournaments
            WHERE created_by = ?
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            TournamentCardDTO dto = new TournamentCardDTO();

            dto.setId(rs.getLong("id"));
            dto.setTitle(rs.getString("title"));
            dto.setDescription(rs.getString("description"));
            dto.setStatus(rs.getString("status"));
            dto.setFormat(rs.getString("format"));

            return dto;

        }, adminId);
    }
}