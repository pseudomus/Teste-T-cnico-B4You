'use client';

import ProductCard from "@/components/ui/productCard";

export default function ProductList({ products, onDelete, onToggle, onEdit }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          deleteProduct={onDelete}
          toggleBought={onToggle}
          onEdit={() => onEdit(product)}
        />
      ))}
    </div>
  );
}
