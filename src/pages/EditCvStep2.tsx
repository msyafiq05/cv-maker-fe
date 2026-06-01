import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvEdit, type Experience } from '../context/CvEditContext';
import { CvPreview } from '../components/CvPreview';
import { InputField, TextAreaField } from '../components/CvFields';
import { employmentApi } from '../services/api';

const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;

const EditCvStep2: React.FC = () => {
  const navigate = useNavigate();
  const { experiences, setExperiences, projectId } = useCvEdit();
  const [saving, setSaving] = useState(false);

  const handleDynamicChange = (index: number, field: keyof Experience, value: string) => {
    setExperiences((prev) => {
      const newData = [...prev];
      let finalValue = value;
      if (field === 'startYear' || field === 'endYear') {
        finalValue = value.replace(/\D/g, '').slice(0, 4);
      }
      newData[index] = { ...newData[index], [field]: finalValue };
      return newData;
    });
  };

  const addField = () => {
    setExperiences((prev) => [
      ...prev,
      { id: Date.now().toString(), companyName: '', role: '', startYear: '', endYear: '', location: '', description: '' }
    ]);
  };

  const removeField = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    if (!projectId) {
      alert('Project belum dibuat. Kembali ke Step 1 terlebih dahulu.');
      navigate('/edit/step1');
      return;
    }
    setSaving(true);
    try {
      // Delete existing employment history
      const existing = await employmentApi.getAll(projectId);
      if (existing.data && existing.data.length > 0) {
        for (const item of existing.data) {
          await employmentApi.delete(projectId, item.id);
        }
      }
      // Create new ones
      const valid = experiences.filter(exp => exp.companyName || exp.role);
      for (const exp of valid) {
        await employmentApi.create(projectId, {
          company_name: exp.companyName || '',
          job_title: exp.role || '',
          start_year: exp.startYear || '',
          end_year: exp.endYear || '',
          company_location: exp.location || '',
          company_description: exp.description || ''
        });
      }
      navigate('/edit/step3');
    } catch (err: any) {
      console.error('Error saving employment:', err);
      alert('Gagal menyimpan data. Pastikan kamu sudah login.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/edit/step1');
  };

  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        
        {/* Left Side: Forms */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 overflow-hidden flex flex-col relative">
            
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Work Experiences</h2>
            
            <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow relative">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="space-y-5 relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="Company Name" 
                      value={exp.companyName} 
                      onChange={(e) => handleDynamicChange(index, 'companyName', e.target.value)} 
                      placeholder="Enter company name : CV Maker" 
                    />
                    <InputField 
                      label="Job/Internship/Role Title" 
                      value={exp.role} 
                      onChange={(e) => handleDynamicChange(index, 'role', e.target.value)} 
                      placeholder="Enter job/internship/role title : Manager" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="Start Year" 
                      value={exp.startYear} 
                      onChange={(e) => handleDynamicChange(index, 'startYear', e.target.value)} 
                      placeholder="Enter start year : 2000" 
                    />
                    <InputField 
                      label="End Year" 
                      value={exp.endYear} 
                      onChange={(e) => handleDynamicChange(index, 'endYear', e.target.value)} 
                      placeholder="Enter end year : 2000/-" 
                    />
                  </div>
                  
                  <InputField 
                    label="Company Location (City, Country)" 
                    value={exp.location} 
                    onChange={(e) => handleDynamicChange(index, 'location', e.target.value)} 
                    placeholder="Enter company location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" 
                  />
                  
                  <TextAreaField 
                    label="Company Description (optional)" 
                    value={exp.description} 
                    onChange={(e) => handleDynamicChange(index, 'description', e.target.value)} 
                    placeholder="Enter a short description : CV Maker is a tool (app or website) that makes it easy for users to create a professional Curriculum Vitae (CV) quickly, often for free, using a variety of ready-made templates." 
                    rows={4} 
                    maxLength={500}
                  />
                  
                  {experiences.length > 1 && (
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
                <PlusIcon /> <span className="text-sm">Add Experience</span>
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
    </div>
  );
};

export default EditCvStep2;
