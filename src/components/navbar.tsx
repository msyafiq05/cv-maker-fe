// src/components/Navbar.tsx

import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { authApi, clearSession, getUser } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = getUser();

  const handleTemplateClick = () => {
    if (!isLoggedIn && location.pathname === '/') {
      document.getElementById('template-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/templates');
    }
  };

  const handleLoginClick = () => navigate('/login');

  // ─── Logout: hapus token di backend lalu bersihkan localStorage ──
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // lanjutkan meskipun request gagal
    } finally {
      clearSession();
      navigate('/');
      window.location.reload();
    }
  };

  const handleAboutUsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('about-us-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToAboutUs: true } });
    }
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-[#55B3EB] to-[#BBE4FB] px-8 py-4 flex items-center justify-between shadow-md z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight uppercase">CV MAKER</span>
        </div>

        <div className="flex items-center gap-8 font-medium text-slate-800 text-sm">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <span onClick={handleAboutUsClick} className="cursor-pointer hover:text-slate-900 transition">About us</span>
          <span onClick={handleTemplateClick} className="cursor-pointer hover:text-slate-900 transition">Template</span>
          <Link to="/project" className="hover:text-slate-900 transition">Project</Link>

          {isLoggedIn ? (
            <div className="flex items-center">
              {/* PENYESUAIAN AREA PROFIL SESUAI MOCKUP FIGMA */}
              <div onClick={() => navigate('/profile')} className="flex items-center gap-3 cursor-pointer group transition">
                <div className="w-10 h-10 bg-white rounded-full border-2 border-sky-300 overflow-hidden group-hover:border-white transition shadow-sm flex items-center justify-center shrink-0">
                  {/* Menampilkan avatar berupa inisial huruf dari user yang sedang login */}
                  <span className="text-sky-500 font-bold text-sm">
                    {user?.nama ? user.nama.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                
                {/* Text Nama & Role (Muncul Otomatis Samping Kanan Bulatan Profil) */}
                <div className="flex flex-col text-left leading-none pr-1">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {user?.nama || 'Admin'}
                  </span>
                  <span className="text-[10px] text-slate-600 font-medium mt-0.5">
                    {user?.role || 'Admin'}
                  </span>
                </div>
              </div>

              <span onClick={handleLogout} className="ml-6 cursor-pointer text-xs font-bold bg-white px-4 py-2 rounded-full hover:bg-slate-50 transition text-black shadow-sm">
                Logout
              </span>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-white text-slate-800 px-6 py-1.5 rounded-full font-medium text-sm hover:bg-slate-50 transition shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </div> 
    </nav>
  );
};

export default Navbar;