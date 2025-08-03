"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="top-0 z-50 w-full bg-gradient-to-l from-gray-900 via-indigo-900 to-[#1a1a2e] shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/codetika-white.png" alt="Logo" className="h-7 w-auto" />
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-indigo-200 transition hover:text-pink-400 font-medium">Home</Link>
          <Link href="/about" className="text-indigo-200 transition hover:text-pink-400 font-medium">About</Link>
          <Link href="https://www.amalfillah.my.id" target="_blank" className="text-indigo-200 transition hover:text-pink-400 font-medium">My Project</Link>
          <Link href="/cara-pesan" className="text-indigo-200 transition hover:text-pink-400 font-medium">How to Order</Link>
        </nav>

        <Link 
          href="/order" 
          className="hidden md:inline-block bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition hover:bg-pink-700 hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Order
        </Link>

        {/* Tombol Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gradient-to-l from-gray-900 via-indigo-900 to-[#1a1a2e] px-6 pb-4 flex flex-col space-y-4">
          <Link href="/" className="text-white block hover:text-pink-400 font-medium">Home</Link>
          <Link href="/about" className="text-white block hover:text-pink-400 font-medium">About</Link>
          <Link href="https://www.amalfillah.my.id" target="_blank" className="text-white block hover:text-pink-400 font-medium">My Project</Link>
          <Link href="/cara-pesan" className="text-white block hover:text-pink-400 font-medium">Cara Order</Link>
          <Link 
            href="/order" 
            className="w-full text-center bg-sky-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg"
          >
            Order
          </Link>
        </nav>
      )}
    </header>
  );
}
