package org.example.repository;

import org.example.model.Round;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoundRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Round> rowMapper = (rs, rowNum) -> {
        Round r = new Round();
        r.setId(rs.getLong("id"));
        r.setTournamentId(rs.getLong("tournament_id"));
        r.setTitle(rs.getString("title"));
        r.setDescription(rs.getString("description"));
        r.setTechRequirements(rs.getString("tech_requirements"));
        r.setRequirements(rs.getString("requirements"));
        r.setMaterials(rs.getString("materials"));
        r.setRoundOrder(rs.getObject("round_order", Integer.class));
        r.setStartTime(rs.getTimestamp("start_time") != null ? rs.getTimestamp("start_time").toLocalDateTime() : null);
        r.setEndTime(rs.getTimestamp("end_time") != null ? rs.getTimestamp("end_time").toLocalDateTime() : null);
        r.setStatus(rs.getString("status"));
        r.setCreatedAt(rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime() : null);
        r.setUpdatedAt(rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
        return r;
    };

    public RoundRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Round round) {
        jdbcTemplate.update(
            "INSERT INTO rounds (tournament_id, title, description, tech_requirements, requirements, " +
            "materials, round_order, start_time, end_time, status, created_at, updated_at) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            round.getTournamentId(), round.getTitle(), round.getDescription(),
            round.getTechRequirements(), round.getRequirements(),
            round.getMaterials(), round.getRoundOrder(),
            round.getStartTime(), round.getEndTime(),
            round.getStatus() != null ? round.getStatus() : "DRAFT"
        );
    }

    public Round findById(Long id) {
        List<Round> list = jdbcTemplate.query("SELECT * FROM rounds WHERE id = ?", rowMapper, id);
        return list.isEmpty() ? null : list.get(0);
    }

    public List<Round> findByTournamentId(Long tournamentId) {
        return jdbcTemplate.query(
            "SELECT * FROM rounds WHERE tournament_id = ? ORDER BY round_order ASC", rowMapper, tournamentId
        );
    }

    public List<Round> findAll() {
        return jdbcTemplate.query("SELECT * FROM rounds ORDER BY created_at DESC", rowMapper);
    }

    public List<Round> findActive() {
        return jdbcTemplate.query(
            "SELECT * FROM rounds WHERE status = 'ACTIVE' ORDER BY end_time ASC", rowMapper
        );
    }

    public void updateStatus(Long id, String status) {
        jdbcTemplate.update("UPDATE rounds SET status = ?, updated_at = NOW() WHERE id = ?", status, id);
    }

    public void update(Round round) {
        jdbcTemplate.update(
            "UPDATE rounds SET title=?, description=?, tech_requirements=?, requirements=?, " +
            "materials=?, round_order=?, start_time=?, end_time=?, updated_at=NOW() WHERE id=?",
            round.getTitle(), round.getDescription(), round.getTechRequirements(),
            round.getRequirements(), round.getMaterials(), round.getRoundOrder(),
            round.getStartTime(), round.getEndTime(), round.getId()
        );
    }
}
