"use client";
import Image from "next/image";

export default function ProductCard({
  id,
  name,
  price,
  category,
  description,
  bought,
  deleteProduct,
  toggleBought,
  openModal,
  onEdit
}) {
  return (
    <div className="relative bg-white shadow-md rounded-4xl p-6 pt-12 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      <div className="absolute top-4 right-4 flex gap-3">
        <button
            onClick={() => onEdit({ id, name, price, category, description, bought })}
            className="text-yellow-600 hover:underline text-sm cursor-pointer"
        >
        <Image src="/editButton.svg" alt="Editar" width={18} height={18} />
        </button>

        <button
          onClick={() => deleteProduct(id)}
          className="text-red-600 hover:underline text-sm cursor-pointer"
        >
          <Image src="/deleteButton.svg" alt="Excluir" width={18} height={18} />
        </button>
      </div>

      <h2 className="text-xl font-extrabold text-gray-800 mb-4">{name}</h2>

      <p className="text-black mb-4 font-medium text-xl">
        R$ {price}
      </p>

      <span className="inline-block bg-[#609AFF] text-white text-sm px-3 py-2 rounded-full max-w-max mb-4 font-semibold">
        {category}
      </span>

      <div className="flex justify-between items-end mt-6">
        <label className="flex items-center gap-3 text-black font-medium mt-2 text-xl">
          <input
            type="checkbox"
            checked={bought}
            onChange={() => toggleBought(id)}
            className="w-5 h-5 accent-[#7F60FF] cursor-pointer"
          />
          Comprado
        </label>

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
  );
}
