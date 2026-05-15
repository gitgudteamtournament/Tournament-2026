package org.example.repository;

import org.example.dto.UserDashboardDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DashboardRepository {

    private final JdbcTemplate jdbcTemplate;

    public DashboardRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public UserDashboardDTO getUserDashboard(Long userId) {

        String sql = """
            SELECT
                tm.team_id,
                t.name AS team_name,

                tr.id AS tournament_id,
                tr.title AS tournament_title,
                tr.status AS tournament_status,

                s.id AS submission_id,
                s.status AS submission_status

            FROM team_members tm

            JOIN teams t
                ON t.id = tm.team_id

            JOIN tournaments tr
                ON tr.id = tm.tournament_id

            LEFT JOIN submission s
                ON s.team_id = tm.team_id

            WHERE tm.user_id = ?

            LIMIT 1
        """;

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {

            UserDashboardDTO dto = new UserDashboardDTO();

            dto.setTeamId(rs.getLong("team_id"));
            dto.setTeamName(rs.getString("team_name"));

            dto.setTournamentId(rs.getLong("tournament_id"));
            dto.setTournamentTitle(rs.getString("tournament_title"));
            dto.setTournamentStatus(rs.getString("tournament_status"));

            dto.setSubmissionId(rs.getLong("submission_id"));
            dto.setSubmissionStatus(rs.getString("submission_status"));

            return dto;

        }, userId);
    }
}