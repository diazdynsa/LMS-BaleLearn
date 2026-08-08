'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ClipboardList, TrendingUp, Layers } from 'lucide-react';
import { profilUser, dataKursus, dataTugas, dataNilai, hitungIPK } from '@/data/mockData';
import { ScheduleCard } from '@/components/dashboard/ScheduleCard';
import { AnnouncementCard } from '@/components/dashboard/AnnouncementCard';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';

/*
  Halaman dashboard utama mahasiswa.
  Mengimplementasikan skeleton loader (mock loading state) yang hanya berjalan
  satu kali per sesi browser menggunakan sessionStorage.
  Disesuaikan dengan penskalaan layout mobile responsif (grid 2 kolom, padding, font-size).
*/
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({ nama: profilUser.nama });

  /* Memuat profil user dan mengatur skeleton loading satu kali per sesi */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      /* Muat data profil */
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        try {
          setUserProfile(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }

      /* Cek sesi pemuatan dashboard */
      const dashboardLoaded = sessionStorage.getItem('dashboardLoaded');
      if (dashboardLoaded === 'true') {
        setIsLoading(false);
      } else {
        const timer = setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('dashboardLoaded', 'true');
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const totalKursus = dataKursus.length;
  const tugasAktif = dataTugas.filter(t => t.status === 'belum').length;
  const ipk = hitungIPK(dataNilai);
  const modulSelesai = dataKursus.reduce((acc, k) => acc + k.modulSelesai, 0);
  const totalModul = dataKursus.reduce((acc, k) => acc + k.totalModul, 0);

  /* Render Skeleton Loader saat isLoading bernilai true */
  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2 animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-48" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-72" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="card flex items-center p-3 md:p-5 animate-pulse">
              <div className="p-2.5 md:p-3 bg-slate-200 dark:bg-slate-800 rounded-md w-10 h-10 md:w-12 md:h-12 mr-2 md:mr-4 shrink-0" />
              <div className="space-y-1.5 md:space-y-2 flex-1 min-w-0">
                <div className="h-2.5 md:h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="h-4 md:h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="card h-[380px] p-5 space-y-4 animate-pulse">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3 mb-4" />
              <div className="space-y-3">
                <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Render Konten Dashboard Asli setelah loading selesai */
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-0.5">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          Halo, {userProfile.nama}!
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          {tugasAktif} tugas aktif · IPK {ipk} · {modulSelesai}/{totalModul} modul selesai
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Link ke /courses */}
        <Link href="/courses" className="card border-l-2 border-l-primary-500 flex items-center p-3 md:p-5 hover:border-primary-400 transition-colors group">
          <div className="p-2 md:p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md mr-2.5 md:mr-4 shrink-0">
            <BookOpen className="w-5 h-5 md:w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">Total Kursus</p>
            <h3 className="text-base md:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{totalKursus}</h3>
          </div>
        </Link>

        {/* Link ke /assignments */}
        <Link href="/assignments" className="card border-l-2 border-l-accent-500 flex items-center p-3 md:p-5 hover:border-accent-400 transition-colors group">
          <div className="p-2 md:p-3 bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-md mr-2.5 md:mr-4 shrink-0">
            <ClipboardList className="w-5 h-5 md:w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">Tugas Aktif</p>
            <h3 className="text-base md:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{tugasAktif}</h3>
          </div>
        </Link>

        <div className="card border-l-2 border-l-emerald-500 flex items-center p-3 md:p-5">
          <div className="p-2 md:p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md mr-2.5 md:mr-4 shrink-0">
            <TrendingUp className="w-5 h-5 md:w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">IPK</p>
            <h3 className="text-base md:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-200">{ipk}</h3>
          </div>
        </div>

        <div className="card border-l-2 border-l-primary-300 flex items-center p-3 md:p-5">
          <div className="p-2 md:p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 rounded-md mr-2.5 md:mr-4 shrink-0">
            <Layers className="w-5 h-5 md:w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">Modul Selesai</p>
            <h3 className="text-base md:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-200">{modulSelesai}/{totalModul}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScheduleCard />
        <AnnouncementCard />
        <UpcomingTasks />
      </div>
    </div>
  );
}
