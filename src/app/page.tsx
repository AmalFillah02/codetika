// src/app/page.tsx
"use client"; // <-- PERBAIKAN: Tambahkan ini di baris paling atas

import dynamic from 'next/dynamic'; // 1. Impor 'dynamic'
import { Header } from "@/components/Header";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Chatbox } from "@/components/Chatbox";
import { Loader2 } from 'lucide-react'; // Impor ikon untuk loading state

// 2. Impor komponen Hero secara dinamis dengan SSR dinonaktifkan
const Hero = dynamic(
  () => import('@/components/Hero').then(mod => mod.Hero), 
  {
    ssr: false, // Pastikan tidak di-render di server
    // Tampilkan loading state sederhana saat komponen dimuat
    loading: () => (
      <div className="flex items-center justify-center w-full md:min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-[#1a1a2e]">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}
