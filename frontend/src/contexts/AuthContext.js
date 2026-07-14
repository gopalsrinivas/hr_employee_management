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

  useEffect(() => {
    const handleAutoLogout = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener("auth:logout", handleAutoLogout);
    return () => window.removeEventListener("auth:logout", handleAutoLogout);
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

  const refreshProfile = async () => {
    const response = await apiClient.get("/auth/profile");
    const nextUser = response.data.data;
    const session = getAuthSession();
    const nextSession = { ...session, user: nextUser };

    setUser(nextUser);
    saveAuthSession(nextSession);
    return nextUser;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout,
      refreshProfile
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
