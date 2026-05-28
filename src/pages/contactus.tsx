import React, { useEffect, useState } from 'react';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Harap lengkapi semua field yang wajib diisi!");
      return;
    }
    
    setIsSubmitting(true);
    // Simulating network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full flex flex-col items-center pt-20 pb-32">
      {/* Header */}
      <h1 className="text-[40px] md:text-[56px] font-bold text-[#7DCEF4] mb-4 tracking-wide font-sans text-center px-4">
        Contact Us
      </h1>
      <p className="text-gray-500 font-medium text-sm md:text-base text-center max-w-[600px] mb-16 px-6">
        Ada pertanyaan, saran, atau masukan? Jangan ragu untuk menghubungi tim dukungan kami. Kami siap membantu Anda.
      </p>

      {/* Two Column Layout */}
      <div className="max-w-[1100px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info (Left) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
          <div className="bg-gradient-to-tr from-[#7DCEF4] to-[#BBE4FB] p-8 rounded-3xl text-white shadow-lg space-y-6">
            <h3 className="text-2xl font-bold mb-2">Informasi Kontak</h3>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              Hubungi kami melalui saluran resmi kami di bawah ini untuk respon yang lebih cepat.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs opacity-75 font-semibold">EMAIL</p>
                  <p className="text-sm font-semibold">support@cvmaker.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs opacity-75 font-semibold">TELEPON</p>
                  <p className="text-sm font-semibold">0812 4983 7470</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs opacity-75 font-semibold">ALAMAT</p>
                  <p className="text-sm font-semibold">Jl. Raya Utama No. 45, Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          {submitSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Pesan Terkirim!</h3>
              <p className="text-gray-500 text-sm max-w-[400px] mx-auto leading-relaxed font-medium">
                Terima kasih telah menghubungi kami. Tim kami akan segera meninjau pesan Anda dan membalas melalui email secepatnya.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-6 px-6 py-2.5 bg-[#7DCEF4] hover:bg-[#55B3EB] text-white font-semibold rounded-xl text-sm transition"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Kirim Pesan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-600">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7DCEF4] focus:border-transparent transition"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-600">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7DCEF4] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-gray-600">Subjek</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subjek pesan Anda"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7DCEF4] focus:border-transparent transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-gray-600">Pesan <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7DCEF4] focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#7DCEF4] hover:bg-[#55B3EB] text-white font-bold rounded-xl text-sm transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Pesan</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
