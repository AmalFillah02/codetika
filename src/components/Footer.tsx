// src/components/Footer.tsx

import Link from "next/link";
import { Instagram } from 'lucide-react'; // Hanya impor ikon yang digunakan

export function Footer() {
  return (
    <footer className="bg-gray-900 text-indigo-300 border-t border-indigo-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom Logo & Deskripsi */}
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-4">
              <h1 className="text-xl font-bold text-white">
                CODETIKA
              </h1>
            </Link>
            <p className="text-indigo-400">Membantu bisnis dan individu membangun kehadiran digital yang kuat.</p>
          </div>

          {/* Kolom Navigasi */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-pink-400 transition">Tentang Kami</Link></li>
              <li><Link href="/how-to-order" className="hover:text-pink-400 transition">Cara Pesan</Link></li>
              <li><Link href="/order" className="hover:text-pink-400 transition">Pesan Layanan</Link></li>
            </ul>
          </div>

          {/* Kolom Layanan */}
           <div>
            <h4 className="font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-400 transition">Web Development</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">UI/UX Design</a></li>
            </ul>
          </div>
          
          {/* Kolom Sosial Media */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/codetika.id/" target="_blank" aria-label="Instagram" className="text-indigo-400 hover:text-white transition"><Instagram /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-indigo-800/50 pt-8 text-center text-indigo-500">
          <p>&copy; {new Date().getFullYear()} CODETIKA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}