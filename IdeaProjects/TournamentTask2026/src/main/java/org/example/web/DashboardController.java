package org.example.web;

import org.example.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getDashboard(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                service.getDashboard(userId)
        );
    }
}