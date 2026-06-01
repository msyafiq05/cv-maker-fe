import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvEdit, type Education } from '../context/CvEditContext';
import { CvPreview } from '../components/CvPreview';
import { InputField, TextAreaField } from '../components/CvFields';
import { educationApi } from '../services/api';

const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;

const EditCvStep3: React.FC = () => {
  const navigate = useNavigate();
  const { educations, setEducations, projectId } = useCvEdit();
  const [saving, setSaving] = useState(false);

  const handleDynamicChange = (index: number, field: keyof Education, value: string) => {
    setEducations((prev) => {
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
    setEducations((prev) => [
      ...prev,
      { id: Date.now().toString(), schoolName: '', location: '', startYear: '', endYear: '', level: '', gpa: '', description: '' }
    ]);
  };

  const removeField = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    if (!projectId) {
      alert('Project belum dibuat. Kembali ke Step 1 terlebih dahulu.');
      navigate('/edit/step1');
      return;
    }
    setSaving(true);
    try {
      // Verify project still exists
      try {
        await educationApi.getAll(projectId);
      } catch {
        alert('Project tidak ditemukan. Kembali ke Step 1 untuk membuat ulang.');
        navigate('/edit/step1');
        return;
      }

      // Delete existing educations
      const existing = await educationApi.getAll(projectId);
      if (existing.data && existing.data.length > 0) {
        for (const item of existing.data) {
          await educationApi.delete(projectId, item.id);
        }
      }
      // Create new ones
      const valid = educations.filter(edu => edu.schoolName || edu.level);
      for (const edu of valid) {
        await educationApi.create(projectId, {
          institution_name: edu.schoolName || '',
          degree: edu.level || '',
          field_of_study: '',
          start_year: edu.startYear || '',
          end_year: edu.endYear || '',
          gpa: edu.gpa || '',
          location: edu.location || '',
          description: edu.description || ''
        });
      }
      navigate('/edit/step4');
    } catch (err: any) {
      console.error('Error saving education:', err);
      if (err?.message === 'Unauthenticated.' || err?.status === 401) {
        alert('Sesi login sudah habis. Silakan login ulang.');
        navigate('/login');
      } else {
        alert(err?.message || 'Gagal menyimpan data. Silakan coba lagi.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/edit/step2');
  };

  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        
        {/* Left Side: Forms */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 overflow-hidden flex flex-col relative">
            
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Education Level</h2>
            
            <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow relative">
              {educations.map((edu, index) => (
                <div key={edu.id} className="space-y-5 relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <InputField 
                    label="School Name" 
                    value={edu.schoolName} 
                    onChange={(e) => handleDynamicChange(index, 'schoolName', e.target.value)} 
                    placeholder="Enter school : University of Indonesia" 
                  />
                  <InputField 
                    label="School Location (City, Country)" 
                    value={edu.location} 
                    onChange={(e) => handleDynamicChange(index, 'location', e.target.value)} 
                    placeholder="Enter school location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" 
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="Start (Year)" 
                      value={edu.startYear} 
                      onChange={(e) => handleDynamicChange(index, 'startYear', e.target.value)} 
                      placeholder="Enter start year : 2000" 
                    />
                    <InputField 
                      label="End (Year)" 
                      value={edu.endYear} 
                      onChange={(e) => handleDynamicChange(index, 'endYear', e.target.value)} 
                      placeholder="Enter end year : 2000" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="Education Level" 
                      value={edu.level} 
                      onChange={(e) => handleDynamicChange(index, 'level', e.target.value)} 
                      placeholder="Enter education level" 
                    />
                    <InputField 
                      label="GPA (optional)" 
                      value={edu.gpa} 
                      onChange={(e) => handleDynamicChange(index, 'gpa', e.target.value)} 
                      placeholder="Enter GPA : 3.8" 
                    />
                  </div>
                  
                  <TextAreaField 
                    label="Description (optional)" 
                    value={edu.description} 
                    onChange={(e) => handleDynamicChange(index, 'description', e.target.value)} 
                    placeholder="Enter description : Graduated with satisfactory grades, Successfully won a championship, and Completed the final assignment with satisfactory results" 
                    rows={3} 
                    maxLength={500}
                  />
                  
                  {educations.length > 1 && (
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
                <PlusIcon /> <span className="text-sm">Add Education</span>
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

export default EditCvStep3;
