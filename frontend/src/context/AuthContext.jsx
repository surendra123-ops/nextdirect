import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as authService from "../services/authService.js";
import * as userService from "../services/userService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  const refreshUser = useCallback(async () => {
    const me = await userService.getMe();
    setUser(me);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const me = await userService.getMe();
        if (!cancelled) setUser(me);
      } catch {
        try {
          await authService.refreshSession();
          const me = await userService.getMe();
          if (!cancelled) setUser(me);
        } catch {
          if (!cancelled) setUser(null);
        }
      } finally {
        if (!cancelled) setBooting(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (payload) => {
    const { user: next } = await authService.login(payload);
    setUser(next);
  }, []);

  const register = useCallback(async (payload) => {
    const { user: next } = await authService.register(payload);
    setUser(next);
  }, []);

  const loginWithGoogle = useCallback(async (idToken) => {
    const { user: next } = await authService.loginWithGoogle(idToken);
    setUser(next);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const updateUser = useCallback((next) => {
    setUser((prev) => (prev ? { ...prev, ...next } : prev));
  }, []);

  const isAuthenticated = Boolean(user);

  const value = useMemo(
    () => ({
      user,
      booting,
      isAuthenticated,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshUser,
      updateUser,
    }),
    [user, booting, isAuthenticated, login, register, loginWithGoogle, logout, refreshUser, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
