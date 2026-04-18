package org.example;

import org.example.model.User;
import org.example.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService) {
        this.userService = userService;
        this.jwtUtil = new JwtUtil();
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User registered = userService.register(user);
        if (registered != null) {
            return ResponseEntity.ok("User registered successfully with login: " + user.getLogin());
        } else {
            return ResponseEntity.badRequest().body("Registration failed (maybe login exists)");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User authenticated = userService.authenticateUser(user.getLogin(), user.getPassword());
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