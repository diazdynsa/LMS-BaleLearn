'use client';
import { useState } from 'react';
import { BookOpen, User, X, CheckCircle, Circle } from 'lucide-react';
import { dataKursus } from '@/data/mockData';
import ProgressTracker from '@/components/progress/ProgressTracker';

type Kursus = {
  id: string;
  nama: string;
  dosen: string;
  deskripsi: string;
  totalModul: number;
  modulSelesai: number;
};

/* Database materi spesifik per Mata Kuliah IT */
const MATERI_KURSUS: Record<string, string[]> = {
  "Pemrograman Web Lanjut": [
    "Routing & Navigation Next.js",
    "State Management dengan Redux",
    "Server-Side Rendering (SSR)",
    "Integrasi API & Fetching",
    "Deployment ke Vercel"
  ],
  "Basis Data Terdistribusi": [
    "Arsitektur Client-Server",
    "Replikasi & Fragmentasi Data",
    "Konsep Sharding",
    "NoSQL & MongoDB",
    "CAP Theorem"
  ],
  "Kecerdasan Buatan": [
    "Pengantar Machine Learning",
    "Jaringan Saraf Tiruan",
    "Natural Language Processing (NLP)",
    "Computer Vision",
    "Algoritma Genetika"
  ],
  "Jaringan Komputer": [
    "Topologi & Model OSI",
    "Subnetting & IP Address",
    "Routing Protocol (OSPF, BGP)",
    "Keamanan Jaringan Dasar",
    "Praktik Cisco Packet Tracer"
  ],
  "Rekayasa Perangkat Lunak": [
    "Metodologi Software & Agile",
    "Analisis & Perancangan Sistem",
    "Object-Oriented Design & UML",
    "Pengujian Software (Testing)",
    "DevOps & CI/CD Pipeline"
  ]
};

/*
  Halaman daftar kursus mahasiswa.
  Merender course card bergaya Academic Professional dengan teks judul putih (text-white) kontras tinggi.
  Disesuaikan dengan penskalaan mobile responsif (padding, gap, font-size).
*/
export default function CoursesPage() {
  const [selectedKursus, setSelectedKursus] = useState<Kursus | null>(null);

  /* Menghasilkan daftar modul yang dipetakan sinkron dengan progress totalModul dan modulSelesai */
  const getModulList = (kursus: Kursus) => {
    const list = MATERI_KURSUS[kursus.nama] || [];
    
    return Array.from({ length: kursus.totalModul }, (_, i) => {
      const materiName = list[i] || "Materi Lanjutan";
      return {
        id: i + 1,
        nama: `Modul ${i + 1}: ${materiName}`,
        selesai: i < kursus.modulSelesai
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-6 lg:p-8">
      <div className="mb-4 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 md:w-8 h-8 text-primary-500" />
          Kursus Saya
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1 md:mt-2">
          Daftar mata kuliah semester ini
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
        {dataKursus.map((kursus: Kursus) => (
          <div key={kursus.id} className="card !p-0 overflow-hidden">
            <div className="bg-primary-500 text-white p-3 md:p-4 rounded-t-md">
              <h2 className="font-bold text-base md:text-lg text-white">{kursus.nama}</h2>
            </div>
            <div className="p-3 md:p-5 flex flex-col h-[calc(100%-52px)] md:h-[calc(100%-60px)]">
              <div className="flex items-center gap-2 mb-2 md:mb-3 text-slate-700 dark:text-slate-300">
                <User className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">{kursus.dosen}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-6 flex-grow">
                {kursus.deskripsi}
              </p>
              
              <div className="mb-4 md:mb-6">
                <ProgressTracker 
                  namaKursus={kursus.nama} 
                  totalModul={kursus.totalModul} 
                  modulSelesai={kursus.modulSelesai} 
                />
              </div>

              <button 
                onClick={() => setSelectedKursus(kursus)}
                className="btn-primary w-full mt-auto py-2 text-xs md:text-sm"
              >
                Lihat Materi
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedKursus && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 md:p-4"
          onClick={() => setSelectedKursus(null)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-md p-4 md:p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Materi: {selectedKursus.nama}
              </h3>
              <button 
                onClick={() => setSelectedKursus(null)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 md:space-y-3">
              {getModulList(selectedKursus).map((modul) => (
                <div 
                  key={modul.id} 
                  className="flex items-center justify-between p-2.5 md:p-3 border rounded-md dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {modul.nama}
                  </span>
                  {modul.selesai ? (
                    <CheckCircle className="w-4 h-4 md:w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 md:w-5 h-5 text-slate-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
