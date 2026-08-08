'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-w-0 flex-1 animate-in fade-in duration-150">
      {children}
    </div>
  );
}
