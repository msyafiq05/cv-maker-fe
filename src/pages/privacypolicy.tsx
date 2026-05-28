import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full flex flex-col items-center pt-20 pb-32">
      {/* Header */}
      <h1 className="text-[56px] font-bold text-[#7DCEF4] mb-12 tracking-wide font-sans">Privacy Policy</h1>
      
      {/* Intro text */}
      <div className="max-w-[1100px] w-full mx-auto text-center px-8 mb-20">
        <p className="text-[#3b82f6] font-medium text-[15px] underline decoration-[#3b82f6] decoration-2 underline-offset-[6px] leading-[1.8]">
          Selamat datang di website CV Maker. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan<br/>
          bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan layanan kami.
        </p>
      </div>

      {/* Two Column Content */}
      <div className="max-w-[1300px] w-full mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
        
        {/* Left Column */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">Informasi yang Kami Kumpulkan</h2>
            <p className="text-gray-500 text-[14px] mb-3 font-medium">Saat Anda menggunakan layanan kami untuk membuat CV, kami mungkin mengumpulkan informasi berikut:</p>
            <ul className="list-disc list-outside ml-6 space-y-2.5 text-[14px] text-gray-500 font-medium leading-relaxed">
              <li>Informasi Identitas Pribadi: Nama lengkap, alamat email, nomor telepon, dan alamat tempat tinggal.</li>
              <li>Informasi Profesional: Riwayat pendidikan, pengalaman kerja, keahlian, portofolio, dan foto profil yang Anda unggah.</li>
              <li>Data Penggunaan & Teknis: Alamat IP, jenis browser, waktu kunjungan, dan halaman yang Anda akses di situs kami (dikumpulkan secara otomatis untuk keperluan analitik).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="text-gray-500 text-[14px] mb-3 font-medium">Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
            <ul className="list-disc list-outside ml-6 space-y-2.5 text-[14px] text-gray-500 font-medium leading-relaxed">
              <li>Menyediakan dan memelihara layanan pembuatan CV.</li>
              <li>Menyimpan draf CV Anda agar dapat diedit kembali di masa mendatang (jika Anda membuat akun).</li>
              <li>Meningkatkan pengalaman pengguna dan desain antarmuka (UI/UX) website kami.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">Hak Pengguna</h2>
            <p className="text-gray-500 text-[14px] mb-3 font-medium">Anda memiliki hak untuk:</p>
            <ul className="list-disc list-outside ml-6 space-y-2.5 text-[14px] text-gray-500 font-medium leading-relaxed">
              <li>Mengakses dan melihat data pribadi yang telah Anda berikan.</li>
              <li>Memperbarui atau mengoreksi informasi pada CV Anda kapan saja.</li>
              <li>Meminta penghapusan akun dan seluruh data CV Anda dari server kami.</li>
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Section 4 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">Berbagi Informasi dengan Pihak Ketiga</h2>
            <p className="text-gray-500 text-[14px] mb-3 font-medium leading-relaxed">
              Kami tidak akan menjual, menyewakan, atau menukar informasi pribadi atau data CV Anda kepada pihak ketiga untuk tujuan pemasaran. Kami hanya membagikan data dalam kondisi berikut:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2.5 text-[14px] text-gray-500 font-medium leading-relaxed">
              <li>Kepada penyedia layanan pihak ketiga (seperti layanan hosting atau analitik web) yang membantu kami mengoperasikan situs web ini.</li>
              <li>Jika diwajibkan oleh hukum atau permintaan resmi dari pihak berwenang.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">Keamanan Data</h2>
            <p className="text-gray-500 text-[14px] font-medium leading-[1.8]">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi data pribadi dan CV Anda dari akses, perubahan, atau penghancuran yang tidak sah. Namun, perlu diingat bahwa tidak ada metode transmisi di internet yang 100% aman.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-[26px] font-bold text-[#7DCEF4] mb-5">Perubahan pada Kebijakan Privasi</h2>
            <p className="text-gray-500 text-[14px] font-medium leading-[1.8]">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Jika ada perubahan yang signifikan, kami akan memberitahukannya melalui peringatan di halaman utama website kami.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
