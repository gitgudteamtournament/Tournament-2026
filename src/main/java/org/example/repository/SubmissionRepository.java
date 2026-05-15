package org.example.repository;

import org.example.model.Submission;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class SubmissionRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Submission> rowMapper = (ResultSet rs, int rowNum) -> {
        Submission s = new Submission();
        s.setId(rs.getLong("id"));
        s.setRoundId(rs.getLong("round_id"));
        s.setTeamId(rs.getLong("team_id"));
        s.setGithubLink(rs.getString("github_link"));
        s.setVideoLink(rs.getString("video_link"));
        s.setLiveDemoLink(rs.getString("live_demo_link"));
        s.setDescription(rs.getString("description"));
        s.setStatus(rs.getString("status"));
        s.setSubmittedAt(rs.getTimestamp("submitted_at") != null ? rs.getTimestamp("submitted_at").toLocalDateTime() : null);
        s.setUpdatedAt(rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
        try { s.setTeamName(rs.getString("team_name")); } catch (Exception e) { }
        return s;
    };

    public SubmissionRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Long save(Submission submission) {
        jdbcTemplate.update(
            "INSERT INTO submissions (round_id, team_id, github_link, video_link, " +
            "live_demo_link, description, status, submitted_at, updated_at) " +
            "VALUES (?, ?, ?, ?, ?, ?, 'SUBMITTED', NOW(), NOW())",
            submission.getRoundId(), submission.getTeamId(),
            submission.getGithubLink(), submission.getVideoLink(),
            submission.getLiveDemoLink(), submission.getDescription()
        );
        return jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);
    }

    public Submission findById(Long id) {
        List<Submission> list = jdbcTemplate.query(
            "SELECT s.*, t.name as team_name FROM submissions s " +
            "JOIN teams t ON s.team_id = t.id WHERE s.id = ?", rowMapper, id
        );
        return list.isEmpty() ? null : list.get(0);
    }

    public List<Submission> findByRoundId(Long roundId) {
        return jdbcTemplate.query(
            "SELECT s.*, t.name as team_name FROM submissions s " +
            "JOIN teams t ON s.team_id = t.id WHERE s.round_id = ? ORDER BY s.submitted_at",
            rowMapper, roundId
        );
    }

    public List<Submission> findByTeamId(Long teamId) {
        return jdbcTemplate.query(
            "SELECT s.*, t.name as team_name FROM submissions s " +
            "JOIN teams t ON s.team_id = t.id WHERE s.team_id = ? ORDER BY s.submitted_at DESC",
            rowMapper, teamId
        );
    }

    public void update(Submission submission) {
        jdbcTemplate.update(
            "UPDATE submissions SET github_link=?, video_link=?, live_demo_link=?, " +
            "description=?, updated_at=NOW() WHERE id=?",
            submission.getGithubLink(), submission.getVideoLink(),
            submission.getLiveDemoLink(), submission.getDescription(), submission.getId()
        );
    }

    public boolean existsByRoundAndTeam(Long roundId, Long teamId) {
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM submissions WHERE round_id = ? AND team_id = ?", Integer.class, roundId, teamId
        );
        return count != null && count > 0;
    }
}
