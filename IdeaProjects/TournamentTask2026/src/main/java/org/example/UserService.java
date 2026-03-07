package org.example;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user) > 0 ? user : null;
    }

    public boolean authenticate(String login, String password) {
        User user = userRepository.findByLogin(login);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
}