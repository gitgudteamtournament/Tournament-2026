package org.example.web;

import org.example.service.UserService;
import org.example.model.User;
import org.example.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> body) {
        User user = new User();
        user.setLogin(body.getOrDefault("login", body.get("email")));
        user.setPassword(body.get("password"));
        user.setName(body.get("name"));

        User registered = userService.register(user);
        if (registered != null) {
            return ResponseEntity.ok("User registered successfully with login: " + user.getLogin());
        } else {
            return ResponseEntity.badRequest().body("Registration failed (maybe login exists)");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) {
        String login = body.getOrDefault("login", body.get("email"));
        User authenticated = userService.authenticateUser(
                login,
                body.get("password")
        );
        if (authenticated != null) {
            String token = jwtUtil.generateToken(
                    authenticated.getLogin(),
                    authenticated.getName(),
                    authenticated.getRoles().stream()
                            .map(role -> role.getRoleName())
                            .collect(Collectors.toSet())
            );
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}