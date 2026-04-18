package org.example.test;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseTester implements CommandLineRunner {

    private final JdbcTemplate mysqlJdbcTemplate;
    private final JdbcTemplate postgresJdbcTemplate;

    public DatabaseTester(
            @Qualifier("mysqlJdbcTemplate") JdbcTemplate mysqlJdbcTemplate,
            @Qualifier("postgresJdbcTemplate") JdbcTemplate postgresJdbcTemplate
    ) {
        this.mysqlJdbcTemplate = mysqlJdbcTemplate;
        this.postgresJdbcTemplate = postgresJdbcTemplate;
    }

    @Override
    public void run(String... args) {
        Integer mysqlResult = mysqlJdbcTemplate.queryForObject("SELECT 1", Integer.class);
        System.out.println("MySQL test query result: " + mysqlResult);

        Integer postgresResult = postgresJdbcTemplate.queryForObject("SELECT 1", Integer.class);
        System.out.println("PostgreSQL test query result: " + postgresResult);
    }
}