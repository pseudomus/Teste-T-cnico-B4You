'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from '@/lib/axios';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError('Erro ao carregar produto'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, form);
      router.push('/dashboard');
    } catch {
      setError('Erro ao atualizar produto');
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} className="input" />
        <input name="price" value={form.price} type="number" onChange={handleChange} className="input" />
        <input name="category" value={form.category} onChange={handleChange} className="input" />
        <button type="submit" className="btn-primary">Salvar</button>
      </form>
    </main>
  );
}
