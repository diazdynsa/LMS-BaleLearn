import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, ClipboardList, MessageSquare, BarChart3, UserCircle, X } from 'lucide-react';
import AcademicLogo from '@/components/layout/AcademicLogo';
import { profilUser } from '@/data/mockData';

/*
 * Komponen navigasi utama aplikasi.
 * Menyediakan menu tautan dan profil pengguna dengan dukungan mode gelap dan responsif mobile.
 */
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [userProfile, setUserProfile] = useState({
    nama: profilUser.nama,
    nim: profilUser.nim,
    prodi: profilUser.prodi,
  });

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

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Kursus Saya', path: '/courses', icon: BookOpen },
    { label: 'Tugas', path: '/assignments', icon: ClipboardList },
    { label: 'Forum Diskusi', path: '/forum', icon: MessageSquare },
    { label: 'Nilai', path: '/grades', icon: BarChart3 },
    { label: 'Profil & Pengaturan', path: '/profile', icon: UserCircle },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 h-16 shrink-0">
          <AcademicLogo size={32} />
          <div className="ml-3">
            <h1 className="text-lg font-bold text-primary-700 dark:text-primary-500 leading-tight">BaleLearn</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">FTI — Universitas Bale Bandung</p>
          </div>
          <button 
            className="ml-auto p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
            onClick={toggleSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => {
                  if (isOpen) toggleSidebar();
                }}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-primary-600 text-white rounded-md w-9 h-9 font-bold shrink-0">
              {userProfile?.nama?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {userProfile?.nama || 'Mahasiswa'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {userProfile?.prodi || 'Program Studi'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
