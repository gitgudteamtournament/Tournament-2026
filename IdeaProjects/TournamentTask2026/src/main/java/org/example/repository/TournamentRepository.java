package org.example.repository;

import org.example.model.Tournament;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
}
