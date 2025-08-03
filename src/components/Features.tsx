// src/components/Features.tsx
import { Code, Smartphone, PenTool } from 'lucide-react';

const featuresData = [
  {
    icon: <Code className="h-10 w-10 text-pink-500" />,
    title: "Web & Aplikasi Modern",
    description: "Website responsif dan cepat dengan teknologi terbaru seperti Next.js, React, dan Tailwind CSS.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-pink-500" />,
    title: "Aplikasi Mobile Kustom",
    description: "Aplikasi Android & iOS yang intuitif dan fungsional untuk menjangkau pengguna Anda di mana saja.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-pink-500" />,
    title: "Desain UI/UX",
    description: "Antarmuka yang tidak hanya indah, tapi juga ramah pengguna untuk pengalaman terbaik.",
  },
];

export function Features() {
  return (
    // Mengubah latar belakang menjadi gelap
    <section className="py-20 bg-[#1a1a2e]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          {/* Mengubah warna teks */}
          <h2 className="text-3xl font-bold text-white">Layanan Unggulan Kami</h2>
          <p className="text-lg text-indigo-200 mt-2">Solusi lengkap untuk kebutuhan digital Anda.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              // Mengubah style kartu menjadi gelap dengan efek glassmorphism
              className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-lg p-8 text-center shadow-lg transition-all duration-300 hover:shadow-pink-500/10 hover:border-indigo-500/50 hover:-translate-y-2"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto bg-gray-800/50 rounded-full shadow-md mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-indigo-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
