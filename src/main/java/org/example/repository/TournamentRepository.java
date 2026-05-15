package org.example.repository;

import org.example.dto.TournamentCardDTO;
import org.example.model.Tournament;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TournamentRepository {

    private final JdbcTemplate jdbcTemplate;

    public TournamentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean isOrganizer(Long userId) {
        String sql = """
            SELECT COUNT(*) 
            FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = ? AND r.name = 'ORGANIZER'
        """;

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null && count > 0;
    }

    public void createTournament(Tournament tournament) {
        String sql = """
            INSERT INTO tournaments 
            (title, description, rules, start_date, registration_start, registration_end,
             max_teams, format, status, created_by, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        """;

        jdbcTemplate.update(sql,
                tournament.getTitle(),
                tournament.getDescription(),
                tournament.getRules(),
                tournament.getStartDate(),
                tournament.getRegistrationStart(),
                tournament.getRegistrationEnd(),
                tournament.getMaxTeams(),
                tournament.getFormat(),
                tournament.getStatus(),
                tournament.getCreatedBy()
        );
    }

    public Tournament findById(Long id) {

        String sql = """
        SELECT *
        FROM tournaments
        WHERE id = ?
    """;

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {

            Tournament tournament = new Tournament();

            tournament.setId(rs.getLong("id"));
            tournament.setTitle(rs.getString("title"));

            tournament.setRegistrationStart(
                    rs.getTimestamp("registration_start").toLocalDateTime()
            );

            tournament.setRegistrationEnd(
                    rs.getTimestamp("registration_end").toLocalDateTime()
            );

            return tournament;

        }, id);
    }

    public void updateTournamentStatus(Long tournamentId,
                                       String status) {

        String sql = """
        UPDATE tournaments
        SET status = ?
        WHERE id = ?
    """;

        jdbcTemplate.update(sql, status, tournamentId);
    }

    public String getTournamentStatus(Long tournamentId) {

        String sql = """
        SELECT status
        FROM tournaments
        WHERE id = ?
    """;

        return jdbcTemplate.queryForObject(
                sql,
                String.class,
                tournamentId
        );
    }

    public List<TournamentCardDTO> getTournaments(String status) {

        String sql;

        if (status == null || status.isBlank()) {

            sql = """
            SELECT
                id,
                title,
                description,
                status,
                format
            FROM tournaments
            ORDER BY start_date DESC
        """;

            return jdbcTemplate.query(sql, (rs, rowNum) -> {

                TournamentCardDTO dto = new TournamentCardDTO();

                dto.setId(rs.getLong("id"));
                dto.setTitle(rs.getString("title"));
                dto.setDescription(rs.getString("description"));
                dto.setStatus(rs.getString("status"));
                dto.setFormat(rs.getString("format"));

                return dto;
            });
        }

        sql = """
        SELECT
            id,
            title,
            description,
            status,
            format
        FROM tournaments
        WHERE status = ?
        ORDER BY start_date DESC
    """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            TournamentCardDTO dto = new TournamentCardDTO();

            dto.setId(rs.getLong("id"));
            dto.setTitle(rs.getString("title"));
            dto.setDescription(rs.getString("description"));
            dto.setStatus(rs.getString("status"));
            dto.setFormat(rs.getString("format"));

            return dto;

        }, status);
    }
}
