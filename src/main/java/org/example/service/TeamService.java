package org.example.service;

import org.example.dto.CreateTeamRequest;
import org.example.model.Role;
import org.example.model.Tournament;
import org.example.model.User;
import org.example.repository.TeamMemberRepository;
import org.example.repository.TeamRepository;
import org.example.repository.TournamentRepository;
import org.example.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Set;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TournamentRepository tournamentRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public TeamService(TeamRepository teamRepository,
                       TeamMemberRepository teamMemberRepository,
                       TournamentRepository tournamentRepository,
                       UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.tournamentRepository = tournamentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Long createTeam(CreateTeamRequest request, String captainLogin) {
        Tournament tournament = tournamentRepository.findById(request.getTournamentId());
        if (tournament == null) throw new IllegalArgumentException("Tournament not found");

        if (teamRepository.existsByNameAndTournament(request.getName(), request.getTournamentId())) {
            throw new IllegalArgumentException("Team name already taken in this tournament");
        }

        User captain = userRepository.findByLogin(captainLogin);
        if (captain == null) throw new IllegalArgumentException("Captain not found");

        Long teamId = teamRepository.createTeam(
                request.getName(),
                request.getTournamentId(),
                captain.getId(),
                request.getOrganization(),
                request.getContactTelegram(),
                request.getContactDiscord(),
                "PENDING"
        );

        teamMemberRepository.addMember(teamId, captain.getId(), true);

        if (request.getMembers() != null) {
            for (CreateTeamRequest.MemberInfo member : request.getMembers()) {
                if (member.getEmail() == null || member.getEmail().isBlank()) continue;
                User memberUser = findOrCreateMember(member);
                if (memberUser != null && !memberUser.getId().equals(captain.getId())) {
                    teamMemberRepository.addMember(teamId, memberUser.getId(), false);
                }
            }
        }

        return teamId;
    }

    private User findOrCreateMember(CreateTeamRequest.MemberInfo info) {
        User existing = userRepository.findByLogin(info.getEmail().trim());
        if (existing != null) return existing;

        User newUser = new User();
        newUser.setLogin(info.getEmail().trim());
        newUser.setName(info.getName() != null ? info.getName().trim() : info.getEmail().trim());
        newUser.setPassword(passwordEncoder.encode(generateRandomPassword()));

        Role role = userRepository.findOrCreateRole("TEAM_MEMBER");
        newUser.setRoles(Set.of(role));

        Long userId = userRepository.save(newUser);
        if (userId == null) return null;
        newUser.setId(userId);
        return newUser;
    }

    private String generateRandomPassword() {
        StringBuilder sb = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
        }
        return sb.toString();
    }
}
