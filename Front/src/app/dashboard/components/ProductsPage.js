'use client';
import { FloatingNav } from '@/components/ui/floatingNav';
import useProducts from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import HeaderActions from '../components/HeaderActions';
import EditProductModal from '@/components/ui/modal/editProduct/editProductModal';
import CreateProductModal from '@/components/ui/modal/createProduct/createProductModal'
import { useState } from 'react';

export default function DashboardPage() {
    const {
        products,
        loading,
        error,
        logout,
        soma,
        deleteProduct,
        toggleBought,
        setEditingProduct,
        setIsEditModalOpen,
        editingProduct,
        isEditModalOpen,
        updateProduct,
        createProduct,
        isCreateModalOpen,
        setIsCreateModalOpen
    } = useProducts();



    return (
        <>
            <FloatingNav onLogout={logout} />
            <HeaderActions onNewClick={() => setIsCreateModalOpen(true)} total={soma()} />

            <main className="pt-8 px-6 max-w-6xl mx-auto">
                {loading ? (
                    <p className="text-center text-gray-500">Carregando...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
                ) : (
                    <ProductList
                        products={products}
                        onDelete={deleteProduct}
                        onToggle={toggleBought}
                        onEdit={(product) => {
                            setEditingProduct(product);
                            setIsEditModalOpen(true);
                        }}
                    />
                )}
            </main>

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
