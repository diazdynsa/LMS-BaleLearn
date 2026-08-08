'use client';

import { useRouter } from 'next/navigation';
import AcademicLogo from '@/components/layout/AcademicLogo';

/*
  Mock login routing untuk keperluan demonstrasi offline.
  Halaman login UI statis dengan rancangan Academic Professional (Flat Design).
  Mengarahkan pengguna langsung ke halaman dashboard setelah menekan tombol Masuk.
*/
export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-md p-8">
        <div className="flex flex-col items-center mb-8">
          <AcademicLogo size={48} />
          <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-500 mt-3 select-none">
            BaleLearn
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            LMS FTI — Universitas Bale Bandung
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
              Alamat Email
            </label>
            <input
              type="email"
              defaultValue="diaz.dynsa@student.unbal.ac.id"
              className="input-field"
              placeholder="nama@student.unbal.ac.id"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Kata Sandi
              </label>
              <a href="#" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                Lupa Sandi?
              </a>
            </div>
            <input
              type="password"
              defaultValue="password123"
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#2A4B7C] hover:bg-[#1D3356] text-white text-sm font-semibold rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            Masuk
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 Fakultas Teknologi Informasi</p>
          <p className="mt-0.5">Universitas Bale Bandung</p>
        </div>
      </div>
    </div>
  );
}
