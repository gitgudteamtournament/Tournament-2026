package org.example.service;

import org.example.dto.CreateTeamRequest;
import org.example.model.Tournament;
import org.example.repository.TeamMemberRepository;
import org.example.repository.TeamRepository;
import org.example.repository.TournamentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TournamentRepository tournamentRepository;

    public TeamService(TeamRepository teamRepository,
                       TeamMemberRepository teamMemberRepository,
                       TournamentRepository tournamentRepository) {

        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.tournamentRepository = tournamentRepository;
    }

    @Transactional
    public Long createTeam(CreateTeamRequest request) {

        Tournament tournament = tournamentRepository.findById(request.getTournamentId());

        if (tournament == null) {
            throw new RuntimeException("Tournament not found");
        }

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(tournament.getRegistrationStart()) ||
                now.isAfter(tournament.getRegistrationEnd())) {
            throw new RuntimeException("Registration is closed");
        }

        if (request.getCaptainId() == null) {
            throw new RuntimeException("Captain is required");
        }

        if (request.getMemberIds() == null) {
            throw new RuntimeException("Members are required");
        }

        Set<Long> unique = new HashSet<>(request.getMemberIds());
        unique.add(request.getCaptainId());

        if (unique.size() < 2) {
            throw new RuntimeException("Team must have at least 2 members");
        }

        Long teamId = teamRepository.createTeam(
                request.getName(),
                request.getTournamentId(),
                request.getCaptainId(),
                request.getOrganization(),
                request.getContactTelegram(),
                request.getContactDiscord(),
                "PENDING"
        );


        teamMemberRepository.addMember(
                teamId,
                request.getCaptainId(),
                true
        );

        for (Long userId : request.getMemberIds()) {

            if (userId == null) continue;

            if (userId.equals(request.getCaptainId())) {
                continue;
            }

            teamMemberRepository.addMember(
                    teamId,
                    userId,
                    false
            );
        }

        return teamId;
    }
}