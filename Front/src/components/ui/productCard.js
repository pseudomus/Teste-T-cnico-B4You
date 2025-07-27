'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function ProductCard({ id, name, price, category, description, bought, deleteProduct, toggleBought, onEdit }) {
  return (
    <Card className="rounded-2xl border border-gray-200 shadow hover:shadow-lg transition p-4 relative">

      <CardHeader className="flex justify-end items-center gap-3 pb-2">
        <Image
          src="/editButton.svg"
          alt="Editar"
          width={16}
          height={16}
          className="cursor-pointer hover:scale-110 transition"
          onClick={onEdit}
        />
        <Image
          src="/deleteButton.svg"
          alt="Excluir"
          width={16}
          height={16}
          className="cursor-pointer hover:scale-110 transition"
          onClick={() => deleteProduct(id)}
        />
      </CardHeader>

      <CardContent className="space-y-2">
        <CardTitle className="text-[#7F60FF]">{name}</CardTitle>
        <Badge variant="outline">{category}</Badge>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
        <p className="font-bold text-lg">R$ {Number(price).toFixed(2)}</p>

      </CardContent>

      <div className="flex items-center space-x-2 mt-3">
        <Checkbox checked={bought} onCheckedChange={() => toggleBought(id)} />
        <span className="text-sm cursor-pointer">{bought ? "Comprado" : "Pendente"}</span>
      </div>
    </Card>
  );
}
