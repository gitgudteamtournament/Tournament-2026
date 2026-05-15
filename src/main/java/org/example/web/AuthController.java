package org.example.web;

import org.example.dto.AuthResponse;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.model.Role;
import org.example.model.User;
import org.example.service.UserService;
import org.example.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (request.getLogin() == null || request.getLogin().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        if (request.getName() == null || request.getName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        String login = request.getLogin().trim();

        if (userService.loginExists(login)) {
            return ResponseEntity.badRequest().build();
        }

        User user = new User();
        user.setLogin(login);
        user.setPassword(request.getPassword());
        user.setName(request.getName().trim());

        User registered = userService.register(user);
        if (registered == null) {
            return ResponseEntity.badRequest().build();
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
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        if (request.getLogin() == null || request.getLogin().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        User authenticated = userService.authenticateUser(
                request.getLogin().trim(),
                request.getPassword()
        );

        if (authenticated == null) {
            return ResponseEntity.status(401).build();
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
