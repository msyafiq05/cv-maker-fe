import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleTemplateClick = () => {
    if (!isLoggedIn && location.pathname === '/') {
      document.getElementById('template-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/templates');
    }
  };

  // Diarahkan ke halaman login asli King
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 bg-sky-400 px-8 py-4 flex items-center justify-between shadow-md z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight uppercase">CV MAKER</span>
        </div>
        
        <div className="flex items-center gap-10 font-bold text-white text-sm">
          <Link to="/" className="hover:text-sky-100 transition">Home</Link>
          <Link to="#" className="hover:text-sky-100 transition">About us</Link>
          <span onClick={handleTemplateClick} className="cursor-pointer hover:text-sky-100 transition">Template</span>
          <Link to="/project" className="hover:text-sky-100 transition">Project</Link>
          <Link to="/admin" className="hover:text-sky-100 transition">Dashboard Admin</Link>
          
          {isLoggedIn ? (
            <div className="flex items-center">
              <div onClick={() => navigate('/profile')} className="flex items-center gap-3 cursor-pointer group transition">
                <div className="w-10 h-10 bg-white rounded-full border-2 border-sky-300 overflow-hidden group-hover:border-white transition shadow-sm">
                  <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <svg className="w-5 h-5 text-white group-hover:translate-y-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <span onClick={handleLogout} className="ml-6 cursor-pointer text-xs font-bold bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition text-white">Logout</span>
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="bg-white text-sky-400 px-8 py-2 rounded-full font-extrabold text-xs hover:bg-sky-50 transition shadow-md"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;