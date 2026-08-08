'use client';

import { useRouter } from 'next/navigation';
import { ListTodo } from 'lucide-react';
import { dataTugas, hitungSisaWaktu } from '@/data/mockData';

/*
  Menampilkan tugas terdekat (belum dikumpulkan) dengan tombol "Kumpulkan"
  yang mengarahkan ke halaman /assignments via router.push.
*/
export function UpcomingTasks() {
  const router = useRouter();

  const tugasTerdekat = dataTugas
    .filter(t => t.status === 'belum')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

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
              {/* Tombol Kumpulkan mengarahkan ke halaman /assignments */}
              <button
                className="btn-primary text-xs px-3 py-1.5 shrink-0"
                onClick={() => router.push('/assignments')}
              >
                Kumpulkan
              </button>
            </div>
          );
        })}

        {tugasTerdekat.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-4">Tidak ada tugas mendekati deadline.</p>
        )}
      </div>
    </div>
  );
}
