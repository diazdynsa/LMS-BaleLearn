'use client';

import { MessageSquare, Heart, Trash2 } from 'lucide-react';
import { ThreadDiskusi, formatWaktuRelatif } from '@/data/mockData';

interface Props {
  data: ThreadDiskusi;
  onClick?: () => void;
  isExpanded?: boolean;
  liked?: boolean;
  onLike?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

/*
  Komponen card thread diskusi forum.
  Menampilkan judul, penulis, konten (truncate), tag, dan statistik.
  Aksi klik Like dan Hapus didelegasikan ke komponen induk untuk persistensi dan ekspansi.
*/
export default function DiscussionThread({ data, onClick, isExpanded, liked = false, onLike, onDelete }: Props) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); /* Cegah expand thread saat klik like */
    if (onLike) {
      onLike(e);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(e, data.id);
    }
  };

  return (
    <div
      className={`card cursor-pointer transition-all hover:border-primary-400 dark:hover:border-primary-500 ${isExpanded ? 'border-l-2 border-l-primary-500' : ''} p-3.5 md:p-5`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2.5 md:gap-3.5">
        <div className="bg-primary-500 text-white rounded-lg w-8 h-8 text-xs md:w-10 md:h-10 md:text-sm flex items-center justify-center font-bold shrink-0">
          {data.penulis.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug break-words flex-1 min-w-0">{data.judul}</h3>
            <span className="text-xs text-slate-400 whitespace-nowrap">{formatWaktuRelatif(data.tanggal)}</span>
          </div>

          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{data.penulis} · {data.mataKuliah}</p>

          <p className={`mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 ${isExpanded ? 'break-words whitespace-pre-line leading-relaxed' : 'line-clamp-2 break-words leading-relaxed'}`}>
            {data.konten}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 w-full min-w-0 mt-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {data.tag.map((t, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                  #{t}
                </span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-3 shrink-0">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'hover:text-red-400'}`}
              >
                <Heart size={14} className={liked ? 'fill-red-500' : ''} />
                <span>{data.disukai}</span>
              </button>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} />
                {data.jumlahBalasan}
              </span>
              {data.penulis === 'Anda' && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors"
                  aria-label="Hapus thread"
                >
                  <Trash2 size={14} />
                  Hapus
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
