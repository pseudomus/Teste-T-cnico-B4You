"use client";
import { useState } from "react";
import TextBox from "@/components/textbox";

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

export default function CreateProductModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ name: "", price: "", description: "", category: "" });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(233,196,255,0.25)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-gray-400 text-2xl hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Novo Produto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <TextBox
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Preço (R$)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-[#7F60FF] rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Categoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-[#7F60FF] rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex-1" />
          </div>

          <TextBox
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#7F60FF] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#6f50e0]"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
