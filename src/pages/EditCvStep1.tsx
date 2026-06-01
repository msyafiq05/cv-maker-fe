import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCvEdit } from '../context/CvEditContext';
import { CvPreview } from '../components/CvPreview';
import { InputField, TextAreaField } from '../components/CvFields';
import { 
  projectApi,
  personalDetailApi, 
  employmentApi, 
  educationApi, 
  organizationApi, 
  skillApi 
} from '../services/api';

const ImageIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

const EditCvStep1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    profile, 
    setProfile,
    setExperiences,
    setEducations,
    setOrganizations,
    setSkills,
    setFontFamily,
    setFontSize,
    setLineHeight,
    setHeaderStyle,
    setAlignment,
    projectId,
    setProjectId
  } = useCvEdit();

  useEffect(() => {
    const state = location.state as { templateId?: number; projectId?: number } | null;
    
    if (state?.projectId) {
      const pid = state.projectId;
      setProjectId(pid);
      
      // Load personal detail
      personalDetailApi.get(pid).then((res) => {
        if (res.data) {
          setProfile({
            fullName: res.data.full_name || '',
            phone: res.data.phone_number || '',
            email: res.data.email_address || '',
            placeOfBirth: res.data.place_of_birth || '',
            dateOfBirth: res.data.date_of_birth || '',
            address: res.data.address || '',
            website: res.data.website_url || '',
            description: res.data.short_description || '',
            photoUrl: res.data.foto_profil || ''
          });
        }
      }).catch(err => console.error("Error loading profile:", err));

      // Load employment history
      employmentApi.getAll(pid).then((res) => {
        if (res.data && res.data.length > 0) {
          setExperiences(res.data.map((item: any) => ({
            id: item.id.toString(),
            companyName: item.company_name || '',
            role: item.job_title || '',
            startYear: item.start_year || '',
            endYear: item.end_year || '',
            location: item.company_location || '',
            description: item.company_description || ''
          })));
        } else {
          setExperiences([{ id: Date.now().toString(), companyName: '', role: '', startYear: '', endYear: '', location: '', description: '' }]);
        }
      }).catch(err => console.error("Error loading experiences:", err));

      // Load educations
      educationApi.getAll(pid).then((res) => {
        if (res.data && res.data.length > 0) {
          setEducations(res.data.map((item: any) => ({
            id: item.id.toString(),
            schoolName: item.institution_name || '',
            location: '',
            startYear: item.start_year || '',
            endYear: item.end_year || '',
            level: item.degree || '',
            gpa: '',
            description: item.description || ''
          })));
        } else {
          setEducations([{ id: Date.now().toString(), schoolName: '', location: '', startYear: '', endYear: '', level: '', gpa: '', description: '' }]);
        }
      }).catch(err => console.error("Error loading educations:", err));

      // Load organizations
      organizationApi.getAll(pid).then((res) => {
        if (res.data && res.data.length > 0) {
          setOrganizations(res.data.map((item: any) => ({
            id: item.id.toString(),
            orgName: item.organization_name || '',
            role: item.role || '',
            startYear: item.start_year || '',
            endYear: item.end_year || '',
            location: item.location || '',
            description: item.description || ''
          })));
        } else {
          setOrganizations([{ id: Date.now().toString(), orgName: '', role: '', startYear: '', endYear: '', location: '', description: '' }]);
        }
      }).catch(err => console.error("Error loading organizations:", err));

      // Load skills
      skillApi.getAll(pid).then((res) => {
        if (res.data && res.data.length > 0) {
          setSkills(res.data.map((item: any) => ({
            id: item.id.toString(),
            category: item.activity_name || '',
            year: item.year || '',
            elaboration: item.elaboration || ''
          })));
        } else {
          setSkills([{ id: Date.now().toString(), category: '', year: '', elaboration: '' }]);
        }
      }).catch(err => console.error("Error loading skills:", err));

      // Clear navigation state to avoid re-triggering
      navigate(location.pathname, { replace: true, state: {} });
    } else if (state?.templateId) {
      const tid = state.templateId;
      
      // Set styles based on template selection
      if (tid === 1) { // Professional Blue
        setFontFamily('Arial');
        setFontSize('Medium');
        setLineHeight('1.4');
        setHeaderStyle('Header and Line');
        setAlignment('Left');
      } else if (tid === 2) { // Minimalist Black (Daniel Gallego)
        setFontFamily('Arial');
        setFontSize('Medium');
        setLineHeight('1.4');
        setHeaderStyle('Grey Pill');
        setAlignment('Left');

        // Pre-populate with Daniel Gallego data
        setProfile({
          fullName: 'DANIEL GALLEGO',
          phone: '123 Anywhere St., Any City',
          email: 'hello@reallygreatsite.com',
          placeOfBirth: 'Any City',
          dateOfBirth: '1995-01-01',
          address: '123 Anywhere St., Any City',
          website: 'www.reallygreatsite.com',
          description: 'UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and methodologies to streamline processes and elevate user satisfaction.',
          photoUrl: ''
        });

        setExperiences([
          {
            id: 'exp-1',
            companyName: 'Morcelle Program',
            role: 'Instant Chartz App',
            startYear: '2023',
            endYear: 'Present',
            location: 'Any City',
            description: '• Led development of an advanced automation system, achieving a 15% increase in operational efficiency.\n• Streamlined manufacturing processes, reducing production costs by 10%.\n• Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.'
          },
          {
            id: 'exp-2',
            companyName: 'XarrowAI Industries',
            role: 'System UX Engineer',
            startYear: '2021',
            endYear: '2022',
            location: 'Any City',
            description: '• Designed and optimised a robotic control system, realizing a 12% performance improvement.\n• Coordinated testing and validation, ensuring compliance with industry standards.\n• Provided technical expertise, contributing to a 15% reduction in system failures.'
          }
        ]);

        setEducations([
          {
            id: 'edu-1',
            schoolName: 'University of Engineering UX Cohort',
            level: 'UX Industrial Basics and General Application',
            startYear: '2016',
            endYear: '2019',
            location: 'Any City',
            gpa: '',
            description: '• Major in Automotive Technology.\n• Thesis on "Technological Advancements within the current Mechatronics Industry".'
          },
          {
            id: 'edu-2',
            schoolName: 'Engineering University',
            level: 'Bachelor of Design in Process Engineering',
            startYear: '2014',
            endYear: '2016',
            location: 'Any City',
            gpa: '',
            description: '• Relevant coursework in Structural Design and Project Management.'
          }
        ]);

        setOrganizations([
          {
            id: 'org-1',
            orgName: 'Additional Information',
            role: 'Languages, Certifications, Awards',
            startYear: '',
            endYear: '',
            location: 'Any City',
            description: '• Languages: English, French, Mandarin.\n• Certifications: Professional Design Engineer (PDE) License, Project Management Tech (PMT).\n• Awards/Activities: Most Innovative Employer of the Year (2021), Overall Best Employee Division Two (2024), Onboarding Project Lead (2023)'
          }
        ]);

        setSkills([
          {
            id: 'skill-1',
            category: 'Technical Skills',
            year: '',
            elaboration: 'Prototyping Tools, User Research, Information Architecture, Interaction Design, Visual Design, Usability Heuristics, Accessibility, Responsive Design, User Testing Tools'
          }
        ]);
      } else if (tid === 3) { // Modern Creative
        setFontFamily('Georgia');
        setFontSize('Large');
        setLineHeight('1.6');
        setHeaderStyle('Header Only');
        setAlignment('Center');
      } else if (tid === 4) { // ATS Friendly
        setFontFamily('Times New Roman');
        setFontSize('Small');
        setLineHeight('1.2');
        setHeaderStyle('Header and Line');
        setAlignment('Left');
      } else if (tid === 5) { // Executive Elegance
        setFontFamily('Georgia');
        setFontSize('Medium');
        setLineHeight('1.6');
        setHeaderStyle('Classic Border');
        setAlignment('Left');
      }

      // Clear navigation state to avoid re-triggering on back/forward
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  // Photo Crop States
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit!');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setScale(1);
        setOffset({ x: 0, y: 0 });
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers inside crop box
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Perform crop using canvas
  const handleCrop = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (canvas && img) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image onto 240x240 crop circle/box
        const size = 240;
        ctx.save();
        
        // Translate to center of canvas to apply zoom and offsets
        ctx.translate(size / 2, size / 2);
        ctx.scale(scale, scale);
        ctx.translate(offset.x / scale, offset.y / scale);
        
        // Calculate aspect ratios to fit inside crop area
        const imgRatio = img.naturalWidth / img.naturalHeight;
        let dWidth = size;
        let dHeight = size;
        if (imgRatio > 1) {
          dWidth = size * imgRatio;
        } else {
          dHeight = size / imgRatio;
        }

        ctx.drawImage(img, -dWidth / 2, -dHeight / 2, dWidth, dHeight);
        ctx.restore();

        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setProfile(prev => ({ ...prev, photoUrl: croppedDataUrl }));
        setShowCropModal(false);
      }
    }
  };

  const [saving, setSaving] = useState(false);

  const handleNext = async () => {
    setSaving(true);
    try {
      let activePid = projectId;

      // Create project if none exists
      if (!activePid) {
        const title = profile.fullName ? `CV ${profile.fullName}` : 'Untitled Resume';
        const createRes = await projectApi.create({ judul_cv: title });
        if (createRes.data && createRes.data.id) {
          activePid = createRes.data.id;
          setProjectId(activePid);
        } else {
          throw new Error('Gagal membuat project baru.');
        }
      }

      // Save personal detail
      await personalDetailApi.upsert(activePid!, {
        full_name: profile.fullName || '',
        phone_number: profile.phone || '',
        email_address: profile.email || '',
        place_of_birth: profile.placeOfBirth || '',
        date_of_birth: profile.dateOfBirth || '',
        address: profile.address || '',
        website_url: profile.website || '',
        short_description: profile.description || '',
        foto_profil: profile.photoUrl || ''
      });

      navigate('/edit/step2');
    } catch (err: any) {
      console.error('Error saving personal detail:', err);
      alert('Gagal menyimpan data. Pastikan kamu sudah login.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/project');
  };

  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        
        {/* Left Side: Forms */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 overflow-hidden flex flex-col relative">
            
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Complete Your Profile</h2>
            
            <div className="space-y-5 overflow-y-auto pr-2 pb-6 flex-grow">
              <InputField 
                label="Full Name" 
                name="fullName" 
                value={profile.fullName} 
                onChange={handleProfileChange} 
                placeholder="Enter full name : Juliana Silvana" 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Telephone Number" 
                  name="phone" 
                  value={profile.phone} 
                  onChange={handleProfileChange} 
                  placeholder="Enter your mobile : +62123 etc." 
                />
                <InputField 
                  label="Email Address" 
                  name="email" 
                  value={profile.email} 
                  onChange={handleProfileChange} 
                  placeholder="Enter email: juliana@gmail.com" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Place Of Birth" 
                  name="placeOfBirth" 
                  value={profile.placeOfBirth} 
                  onChange={handleProfileChange} 
                  placeholder="Enter place of birth: Jakarta" 
                />
                <InputField 
                  label="Date Of Birth" 
                  name="dateOfBirth" 
                  value={profile.dateOfBirth} 
                  onChange={handleProfileChange} 
                  placeholder="Enter date of birth: 01-January-2000" 
                />
              </div>
              
              <InputField 
                label="Address (optional)" 
                name="address" 
                value={profile.address} 
                onChange={handleProfileChange} 
                placeholder="Enter Address: Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" 
              />
              
              <InputField 
                label="Website URL/LinkedIn Profile URL (optional)" 
                name="website" 
                value={profile.website} 
                onChange={handleProfileChange} 
                placeholder="Enter linkedin profile URL/website URL : https://www.linkedin.com/company/CVMaker." 
              />
              
              <div className="grid grid-cols-2 gap-4 items-stretch h-44">
                <TextAreaField 
                  label="Short Description About Yourself" 
                  name="description" 
                  value={profile.description} 
                  onChange={handleProfileChange} 
                  placeholder="Enter a short description : CV Maker is a tool (app or website) that makes it easy for users to create a professional Curriculum Vitae (CV) quickly, often for free, using a variety of ready-made templates." 
                  rows={5} 
                  maxLength={300}
                />
                
                <div className="flex flex-col gap-1.5 h-full">
                  <label className="text-[12px] font-bold text-gray-800 uppercase tracking-wider">Photo</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/png, image/jpeg, image/jpg" 
                    className="hidden" 
                  />
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 h-full p-4 flex-col gap-2 text-center cursor-pointer hover:bg-gray-100 transition shadow-sm overflow-hidden relative group"
                  >
                    {profile.photoUrl ? (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <img 
                          src={profile.photoUrl} 
                          alt="Profile preview" 
                          className="w-20 h-20 rounded-full object-cover border" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg text-white font-bold text-xs">
                          GANTI FOTO
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                         <ImageIcon />
                         <div className="text-left">
                           <p className="text-xs font-bold text-gray-800">Drag or upload <span className="font-normal text-gray-500">your</span></p>
                           <p className="text-[10px] text-gray-500 font-medium">photo here.</p>
                           <p className="text-[10px] text-gray-400 mt-1">Dimension: 240x240 px;<br/>Format: jpg, jpeg, png<br/>Max Size: 2MB</p>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-between items-center gap-4">
            <button 
              onClick={handleCancel} 
              className="w-[180px] py-3.5 bg-white border border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm text-sm active:scale-95"
            >
              CANCEL
            </button>
            <button 
              onClick={handleNext} 
              disabled={saving}
              className="grow py-3.5 bg-[#5BBAED] text-white font-bold rounded-lg shadow-md hover:bg-sky-400 transition text-sm active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {saving ? 'MENYIMPAN...' : 'SAVE & CONTINUE'}
            </button>
          </div>
        </div>

        {/* Right Side: Reusable Preview */}
        <CvPreview />
        
      </div>

      {/* PHOTO CROP MODAL */}
      {showCropModal && imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setShowCropModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-8 w-[400px] shadow-2xl flex flex-col items-center border border-gray-100">
            <h2 className="text-lg font-black text-gray-800 mb-6 uppercase tracking-wide">CROP PROFILE PHOTO</h2>
            
            {/* Visual Crop Box */}
            <div 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="w-64 h-64 relative bg-slate-950 overflow-hidden rounded-full border-4 border-sky-400 shadow-md cursor-move flex items-center justify-center"
            >
              <img 
                ref={imageRef}
                src={imageSrc} 
                alt="Upload preview" 
                style={{
                  transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                draggable={false}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Drag to reposition photo</p>

            {/* Zoom Slider */}
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-600">
                <span>ZOOM:</span>
                <span>{Math.round(scale * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="3" 
                step="0.05"
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            {/* Hidden canvas to output cropped image */}
            <canvas ref={canvasRef} width={240} height={240} className="hidden" />

            <div className="flex gap-4 mt-8 w-full">
              <button 
                onClick={() => setShowCropModal(false)} 
                className="w-1/2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs tracking-wider transition"
              >
                BATAL
              </button>
              <button 
                onClick={handleCrop} 
                className="w-1/2 py-2.5 bg-[#5BBAED] hover:bg-sky-400 text-white font-bold rounded-lg text-xs tracking-wider transition shadow-sm"
              >
                POTONG & SIMPAN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCvStep1;
