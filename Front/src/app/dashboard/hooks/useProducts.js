'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUnboughtProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProductById,
  toggleProductBought,
  getAllProducts,
  getBoughtProducts,
} from '../services/productSevice';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchProducts = async (selectedFilter = filter) => {
    try {
      setLoading(true);
      let res;
      if (selectedFilter === 'bought') res = await getBoughtProducts();
      else if (selectedFilter === 'unbought') res = await getUnboughtProducts();
      else res = await getAllProducts();

      setProducts(res.data);
      setError('');
    } catch {
      setError('Falha ao carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  const changeFilter = (value) => {
    if (!value || value === filter) return;
    setFilter(value);
    fetchProducts(value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [router]);

  const createProduct = async (data) => {
    await apiCreateProduct(data);
    fetchProducts(filter); 
  };

  const updateProduct = async (id, data) => {
    await apiUpdateProduct(id, data);
    fetchProducts(filter);
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    await deleteProductById(id);
    fetchProducts(filter);
  };

  const toggleBought = async (id) => {
    await toggleProductBought(id);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, bought: !p.bought } : p)));
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const soma = () => products.reduce((acc, item) => acc + Number(item.price || 0), 0);

  return {
    products,
    filter,
    changeFilter,
    loading,
    error,
    isEditModalOpen,
    setIsEditModalOpen,
    editingProduct,
    setEditingProduct,
    isCreateModalOpen,
    setIsCreateModalOpen,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleBought,
    logout,
    soma,
  };
}
