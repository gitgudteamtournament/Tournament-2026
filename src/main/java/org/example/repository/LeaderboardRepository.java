package org.example.repository;

import org.example.dto.LeaderboardRowDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LeaderboardRepository {

    private final JdbcTemplate jdbcTemplate;

    public LeaderboardRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<LeaderboardRowDTO> getLeaderboard(Long tournamentId) {

        String sql = """
            SELECT
                t.id AS team_id,
                t.name AS team_name,

                AVG(e.backend_quality) AS backend_avg,
                AVG(e.database_score) AS database_avg,
                AVG(e.frontend_quality) AS frontend_avg,
                AVG(e.functionality_score) AS functionality_avg,
                AVG(e.usability_score) AS usability_avg,
                AVG(e.must_have_completeness) AS completeness_avg,

                AVG(
                    (
                        e.backend_quality +
                        e.database_score +
                        e.frontend_quality +
                        e.functionality_score +
                        e.usability_score +
                        e.must_have_completeness
                    ) / 6.0
                ) AS total_score

            FROM submission s
            JOIN evaluation e ON e.submission_id = s.id
            JOIN teams t ON t.id = s.team_id

            WHERE s.tournament_id = ?

            GROUP BY t.id, t.name
            ORDER BY total_score DESC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            LeaderboardRowDTO dto = new LeaderboardRowDTO();

            dto.setTeamId(rs.getLong("team_id"));
            dto.setTeamName(rs.getString("team_name"));

            dto.setBackendAvg(rs.getDouble("backend_avg"));
            dto.setDatabaseAvg(rs.getDouble("database_avg"));
            dto.setFrontendAvg(rs.getDouble("frontend_avg"));
            dto.setFunctionalityAvg(rs.getDouble("functionality_avg"));
            dto.setUsabilityAvg(rs.getDouble("usability_avg"));
            dto.setCompletenessAvg(rs.getDouble("completeness_avg"));

            dto.setTotalScore(rs.getDouble("total_score"));

            return dto;
        }, tournamentId);
    }
}