package org.example.repository;

import org.example.model.Announcement;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Statement;
import java.util.List;

@Repository
public class AnnouncementRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<Announcement> rowMapper = (rs, rowNum) -> {
        var a = new Announcement();
        a.setId(rs.getLong("id"));
        a.setTitle(rs.getString("title"));
        a.setContent(rs.getString("content"));
        a.setCreatedBy(rs.getLong("created_by"));
        a.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        a.setPinned(rs.getBoolean("pinned"));
        return a;
    };

    public AnnouncementRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Announcement> findAll() {
        return jdbcTemplate.query(
                "SELECT * FROM announcements ORDER BY pinned DESC, created_at DESC",
                rowMapper
        );
    }

    public Announcement findById(Long id) {
        var list = jdbcTemplate.query(
                "SELECT * FROM announcements WHERE id = ?",
                new Object[]{id}, rowMapper
        );
        return list.isEmpty() ? null : list.get(0);
    }

    public Long save(Announcement a) {
        KeyHolder kh = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            var ps = con.prepareStatement(
                    "INSERT INTO announcements (title, content, created_by, pinned) VALUES (?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, a.getTitle());
            ps.setString(2, a.getContent());
            ps.setLong(3, a.getCreatedBy());
            ps.setBoolean(4, a.isPinned());
            return ps;
        }, kh);
        Number key = kh.getKey();
        return key != null ? key.longValue() : null;
    }

    public void update(Announcement a) {
        jdbcTemplate.update(
                "UPDATE announcements SET title=?, content=?, pinned=? WHERE id=?",
                a.getTitle(), a.getContent(), a.isPinned(), a.getId()
        );
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM announcements WHERE id=?", id);
    }
}
