package org.example.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Repository
public class TeamRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Long createTeam(
            String name,
            Long tournamentId,
            Long captainId,
            String organization,
            String contactTelegram,
            String contactDiscord,
            String status
    ) {
        LocalDateTime now = LocalDateTime.now();

        jdbcTemplate.update(
                "INSERT INTO teams(name, tournament_id, captain_id, organization, contact_telegram, contact_discord, status, created_at, updated_at) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                name,
                tournamentId,
                captainId,
                organization,
                contactTelegram,
                contactDiscord,
                status,
                Timestamp.valueOf(now),
                Timestamp.valueOf(now)
        );

        return jdbcTemplate.queryForObject(
                "SELECT LAST_INSERT_ID()",
                Long.class
        );
    }
}