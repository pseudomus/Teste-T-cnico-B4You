'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors([]) 

    try {
      const res = await axios.post('/auth/login', { email, password })
      const token = res.data.token
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors.map(e => e.message))
      } else {
        setErrors(['Erro ao fazer login. Tente novamente.'])
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errors.length > 0 && (
          <ul className="mb-4 text-red-600 text-sm list-disc list-inside">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
