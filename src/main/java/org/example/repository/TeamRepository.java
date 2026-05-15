package org.example.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class TeamRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean existsByNameAndTournament(String name, Long tournamentId) {
        List<Integer> result = jdbcTemplate.query(
                "SELECT 1 FROM teams WHERE name = ? AND tournament_id = ? LIMIT 1",
                new Object[]{name, tournamentId},
                (rs, rn) -> 1
        );
        return !result.isEmpty();
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

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(
                    "INSERT INTO teams(name, tournament_id, captain_id, organization, contact_telegram, contact_discord, status, created_at, updated_at) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, name);
            ps.setLong(2, tournamentId);
            ps.setLong(3, captainId);
            ps.setString(4, organization);
            ps.setString(5, contactTelegram);
            ps.setString(6, contactDiscord);
            ps.setString(7, status);
            ps.setTimestamp(8, Timestamp.valueOf(now));
            ps.setTimestamp(9, Timestamp.valueOf(now));
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        return key != null ? key.longValue() : null;
    }
}