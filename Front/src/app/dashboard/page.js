'use client';

import Image from "next/image"
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      fetchProducts();
      if (selectedProduct?.id === id) {
        fetchProductDetails(id);
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

      {/* Abaixo da nav */}
      <div className="mt-[100px] max-w-5xl mx-auto px-4 flex justify-between items-center">
        {/* Botão adicionar item */}
        <button
          onClick={console.log('teste')}
          className="inline-block bg-[#7F60FF] text-white text-xl px-3 py-2 rounded-full max-w-max font-semibold cursor-pointer"
        >
          Adicionar novo item
        </button>

          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Total R${" "}
            <span className="text-[#7F60FF] dark:text-[#7F60FF]">
              {soma().toFixed(2)}
            </span>
          </span>
          </div>

      {/* Conteúdo */}
      <main className={`pt-24 p-8 max-w-6xl mx-auto transition-all duration-300 ${selectedProduct ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Carregando...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600">Nenhum produto encontrado.</div>
        ) : (
          

          //Cartão do produto
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dentro do map de produtos, substitua o bloco do card por isso: */}

            {products.map(({ id, name, price, category, bought }) => (
            <div
              key={id}
              className="relative bg-white shadow-md rounded-4xl p-6 pt-12 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
            >
              {/* Botões Editar e Deletar no topo direito */}
              <div className="absolute top-4 right-4 flex gap-3">
                <Link
                  href={`/products/${id}/edit`}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  <Image src="/editButton.svg" alt="Ver" width={18} height={18} />
                </Link>
                <button
                  onClick={() => deleteProduct(id)}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  <Image src="/deleteButton.svg" alt="Ver" width={18} height={18} />
                </button>
              </div>

              {/* Conteúdo principal */}
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">{name}</h2>
              <p className="text-black mb-4 font-medium text-xl">R$ {price}</p>
              <span className="inline-block bg-[#609AFF] text-white text-sm px-3 py-2 rounded-full max-w-max mb-4 font-semibold">
                {category}
              </span>
              <div className="flex justify-between items-end mt-6">
              <label className="flex items-center gap-3 text-black font-medium mt-2 text-xl">
                <input
                  type="checkbox"
                  checked={bought}
                  onChange={() => toggleBought(id)}
                  className="w-5 h-5 accent-[#7F60FF]"
                />
                Comprado
              </label>

              {/* Botão Ver no canto inferior direito */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => openModal(id)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  <Image src="/backButton.svg" alt="Ver" width={20} height={20} />
                </button>
              </div>
            </div>
            </div>
            ))}


          </div>

        )}
      </main>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Fechar"
            >
              ×
            </button>

            {modalLoading ? (
              <p className="text-center text-gray-500">Carregando detalhes...</p>
            ) : modalError ? (
              <p className="text-center text-red-600">{modalError}</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                <p className="mb-2">
                  <strong>Preço:</strong> R$ {selectedProduct.price}
                </p>
                <p className="mb-2">
                  <strong>Categoria:</strong> {selectedProduct.category}
                </p>
                <p className="mb-2">
                  <strong>Descrição:</strong> {selectedProduct.description || 'Sem descrição'}
                </p>

                <label className="flex items-center gap-2 text-sm text-gray-700 mt-4">
                  <input
                    type="checkbox"
                    checked={selectedProduct.bought}
                    onChange={() => toggleBought(selectedProduct.id)}
                    className="w-5 h-5 accent-green-600"
                  />
                  Comprado
                </label>

                <div className="mt-6 flex justify-end gap-4">
                  <Link
                    href={`/products/${selectedProduct.id}/edit`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded shadow text-sm"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => {
                      deleteProduct(selectedProduct.id);
                      closeModal();
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
                  >
                    Deletar
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded shadow text-sm"
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
