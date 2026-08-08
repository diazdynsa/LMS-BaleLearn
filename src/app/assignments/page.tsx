"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { dataTugas, hitungSisaWaktu, type Tugas } from '@/data/mockData';
import FileDropZone from '@/components/assignments/FileDropZone';

/*
  Halaman Pengumpulan Tugas mahasiswa.
  Disesuaikan dengan penskalaan mobile responsif (padding, gap, font-size).
*/

type StoredFile = { name: string; size: number };
type SubmissionMeta = { files: StoredFile[]; timestamp: number; status: 'submitted' };
export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tugasLocal, setTugasLocal] = useState<Tugas[]>([...dataTugas] as Tugas[]);
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedFilesByTask, setSelectedFilesByTask] = useState<Record<string, File[]>>({});
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentSubmittingTask, setCurrentSubmittingTask] = useState<string | null>(null);
  const [unsubmitPendingId, setUnsubmitPendingId] = useState<string | null>(null);

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

  useEffect(() => {
    setMounted(true);
    // Load persisted submissions from localStorage
    try {
      const restoredFiles: Record<string, StoredFile[]> = {};
      setTugasLocal(prev => prev.map(t => {
        const key = `balelearn_submission_${t.id}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as SubmissionMeta;
            if (parsed?.status === 'submitted') {
              restoredFiles[t.id] = parsed.files || [];
              return { ...t, status: 'dikumpulkan' };
            }
          } catch (e) {
            // ignore parse errors
          }
        }
        return t;
      }));
      if (Object.keys(restoredFiles).length > 0) {
        setSelectedFilesByTask(prev => {
          const copy: Record<string, any> = { ...prev };
          for (const k of Object.keys(restoredFiles)) {
            copy[k] = restoredFiles[k].map(f => ({ name: f.name, size: f.size } as any));
          }
          return copy;
        });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const confirmSubmit = () => {
    if (!currentSubmittingTask) return;
    const id = currentSubmittingTask;
    // Persist metadata to localStorage
    const files = selectedFilesByTask[id] || [];
    const meta: SubmissionMeta = {
      files: files.map(f => ({ name: (f as any).name, size: (f as any).size })),
      timestamp: Date.now(),
      status: 'submitted',
    };
    try {
      localStorage.setItem(`balelearn_submission_${id}`, JSON.stringify(meta));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage', e);
    }

    setTugasLocal(prev => prev.map(t => t.id === id ? { ...t, status: 'dikumpulkan' } : t));
    showToast('Tugas berhasil dikumpulkan!');
    setExpandedId(null);
    setIsConfirming(false);
    // keep selectedFilesByTask so filenames remain visible
    setCurrentSubmittingTask(null);
  };

  // Unsubmit flow: request -> confirm -> remove persisted data
  const requestUnsubmit = (id: string) => {
    setUnsubmitPendingId(id);
  };

  const confirmUnsubmit = () => {
    const id = unsubmitPendingId;
    if (!id) return;
    try {
      localStorage.removeItem(`balelearn_submission_${id}`);
    } catch (e) {
      console.error('Gagal menghapus submission', e);
    }
    setTugasLocal(prev => prev.map(t => t.id === id ? { ...t, status: 'belum' } : t));
    setSelectedFilesByTask(prev => ({ ...prev, [id]: [] }));
    showToast('Pengumpulan dibatalkan');
    setUnsubmitPendingId(null);
  };

  const cancelUnsubmit = () => setUnsubmitPendingId(null);

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
                  <FileDropZone onFilesChange={(files) => setSelectedFilesByTask(prev => ({ ...prev, [tugas.id]: files }))} />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => { setCurrentSubmittingTask(tugas.id); setIsConfirming(true); }}
                      className="btn-accent py-1.5 px-4 text-xs md:text-sm"
                    >
                      Kirim Pengumpulan
                    </button>
                  </div>
                </div>
              )}
              {/* If already submitted, show Edit / Cancel (if before deadline) */}
              {tugas.status === 'dikumpulkan' && (
                <div className="mt-3 flex gap-2 justify-end">
                  {new Date(tugas.deadline).getTime() > Date.now() ? (
                    <>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : tugas.id)}
                        className="btn-secondary px-3 py-1.5 text-xs md:text-sm"
                      >
                        Edit Tugas
                      </button>
                      <button
                        onClick={() => requestUnsubmit(tugas.id)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs md:text-sm font-medium rounded-md transition-colors"
                      >
                        Batalkan Pengumpulan
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-500">Deadline telah lewat. Tidak dapat diedit.</span>
                  )}
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
          {mounted && isConfirming && currentSubmittingTask && createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => { setIsConfirming(false); setCurrentSubmittingTask(null); }} />
              <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-5">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Konfirmasi Pengumpulan</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Periksa kembali file yang akan dikumpulkan untuk tugas ini.</p>

                <div className="mt-4 max-h-40 overflow-auto space-y-2">
                  {(selectedFilesByTask[currentSubmittingTask] || []).length === 0 ? (
                    <div className="text-sm text-slate-500">Belum ada file terpilih.</div>
                  ) : (
                    (selectedFilesByTask[currentSubmittingTask] || []).map((f, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-2 rounded">
                        <div className="truncate text-sm font-medium">{f.name}</div>
                        <div className="text-xs text-slate-500">{(f.size/1024/1024).toFixed(2)} MB</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={() => { setIsConfirming(false); setCurrentSubmittingTask(null); }} className="btn-secondary px-3 py-1.5">Batal</button>
                  <button onClick={confirmSubmit} className="btn-accent px-3 py-1.5">Ya, Kirim</button>
                </div>
              </div>
            </div>, document.body
          )}
          {mounted && unsubmitPendingId && createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={cancelUnsubmit} />
              <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-5">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Batalkan Pengumpulan?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Anda akan membatalkan pengumpulan dan menghapus berkas yang tersimpan. Tindakan ini dapat dikembalikan dengan mengunggah ulang sebelum deadline.</p>

                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={cancelUnsubmit} className="btn-secondary px-3 py-1.5">Batal</button>
                  <button onClick={confirmUnsubmit} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md">Ya, Batalkan</button>
                </div>
              </div>
            </div>, document.body
          )}
    </div>
  );
}
