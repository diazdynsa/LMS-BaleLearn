"use client";

/**
 * AcademicLogo — Komponen logo SVG kustom untuk BaleLearn LMS.
 * Menggabungkan simbol buku terbuka dengan elemen teknologi (circuit node).
 * Warna: Navy Blue (#2A4B7C) + Gold accent (#F59E0B).
 */

export default function AcademicLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BaleLearn Logo"
    >
      {/* Buku terbuka — halaman kiri */}
      <path
        d="M6 12C6 10.8954 6.89543 10 8 10H22V38H10C7.79086 38 6 36.2091 6 34V12Z"
        fill="#2A4B7C"
        opacity="0.9"
      />
      {/* Buku terbuka — halaman kanan */}
      <path
        d="M26 10H40C41.1046 10 42 10.8954 42 12V34C42 36.2091 40.2091 38 38 38H26V10Z"
        fill="#2A4B7C"
        opacity="0.7"
      />
      {/* Garis tulang buku (spine) */}
      <rect x="22" y="8" width="4" height="32" rx="1" fill="#1D3356" />
      {/* Garis teks simulasi — halaman kiri */}
      <rect x="10" y="16" width="9" height="1.5" rx="0.75" fill="#EBF0F7" opacity="0.6" />
      <rect x="10" y="20" width="7" height="1.5" rx="0.75" fill="#EBF0F7" opacity="0.4" />
      <rect x="10" y="24" width="8" height="1.5" rx="0.75" fill="#EBF0F7" opacity="0.5" />
      {/* Garis teks simulasi — halaman kanan */}
      <rect x="30" y="16" width="8" height="1.5" rx="0.75" fill="#EBF0F7" opacity="0.5" />
      <rect x="30" y="20" width="6" height="1.5" rx="0.75" fill="#EBF0F7" opacity="0.4" />
      <rect x="30" y="24" width="7" height="1.5" rx="0.75" fill="#EBF0F7" opacity="0.6" />
      {/* Elemen teknologi — circuit node (Gold accent) */}
      <circle cx="36" cy="30" r="3" fill="#F59E0B" />
      <circle cx="36" cy="30" r="1.5" fill="#FFFFFF" />
      {/* Circuit lines dari node */}
      <line x1="33" y1="30" x2="30" y2="30" stroke="#F59E0B" strokeWidth="1.2" />
      <line x1="36" y1="27" x2="36" y2="24.5" stroke="#F59E0B" strokeWidth="1.2" />
      {/* Graduation cap hint — top center */}
      <path
        d="M24 6L30 9L24 12L18 9L24 6Z"
        fill="#F59E0B"
      />
      <line x1="29" y1="9" x2="29" y2="13" stroke="#F59E0B" strokeWidth="1" />
    </svg>
  );
}
