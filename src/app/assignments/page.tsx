'use client';
import { useState } from 'react';
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { dataTugas, hitungSisaWaktu, type Tugas } from '@/data/mockData';
import FileDropZone from '@/components/assignments/FileDropZone';

/*
  Halaman Pengumpulan Tugas mahasiswa.
  Disesuaikan dengan penskalaan mobile responsif (padding, gap, font-size).
*/
export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tugasLocal, setTugasLocal] = useState<Tugas[]>([...dataTugas] as Tugas[]);
  const [toast, setToast] = useState<string | null>(null);

  const tabs = ['Semua', 'Belum', 'Dikumpulkan', 'Dinilai', 'Terlambat'];

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleKumpul = (id: string) => {
    setTugasLocal(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'dikumpulkan' } : t)
    );
    showToast('Tugas berhasil dikumpulkan!');
    setExpandedId(null);
  };

  const filteredTugas = tugasLocal.filter(t => 
    activeTab.toLowerCase() === 'semua' || t.status.toLowerCase() === activeTab.toLowerCase()
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'belum': return <span className="badge badge-warning text-[10px] md:text-xs">Belum</span>;
      case 'dikumpulkan': return <span className="badge badge-success text-[10px] md:text-xs">Dikumpulkan</span>;
      case 'terlambat': return <span className="badge badge-danger text-[10px] md:text-xs">Terlambat</span>;
      case 'dinilai': return <span className="badge badge-info text-[10px] md:text-xs">Dinilai</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-6 lg:p-8 relative">
      <div className="mb-4 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ClipboardList className="w-6 h-6 md:w-8 h-8 text-primary-500" />
          Pengumpulan Tugas
        </h1>
      </div>

      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded text-xs md:text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'bg-primary-500 text-white' 
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-2 md:space-y-4">
        {filteredTugas.map((tugas) => {
          const sisaWaktu = hitungSisaWaktu(tugas.deadline);
          const isExpanded = expandedId === tugas.id;
          
          return (
            <div key={tugas.id} className="card p-3 md:p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 md:mb-2 flex-wrap">
                    <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white leading-snug">
                      {tugas.judul}
                    </h3>
                    {getStatusBadge(tugas.status)}
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1.5 md:mb-2">
                    {tugas.mataKuliah}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-3 md:mb-4 line-clamp-2">
                    {tugas.deskripsi}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs md:text-sm font-medium">
                    <div className={`flex items-center gap-1.5 ${sisaWaktu.sudahLewat && tugas.status === 'belum' ? 'text-red-500' : 'text-slate-600 dark:text-slate-400'}`}>
                      {sisaWaktu.sudahLewat ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{sisaWaktu.teks}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start min-w-0 md:min-w-[120px] shrink-0 border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
                  {tugas.status === 'dinilai' && tugas.nilai !== undefined ? (
                    <div className="text-2xl md:text-3xl font-black text-emerald-500 md:mb-2">
                      {tugas.nilai}
                    </div>
                  ) : <div className="hidden md:block" />}
                  
                  {(tugas.status === 'belum' || tugas.status === 'terlambat') && (
                    <button 
                      onClick={() => setExpandedId(isExpanded ? null : tugas.id)}
                      className="btn-primary w-full md:w-auto py-1.5 px-3 text-xs md:text-sm"
                    >
                      {isExpanded ? 'Batal' : 'Kumpulkan'}
                    </button>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 md:mt-6 md:pt-6 border-t border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h4 className="font-semibold text-xs md:text-sm text-slate-800 dark:text-slate-200 mb-3 md:mb-4">
                    Unggah Berkas Tugas
                  </h4>
                  <FileDropZone />
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => handleKumpul(tugas.id)}
                      className="btn-accent py-1.5 px-4 text-xs md:text-sm"
                    >
                      Kirim Pengumpulan
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {filteredTugas.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            Tidak ada tugas yang sesuai dengan filter.
          </div>
        )}
      </div>

      {toast && (
        <div className="toast fixed top-6 right-6 bg-slate-800 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 z-50 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}
