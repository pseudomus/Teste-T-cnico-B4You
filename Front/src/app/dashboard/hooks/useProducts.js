'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAllProducts,
  getProductById,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProductById,
  toggleProductBought,
} from '../services/productSevice';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const router = useRouter();

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

  const fetchProductDetails = async (id) => {
    setModalLoading(true);
    setModalError('');
    try {
      const res = await getProductById(id);
      setSelectedProduct(res.data);
    } catch {
      setModalError('Erro ao carregar detalhes do produto.');
    } finally {
      setModalLoading(false);
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
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    try {
      await deleteProductById(id);
      fetchProducts();
      setSelectedProduct(null);
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
      if (selectedProduct?.id === id) {
        setSelectedProduct(prev => ({ ...prev, bought: !prev.bought }));
      }
    } catch {
      alert('Erro ao atualizar status de compra.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const soma = () => {
    return products.reduce((acc, item) => acc + Number(item.price || 0), 0);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    modalLoading,
    modalError,
    selectedProduct,
    isEditModalOpen,
    setIsEditModalOpen,
    fetchProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleBought,
    logout,
    soma,
  };
}
