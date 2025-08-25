'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Home, Loader2, Clipboard } from 'lucide-react';

// Helper untuk format mata uang
const currencyFormatter = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const appType = searchParams.get('app_type');
  const total = parseFloat(searchParams.get('total') || '0');
  const features = searchParams.getAll('features');
  const dp = total / 2;
  const bankAccountNumber = '1234567890';

  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccountNumber);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <div className="max-w-2xl mx-auto bg-indigo-900/20 border border-indigo-500/20 p-8 md:p-10 rounded-2xl shadow-xl text-left">
      <div className="flex items-center gap-4 mb-6">
        <CheckCircle className="w-10 h-10 text-pink-500" />
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
                Konfirmasi Pesanan Anda
            </h1>
            <p className="text-indigo-300">Satu langkah lagi untuk memulai proyek Anda.</p>
        </div>
      </div>

      <div className="space-y-4 text-indigo-200">
        <p><strong>Nama:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Jenis Aplikasi:</strong> {appType}</p>
        <div>
          <strong>Fitur yang Dipilih:</strong>
          <ul className="list-disc list-inside ml-4 mt-1">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <p><strong>Total Estimasi:</strong> {currencyFormatter(total)}</p>
        
        <div className="pt-4 mt-4 border-t border-indigo-800/50">
            <p className="text-pink-400">
              <strong>Silakan lakukan pembayaran DP (50%):</strong><br />
              <span className="text-2xl font-bold text-pink-400">{currencyFormatter(dp)}</span>
            </p>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="font-semibold text-white">Transfer ke:</p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p>Bank BCA - <span className="font-mono">{bankAccountNumber}</span></p>
              <p>a.n. Ahsanul Amal Fillah</p>
            </div>
            <button onClick={handleCopy} className="bg-indigo-600/50 p-2 rounded-lg hover:bg-indigo-600/80 transition" title="Salin nomor rekening">
              <Clipboard size={18} />
            </button>
          </div>
        </div>

        <p className="text-sm text-indigo-400 pt-2">
          Setelah melakukan pembayaran, silakan kirim bukti transfer ke WhatsApp kami untuk konfirmasi lebih lanjut.
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-indigo-300 font-medium hover:text-white transition"
        >
          <Home size={16} />
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="bg-gray-900">
      <Header />
      <main className="min-h-screen py-20 md:py-32 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LoadingState />}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
            <p className="text-indigo-300">Memuat detail konfirmasi...</p>
        </div>
    );
}
