package org.example.configs;

import org.example.model.Role;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${admin.login:admin}")
    private String adminLogin;

    @Value("${admin.password:admin123}")
    private String adminPassword;

    @Value("${admin.name:Administrator}")
    private String adminName;

    public AdminInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.existsByLogin(adminLogin)) {
            return;
        }

        Role adminRole = userRepository.findOrCreateRole("ADMIN");
        User admin = new User();
        admin.setLogin(adminLogin);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setName(adminName);
        admin.setRoles(Set.of(adminRole));

        Long userId = userRepository.save(admin);
        if (userId != null) {
            System.out.println("Admin user created: login=" + adminLogin + ", name=" + adminName);
        }
    }
}
