package org.example.service;

import org.example.model.Announcement;
import org.example.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnnouncementService {

    private final AnnouncementRepository repository;

    public AnnouncementService(AnnouncementRepository repository) {
        this.repository = repository;
    }

    public List<Announcement> getAll() {
        return repository.findAll();
    }

    public Announcement getById(Long id) {
        return repository.findById(id);
    }

    public Announcement create(String title, String content, Long createdBy, boolean pinned) {
        var a = new Announcement();
        a.setTitle(title);
        a.setContent(content);
        a.setCreatedBy(createdBy);
        a.setPinned(pinned);
        a.setCreatedAt(LocalDateTime.now());
        Long id = repository.save(a);
        return id != null ? repository.findById(id) : null;
    }

    public void update(Long id, String title, String content, boolean pinned) {
        var a = repository.findById(id);
        if (a == null) throw new IllegalArgumentException("Announcement not found");
        a.setTitle(title);
        a.setContent(content);
        a.setPinned(pinned);
        repository.update(a);
    }

    public void delete(Long id) {
        repository.delete(id);
    }
}
