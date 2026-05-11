import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// IMPORT LOGO SECARA RESMI DISINI
import logo from '../assets/logo.png';

const LandingPage = () => {
  const [isLoggedIn] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* NAVBAR BIRU */}
      <nav className="sticky top-0 bg-sky-400 px-8 py-4 flex items-center justify-between shadow-md z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* LOGO AREA */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 flex items-center justify-center">
              {/* PANGGIL VARIABEL logo YANG SUDAH DIIMPORT */}
              <img 
                src={logo} 
                alt="Logo CV Maker" 
                className="w-full h-full object-contain brightness-0 invert" 
              />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight uppercase">CV MAKER</span>
          </div>
          
          <div className="flex items-center gap-10 font-bold text-white text-sm">
            <Link to="/" className="hover:text-sky-100 transition">Home</Link>
            <Link to="#" className="hover:text-sky-100 transition">About us</Link>
            <Link to="/templates" className="hover:text-sky-100 transition">Template</Link>
            <Link to="/project" className="hover:text-sky-100 transition font-black">Project</Link>
            
            {isLoggedIn && (
              <div onClick={() => navigate('/profile')} className="flex items-center gap-3 cursor-pointer group transition">
                <div className="w-10 h-10 bg-white rounded-full border-2 border-sky-300 overflow-hidden group-hover:border-white transition shadow-sm">
                  <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <svg className="w-5 h-5 text-white group-hover:translate-y-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-7xl font-black text-sky-400 leading-tight tracking-tighter mb-6 uppercase italic">
            CREATE NEW CV <br />
            <span className="text-slate-800">Simple and Effective</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0">
            Build your professional resume in minutes with our easy-to-use templates.
          </p>
          <button 
            onClick={() => navigate('/templates')} 
            className="bg-sky-400 text-white px-12 py-4 rounded-2xl font-black text-xl hover:bg-sky-500 transition shadow-2xl shadow-sky-200 uppercase tracking-widest"
          >
            Get Started Free
          </button>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="w-full aspect-[4/3] bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-100 flex items-center justify-center p-6 text-slate-300 font-black uppercase tracking-[1em]">
            Hero Illustration
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="bg-slate-50 py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-2/5 aspect-square bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest p-10">
                About Image
            </div>
            <div className="lg:w-3/5">
                <h2 className="text-6xl font-black text-sky-400 mb-10 tracking-tighter uppercase italic">About us</h2>
                <div className="space-y-8 text-xl font-medium text-slate-600 leading-relaxed text-justify font-sans">
                    <p>Our website is a user-friendly CV maker platform designed to help individuals create professional and visually appealing resumes efficiently.</p>
                    <p>With a simple step-by-step builder, users can input their information, preview the results in real time, and download a polished CV ready for job applications.</p>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sky-400 text-white pt-24 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <span className="text-2xl font-black italic text-white tracking-tighter uppercase">CV MAKER</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed font-bold italic max-w-xs uppercase tracking-tighter">
              Helping professionals build their careers through compelling resumes.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80 font-sans">Product</h4>
            <ul className="space-y-5 text-sm font-bold opacity-90 uppercase font-sans">
              <li><Link to="/templates" className="hover:text-white transition">CV Templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80 font-sans">Support</h4>
            <ul className="space-y-5 text-sm font-bold opacity-90 uppercase font-sans">
              <li><Link to="#" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80 font-sans">Resources</h4>
            <ul className="space-y-5 text-sm font-bold opacity-90 uppercase font-sans">
              <li><Link to="#" className="hover:text-white transition">ATS Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80 font-sans">Legal</h4>
            <ul className="space-y-5 text-sm font-bold opacity-90 uppercase font-sans">
              <li><Link to="#" className="hover:text-white transition">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 border-t border-white/20 pt-12 flex justify-between items-center text-[10px] font-black opacity-70 uppercase tracking-[0.3em] font-sans">
          <p>© 2026 CV Maker. All Right Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;