"use client";
import { useState, useEffect } from "react";

const CATEGORIES = [
  "Eletrônicos",
  "Moda e Acessórios",
  "Casa e Decoração",
  "Beleza e Cuidados Pessoais",
  "Livros e Papelaria",
  "Esportes e Lazer",
  "Brinquedos e Jogos",
  "Música e Filmes",
  "Saúde e Bem-estar",
  "Alimentos e Bebidas",
  "Automotivo",
  "Pets",
];

export default function EditProductModal({ isOpen, onClose, product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block font-semibold mb-1">Nome</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Preço */}
          <div>
            <label className="block font-semibold mb-1">Preço</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block font-semibold mb-1">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
              required
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block font-semibold mb-1">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Botão de salvar */}
          <button
            type="submit"
            className="bg-[#7F60FF] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#6f50e0]"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
