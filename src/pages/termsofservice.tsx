import { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full flex flex-col items-center pt-20 pb-32">
      {/* Header */}
      <h1 className="text-[40px] md:text-[56px] font-bold text-[#7DCEF4] mb-12 tracking-wide font-sans text-center px-4">
        Terms of Service
      </h1>
      
      {/* Intro text */}
      <div className="max-w-[1100px] w-full mx-auto text-center px-8 mb-20">
        <p className="text-[#3b82f6] font-medium text-[15px] underline decoration-[#3b82f6] decoration-2 underline-offset-[6px] leading-[1.8]">
          Ketentuan Layanan ini mengatur penggunaan Anda terhadap situs web CV Maker. Dengan mengakses atau menggunakan layanan kami, Anda menyatakan<br/>
          bahwa Anda telah membaca, memahami, dan menyetujui seluruh isi ketentuan di bawah ini.
        </p>
      </div>

      {/* Two Column Content */}
      <div className="max-w-[1300px] w-full mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
        
        {/* Left Column */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">1. Penerimaan Ketentuan</h2>
            <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">
              Dengan membuat akun atau menggunakan layanan pengeditan CV di platform kami, Anda secara hukum menyetujui untuk terikat oleh Ketentuan Layanan ini serta Kebijakan Privasi kami. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">2. Penggunaan Layanan yang Diizinkan</h2>
            <p className="text-gray-500 text-[14.5px] font-medium mb-3 leading-relaxed">
              Anda setuju untuk menggunakan layanan ini hanya untuk tujuan pembuatan CV yang sah dan profesional. Anda dilarang keras untuk:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2.5 text-[14px] text-gray-500 font-medium leading-relaxed">
              <li>Memasukkan informasi palsu, menyesatkan, atau tidak jujur tentang identitas, pengalaman kerja, atau pendidikan Anda.</li>
              <li>Mengunggah foto profil yang mengandung pornografi, unsur SARA, atau konten yang melanggar hak cipta pihak lain.</li>
              <li>Menggunakan bot, skrip otomatis, atau metode hacking untuk mengganggu integritas server dan database kami.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">3. Akun dan Keamanan Pengguna</h2>
            <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">
              Apabila Anda membuat akun di CV Maker, Anda bertanggung jawab penuh untuk menjaga kerahasiaan kata sandi Anda dan memantau semua aktivitas yang terjadi di bawah akun Anda. Anda setuju untuk segera memberi tahu kami jika mendeteksi adanya penggunaan akun tanpa izin.
            </p>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Section 4 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">4. Hak Milik Intelektual & Konten</h2>
            <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">
              Semua desain template, logo, kode pemrograman, dan antarmuka pengguna pada platform ini adalah hak milik intelektual eksklusif CV Maker. Namun, konten informasi, teks resume, dan foto profil yang Anda unggah sepenuhnya merupakan hak milik pribadi Anda. Kami tidak mengklaim kepemilikan atas informasi data CV Anda.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">5. Batasan Tanggung Jawab</h2>
            <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">
              Layanan kami disediakan "sebagaimana adanya" tanpa jaminan dalam bentuk apa pun. Kami tidak menjamin bahwa Anda pasti akan mendapatkan pekerjaan atau panggilan wawancara dengan menggunakan CV yang dibuat di platform kami. Kami juga tidak bertanggung jawab atas kehilangan data sementara yang disebabkan oleh pemeliharaan sistem atau gangguan jaringan.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">6. Perubahan Ketentuan Layanan</h2>
            <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed">
              Kami berhak untuk mengubah, memodifikasi, atau memperbarui Ketentuan Layanan ini kapan saja sesuai perkembangan hukum dan fitur platform. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Penggunaan berkelanjutan Anda setelah perubahan tersebut menandakan persetujuan Anda terhadap ketentuan baru.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;
