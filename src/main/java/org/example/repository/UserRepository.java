package org.example.repository;

import org.example.model.User;
import org.example.model.Role;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Statement;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<User> userRowMapper = (rs, rowNum) -> new User(
            rs.getLong("id"),
            rs.getString("login"),
            rs.getString("password"),
            rs.getString("name")
    );

    private final RowMapper<Role> roleRowMapper = (rs, rowNum) -> new Role(
            rs.getLong("id"),
            rs.getString("role_name")
    );

    public UserRepository(@Qualifier("mysqlJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Role findRoleByName(String name) {
        List<Role> roles = jdbcTemplate.query(
                "SELECT id, role_name FROM roles WHERE role_name = ?",
                new Object[]{name},
                roleRowMapper
        );
        return roles.isEmpty() ? null : roles.get(0);
    }

    public boolean existsByLogin(String login) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM users WHERE login = ?",
                new Object[]{login},
                Integer.class
        );
        return count != null && count > 0;
    }

    public Role findOrCreateRole(String roleName) {
        Role existing = findRoleByName(roleName);
        if (existing != null) {
            return existing;
        }
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(
                    "INSERT INTO roles (role_name) VALUES (?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, roleName);
            return ps;
        }, keyHolder);
        Number key = keyHolder.getKey();
        Long id = key != null ? key.longValue() : 1L;
        return new Role(id, roleName);
    }

    public Set<Role> findRolesByUserId(Long userId) {
        List<Role> roles = jdbcTemplate.query(
                "SELECT r.id, r.role_name FROM roles r " +
                        "JOIN user_roles ur ON r.id = ur.role_id " +
                        "WHERE ur.user_id = ?",
                new Object[]{userId},
                roleRowMapper
        );
        return new HashSet<>(roles);
    }

    public User findByLogin(String login) {
        List<User> users = jdbcTemplate.query(
                "SELECT * FROM users WHERE login = ?",
                new Object[]{login},
                userRowMapper
        );
        if (users.isEmpty()) return null;
        User user = users.get(0);
        user.setRoles(findRolesByUserId(user.getId()));
        return user;
    }

    public User findById(Long id) {
        List<User> users = jdbcTemplate.query(
                "SELECT * FROM users WHERE id = ?",
                new Object[]{id},
                userRowMapper
        );
        if (users.isEmpty()) return null;
        User user = users.get(0);
        user.setRoles(findRolesByUserId(user.getId()));
        return user;
    }

    public List<User> findAllByRole(String roleName) {
        return jdbcTemplate.query(
                "SELECT u.* FROM users u " +
                        "JOIN user_roles ur ON u.id = ur.user_id " +
                        "JOIN roles r ON ur.role_id = r.id " +
                        "WHERE r.role_name = ?",
                new Object[]{roleName},
                userRowMapper
        );
    }

    public Long save(User user) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(
                    "INSERT INTO users(login, password, name) VALUES (?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, user.getLogin());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getName());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key == null) return null;

        Long userId = key.longValue();

        if (user.getRoles() != null) {
            for (Role role : user.getRoles()) {
                jdbcTemplate.update(
                        "INSERT INTO user_roles(user_id, role_id) VALUES (?, ?)",
                        userId, role.getId()
                );
            }
        }

        return userId;
    }
}