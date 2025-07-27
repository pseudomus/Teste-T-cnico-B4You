'use client';

import ProductModal from "@/components/ui/product-modal";
import ProductCard from "@/components/ui/product-card";
import EditProductModal from "@/components/ui/product-edit-modal";
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { FloatingNav } from "@/components/ui/floating-navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/products/getAll');
      setProducts(res.data);
      setError('');
    } catch (err) {
      setError('Falha ao carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (id) => {
    setModalLoading(true);
    setModalError('');
    try {
      const res = await axios.get(`/api/products/${id}`);
      setSelectedProduct(res.data);
    } catch {
      setModalError('Erro ao carregar detalhes do produto.');
    } finally {
      setModalLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
      setSelectedProduct(null);
    } catch {
      alert('Erro ao deletar produto.');
    }
  };

  const toggleBought = async (id) => {
    try {
      await axios.patch(`/api/products/${id}/bought`);
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

  const openModal = (id) => {
    fetchProductDetails(id);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalError('');
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      await axios.put(`/api/products/${id}`, data);
      await fetchProducts();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };
  


  const itensNav = [
    { name: 'Home', link: '/' },
    { name: 'Sobre', link: '/sobre' },
    { name: 'Contato', link: '/contato' },
    { name: 'Sair', onClick: logout },
  ];

  const soma = () => {
    if (!Array.isArray(products)) return 0;
  
    return products.reduce((acc, item) => acc + Number(item.price || 0), 0);
  };  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <FloatingNav itensNav={itensNav} />

      <div className="mt-[100px] max-w-5xl mx-auto px-4 pt-5 flex justify-between items-center">
        <button
          onClick={console.log('teste')}
          className="inline-block bg-[#7F60FF] text-white text-xl px-4 py-3 rounded-full max-w-max font-semibold cursor-pointer hover:bg-[#6f50e0]"
        >
          Novo item
        </button>

          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Total R${" "}
            <span className="text-[#7F60FF] dark:text-[#7F60FF]">
              {soma().toFixed(2)}
            </span>
          </span>
          </div>

      <main className={`pt-10 p-8 max-w-6xl mx-auto transition-all duration-300 ${selectedProduct ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Carregando...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600">Nenhum produto encontrado.</div>
        ) : (
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (
              <ProductCard
                key={product.id} 
                {...product}
                deleteProduct={deleteProduct}
                toggleBought={toggleBought}
                openModal={openModal}
                onEdit={() => {
                  setEditingProduct({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description || '',
                    category: product.category || '',
                  });
                  setIsEditModalOpen(true);
                }}
              />
            ))}

          </div>

        )}
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={closeModal}
        loading={modalLoading}
        error={modalError}
        onDelete={deleteProduct}
        onToggleBought={toggleBought}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={editingProduct}
        onSubmit={handleUpdateProduct}
      />


    </>
  );
}
