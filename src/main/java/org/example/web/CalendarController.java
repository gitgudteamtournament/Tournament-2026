package org.example.web;

import org.example.model.CalendarEvent;
import org.example.repository.CalendarEventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarEventRepository repository;

    public CalendarController(CalendarEventRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<CalendarEvent>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/tournament/{tournamentId}")
    public ResponseEntity<List<CalendarEvent>> getByTournament(@PathVariable Long tournamentId) {
        return ResponseEntity.ok(repository.findByTournamentId(tournamentId));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, String> body) {
        var e = new CalendarEvent();
        e.setTournamentId(Long.parseLong(body.get("tournamentId")));
        e.setTitle(body.get("title"));
        e.setDescription(body.getOrDefault("description", ""));
        e.setEventTime(LocalDateTime.parse(body.get("eventTime")));
        e.setType(body.getOrDefault("type", "other"));
        e.setCreatedAt(LocalDateTime.now());
        Long id = repository.save(e);
        return ResponseEntity.ok(Map.of("id", id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        repository.delete(id);
        return ResponseEntity.ok(Map.of("message", "Event deleted"));
    }
}
