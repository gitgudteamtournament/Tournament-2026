package org.example;

import org.example.model.Role;
import org.example.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Role defaultRole = new Role();
            defaultRole.setId(1L);
            user.setRoles(Set.of(defaultRole));
        }
        return userRepository.save(user) > 0 ? user : null;
    }

    public boolean authenticate(String login, String password) {
        User user = userRepository.findByLogin(login);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    public User authenticateUser(String login, String rawPassword) {
        User user = userRepository.findByLogin(login);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null;
    }
}