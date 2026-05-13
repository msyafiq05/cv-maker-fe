// src/pages/landingpage.tsx

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const previewTemplates = [
    { id: 1, name: 'Professional Blue', img: 'https://via.placeholder.com/400x600' },
    { id: 2, name: 'Minimalist Pink', img: 'https://via.placeholder.com/400x600' },
    { id: 3, name: 'Modern Gold', img: 'https://via.placeholder.com/400x600' },
    { id: 4, name: 'Clean Blue', img: 'https://via.placeholder.com/400x600' },
    { id: 5, name: 'Elegant Mono', img: 'https://via.placeholder.com/400x600' },
  ];

  return (
    <>
      <header className="max-w-7xl mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left bg-white">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-bold text-sky-400 leading-tight tracking-tight mb-4">
            CREATE NEW CV <br />
            <span className="text-slate-600">Simple and Effective</span>
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
        <div className="lg:w-1/2 relative">
          <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-6 text-slate-400 font-bold uppercase tracking-widest shadow-sm">
            Hero Illustration
          </div>
        </div>
      </header>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-2/5 aspect-[4/5] bg-slate-50 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest p-10">
                About Illustration
            </div>
            <div className="lg:w-3/5">
                <h2 className="text-6xl font-bold text-sky-400 mb-8 tracking-tight">About us</h2>
                <div className="space-y-6 text-lg font-medium text-slate-500 leading-relaxed text-justify">
                    <p>Our website is a user-friendly CV maker platform designed to help individuals create professional and visually appealing resumes efficiently. It offers a variety of customizable templates suitable for different industries and career levels, allowing users to personalize their CV according to their needs.</p>
                    <p>With a simple step-by-step builder, users can input their information, preview the results in real time, and download a polished CV ready for job applications. The platform is built to save time, reduce complexity, and support users in presenting their skills and experiences with confidence.</p>
                </div>
            </div>
        </div>
      </section>

      {!isLoggedIn && (
        <section id="template-section" className="bg-white py-16 pb-32">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-center text-5xl font-bold text-sky-400 mb-16 tracking-widest uppercase">
              TEMPLATE
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {previewTemplates.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate('/templates')}
                  className="group cursor-pointer relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:border-sky-300 transition-all duration-300">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white px-5 py-2 rounded-lg font-bold text-sky-500 shadow-md translate-y-2 group-hover:translate-y-0 transition-transform text-sm">
                        Use Template
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LandingPage;