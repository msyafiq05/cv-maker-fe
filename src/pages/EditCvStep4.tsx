import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvEdit, type Organization } from '../context/CvEditContext';
import { CvPreview } from '../components/CvPreview';
import { InputField, TextAreaField } from '../components/CvFields';

const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;

const EditCvStep4: React.FC = () => {
  const navigate = useNavigate();
  const { organizations, setOrganizations } = useCvEdit();

  const handleDynamicChange = (index: number, field: keyof Organization, value: string) => {
    setOrganizations((prev) => {
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
    setOrganizations((prev) => [
      ...prev,
      { id: Date.now().toString(), orgName: '', role: '', startYear: '', endYear: '', location: '', description: '' }
    ]);
  };

  const removeField = (index: number) => {
    setOrganizations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    navigate('/edit/step5');
  };

  const handleBack = () => {
    navigate('/edit/step3');
  };

  return (
    <div className="bg-[#EAF5FC] w-full grow flex flex-col relative py-8 min-h-screen">
      <div className="grow max-w-[1400px] w-full mx-auto px-8 flex gap-8 h-[750px]">
        
        {/* Left Side: Forms */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex-grow mb-6 overflow-hidden flex flex-col relative">
            
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Organizational Experience</h2>
            
            <div className="space-y-8 overflow-y-auto pr-2 pb-6 flex-grow relative">
              {organizations.map((org, index) => (
                <div key={org.id} className="space-y-5 relative pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <InputField 
                    label="Organisation/Event Name" 
                    value={org.orgName} 
                    onChange={(e) => handleDynamicChange(index, 'orgName', e.target.value)} 
                    placeholder="Enter organisation/Event name : Band" 
                  />
                  <InputField 
                    label="Your Role/Position Title" 
                    value={org.role} 
                    onChange={(e) => handleDynamicChange(index, 'role', e.target.value)} 
                    placeholder="Enter your role/position title : Project office" 
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-5">
                      <InputField 
                        label="Start (Year)" 
                        value={org.startYear} 
                        onChange={(e) => handleDynamicChange(index, 'startYear', e.target.value)} 
                        placeholder="Enter start year : 2000" 
                      />
                      <InputField 
                        label="End (Year)" 
                        value={org.endYear} 
                        onChange={(e) => handleDynamicChange(index, 'endYear', e.target.value)} 
                        placeholder="Enter end year : 2000" 
                      />
                    </div>
                    
                    <TextAreaField 
                      label="Organisation Description (Optional)" 
                      value={org.description} 
                      onChange={(e) => handleDynamicChange(index, 'description', e.target.value)} 
                      placeholder="Enter description organisation : CV Maker is a technology platform specializing in career development and recruitment. Our primary focus is providing innovative solutions for creating professional" 
                      rows={5} 
                      maxLength={500}
                    />
                  </div>
                  
                  <InputField 
                    label="Activity/Event/Organisation Location (City, Country)" 
                    value={org.location} 
                    onChange={(e) => handleDynamicChange(index, 'location', e.target.value)} 
                    placeholder="Enter activity/event/organisation location : Jl. Jakarta No. 1, Menteng, Central Jakarta, 10310" 
                  />
                  
                  {organizations.length > 1 && (
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
                <PlusIcon /> <span className="text-sm">Add Organization</span>
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
              className="grow py-3.5 bg-[#5BBAED] text-white font-bold rounded-lg shadow-md hover:bg-sky-400 transition text-sm active:scale-95"
            >
              SAVE & CONTINUE
            </button>
          </div>
        </div>

        {/* Right Side: Reusable Preview */}
        <CvPreview />
        
      </div>
    </div>
  );
};

export default EditCvStep4;
