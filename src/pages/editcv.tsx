import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoCV from '../assets/logo.png'; // Pastikan path ini benar

const EditCV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.templateId || 1;

  const [formData, setFormData] = useState({ 
    fullName: '', 
    phone: '', 
    email: '', 
    address: '', 
    description: '' 
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // FIX: Menambahkan tipe data TypeScript agar tidak error merah
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => { if (currentStep < 5) setCurrentStep(currentStep + 1); };
  const handlePrevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col bg-sky-50 relative">
      {/* NAVBAR */}
      <nav className="bg-sky-400 px-8 py-4 flex items-center justify-between shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          {/* Menampilkan logoCV di dalam kotak putih */}
          <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center overflow-hidden">
            <img src={logoCV} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight uppercase">CV MAKER</span>
        </div>
        <div className="flex items-center gap-8 font-semibold text-slate-800">
          <Link to="/" className="hover:text-white transition text-sm">Home</Link>
          <Link to="#" className="hover:text-white transition text-sm">About us</Link>
          <Link to="/templates" className="hover:text-white transition text-sm">Template</Link>
          <Link to="/project" className="hover:text-white transition text-sm">Project</Link>
          
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-2 cursor-pointer group ml-4"
          >
            <div className="w-10 h-10 bg-white rounded-full border-2 border-slate-200 overflow-hidden group-hover:border-slate-400 transition shadow-sm">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <svg className="w-4 h-4 text-slate-800 group-hover:translate-y-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="grow max-w-[1400px] w-full mx-auto p-8 flex gap-8">
        {/* LEFT PANE - Form Area */}
        <div className="w-1/2 flex flex-col justify-between">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 grow">
            
            {/* STEP 1: Personal Profile */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Profile</h2>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Juliana Silvana" className="px-4 py-3 border-2 border-slate-100 rounded-xl outline-none focus:border-sky-400 transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+62..." className="px-4 py-3 border-2 border-slate-100 rounded-xl outline-none focus:border-sky-400 transition" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email</label>
                    <input name="email" value={formData.email} onChange={handleInputChange} placeholder="email@gmail.com" className="px-4 py-3 border-2 border-slate-100 rounded-xl outline-none focus:border-sky-400 transition" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Short Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} className="px-4 py-3 border-2 border-slate-100 rounded-xl outline-none focus:border-sky-400 transition resize-none" />
                </div>
              </div>
            )}

            {/* FIX: Mengganti spinner loading agar konten muncul di Step 2-5 */}
            {currentStep > 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Step {currentStep}</h2>
                <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center">
                   <p className="text-slate-500 font-medium">Konten untuk langkah ini akan segera hadir!</p>
                   <p className="text-xs text-slate-400 mt-2">Gunakan tombol di bawah untuk navigasi.</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button onClick={handlePrevStep} className="px-10 py-3 bg-white border-2 border-slate-800 font-bold rounded-xl hover:bg-slate-50 transition">
              {currentStep === 1 ? 'CANCEL' : 'PREVIOUS'}
            </button>
            <button onClick={handleNextStep} className="px-10 py-3 bg-sky-400 text-white font-bold rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-500 transition">
              {currentStep === 5 ? 'FINISH' : 'SAVE & CONTINUE'}
            </button>
          </div>
        </div>

        {/* RIGHT PANE - Live Preview */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-2">
               <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
               <span className="font-bold text-slate-500 uppercase text-xs">Live Preview : Template #{selectedTemplate}</span>
            </div>
            <button onClick={() => setShowDownloadModal(true)} className="bg-sky-400 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-sky-500 transition shadow-md shadow-sky-100">
              DOWNLOAD
            </button>
          </div>

          {/* KERTAS CV PREVIEW */}
          <div className="grow bg-white rounded-xl shadow-2xl border border-gray-100 p-16 min-h-[600px] origin-top scale-[0.98]">
            <div className="max-w-full">
              <h1 className="text-5xl font-extrabold text-gray-800 uppercase tracking-tighter mb-2">
                {formData.fullName || "YOUR FULL NAME"}
              </h1>
              <div className="flex gap-4 text-sm text-gray-500 font-bold border-b-4 border-gray-800 pb-6">
                <span>{formData.phone || "PHONE NUMBER"}</span>
                <span>•</span>
                <span>{formData.email || "EMAIL ADDRESS"}</span>
              </div>

              <div className="mt-10">
                <h3 className="font-black text-gray-800 text-xl border-b-2 border-gray-100 mb-4 uppercase tracking-widest">Profile</h3>
                <p className="text-md text-gray-600 font-medium leading-relaxed">
                  {formData.description || "Deskripsi yang Anda ketik akan muncul di sini secara otomatis..."}
                </p>
              </div>

              <div className="mt-10 space-y-8 opacity-20">
                <div>
                  <h3 className="font-black text-gray-800 text-xl border-b-2 border-gray-100 mb-4 uppercase tracking-widest">Experience</h3>
                  <div className="h-4 w-full bg-slate-200 rounded-full mb-2"></div>
                  <div className="h-4 w-5/6 bg-slate-100 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-xl border-b-2 border-gray-100 mb-4 uppercase tracking-widest">Education</h3>
                  <div className="h-4 w-3/4 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
           <p>© 2026 CV Maker. All Rights Reserved</p>
           <div className="flex gap-6">
              <span className="cursor-pointer hover:text-sky-400 transition">Instagram</span>
              <span className="cursor-pointer hover:text-sky-400 transition">Linkedin</span>
           </div>
        </div>
      </footer>

      {/* DOWNLOAD MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowDownloadModal(false)}></div>
          <div className="relative bg-white rounded-3xl p-12 w-[500px] shadow-2xl flex flex-col gap-8">
            <h2 className="text-4xl font-black text-slate-800 text-center uppercase tracking-tighter">Download CV</h2>
            <div className="space-y-2">
              <label className="font-bold text-slate-500 text-xs uppercase tracking-widest ml-1">File Name</label>
              <input 
                type="text" 
                defaultValue={`cv_${formData.fullName.replace(/\s/g, '_') || 'untitled'}`} 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 font-bold text-slate-700 outline-none focus:border-sky-400 transition" 
              />
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => { alert("Generating PDF..."); setShowDownloadModal(false); }} className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-lg shadow-xl shadow-sky-100 hover:bg-sky-500 transition uppercase tracking-widest">
                Confirm Download
              </button>
              <button onClick={() => setShowDownloadModal(false)} className="w-full bg-slate-50 text-slate-400 font-bold py-4 rounded-2xl hover:bg-slate-100 transition uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCV;