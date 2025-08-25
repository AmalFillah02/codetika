// src/app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, Loader2, AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Email atau password salah. Silakan coba lagi.");
    } else {
      router.push("/admin");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-[#1a1a2e] p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Access</h1>
            <p className="text-indigo-300">Selamat datang kembali, silakan masuk.</p>
        </div>
        
        <div className="bg-indigo-900/20 backdrop-blur-xl border border-indigo-500/20 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800/50 border border-indigo-600/50 rounded-lg py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition placeholder:text-indigo-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-800/50 border border-indigo-600/50 rounded-lg py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition placeholder:text-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {errorMsg && (
              <div className="flex items-center gap-2 bg-red-900/50 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg">
                <AlertTriangle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-pink-600 text-white font-bold p-3 rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}