import { useEffect } from 'react';

const AtsTips = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tips = [
    {
      title: "Gunakan Layout Satu Kolom",
      description: "Robot ATS (Applicant Tracking Systems) membaca teks dari kiri ke kanan. Layout satu kolom yang bersih sangat disarankan karena layout multi-kolom atau tabel rumit seringkali membuat teks terbaca secara acak atau terlewat.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    },
    {
      title: "Pilih Font Standar yang Mudah Dibaca",
      description: "Pilihlah font Sans-serif atau Serif standar seperti Arial, Calibri, Helvetica, Georgia, atau Times New Roman. Hindari font dekoratif atau buatan sendiri yang tidak dikenali oleh sistem pembaca dokumen otomatis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5H3.75" />
        </svg>
      )
    },
    {
      title: "Gunakan Judul Bagian Standar",
      description: "Sistem ATS mengelompokkan data berdasarkan kata kunci judul. Gunakan judul standar seperti 'Pengalaman Kerja', 'Riwayat Pendidikan', 'Keahlian', dan 'Hubungi Kami' daripada istilah kreatif yang membingungkan sistem.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Optimalkan dengan Kata Kunci Lowongan",
      description: "Sesuaikan deskripsi pengalaman dan keahlian Anda dengan kata-kata kunci (keywords) yang tercantum pada syarat lowongan pekerjaan yang Anda lamar. ATS menyaring kecocokan kata kunci ini untuk memberikan skor relevansi.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Hindari Gambar, Grafik, dan Simbol Rumit",
      description: "Sebagian besar sistem ATS tidak dapat membaca grafik, diagram lingkaran, atau ikon keahlian berbentuk bintang. Tuliskan keahlian Anda menggunakan teks atau bullet points standar agar informasi Anda terbaca 100%.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Simpan dalam Format PDF dengan Teks Terbaca",
      description: "Unduh CV Anda dalam format PDF berkualitas tinggi melalui sistem kami. Pastikan file PDF Anda berisi teks asli yang dapat diseleksi (bukan merupakan hasil scan gambar), karena ATS hanya dapat membaca file berbasis teks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full flex flex-col items-center pt-20 pb-32">
      {/* Header */}
      <h1 className="text-[40px] md:text-[56px] font-bold text-[#7DCEF4] mb-4 tracking-wide font-sans text-center px-4">
        ATS-Friendly Tips
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base text-center max-w-[650px] mb-16 px-6">
        Pelajari cara menulis dan menstrukturkan CV Anda agar mudah lolos sistem penyaringan otomatis (ATS) yang digunakan oleh HRD perusahaan ternama.
      </p>

      {/* Grid Layout */}
      <div className="max-w-[1100px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#7DCEF4] flex items-center justify-center shrink-0">
              {tip.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800 leading-snug">
                {tip.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action card */}
      <div className="max-w-[1100px] w-full mx-auto px-6 mt-16">
        <div className="bg-gradient-to-r from-[#BBE4FB] to-[#7DCEF4] p-8 md:p-12 rounded-3xl text-center shadow-sm">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Siap Membuat CV ATS-Friendly Anda?</h3>
          <p className="text-gray-700 text-sm md:text-base font-medium max-w-[600px] mx-auto mb-6 leading-relaxed">
            Template yang disediakan oleh CV Maker dirancang khusus sesuai kaidah ATS sehingga Anda tidak perlu khawatir tentang masalah format pembacaan.
          </p>
          <a
            href="/templates"
            className="inline-block px-8 py-3 bg-white text-gray-800 font-bold rounded-xl text-sm shadow-sm hover:shadow-md transition"
          >
            Pilih Template Sekarang
          </a>
        </div>
      </div>
    </div>
  );
};

export default AtsTips;
