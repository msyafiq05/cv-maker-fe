import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CvPreview } from '../components/CvPreview';

const DownloadCv: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        {/* Left Side: Success & Download Guide */}
        <div className="w-1/2 flex flex-col h-full justify-between">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 flex flex-col items-center justify-center text-center space-y-6">
            
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-gray-900">CV Anda Siap!</h2>
              <p className="text-gray-500 text-sm max-w-[400px] mx-auto leading-relaxed font-medium">
                Semua data Anda telah tersimpan dengan aman. Gunakan panel di sebelah kanan untuk memilih jenis huruf, ukuran font, jarak baris, atau langsung klik tombol **DOWNLOAD** untuk mengunduh CV Anda.
              </p>
            </div>

            <div className="w-full max-w-[400px] p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Langkah Selanjutnya:</h4>
              <div className="flex gap-3 text-xs font-medium text-gray-600">
                <span className="w-5 h-5 rounded-full bg-[#5BBAED] text-white flex items-center justify-center shrink-0">1</span>
                <span>Sesuaikan font & ukuran di kanan agar sesuai keinginan Anda.</span>
              </div>
              <div className="flex gap-3 text-xs font-medium text-gray-600">
                <span className="w-5 h-5 rounded-full bg-[#5BBAED] text-white flex items-center justify-center shrink-0">2</span>
                <span>Klik tombol **DOWNLOAD** biru di sudut kanan atas panel preview.</span>
              </div>
              <div className="flex gap-3 text-xs font-medium text-gray-600">
                <span className="w-5 h-5 rounded-full bg-[#5BBAED] text-white flex items-center justify-center shrink-0">3</span>
                <span>Masukkan nama berkas dan pilih format (PDF, PNG, atau JPG).</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <button 
              onClick={() => navigate('/edit/step5')} 
              className="w-[180px] py-3.5 bg-white border border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm text-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              EDIT KEMBALI
            </button>
            <button 
              onClick={() => navigate('/project')} 
              className="grow py-3.5 bg-[#5BBAED] text-white font-bold rounded-lg shadow-md hover:bg-sky-400 transition text-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              SELESAI & DASHBOARD
            </button>
          </div>
        </div>

        {/* Right Side: Reusable Preview */}
        <CvPreview />
      </div>
    </div>
  );
};

export default DownloadCv;
