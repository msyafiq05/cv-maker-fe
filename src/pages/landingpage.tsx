import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  // Setup untuk testing: false = Guest view (tombol Login), true = User view (tombol Project)
  const [isLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo placeholder, taruh file logo.png disini */}
            <img src="/logo.png" alt="CV Maker Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">CV MAKER</span>
          </div>
          
          <div className="flex items-center gap-10 font-bold text-slate-700 text-sm">
            <Link to="/" className="hover:text-sky-500 transition">Home</Link>
            <Link to="#" className="hover:text-sky-500 transition">About us</Link>
            <Link to="/templates" className="hover:text-sky-500 transition">Template</Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-slate-300 overflow-hidden group-hover:border-sky-400 transition">
                  {/* Placeholder Foto Profil User */}
                </div>
                <svg className="w-5 h-5 text-slate-600 group-hover:text-sky-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-sky-400 text-white px-8 py-2.5 rounded-full font-bold text-xs hover:bg-sky-500 transition shadow-lg shadow-sky-100"
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold text-sky-400 leading-tight tracking-tight mb-5">
            CREATE NEW CV <br />
            <span className="text-slate-800">Simple and Effective</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed">
            Build your professional resume in minutes with our easy-to-use templates
          </p>
          
          {isLoggedIn ? (
            <button 
              onClick={() => navigate('/project')} 
              className="bg-sky-400 text-white px-10 py-4 rounded-xl font-extrabold text-lg hover:bg-sky-500 transition shadow-xl shadow-sky-100 flex items-center gap-3"
            >
              Go to Project
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          ) : (
            <button 
              onClick={() => navigate('/templates')}
              className="bg-sky-400 text-white px-10 py-4 rounded-xl font-extrabold text-lg hover:bg-sky-500 transition shadow-xl shadow-sky-100"
            >
              Get Started Free
            </button>
          )}
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-6">
            {/* Placeholder untuk Gambar Ilustrasi Hero, taruh file hero.png disini */}
            <img src="/hero.png" alt="Resume Builder Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-2/5 relative">
            <div className="w-full aspect-square bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-6">
              {/* Placeholder untuk Gambar Ilustrasi About, taruh file about.png disini */}
              <img src="/about.png" alt="Login Illustration" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <h2 className="text-6xl font-bold text-sky-400 mb-10 tracking-tight">About us</h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600 font-medium max-w-3xl">
              <p>
                Our website is a user-friendly CV maker platform designed to help individuals create professional and visually appealing resumes efficiently. It offers a variety of customizable templates suitable for different industries and career levels, allowing users to personalize their CV according to their needs.
              </p>
              <p>
                With a simple step-by-step builder, users can input their information, preview the results in real time, and download a polished CV ready for job applications. The platform is built to save time, reduce complexity, and support users in presenting their skills and experiences with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sky-400 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {/* Logo placeholder, taruh file logo_footer.png (versi putih) disini */}
              <img src="/logo_footer.png" alt="CV Maker Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-extrabold italic text-white tracking-tighter">CV MAKER</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed font-bold italic max-w-xs">
              Helping professionals build their careers through compelling resumes.
            </p>
          </div>
          
          {/* Footer Menus */}
          <div>
            <h4 className="font-extrabold mb-6 text-lg tracking-tight">Product</h4>
            <ul className="space-y-4 text-sm font-semibold opacity-90">
              <li><Link to="#" className="hover:text-white transition">CV Templates</Link></li>
              <li><Link to="#" className="hover:text-white transition">Preview</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold mb-6 text-lg tracking-tight">Support</h4>
            <ul className="space-y-4 text-sm font-semibold opacity-90">
              <li><Link to="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold mb-6 text-lg tracking-tight">Resources</h4>
            <ul className="space-y-4 text-sm font-semibold opacity-90">
              <li><Link to="#" className="hover:text-white transition">ATS-Friendly Tips</Link></li>
              <li><Link to="#" className="hover:text-white transition">Design Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold mb-6 text-lg tracking-tight">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold opacity-90">
              <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms Of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto px-8 border-t border-white/20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-xs font-semibold opacity-80">© 2026 CV Maker. All Rights Reserved</p>
          
          {/* Social Icons - Taruh file icon_ig.png, icon_in.png, icon_x.png di folder public */}
          <div className="flex items-center gap-4">
            <Link to="#" className="p-2 border border-white/30 rounded-full hover:bg-white/10 transition">
              <img src="/icon_ig.png" alt="Instagram" className="w-5 h-5 object-contain" />
            </Link>
            <Link to="#" className="p-2 border border-white/30 rounded-full hover:bg-white/10 transition">
              <img src="/icon_in.png" alt="LinkedIn" className="w-5 h-5 object-contain" />
            </Link>
            <Link to="#" className="p-2 border border-white/30 rounded-full hover:bg-white/10 transition">
              <img src="/icon_x.png" alt="X" className="w-5 h-5 object-contain" />
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;