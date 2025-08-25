"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { ArrowLeft, User, Briefcase, Boxes, ShoppingCart, CheckCircle } from 'lucide-react';

type FeatureOption = {
  label: string;
  price: number;
};

const featureList: FeatureOption[] = [
  { label: "Login & Registrasi Pengguna", price: 350000 },
  { label: "Manajemen User & Hak Akses", price: 450000 },
  { label: "Dashboard Admin Interaktif", price: 600000 },
  { label: "Pencarian Data (Filter & Sorting)", price: 300000 },
  { label: "Manajemen Konten (CRUD)", price: 700000 },
  { label: "Integrasi Payment Gateway", price: 650000 },
  { label: "Laporan & Statistik Penjualan", price: 450000 },
  { label: "Fitur Live Chat / Bantuan", price: 400000 },
  { label: "Notifikasi (Email / In-App)", price: 350000 },
  { label: "Upload & Manajemen File", price: 200000 },
];

const appTypes = [
    "Website Company Profile", "Toko Online (E-Commerce)", "Sistem Informasi", 
    "Blog / Portal Berita", "Aplikasi Kasir (POS)", "Aplikasi Manajemen Proyek",
    "Aplikasi Inventaris / Gudang", "Aplikasi Booking Online", "CRM", "ERP",
    "Aplikasi E-Learning", "Aplikasi Donasi", "Aplikasi Tiketing", 
    "Aplikasi Layanan Publik", "Aplikasi HR", "Lainnya..."
];

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    appType: "",
    selectedFeatures: [] as string[],
  });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name' || name === 'email') {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleCheckboxChange = (label: string) => {
    setFormData(prev => {
      const { selectedFeatures } = prev;
      const newSelectedFeatures = selectedFeatures.includes(label)
        ? selectedFeatures.filter(f => f !== label)
        : [...selectedFeatures, label];
      return { ...prev, selectedFeatures: newSelectedFeatures };
    });
  };

  const total = formData.selectedFeatures.reduce((acc, feat) => {
    const feature = featureList.find(f => f.label === feat);
    return acc + (feature?.price || 0);
  }, 0);

  const validateStep1 = () => {
    const tempErrors = { name: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Nama lengkap wajib diisi.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Alamat email wajib diisi.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { //validasi email
      tempErrors.email = 'Format alamat email tidak valid.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
        setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && !validateStep1()) return;

    const finalData = { ...formData, total };
    sessionStorage.setItem("order", JSON.stringify(finalData));
    router.push("/order/summary");
  };
  
  const currencyFormatter = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  }

  return (
    <div className="bg-gray-900">
      <Header />
      <main className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 flex items-center justify-center space-x-4">
              <StepIndicator step={1} currentStep={currentStep} label="Info Anda" />
              <div className="flex-1 h-0.5 bg-indigo-900/50">
                 <div className="h-full bg-pink-500" style={{ width: currentStep > 1 ? '100%' : '0%', transition: 'width 0.5s ease' }}></div>
              </div>
              <StepIndicator step={2} currentStep={currentStep} label="Detail Proyek" />
            </div>

            <form id="main-form" onSubmit={handleSubmit} className="bg-indigo-900/20 border border-indigo-500/20 p-8 rounded-2xl shadow-lg space-y-8">
              {currentStep === 1 && (
                <div className="animate-fade-in-up">
                  <FormSection title="Data Diri Anda" icon={<User className="text-pink-500" />}>
                    <InputField label="Nama Lengkap" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
                    <InputField label="Alamat Email" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                    <InputField label="Sektor Bisnis (Opsional)" name="business" value={formData.business} onChange={handleInputChange} />
                  </FormSection>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-fade-in-up">
                  <FormSection title="Jenis Aplikasi" icon={<Briefcase className="text-pink-500" />}>
                    <SelectField label="Pilih Jenis Aplikasi" name="appType" value={formData.appType} onChange={handleInputChange} options={appTypes} required />
                  </FormSection>
                  
                  <FormSection title="Pilih Fitur" icon={<Boxes className="text-pink-500" />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {featureList.map((feature) => (
                        <FeatureCard 
                          key={feature.label} 
                          feature={feature} 
                          isSelected={formData.selectedFeatures.includes(feature.label)}
                          onSelect={handleCheckboxChange}
                          formatter={currencyFormatter}
                        />
                      ))}
                    </div>
                  </FormSection>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] p-3 sm:p-4 border-t border-indigo-800/50">
        <div className="container mx-auto max-w-3xl flex items-center justify-between gap-2">
            <div className="flex-shrink-0">
                {currentStep > 1 && (
                    <button 
                        type="button" 
                        onClick={prevStep} 
                        className="flex items-center gap-2 text-indigo-300 font-medium hover:text-white transition p-2 rounded-lg hover:bg-indigo-800/50"
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline text-base">Kembali</span>
                    </button>
                )}
            </div>

            <div className="text-right flex-grow">
                <p className="text-xs sm:text-sm text-indigo-300">Estimasi Biaya</p>
                <p className="text-lg sm:text-xl font-bold text-pink-500">{currencyFormatter(total)}</p>
            </div>

            <div className="flex-shrink-0">
                {currentStep === 1 && (
                    <button 
                        type="button" 
                        onClick={nextStep} 
                        className="bg-pink-600 text-white font-bold py-2 px-5 sm:px-6 rounded-lg hover:bg-pink-700 transition text-sm sm:text-base"
                    >
                        Lanjut
                    </button>
                )}
                {currentStep === 2 && (
                    <button 
                        type="submit" 
                        form="main-form" 
                        onClick={handleSubmit} 
                        className="bg-pink-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg hover:bg-pink-700 transition flex items-center gap-2 text-sm sm:text-base"
                    >
                        <ShoppingCart size={18} className="hidden sm:inline" />
                        <span>Konfirmasi</span>
                        <span className="hidden sm:inline">&nbsp;Pesanan</span>
                    </button>
                )}
            </div>
        </div>
      </footer>
    </div>
  );
}

const StepIndicator = ({ step, currentStep, label }: { step: number, currentStep: number, label: string }) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-pink-600 text-white scale-110' : 
          isCompleted ? 'bg-pink-500 text-white' : 'bg-indigo-800 text-indigo-300'
        }`}
      >
        {isCompleted ? <CheckCircle size={20} /> : step}
      </div>
      <p className={`text-xs font-semibold ${isActive ? 'text-pink-500' : 'text-indigo-300'}`}>{label}</p>
    </div>
  );
};

const FormSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-3 mb-6">
      {icon}
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-indigo-200 mb-1">{props.label}</label>
    <input 
      {...props} 
      id={props.name} 
      className={`w-full p-3 bg-gray-800/50 border rounded-lg focus:ring-2 transition text-white ${
        props.error 
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
          : 'border-indigo-600/50 focus:ring-pink-500 focus:border-pink-500'
      }`} 
    />
    {props.error && <p className="text-red-500 text-sm mt-1">{props.error}</p>}
  </div>
);

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-indigo-200 mb-1">{props.label}</label>
    <select {...props} id={props.name} className="w-full p-3 bg-gray-800/50 border border-indigo-600/50 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition text-white">
      <option value="">-- Pilih salah satu --</option>
      {props.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const FeatureCard = ({ feature, isSelected, onSelect, formatter }: { feature: FeatureOption, isSelected: boolean, onSelect: (label: string) => void, formatter: (amount: number) => string }) => (
  <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
      isSelected ? 'border-pink-500 bg-pink-900/20 shadow-md' : 'border-indigo-700/50 bg-indigo-900/20 hover:border-indigo-600/80'
    }`}
  >
    <input type="checkbox" className="hidden" checked={isSelected} onChange={() => onSelect(feature.label)} />
    <div className="flex justify-between items-center">
      <span className="font-semibold text-white">{feature.label}</span>
      <span className={`text-sm font-medium ${isSelected ? 'text-pink-400' : 'text-indigo-300'}`}>{formatter(feature.price)}</span>
    </div>
  </label>
);
