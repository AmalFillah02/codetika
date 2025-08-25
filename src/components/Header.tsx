"use client"; 

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 shadow-md backdrop-blur-sm border-b border-indigo-800/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        <Image
            src="/codetika-white.png"
            alt="CODETIKA Logo"
            width={150}
            height={0}
            priority
          />
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-indigo-300 transition hover:text-white font-medium">Home</Link>
          <Link href="/about" className="text-indigo-300 transition hover:text-white font-medium">Tentang</Link>
          <Link href="/project" className="text-indigo-300 transition hover:text-white font-medium">Project</Link>
          <Link href="/cara-pesan" className="text-indigo-300 transition hover:text-white font-medium">Cara Pesan</Link>
        </nav>
        <Link 
          href="/order" 
          className="hidden md:inline-block bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition hover:bg-pink-700 hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Pesan
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 px-6 pb-4 flex flex-col space-y-4 border-t border-indigo-800/50">
          <Link href="/" className="text-indigo-300 block hover:text-white font-medium pt-4">Home</Link>
          <Link href="/about" className="text-indigo-300 block hover:text-white font-medium">Tentang</Link>
          <Link href="/project" className="text-indigo-300 block hover:text-white font-medium">Project</Link>
          <Link href="/cara-pesan" className="text-indigo-300 block hover:text-white font-medium">Cara Pesan</Link>
          <Link 
            href="/order" 
            className="w-full text-center bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg mt-2"
          >
            Pesan
          </Link>
        </nav>
      )}
    </header>
  );
}