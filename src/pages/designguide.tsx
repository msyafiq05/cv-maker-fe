import { useEffect } from 'react';

const DesignGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full flex flex-col items-center pt-20 pb-32">
      {/* Header */}
      <h1 className="text-[40px] md:text-[56px] font-bold text-[#7DCEF4] mb-4 tracking-wide font-sans text-center px-4">
        CV Design Guide
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base text-center max-w-[650px] mb-16 px-6">
        Panduan langkah demi langkah tentang estetika desain, tipografi, penataan warna, dan tata letak untuk memikat hati rekruter dalam waktu 6 detik.
      </p>

      {/* Content Sections */}
      <div className="max-w-[1000px] w-full mx-auto px-6 space-y-16">
        
        {/* Section 1: Typography */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-50 text-[#7DCEF4] rounded-full text-xs font-bold">1. TIPOGRAFI & STRUKTUR TEKS</div>
            <h2 className="text-2xl font-bold text-gray-800">Hierarki Font yang Jelas</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Pilihlah satu atau maksimal dua jenis font yang serasi untuk seluruh dokumen CV Anda. Buat hierarki ukuran huruf yang konsisten agar mudah dipindai oleh pembaca.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600 font-semibold list-disc list-inside">
              <li>Nama Utama: 18 - 24 px (Tebal)</li>
              <li>Judul Bagian/Header: 13 - 15 px (Tebal)</li>
              <li>Isi Konten/Deskripsi: 10 - 11 px (Normal)</li>
            </ul>
          </div>
          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-3">
            <span className="text-[20px] font-bold text-gray-800 font-sans">Joko Santoso</span>
            <span className="text-[14px] font-bold text-[#7DCEF4] uppercase tracking-wider">Pengalaman Kerja</span>
            <p className="text-[11px] text-gray-500 font-medium leading-normal">
              Memimpin tim pengembang beranggotakan 5 orang untuk merancang aplikasi web e-commerce berskala besar menggunakan React dan Node.js.
            </p>
          </div>
        </section>

        {/* Section 2: Colors */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-3 gap-3">
            {/* Color cards */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gray-900 mx-auto border border-gray-200"></div>
              <span className="text-[10px] font-bold text-gray-500">Charcoal</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#7DCEF4] mx-auto"></div>
              <span className="text-[10px] font-bold text-gray-500">Sky Blue</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#0F4C81] mx-auto"></div>
              <span className="text-[10px] font-bold text-gray-500">Classic Blue</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-50 text-[#7DCEF4] rounded-full text-xs font-bold">2. SKEMA WARNA</div>
            <h2 className="text-2xl font-bold text-gray-800">Gunakan Warna Profesional</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Hindari warna-warna neon atau terlalu terang. Gunakan warna netral seperti hitam atau arang (charcoal) untuk teks utama, dan gunakan warna aksen profesional (seperti biru tua, biru muda, atau abu-abu gelap) untuk judul bagian secara konsisten.
            </p>
          </div>
        </section>

        {/* Section 3: Spacing & Margin */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-50 text-[#7DCEF4] rounded-full text-xs font-bold">3. TATA LETAK & SPACING</div>
            <h2 className="text-2xl font-bold text-gray-800">Beri Ruang untuk Bernapas</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Jangan memaksa semua teks masuk tanpa memberikan jarak (white space) yang cukup. Margin setidaknya 0.5 hingga 1 inci dan spasi antar-paragraf yang renggang membuat CV nyaman dibaca dan tidak menimbulkan rasa lelah saat pertama kali dipindai oleh HRD.
            </p>
          </div>
          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center gap-4">
            <div className="space-y-1">
              <div className="h-2 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-1.5 w-full bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-full border border-dashed border-gray-300 rounded flex items-center justify-center text-[10px] text-gray-400 font-bold">
              White Space (Margin Luar)
            </div>
            <div className="space-y-1">
              <div className="h-2 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-1.5 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DesignGuide;
