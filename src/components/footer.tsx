import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import instagramLogo from '../assets/instagram.png';
import linkedinLogo from '../assets/Linkedin.png';
import tiktokLogo from '../assets/Tiktok.png';
import { getUser } from '../services/api';

const Footer = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = getUser();
  const isAdmin = isLoggedIn && user?.role === 'admin';
  return (
    <footer className="bg-gradient-to-r from-[#55B3EB] to-[#BBE4FB] pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-start mb-8 gap-10 lg:gap-0">
        <div className="w-full lg:w-1/4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">CV MAKER</span>
          </div>
          <p className="text-sm text-white opacity-90 leading-snug italic max-w-[200px]">
            Helping professionals<br />
            build their careers<br />
            through compelling resumes.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap justify-between gap-8 text-gray-900">
          <div>
            <h4 className="font-bold mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="/templates" className="hover:text-black transition">CV Templates</Link></li>
              <li><Link to="/project" className="hover:text-black transition">Project</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Support</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="/faq" className="hover:text-black transition">FAQ</Link></li>
              <li><Link to={isAdmin ? '/admin/dashboard' : '/contact-us'} className="hover:text-black transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="/ats-tips" className="hover:text-black transition">ATS-Friendly tips</Link></li>
              <li><Link to="/design-guide" className="hover:text-black transition">Design Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="/privacy-policy" className="hover:text-black transition">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-black transition">Terms Of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-1/4 flex lg:justify-end gap-5 mt-4 lg:mt-0 items-center">
          <a href="https://www.instagram.com/cvmaker" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center hover:scale-105 transition duration-200">
            <img src={instagramLogo} alt="Instagram" className="w-6 h-6 object-contain" />
          </a>
          <a href="https://www.linkedin.com/company/cvmaker" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center hover:scale-105 transition duration-200">
            <img src={linkedinLogo} alt="LinkedIn" className="w-6 h-6 object-contain" />
          </a>
          <a href="https://www.tiktok.com/@cvmaker" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center hover:scale-105 transition duration-200">
            <img src={tiktokLogo} alt="TikTok" className="w-6 h-6 object-contain" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 border-t border-gray-900 pt-6 flex justify-start items-center text-xs font-medium text-gray-900">
        <p>© 2026 CV Maker. All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;