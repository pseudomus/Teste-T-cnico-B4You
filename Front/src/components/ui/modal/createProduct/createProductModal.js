"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useCreateProduct } from "./useCreateProduct";

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
  const { formData, handleChange, handleCategoryChange, handleSubmit } =
    useCreateProduct(onSubmit, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl shadow-2xl border border-[#7F60FF]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#7F60FF]">Novo Produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Nome</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite o nome"
                className="border-2 border-[#7F60FF] focus:ring-2 focus:ring-[#7F60FF]/50"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Preço (R$)</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="border-2 border-[#7F60FF] focus:ring-2 focus:ring-[#7F60FF]/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Categoria</label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="border-2 border-[#7F60FF] focus:ring-2 focus:ring-[#7F60FF]/50">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Descrição</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Digite uma descrição (máx. 100 caracteres)"
              maxLength={100}
              className="border-2 border-[#7F60FF] focus:ring-2 focus:ring-[#7F60FF]/50"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length} / 100 caracteres
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#7F60FF] hover:bg-[#6b4de0] text-white font-semibold py-2 px-8 rounded-full transition cursor-pointer"
            >
              Criar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
