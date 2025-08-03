// src/app/admin/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
// --- 1. Impor library xlsx dan ikon Download ---
import * as XLSX from 'xlsx';
import { LogOut, DollarSign, ShoppingBag, Users, Loader2, AlertCircle, Trash2, Eye, AlertTriangle, Download } from 'lucide-react';
import { Chatbox } from '@/components/Chatbox';

type Order = {
  id: number;
  name: string;
  email: string;
  business?: string;
  app_type: string;
  features: string[];
  total: number;
  created_at: string;
};

// Helper untuk format mata uang
const currencyFormatter = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profileError || profile?.role !== "admin") {
        router.push("/");
        return;
      }
      setAuthChecking(false);
    };
    checkAdmin();
  }, [router]);

  useEffect(() => {
    if (authChecking) return;
    fetchOrders();
  }, [authChecking]);
  
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data pesanan:", error);
      setError("Tidak dapat memuat data pesanan. Silakan coba lagi nanti.");
    } else {
      setOrders(data as Order[]);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  
  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', selectedOrder.id);

    if (error) {
      console.error("Gagal menghapus pesanan:", error);
      alert("Gagal menghapus pesanan.");
    } else {
      setOrders(orders.filter(order => order.id !== selectedOrder.id));
      alert("Pesanan berhasil dihapus.");
    }
    setIsDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  // --- 2. Fungsi untuk handle export ke Excel ---
  const handleExportToExcel = () => {
    // Format data agar sesuai untuk Excel
    const formattedData = orders.map(order => ({
      'Tanggal Pesanan': new Date(order.created_at).toLocaleString('id-ID'),
      'Nama Pelanggan': order.name,
      'Email': order.email,
      'Sektor Bisnis': order.business || '-',
      'Jenis Aplikasi': order.app_type,
      'Fitur Dipilih': order.features.join(', '),
      'Total Biaya': order.total,
    }));

    // Buat worksheet dari data yang sudah diformat
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    // Buat workbook baru
    const workbook = XLSX.utils.book_new();
    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pesanan");

    // Atur lebar kolom agar lebih rapi
    worksheet['!cols'] = [
        { wch: 20 }, // Tanggal Pesanan
        { wch: 25 }, // Nama Pelanggan
        { wch: 30 }, // Email
        { wch: 20 }, // Sektor Bisnis
        { wch: 30 }, // Jenis Aplikasi
        { wch: 50 }, // Fitur Dipilih
        { wch: 15 }, // Total Biaya
    ];

    // Trigger download file Excel
    XLSX.writeFile(workbook, "Daftar_Pesanan_CODETIKA.xlsx");
  };

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const uniqueCustomers = new Set(orders.map(order => order.email)).size;

  if (authChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
        <p className="ml-3 text-indigo-300">Memverifikasi akses admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-indigo-800/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-indigo-300 hover:text-red-500 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Pendapatan" value={currencyFormatter(totalRevenue)} icon={<DollarSign />} />
          <StatCard title="Jumlah Pesanan" value={totalOrders.toString()} icon={<ShoppingBag />} />
          <StatCard title="Pelanggan Unik" value={uniqueCustomers.toString()} icon={<Users />} />
        </div>

        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg shadow-lg overflow-hidden">
          {/* --- 3. Tambahkan tombol Export di sini --- */}
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Daftar Pesanan Terbaru</h2>
            <button 
              onClick={handleExportToExcel}
              disabled={orders.length === 0}
              className="flex items-center gap-2 bg-pink-600 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              Export ke Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-800/50">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Pelanggan</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Jenis Aplikasi</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Tanggal</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-300 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-indigo-300 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-indigo-800/50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-indigo-300">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-10 h-10 text-red-400" />
                        <span>{error}</span>
                      </div>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-indigo-300">Belum ada pesanan yang masuk.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-indigo-900/30 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{order.name}</div>
                        <div className="text-sm text-indigo-400">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">{order.app_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-400">
                        {new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-white">{currencyFormatter(order.total)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center items-center gap-4">
                          <button onClick={() => setSelectedOrder(order)} className="text-pink-400 hover:text-pink-600" title="Lihat Detail"><Eye size={18} /></button>
                          <button onClick={() => { setSelectedOrder(order); setIsDeleteModalOpen(true); }} className="text-red-400 hover:text-red-600" title="Hapus Pesanan"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <Chatbox defaultUser="e9cde212-0a18-4768-8125-f318f9b5f0a8" />
      
      {selectedOrder && !isDeleteModalOpen && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
      
      {isDeleteModalOpen && selectedOrder && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteOrder}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

// Komponen Pembantu
const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-lg shadow-lg flex items-center gap-6">
    <div className="bg-gray-800/50 text-pink-500 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-indigo-300">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const SkeletonRow = () => (
  <tr>
    <td className="px-6 py-4"><div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div><div className="h-4 bg-gray-700 rounded w-1/2 mt-2 animate-pulse"></div></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-700 rounded w-1/2 ml-auto animate-pulse"></div></td>
    <td className="px-6 py-4"><div className="flex justify-center gap-4"><div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div><div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div></div></td>
  </tr>
);

// Modal Detail Pesanan
const OrderDetailModal = ({ order, onClose }: { order: Order, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="bg-gray-900 border border-indigo-700/50 rounded-lg shadow-xl w-full max-w-2xl animate-fade-in-up">
      <div className="p-6 border-b border-indigo-800/50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Detail Pesanan</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
      </div>
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div><p className="text-sm text-indigo-300">Nama Pelanggan</p><p className="font-medium text-white">{order.name}</p></div>
          <div><p className="text-sm text-indigo-300">Email</p><p className="font-medium text-white">{order.email}</p></div>
          <div><p className="text-sm text-indigo-300">Jenis Aplikasi</p><p className="font-medium text-white">{order.app_type}</p></div>
          <div><p className="text-sm text-indigo-300">Tanggal Pesan</p><p className="font-medium text-white">{new Date(order.created_at).toLocaleString('id-ID')}</p></div>
        </div>
        <div>
          <p className="text-sm text-indigo-300 mb-2">Fitur yang Dipilih</p>
          <ul className="list-disc list-inside bg-gray-800/50 p-4 rounded-md text-indigo-200">
            {order.features.length > 0 ? order.features.map((feature, i) => <li key={i}>{feature}</li>) : <li>Tidak ada fitur tambahan.</li>}
          </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-indigo-800/50 text-right">
          <p className="text-sm text-indigo-300">Total Estimasi</p>
          <p className="text-2xl font-bold text-pink-500">{currencyFormatter(order.total)}</p>
        </div>
      </div>
      <div className="bg-gray-900/50 px-6 py-4 flex justify-end rounded-b-lg">
        <button onClick={onClose} className="bg-indigo-800/50 text-indigo-200 font-bold px-6 py-2 rounded-lg hover:bg-indigo-800/80 transition">Tutup</button>
      </div>
    </div>
  </div>
);

// Modal Konfirmasi Hapus
const DeleteConfirmationModal = ({ onConfirm, onClose }: { onConfirm: () => void, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="bg-gray-900 border border-red-500/50 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4"><AlertTriangle className="w-16 h-16 text-red-500" /></div>
        <h3 className="text-lg font-semibold text-white">Anda Yakin?</h3>
        <p className="text-indigo-200 mt-2">Apakah Anda yakin ingin menghapus pesanan ini? Aksi ini tidak dapat dibatalkan.</p>
      </div>
      <div className="bg-gray-900/50 px-6 py-4 flex justify-center gap-4 rounded-b-lg">
        <button onClick={onClose} className="bg-indigo-800/50 text-indigo-200 font-bold px-6 py-2 rounded-lg hover:bg-indigo-800/80 transition">Batal</button>
        <button onClick={onConfirm} className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700 transition">Ya, Hapus</button>
      </div>
    </div>
  </div>
);
