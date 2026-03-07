package org.example.configs;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class MySqlConfig {

    // --- MySQL ---
    @Bean
    @Primary
    @ConfigurationProperties("mysql.datasource")
    public HikariDataSource mysqlDataSource() {
        return new HikariDataSource();
    }

    @Bean
    public JdbcTemplate mysqlJdbcTemplate(HikariDataSource mysqlDataSource) {
        return new JdbcTemplate(mysqlDataSource);
    }
}