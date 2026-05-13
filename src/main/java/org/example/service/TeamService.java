package org.example.service;

import org.example.dto.CreateTeamRequest;
import org.example.repository.TeamMemberRepository;
import org.example.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;

    public TeamService(TeamRepository teamRepository,
                       TeamMemberRepository teamMemberRepository) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
    }

    @Transactional
    public Long createTeam(CreateTeamRequest request) {

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

        return teamId;
    }
}