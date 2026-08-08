'use client';
import { useEffect, useState } from 'react';

export default function ProgressTracker({ namaKursus, totalModul, modulSelesai }: { namaKursus: string; totalModul: number; modulSelesai: number }) {
  const [width, setWidth] = useState(0);
  const persentase = totalModul > 0 ? Math.round((modulSelesai / totalModul) * 100) : 0;
  
  let colorClass = 'bg-red-500';
  if (persentase >= 70) colorClass = 'bg-emerald-500';
  else if (persentase >= 30) colorClass = 'bg-amber-500';

  useEffect(() => {
    const timer = setTimeout(() => setWidth(persentase), 50);
    return () => clearTimeout(timer);
  }, [persentase]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          {modulSelesai} dari {totalModul} modul selesai
        </span>
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {persentase}%
        </span>
      </div>
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ease-out ${colorClass}`} 
          style={{ width: `${width}%`, transitionDuration: '0.6s' }}
        />
      </div>
    </div>
  );
}
