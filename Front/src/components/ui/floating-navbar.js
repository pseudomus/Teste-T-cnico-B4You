"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function FloatingNav({ itensNav }) {
  const [visivel, setVisivel] = useState(true);
  const [ultimoScrollY, setUltimoScrollY] = useState(0);

  useEffect(() => {
    const aoScrollar = () => {
      if (window.scrollY > ultimoScrollY) {
        setVisivel(false);
      } else {
        setVisivel(true);
      }
      setUltimoScrollY(window.scrollY);
    };

    window.addEventListener("scroll", aoScrollar);
    return () => window.removeEventListener("scroll", aoScrollar);
  }, [ultimoScrollY]);

  const itemHome = itensNav.find(item => item.name.toLowerCase() === "home");
  const itemSair = itensNav.find(item => item.name.toLowerCase() === "sair");
  const itensDoMeio = itensNav.filter(
    item =>
      item.name.toLowerCase() !== "home" &&
      item.name.toLowerCase() !== "sair"
  );

  return (
    <AnimatePresence>
      {visivel && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-10 py-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/[0.2] shadow-md backdrop-blur-md max-w-5xl w-full"
        >

          <div className="flex items-center">
            {itemHome &&
              (itemHome.onClick ? (
                <button
                  onClick={itemHome.onClick}
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:hover:text-[#7F60FF] transition-colors"
                >
                  My list
                </button>
              ) : (
                <Link
                  href={itemHome.link}
                  className="text-2xl font-semibold text-[#7F60FF] dark:text-neutral-200 hover:text-[#7F60FF] transition-colors"
                >
                  My list
                </Link>
              ))}
          </div>

          {/* <div className="flex items-center gap-6">
            {itensDoMeio.map((item, index) =>
              item.onClick ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-[#7F60FF] transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.link}
                  className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 hover:text-[#7F60FF] transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </div> */}

          <div className="flex items-center">
            {itemSair &&
              (itemSair.onClick ? (
                <button
                  onClick={itemSair.onClick}
                  className="text-xl font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer" 
                >
                  {itemSair.name}
                </button>
              ) : (
                <Link
                  href={itemSair.link}
                  className="text-xl font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  {itemSair.name}
                </Link>
              ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
