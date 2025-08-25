"use client";

import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonialsData = [
  {
    quote: "Kerja sama dengan CODETIKA sangat memuaskan. Websitenya cepat, modern, dan sesuai dengan apa yang kami harapkan. Komunikasinya juga sangat lancar!",
    name: "Khayis Al",
    title: "CEO, Maju Sejahtera",
    avatarUrl: "/avatars/cotang.png",
  },
  {
    quote: "Proses pengerjaan aplikasinya sangat profesional. Semua fitur yang saya minta diimplementasikan dengan baik. Sangat direkomendasikan!",
    name: "Nadia",
    title: "Founder, Startup Inovasi",
    avatarUrl: "/avatars/nadia.jpg",
  },
  {
    quote: "Desain UI/UX yang diberikan benar-benar mengubah tampilan produk kami. Pengguna jadi lebih betah dan mudah menggunakan aplikasi kami. Terima kasih banyak.",
    name: "Sadewa Cahya",
    title: "Manager, Bisnis Transportasi",
    avatarUrl: "/avatars/dewo.png",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-gradient-to-br from-[#1a1a2e] via-indigo-900 to-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Apa Kata Klien Kami?
          </h2>
          <p className="text-lg text-indigo-200 mt-2">
            Kepercayaan dan kepuasan mereka adalah prioritas utama kami.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-indigo-900/20 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-pink-500/10 hover:border-indigo-500/50 hover:-translate-y-2 flex flex-col"
            >
              <Quote className="w-10 h-10 text-pink-500/50 mb-4" />
              <p className="text-indigo-200 italic flex-grow">
                {testimonial.quote}
              </p>
              <div className="flex items-center mt-6 pt-6 border-t border-indigo-800/50">
                <Image
                  src={testimonial.avatarUrl}
                  alt={`Avatar of ${testimonial.name}`}
                  width={48}
                  height={48}
                  className="rounded-full"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/48x48/1a1a2e/ffffff?text=N/A'; }}
                />
                <div className="ml-4">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-indigo-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
