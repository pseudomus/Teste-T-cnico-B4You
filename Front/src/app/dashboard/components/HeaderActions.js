'use client';

import { Button } from "@/components/ui/button";

export default function HeaderActions({ onNewClick, total }) {
  return (
    <div className="mt-[100px] max-w-5xl mx-auto px-4 pt-5 flex justify-between items-center">
      <Button
        onClick={onNewClick}
        className="bg-[#7F60FF] text-white text-lg px-6 py-3 rounded-full hover:bg-[#6b4de0]"
      >
        Novo Item
      </Button>

      <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Total R$ <span className="text-[#7F60FF]">{total.toFixed(2)}</span>
      </span>
    </div>
  );
}
