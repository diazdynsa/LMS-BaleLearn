'use client';

import { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Save, Shield } from 'lucide-react';
import { profilUser } from '@/data/mockData';

/*
  Halaman Profil & Pengaturan: form data akun mahasiswa dan preferensi notifikasi.
  Desain flat Academic Professional dengan localStorage dan pemisahan state (display vs form).
  Disesuaikan dengan penskalaan mobile responsif (padding, gap, font-size).
*/
export default function ProfilePage() {
  /* State untuk data yang ditampilkan di UI header/sidebar dengan inisialisasi aman */
  const [displayProfile, setDisplayProfile] = useState({
    nama: "Diaz Dynasti Saputra",
    nim: "301240026",
    email: "diaz.dynsa@student.unbal.ac.id",
    prodi: "Teknik Informatika",
    semester: "Semester 5",
  });

  /* State untuk form input saat mengetik dengan inisialisasi aman */
  const [formProfile, setFormProfile] = useState({
    nama: "Diaz Dynasti Saputra",
    nim: "301240026",
    email: "diaz.dynsa@student.unbal.ac.id",
    prodi: "Teknik Informatika",
    semester: "Semester 5",
  });

  /* State untuk preferensi notifikasi */
  const [notifPrefs, setNotifPrefs] = useState({
    tugasHarian: true,
    forumDiskusi: false,
    laporanNilai: true,
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  /* Memuat data profil & notifikasi dari localStorage saat mount */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          setDisplayProfile(prev => ({
            ...prev,
            nama: parsed.nama || prev.nama,
            email: parsed.email || prev.email,
            prodi: parsed.prodi || prev.prodi,
            nim: parsed.nim || prev.nim,
            semester: parsed.semester || prev.semester,
          }));
          setFormProfile(prev => ({
            ...prev,
            nama: parsed.nama || prev.nama,
            email: parsed.email || prev.email,
            prodi: parsed.prodi || prev.prodi,
            nim: parsed.nim || prev.nim,
            semester: parsed.semester || prev.semester,
          }));
        } catch (e) {
          console.error(e);
        }
      }

      const storedPrefs = localStorage.getItem('notificationPrefs');
      if (storedPrefs) {
        try {
          setNotifPrefs(JSON.parse(storedPrefs));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* Menyimpan data profil & preferensi ke localStorage */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    /* Update displayProfile hanya ketika tombol Simpan diklik */
    const updatedProfile = {
      nama: formProfile.nama,
      nim: formProfile.nim,
      email: formProfile.email,
      prodi: formProfile.prodi,
      semester: formProfile.semester,
    };
    
    setDisplayProfile(updatedProfile);

    if (typeof window !== 'undefined') {
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      localStorage.setItem('notificationPrefs', JSON.stringify(notifPrefs));
      
      /* Dispatch custom event agar Header/Sidebar mendeteksi perubahan nama secara real-time */
      window.dispatchEvent(new Event('profile-update'));
    }

    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-3xl">
      {/* Header halaman */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Profil & Pengaturan</h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Kelola informasi akun dan preferensi notifikasi Anda.
        </p>
      </div>

      {/* Kartu Avatar - Merender displayProfile yang sudah ter-submit */}
      <div className="card p-3 md:p-5 flex items-center gap-3 md:gap-5">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-md bg-primary-600 text-white flex items-center justify-center text-lg md:text-2xl font-bold select-none flex-shrink-0">
          {(displayProfile.nama || '').charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white truncate">{displayProfile.nama || ''}</p>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">{displayProfile.nim || ''} · {displayProfile.prodi || ''}</p>
          <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 md:mt-1">{profilUser.fakultas}, {profilUser.universitas}</p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <span className="badge badge-info text-[10px] md:text-xs">{displayProfile.semester || 'Semester 5'}</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 md:space-y-5">
        {/* Seksi: Data Akademik */}
        <div className="card p-3 md:p-5 space-y-3 md:space-y-4">
          <div className="section-header">
            <BookOpen className="w-4 h-4 md:w-5 h-5" />
            <h2>Data Akademik</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 md:mb-1.5 uppercase tracking-wide">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="nama"
                  value={formProfile.nama || ''}
                  onChange={handleChange}
                  className="input-field pl-9 py-1.5 text-xs md:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 md:mb-1.5 uppercase tracking-wide">
                NIM
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="nim"
                  value={formProfile.nim || ''}
                  className="input-field pl-9 py-1.5 text-xs md:text-sm bg-slate-50 dark:bg-slate-700/50 text-slate-500 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 md:mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formProfile.email || ''}
                  onChange={handleChange}
                  className="input-field pl-9 py-1.5 text-xs md:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 md:mb-1.5 uppercase tracking-wide">
                Program Studi
              </label>
              <input
                type="text"
                name="prodi"
                value={formProfile.prodi || ''}
                readOnly
                className="input-field py-1.5 text-xs md:text-sm bg-slate-50 dark:bg-slate-700/50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 md:mb-1.5 uppercase tracking-wide">
                Semester
              </label>
              <input
                type="text"
                name="semester"
                value={formProfile.semester || ''}
                disabled
                className="input-field py-1.5 text-xs md:text-sm bg-slate-50 dark:bg-slate-700/50 text-slate-500 cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-400 mt-1">Semester diperbarui otomatis oleh sistem</p>
            </div>
          </div>
        </div>

        {/* Seksi: Preferensi Notifikasi */}
        <div className="card p-3 md:p-5 space-y-3 md:space-y-4">
          <div className="section-header">
            <Shield className="w-4 h-4 md:w-5 h-5 text-primary-500" />
            <h2>Preferensi Notifikasi</h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            {/* Toggle Switch 1 */}
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">Pengingat Tugas Harian</span>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifPrefs.tugasHarian}
                  onChange={() => setNotifPrefs(prev => ({ ...prev, tugasHarian: !prev.tugasHarian }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary-500"></div>
              </label>
            </div>

            {/* Toggle Switch 2 */}
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">Notifikasi Forum Diskusi</span>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifPrefs.forumDiskusi}
                  onChange={() => setNotifPrefs(prev => ({ ...prev, forumDiskusi: !prev.forumDiskusi }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary-500"></div>
              </label>
            </div>

            {/* Toggle Switch 3 */}
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">Email Laporan Nilai</span>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifPrefs.laporanNilai}
                  onChange={() => setNotifPrefs(prev => ({ ...prev, laporanNilai: !prev.laporanNilai }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Tombol simpan */}
        <div className="flex items-center justify-end gap-2 md:gap-3">
          {saveStatus === 'saved' && (
            <span className="text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-fade-in">
              ✓ Perubahan berhasil disimpan
            </span>
          )}
          <button type="submit" className="btn-primary flex items-center gap-1.5 md:gap-2 py-1.5 px-4 text-xs md:text-sm">
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
