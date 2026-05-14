"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isDemoLogin, DEMO_USER } from "@/lib/auth/demo";

const STORAGE_KEY = "propiq-session";

export type AuthUser = {
  email: string;
  name: string;
  nameTr: string;
  role: string;
  roleTr: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as AuthUser;
    if (data?.email && data?.name) return data;
  } catch {
    /* ignore */
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStored());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    if (!isDemoLogin(email, password)) return false;
    const u: AuthUser = {
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      nameTr: DEMO_USER.nameDisplayTr,
      role: DEMO_USER.role,
      roleTr: DEMO_USER.roleTr,
    };
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
