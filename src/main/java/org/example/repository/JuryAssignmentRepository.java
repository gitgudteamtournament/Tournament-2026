package org.example.repository;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JuryAssignmentRepository {

    private final JdbcTemplate jdbcTemplate;

    public JuryAssignmentRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void assign(Long submissionId, Long juryId) {
        jdbcTemplate.update(
            "INSERT IGNORE INTO jury_assignments (submission_id, jury_id, assigned_at, status) VALUES (?, ?, NOW(), 'ASSIGNED')",
            submissionId, juryId
        );
    }

    public void clearByRoundId(Long roundId) {
        jdbcTemplate.update(
            "DELETE ja FROM jury_assignments ja JOIN submissions s ON ja.submission_id = s.id WHERE s.round_id = ?",
            roundId
        );
    }

    public List<Long> findJuryIdsBySubmissionId(Long submissionId) {
        return jdbcTemplate.queryForList(
            "SELECT jury_id FROM jury_assignments WHERE submission_id = ?", Long.class, submissionId
        );
    }

    public List<Long> findSubmissionIdsByJuryId(Long juryId) {
        return jdbcTemplate.queryForList(
            "SELECT submission_id FROM jury_assignments WHERE jury_id = ?", Long.class, juryId
        );
    }
}
