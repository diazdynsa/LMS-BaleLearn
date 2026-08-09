# 🎓 BaleLearn — Learning Management System (LMS)

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

BaleLearn adalah platform *Learning Management System* modern dan responsif yang dirancang khusus untuk mendukung kegiatan akademik, pengelolaan tugas mahasiswa, serta diskusi kolaboratif berbasis komunitas di **Fakultas Teknologi Informasi (FTI) — Universitas Bale Bandung (UNIBBA)**.

🔗 **Repository:** [https://github.com/diazdynsa/LMS-BaleLearn](https://github.com/diazdynsa/LMS-BaleLearn)

---

## 🌟 Fitur Utama

- **Pusat Pengumpulan Tugas Adaptif**: Mendukung pengiriman tugas multi-format (Upload File, Kirim Link Repository, atau Tulis Teks Jawaban Langsung). Terdapat juga opsi "Tandai Selesai" untuk tugas luring (*offline*).
- **Penguncian Deadline Otomatis**: Form pengumpulan dan opsi membatalkan pengumpulan secara otomatis dikunci (hilang dari UI) begitu batas waktu (*deadline*) terlewati.
- **Sinkronisasi Lintas-Halaman (Cross-Component Reactivity)**: Status pengumpulan tugas (*submitted*) di halaman Tugas secara _real-time_ menyelaraskan daftar pada *widget* "Tugas Terdekat" di Dashboard menggunakan *Event Dispatchers* dan penyimpanan `localStorage`.
- **Forum Diskusi Interaktif**: Modul percakapan mahasiswa dan dosen. Dilengkapi *expandable threads*, mode buka-tutup teks penuh, serta modal konfirmasi berbasis *Portal* yang dioptimalkan untuk seluler.
- **Tabel Nilai Responsif**: Rekapitulasi hasil studi dan IPK dalam format tabel padat berskala khusus perangkat *mobile* (*horizontal scroll* yang aman dari bocor antarmuka).
- **Desain Profesional & Akademik**: Pendekatan antarmuka yang bersih (*clean*), rapi, dan responsif. Menggunakan skema warna yang mencerminkan institusi pendidikan tinggi (perpaduan Biru Navigasi & Aksen Emas/Kuning) dengan layout *Mobile-First*.

## 🛠️ Stack Teknologi

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v3
- **Bahasa:** TypeScript
- **State Management:** React Hooks + Browser Local Storage
- **Ikon:** Lucide React

## 🚀 Cara Menjalankan Secara Lokal

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/diazdynsa/LMS-BaleLearn.git
   ```
2. **Pindah ke Direktori Proyek**
   ```bash
   cd LMS-BaleLearn
   ```
   *(Catatan: Sesuaikan nama folder jika Anda mengubah namanya saat *clone*)*
3. **Instal Dependensi**
   ```bash
   npm install
   ```
4. **Jalankan Server Development**
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` di *browser* Anda untuk menjelajahi platform LMS ini.
