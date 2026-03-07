package org.example;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<User> rowMapper = (rs, rowNum) -> new User(
            rs.getLong("id"),
            rs.getString("login"),
            rs.getString("password"),
            rs.getString("name")
    );

    public UserRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User findByLogin(String login) {
        List<User> users = jdbcTemplate.query(
                "SELECT * FROM users WHERE login = ?",
                new Object[]{login},
                rowMapper
        );
        return users.isEmpty() ? null : users.get(0);
    }

    public int save(User user) {
        return jdbcTemplate.update(
                "INSERT INTO users(login, password, name) VALUES (?, ?, ?)",
                user.getLogin(), user.getPassword(), user.getName()
        );
    }
}