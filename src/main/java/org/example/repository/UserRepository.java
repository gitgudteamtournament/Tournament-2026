package org.example.repository;

import org.example.model.User;
import org.example.model.Role;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

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

    public int save(User user) {
        int result = jdbcTemplate.update(
                "INSERT INTO users(login, password, name) VALUES (?, ?, ?)",
                user.getLogin(), user.getPassword(), user.getName()
        );

        if (result > 0 && user.getRoles() != null) {
            Long userId = jdbcTemplate.queryForObject(
                    "SELECT id FROM users WHERE login = ?",
                    new Object[]{user.getLogin()},
                    Long.class
            );

            for (Role role : user.getRoles()) {
                jdbcTemplate.update(
                        "INSERT INTO user_roles(user_id, role_id) VALUES (?, ?)",
                        userId, role.getId()
                );
            }
        }
        return result;
    }
}