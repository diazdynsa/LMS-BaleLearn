'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu, ChevronDown, LogOut, Settings, User, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { profilUser } from '@/data/mockData';

/*
  Header utama: Breadcrumbs dinamis di tengah, notifikasi fungsional (tandai semua dibaca),
  dan dropdown profil dengan routing ke /profile.
*/
interface HeaderProps {
  toggleSidebar: () => void;
}

/* Peta path → label breadcrumb */
const ROUTE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/courses': 'Kursus Saya',
  '/assignments': 'Pengumpulan Tugas',
  '/forum': 'Forum Diskusi',
  '/grades': 'Nilai Akademik',
  '/profile': 'Profil & Pengaturan',
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    nama: profilUser.nama,
    nim: profilUser.nim,
    prodi: profilUser.prodi,
  });

  /* State notifikasi — dapat di-reset dengan "Tandai semua dibaca" */
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Tugas Struktur Data diperbarui', time: '10 menit lalu', isUnread: true },
    { id: 2, text: 'Nilai Kuis Algoritma telah dirilis', time: '1 jam lalu', isUnread: true },
    { id: 3, text: 'Materi baru di Jaringan Komputer', time: '2 jam lalu', isUnread: false },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProfile = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('userProfile');
        if (stored) {
          try {
            setUserProfile(JSON.parse(stored));
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    loadProfile();
    window.addEventListener('profile-update', loadProfile);
    return () => window.removeEventListener('profile-update', loadProfile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Tandai semua notifikasi sebagai sudah dibaca */
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  /* Bangun label breadcrumb dari pathname aktif */
  const pageLabel = ROUTE_LABELS[pathname] ?? 'Halaman';

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4">
      {/* Hamburger — mobile only */}
      <button
        className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors flex-shrink-0"
        onClick={toggleSidebar}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumbs dinamis di tengah */}
      <nav className="flex-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 min-w-0">
        <span className="hidden sm:inline font-medium text-primary-700 dark:text-primary-400 whitespace-nowrap">BaleLearn</span>
        <ChevronRight className="hidden sm:inline w-4 h-4 flex-shrink-0 text-slate-300 dark:text-slate-600" />
        <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">{pageLabel}</span>
      </nav>

      {/* Grup kanan: toggle, notifikasi, profil */}
      <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
        <ThemeToggle />

        {/* Notifikasi dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center h-4 w-4 rounded-md bg-accent-500 text-[10px] font-bold text-white border border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifikasi</h3>
                {unreadCount > 0 && (
                  <span className="badge badge-info">{unreadCount} baru</span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors ${
                      notif.isUnread
                        ? 'bg-primary-50/60 dark:bg-primary-900/10'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {/* Dot indikator belum dibaca */}
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-all ${notif.isUnread ? 'bg-primary-500' : 'bg-transparent'}`} />
                      <div>
                        <p className={`text-sm ${notif.isUnread ? 'font-semibold text-slate-900 dark:text-white' : 'font-normal text-slate-600 dark:text-slate-400'}`}>
                          {notif.text}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 text-center">
                <button
                  onClick={markAllAsRead}
                  className={`text-xs font-medium transition-colors ${
                    unreadCount > 0
                      ? 'text-primary-600 dark:text-primary-400 hover:text-primary-700 hover:underline'
                      : 'text-slate-400 dark:text-slate-600 cursor-default'
                  }`}
                  disabled={unreadCount === 0}
                >
                  {unreadCount > 0 ? 'Tandai semua dibaca' : 'Semua sudah dibaca'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profil popover */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center space-x-2 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="flex items-center justify-center bg-primary-600 text-white rounded-md w-8 h-8 font-bold text-sm select-none">
              {userProfile?.nama?.charAt(0) || 'U'}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{userProfile?.nama}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userProfile?.nim} · {userProfile?.prodi}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" /> Profil
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" /> Pengaturan
                </Link>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 py-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    router.push('/');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
