'use client';

import { useState, useEffect } from 'react';
import { Heart, Reply, Send } from 'lucide-react';
import { dataKomentar, formatWaktuRelatif, Komentar } from '@/data/mockData';

interface Props {
  threadId: string;
  onAddComment?: () => void;
}

/*
  Komponen section komentar forum.
  Mendukung inline reply (balasan komentar) dan persistensi data via localStorage.
*/
export default function CommentSection({ threadId, onAddComment }: Props) {
  const [komenList, setKomenList] = useState<Komentar[]>([]);
  const [inputText, setInputText] = useState('');
  
  /* State untuk menangani inline reply */
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState('');

  /* Memuat komentar dari localStorage saat mount */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`forumComments_${threadId}`);
      if (stored) {
        setKomenList(JSON.parse(stored));
      } else {
        const filtered = dataKomentar.filter(k => k.threadId === threadId);
        setKomenList(filtered);
        localStorage.setItem(`forumComments_${threadId}`, JSON.stringify(filtered));
      }
    }
  }, [threadId]);

  /* Mengirim komentar utama */
  const handleKirim = () => {
    if (!inputText.trim()) return;
    const newKomen: Komentar = {
      id: `c${Date.now()}`,
      threadId,
      penulis: 'Anda',
      avatarUrl: '',
      konten: inputText,
      tanggal: new Date().toISOString(),
      disukai: 0
    };
    const updated = [...komenList, newKomen];
    setKomenList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`forumComments_${threadId}`, JSON.stringify(updated));
    }
    setInputText('');
    if (onAddComment) {
      onAddComment();
    }
  };

  /* Mengirim balasan ke komentar tertentu */
  const handleKirimBalasan = (komenId: string) => {
    if (!replyInputText.trim()) return;
    const newReply: Komentar = {
      id: `r${Date.now()}`,
      threadId,
      penulis: 'Anda',
      avatarUrl: '',
      konten: replyInputText,
      tanggal: new Date().toISOString(),
      disukai: 0
    };
    const updated = komenList.map(c => {
      if (c.id === komenId) {
        return {
          ...c,
          balasan: [...(c.balasan || []), newReply]
        };
      }
      return c;
    });
    setKomenList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`forumComments_${threadId}`, JSON.stringify(updated));
    }
    setReplyInputText('');
    setActiveReplyId(null);
    if (onAddComment) {
      onAddComment();
    }
  };

  /* Toggle like reaktif pada komentar */
  const handleLikeKomen = (komenId: string) => {
    const updated = komenList.map(c => {
      if (c.id === komenId) {
        const hasLiked = (c as any).hasLiked;
        return {
          ...c,
          disukai: hasLiked ? c.disukai - 1 : c.disukai + 1,
          hasLiked: !hasLiked
        };
      }
      return c;
    });
    setKomenList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`forumComments_${threadId}`, JSON.stringify(updated));
    }
  };

  return (
    <div className="mt-4 w-full min-w-0 border-t pt-4">
      <div className="flex items-center gap-2 my-3 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800 w-full min-w-0">
        <input
          type="text"
          placeholder="Tulis komentar..."
          className="input-field flex-1 text-xs sm:text-sm bg-white dark:bg-slate-800"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleKirim();
            }
          }}
        />
        <button
          onClick={handleKirim}
          className="btn-primary flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm rounded-lg shrink-0"
        >
          <Send size={16} />
          Kirim
        </button>
      </div>
      <div className="space-y-4">
        {komenList.map((komen) => (
          <div key={komen.id}>
            <div className="flex gap-3 min-w-0">
              <div className="bg-primary-500 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                {komen.penulis.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-sm dark:text-white">{komen.penulis}</span>
                  <span className="text-xs text-slate-500">{formatWaktuRelatif(komen.tanggal)}</span>
                </div>
                <p className="text-sm mt-1 text-slate-700 dark:text-slate-300 break-words">{komen.konten}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                  <button 
                    onClick={() => handleLikeKomen(komen.id)}
                    className={`flex items-center gap-1 hover:text-primary-500 transition-colors ${(komen as any).hasLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart size={14} className={(komen as any).hasLiked ? 'fill-red-500' : ''} /> {komen.disukai}
                  </button>
                  <button 
                    onClick={() => {
                      setActiveReplyId(activeReplyId === komen.id ? null : komen.id);
                      setReplyInputText('');
                    }}
                    className="flex items-center gap-1 hover:text-primary-500 transition-colors"
                  >
                    <Reply size={14} /> Balas
                  </button>
                </div>
              </div>
            </div>
            
            {/* Form Input Reply Inline */}
            {activeReplyId === komen.id && (
              <div className="mt-3 ml-11 flex flex-col gap-2 min-w-0 sm:flex-row">
                <input
                  type="text"
                  placeholder="Tulis balasan..."
                  className="input-field py-1 flex-1 min-w-0 text-xs"
                  value={replyInputText}
                  onChange={(e) => setReplyInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleKirimBalasan(komen.id);
                  }}
                  autoFocus
                />
                <button
                  onClick={() => handleKirimBalasan(komen.id)}
                  className="btn-primary py-1 px-3 text-xs shrink-0"
                >
                  Kirim
                </button>
              </div>
            )}

            {/* List Balasan Komentar */}
            {komen.balasan && (
              <div className="mt-3 pl-3 ml-2 md:pl-4 md:ml-4 border-l border-slate-200 dark:border-slate-800 w-full min-w-0 space-y-3">
                {komen.balasan.map((balas) => (
                  <div key={balas.id} className="flex gap-3 min-w-0">
                    <div className="bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-md w-7 h-7 flex items-center justify-center font-bold flex-shrink-0 text-xs">
                      {balas.penulis.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm dark:text-white">{balas.penulis}</span>
                        <span className="text-xs text-slate-500">{formatWaktuRelatif(balas.tanggal)}</span>
                      </div>
                      <p className="text-sm mt-1 text-slate-700 dark:text-slate-300 break-words">{balas.konten}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
