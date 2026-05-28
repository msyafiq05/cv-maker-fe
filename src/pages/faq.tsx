import { useEffect, useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "Bagaimana cara mengedit CV yang sudah dibuat?",
      answer: "Anda dapat mengedit CV Anda dengan masuk ke menu 'Project' di navbar, pilih draf CV yang ingin Anda ubah, lalu Anda akan diarahkan ke editor CV 5-langkah kami untuk memperbarui informasi Anda."
    },
    {
      question: "Apakah format CV di CV Maker ramah ATS (ATS-Friendly)?",
      answer: "Ya, template kami dirancang secara khusus dengan tata letak satu kolom dan struktur teks yang bersih untuk memastikan keterbacaan maksimal oleh Applicant Tracking Systems (ATS) yang digunakan oleh HRD perusahaan."
    },
    {
      question: "Bagaimana cara mengunduh CV dalam format PDF, PNG, atau JPG?",
      answer: "Setelah menyelesaikan langkah ke-5 di editor CV, klik tombol 'Download' di sudut kanan atas panel preview. Anda akan diberikan opsi untuk mengunduh dokumen dalam format PDF, JPG, maupun PNG."
    },
    {
      question: "Apakah data CV saya aman?",
      answer: "Tentu saja. Kami sangat menghargai privasi Anda. Semua data yang Anda masukkan disimpan dengan aman dan hanya digunakan untuk keperluan pembuatan CV Anda. Silakan baca Kebijakan Privasi kami untuk detail lebih lanjut."
    },
    {
      question: "Mengapa foto profil saya tidak muncul atau gagal diunggah?",
      answer: "Pastikan file foto Anda menggunakan format JPG, JPEG, atau PNG dengan ukuran maksimal 2MB. Di langkah pertama editor CV, Anda juga dapat memotong (crop) foto Anda menggunakan alat pemotong interaktif kami agar ukurannya pas."
    },
    {
      question: "Apakah layanan pembuatan CV ini berbayar?",
      answer: "Layanan dasar pembuatan CV di platform kami sepenuhnya gratis untuk membantu profesional dan lulusan baru dalam membangun karir impian mereka."
    }
  ];

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full flex flex-col items-center pt-20 pb-32">
      {/* Header */}
      <h1 className="text-[40px] md:text-[56px] font-bold text-[#7DCEF4] mb-4 tracking-wide font-sans text-center px-4">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base text-center max-w-[600px] mb-12 px-6">
        Punya pertanyaan seputar penggunaan CV Maker? Temukan jawaban untuk pertanyaan umum di bawah ini.
      </p>

      {/* Accordion Container */}
      <div className="max-w-[800px] w-full mx-auto px-6 space-y-4">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index}
              className="border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-semibold text-gray-800 text-[15px] md:text-[17px] leading-snug">
                  {item.question}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-[#7DCEF4] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#7DCEF4] text-white' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-gray-50' : 'max-h-0'}`}
              >
                <p className="px-6 py-5 text-gray-600 text-[14px] md:text-[15px] leading-relaxed font-medium">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
