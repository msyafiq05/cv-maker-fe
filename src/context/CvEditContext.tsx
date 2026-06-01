/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Profile {
  fullName: string;
  phone: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: string;
  address: string;
  website: string;
  description: string;
  photoUrl?: string;
}

export interface Experience {
  id: string;
  companyName: string;
  role: string;
  startYear: string;
  endYear: string;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  schoolName: string;
  location: string;
  startYear: string;
  endYear: string;
  level: string;
  gpa: string;
  description: string;
}

export interface Organization {
  id: string;
  orgName: string;
  role: string;
  startYear: string;
  endYear: string;
  location: string;
  description: string;
}

export interface Skill {
  id: string;
  category: string;
  year: string;
  elaboration: string;
}

interface CvEditContextType {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  
  // Toolbar preferences
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  lineHeight: string;
  setLineHeight: (height: string) => void;
  headerStyle: string;
  setHeaderStyle: (style: string) => void;
  alignment: string;
  setAlignment: (align: string) => void;
  projectId: number | null;
  setProjectId: (id: number | null) => void;

  resetCvData: () => void;
}

const CvEditContext = createContext<CvEditContextType | undefined>(undefined);

export const CvEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial values from localStorage or default
  const getSaved = <T,>(key: string, defaultVal: T): T => {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const defaultProfile = {
    fullName: '', phone: '', email: '', placeOfBirth: '', dateOfBirth: '', address: '', website: '', description: '', photoUrl: ''
  };

  const [profile, setProfile] = useState<Profile>(() => {
    const saved = getSaved('cv_profile', defaultProfile);
    return { ...defaultProfile, ...saved };
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => getSaved('cv_experiences', [
    { id: Date.now().toString(), companyName: '', role: '', startYear: '', endYear: '', location: '', description: '' }
  ]));

  const [educations, setEducations] = useState<Education[]>(() => getSaved('cv_educations', [
    { id: Date.now().toString(), schoolName: '', location: '', startYear: '', endYear: '', level: '', gpa: '', description: '' }
  ]));

  const [organizations, setOrganizations] = useState<Organization[]>(() => getSaved('cv_organizations', [
    { id: Date.now().toString(), orgName: '', role: '', startYear: '', endYear: '', location: '', description: '' }
  ]));

  const [skills, setSkills] = useState<Skill[]>(() => getSaved('cv_skills', [
    { id: Date.now().toString(), category: '', year: '', elaboration: '' }
  ]));

  const [fontFamily, setFontFamily] = useState<string>(() => localStorage.getItem('cv_fontFamily') || 'Arial');
  const [fontSize, setFontSize] = useState<string>(() => localStorage.getItem('cv_fontSize') || 'Small');
  const [lineHeight, setLineHeight] = useState<string>(() => localStorage.getItem('cv_lineHeight') || '1.4');
  const [headerStyle, setHeaderStyle] = useState<string>(() => localStorage.getItem('cv_headerStyle') || 'Header and Line');
  const [alignment, setAlignment] = useState<string>(() => localStorage.getItem('cv_alignment') || 'Left');
  const [projectId, setProjectId] = useState<number | null>(() => {
    const saved = localStorage.getItem('cv_projectId');
    return saved ? parseInt(saved, 10) : null;
  });

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('cv_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('cv_experiences', JSON.stringify(experiences)); }, [experiences]);
  useEffect(() => { localStorage.setItem('cv_educations', JSON.stringify(educations)); }, [educations]);
  useEffect(() => { localStorage.setItem('cv_organizations', JSON.stringify(organizations)); }, [organizations]);
  useEffect(() => { localStorage.setItem('cv_skills', JSON.stringify(skills)); }, [skills]);

  useEffect(() => { localStorage.setItem('cv_fontFamily', fontFamily); }, [fontFamily]);
  useEffect(() => { localStorage.setItem('cv_fontSize', fontSize); }, [fontSize]);
  useEffect(() => { localStorage.setItem('cv_lineHeight', lineHeight); }, [lineHeight]);
  useEffect(() => { localStorage.setItem('cv_headerStyle', headerStyle); }, [headerStyle]);
  useEffect(() => { localStorage.setItem('cv_alignment', alignment); }, [alignment]);
  useEffect(() => {
    if (projectId !== null) {
      localStorage.setItem('cv_projectId', projectId.toString());
    } else {
      localStorage.removeItem('cv_projectId');
    }
  }, [projectId]);

  const resetCvData = () => {
    setProfile({ fullName: '', phone: '', email: '', placeOfBirth: '', dateOfBirth: '', address: '', website: '', description: '', photoUrl: '' });
    setExperiences([{ id: Date.now().toString(), companyName: '', role: '', startYear: '', endYear: '', location: '', description: '' }]);
    setEducations([{ id: Date.now().toString(), schoolName: '', location: '', startYear: '', endYear: '', level: '', gpa: '', description: '' }]);
    setOrganizations([{ id: Date.now().toString(), orgName: '', role: '', startYear: '', endYear: '', location: '', description: '' }]);
    setSkills([{ id: Date.now().toString(), category: '', year: '', elaboration: '' }]);
    setFontFamily('Arial');
    setFontSize('Small');
    setLineHeight('1.4');
    setHeaderStyle('Header and Line');
    setAlignment('Left');
    setProjectId(null);
  };

  return (
    <CvEditContext.Provider value={{
      profile, setProfile,
      experiences, setExperiences,
      educations, setEducations,
      organizations, setOrganizations,
      skills, setSkills,
      fontFamily, setFontFamily,
      fontSize, setFontSize,
      lineHeight, setLineHeight,
      headerStyle, setHeaderStyle,
      alignment, setAlignment,
      projectId, setProjectId,
      resetCvData
    }}>
      {children}
    </CvEditContext.Provider>
  );
};

export const useCvEdit = () => {
  const context = useContext(CvEditContext);
  if (!context) throw new Error('useCvEdit must be used within CvEditProvider');
  return context;
};
