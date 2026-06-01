import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvEdit, type Skill } from '../context/CvEditContext';
import { CvPreview } from '../components/CvPreview';
import { InputField, TextAreaField } from '../components/CvFields';
import { 
  projectApi,
  skillApi 
} from '../services/api';

const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;

const EditCvStep5: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { 
    skills, 
    setSkills,
    profile,
    projectId,
    setProjectId 
  } = useCvEdit();

  const handleDynamicChange = (index: number, field: keyof Skill, value: string) => {
    setSkills((prev) => {
      const newData = [...prev];
      let finalValue = value;
      if (field === 'year') {
        finalValue = value.replace(/\D/g, '').slice(0, 4);
      }
      newData[index] = { ...newData[index], [field]: finalValue };
      return newData;
    });
  };

  const addField = () => {
    setSkills((prev) => [
      ...prev,
      { id: Date.now().toString(), category: '', year: '', elaboration: '' }
    ]);
  };

  const removeField = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      let activePid: number;
      
      // Step A: If no projectId in context, create a new project in backend
      if (!projectId) {
        const title = profile.fullName ? `CV ${profile.fullName}` : 'Untitled Resume';
        const createRes = await projectApi.create({ judul_cv: title });
        if (createRes.data && createRes.data.id) {
          activePid = createRes.data.id;
          setProjectId(activePid);
        } else {
          throw new Error("Gagal membuat project baru.");
        }
      } else {
        activePid = projectId;
        // Verify project still exists, if not create new one
        try {
          const title = profile.fullName ? `CV ${profile.fullName}` : 'Untitled Resume';
          await projectApi.update(activePid, { judul_cv: title });
        } catch {
          // Project no longer exists, create a new one
          console.warn(`Project ${activePid} not found, creating new project...`);
          const title = profile.fullName ? `CV ${profile.fullName}` : 'Untitled Resume';
          const createRes = await projectApi.create({ judul_cv: title });
          if (createRes.data && createRes.data.id) {
            activePid = createRes.data.id;
            setProjectId(activePid);
          } else {
            throw new Error("Gagal membuat project baru.");
          }
        }
      }

      // Step B: Sync Skills
      const existingSkills = await skillApi.getAll(activePid);
      if (existingSkills.data && existingSkills.data.length > 0) {
        for (const item of existingSkills.data) {
          await skillApi.delete(activePid, item.id);
        }
      }
      const validSkills = skills.filter(sk => sk.category || sk.elaboration);
      for (const sk of validSkills) {
        await skillApi.create(activePid, {
          activity_name: sk.category || '',
          year: sk.year || '',
          elaboration: sk.elaboration || ''
        });
      }



      alert('CV berhasil disimpan');
      navigate('/edit/download');
    } catch (err: any) {
      console.error("Error saving CV to database:", err);
      if (err?.message === 'Unauthenticated.' || err?.status === 401) {
        alert('Sesi login sudah habis. Silakan login ulang.');
        navigate('/login');
      } else {
        alert(err?.message || 'Gagal menyimpan CV ke database. Silakan coba lagi.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/edit/step4');
  };

  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        
        {/* Left Side: Forms */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 overflow-hidden flex flex-col relative">
            
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Skills, Achievements & Other Experience</h2>
            
            <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow relative">
              {skills.map((skill, index) => (
                <div key={skill.id} className="space-y-5 relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <InputField 
                    label="Category/Project/Activity" 
                    value={skill.category} 
                    onChange={(e) => handleDynamicChange(index, 'category', e.target.value)} 
                    placeholder="Enter Category/project/activity" 
                  />
                  <InputField 
                    label="Year" 
                    value={skill.year} 
                    onChange={(e) => handleDynamicChange(index, 'year', e.target.value)} 
                    placeholder="Enter start year : 2000" 
                  />
                  
                  <TextAreaField 
                    label="Elaboration" 
                    value={skill.elaboration} 
                    onChange={(e) => handleDynamicChange(index, 'elaboration', e.target.value)} 
                    placeholder="Enter Elaboration" 
                    rows={3} 
                    maxLength={500}
                  />
                  
                  {skills.length > 1 && (
                    <div className="w-full flex justify-end mt-2">
                      <button 
                        onClick={() => removeField(index)} 
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[11px] font-bold transition"
                      >
                        <TrashIcon /> Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Fixed Add Button at bottom of container */}
            <div className="pt-4 mt-auto border-t border-gray-100 bg-white w-full">
              <button 
                onClick={addField} 
                className="w-full border-2 border-dashed border-[#2b85a3] text-[#2b85a3] font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-sky-50 transition"
              >
                <PlusIcon /> <span className="text-sm">Add Skill / Achievement</span>
              </button>
            </div>

          </div>

          <div className="flex justify-between items-center gap-4">
            <button 
              onClick={handleBack} 
              className="w-[180px] py-3.5 bg-white border border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm text-sm active:scale-95"
            >
              CANCEL
            </button>
            <button 
              onClick={handleFinish} 
              disabled={saving}
              className="grow py-3.5 bg-[#5BBAED] text-white font-bold rounded-lg shadow-md hover:bg-sky-400 transition text-sm active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>MENYIMPAN...</span>
                </>
              ) : (
                <span>SAVE & FINISH</span>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Reusable Preview */}
        <CvPreview />
        
      </div>
    </div>
  );
};

export default EditCvStep5;
