import React, { useState } from 'react';
import { useCvEdit } from '../context/CvEditContext';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';


export const CvPreview: React.FC = () => {
  const {
    profile,
    experiences,
    educations,
    organizations,
    skills,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    headerStyle,
    setHeaderStyle,
    alignment,
    setAlignment
  } = useCvEdit();

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('pdf');

  // Dropdown UI States
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showSpacingDropdown, setShowSpacingDropdown] = useState(false);
  const [showHeaderDropdown, setShowHeaderDropdown] = useState(false);
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);

  const downloadPDF = () => {
    const element = document.getElementById('cv-paper');
    if (!element) return;
    const finalFileName = fileName ? `${fileName}.${fileType}` : `CV_${profile.fullName.replace(/\s/g, '_') || 'Untitled'}.${fileType}`;
    
    if (fileType === 'pdf') {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        
        const pdfWidth = 210; // A4 width in mm
        const pdfPageHeight = 297; // A4 height in mm
        const imgHeightInPdf = pdfWidth * (canvas.height / canvas.width);
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        let heightLeft = imgHeightInPdf;
        let position = 0;
        
        // Page 1
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInPdf);
        heightLeft -= pdfPageHeight;
        
        // Additional pages if the content spans more than one A4 height
        while (heightLeft > 0) {
          position = heightLeft - imgHeightInPdf;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInPdf);
          heightLeft -= pdfPageHeight;
        }
        
        pdf.save(finalFileName);
        setShowDownloadModal(false);
      }).catch((err: any) => {
        console.error('Error generating PDF:', err);
        alert('Gagal mendownload PDF: ' + (err.message || err));
        setShowDownloadModal(false);
      });
    } else {
      const format = fileType === 'png' ? 'image/png' : 'image/jpeg';
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL(format);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = finalFileName;
        link.click();
        setShowDownloadModal(false);
      }).catch((err: any) => {
        console.error('Error generating image:', err);
        alert('Gagal mendownload gambar: ' + (err.message || err));
        setShowDownloadModal(false);
      });
    }
  };

  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'Times New Roman': return 'font-serif';
      case 'Courier New': return 'font-mono';
      case 'Georgia': return 'font-serif style-georgia';
      default: return 'font-sans';
    }
  };

  const getFontSizeStyles = () => {
    switch (fontSize) {
      case 'Medium':
        return {
          name: 'text-3xl',
          details: 'text-[12px]',
          sectionHeader: 'text-[14px]',
          bodyHeader: 'text-[13px]',
          bodyText: 'text-[11px]'
        };
      case 'Large':
        return {
          name: 'text-4xl',
          details: 'text-[14px]',
          sectionHeader: 'text-[16px]',
          bodyHeader: 'text-[15px]',
          bodyText: 'text-[13px]'
        };
      default: // Small
        return {
          name: 'text-2xl',
          details: 'text-[10px]',
          sectionHeader: 'text-[12px]',
          bodyHeader: 'text-[11px]',
          bodyText: 'text-[9.5px]'
        };
    }
  };

  const getAlignmentStyle = () => {
    switch (alignment) {
      case 'Center': return 'text-center items-center justify-center';
      case 'Right': return 'text-right items-end justify-end';
      default: return 'text-left items-start justify-start';
    }
  };

  const sizes = getFontSizeStyles();

  return (
    <div className="w-1/2 flex flex-col gap-4 h-full relative">
      
      {/* TOOLBAR 1: Typography & Download */}
      <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between border border-gray-100 z-30">
        <div className="flex items-center gap-5 relative">
          <div className="relative">
            <div 
              onClick={() => {
                setShowFontDropdown(!showFontDropdown);
                setShowSizeDropdown(false);
                setShowSpacingDropdown(false);
              }}
              className="flex items-center gap-2 text-sm font-bold text-gray-700 border-r border-gray-200 pr-5 cursor-pointer hover:text-sky-500 transition"
            >
              <span className="font-serif italic font-medium">A<span className="text-[10px]">A</span></span> 
              {fontFamily} 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {showFontDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-fade-in">
                {['Arial', 'Times New Roman', 'Courier New', 'Georgia'].map((font) => (
                  <button 
                    key={font}
                    onClick={() => { setFontFamily(font); setShowFontDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-sky-50 hover:text-sky-600 transition ${fontFamily === font ? 'bg-sky-50 text-sky-600' : 'text-gray-700'}`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div 
              onClick={() => {
                setShowSizeDropdown(!showSizeDropdown);
                setShowFontDropdown(false);
                setShowSpacingDropdown(false);
              }}
              className="flex items-center gap-2 text-sm font-bold text-gray-700 border-r border-gray-200 pr-5 cursor-pointer hover:text-sky-500 transition"
            >
              <span className="font-serif italic font-medium">T<span className="text-[10px]">T</span></span> 
              {fontSize} 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {showSizeDropdown && (
              <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-fade-in">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => { setFontSize(size); setShowSizeDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-sky-50 hover:text-sky-600 transition ${fontSize === size ? 'bg-sky-50 text-sky-600' : 'text-gray-700'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div 
              onClick={() => {
                setShowSpacingDropdown(!showSpacingDropdown);
                setShowFontDropdown(false);
                setShowSizeDropdown(false);
              }}
              className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer hover:text-sky-500 transition"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
              {lineHeight} 
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
            </div>
            {showSpacingDropdown && (
              <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-fade-in">
                {['1.2', '1.4', '1.6', '1.8'].map((height) => (
                  <button 
                    key={height}
                    onClick={() => { setLineHeight(height); setShowSpacingDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-sky-50 hover:text-sky-600 transition ${lineHeight === height ? 'bg-sky-50 text-sky-600' : 'text-gray-700'}`}
                  >
                    {height}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => setShowDownloadModal(true)} 
          className="bg-[#D1EEF9] text-[#2b85a3] hover:bg-[#b5e3f5] px-6 py-2.5 rounded-lg font-bold text-[11px] transition flex items-center gap-2 tracking-wide uppercase shadow-sm active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> 
          DOWNLOAD
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center gap-6 border border-gray-100 z-20">
        <div className="relative">
          <div 
            onClick={() => {
              setShowHeaderDropdown(!showHeaderDropdown);
              setShowAlignDropdown(false);
            }}
            className="flex items-center gap-3 text-sm font-bold text-gray-800 border-r border-gray-200 pr-6 cursor-pointer hover:text-sky-500 transition"
          >
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-[10px]">🎨</div>
            {headerStyle} 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          {showHeaderDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-fade-in">
              {['Header and Line', 'Header Only', 'Classic Border', 'Grey Pill'].map((style) => (
                <button 
                  key={style}
                  onClick={() => { setHeaderStyle(style); setShowHeaderDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-sky-50 hover:text-sky-600 transition ${headerStyle === style ? 'bg-sky-50 text-sky-600' : 'text-gray-700'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div 
            onClick={() => {
              setShowAlignDropdown(!showAlignDropdown);
              setShowHeaderDropdown(false);
            }}
            className="flex items-center gap-3 text-sm font-bold text-gray-700 cursor-pointer hover:text-sky-500 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
            {alignment} 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          {showAlignDropdown && (
            <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-50 animate-fade-in">
              {['Left', 'Center', 'Right'].map((align) => (
                <button 
                  key={align}
                  onClick={() => { setAlignment(align); setShowAlignDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-sky-50 hover:text-sky-600 transition ${alignment === align ? 'bg-sky-50 text-sky-600' : 'text-gray-700'}`}
                >
                  {align}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grow border-4 border-[#2b85a3] bg-white rounded-xl overflow-y-auto flex flex-col items-center shadow-inner relative">
        <div 
          id="cv-paper" 
          className={`bg-white p-12 w-full max-w-[800px] min-h-[1000px] ${getFontFamilyStyle()} ${sizes.bodyText}`}
          style={{ lineHeight: lineHeight }}
        >
          <div className={`flex gap-6 mb-8 items-center ${alignment === 'Center' ? 'flex-col' : alignment === 'Right' ? 'flex-row-reverse' : 'flex-row'}`}>
            {profile.photoUrl && (
              <img 
                src={profile.photoUrl} 
                crossOrigin="anonymous"
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
              />
            )}
            <div className={`flex flex-col flex-1 ${getAlignmentStyle()}`}>
              <h1 className={`${sizes.name} font-black text-gray-900 tracking-tight mb-2 break-all overflow-wrap`}>
                {profile.fullName || "Your Full Name"}
              </h1>
              <div className={`flex flex-wrap gap-2 ${sizes.details} text-gray-600 leading-normal ${alignment === 'Center' ? 'justify-center' : alignment === 'Right' ? 'justify-end' : 'justify-start'}`}>
                {profile.phone && <span className="break-all">{profile.phone}</span>}
                {profile.phone && profile.email && <span>•</span>}
                {profile.email && <span className="break-all">{profile.email}</span>}
                {(profile.phone || profile.email) && profile.address && <span>•</span>}
                {profile.address && <span className="break-words">{profile.address}</span>}
                
                {(profile.placeOfBirth || profile.dateOfBirth) && (
                  <>
                    <span>•</span>
                    <span className="break-words">
                      Born: {profile.placeOfBirth}
                      {profile.placeOfBirth && profile.dateOfBirth && ', '}
                      {profile.dateOfBirth}
                    </span>
                  </>
                )}

                {profile.website && (
                  <>
                    <span>•</span>
                    <span className="break-all text-sky-500">{profile.website}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {profile.description && (
              <section>
                <h3 className={`font-bold uppercase tracking-wide break-words
                  ${headerStyle === 'Grey Pill' 
                    ? 'bg-slate-200 rounded-full px-5 py-1.5 mb-3 text-[14px] text-slate-700 italic tracking-wider' 
                    : `${sizes.sectionHeader} text-gray-800 mb-3`
                  }
                  ${headerStyle === 'Header and Line' ? 'border-b-2 border-black pb-1' : ''}
                  ${headerStyle === 'Classic Border' ? 'border border-gray-300 bg-gray-50 px-3 py-1 rounded' : ''}
                `}>
                  Profile
                </h3>
                <p className={`${sizes.bodyText} text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap`}>
                  {profile.description}
                </p>
              </section>
            )}

            {experiences.some(e => e.companyName) && (
              <section>
                <h3 className={`font-bold uppercase tracking-wide break-words
                  ${headerStyle === 'Grey Pill' 
                    ? 'bg-slate-200 rounded-full px-5 py-1.5 mb-3 text-[14px] text-slate-700 italic tracking-wider' 
                    : `${sizes.sectionHeader} text-gray-800 mb-3`
                  }
                  ${headerStyle === 'Header and Line' ? 'border-b-2 border-black pb-1' : ''}
                  ${headerStyle === 'Classic Border' ? 'border border-gray-300 bg-gray-50 px-3 py-1 rounded' : ''}
                `}>
                  Work Experience
                </h3>
                {experiences.filter(e => e.companyName).map((exp, i) => (
                  <div key={exp.id || i} className="mb-4">
                    <div className={`flex justify-between ${sizes.bodyHeader} font-bold text-gray-800 mb-1 gap-4`}>
                      <span className="break-words">{exp.role} - {exp.companyName}</span>
                      <span className="text-[11px] text-gray-600 font-normal whitespace-nowrap">
                        {exp.startYear} {exp.endYear && ` - ${exp.endYear}`}
                      </span>
                    </div>
                    {exp.location && <p className="text-[11px] text-gray-500 italic mb-2 break-words">{exp.location}</p>}
                    {exp.description && (
                      <p className={`${sizes.bodyText} text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap`}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {educations.some(e => e.schoolName) && (
              <section>
                <h3 className={`font-bold uppercase tracking-wide break-words
                  ${headerStyle === 'Grey Pill' 
                    ? 'bg-slate-200 rounded-full px-5 py-1.5 mb-3 text-[14px] text-slate-700 italic tracking-wider' 
                    : `${sizes.sectionHeader} text-gray-800 mb-3`
                  }
                  ${headerStyle === 'Header and Line' ? 'border-b-2 border-black pb-1' : ''}
                  ${headerStyle === 'Classic Border' ? 'border border-gray-300 bg-gray-50 px-3 py-1 rounded' : ''}
                `}>
                  Education
                </h3>
                {educations.filter(e => e.schoolName).map((edu, i) => (
                  <div key={edu.id || i} className="mb-4">
                    <div className={`flex justify-between ${sizes.bodyHeader} font-bold text-gray-800 mb-1 gap-4`}>
                      <span className="break-words">{edu.level} - {edu.schoolName}</span>
                      <span className="text-[11px] text-gray-600 font-normal whitespace-nowrap">
                        {edu.startYear} {edu.endYear && ` - ${edu.endYear}`}
                      </span>
                    </div>
                    {edu.location && (
                      <p className="text-[11px] text-gray-500 italic mb-2 break-words">
                        {edu.location} {edu.gpa && `| GPA: ${edu.gpa}`}
                      </p>
                    )}
                    {edu.description && (
                      <p className={`${sizes.bodyText} text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap`}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {organizations.some(o => o.orgName) && (
              <section>
                <h3 className={`font-bold uppercase tracking-wide break-words
                  ${headerStyle === 'Grey Pill' 
                    ? 'bg-slate-200 rounded-full px-5 py-1.5 mb-3 text-[14px] text-slate-700 italic tracking-wider' 
                    : `${sizes.sectionHeader} text-gray-800 mb-3`
                  }
                  ${headerStyle === 'Header and Line' ? 'border-b-2 border-black pb-1' : ''}
                  ${headerStyle === 'Classic Border' ? 'border border-gray-300 bg-gray-50 px-3 py-1 rounded' : ''}
                `}>
                  Organizational Experience
                </h3>
                {organizations.filter(o => o.orgName).map((org, i) => (
                  <div key={org.id || i} className="mb-4">
                    <div className={`flex justify-between ${sizes.bodyHeader} font-bold text-gray-800 mb-1 gap-4`}>
                      <span className="break-words">{org.role} - {org.orgName}</span>
                      <span className="text-[11px] text-gray-600 font-normal whitespace-nowrap">
                        {org.startYear} {org.endYear && ` - ${org.endYear}`}
                      </span>
                    </div>
                    {org.location && <p className="text-[11px] text-gray-500 italic mb-2 break-words">{org.location}</p>}
                    {org.description && (
                      <p className={`${sizes.bodyText} text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap`}>
                        {org.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {skills.some(s => s.category) && (
              <section>
                <h3 className={`font-bold uppercase tracking-wide break-words
                  ${headerStyle === 'Grey Pill' 
                    ? 'bg-slate-200 rounded-full px-5 py-1.5 mb-3 text-[14px] text-slate-700 italic tracking-wider' 
                    : `${sizes.sectionHeader} text-gray-800 mb-3`
                  }
                  ${headerStyle === 'Header and Line' ? 'border-b-2 border-black pb-1' : ''}
                  ${headerStyle === 'Classic Border' ? 'border border-gray-300 bg-gray-50 px-3 py-1 rounded' : ''}
                `}>
                  Skills & Achievements
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1.5 break-words">
                  {skills.filter(s => s.category).map((skill, i) => (
                    <li key={skill.id || i} className={`${sizes.bodyText} overflow-wrap break-words`}>
                      <span className="font-bold">{skill.category}</span>
                      {skill.year && ` (${skill.year})`}: {skill.elaboration}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </div>
      </div>

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
                    <option value="pdf">PDF (.pdf)</option>
                    <option value="png">PNG (.png)</option>
                    <option value="jpg">JPG (.jpg)</option>
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> 
                DOWNLOAD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
