package org.example.repository;

import org.example.model.CalendarEvent;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Statement;
import java.util.List;

@Repository
public class CalendarEventRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<CalendarEvent> rowMapper = (rs, rowNum) -> {
        var e = new CalendarEvent();
        e.setId(rs.getLong("id"));
        e.setTournamentId(rs.getLong("tournament_id"));
        e.setTitle(rs.getString("title"));
        e.setDescription(rs.getString("description"));
        e.setEventTime(rs.getTimestamp("event_time").toLocalDateTime());
        e.setType(rs.getString("type"));
        e.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return e;
    };

    public CalendarEventRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CalendarEvent> findByTournamentId(Long tournamentId) {
        return jdbcTemplate.query(
                "SELECT * FROM calendar_events WHERE tournament_id = ? ORDER BY event_time",
                new Object[]{tournamentId}, rowMapper
        );
    }

    public List<CalendarEvent> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM calendar_events ORDER BY event_time", rowMapper
        );
    }

    public Long save(CalendarEvent e) {
        KeyHolder kh = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            var ps = con.prepareStatement(
                    "INSERT INTO calendar_events (tournament_id, title, description, event_time, type) VALUES (?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setLong(1, e.getTournamentId());
            ps.setString(2, e.getTitle());
            ps.setString(3, e.getDescription());
            ps.setTimestamp(4, java.sql.Timestamp.valueOf(e.getEventTime()));
            ps.setString(5, e.getType());
            return ps;
        }, kh);
        Number key = kh.getKey();
        return key != null ? key.longValue() : null;
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM calendar_events WHERE id=?", id);
    }
}
