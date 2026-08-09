import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { dataJadwal } from '@/data/mockData';

export function ScheduleCard() {
  const [showAllItems, setShowAllItems] = useState(false);

  const renderJadwal = (jadwal: any) => (
    <div 
      key={jadwal.id} 
      className={`flex flex-col gap-1 p-3 border rounded-md ${jadwal.status === 'berlangsung' ? 'border-l-2 border-l-accent-500 bg-accent-50/50 dark:bg-accent-900/20' : 'bg-slate-50 dark:bg-slate-800/50'}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-800 dark:text-slate-200">{jadwal.mataKuliah}</span>
        {jadwal.status === 'berlangsung' && <span className="badge badge-success">Berlangsung</span>}
        {jadwal.status === 'akan-datang' && <span className="badge badge-info">Akan Datang</span>}
        {jadwal.status === 'selesai' && <span className="badge badge-neutral">Selesai</span>}
      </div>
      <div className="text-sm text-slate-500">
        <p>{jadwal.waktuMulai} - {jadwal.waktuSelesai}</p>
        <p>{jadwal.dosen} • {jadwal.ruangan}</p>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="section-header">
        <Calendar className="w-5 h-5" />
        <h2>Jadwal Hari Ini</h2>
      </div>
      
      <div className="mt-4 flex flex-col">
        {dataJadwal.slice(0, 1).map(renderJadwal)}

        <div 
          className={`grid transition-all duration-300 ease-in-out md:!grid-rows-[1fr] md:!opacity-100 ${showAllItems ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="pt-4 space-y-4">
              {dataJadwal.slice(1).map(renderJadwal)}
            </div>
          </div>
        </div>
      </div>

      {dataJadwal.length > 1 && (
        <button
          onClick={() => setShowAllItems(!showAllItems)}
          className="w-full text-center text-xs font-medium text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 py-2 mt-2 md:hidden"
        >
          {showAllItems ? 'Tutup' : `Lihat ${dataJadwal.length - 1} jadwal lainnya...`}
        </button>
      )}
    </div>
  );
}
