'use client';

import { useCallback } from 'react';
import { loginUser } from '../services/AuthService';

export default function useAuth() {
  const login = useCallback(async (email, password) => {
    try {
      const response = await loginUser(email, password);
      const { token } = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Falha no login');
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    return !!token;
  }, []);

  return {
    login,
    checkAuth,
  };
}
