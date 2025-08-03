// /src/app/about/page.tsx

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { CheckCircle, Lightbulb, Target } from "lucide-react";
import { Chatbox } from "@/components/Chatbox";

export default function AboutPage() {
  return (
    // Menggunakan satu warna latar belakang utama untuk konsistensi
    <div className="bg-gray-900">
      <Header />
      <main>
        {/* Section Hero */}
        <section className="bg-gradient-to-b from-gray-900 to-indigo-900/30 py-20 text-center flex items-center justify-center md:min-h-[40vh]">
          <div className="container mx-auto px-6">
            <h1 
              className="text-4xl md:text-5xl font-bold text-white animate-fade-in-down"
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              CODETIKA
            </h1>
            <p 
              className="mt-4 text-lg text-indigo-200 max-w-3xl mx-auto animate-fade-in-down"
              style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            >
              Kami adalah partner digital Anda, berdedikasi untuk mengubah ide menjadi solusi web dan aplikasi yang fungsional dan modern.
            </p>
          </div>
        </section>

        {/* Section Misi & Visi */}
        <section className="py-20 bg-indigo-900/20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div 
                className="text-center md:text-left animate-fade-in-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
              >
                {/* Ikon disesuaikan dengan tema baru */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-800/50 rounded-full text-pink-500">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Misi Kami</h2>
                <p className="text-indigo-200 text-lg">
                  Memberikan solusi digital berkualitas tinggi yang dapat diakses oleh semua kalangan, dari individu hingga bisnis skala menengah, dengan fokus pada teknologi modern dan desain yang berorientasi pada pengguna.
                </p>
              </div>
              <div 
                className="text-center md:text-left animate-fade-in-up"
                style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
              >
                {/* Ikon disesuaikan dengan tema baru */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-800/50 rounded-full text-pink-500">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Visi Kami</h2>
                <p className="text-indigo-200 text-lg">
                  Menjadi layanan software development terpercaya yang dikenal karena kualitas, profesionalisme, dan kemampuan dalam membantu mencapai kesuksesan di dunia digital.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Filosofi CODETIKA */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div 
                className="animate-fade-in-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
              >
                <Image 
                  src="/codetika-full.png"
                  alt="Logo Codetika"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>
              <div 
                className="animate-fade-in-up"
                style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
              >
                <h2 className="text-3xl font-bold text-white mb-7 text-center md:text-left">
                  Filosofi CODETIKA
                </h2>
                <p className="text-indigo-200 mb-6 text-lg text-justify">
                  <b>Codetika</b> adalah konsep yang memadukan kecerdasan teknologi dengan landasan etika yang kuat. Lebih dari sekadar membangun sistem aplikasi, codetika mencerminkan tanggung jawab moral kami terhadap dampak sosial dari teknologi yang kami bangun. Ini mencakup komitmen terhadap integritas, transparansi, dan keamanan, serta kepedulian terhadap privasi dan keberlangsungan ekosistem digital.
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Nilai-nilai Kami</h3>
                <ul className="space-y-3 text-indigo-200">
                  {/* Ikon disesuaikan dengan tema baru */}
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-pink-500 flex-shrink-0" /><span><strong>Integritas:</strong> Orisinalitas, tidak menyisipkan kode berbahaya, dan menghargai hak cipta.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-pink-500 flex-shrink-0" /><span><strong>Transparansi:</strong> Resource yang jujur dan dapat ditinjau secara terbuka.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-pink-500 flex-shrink-0" /><span><strong>Tanggung Jawab:</strong> Menghindari penyalahgunaan data, dan membangun solusi yang memanusiakan pengguna.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-pink-500 flex-shrink-0" /><span><strong>Kolaborasi:</strong> Siap belajar, berbagi, dan menghargai kontribusi dari semua pihak.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <CTA />
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}
