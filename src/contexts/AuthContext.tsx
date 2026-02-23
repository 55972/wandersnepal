'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string; name: string; email: string; role: 'user' | 'admin'; avatar?: string;
}
interface AuthContextType {
  user: User | null; isAuthenticated: boolean; isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void; updateUser: (userData: Partial<User>) => void;
}
const SAMPLE_USERS: User[] = [
  { id: "1", name: "Admin User", email: "admin@wandernepal.com", role: "admin", avatar: "https://ui-avatars.com/api/?name=Admin+User&background=8C7B6B&color=fff" },
  { id: "2", name: "Demo User", email: "user@example.com", role: "user", avatar: "https://ui-avatars.com/api/?name=Demo+User&background=EAE4D9&color=1C1C1C" }
];
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user; const isAdmin = user?.role === 'admin';
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const found = SAMPLE_USERS.find(u => u.email === email);
    if (found && password === 'password') { setUser(found); toast.success(`Welcome back, ${found.name}!`); return true; }
    toast.error('Invalid email or password'); return false;
  }, []);
  const register = useCallback(async (name: string, email: string, _pw: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const newUser: User = { id: Date.now().toString(), name, email, role: 'user', avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8C7B6B&color=fff` };
    setUser(newUser); toast.success('Account created!'); return true;
  }, []);
  const logout = useCallback(() => { setUser(null); toast.success('Logged out'); }, []);
  const updateUser = useCallback((d: Partial<User>) => { setUser(p => p ? { ...p, ...d } : null); }, []);
  return <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout, updateUser }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
