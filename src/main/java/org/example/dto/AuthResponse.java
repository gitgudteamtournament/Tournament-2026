package org.example.dto;

import java.util.Set;

public class AuthResponse {
    private String token;
    private String login;
    private String name;
    private Set<String> roles;

    public AuthResponse() {}

    public AuthResponse(String token, String login, String name, Set<String> roles) {
        this.token = token;
        this.login = login;
        this.name = name;
        this.roles = roles;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}
