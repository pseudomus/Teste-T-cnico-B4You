'use client';

import { FloatingNav } from '@/components/ui/floating-navbar';
import useProducts from '../hooks/useProducts';
import ProductList from './ProductList';
import HeaderActions from './HeaderActions';
import ProductModal from '@/components/ui/product-modal';
import CreateProductModal from '@/components/ui/create-product-modal';
import EditProductModal from '@/components/ui/product-edit-modal';

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    selectedProduct,
    modalLoading,
    modalError,
    editingProduct,
    isCreateModalOpen,
    isEditModalOpen,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setEditingProduct,
    fetchProductDetails,
    deleteProduct,
    toggleBought,
    createProduct,
    updateProduct,
    setSelectedProduct,
    logout,
    soma,
  } = useProducts();

  const itensNav = [
    { name: 'Home', link: '/' },
    { name: 'Sobre', link: '/sobre' },
    { name: 'Contato', link: '/contato' },
    { name: 'Sair', onClick: logout },
  ];

  return (
    <>
      <FloatingNav itensNav={itensNav} />

      <HeaderActions onNewClick={() => setIsCreateModalOpen(true)} total={soma()} />

      <main className={`pt-10 p-8 max-w-6xl mx-auto transition-all duration-300 ${
        selectedProduct ? 'filter blur-sm pointer-events-none select-none' : ''
      }`}>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Carregando...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600">Nenhum produto encontrado.</div>
        ) : (
          <ProductList
            products={products}
            onDelete={deleteProduct}
            onToggle={toggleBought}
            onOpen={fetchProductDetails}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsEditModalOpen(true);
            }}
          />
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        loading={modalLoading}
        error={modalError}
        onDelete={deleteProduct}
        onToggleBought={toggleBought}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={editingProduct}
        onSubmit={updateProduct}
      />

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createProduct}
      />
    </>
  );
}
