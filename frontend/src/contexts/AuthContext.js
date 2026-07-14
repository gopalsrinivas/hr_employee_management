"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import apiClient, { setAuthToken } from "../services/apiClient";
import { clearAuthSession, getAuthSession, saveAuthSession } from "../utils/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getAuthSession();

    if (session?.token) {
      setUser(session.user);
      setToken(session.token);
      setAuthToken(session.token);
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    const nextSession = response.data.data;

    setUser(nextSession.user);
    setToken(nextSession.token);
    setAuthToken(nextSession.token);
    saveAuthSession(nextSession);

    return nextSession;
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      clearAuthSession();
      setAuthToken(null);
      setUser(null);
      setToken(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
