'use client';

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function HeaderActions({ onNewClick, total, filter, onFilterChange }) {
  return (
    <div className="mt-[100px] max-w-5xl mx-auto px-4 pt-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button
          onClick={onNewClick}
          className="bg-[#7F60FF] text-white text-lg px-6 py-3 rounded-full hover:bg-[#6b4de0] cursor-pointer"
        >
          Novo Item
        </Button>

        <ToggleGroup type="single" value={filter} onValueChange={onFilterChange} className="ml-4 flex gap-0">
          <ToggleGroupItem
            value="all"
            className="px-4 py-2 border border-gray-300 text-sm font-medium transition
               rounded-l-full
               data-[state=on]:bg-[#7F60FF] data-[state=on]:text-white 
               hover:bg-[#6b4de0] hover:text-white">
            Todos
          </ToggleGroupItem>

          <ToggleGroupItem
            value="bought"
            className="px-4 py-2 border-t border-b border-gray-300 text-sm font-medium transition
               data-[state=on]:bg-[#7F60FF] data-[state=on]:text-white 
               hover:bg-[#6b4de0] hover:text-white">
            Comprados
          </ToggleGroupItem>

          <ToggleGroupItem
            value="unbought"
            className="px-4 py-2 border border-gray-300 text-sm font-medium transition
               rounded-r-full
               data-[state=on]:bg-[#7F60FF] data-[state=on]:text-white 
               hover:bg-[#6b4de0] hover:text-white">
            Pendentes
          </ToggleGroupItem>
        </ToggleGroup>


      </div>

      <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Total R$ <span className="text-[#7F60FF]">{total.toFixed(2)}</span>
      </span>
    </div>
  );
}

