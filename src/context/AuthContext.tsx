import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getToken, removeToken, setToken } from "../api/client";

export interface AuthUser {
  login: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, login: string, name: string, roles: string[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function parseToken(token: string): AuthUser | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      login: decoded.sub || '',
      name: decoded.name || '',
      roles: decoded.roles || [],
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getToken();
    if (stored) {
      const parsed = parseToken(stored);
      if (parsed) {
        setUser(parsed);
        setTokenState(stored);
      } else {
        removeToken();
      }
    }
    setIsLoading(false);
  }, []);

  const loginFn = useCallback((newToken: string, login: string, name: string, roles: string[]) => {
    setToken(newToken);
    setTokenState(newToken);
    setUser({ login, name, roles });
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login: loginFn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
