import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 to-[#1a1a2e] py-20">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-indigo-800 to-pink-700 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Proyek Anda?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-indigo-200">
            Jangan biarkan ide brilian Anda hanya menjadi angan-angan. Mari kita diskusikan bagaimana kami bisa membantu mewujudkannya menjadi kenyataan.
          </p>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-white text-pink-600 font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Mulai Proyek Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
