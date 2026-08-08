'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/*
  Toggle dark/light mode dengan animasi radial sweep dari titik klik tombol.
  Menggunakan CSS clip-path dan View Transitions API (jika didukung browser).
*/
export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (!document.startViewTransition) {
      toggleDarkMode();
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.startViewTransition(() => {
      toggleDarkMode();
    }).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 400,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={darkMode ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
      title={darkMode ? 'Light Mode' : 'Dark Mode'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-accent-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
