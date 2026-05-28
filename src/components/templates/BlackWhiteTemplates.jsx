import React from 'react';

const BlackWhiteTemplates = () => {
  return (
    <div className="bg-white w-full h-full p-12 font-sans text-slate-800 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[44px] font-bold text-slate-800 tracking-tight leading-none mb-3">
          DANIEL GALLEGO
        </h1>
        <h2 className="text-[22px] font-bold text-slate-800 tracking-wide mb-2">
          UX DESIGNER
        </h2>
        <p className="text-[13px] text-slate-700">
          123 Anywhere St., Any City | hello@reallygreatsite.com | www.reallygreatsite.com
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-6">
        <div className="bg-slate-200 rounded-full px-5 py-1.5 mb-3">
          <h3 className="text-[14px] font-bold italic tracking-wider text-slate-700 uppercase">
            SUMMARY
          </h3>
        </div>
        <p className="text-[12.5px] leading-relaxed text-slate-700 text-justify">
          UX Designer with a focus on delivering impactful results, eager to tackle dynamic challenges and apply creativity to craft intuitive user experiences. Demonstrated proficiency in project management, user-centric problem-solving, and seamless collaboration across teams. Skilled in leveraging state-of-the-art tools and methodologies to streamline processes and elevate user satisfaction.
        </p>
      </div>

      {/* TECHNICAL SKILLS */}
      <div className="mb-6">
        <div className="bg-slate-200 rounded-full px-5 py-1.5 mb-3">
          <h3 className="text-[14px] font-bold italic tracking-wider text-slate-700 uppercase">
            TECHNICAL SKILLS
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-[12.5px] leading-relaxed text-slate-700 px-1">
          <div>
            <p>Prototyping Tools</p>
            <p>User Research</p>
            <p>Information Architecture</p>
          </div>
          <div>
            <p>Interaction Design</p>
            <p>Visual Design</p>
            <p>Usability Heuristics</p>
          </div>
          <div>
            <p>Accessibility</p>
            <p>Responsive Design</p>
            <p>User Testing Tools</p>
          </div>
        </div>
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <div className="mb-6">
        <div className="bg-slate-200 rounded-full px-5 py-1.5 mb-3">
          <h3 className="text-[14px] font-bold italic tracking-wider text-slate-700 uppercase">
            PROFESSIONAL EXPERIENCE
          </h3>
        </div>
        
        {/* Experience 1 */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="text-[13.5px] font-bold text-slate-800">Instant Chartz App, Morcelle Program</h4>
            <span className="text-[13px] font-bold text-slate-800">Jan 2023 - Present</span>
          </div>
          <ul className="list-disc pl-5 text-[12.5px] leading-relaxed text-slate-700 space-y-0.5">
            <li>Led development of an advanced automation system, achieving a 15% increase in operational efficiency.</li>
            <li>Streamlined manufacturing processes, reducing production costs by 10%.</li>
            <li>Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.</li>
          </ul>
        </div>

        {/* Experience 2 */}
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="text-[13.5px] font-bold text-slate-800">System UX Engineer, XarrowAI Industries</h4>
            <span className="text-[13px] font-bold text-slate-800">Feb 2021 - Dec 2022</span>
          </div>
          <ul className="list-disc pl-5 text-[12.5px] leading-relaxed text-slate-700 space-y-0.5">
            <li>Designed and optimised a robotic control system, realizing a 12% performance improvement.</li>
            <li>Coordinated testing and validation, ensuring compliance with industry standards.</li>
            <li>Provided technical expertise, contributing to a 15% reduction in system failures.</li>
          </ul>
        </div>
      </div>

      {/* EDUCATION */}
      <div className="mb-6">
        <div className="bg-slate-200 rounded-full px-5 py-1.5 mb-3">
          <h3 className="text-[14px] font-bold italic tracking-wider text-slate-700 uppercase">
            EDUCATION
          </h3>
        </div>

        {/* Education 1 */}
        <div className="mb-3">
          <div className="flex justify-between items-baseline mb-0.5">
            <h4 className="text-[13.5px] font-bold text-slate-800">UX Industrial Basics and General Application</h4>
            <span className="text-[13px] font-bold text-slate-800">Aug 2016 - Oct 2019</span>
          </div>
          <p className="text-[12.5px] text-slate-700 mb-1">University of Engineering UX Cohort</p>
          <ul className="list-disc pl-5 text-[12.5px] leading-relaxed text-slate-700 space-y-0.5">
            <li>Major in Automotive Technology.</li>
            <li>Thesis on "Technological Advancements within the current Mechatronics Industry".</li>
          </ul>
        </div>

        {/* Education 2 */}
        <div>
          <div className="flex justify-between items-baseline mb-0.5">
            <h4 className="text-[13.5px] font-bold text-slate-800">Bachelor of Design in Process Engineering</h4>
            <span className="text-[13px] font-bold text-slate-800">May 2014 - May 2016</span>
          </div>
          <p className="text-[12.5px] text-slate-700 mb-1">Engineering University</p>
          <ul className="list-disc pl-5 text-[12.5px] leading-relaxed text-slate-700 space-y-0.5">
            <li>Relevant coursework in Structural Design and Project Management.</li>
          </ul>
        </div>
      </div>

      {/* ADDITIONAL INFORMATION */}
      <div>
        <div className="bg-slate-200 rounded-full px-5 py-1.5 mb-3">
          <h3 className="text-[14px] font-bold italic tracking-wider text-slate-700 uppercase">
            ADDITIONAL INFORMATION
          </h3>
        </div>
        <ul className="list-disc pl-5 text-[12.5px] leading-relaxed text-slate-700 space-y-1">
          <li><strong>Languages:</strong> English, French, Mandarin.</li>
          <li><strong>Certifications:</strong> Professional Design Engineer (PDE) License, Project Management Tech (PMT).</li>
          <li><strong>Awards/Activities:</strong> Most Innovative Employer of the Year (2021), Overall Best Employee Division Two (2024), Onboarding Project Lead (2023)</li>
        </ul>
      </div>

    </div>
  );
};

export default BlackWhiteTemplates;
