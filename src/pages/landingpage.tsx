import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import landingPageImg from '../assets/landingpage.png';
import landingPage2Img from '../assets/landingpage2.png';
import BlackWhiteTemplates from '../components/templates/BlackWhiteTemplates';

const LandingPage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToAboutUs) {
      setTimeout(() => {
        document.getElementById('about-us-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    } else if (location.state?.scrollToTemplate) {
      setTimeout(() => {
        document.getElementById('template-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    } else if (location.state?.scrollToTop) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const previewTemplates = [
    { id: 1, name: 'PROFESSIONAL BLUE', img: 'https://via.placeholder.com/400x600', isPreview: false },
    { id: 2, name: 'MINIMALIST BLACK', img: '', isPreview: true },
    { id: 3, name: 'MODERN CREATIVE', img: 'https://via.placeholder.com/400x600', isPreview: false },
    { id: 4, name: 'ATS FRIENDLY', img: 'https://via.placeholder.com/400x600', isPreview: false },
    { id: 5, name: 'EXECUTIVE ELEGANCE', img: 'https://via.placeholder.com/400x600', isPreview: false },
  ];

  return (
    <>
      <header className="max-w-7xl mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left bg-white">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-bold text-[#55B3EB] leading-tight tracking-tight mb-4">
            CREATE NEW CV <br />
            <span className="text-[#3D769A]">Simple and Effective</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0">
            Build your professional resume in minutes with our easy-to-use templates.
          </p>
          
          {isLoggedIn ? (
             <button 
               onClick={() => navigate('/project')} 
               className="bg-sky-400 text-white px-10 py-3.5 rounded-xl font-bold text-lg hover:bg-sky-500 transition shadow-lg shadow-sky-200"
             >
               Go to Project
             </button>
          ) : (
            <button 
              onClick={() => navigate('/templates')} 
              className="bg-sky-400 text-white px-10 py-3.5 rounded-xl font-bold text-lg hover:bg-sky-500 transition shadow-lg shadow-sky-200"
            >
              Get Started Free
            </button>
          )}
        </div>
        <div className="lg:w-1/2 relative flex justify-center items-center">
          <img 
            src={landingPageImg} 
            alt="CV Maker Hero Illustration" 
            className="w-full h-auto object-contain max-w-[550px] mix-blend-multiply hover:-translate-y-2 transition-transform duration-500"
          />
        </div>
      </header>

      <section id="about-us-section" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-2/5 flex justify-center items-center">
                <img 
                    src={landingPage2Img} 
                    alt="About Us Illustration" 
                    className="w-full h-auto object-contain max-w-[450px] mix-blend-multiply hover:-translate-y-2 transition-transform duration-500"
                />
            </div>
            <div className="lg:w-3/5">
                <h2 className="text-[54px] font-bold mb-6 tracking-tight">
                    <span className="text-[#55B3EB]">About</span> <span className="text-[#3D769A]">us</span>
                </h2>
                <div className="text-[15px] font-normal text-slate-500 leading-relaxed text-justify">
                    <p>Our website is a user-friendly CV maker platform designed to help individuals create professional and visually appealing resumes and efficiently. It offers a variety of customizable templates suitable for different industries and career levels, allowing users to personalize their CV according to their needs. With a simple step-by-step builder, users can input their information, preview the results in real time, and download a polished CV ready for job applications. The platform is built to save time, reduce complexity, and support users in presenting their skills and experiences with confidence.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Template Section - Always visible */}
      <section id="template-section" className="bg-white py-16 pb-32">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-center text-5xl font-bold italic text-[#55B3EB] mb-16 tracking-widest uppercase">
              TEMPLATE
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {previewTemplates.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate('/templates')}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-full relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-[#55B3EB] transition-all duration-300 bg-white flex items-center justify-center">
                    {!item.isPreview && item.img && (
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {item.isPreview ? (
                      <div className="pointer-events-none absolute top-0 left-0" style={{ width: '800px', height: '1131px', transform: 'scale(0.28)', transformOrigin: 'top left' }}>
                        <BlackWhiteTemplates />
                      </div>
                    ) : null}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#3D769A]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <div className="bg-white px-5 py-2 rounded-lg font-bold text-[#55B3EB] shadow-md translate-y-2 group-hover:translate-y-0 transition-transform text-sm">
                        Use Template
                      </div>
                    </div>
                  </div>
                  <span className="mt-6 text-[11px] font-bold text-slate-800 uppercase tracking-widest text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
      </section>
    </>
  );
};

export default LandingPage;