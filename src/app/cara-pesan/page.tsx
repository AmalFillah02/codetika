import Link from 'next/link';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbox } from '@/components/Chatbox';
import { ListChecks, PencilLine, PackageCheck, Send, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <PencilLine className="w-10 h-10 text-pink-500" />,
    title: "Langkah 1: Isi Formulir Pemesanan",
    description: "Kunjungi halaman pemesanan kami dan isi data diri Anda seperti nama lengkap dan alamat email. Informasi ini kami butuhkan untuk menghubungi Anda kembali."
  },
  {
    icon: <ListChecks className="w-10 h-10 text-pink-500" />,
    title: "Langkah 2: Pilih Jenis & Fitur Aplikasi",
    description: "Pilih jenis aplikasi yang paling sesuai dengan kebutuhan Anda, lalu pilih fitur-fitur tambahan yang Anda inginkan. Estimasi biaya akan otomatis terhitung saat Anda memilih."
  },
  {
    icon: <PackageCheck className="w-10 h-10 text-pink-500" />,
    title: "Langkah 3: Periksa Ringkasan Pesanan",
    description: "Setelah selesai memilih, Anda akan diarahkan ke halaman ringkasan. Periksa kembali semua detail pesanan Anda untuk memastikan tidak ada yang terlewat atau salah pilih."
  },
  {
    icon: <Send className="w-10 h-10 text-pink-500" />,
    title: "Langkah 4: Konfirmasi & Kirim",
    description: "Jika semua detail sudah benar, tekan tombol 'Konfirmasi & Kirim Pesanan'. Data pesanan Anda akan langsung kami terima dan simpan dengan aman di sistem kami."
  },
  {
    icon: <Rocket className="w-10 h-10 text-pink-500" />,
    title: "Langkah 5: Kami Akan Menghubungi Anda",
    description: "Selesai! Tim kami akan segera meninjau pesanan Anda dan menghubungi Anda melalui email untuk diskusi lebih lanjut, penawaran harga final, dan proses pembayaran DP."
  }
];

export default function HowToOrderPage() {
  return (
    <div className="bg-gray-900">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-gray-900 to-indigo-900/30 py-20 text-center flex items-center justify-center">
          <div className="container mx-auto px-6">
            <h1 
              className="text-4xl md:text-5xl font-bold text-white animate-fade-in-down"
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              Cara Pemesanan
            </h1>
            <p 
              className="mt-4 text-lg text-indigo-200 max-w-3xl mx-auto animate-fade-in-down"
              style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            >
              Hanya dengan beberapa langkah mudah, Anda bisa memulai proyek digital impian Anda bersama kami.
            </p>
          </div>
        </section>

        <section className="py-20 bg-indigo-900/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col sm:flex-row items-start gap-8 animate-fade-in-up"
                    style={{ animationDelay: `${0.2 * (index + 1)}s`, animationFillMode: 'backwards' }}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full">
                      {step.icon}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
                      <p className="text-indigo-200 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 
                  className="text-3xl font-bold text-white animate-fade-in-up"
                  style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
                >
                    Sudah Paham Caranya?
                </h2>
                <p 
                  className="text-lg text-indigo-200 mt-2 mb-8 animate-fade-in-up"
                  style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
                >
                    Jangan tunda lagi, wujudkan ide Anda sekarang juga.
                </p>
                <Link
                    href="/order"
                    className="inline-block bg-pink-600 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-pink-700 animate-fade-in-up"
                    style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
                >
                    Mulai Pesan Sekarang
                </Link>
            </div>
        </section>
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}
