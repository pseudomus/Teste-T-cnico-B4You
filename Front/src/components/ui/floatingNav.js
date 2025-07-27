'use client';

import { Button } from "@/components/ui/button";

export function FloatingNav({ onLogout }) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-md px-12 py-4 flex items-center w-full">
        <span className="text-3xl font-bold text-[#7F60FF]">My List</span>
        <Button
          onClick={onLogout}
          className="ml-auto bg-[#7F60FF] hover:bg-[#6b4de0] text-white rounded-full px-6 py-2 text-lg cursor-pointer"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
