package org.example.service;

import org.example.dto.*;
import org.example.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    public Object getProfile(Long userId) {

        UserProfileDTO base = repository.getUserBase(userId);
        String role = base.getRole();

        switch (role) {

            case "TEAM_MEMBER":
                TeamProfileDTO team = repository.getTeamProfile(userId);
                team.setMembers(repository.getTeamMembers(team.getTeamId()));
                team.setSubmissions(repository.getTeamSubmissions(team.getTeamId()));
                return team;

            case "JURY":
                JuryProfileDTO jury = new JuryProfileDTO();
                jury.setName(base.getName());
                jury.setEmail(base.getEmail());
                jury.setRole(base.getRole());
                jury.setEvaluatedSubmissions(
                        repository.getJuryEvaluations(userId)
                );
                return jury;

            case "ADMIN":
                AdminProfileDTO admin = new AdminProfileDTO();
                admin.setName(base.getName());
                admin.setEmail(base.getEmail());
                admin.setRole(base.getRole());
                admin.setCreatedTournaments(
                        repository.getCreatedTournaments(userId)
                );
                return admin;

            default:
                throw new RuntimeException("Unknown role");
        }
    }
}