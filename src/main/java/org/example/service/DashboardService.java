package org.example.service;

import org.example.dto.UserDashboardDTO;
import org.example.repository.DashboardRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final DashboardRepository repository;

    public DashboardService(DashboardRepository repository) {
        this.repository = repository;
    }

    public UserDashboardDTO getDashboard(Long userId) {

        return repository.getUserDashboard(userId);
    }
}