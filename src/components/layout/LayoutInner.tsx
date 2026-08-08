'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import AIChatbot from '@/components/ai/AIChatbot';
import { ThemeProvider } from '@/contexts/ThemeContext';

/*
 * Komponen pembungkus tata letak utama pada sisi klien.
 * Mengatur tata letak halaman yang terdiri dari Sidebar statis dan Header dinamis.
 * Jika pengguna berada di halaman login (/), layout utama tidak ditampilkan.
 */
export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isLoginPage = pathname === '/';

  if (isLoginPage) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
          {children}
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="flex flex-col flex-1 min-w-0 lg:pl-[260px] transition-all duration-300">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-6 h-full">
              {children}
            </div>
          </main>
        </div>
        
        <AIChatbot />
      </div>
    </ThemeProvider>
  );
}
