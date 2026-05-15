package org.example.web;

import org.example.dto.AuthResponse;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.model.Role;
import org.example.model.User;
import org.example.service.UserService;
import org.example.util.JwtUtil;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getLogin() == null || request.getLogin().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Login is required"));
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Password is required"));
        }
        if (request.getName() == null || request.getName().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Name is required"));
        }

        String login = request.getLogin().trim();

        if (userService.loginExists(login)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Login already exists"));
        }

        User user = new User();
        user.setLogin(login);
        user.setPassword(request.getPassword());
        user.setName(request.getName().trim());

        User registered = userService.register(user);
        if (registered == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Registration failed"));
        }

        String token = jwtUtil.generateToken(
                registered.getLogin(),
                registered.getName(),
                registered.getRoles().stream()
                        .map(Role::getRoleName)
                        .collect(Collectors.toSet())
        );

        return ResponseEntity.ok(new AuthResponse(
                token,
                registered.getLogin(),
                registered.getName(),
                registered.getRoles().stream()
                        .map(Role::getRoleName)
                        .collect(Collectors.toSet())
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getLogin() == null || request.getLogin().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Login is required"));
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Password is required"));
        }

        User authenticated = userService.authenticateUser(
                request.getLogin().trim(),
                request.getPassword()
        );

        if (authenticated == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }

        String token = jwtUtil.generateToken(
                authenticated.getLogin(),
                authenticated.getName(),
                authenticated.getRoles().stream()
                        .map(Role::getRoleName)
                        .collect(Collectors.toSet())
        );

        return ResponseEntity.ok(new AuthResponse(
                token,
                authenticated.getLogin(),
                authenticated.getName(),
                authenticated.getRoles().stream()
                        .map(Role::getRoleName)
                        .collect(Collectors.toSet())
        ));
    }
}
