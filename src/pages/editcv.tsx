import { useState } from 'react';
import { Link } from 'react-router-dom';

const EditCV = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const InputField = ({ label, placeholder, type = "text", className = "" }: { label: string, placeholder: string, type?: string, className?: string }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-bold text-gray-800">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-gray-400"
      />
    </div>
  );

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Profile</h2>
            <div className="space-y-4">
              <InputField label="Full Name" placeholder="Enter full name : Juliana Silvana" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Telephone Number" placeholder="Enter your mobile : +62123 etc." />
                <InputField label="Email Addres" placeholder="Enter email: juliana@gmail.com" type="email" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Place Of Birth" placeholder="Enter place of birth: Jakarta" />
                <InputField label="Date Of Birth" placeholder="Enter date of birth: 01-January-2000" />
              </div>
              <InputField label="Address (optional)" placeholder="Enter Address: Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
              <InputField label="Website URL/Linkedin Profile URL (optional)" placeholder="Enter linkedin profile ULR/website URL : https://www.linkedin.com/company/CVMakker." />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">Short Description About Yourself</label>
                  <textarea 
                    placeholder="Enter a short description : CV Maker is a tool (app or website) that makes it easy for users to create a professional Curriculum Vitae (CV) quickly, often for free, using a variety of ready-made templates. (Max : 100 characters)"
                    className="h-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-gray-400 resize-none"
                    rows={4}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">Photo</label>
                  <div className="grow border border-gray-300 rounded-md flex items-center justify-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-300 rounded-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                      </div>
                      <div className="text-xs text-gray-500">
                        <p><span className="font-bold text-gray-700">Drag or upload</span> your</p>
                        <p>photo here.</p>
                        <p>Dimension: 240x240 px</p>
                        <p>Format: jpg, jpeg, png</p>
                        <p>Max Size: 2MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Work Experiences</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Company Name" placeholder="Enter company name : CV Maker" />
                <InputField label="Job/Internship/Role Title" placeholder="Enter job/internship/role title : Manager" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Start Year" placeholder="Enter start year : 2000" />
                <InputField label="End Year" placeholder="Enter end year : 2000/-" />
              </div>
              <InputField label="Company Location (City, Country)" placeholder="Enter company location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-800">Company Description (optional)</label>
                <textarea 
                  placeholder="Enter a short description : CV Maker is a tool (app or website) that makes it easy for users to create a professional Curriculum Vitae (CV) quickly, often for free, using a variety of ready-made templates."
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-gray-400 resize-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Education Level</h2>
            <div className="space-y-4">
              <InputField label="School Name" placeholder="Enter school : University of Indonesia" />
              <InputField label="School Location (City, Country)" placeholder="Enter school location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Start (Year)" placeholder="Enter start year : 2000" />
                <InputField label="End (Year)" placeholder="Enter end year : 2000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Education Level" placeholder="Enter education level" />
                <InputField label="GPA (optional)" placeholder="Enter GPA : 3,8" />
              </div>
              <InputField label="Description (optional)" placeholder="Enter description : Graduated with satisfactory grades, Successfully won a championship, and Completed the final assignment with satisfactory results" />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Organizational Experience</h2>
            <div className="space-y-4">
              <InputField label="Organisation/Event Name" placeholder="Enter organisation/event name : Band" />
              <InputField label="Your Role/Position Title" placeholder="Enter your role/position title : Project office" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <InputField label="Start (Year)" placeholder="Enter start year : 2000" />
                  <InputField label="End (Year)" placeholder="Enter end year : 2000" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">Organisation Description (Optional)</label>
                  <textarea 
                    placeholder="Enter description organisation : CV Maker is a technology platform specializing in career development and recruitment. Our primary focus is providing innovative solutions for creating professional"
                    className="h-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>
              </div>
              <InputField label="Activity/Event/Organisation Location (City, Country)" placeholder="Enter activity/event/organisation/location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills, Achievements & Other Experience</h2>
            <div className="space-y-4">
              <InputField label="Category/Project/Activity" placeholder="Enter Category/project/activity" />
              <InputField label="Year" placeholder="Enter start year : 2000" />
              <InputField label="Elaboration" placeholder="Enter Elaboration" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col bg-sky-50 relative">
      {/* NAVBAR */}
      <nav className="bg-sky-400 px-8 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center text-white font-bold text-xl italic">
            CV
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">CV MAKER</span>
        </div>
        <div className="flex items-center gap-8 font-semibold text-slate-800">
          <Link to="/" className="hover:text-white transition text-sm">Home</Link>
          <Link to="#" className="hover:text-white transition text-sm">About us</Link>
          <Link to="/templates" className="hover:text-white transition text-sm">Template</Link>
          <Link to="/project" className="hover:text-white transition text-sm">Project</Link>
          <div className="flex items-center gap-2 cursor-pointer ml-4">
            <div className="w-9 h-9 bg-white rounded-full border-2 border-slate-200"></div>
            <svg className="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="grow max-w-350 w-full mx-auto p-8 flex gap-8">
        
        {/* LEFT PANE - Form Area */}
        <div className="w-1/2 flex flex-col justify-between">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 grow">
            {renderFormStep()}

            {/* Add Experience Button */}
            {currentStep > 1 && (
              <button className="w-full mt-6 border-2 border-dashed border-sky-600 rounded-lg py-3 px-4 flex items-center justify-between text-sky-700 font-bold hover:bg-sky-50 transition group">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  <span>Add experience</span>
                </div>
                <svg className="w-5 h-5 text-red-500 opacity-80 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button 
              onClick={handlePrevStep}
              className="px-8 py-3 bg-white border border-gray-800 text-gray-800 font-bold rounded-md hover:bg-gray-50 transition"
            >
              CANCEL
            </button>
            <button 
              onClick={handleNextStep}
              className="px-8 py-3 bg-sky-400 text-white font-bold rounded-md hover:bg-sky-500 transition shadow-md shadow-sky-200"
            >
              SAVE & CONTINUE
            </button>
          </div>
        </div>

        {/* RIGHT PANE - Preview Area */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer text-gray-800 font-semibold text-sm">
                <span className="font-serif text-lg leading-none">A<span className="text-xs">A</span></span>
                <span>Arial</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="flex items-center gap-2 cursor-pointer text-gray-800 font-semibold text-sm">
                <span className="font-serif text-lg font-bold">T</span>
                <span>Small</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="flex items-center gap-2 cursor-pointer text-gray-800 font-semibold text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                <span>14</span>
                <div className="flex flex-col">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="bg-sky-400 text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-sky-500 transition shadow-md shadow-sky-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              DOWNLOAD
            </button>
          </div>

          {/* Sub-toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-8 border border-gray-100">
             <div className="flex items-center gap-3 cursor-pointer text-gray-800 font-bold text-sm">
                <div className="w-6 h-6 bg-black rounded-full"></div>
                <span>Header and Line</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </div>
             <div className="flex items-center gap-3 cursor-pointer text-gray-800 font-bold text-sm">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                <span>Left</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </div>
          </div>

          {/* Paper Preview */}
          <div className="grow bg-white rounded-xl shadow-sm border border-gray-100 min-h-150">
            {/* Tempat preview CV nanti ditaruh disini */}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-sky-400 text-white pt-12 pb-6 border-t border-sky-300">
        <div className="max-w-350 mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center font-bold italic">CV</div>
              <span className="text-xl font-bold italic tracking-tighter">CV MAKER</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed italic">
              Helping professionals build their careers through compelling resumes.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Product</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="#" className="hover:text-white transition">CV Templates</Link></li>
              <li><Link to="#" className="hover:text-white transition">Preview</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="#" className="hover:text-white transition">ATS-Friendly tips</Link></li>
              <li><Link to="#" className="hover:text-white transition">Design Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms Of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-350 mx-auto px-8 border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-80">© 2026 CV Maker. All Right Reserved</p>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-sky-400 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer">ig</div>
            <div className="w-8 h-8 rounded-full bg-white text-sky-400 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer">in</div>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-black transition cursor-pointer">X</div>
          </div>
        </div>
      </footer>

      {/* MODAL DOWNLOAD */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay Gelap */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowDownloadModal(false)}
          ></div>
          
          {/* Modal Box */}
          <div className="relative bg-sky-300 rounded-2xl p-10 w-125 shadow-2xl flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2 tracking-wide">DOWNLOAD CV</h2>
            
            <div className="flex items-center justify-between gap-4">
              <label className="text-xl font-bold text-gray-800 w-1/3">File Name :</label>
              <input 
                type="text" 
                defaultValue="cv_NamaLengkap"
                className="grow px-4 py-3 rounded-lg border-2 border-gray-700 font-medium text-gray-700 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <label className="text-xl font-bold text-gray-800 w-1/3">File Type :</label>
              <div className="relative grow">
                <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 font-medium text-gray-700 focus:outline-none appearance-none cursor-pointer">
                  <option>.jpg</option>
                  <option>.png</option>
                  <option>.pdf</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="bg-sky-400 text-gray-800 font-bold px-6 py-2.5 rounded-md hover:bg-sky-500 transition shadow-sm"
              >
                BATALKAN
              </button>
              <button 
                onClick={() => {
                  alert("File downloading...");
                  setShowDownloadModal(false);
                }}
                className="bg-sky-400 text-gray-800 font-bold px-6 py-2.5 rounded-md hover:bg-sky-500 transition flex items-center gap-2 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                DOWNLOAD
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditCV;