package org.example.web;

import org.example.model.Announcement;
import org.example.service.AnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementService service;

    public AnnouncementController(AnnouncementService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Announcement>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getById(@PathVariable Long id) {
        var a = service.getById(id);
        if (a == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(a);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, String> body) {
        String title = body.get("title");
        String content = body.get("content");
        Long createdBy = Long.parseLong(body.get("createdBy"));
        boolean pinned = Boolean.parseBoolean(body.getOrDefault("pinned", "false"));
        if (title == null || title.isBlank() || content == null || content.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Title and content are required"));
        }
        var a = service.create(title, content, createdBy, pinned);
        return ResponseEntity.ok(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String title = body.get("title");
        String content = body.get("content");
        boolean pinned = Boolean.parseBoolean(body.getOrDefault("pinned", "false"));
        service.update(id, title, content, pinned);
        return ResponseEntity.ok(Map.of("message", "Announcement updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(Map.of("message", "Announcement deleted"));
    }
}
