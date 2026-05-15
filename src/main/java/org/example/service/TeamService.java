package org.example.service;

import org.example.dto.CreateTeamRequest;
import org.example.model.Tournament;
import org.example.repository.TeamMemberRepository;
import org.example.repository.TeamRepository;
import org.example.repository.TournamentRepository;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TournamentRepository tournamentRepository;
    private final UserRepository userRepository;

    public TeamService(TeamRepository teamRepository,
                       TeamMemberRepository teamMemberRepository,
                       TournamentRepository tournamentRepository,
                       UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.tournamentRepository = tournamentRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Long createTeam(CreateTeamRequest request) {
        Tournament tournament = tournamentRepository.findById(request.getTournamentId());
        if (tournament == null) throw new IllegalArgumentException("Tournament not found");

        if (teamRepository.existsByNameAndTournament(request.getName(), request.getTournamentId())) {
            throw new IllegalArgumentException("Team name already taken in this tournament");
        }

        if (request.getCaptainId() == null) {
            throw new IllegalArgumentException("Captain is required");
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

        teamMemberRepository.addMember(teamId, request.getCaptainId(), true);

        if (request.getMemberIds() != null) {
            for (Long memberId : request.getMemberIds()) {
                if (memberId.equals(request.getCaptainId())) continue;
                teamMemberRepository.addMember(teamId, memberId, false);
            }
        }

        return teamId;
    }
}
