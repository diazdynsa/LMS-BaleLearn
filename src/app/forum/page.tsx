'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquareText, Search, Plus, X } from 'lucide-react';
import { dataThread, ThreadDiskusi } from '@/data/mockData';
import DiscussionThread from '@/components/forum/DiscussionThread';
import CommentSection from '@/components/forum/CommentSection';

/*
  Halaman Forum Diskusi: list thread diskusi, filter, pencarian, dan pembuatan thread baru.
  Menyimpan dan memuat thread serta status Like secara persisten menggunakan localStorage.
  Disesuaikan dengan penskalaan mobile responsif (padding, gap, font-size).
*/
export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMatkul, setFilterMatkul] = useState('Semua Mata Kuliah');
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [threadToDelete, setThreadToDelete] = useState<string | number | null>(null);
  const [formJudul, setFormJudul] = useState('');
  const [formKonten, setFormKonten] = useState('');
  const [formMatkul, setFormMatkul] = useState('');
  
  /* State list thread utama */
  const [threadList, setThreadList] = useState<ThreadDiskusi[]>([]);
  /* State ID thread yang disukai oleh pengguna saat ini */
  const [likedThreadIds, setLikedThreadIds] = useState<string[]>([]);

  /* Memuat data thread dan data liked dari localStorage saat mount */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedThreads = localStorage.getItem('forumThreads');
      if (storedThreads) {
        setThreadList(JSON.parse(storedThreads));
      } else {
        setThreadList(dataThread);
        localStorage.setItem('forumThreads', JSON.stringify(dataThread));
      }

      const storedLikes = localStorage.getItem('likedThreads');
      if (storedLikes) {
        setLikedThreadIds(JSON.parse(storedLikes));
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const matkulOptions = Array.from(new Set(threadList.map(t => t.mataKuliah)));

  const filteredThreads = threadList.filter(t => {
    const matchSearch = t.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t.konten.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMatkul = filterMatkul === 'Semua Mata Kuliah' || t.mataKuliah === filterMatkul;
    return matchSearch && matchMatkul;
  });

  /* Simpan postingan thread baru ke state dan localStorage */
  const handlePosting = () => {
    if (!formJudul || !formKonten || !formMatkul) return;
    
    const newThread: ThreadDiskusi = {
      id: `d${Date.now()}`,
      judul: formJudul,
      penulis: 'Anda',
      avatarUrl: '',
      mataKuliah: formMatkul,
      konten: formKonten,
      tanggal: new Date().toISOString(),
      jumlahBalasan: 0,
      disukai: 0,
      tag: ['diskusi']
    };

    const updatedThreads = [newThread, ...threadList];
    setThreadList(updatedThreads);
    if (typeof window !== 'undefined') {
      localStorage.setItem('forumThreads', JSON.stringify(updatedThreads));
    }

    setShowNewForm(false);
    setFormJudul('');
    setFormKonten('');
    setFormMatkul('');
  };

  /* Toggle status like thread secara reaktif (+1/-1) dan simpan ke localStorage */
  const handleLikeToggle = (threadId: string) => {
    let newLikedIds = [...likedThreadIds];
    const isAlreadyLiked = likedThreadIds.includes(threadId);

    if (isAlreadyLiked) {
      newLikedIds = newLikedIds.filter(id => id !== threadId);
    } else {
      newLikedIds.push(threadId);
    }

    setLikedThreadIds(newLikedIds);
    if (typeof window !== 'undefined') {
      localStorage.setItem('likedThreads', JSON.stringify(newLikedIds));
    }

    const updatedThreads = threadList.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          disukai: isAlreadyLiked ? t.disukai - 1 : t.disukai + 1
        };
      }
      return t;
    });

    setThreadList(updatedThreads);
    if (typeof window !== 'undefined') {
      localStorage.setItem('forumThreads', JSON.stringify(updatedThreads));
    }
  };

  /* Menambah jumlah balasan komentar pada thread secara lokal */
  const handleCommentAdded = (threadId: string) => {
    const updatedThreads = threadList.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          jumlahBalasan: t.jumlahBalasan + 1
        };
      }
      return t;
    });

    setThreadList(updatedThreads);
    if (typeof window !== 'undefined') {
      localStorage.setItem('forumThreads', JSON.stringify(updatedThreads));
    }
  };

  const handleDeleteThread = (e: React.MouseEvent<HTMLButtonElement>, threadId: string) => {
    e.stopPropagation();
    setThreadToDelete(threadId);
  };

  const confirmDeleteThread = () => {
    if (threadToDelete === null) return;

    const updatedThreads = threadList.filter(t => t.id !== threadToDelete);
    setThreadList(updatedThreads);
    if (typeof window !== 'undefined') {
      localStorage.setItem('forumThreads', JSON.stringify(updatedThreads));
    }
    if (expandedThreadId === threadToDelete) {
      setExpandedThreadId(null);
    }
    setThreadToDelete(null);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <MessageSquareText className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
          <h1 className="text-xl md:text-2xl font-bold dark:text-white">Forum Diskusi</h1>
        </div>
        <button 
          className="btn-accent flex items-center gap-1.5 md:gap-2 py-1.5 px-3 text-xs md:text-sm" 
          onClick={() => setShowNewForm(!showNewForm)}
        >
          {showNewForm ? <X size={14} /> : <Plus size={14} />}
          {showNewForm ? 'Batal' : 'Buat Thread Baru'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Cari diskusi..." 
            className="input-field pl-9 w-full py-1.5 text-xs md:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="input-field sm:w-64 py-1.5 text-xs md:text-sm"
          value={filterMatkul}
          onChange={(e) => setFilterMatkul(e.target.value)}
        >
          <option value="Semua Mata Kuliah">Semua Mata Kuliah</option>
          {matkulOptions.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {showNewForm && (
        <div className="card p-3 md:p-5 space-y-3 md:space-y-4 border border-primary-500">
          <h2 className="font-bold text-base md:text-lg dark:text-white">Buat Thread Baru</h2>
          <input 
            type="text" 
            placeholder="Judul Diskusi" 
            className="input-field w-full py-1.5 text-xs md:text-sm"
            value={formJudul}
            onChange={(e) => setFormJudul(e.target.value)}
          />
          <select 
            className="input-field w-full py-1.5 text-xs md:text-sm"
            value={formMatkul}
            onChange={(e) => setFormMatkul(e.target.value)}
          >
            <option value="">Pilih Mata Kuliah</option>
            {matkulOptions.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <textarea 
            placeholder="Isi diskusi Anda..." 
            className="input-field w-full h-24 md:h-32 text-xs md:text-sm resize-none"
            value={formKonten}
            onChange={(e) => setFormKonten(e.target.value)}
          ></textarea>
          <div className="flex justify-end gap-2 md:gap-3">
            <button className="px-3 py-1.5 text-xs md:text-sm text-slate-500 hover:text-slate-700" onClick={() => setShowNewForm(false)}>Batal</button>
            <button className="btn-primary py-1.5 px-4 text-xs md:text-sm" onClick={handlePosting}>Posting</button>
          </div>
        </div>
      )}

      <div className="space-y-2.5 md:space-y-4">
        {filteredThreads.map(thread => (
          <div key={thread.id}>
            <DiscussionThread 
              data={thread} 
              isExpanded={expandedThreadId === thread.id}
              liked={likedThreadIds.includes(thread.id)}
              onLike={() => handleLikeToggle(thread.id)}
              onDelete={(e) => handleDeleteThread(e, thread.id)}
              onClick={() => setExpandedThreadId(expandedThreadId === thread.id ? null : thread.id)}
            />
            {expandedThreadId === thread.id && (
              <div className="px-3 pb-3 md:px-4 md:pb-4">
                <CommentSection 
                  threadId={thread.id} 
                  onAddComment={() => handleCommentAdded(thread.id)}
                />
              </div>
            )}
          </div>
        ))}
        {filteredThreads.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">
            Tidak ada diskusi yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>

      {mounted && threadToDelete !== null && createPortal(
        <div className="fixed inset-0 z-[99999] w-screen h-screen bg-black/75 flex items-center justify-center p-4">
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 max-w-sm w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
              Hapus Diskusi?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Apakah Anda yakin ingin menghapus postingan ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setThreadToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteThread}
                className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
