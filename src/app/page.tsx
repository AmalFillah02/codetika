// src/app/page.tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA"; // Pastikan Anda sudah membuat komponen CTA
import HowToOrderPage from "./cara-pesan/page";
import { Chatbox } from "@/components/Chatbox";
// Anda bisa menambahkan komponen Testimonials dan CTA di sini jika sudah dibuat

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        {/* <HowToOrderPage /> */}
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}