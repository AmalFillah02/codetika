"use client";

import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-[#1a1a2e] flex items-center md:min-h-[92vh]">
      <div className="container mx-auto flex flex-col-reverse items-center gap-8 py-12 md:py-0 md:flex-row md:gap-12 px-6 text-center md:text-left">
        
        <div className="w-full md:w-1/2 space-y-6">
          <h2 
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-down"
          >
            <span className="block">CODETIKA</span>
            <span className="block text-pink-500">Website & Aplikasi Profesional</span>
          </h2>
          <p 
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            className="max-w-xl text-lg text-indigo-200 md:mx-0 mx-auto animate-fade-in-down"
          >
            Dari konsep hingga perilisan, kami menyediakan layanan pengembangan web dan aplikasi kustom yang cepat, modern, dan sesuai dengan kebutuhan Anda.
          </p>
          <div 
            style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up"
          >
            <Link
              href="/order"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition hover:bg-pink-700 hover:shadow-xl transform hover:-translate-y-1"
            >
              Mulai Proyek
            </Link>
            <Link
              href="https://amalfillah.my.id"
              target="_blank"
              className="bg-transparent text-pink-400 border border-pink-400 px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition hover:bg-pink-500 hover:text-white hover:shadow-lg transform hover:-translate-y-1"
            >
              Lihat Portofolio
            </Link>
          </div>
        </div>
        
        <div 
          className="w-full md:w-1/2 animate-fade-in-up group cursor-pointer"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          <div className="transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-2 md:-translate-x-16">
            <Player
              autoplay
              loop
              src="/animHero.json"
              style={{ maxWidth: '650px', width: '100%', margin: 'auto' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
