"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Receipt, User, Briefcase, Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

type OrderData = {
  name: string;
  email: string;
  business?: string;
  appType: string;
  selectedFeatures: string[];
  total: number;
};

// set mata uang
const currencyFormatter = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export default function OrderSummaryPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("order");
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      router.push("/order");
    }
    setIsLoading(false);
  }, [router]);

  const handleConfirm = async () => {
    if (!order) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("orders").insert([
      {
        name: order.name,
        email: order.email,
        business: order.business,
        app_type: order.appType,
        features: order.selectedFeatures,
        total: order.total,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      setIsSubmitting(false);
      console.error("Gagal menyimpan ke Supabase:", error.message);
      alert("❌ Gagal mengirim pesanan. Silakan coba lagi.");
      return;
    }

    try {
      const emailPayload = {
        name: order.name,
        email: order.email,
        app_type: order.appType,
        features: order.selectedFeatures,
        total: order.total,
      };

      const emailResponse = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      if (!emailResponse.ok) {
        const errorResult = await emailResponse.json();
        console.error("API pengiriman email gagal:", errorResult);
        throw new Error("Server merespons dengan error");
      }
      
      const emailResult = await emailResponse.json();
      if (!emailResult.success) {
        console.error("API pengiriman email gagal:", emailResult.error);
        throw new Error("Pengiriman email gagal dari sisi API");
      }

      alert("✅ Pesanan berhasil dikirim! Email konfirmasi telah dikirimkan kepada Anda.");

    } catch (err) {
      console.error("Gagal mengirim email konfirmasi:", err);
      alert("⚠️ Pesanan Anda berhasil disimpan, namun kami gagal mengirim email konfirmasi. Kami akan menghubungi Anda secara manual.");
    }

    setIsSubmitting(false);
    sessionStorage.removeItem("order");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="bg-gray-900">
      <Header />
      <main className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-indigo-900/20 border border-indigo-500/20 rounded-2xl shadow-xl p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-dashed border-indigo-800/50">
              <div className="flex items-center gap-4">
                <Receipt className="w-10 h-10 text-pink-500" />
                <div>
                  <h1 className="text-3xl font-bold text-white">Ringkasan Pesanan</h1>
                  <p className="text-indigo-300">Mohon periksa kembali detail pesanan Anda.</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-300 mb-3 flex items-center gap-2"><User size={18} /> Info Pelanggan</h3>
                <p className="text-white font-medium">{order.name}</p>
                <p className="text-sm text-indigo-400 flex items-center gap-2"><Mail size={14} />{order.email}</p>
                {order.business && <p className="text-sm text-indigo-400 mt-1 flex items-center gap-2"><Briefcase size={14} />{order.business}</p>}
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-300 mb-3">Jenis Aplikasi</h3>
                <p className="text-white font-medium">{order.appType}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-300 mb-3">Rincian Fitur</h3>
              <div className="space-y-2 border border-indigo-700/50 rounded-lg p-4">
                {order.selectedFeatures.map((feat) => (
                  <div key={feat} className="flex justify-between items-center text-indigo-200">
                    <span>{feat}</span>
                  </div>
                ))}
                {order.selectedFeatures.length === 0 && (
                    <p className="text-indigo-400 italic">Tidak ada fitur tambahan yang dipilih.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-800/50">
              <div className="flex justify-end items-baseline gap-4">
                <span className="text-lg font-medium text-indigo-200">Total Estimasi:</span>
                <span className="text-3xl font-bold text-pink-500">{currencyFormatter(order.total)}</span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-4 mt-10">
              <button
                onClick={() => router.push("/order")}
                disabled={isSubmitting}
                className="w-full sm:w-auto flex-1 flex justify-center items-center gap-2 bg-indigo-800/50 text-indigo-200 font-bold py-3 rounded-lg hover:bg-indigo-800/80 transition disabled:opacity-50"
              >
                <ArrowLeft size={18} /> Kembali & Ubah
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full sm:w-auto flex-1 flex justify-center items-center gap-2 bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Konfirmasi & Kirim Pesanan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
