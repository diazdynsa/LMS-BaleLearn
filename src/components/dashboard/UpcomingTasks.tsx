'use client';

import { useRouter } from 'next/navigation';
import { ListTodo, CheckCircle } from 'lucide-react';
import { dataTugas, hitungSisaWaktu, type Tugas } from '@/data/mockData';
import { useState, useEffect } from 'react';

/*
  Menampilkan tugas terdekat (belum dikumpulkan) dengan tombol "Kumpulkan"
  yang mengarahkan ke halaman /assignments via router.push.
*/
export function UpcomingTasks() {
  const router = useRouter();
  const [tugasPending, setTugasPending] = useState<Tugas[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchStatuses = () => {
      const updatedTasks = dataTugas.map(tugas => {
        const key = `balelearn_submission_${tugas.id}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed?.status === 'submitted') {
              return { ...tugas, status: 'dikumpulkan' as const };
            }
          } catch (e) {}
        }
        return tugas;
      });
      setTugasPending(updatedTasks.filter(t => t.status === 'belum' || t.status === 'terlambat'));
    };

    fetchStatuses();
    window.addEventListener('submission-update', fetchStatuses);
    return () => window.removeEventListener('submission-update', fetchStatuses);
  }, []);

  const tugasTerdekat = [...tugasPending]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  if (!mounted) {
    return <div className="card min-h-[200px] animate-pulse"></div>;
  }

  return (
    <div className="card">
      <div className="section-header">
        <ListTodo className="w-5 h-5" />
        <h2>Tugas Terdekat</h2>
      </div>

      <div className="mt-4 space-y-3">
        {tugasTerdekat.map(tugas => {
          const sisaWaktu = hitungSisaWaktu(tugas.deadline);
          const isUrgent = sisaWaktu.teks.includes('hari') && parseInt(sisaWaktu.teks) < 3 && !sisaWaktu.sudahLewat;

          return (
            <div key={tugas.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-md">
              <div className="space-y-1 flex-1 mr-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{tugas.judul}</span>
                  {tugas.prioritas === 'tinggi' && <span className="badge badge-danger">Tinggi</span>}
                  {tugas.prioritas === 'sedang' && <span className="badge badge-warning">Sedang</span>}
                  {tugas.prioritas === 'rendah' && <span className="badge badge-neutral">Rendah</span>}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <p>{tugas.mataKuliah}</p>
                  <p className={isUrgent || sisaWaktu.sudahLewat ? 'text-red-500 font-medium' : ''}>
                    {sisaWaktu.teks}
                  </p>
                </div>
              </div>
              {sisaWaktu.sudahLewat ? (
                 <span className="text-xs text-slate-500 italic shrink-0">Waktu Habis</span>
              ) : (
                <button
                  className="btn-primary text-xs px-3 py-1.5 shrink-0"
                  onClick={() => router.push('/assignments')}
                >
                  Kumpulkan
                </button>
              )}
            </div>
          );
        })}

        {tugasTerdekat.length === 0 && (
          <div className="text-center py-6 flex flex-col items-center justify-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-400 mb-1" />
            <p className="text-slate-500 text-sm font-medium">Luar biasa!</p>
            <p className="text-slate-400 text-xs">Semua tugas Anda sudah beres.</p>
          </div>
        )}
      </div>
    </div>
  );
}
