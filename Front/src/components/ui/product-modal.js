// components/ProductModal.js
'use client';

import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

export default function ProductModal({
  product,
  onClose,
  loading,
  error,
  onDelete,
  onToggleBought,
}) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(233, 196, 255, 0.25)' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-4xl shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold cursor-pointer p-4"
          aria-label="Fechar"
        >
          ×
        </button>

        {loading ? (
          <p className="text-center text-gray-500">Carregando detalhes...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold mb-4">{product.name}</h2>
            <p className="font-medium text 3xl mb-2">
               R$ {product.price}
            </p>
            <span className="inline-block bg-[#609AFF] text-white text-sm px-3 py-2 rounded-full max-w-max mb-4 font-semibold">
                {product.category}
              </span>
            <p className="mb-2">
              <strong>Descrição:</strong> {product.description || 'Sem descrição'}
            </p>

            <label className="flex items-center gap-2 text-sm text-gray-700 mt-4">
              <input
                type="checkbox"
                checked={product.bought}
                onChange={() => onToggleBought(product.id)}
                className="w-5 h-5 accent-[#7F60FF]"
              />
              Comprado
            </label>

            <div className="mt-6 flex justify-end gap-4">
              <Link
                href={`/products/${product.id}/edit`}
                className=" px-4 py-4 cursor-pointer"
              >
                <Image src="/editButton.svg" alt="Ver" width={18} height={18} />
              </Link>
              <button
                onClick={() => {
                  onDelete(product.id);
                  onClose();
                }}
                className=" px-4 py-2 text-sm cursor-pointer"
              >
                <Image src="/deleteButton.svg" alt="Ver" width={18} height={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

