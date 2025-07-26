'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';

export default function ShowProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Erro ao carregar produto'));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Carregando...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p><strong>Preço:</strong> R$ {product.price}</p>
      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Comprado:</strong> {product.bought ? 'Sim' : 'Não'}</p>
    </main>
  );
}
