"use client";

import { useState } from 'react';
import { Megaphone } from 'lucide-react';
import { dataPengumuman, formatWaktuRelatif } from '@/data/mockData';

/*
  Menampilkan pengumuman terbaru dengan fitur expand/collapse
*/
export function AnnouncementCard() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [showAllItems, setShowAllItems] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderPengumuman = (pengumuman: any) => {
    const isExpanded = expandedIds.includes(pengumuman.id);
    return (
      <div 
        key={pengumuman.id}
        className="p-3 border rounded-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={() => toggleExpand(pengumuman.id)}
      >
        <div className="flex items-start gap-3">
          <div className="pt-1.5">
            {!pengumuman.dibaca && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-800 dark:text-slate-200">{pengumuman.judul}</h3>
              {pengumuman.kategori === 'ujian' || pengumuman.kategori === 'penting' ? (
                <span className="badge badge-danger">{pengumuman.kategori}</span>
              ) : pengumuman.kategori === 'tugas' ? (
                <span className="badge badge-warning">{pengumuman.kategori}</span>
              ) : (
                <span className="badge badge-info">{pengumuman.kategori}</span>
              )}
            </div>
            <p className="text-xs text-slate-500">{formatWaktuRelatif(pengumuman.tanggal)}</p>
            
            {isExpanded && (
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 animate-fade-in">
                {pengumuman.konten}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="section-header">
        <Megaphone className="w-5 h-5" />
        <h2>Pengumuman Terbaru</h2>
      </div>

      <div className="mt-4 flex flex-col">
        {dataPengumuman.slice(0, 1).map(renderPengumuman)}

        <div 
          className={`grid transition-all duration-300 ease-in-out md:!grid-rows-[1fr] md:!opacity-100 ${showAllItems ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 space-y-3">
              {dataPengumuman.slice(1).map(renderPengumuman)}
            </div>
          </div>
        </div>
      </div>

      {dataPengumuman.length > 1 && (
        <button
          onClick={() => setShowAllItems(!showAllItems)}
          className="w-full text-center text-xs font-medium text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 py-2 mt-2 md:hidden"
        >
          {showAllItems ? 'Tutup' : `Lihat ${dataPengumuman.length - 1} pengumuman lainnya...`}
        </button>
      )}
    </div>
  );
}
