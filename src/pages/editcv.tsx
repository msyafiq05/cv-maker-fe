import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @ts-ignore
import html2pdf from 'html2pdf.js';

const EditCV = () => {
  const location = useLocation();
  const selectedTemplate = location.state?.templateId || 1;

  const [formData, setFormData] = useState({ 
    fullName: '', 
    phone: '', 
    email: '', 
    address: '', 
    description: '',
    education: '',
    experience: '',
    skills: '',
    certificates: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => { if (currentStep < 5) setCurrentStep(currentStep + 1); };
  const handlePrevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const downloadPDF = () => {
    const element = document.getElementById('cv-paper');
    
    if (!element) return;

    const finalFileName = fileName ? `${fileName}.pdf` : `CV_${formData.fullName.replace(/\s/g, '_') || 'Untitled'}.pdf`;

    // FIX: Menggunakan 'as const' agar TypeScript tidak komplain soal tipe data
    const options = {
      margin: 0,
      filename: finalFileName,
      image: { type: 'jpeg', quality: 0.98 } as const,
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true 
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' as const
      }
    };

    html2pdf().set(options).from(element).save();
    setShowDownloadModal(false);
  };

  return (
    <div className="bg-sky-50 w-full grow flex flex-col relative py-8">
      <div className="grow max-w-350 w-full mx-auto px-8 flex gap-8">
        
        <div className="w-1/2 flex flex-col justify-between">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 grow">
            
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tighter italic">Personal Profile</h2>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="King Raja" className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition font-bold text-slate-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="08..." className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition font-bold text-slate-700" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input name="email" value={formData.email} onChange={handleInputChange} placeholder="email@gmail.com" className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition font-bold text-slate-700" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition resize-none font-bold text-slate-700" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tighter italic">Education</h2>
                <textarea name="education" value={formData.education} onChange={handleInputChange} rows={12} placeholder="School/University details..." className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition resize-none font-bold text-slate-700" />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tighter italic">Experience</h2>
                <textarea name="experience" value={formData.experience} onChange={handleInputChange} rows={12} placeholder="Work or Organization history..." className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition resize-none font-bold text-slate-700" />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tighter italic">Skills</h2>
                <textarea name="skills" value={formData.skills} onChange={handleInputChange} rows={12} placeholder="- Your best skills..." className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition resize-none font-bold text-slate-700" />
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tighter italic">Certificates</h2>
                <textarea name="certificates" value={formData.certificates} onChange={handleInputChange} rows={12} placeholder="- Achievement details..." className="px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition resize-none font-bold text-slate-700" />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button onClick={handlePrevStep} className="px-10 py-4 bg-white border-4 border-slate-800 font-black rounded-2xl hover:bg-slate-50 transition uppercase tracking-widest text-xs">
              {currentStep === 1 ? 'CANCEL' : 'PREVIOUS'}
            </button>
            <button onClick={handleNextStep} className="px-10 py-4 bg-sky-400 text-white font-black rounded-2xl shadow-xl shadow-sky-100 hover:bg-sky-500 transition uppercase tracking-widest text-xs">
              {currentStep === 5 ? 'FINISH' : 'SAVE & CONTINUE'}
            </button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-2">
               <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
               <span className="font-bold text-slate-400 uppercase text-[10px] tracking-[0.2em]">Live Preview: Template #{selectedTemplate}</span>
            </div>
            <button onClick={() => setShowDownloadModal(true)} className="bg-sky-400 text-white px-8 py-2.5 rounded-xl font-black text-xs hover:bg-sky-500 transition shadow-lg shadow-sky-100 uppercase tracking-widest">
              DOWNLOAD
            </button>
          </div>

          <div className="grow bg-slate-200 rounded-2xl p-8 overflow-y-auto max-h-200 flex justify-center">
            <div id="cv-paper" className="bg-white p-12 shadow-2xl w-148.75 min-h-210.5 origin-top">
                <h1 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-1">
                    {formData.fullName || "YOUR NAME"}
                </h1>
                <div className="flex gap-4 text-[10px] text-slate-400 font-black border-b-4 border-slate-800 pb-4 mb-10 uppercase tracking-widest">
                    <span>{formData.phone || "00000000"}</span>
                    <span>•</span>
                    <span>{formData.email || "email@address.com"}</span>
                </div>

                <div className="space-y-10">
                    <section>
                        <h3 className="font-black text-slate-800 text-sm border-b-2 border-slate-100 mb-3 uppercase tracking-[0.3em]">Profile</h3>
                        <p className="text-[12px] text-slate-600 font-bold leading-relaxed whitespace-pre-line">{formData.description || "Details..."}</p>
                    </section>
                    <section className={!formData.education ? 'opacity-20' : ''}>
                        <h3 className="font-black text-slate-800 text-sm border-b-2 border-slate-100 mb-3 uppercase tracking-[0.3em]">Education</h3>
                        <p className="text-[12px] text-slate-600 font-bold leading-relaxed whitespace-pre-line">{formData.education || "History..."}</p>
                    </section>
                    <section className={!formData.experience ? 'opacity-20' : ''}>
                        <h3 className="font-black text-slate-800 text-sm border-b-2 border-slate-100 mb-3 uppercase tracking-[0.3em]">Experience</h3>
                        <p className="text-[12px] text-slate-600 font-bold leading-relaxed whitespace-pre-line">{formData.experience || "History..."}</p>
                    </section>
                    <section className={!formData.skills ? 'opacity-20' : ''}>
                        <h3 className="font-black text-slate-800 text-sm border-b-2 border-slate-100 mb-3 uppercase tracking-[0.3em]">Skills</h3>
                        <p className="text-[12px] text-slate-600 font-bold leading-relaxed whitespace-pre-line">{formData.skills || "List..."}</p>
                    </section>
                </div>
            </div>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowDownloadModal(false)}></div>
          <div className="relative bg-white rounded-[40px] p-12 w-125 shadow-2xl flex flex-col gap-8">
            <div className="text-center">
                <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter italic">Export PDF</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Ready to download your CV, King?</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">File Name</label>
              <input 
                type="text" 
                placeholder="My_Awesome_CV"
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:border-sky-400 focus:bg-white transition" 
              />
            </div>
            <button onClick={downloadPDF} className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-lg hover:bg-sky-500 transition uppercase tracking-widest shadow-2xl shadow-sky-200">
              Confirm & Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCV;