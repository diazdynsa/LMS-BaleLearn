/**
 * DATA MOCK (DUMMY) UNTUK LMS PLATFORM
 */

/** Tipe untuk jadwal kuliah harian */
export interface Jadwal {
  id: string;
  mataKuliah: string;
  dosen: string;
  waktuMulai: string;
  waktuSelesai: string;
  ruangan: string;
  status: "berlangsung" | "akan-datang" | "selesai";
}

/** Tipe untuk pengumuman dari dosen/admin */
export interface Pengumuman {
  id: string;
  judul: string;
  konten: string;
  pengirim: string;
  tanggal: string;
  kategori: "umum" | "tugas" | "ujian" | "penting";
  dibaca: boolean;
}

/** Tipe untuk tugas yang harus dikumpulkan */
export interface Tugas {
  id: string;
  judul: string;
  mataKuliah: string;
  deskripsi: string;
  deadline: string;
  status: "belum" | "dikumpulkan" | "terlambat" | "dinilai";
  nilai?: number;
  prioritas: "tinggi" | "sedang" | "rendah";
}

/** Tipe untuk kursus/modul belajar beserta progress */
export interface Kursus {
  id: string;
  nama: string;
  dosen: string;
  deskripsi: string;
  totalModul: number;
  modulSelesai: number;
  warna: string;
}

/** Tipe untuk thread diskusi di forum */
export interface ThreadDiskusi {
  id: string;
  judul: string;
  penulis: string;
  avatarUrl: string;
  mataKuliah: string;
  konten: string;
  tanggal: string;
  jumlahBalasan: number;
  disukai: number;
  tag: string[];
}

/** Tipe untuk komentar di forum diskusi */
export interface Komentar {
  id: string;
  threadId: string;
  penulis: string;
  avatarUrl: string;
  konten: string;
  tanggal: string;
  disukai: number;
  balasan?: Komentar[];
}

/** Tipe untuk data nilai per mata kuliah */
export interface Nilai {
  id: string;
  mataKuliah: string;
  kode: string;
  sks: number;
  nilaiTugas: number;
  nilaiKuis: number;
  nilaiUTS: number;
  nilaiUAS: number;
  nilaiAkhir: number;
  hurufMutu: string;
  bobotMutu: number;
}

/** Tipe data untuk pesan chatbot AI */
export interface PesanChat {
  id: string;
  pengirim: "user" | "ai";
  konten: string;
  waktu: string;
}

/** Jadwal kuliah hari ini */
export const dataJadwal: Jadwal[] = [
  {
    id: "j1",
    mataKuliah: "Pemrograman Web Lanjut",
    dosen: "Dr. Andi Prasetyo, M.Kom.",
    waktuMulai: "08:00",
    waktuSelesai: "10:30",
    ruangan: "Lab Komputer 3",
    status: "selesai",
  },
  {
    id: "j2",
    mataKuliah: "Basis Data Terdistribusi",
    dosen: "Prof. Siti Rahayu, Ph.D.",
    waktuMulai: "10:30",
    waktuSelesai: "12:00",
    ruangan: "Ruang 204",
    status: "berlangsung",
  },
  {
    id: "j3",
    mataKuliah: "Kecerdasan Buatan",
    dosen: "Dr. Budi Santoso, M.T.",
    waktuMulai: "13:00",
    waktuSelesai: "15:30",
    ruangan: "Ruang 301",
    status: "akan-datang",
  },
  {
    id: "j4",
    mataKuliah: "Jaringan Komputer",
    dosen: "Ir. Maya Kusuma, M.Sc.",
    waktuMulai: "15:30",
    waktuSelesai: "17:00",
    ruangan: "Lab Jaringan",
    status: "akan-datang",
  },
  {
    id: "j5",
    mataKuliah: "Rekayasa Perangkat Lunak",
    dosen: "Dr. Hendra Wijaya, M.Kom.",
    waktuMulai: "17:00",
    waktuSelesai: "18:30",
    ruangan: "Ruang 102",
    status: "akan-datang",
  },
];

/** Pengumuman terbaru */
export const dataPengumuman: Pengumuman[] = [
  {
    id: "p1",
    judul: "Jadwal UTS Semester Ganjil 2026/2027",
    konten: "Ujian Tengah Semester akan dilaksanakan pada tanggal 15-25 September 2026. Silakan periksa jadwal masing-masing mata kuliah di portal akademik.",
    pengirim: "Bagian Akademik FTI",
    tanggal: "2026-08-04T08:00:00",
    kategori: "ujian",
    dibaca: false,
  },
  {
    id: "p2",
    judul: "Workshop AI & Machine Learning",
    konten: "Fakultas Teknologi Informasi mengadakan workshop AI & ML pada tanggal 10 Agustus 2026. Pendaftaran dibuka untuk seluruh mahasiswa FTI.",
    pengirim: "Himpunan Mahasiswa TI",
    tanggal: "2026-08-03T14:30:00",
    kategori: "umum",
    dibaca: false,
  },
  {
    id: "p3",
    judul: "Perubahan Deadline Tugas Besar PW Lanjut",
    konten: "Deadline Tugas Besar mata kuliah Pemrograman Web Lanjut diperpanjang hingga 20 Agustus 2026. Gunakan waktu tambahan ini dengan baik.",
    pengirim: "Dr. Andi Prasetyo, M.Kom.",
    tanggal: "2026-08-02T10:15:00",
    kategori: "tugas",
    dibaca: true,
  },
  {
    id: "p4",
    judul: "Pemeliharaan Server Kampus",
    konten: "Server portal akademik akan mengalami pemeliharaan rutin pada tanggal 6 Agustus 2026 pukul 22:00 - 06:00 WIB. Harap simpan pekerjaan Anda sebelum waktu tersebut.",
    pengirim: "UPT TIK Universitas",
    tanggal: "2026-08-01T16:00:00",
    kategori: "penting",
    dibaca: true,
  },
];

/** Daftar tugas mahasiswa */
export const dataTugas: Tugas[] = [
  {
    id: "t1",
    judul: "Tugas Besar: Aplikasi LMS dengan Next.js",
    mataKuliah: "Pemrograman Web Lanjut",
    deskripsi: "Buat aplikasi Learning Management System (LMS) menggunakan Next.js dan Tailwind CSS. Aplikasi harus memiliki minimal 5 halaman dengan fitur interaktif.",
    deadline: "2026-08-20T23:59:00",
    status: "belum",
    prioritas: "tinggi",
  },
  {
    id: "t2",
    judul: "Laporan Analisis Normalisasi Database",
    mataKuliah: "Basis Data Terdistribusi",
    deskripsi: "Analisis dan normalisasi skema database e-commerce hingga bentuk 3NF. Sertakan diagram ERD dan penjelasan setiap langkah normalisasi.",
    deadline: "2026-08-10T23:59:00",
    status: "belum",
    prioritas: "tinggi",
  },
  {
    id: "t3",
    judul: "Implementasi Algoritma A* untuk Pathfinding",
    mataKuliah: "Kecerdasan Buatan",
    deskripsi: "Implementasikan algoritma A* untuk mencari jalur terpendek pada grid map. Visualisasikan proses pencarian langkah demi langkah.",
    deadline: "2026-08-15T23:59:00",
    status: "belum",
    prioritas: "sedang",
  },
  {
    id: "t4",
    judul: "Konfigurasi VLAN dan Routing",
    mataKuliah: "Jaringan Komputer",
    deskripsi: "Konfigurasi VLAN pada jaringan kampus menggunakan Cisco Packet Tracer. Buat dokumentasi lengkap termasuk topologi dan tabel routing.",
    deadline: "2026-08-08T23:59:00",
    status: "dikumpulkan",
    prioritas: "sedang",
  },
  {
    id: "t5",
    judul: "Review Kode: Design Pattern Observer",
    mataKuliah: "Rekayasa Perangkat Lunak",
    deskripsi: "Lakukan code review pada implementasi design pattern Observer. Identifikasi minimal 5 poin perbaikan dan berikan saran refactoring.",
    deadline: "2026-07-30T23:59:00",
    status: "dinilai",
    nilai: 87,
    prioritas: "rendah",
  },
  {
    id: "t6",
    judul: "Kuis Online: SQL Advanced Query",
    mataKuliah: "Basis Data Terdistribusi",
    deskripsi: "Kuis online tentang advanced SQL query (subquery, CTE, window function). Durasi pengerjaan 60 menit.",
    deadline: "2026-07-28T10:00:00",
    status: "terlambat",
    prioritas: "tinggi",
  },
];

/** Data kursus beserta progress */
export const dataKursus: Kursus[] = [
  {
    id: "k1",
    nama: "Pemrograman Web Lanjut",
    dosen: "Dr. Andi Prasetyo, M.Kom.",
    deskripsi: "Mempelajari framework modern untuk pengembangan web, termasuk React, Next.js, dan state management.",
    totalModul: 14,
    modulSelesai: 9,
    warna: "#2A4B7C",
  },
  {
    id: "k2",
    nama: "Basis Data Terdistribusi",
    dosen: "Prof. Siti Rahayu, Ph.D.",
    deskripsi: "Konsep dan implementasi database terdistribusi, replikasi, sharding, dan konsistensi data.",
    totalModul: 12,
    modulSelesai: 7,
    warna: "#059669",
  },
  {
    id: "k3",
    nama: "Kecerdasan Buatan",
    dosen: "Dr. Budi Santoso, M.T.",
    deskripsi: "Dasar-dasar AI: machine learning, neural network, NLP, dan computer vision.",
    totalModul: 16,
    modulSelesai: 5,
    warna: "#7C3AED",
  },
  {
    id: "k4",
    nama: "Jaringan Komputer",
    dosen: "Ir. Maya Kusuma, M.Sc.",
    deskripsi: "Arsitektur jaringan, protokol TCP/IP, routing, switching, dan keamanan jaringan.",
    totalModul: 10,
    modulSelesai: 10,
    warna: "#DC2626",
  },
  {
    id: "k5",
    nama: "Rekayasa Perangkat Lunak",
    dosen: "Dr. Hendra Wijaya, M.Kom.",
    deskripsi: "Metodologi pengembangan software: Agile, Scrum, design pattern, testing, dan CI/CD.",
    totalModul: 12,
    modulSelesai: 4,
    warna: "#F59E0B",
  },
];

/** Thread diskusi forum */
export const dataThread: ThreadDiskusi[] = [
  {
    id: "d1",
    judul: "Cara Deploy Next.js ke Vercel dengan Environment Variables",
    penulis: "Ahmad Rizky",
    avatarUrl: "",
    mataKuliah: "Pemrograman Web Lanjut",
    konten: "Halo teman-teman, ada yang sudah berhasil deploy project Next.js ke Vercel? Saya kesulitan mengatur environment variables untuk koneksi database. Sudah coba di dashboard Vercel tapi tetap error. Mohon bantuannya!",
    tanggal: "2026-08-04T09:30:00",
    jumlahBalasan: 8,
    disukai: 12,
    tag: ["nextjs", "deploy", "vercel"],
  },
  {
    id: "d2",
    judul: "Perbedaan NoSQL vs SQL untuk Sistem Terdistribusi",
    penulis: "Dina Maharani",
    avatarUrl: "",
    mataKuliah: "Basis Data Terdistribusi",
    konten: "Menurut kalian, kapan sebaiknya menggunakan NoSQL (MongoDB, Cassandra) dibanding SQL (PostgreSQL) untuk sistem terdistribusi? Saya buat rangkuman dari materi minggu lalu, silakan didiskusikan.",
    tanggal: "2026-08-03T15:45:00",
    jumlahBalasan: 15,
    disukai: 23,
    tag: ["database", "nosql", "sql"],
  },
  {
    id: "d3",
    judul: "Tutorial: Implementasi Neural Network dari Scratch dengan Python",
    penulis: "Fajar Nugraha",
    avatarUrl: "",
    mataKuliah: "Kecerdasan Buatan",
    konten: "Saya sudah membuat tutorial langkah demi langkah untuk membuat neural network sederhana tanpa library ML. Cocok untuk persiapan tugas implementasi minggu depan. Link repo ada di bawah.",
    tanggal: "2026-08-02T20:10:00",
    jumlahBalasan: 21,
    disukai: 45,
    tag: ["ai", "neural-network", "python", "tutorial"],
  },
  {
    id: "d4",
    judul: "Diskusi: Best Practice untuk REST API Design",
    penulis: "Lina Kartika",
    avatarUrl: "",
    mataKuliah: "Rekayasa Perangkat Lunak",
    konten: "Terkait tugas kelompok RPL, saya ingin mendiskusikan best practice untuk desain REST API. Apakah kita harus mengikuti konvensi tertentu untuk naming endpoint? Bagaimana dengan versioning?",
    tanggal: "2026-08-01T11:20:00",
    jumlahBalasan: 6,
    disukai: 9,
    tag: ["api", "rest", "best-practice"],
  },
  {
    id: "d5",
    judul: "Troubleshoot: Konfigurasi OSPF Multi-Area",
    penulis: "Reza Firmansyah",
    avatarUrl: "",
    mataKuliah: "Jaringan Komputer",
    konten: "Ada yang bisa bantu? Konfigurasi OSPF multi-area saya tidak berjalan dengan benar di Packet Tracer. Router ABR tidak melakukan redistribusi route antar area. Sudah ikuti modul tapi tetap gagal.",
    tanggal: "2026-07-31T14:00:00",
    jumlahBalasan: 4,
    disukai: 7,
    tag: ["jaringan", "ospf", "troubleshoot"],
  },
];

/** Komentar pada thread diskusi */
export const dataKomentar: Komentar[] = [
  {
    id: "c1",
    threadId: "d1",
    penulis: "Bella Safitri",
    avatarUrl: "",
    konten: "Coba cek apakah variabel di Vercel sudah di-prefix dengan NEXT_PUBLIC_ untuk yang diakses di client side. Kalau hanya server-side, tidak perlu prefix. Saya juga pernah kena masalah ini.",
    tanggal: "2026-08-04T10:15:00",
    disukai: 5,
    balasan: [
      {
        id: "c1r1",
        threadId: "d1",
        penulis: "Ahmad Rizky",
        avatarUrl: "",
        konten: "Terima kasih Bella! Ternyata memang itu masalahnya. Saya lupa menambahkan prefix NEXT_PUBLIC_ untuk API key. Sekarang sudah bisa berjalan.",
        tanggal: "2026-08-04T10:45:00",
        disukai: 3,
      },
    ],
  },
  {
    id: "c2",
    threadId: "d1",
    penulis: "Gilang Pratama",
    avatarUrl: "",
    konten: "Alternatif lain, bisa juga pakai file .env.local di root project. Vercel akan otomatis membaca file ini saat build. Pastikan file-nya sudah di-ignore di .gitignore ya.",
    tanggal: "2026-08-04T11:00:00",
    disukai: 8,
  },
  {
    id: "c3",
    threadId: "d1",
    penulis: "Nadia Putri",
    avatarUrl: "",
    konten: "Saya sarankan juga gunakan Vercel CLI untuk testing lokal sebelum deploy. Jalankan `vercel env pull .env.local` untuk sinkronisasi env variables dari dashboard.",
    tanggal: "2026-08-04T12:30:00",
    disukai: 11,
    balasan: [
      {
        id: "c3r1",
        threadId: "d1",
        penulis: "Ahmad Rizky",
        avatarUrl: "",
        konten: "Wah, baru tahu ada fitur ini. Sangat membantu! Terima kasih Nadia.",
        tanggal: "2026-08-04T13:00:00",
        disukai: 2,
      },
    ],
  },
  {
    id: "c4",
    threadId: "d2",
    penulis: "Eko Saputra",
    avatarUrl: "",
    konten: "Menurut saya, pilihannya tergantung pada sifat data. Jika data memiliki relasi kompleks, SQL lebih tepat. Untuk data yang skalanya besar dan tidak terstruktur, NoSQL seperti MongoDB lebih fleksibel.",
    tanggal: "2026-08-03T16:00:00",
    disukai: 9,
    balasan: [
      {
        id: "c4r1",
        threadId: "d2",
        penulis: "Dina Maharani",
        avatarUrl: "",
        konten: "Setuju! Saya tambahkan: untuk use case real-time seperti chat, Cassandra unggul karena write-throughput-nya tinggi.",
        tanggal: "2026-08-03T16:30:00",
        disukai: 6,
      },
    ],
  },
  {
    id: "c5",
    threadId: "d2",
    penulis: "Siti Rahayu",
    avatarUrl: "",
    konten: "Jangan lupa pertimbangkan CAP Theorem. SQL biasanya lebih condong ke Consistency & Availability, sementara banyak NoSQL memilih Availability & Partition Tolerance.",
    tanggal: "2026-08-03T17:10:00",
    disukai: 14,
  },
  {
    id: "c6",
    threadId: "d3",
    penulis: "Hendra Laksono",
    avatarUrl: "",
    konten: "Tutorial ini sangat membantu! Saya berhasil mengimplementasikan backpropagation dari scratch mengikuti panduan ini. Satu pertanyaan: bagaimana cara menangani vanishing gradient di jaringan yang dalam?",
    tanggal: "2026-08-02T21:00:00",
    disukai: 7,
    balasan: [
      {
        id: "c6r1",
        threadId: "d3",
        penulis: "Fajar Nugraha",
        avatarUrl: "",
        konten: "Untuk vanishing gradient, coba gunakan fungsi aktivasi ReLU sebagai pengganti sigmoid. Atau gunakan teknik batch normalization di antara layer.",
        tanggal: "2026-08-02T21:45:00",
        disukai: 11,
      },
    ],
  },
  {
    id: "c7",
    threadId: "d3",
    penulis: "Ratna Dewi",
    avatarUrl: "",
    konten: "Repositori-nya sudah saya fork dan saya tambahkan implementasi LSTM. Kalau ada yang mau kolaborasi, silakan buat PR ya!",
    tanggal: "2026-08-02T22:30:00",
    disukai: 18,
  },
  {
    id: "c8",
    threadId: "d4",
    penulis: "Budi Prakoso",
    avatarUrl: "",
    konten: "Untuk versioning, saya sarankan gunakan URL path versioning seperti `/api/v1/` daripada header. Lebih mudah di-debug dan di-dokumentasikan di Swagger.",
    tanggal: "2026-08-01T12:00:00",
    disukai: 5,
    balasan: [
      {
        id: "c8r1",
        threadId: "d4",
        penulis: "Lina Kartika",
        avatarUrl: "",
        konten: "Terima kasih! Kami akan pakai `/api/v1/` untuk tugas kelompok. Ada rekomendasi tool untuk auto-generate dokumentasi API?",
        tanggal: "2026-08-01T12:30:00",
        disukai: 2,
      },
      {
        id: "c8r2",
        threadId: "d4",
        penulis: "Budi Prakoso",
        avatarUrl: "",
        konten: "Pakai Swagger UI dengan library `swagger-jsdoc`. Bisa di-generate dari komentar JSDoc langsung di kode.",
        tanggal: "2026-08-01T13:00:00",
        disukai: 8,
      },
    ],
  },
  {
    id: "c9",
    threadId: "d5",
    penulis: "Wahyu Santoso",
    avatarUrl: "",
    konten: "Cek konfigurasi `router-id` di setiap router. Kalau router-id tidak unik di seluruh OSPF domain, bisa menyebabkan masalah konvergensi. Juga pastikan network area sudah benar di konfigurasi ABR.",
    tanggal: "2026-07-31T14:30:00",
    disukai: 6,
    balasan: [
      {
        id: "c9r1",
        threadId: "d5",
        penulis: "Reza Firmansyah",
        avatarUrl: "",
        konten: "Bingo! Router-id saya duplikat. Setelah saya ubah dan restart OSPF process, routing antar area langsung berjalan. Terima kasih banyak!",
        tanggal: "2026-07-31T15:00:00",
        disukai: 4,
      },
    ],
  },
  {
    id: "c10",
    threadId: "d5",
    penulis: "Anisa Permata",
    avatarUrl: "",
    konten: "Tambahan: pastikan perintah `area X range` sudah dikonfigurasi dengan benar di ABR jika kamu ingin melakukan route summarization antar area OSPF.",
    tanggal: "2026-07-31T15:45:00",
    disukai: 5,
  },
];

/** Nilai per mata kuliah */
export const dataNilai: Nilai[] = [
  {
    id: "n1",
    mataKuliah: "Pemrograman Web Lanjut",
    kode: "IF401",
    sks: 3,
    nilaiTugas: 88,
    nilaiKuis: 82,
    nilaiUTS: 79,
    nilaiUAS: 85,
    nilaiAkhir: 83.9,
    hurufMutu: "A",
    bobotMutu: 4.0,
  },
  {
    id: "n2",
    mataKuliah: "Basis Data Terdistribusi",
    kode: "IF402",
    sks: 3,
    nilaiTugas: 75,
    nilaiKuis: 70,
    nilaiUTS: 72,
    nilaiUAS: 78,
    nilaiAkhir: 74.1,
    hurufMutu: "B+",
    bobotMutu: 3.5,
  },
  {
    id: "n3",
    mataKuliah: "Kecerdasan Buatan",
    kode: "IF403",
    sks: 3,
    nilaiTugas: 90,
    nilaiKuis: 88,
    nilaiUTS: 85,
    nilaiUAS: 92,
    nilaiAkhir: 89.0,
    hurufMutu: "A",
    bobotMutu: 4.0,
  },
  {
    id: "n4",
    mataKuliah: "Jaringan Komputer",
    kode: "IF404",
    sks: 3,
    nilaiTugas: 80,
    nilaiKuis: 75,
    nilaiUTS: 68,
    nilaiUAS: 74,
    nilaiAkhir: 74.2,
    hurufMutu: "B+",
    bobotMutu: 3.5,
  },
  {
    id: "n5",
    mataKuliah: "Rekayasa Perangkat Lunak",
    kode: "IF405",
    sks: 3,
    nilaiTugas: 92,
    nilaiKuis: 85,
    nilaiUTS: 88,
    nilaiUAS: 90,
    nilaiAkhir: 89.3,
    hurufMutu: "A",
    bobotMutu: 4.0,
  },
];

/** Respons otomatis AI chatbot berdasarkan kata kunci */
export const responsAI: Record<string, string> = {
  jadwal: "Berdasarkan data akademik Anda, hari ini Anda memiliki 5 jadwal kuliah. Yang sedang berlangsung sekarang adalah Basis Data Terdistribusi (10:30-12:00) di Ruang 204. Selanjutnya Kecerdasan Buatan pukul 13:00.",
  tugas: "Anda memiliki 3 tugas yang belum dikumpulkan. Yang paling mendesak adalah 'Laporan Analisis Normalisasi Database' dengan deadline 10 Agustus 2026. Saya sarankan untuk mengerjakan yang deadline-nya paling dekat terlebih dahulu.",
  nilai: "IPK Anda saat ini adalah 3.80 dari skala 4.00. Mata kuliah dengan nilai tertinggi adalah Rekayasa Perangkat Lunak (A, 89.3) dan Kecerdasan Buatan (A, 89.0). Pertahankan performa Anda!",
  forum: "Thread terpopuler saat ini adalah 'Tutorial: Implementasi Neural Network dari Scratch dengan Python' oleh Fajar Nugraha dengan 45 likes dan 21 balasan. Mungkin Anda tertarik untuk membacanya.",
  uts: "UTS Semester Ganjil 2026/2027 dijadwalkan pada tanggal 15-25 September 2026. Jadwal detail per mata kuliah akan diumumkan di portal akademik. Mulai persiapkan dari sekarang ya!",
  bantuan: "Saya adalah asisten AI LMS yang siap membantu Anda. Anda bisa bertanya tentang: jadwal kuliah, tugas, nilai, forum diskusi, atau informasi akademik lainnya. Ketik topik yang ingin Anda tanyakan!",
  default: "Terima kasih atas pertanyaannya! Saya akan mencoba membantu. Untuk saat ini, saya bisa menjawab pertanyaan terkait jadwal, tugas, nilai, forum, dan informasi UTS. Silakan ketik kata kunci yang relevan.",
};

/** Profil mahasiswa yang sedang login */
export const profilUser = {
  nama: "Diaz Dynsa",
  nim: "21.01.5124",
  prodi: "Teknik Informatika",
  fakultas: "Fakultas Teknologi Informasi",
  universitas: "Universitas Bale Bandung",
  email: "diaz.dynsa@student.unbal.ac.id",
  semester: 7,
  avatarUrl: "",
};

/** Menghitung IPK dari data nilai */
export function hitungIPK(nilaiList: Nilai[]): number {
  const totalBobot = nilaiList.reduce((sum, n) => sum + n.bobotMutu * n.sks, 0);
  const totalSKS = nilaiList.reduce((sum, n) => sum + n.sks, 0);
  return totalSKS > 0 ? Math.round((totalBobot / totalSKS) * 100) / 100 : 0;
}

/** Format tanggal ISO string menjadi format relatif */
export function formatWaktuRelatif(tanggalISO: string): string {
  const sekarang = new Date();
  const tanggal = new Date(tanggalISO);
  const selisihDetik = Math.floor((sekarang.getTime() - tanggal.getTime()) / 1000);

  if (selisihDetik < 60) return "Baru saja";
  if (selisihDetik < 3600) return `${Math.floor(selisihDetik / 60)} menit yang lalu`;
  if (selisihDetik < 86400) return `${Math.floor(selisihDetik / 3600)} jam yang lalu`;
  if (selisihDetik < 604800) return `${Math.floor(selisihDetik / 86400)} hari yang lalu`;
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Menghitung sisa waktu menuju deadline */
export function hitungSisaWaktu(deadlineISO: string): {
  teks: string;
  sudahLewat: boolean;
} {
  const sekarang = new Date();
  const deadline = new Date(deadlineISO);
  const selisih = deadline.getTime() - sekarang.getTime();

  if (selisih < 0) {
    return { teks: "Sudah lewat", sudahLewat: true };
  }

  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (hari > 0) return { teks: `${hari} hari ${jam} jam lagi`, sudahLewat: false };
  if (jam > 0) return { teks: `${jam} jam lagi`, sudahLewat: false };
  const menit = Math.floor(selisih / (1000 * 60));
  return { teks: `${menit} menit lagi`, sudahLewat: false };
}
