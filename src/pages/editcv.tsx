import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @ts-ignore
import html2pdf from 'html2pdf.js';

// SVG Icons
const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const ImageIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

// Generic Input Component
const InputField = ({ label, name, value, onChange, placeholder = "", type = "text" }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-gray-800">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} 
           className="px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition text-[11px] text-gray-700 placeholder-gray-400 font-medium" />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder = "", rows = 4 }: any) => (
  <div className="flex flex-col gap-1.5 h-full">
    <label className="text-[10px] font-bold text-gray-800">{label}</label>
    <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows}
           className="px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition text-[11px] text-gray-700 placeholder-gray-400 resize-none h-full font-medium" />
  </div>
);
const EditCV = () => {
  const location = useLocation();
  const selectedTemplate = location.state?.templateId || 1;

  const [currentStep, setCurrentStep] = useState(1);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('pdf');

  // Form State
  const [profile, setProfile] = useState({
    fullName: '', phone: '', email: '', placeOfBirth: '', dateOfBirth: '', address: '', website: '', description: ''
  });
  
  const [experiences, setExperiences] = useState([{ id: Date.now().toString(), companyName: '', role: '', startYear: '', endYear: '', location: '', description: '' }]);
  const [educations, setEducations] = useState([{ id: Date.now().toString(), schoolName: '', location: '', startYear: '', endYear: '', level: '', gpa: '', description: '' }]);
  const [organizations, setOrganizations] = useState([{ id: Date.now().toString(), orgName: '', role: '', startYear: '', endYear: '', location: '', description: '' }]);
  const [skills, setSkills] = useState([{ id: Date.now().toString(), category: '', year: '', elaboration: '' }]);

  // Handlers for Profile
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handlers for Dynamic Lists
  const handleDynamicChange = (setter: any, index: number, field: string, value: string) => {
    setter((prev: any[]) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const addField = (setter: any, defaultObj: any) => {
    setter((prev: any[]) => [...prev, { id: Date.now().toString(), ...defaultObj }]);
  };

  const removeField = (setter: any, index: number) => {
    setter((prev: any[]) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleNextStep = () => { if (currentStep < 5) setCurrentStep(currentStep + 1); };
  const handlePrevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const downloadPDF = () => {
    const element = document.getElementById('cv-paper');
    if (!element) return;
    const finalFileName = fileName ? `${fileName}.${fileType}` : `CV_${profile.fullName.replace(/\s/g, '_') || 'Untitled'}.${fileType}`;
    
    // Simplification: only handling PDF format options.
    const options = {
      margin: 0,
      filename: finalFileName,
      image: { type: 'jpeg', quality: 0.98 } as const,
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(options).from(element).save();
    setShowDownloadModal(false);
  };



  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        
        {/* Left Side: Forms */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 overflow-hidden flex flex-col relative">
            
            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <div className="h-full flex flex-col relative">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Complete Your Profile</h2>
                <div className="space-y-5 overflow-y-auto pr-2 pb-6">
                  <InputField label="Full Name" name="fullName" value={profile.fullName} onChange={handleProfileChange} placeholder="Enter full name : Juliana Silvana" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Telephone Number" name="phone" value={profile.phone} onChange={handleProfileChange} placeholder="Enter your mobile : +62123 etc." />
                    <InputField label="Email Address" name="email" value={profile.email} onChange={handleProfileChange} placeholder="Enter email: juliana@gmail.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Place Of Birth" name="placeOfBirth" value={profile.placeOfBirth} onChange={handleProfileChange} placeholder="Enter place of birth: Jakarta" />
                    <InputField label="Date Of Birth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleProfileChange} placeholder="Enter date of birth: 01-January-2000" />
                  </div>
                  <InputField label="Address (optional)" name="address" value={profile.address} onChange={handleProfileChange} placeholder="Enter Address: Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
                  <InputField label="Website URL/LinkedIn Profile URL (optional)" name="website" value={profile.website} onChange={handleProfileChange} placeholder="Enter linkedin profile URL/website URL : https://www.linkedin.com/company/CVMaker." />
                  
                  <div className="grid grid-cols-2 gap-4 items-stretch h-40">
                    <TextAreaField label="Short Description About Yourself" name="description" value={profile.description} onChange={handleProfileChange} 
                      placeholder="Enter a short description : CV Maker is a tool (app or website) that makes it easy for users to create a professional Curriculum Vitae (CV) quickly, often for free, using a variety of ready-made templates. (Max : 100 characters)" rows={5} />
                    <div className="flex flex-col gap-1.5 h-full">
                      <label className="text-[10px] font-bold text-gray-800">Photo</label>
                      <div className="border border-gray-300 rounded-md flex items-center justify-center bg-gray-50 h-full p-4 flex-col gap-2 text-center cursor-pointer hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                           <ImageIcon />
                           <div className="text-left">
                             <p className="text-xs font-bold text-gray-800">Drag or upload <span className="font-normal text-gray-500">your</span></p>
                             <p className="text-[10px] text-gray-500">photo here.</p>
                             <p className="text-[10px] text-gray-400 mt-1">Dimension: 240x240 px;<br/>Format: jpg, jpeg, png<br/>Max Size: 2MB</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Work Experiences */}
            {currentStep === 2 && (
              <div className="h-full flex flex-col relative">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Work Experiences</h2>
                <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow relative">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="space-y-5 relative">
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Company Name" value={exp.companyName} onChange={(e: any) => handleDynamicChange(setExperiences, index, 'companyName', e.target.value)} placeholder="Enter company name : CV Maker" />
                        <InputField label="Job/Internship/Role Title" value={exp.role} onChange={(e: any) => handleDynamicChange(setExperiences, index, 'role', e.target.value)} placeholder="Enter job/internship/role title : Manager" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Start Year" value={exp.startYear} onChange={(e: any) => handleDynamicChange(setExperiences, index, 'startYear', e.target.value)} placeholder="Enter start year : 2000" />
                        <InputField label="End Year" value={exp.endYear} onChange={(e: any) => handleDynamicChange(setExperiences, index, 'endYear', e.target.value)} placeholder="Enter end year : 2000/-" />
                      </div>
                      <InputField label="Company Location (City, Country)" value={exp.location} onChange={(e: any) => handleDynamicChange(setExperiences, index, 'location', e.target.value)} placeholder="Enter company location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
                      <TextAreaField label="Company Description (optional)" value={exp.description} onChange={(e: any) => handleDynamicChange(setExperiences, index, 'description', e.target.value)} 
                        placeholder="Enter a short description : CV Maker is a tool (app or website) that makes it easy for users to create a professional Curriculum Vitae (CV) quickly, often for free, using a variety of ready-made templates." rows={4} />
                      {experiences.length > 1 && (
                        <div className="w-full flex justify-end mt-2"><button onClick={() => removeField(setExperiences, index)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[10px] font-bold"><TrashIcon /> Remove</button></div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Fixed Add Button at bottom of container */}
                <div className="pt-4 mt-auto border-t border-transparent bg-white w-full">
                  <button onClick={() => addField(setExperiences, { companyName: '', role: '', startYear: '', endYear: '', location: '', description: '' })} 
                    className="w-full border-2 border-dashed border-[#2b85a3] text-[#2b85a3] font-bold py-3.5 rounded-md flex items-center justify-between px-6 hover:bg-sky-50 transition">
                    <div className="flex items-center gap-2"><PlusIcon /> <span className="text-sm">Add experience</span></div>
                    <span className="text-red-500"><TrashIcon /></span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <div className="h-full flex flex-col relative">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Education Level</h2>
                <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow">
                  {educations.map((edu, index) => (
                    <div key={edu.id} className="space-y-5 relative">
                      <InputField label="School Name" value={edu.schoolName} onChange={(e: any) => handleDynamicChange(setEducations, index, 'schoolName', e.target.value)} placeholder="Enter school : University of Indonesia" />
                      <InputField label="School Location (City, Country)" value={edu.location} onChange={(e: any) => handleDynamicChange(setEducations, index, 'location', e.target.value)} placeholder="Enter school location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Start (Year)" value={edu.startYear} onChange={(e: any) => handleDynamicChange(setEducations, index, 'startYear', e.target.value)} placeholder="Enter start year : 2000" />
                        <InputField label="End (Year)" value={edu.endYear} onChange={(e: any) => handleDynamicChange(setEducations, index, 'endYear', e.target.value)} placeholder="Enter end year : 2000" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Education Level" value={edu.level} onChange={(e: any) => handleDynamicChange(setEducations, index, 'level', e.target.value)} placeholder="Enter education level" />
                        <InputField label="GPA (optional)" value={edu.gpa} onChange={(e: any) => handleDynamicChange(setEducations, index, 'gpa', e.target.value)} placeholder="Enter GPA : 3.8" />
                      </div>
                      <TextAreaField label="Description (optional)" value={edu.description} onChange={(e: any) => handleDynamicChange(setEducations, index, 'description', e.target.value)} 
                        placeholder="Enter description : Graduated with satisfactory grades, Successfully won a championship, and Completed the final assignment with satisfactory results" rows={3} />
                      {educations.length > 1 && (
                        <div className="w-full flex justify-end mt-2"><button onClick={() => removeField(setEducations, index)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[10px] font-bold"><TrashIcon /> Remove</button></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-auto border-t border-transparent bg-white w-full">
                  <button onClick={() => addField(setEducations, { schoolName: '', location: '', startYear: '', endYear: '', level: '', gpa: '', description: '' })} 
                    className="w-full border-2 border-dashed border-[#2b85a3] text-[#2b85a3] font-bold py-3.5 rounded-md flex items-center justify-between px-6 hover:bg-sky-50 transition">
                    <div className="flex items-center gap-2"><PlusIcon /> <span className="text-sm">Add experience</span></div>
                    <span className="text-red-500"><TrashIcon /></span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Organizations */}
            {currentStep === 4 && (
              <div className="h-full flex flex-col relative">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Organizational Experience</h2>
                <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow">
                  {organizations.map((org, index) => (
                    <div key={org.id} className="space-y-5 relative">
                      <InputField label="Organization/Event Name" value={org.orgName} onChange={(e: any) => handleDynamicChange(setOrganizations, index, 'orgName', e.target.value)} placeholder="Enter organization/Event name : Band" />
                      <InputField label="Your Role/Position Title" value={org.role} onChange={(e: any) => handleDynamicChange(setOrganizations, index, 'role', e.target.value)} placeholder="Enter your role/position title : Project office" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-5">
                          <InputField label="Start (Year)" value={org.startYear} onChange={(e: any) => handleDynamicChange(setOrganizations, index, 'startYear', e.target.value)} placeholder="Enter start year : 2000" />
                          <InputField label="End (Year)" value={org.endYear} onChange={(e: any) => handleDynamicChange(setOrganizations, index, 'endYear', e.target.value)} placeholder="Enter end year : 2000" />
                        </div>
                        <TextAreaField label="Organization Description (Optional)" value={org.description} onChange={(e: any) => handleDynamicChange(setOrganizations, index, 'description', e.target.value)} 
                          placeholder="Enter description organization : CV Maker is a technology platform specializing in career development and recruitment. Our primary focus is providing innovative solutions for creating professional" rows={5} />
                      </div>
                      <InputField label="Activity/Event/Organization Location (City, Country)" value={org.location} onChange={(e: any) => handleDynamicChange(setOrganizations, index, 'location', e.target.value)} placeholder="Enter activity/event/organization location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" />
                      {organizations.length > 1 && (
                        <div className="w-full flex justify-end mt-2"><button onClick={() => removeField(setOrganizations, index)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[10px] font-bold"><TrashIcon /> Remove</button></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-auto border-t border-transparent bg-white w-full">
                  <button onClick={() => addField(setOrganizations, { orgName: '', role: '', startYear: '', endYear: '', location: '', description: '' })} 
                    className="w-full border-2 border-dashed border-[#2b85a3] text-[#2b85a3] font-bold py-3.5 rounded-md flex items-center justify-between px-6 hover:bg-sky-50 transition">
                    <div className="flex items-center gap-2"><PlusIcon /> <span className="text-sm">Add experience</span></div>
                    <span className="text-red-500"><TrashIcon /></span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Skills */}
            {currentStep === 5 && (
              <div className="h-full flex flex-col relative">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Skills, Achievements & Other Experience</h2>
                <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="space-y-5 relative">
                      <InputField label="Category/Project/Activity" value={skill.category} onChange={(e: any) => handleDynamicChange(setSkills, index, 'category', e.target.value)} placeholder="Enter Category/project/activity" />
                      <InputField label="Year" value={skill.year} onChange={(e: any) => handleDynamicChange(setSkills, index, 'year', e.target.value)} placeholder="Enter start year : 2000" />
                      <TextAreaField label="Elaboration" value={skill.elaboration} onChange={(e: any) => handleDynamicChange(setSkills, index, 'elaboration', e.target.value)} placeholder="Enter Elaboration" rows={3} />
                      {skills.length > 1 && (
                        <div className="w-full flex justify-end mt-2"><button onClick={() => removeField(setSkills, index)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[10px] font-bold"><TrashIcon /> Remove</button></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-auto border-t border-transparent bg-white w-full">
                  <button onClick={() => addField(setSkills, { category: '', year: '', elaboration: '' })} 
                    className="w-full border-2 border-dashed border-[#2b85a3] text-[#2b85a3] font-bold py-3.5 rounded-md flex items-center justify-between px-6 hover:bg-sky-50 transition">
                    <div className="flex items-center gap-2"><PlusIcon /> <span className="text-sm">Add experience</span></div>
                    <span className="text-red-500"><TrashIcon /></span>
                  </button>
                </div>
              </div>
            )}

          </div>

          <div className="flex justify-between items-center gap-4">
            <button onClick={handlePrevStep} className="w-[180px] py-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-50 transition shadow-sm text-sm">
              CANCEL
            </button>
            <button onClick={handleNextStep} className="grow py-3 bg-[#5BBAED] text-white font-bold rounded-md shadow-sm hover:bg-sky-400 transition text-sm">
              SAVE & CONTINUE
            </button>
          </div>
        </div>

        {/* Right Side: Preview & Toolbar */}
        <div className="w-1/2 flex flex-col gap-4 h-full">
          
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-5">
               <div className="flex items-center gap-2 text-sm font-bold text-gray-700 border-r border-gray-200 pr-5 cursor-pointer">
                 <span className="font-serif italic font-medium">A<span className="text-[10px]">A</span></span> Arial <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-700 border-r border-gray-200 pr-5 cursor-pointer">
                 <span className="font-serif italic font-medium">T<span className="text-[10px]">T</span></span> Small <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer">
                 <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                 14 <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
               </div>
            </div>
            <button onClick={() => setShowDownloadModal(true)} className="bg-[#D1EEF9] text-sky-700 px-6 py-2.5 rounded-md font-bold text-[11px] hover:bg-[#bde5f5] transition flex items-center gap-2 tracking-wide uppercase">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> DOWNLOAD
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center gap-6 border border-gray-100">
             <div className="flex items-center gap-3 text-sm font-bold text-gray-800 border-r border-gray-200 pr-6 cursor-pointer">
                 <div className="w-6 h-6 bg-black rounded-full"></div>
                 Header and Line <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </div>
             <div className="flex items-center gap-3 text-sm font-bold text-gray-700 cursor-pointer">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                 Left <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
             </div>
          </div>

          <div className="grow border-4 border-[#2b85a3] bg-white rounded-md overflow-y-auto flex flex-col items-center">
            {/* Minimalist Preview Paper mapping structured data */}
            <div id="cv-paper" className="bg-white p-12 w-full max-w-[800px] min-h-[1000px]">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.fullName || "Your Full Name"}</h1>
                <div className="flex gap-2 text-xs text-gray-600 mb-8">
                    {profile.phone && <span>{profile.phone}</span>}
                    {profile.phone && profile.email && <span>•</span>}
                    {profile.email && <span>{profile.email}</span>}
                    {(profile.phone || profile.email) && profile.address && <span>•</span>}
                    {profile.address && <span>{profile.address}</span>}
                </div>

                <div className="space-y-8">
                    {profile.description && (
                      <section>
                          <h3 className="font-bold text-gray-800 text-sm border-b-2 border-black pb-1 mb-3 uppercase">Profile</h3>
                          <p className="text-xs text-gray-700 leading-relaxed">{profile.description}</p>
                      </section>
                    )}

                    {experiences.some(e => e.companyName) && (
                      <section>
                          <h3 className="font-bold text-gray-800 text-sm border-b-2 border-black pb-1 mb-3 uppercase">Work Experience</h3>
                          {experiences.filter(e => e.companyName).map((exp, i) => (
                            <div key={i} className="mb-4">
                               <div className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                                 <span>{exp.role} - {exp.companyName}</span>
                                 <span className="text-[11px] text-gray-600">{exp.startYear} {exp.endYear && `- ${exp.endYear}`}</span>
                               </div>
                               {exp.location && <p className="text-[11px] text-gray-500 italic mb-2">{exp.location}</p>}
                               <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                            </div>
                          ))}
                      </section>
                    )}

                    {educations.some(e => e.schoolName) && (
                      <section>
                          <h3 className="font-bold text-gray-800 text-sm border-b-2 border-black pb-1 mb-3 uppercase">Education</h3>
                          {educations.filter(e => e.schoolName).map((edu, i) => (
                            <div key={i} className="mb-4">
                               <div className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                                 <span>{edu.level} - {edu.schoolName}</span>
                                 <span className="text-[11px] text-gray-600">{edu.startYear} {edu.endYear && `- ${edu.endYear}`}</span>
                               </div>
                               {edu.location && <p className="text-[11px] text-gray-500 italic mb-2">{edu.location} {edu.gpa && `| GPA: ${edu.gpa}`}</p>}
                               <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">{edu.description}</p>
                            </div>
                          ))}
                      </section>
                    )}

                    {organizations.some(o => o.orgName) && (
                      <section>
                          <h3 className="font-bold text-gray-800 text-sm border-b-2 border-black pb-1 mb-3 uppercase">Organizational Experience</h3>
                          {organizations.filter(o => o.orgName).map((org, i) => (
                            <div key={i} className="mb-4">
                               <div className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                                 <span>{org.role} - {org.orgName}</span>
                                 <span className="text-[11px] text-gray-600">{org.startYear} {org.endYear && `- ${org.endYear}`}</span>
                               </div>
                               {org.location && <p className="text-[11px] text-gray-500 italic mb-2">{org.location}</p>}
                               <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">{org.description}</p>
                            </div>
                          ))}
                      </section>
                    )}

                    {skills.some(s => s.category) && (
                      <section>
                          <h3 className="font-bold text-gray-800 text-sm border-b-2 border-black pb-1 mb-3 uppercase">Skills & Achievements</h3>
                          <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-1">
                            {skills.filter(s => s.category).map((skill, i) => (
                              <li key={i}><span className="font-bold">{skill.category}</span> {skill.year && `(${skill.year})`}: {skill.elaboration}</li>
                            ))}
                          </ul>
                      </section>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" onClick={() => setShowDownloadModal(false)}></div>
          <div className="relative bg-[#8BD3FA] rounded-2xl p-8 w-[500px] shadow-2xl flex flex-col items-center">
            <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-wide">DOWNLOAD CV</h2>
            <div className="w-full space-y-5 mb-10">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-bold text-gray-800 whitespace-nowrap">File Name :</label>
                <input 
                  type="text" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="cv_NamaLengkap"
                  className="w-[300px] px-4 py-2.5 bg-white border border-gray-200 rounded-md font-medium text-sm text-gray-700 outline-none" 
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-bold text-gray-800 whitespace-nowrap">File Type &nbsp;:</label>
                <div className="w-[300px] relative">
                  <select 
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md font-medium text-sm text-gray-700 outline-none appearance-none cursor-pointer"
                  >
                    <option value="jpg">jpg</option>
                    <option value="jpeg">jpeg</option>
                    <option value="pdf">pdf</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowDownloadModal(false)} className="px-8 py-2.5 bg-[#8BD3FA] text-gray-800 font-bold hover:bg-white/40 transition text-xs tracking-wider">
                BATALKAN
              </button>
              <button onClick={downloadPDF} className="px-6 py-2.5 bg-[#40C4FF] text-white font-bold rounded-md hover:bg-sky-400 transition flex items-center gap-2 text-xs tracking-wider shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> DOWNLOAD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCV;