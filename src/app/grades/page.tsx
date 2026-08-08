import { Award, BookOpen } from 'lucide-react';
import { dataNilai, hitungIPK, Nilai } from '@/data/mockData';

/*
  Halaman Nilai Akademik: ringkasan IPK, total SKS, total MK,
  dan tabel rekapan nilai per mata kuliah.
  Disesuaikan dengan penskalaan mobile responsif (grid, padding, overflow-x-auto, font-size).
*/
export default function GradesPage() {
  const ipk = hitungIPK(dataNilai);
  const totalSKS = dataNilai.reduce((sum, n) => sum + n.sks, 0);
  
  let ipkColor = 'bg-emerald-500';
  if (ipk < 3.0) ipkColor = 'bg-red-500';
  else if (ipk < 3.5) ipkColor = 'bg-amber-500';

  const getMutuColor = (huruf: string) => {
    if (huruf === 'A') return 'text-emerald-600 font-bold';
    if (['B+', 'B'].includes(huruf)) return 'text-sky-600 font-bold';
    if (['C+', 'C'].includes(huruf)) return 'text-amber-600 font-bold';
    return 'text-red-600 font-bold';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-3">
        <Award className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
        <h1 className="text-xl md:text-2xl font-bold dark:text-white">Nilai Akademik</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <div className="card p-3 md:p-6 flex items-center justify-between col-span-2 md:col-span-1">
          <div>
            <p className="text-[10px] md:text-sm text-slate-500 mb-1">Indeks Prestasi Kumulatif</p>
            <h2 className="text-2xl md:text-4xl font-bold dark:text-white">{ipk.toFixed(2)}</h2>
          </div>
          <div className={`${ipkColor} text-white px-2.5 py-1 rounded-md text-[10px] md:text-sm font-semibold`}>
            {ipk >= 3.5 ? 'Cum Laude' : ipk >= 3.0 ? 'Sangat Memuaskan' : 'Memuaskan'}
          </div>
        </div>
        
        <div className="card p-3 md:p-6 flex items-center gap-3 md:gap-4 col-span-1">
          <div className="p-2 md:p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md shrink-0">
            <BookOpen className="w-5 h-5 md:w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-sm text-slate-500 mb-1 truncate">Total SKS Diambil</p>
            <h2 className="text-lg md:text-2xl font-bold dark:text-white truncate">{totalSKS} SKS</h2>
          </div>
        </div>

        <div className="card p-3 md:p-6 flex items-center gap-3 md:gap-4 col-span-1">
          <div className="p-2 md:p-3 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-md shrink-0">
            <Award className="w-5 h-5 md:w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-sm text-slate-500 mb-1 truncate">Total Mata Kuliah</p>
            <h2 className="text-lg md:text-2xl font-bold dark:text-white truncate">{dataNilai.length}</h2>
          </div>
        </div>
      </div>

      <div className="card !p-0 overflow-hidden">
        <div className="w-full overflow-x-auto rounded-md">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-0">
            <thead>
              <tr className="bg-primary-500 text-white text-[10px] md:text-xs uppercase">
                <th className="p-2.5 md:p-4 font-semibold">Kode</th>
                <th className="p-2.5 md:p-4 font-semibold">Mata Kuliah</th>
                <th className="p-2.5 md:p-4 font-semibold">SKS</th>
                <th className="p-2.5 md:p-4 font-semibold">Tugas</th>
                <th className="p-2.5 md:p-4 font-semibold">Kuis</th>
                <th className="p-2.5 md:p-4 font-semibold">UTS</th>
                <th className="p-2.5 md:p-4 font-semibold">UAS</th>
                <th className="p-2.5 md:p-4 font-semibold">Akhir</th>
                <th className="p-2.5 md:p-4 font-semibold">Mutu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-xs md:text-sm">
              {dataNilai.map((nilai: Nilai) => (
                <tr key={nilai.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-2.5 md:p-4 text-slate-500 dark:text-slate-400 font-mono">{nilai.kode}</td>
                  <td className="p-2.5 md:p-4 font-medium dark:text-white">{nilai.mataKuliah}</td>
                  <td className="p-2.5 md:p-4 text-center">{nilai.sks}</td>
                  <td className="p-2.5 md:p-4">{nilai.nilaiTugas}</td>
                  <td className="p-2.5 md:p-4">{nilai.nilaiKuis}</td>
                  <td className="p-2.5 md:p-4">{nilai.nilaiUTS}</td>
                  <td className="p-2.5 md:p-4">{nilai.nilaiUAS}</td>
                  <td className="p-2.5 md:p-4 font-semibold">{nilai.nilaiAkhir.toFixed(1)}</td>
                  <td className={`p-2.5 md:p-4 ${getMutuColor(nilai.hurufMutu)}`}>{nilai.hurufMutu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
