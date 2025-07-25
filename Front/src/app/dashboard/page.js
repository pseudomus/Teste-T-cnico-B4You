'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function DashboardPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    axios
      .get('/products')
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        localStorage.removeItem('token')
        router.push('/login')
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  if (loading) {
    return <p className="text-center mt-10">Carregando produtos...</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">Preço: R$ {Number(product.price).toFixed(2)}</p>
            <p className="text-gray-500 text-sm mb-2">Categoria: {product.category}</p>
            {product.description && (
              <p className="text-gray-700 text-sm">{product.description}</p>
            )}
            {product.bought && (
              <span className="mt-2 inline-block text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Já comprado
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
