'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAllProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProductById,
  toggleProductBought,
} from '../services/productSevice';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);   
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, []);
  

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts();
      setProducts(res.data);
      setError('');
    } catch {
      setError('Falha ao carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data) => {
    try {
      await apiCreateProduct(data);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      await apiUpdateProduct(id, data);
      fetchProducts();
      setIsEditModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    try {
      await deleteProductById(id);
      fetchProducts();
    } catch {
      alert('Erro ao deletar produto.');
    }
  };

  const toggleBought = async (id) => {
    try {
      await toggleProductBought(id);
      setProducts(prev =>
        prev.map(p =>
          p.id === id ? { ...p, bought: !p.bought } : p
        )
      );
    } catch {
      alert('Erro ao atualizar status de compra.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const soma = () => products.reduce((acc, item) => acc + Number(item.price || 0), 0);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
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
