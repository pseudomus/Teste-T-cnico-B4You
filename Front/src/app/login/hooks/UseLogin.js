'use client'; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/AuthService';

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [router]);

  const login = async (data) => {
    setError('');
    setLoading(true);
    try {
      const response = await loginUser(data.email, data.password);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (err) {
      const serverError =
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.errors) ? err.response.data.errors.join(', ') : null) ||
        err.response?.data?.message ||
        err.message ||
        'Erro ao fazer login';
      setError(serverError);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, login };
}
