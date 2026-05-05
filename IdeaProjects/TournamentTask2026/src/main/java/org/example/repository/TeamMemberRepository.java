package org.example.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Repository
public class TeamMemberRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamMemberRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addMember(Long teamId, Long userId, boolean isCaptain) {
        jdbcTemplate.update(
                "INSERT INTO team_members(team_id, user_id, is_captain, created_at) VALUES (?, ?, ?, ?)",
                teamId,
                userId,
                isCaptain,
                Timestamp.valueOf(LocalDateTime.now())
        );
    }
}