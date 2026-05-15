package org.example.repository;

import org.example.model.Evaluation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class EvaluationRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Evaluation> rowMapper = (ResultSet rs, int rowNum) -> {
        Evaluation e = new Evaluation();
        e.setId(rs.getLong("id"));
        e.setSubmissionId(rs.getLong("submission_id"));
        e.setJuryId(rs.getLong("jury_id"));
        e.setBackendQuality(rs.getObject("backend_quality", Integer.class));
        e.setDatabaseScore(rs.getObject("database_score", Integer.class));
        e.setFrontendQuality(rs.getObject("frontend_quality", Integer.class));
        e.setFunctionalityScore(rs.getObject("functionality_score", Integer.class));
        e.setUsabilityScore(rs.getObject("usability_score", Integer.class));
        e.setMustHaveCompleteness(rs.getObject("must_have_completeness", Integer.class));
        e.setComment(rs.getString("comment"));
        e.setEvaluatedAt(rs.getTimestamp("evaluated_at") != null ? rs.getTimestamp("evaluated_at").toLocalDateTime() : null);
        try { e.setJuryName(rs.getString("jury_name")); } catch (Exception ex) { }
        return e;
    };

    public EvaluationRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void saveOrUpdate(Evaluation evaluation) {
        jdbcTemplate.update(
            "INSERT INTO evaluations (submission_id, jury_id, backend_quality, database_score, " +
            "frontend_quality, functionality_score, usability_score, must_have_completeness, comment, evaluated_at) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()) " +
            "ON DUPLICATE KEY UPDATE backend_quality=VALUES(backend_quality), " +
            "database_score=VALUES(database_score), frontend_quality=VALUES(frontend_quality), " +
            "functionality_score=VALUES(functionality_score), usability_score=VALUES(usability_score), " +
            "must_have_completeness=VALUES(must_have_completeness), comment=VALUES(comment), evaluated_at=NOW()",
            evaluation.getSubmissionId(), evaluation.getJuryId(),
            evaluation.getBackendQuality(), evaluation.getDatabaseScore(),
            evaluation.getFrontendQuality(), evaluation.getFunctionalityScore(),
            evaluation.getUsabilityScore(), evaluation.getMustHaveCompleteness(),
            evaluation.getComment()
        );
    }

    public Evaluation findBySubmissionAndJury(Long submissionId, Long juryId) {
        List<Evaluation> list = jdbcTemplate.query(
            "SELECT e.*, u.name as jury_name FROM evaluations e " +
            "JOIN users u ON e.jury_id = u.id WHERE e.submission_id = ? AND e.jury_id = ?",
            rowMapper, submissionId, juryId
        );
        return list.isEmpty() ? null : list.get(0);
    }

    public List<Evaluation> findBySubmissionId(Long submissionId) {
        return jdbcTemplate.query(
            "SELECT e.*, u.name as jury_name FROM evaluations e " +
            "JOIN users u ON e.jury_id = u.id WHERE e.submission_id = ?", rowMapper, submissionId
        );
    }

    public List<Evaluation> findByJuryId(Long juryId) {
        return jdbcTemplate.query(
            "SELECT e.*, u.name as jury_name FROM evaluations e " +
            "JOIN users u ON e.jury_id = u.id WHERE e.jury_id = ?", rowMapper, juryId
        );
    }

    public List<Evaluation> findByRoundId(Long roundId) {
        return jdbcTemplate.query(
            "SELECT e.*, u.name as jury_name FROM evaluations e " +
            "JOIN submissions s ON e.submission_id = s.id " +
            "JOIN users u ON e.jury_id = u.id WHERE s.round_id = ?", rowMapper, roundId
        );
    }

    public List<Evaluation> findAll() {
        return jdbcTemplate.query(
                "SELECT e.*, u.name as jury_name FROM evaluations e " +
                        "JOIN users u ON e.jury_id = u.id",
                rowMapper
        );
    }
}
