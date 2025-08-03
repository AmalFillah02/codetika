'use client';

import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const appType = searchParams.get('app_type');
  const total = parseFloat(searchParams.get('total') || '0');
  const features = searchParams.getAll('features');
  const dp = total / 2;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Konfirmasi Pemesanan</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><strong>Nama:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Jenis Aplikasi:</strong> {appType}</p>
        <div>
          <strong>Fitur yang Dipilih:</strong>
          <ul className="list-disc list-inside">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <p><strong>Total Estimasi:</strong> Rp{total.toLocaleString()}</p>
        <p className="text-green-700">
          <strong>Silakan lakukan pembayaran DP (50%):</strong><br />
          <span className="text-lg font-bold">Rp{dp.toLocaleString()}</span>
        </p>

        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Transfer ke:</strong></p>
          <p>Bank BCA - 1234567890</p>
          <p>a.n. Ahsanul Amal Fillah</p>
        </div>

        <p className="text-sm text-gray-500">
          Setelah melakukan pembayaran, silakan kirim bukti transfer ke WhatsApp kami.
        </p>
      </div>
    </div>
  );
}
