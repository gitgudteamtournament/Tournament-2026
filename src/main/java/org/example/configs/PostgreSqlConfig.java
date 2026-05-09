package org.example.configs;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class PostgreSqlConfig {

    @Bean
    @ConfigurationProperties("postgres.datasource")
    public HikariDataSource postgresDataSource() {
        return new HikariDataSource();
    }

    @Bean
    public JdbcTemplate postgresJdbcTemplate(HikariDataSource postgresDataSource) {
        return new JdbcTemplate(postgresDataSource);
    }
}