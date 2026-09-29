/**
 * useAdminAuth hook
 * Centralised admin authentication state.
 * Auth is persisted in localStorage so it survives page refreshes.
 */
import { useState, useCallback } from 'react';
import { adminLoginApi } from '../services/auth';

const STORAGE_KEY = 'adminAuthenticated';
const TOKEN_KEY = 'authToken';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  );

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await adminLoginApi(email, password);
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(TOKEN_KEY, response.token);
      setIsAdmin(true);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setIsAdmin(false);
  }, []);

  return { isAdmin, login, logout };
}
